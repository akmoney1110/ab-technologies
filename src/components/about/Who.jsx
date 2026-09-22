import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { queueSupportRequest } from "../AI";
import {
    ArrowRight,
    ArrowUpRight,
    Award,
    BarChart3,
    BriefcaseBusiness,
    Building2,
    Check,
    ChevronDown,
    Cloud,
    Code2,
    Cpu,
    Database,
    Globe2,
    GraduationCap,
    Handshake,
    Headphones,
    HeartHandshake,
    Layers3,
    Lightbulb,
    Lock,
    Network,
    PackageCheck,
    Rocket,
    Search,
    Server,
    ShieldCheck,
    Sparkles,
    Target,
    TrendingUp,
    Users,
    Workflow,
    Wrench,
} from "lucide-react";

const stats = [
    {
        value: "01",
        label: "Starting point",
        description:
            "We can work with you from an early idea, an existing operation, or a technology environment that needs improvement.",
    },
    {
        value: "360°",
        label: "Technology coverage",
        description:
            "Procurement, software, infrastructure, cloud, security, automation, deployment, support and digital transformation.",
    },
    {
        value: "B2B",
        label: "Business focused",
        description:
            "Our approach is designed around organizations, teams, institutions and operational requirements.",
    },
    {
        value: "A–Z",
        label: "End-to-end thinking",
        description:
            "We help connect individual technology decisions into a practical, maintainable and scalable environment.",
    },
];

const principles = [
    {
        icon: Target,
        title: "Purpose before technology",
        text:
            "We start with what the organization needs to achieve instead of simply recommending technology because it is popular.",
    },
    {
        icon: Handshake,
        title: "Partnership over transactions",
        text:
            "We aim to become a dependable technology partner rather than a supplier that disappears after an invoice is paid.",
    },
    {
        icon: Layers3,
        title: "Everything should connect",
        text:
            "Hardware, software, networks, cloud services, security and people should work together as one environment.",
    },
    {
        icon: TrendingUp,
        title: "Built for growth",
        text:
            "Solutions should not only solve today's problem. They should leave room for tomorrow's users, locations, systems and opportunities.",
    },
    {
        icon: ShieldCheck,
        title: "Security by design",
        text:
            "Security should be considered throughout the technology lifecycle rather than treated as an afterthought.",
    },
    {
        icon: Wrench,
        title: "Practical execution",
        text:
            "A beautiful proposal means little without proper implementation, documentation, deployment and ongoing support.",
    },
];

const capabilities = [
    {
        icon: PackageCheck,
        title: "Hardware & Device Procurement",
        description:
            "Computers, laptops, servers, networking equipment, peripherals, accessories and other technology hardware sourced around your actual requirements.",
    },
    {
        icon: Code2,
        title: "Software & Applications",
        description:
            "Business applications, custom platforms, internal tools, web applications, mobile applications and software subscriptions.",
    },
    {
        icon: Network,
        title: "Networking & IT Infrastructure",
        description:
            "Structured connectivity, LAN/WAN environments, Wi-Fi, network equipment, server infrastructure and workplace technology foundations.",
    },
    {
        icon: Cloud,
        title: "Cloud & Digital Infrastructure",
        description:
            "Cloud environments, hosting, deployment infrastructure, backups, domains, digital services and infrastructure management.",
    },
    {
        icon: ShieldCheck,
        title: "Security Solutions",
        description:
            "Technology security planning, endpoint protection, access control, secure infrastructure and practical security improvements.",
    },
    {
        icon: Workflow,
        title: "Automation & Integration",
        description:
            "Connect systems, eliminate repetitive work and design workflows that allow teams to operate more efficiently.",
    },
    {
        icon: Sparkles,
        title: "AI & Intelligent Solutions",
        description:
            "AI-assisted workflows, intelligent business tools, automation opportunities and practical applications of emerging technology.",
    },
    {
        icon: Headphones,
        title: "Managed IT & Support",
        description:
            "Ongoing assistance, troubleshooting, maintenance, monitoring and technology support for organizations that need dependable continuity.",
    },
];

const journey = [
    {
        number: "01",
        icon: Search,
        title: "Understand",
        description:
            "We learn about your organization, people, workflows, challenges, goals, budget and current technology environment.",
    },
    {
        number: "02",
        icon: Lightbulb,
        title: "Plan",
        description:
            "We translate requirements into a practical technology plan with priorities, options, dependencies and implementation considerations.",
    },
    {
        number: "03",
        icon: PackageCheck,
        title: "Source",
        description:
            "Where products or services are required, we help identify suitable options and coordinate procurement and sourcing.",
    },
    {
        number: "04",
        icon: Code2,
        title: "Build",
        description:
            "We design, configure or develop the required technology solutions according to the agreed scope.",
    },
    {
        number: "05",
        icon: Rocket,
        title: "Deploy",
        description:
            "Technology is introduced into the real operating environment with configuration, testing and implementation considerations.",
    },
    {
        number: "06",
        icon: ShieldCheck,
        title: "Secure",
        description:
            "Security, access, backups, permissions and operational safeguards are considered as part of the environment.",
    },
    {
        number: "07",
        icon: Users,
        title: "Enable",
        description:
            "Teams receive the guidance, documentation and support required to actually use the systems effectively.",
    },
    {
        number: "08",
        icon: TrendingUp,
        title: "Improve",
        description:
            "As your organization changes, technology can be reviewed, optimized, expanded and modernized.",
    },
];

const audiences = [
    {
        icon: Building2,
        title: "Established organizations",
        text:
            "Improve existing infrastructure, modernize legacy systems, strengthen security and create more efficient technology operations.",
    },
    {
        icon: Rocket,
        title: "Startups & growing businesses",
        text:
            "Build a sensible technology foundation without unnecessarily overcomplicating the early stages of growth.",
    },
    {
        icon: GraduationCap,
        title: "Schools & universities",
        text:
            "Support learning environments, administrative systems, connectivity, devices, software and digital operations.",
    },
    {
        icon: HeartHandshake,
        title: "NGOs & development organizations",
        text:
            "Support field operations, communication, reporting, infrastructure, procurement and technology-enabled programs.",
    },
    {
        icon: BriefcaseBusiness,
        title: "Corporate teams",
        text:
            "Equip employees, improve workflows, support distributed operations and create dependable business technology environments.",
    },
    {
        icon: Globe2,
        title: "Organizations expanding",
        text:
            "Prepare technology for additional users, offices, locations, products, customers and operational complexity.",
    },
];

const values = [
    "Clarity",
    "Reliability",
    "Accountability",
    "Practicality",
    "Security",
    "Transparency",
    "Continuous improvement",
    "Long-term thinking",
];

const faq = [
    {
        question: "Do you only work with organizations that already have an IT department?",
        answer:
            "No. We can work with organizations that have no dedicated IT team, a small internal technology function, or an established IT department that needs additional capacity or specialized support.",
    },
    {
        question: "Can you help us if we are starting from scratch?",
        answer:
            "Yes. This is an important part of our approach. We can help you think through requirements, plan the environment, identify suitable technology, source equipment or services, build software where required, deploy systems and establish ongoing support.",
    },
    {
        question: "Do you only sell hardware?",
        answer:
            "No. Hardware procurement is one part of the wider offering. The broader approach covers software, networking, infrastructure, cloud, security, automation, AI, deployment, managed IT and digital transformation.",
    },
    {
        question: "Can you work with technology we already have?",
        answer:
            "Yes. Existing systems, devices, networks and software can be assessed and incorporated where they remain useful. We do not believe organizations should replace working technology simply for the sake of replacement.",
    },
    {
        question: "Can you build custom software?",
        answer:
            "Yes. Custom software can be considered where an organization's requirements cannot be adequately addressed by an existing product or where a tailored platform creates meaningful operational value.",
    },
    {
        question: "Can you support us after implementation?",
        answer:
            "Yes. Implementation should not be the end of the relationship. Depending on the engagement, ongoing support, maintenance, optimization, monitoring and future technology planning can be provided.",
    },
];

function SectionLabel({ children }) {
    return (
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-600 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/[0.04] dark:text-blue-400">
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {children}
        </div>
    );
}

function CapabilityCard({ item, onDiscuss }) {
    const Icon = item.icon;

    return (
        <div className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/75 p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-slate-900/70">
            <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl transition group-hover:bg-blue-500/20" />

            <div className="relative">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                    <Icon size={23} />
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                    {item.description}
                </p>

                <button
                    type="button"
                    onClick={() => onDiscuss(item)}
                    className="mt-6 flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                    Discuss this capability
                    <ArrowRight
                        size={16}
                        className="transition-transform group-hover:translate-x-1"
                    />
                </button>
            </div>
        </div>
    );
}

function JourneyCard({ item }) {
    const Icon = item.icon;

    return (
        <div className="relative rounded-3xl border border-slate-200/80 bg-white/70 p-7 shadow-sm dark:border-white/10 dark:bg-slate-900/60">
            <div className="flex items-start justify-between gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900">
                    <Icon size={21} />
                </div>

                <span className="text-4xl font-black tracking-tight text-slate-200 dark:text-white/10">
                    {item.number}
                </span>
            </div>

            <h3 className="mt-7 text-xl font-bold text-slate-900 dark:text-white">
                {item.title}
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                {item.description}
            </p>
        </div>
    );
}

function AudienceCard({ item }) {
    const Icon = item.icon;

    return (
        <div className="group rounded-3xl border border-slate-200/80 bg-white/70 p-7 transition duration-300 hover:border-blue-300 hover:shadow-xl dark:border-white/10 dark:bg-slate-900/60 dark:hover:border-blue-500/30">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                <Icon size={22} />
            </div>

            <h3 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">
                {item.title}
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                {item.text}
            </p>
        </div>
    );
}

export default function WhoWeAre() {
    const navigate = useNavigate();
    const [openFaq, setOpenFaq] = useState(null);

    const startSupportChat = (message, metadata = {}) => {
        queueSupportRequest({
            message:
                message ||
                "I'd like to discuss our organization's technology needs.",
            metadata: {
                Source: "Who We Are",
                ...metadata,
            },
        });

        navigate("/support/ai");
    };

    return (
        <main className=" mt-25 min-h-screen overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
            {/* =========================================================
                HERO
            ========================================================== */}

            <section className="relative isolate">
                <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.13),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(14,165,233,0.10),transparent_30%),linear-gradient(to_bottom,#f8fafc,#eef2ff)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.18),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(14,165,233,0.12),transparent_30%),linear-gradient(to_bottom,#020617,#071126)]" />

                <div className="absolute left-1/2 top-20 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]" />

                <div className="mx-auto max-w-7xl px-5 pb-24 pt-16 sm:px-6 lg:px-8 lg:pb-32 lg:pt-24">
                    <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_.95fr]">
                        <div>
                            <SectionLabel>Who we are</SectionLabel>

                            <h1 className="mt-7 max-w-4xl text-5xl font-black tracking-[-0.04em] text-slate-950 sm:text-6xl lg:text-7xl dark:text-white">
                                Technology should make your organization
                                <span className="block bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 bg-clip-text text-transparent">
                                    stronger, not more complicated.
                                </span>
                            </h1>

                            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                                AB TECHNOLOGIES helps organizations understand,
                                source, build, deploy, secure and improve the
                                technology they depend on. Whether you are
                                starting from scratch or improving an existing
                                environment, we help turn technology needs into
                                practical solutions.
                            </p>

                            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-500 dark:text-slate-400">
                                Our goal is simple: remove unnecessary complexity,
                                connect the right pieces together and give
                                organizations a dependable technology foundation
                                they can actually grow with.
                            </p>

                            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                                <a
                                    href="#our-approach"
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-blue-600 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-400"
                                >
                                    Discover our approach
                                    <ArrowRight size={17} />
                                </a>

                                <a
                                    href="#what-we-do"
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white/70 px-6 py-3.5 text-sm font-bold text-slate-800 backdrop-blur transition hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08]"
                                >
                                    Explore what we do
                                    <ArrowUpRight size={17} />
                                </a>
                            </div>

                            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-slate-500 dark:text-slate-400">
                                <span className="flex items-center gap-2">
                                    <Check size={16} className="text-blue-600" />
                                    From the scratch
                                </span>

                                <span className="flex items-center gap-2">
                                    <Check size={16} className="text-blue-600" />
                                    Existing environments
                                </span>

                                <span className="flex items-center gap-2">
                                    <Check size={16} className="text-blue-600" />
                                    End-to-end thinking
                                </span>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-5 rounded-[2.5rem] bg-blue-500/10 blur-3xl" />

                            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white/80 p-4 shadow-2xl shadow-slate-900/10 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/75">
                                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-950 p-7 text-white dark:border-white/10">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">
                                                AB TECHNOLOGIES
                                            </div>
                                            <div className="mt-2 text-lg font-bold">
                                                Your technology journey
                                            </div>
                                        </div>

                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                                            <Cpu size={19} />
                                        </div>
                                    </div>

                                    <div className="mt-8 grid grid-cols-2 gap-3">
                                        {[
                                            ["Plan", Target],
                                            ["Source", PackageCheck],
                                            ["Build", Code2],
                                            ["Deploy", Rocket],
                                            ["Secure", ShieldCheck],
                                            ["Support", Headphones],
                                        ].map(([label, Icon]) => (
                                            <div
                                                key={label}
                                                className="rounded-2xl border border-white/10 bg-white/[0.05] p-4"
                                            >
                                                <Icon
                                                    size={18}
                                                    className="text-blue-400"
                                                />
                                                <div className="mt-3 text-sm font-semibold">
                                                    {label}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-5 rounded-2xl border border-blue-400/20 bg-blue-500/10 p-5">
                                        <div className="flex items-start gap-3">
                                            <Sparkles
                                                size={18}
                                                className="mt-0.5 shrink-0 text-blue-400"
                                            />

                                            <div>
                                                <div className="text-sm font-bold">
                                                    One connected technology
                                                    strategy
                                                </div>

                                                <p className="mt-2 text-xs leading-6 text-slate-400">
                                                    Instead of treating every
                                                    technology requirement as a
                                                    separate problem, we look at
                                                    the complete operating
                                                    environment.
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
                STATS
            ========================================================== */}

            <section className="relative border-y border-slate-200/80 bg-white/70 dark:border-white/10 dark:bg-slate-900/40">
                <div className="mx-auto grid max-w-7xl divide-y divide-slate-200/80 px-5 sm:px-6 md:grid-cols-2 md:divide-x md:divide-y-0 lg:grid-cols-4 lg:px-8 dark:divide-white/10">
                    {stats.map((stat) => (
                        <div key={stat.value} className="px-5 py-8 lg:px-7">
                            <div className="text-3xl font-black tracking-tight text-slate-950 dark:text-white">
                                {stat.value}
                            </div>

                            <div className="mt-1 text-sm font-bold text-blue-600 dark:text-blue-400">
                                {stat.label}
                            </div>

                            <p className="mt-3 text-xs leading-6 text-slate-500 dark:text-slate-400">
                                {stat.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* =========================================================
                STORY
            ========================================================== */}

            <section className="relative py-24 lg:py-32">
                <div className="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-blue-50/70 to-transparent dark:from-blue-950/20 dark:to-transparent" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-16 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
                        <div className="lg:sticky lg:top-28">
                            <SectionLabel>Our story</SectionLabel>

                            <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
                                Built around a simple belief.
                            </h2>

                            <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-400">
                                Organizations should not have to become
                                technology experts simply to operate
                                effectively.
                            </p>
                        </div>

                        <div className="space-y-7 text-base leading-8 text-slate-600 dark:text-slate-300">
                            <p>
                                Every organization eventually reaches a point
                                where technology becomes more than computers
                                and internet connections. It becomes part of
                                how people communicate, serve customers,
                                manage information, make decisions, deliver
                                products and grow.
                            </p>

                            <p>
                                But technology can also become fragmented.
                                Different suppliers provide different devices.
                                Different applications store information in
                                different places. Networks are installed
                                without long-term planning. Cloud services are
                                added without governance. Security is sometimes
                                considered only after a problem occurs.
                            </p>

                            <p>
                                AB TECHNOLOGIES exists to bring these pieces
                                together in a more deliberate way.
                            </p>

                            <p>
                                We believe technology should have a purpose. It
                                should support the organization's objectives,
                                make people's work easier, protect important
                                information and create a foundation for future
                                growth.
                            </p>

                            <div className="rounded-3xl border border-blue-200 bg-blue-50/80 p-7 dark:border-blue-500/20 dark:bg-blue-950/20">
                                <div className="flex gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white">
                                        <Lightbulb size={21} />
                                    </div>

                                    <div>
                                        <h3 className="font-bold text-slate-950 dark:text-white">
                                            We can start wherever you are.
                                        </h3>

                                        <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                            You may have nothing yet. You may
                                            already have equipment, software,
                                            servers and employees. Or you may
                                            simply know that something is not
                                            working as well as it should. We
                                            can start from that point and work
                                            forward.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                MISSION / VISION
            ========================================================== */}

            <section className="relative overflow-hidden py-24 lg:py-32">
                <div className="absolute inset-0 bg-slate-950 dark:bg-black" />

                <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />
                <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-7 lg:grid-cols-2">
                        <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-8 backdrop-blur-xl lg:p-10">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
                                <Target size={23} />
                            </div>

                            <div className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-blue-400">
                                Our mission
                            </div>

                            <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
                                Make technology easier to understand, acquire,
                                implement and use.
                            </h2>

                            <p className="mt-5 leading-8 text-slate-400">
                                We want organizations to make better technology
                                decisions without unnecessary complexity. From
                                procurement to software development and from
                                infrastructure to support, our role is to make
                                the technology journey clearer and more
                                manageable.
                            </p>
                        </div>

                        <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-8 backdrop-blur-xl lg:p-10">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400">
                                <Globe2 size={23} />
                            </div>

                            <div className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
                                Our vision
                            </div>

                            <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
                                Become the dependable technology partner
                                organizations can grow with.
                            </h2>

                            <p className="mt-5 leading-8 text-slate-400">
                                Our ambition is not simply to deliver individual
                                projects. We want to help create technology
                                environments that remain useful, secure,
                                maintainable and adaptable as organizations
                                evolve.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                WHAT WE DO
            ========================================================== */}

            <section
                id="what-we-do"
                className="relative py-24 lg:py-32"
            >
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <SectionLabel>What we do</SectionLabel>

                        <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
                            One partner across the technology lifecycle.
                        </h2>

                        <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-400">
                            Our capabilities are intentionally broad because
                            real organizations rarely have technology needs
                            that fit neatly into one category.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                        {capabilities.map((item) => (
                            <CapabilityCard
                                key={item.title}
                                item={item}
                                onDiscuss={(capability) =>
                                    startSupportChat(
                                        `I'd like to discuss ${capability.title} for our organization.`,
                                        {
                                            Intent: "Capability enquiry",
                                            Capability: capability.title,
                                        }
                                    )
                                }
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* =========================================================
                FROM SCRATCH
            ========================================================== */}

            <section className="relative overflow-hidden py-24 lg:py-32">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-blue-950/30 dark:via-slate-950 dark:to-cyan-950/20" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-14 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
                        <div>
                            <SectionLabel>Starting from scratch</SectionLabel>

                            <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
                                You don't need to have everything figured out
                                before you call us.
                            </h2>

                            <p className="mt-6 text-base leading-8 text-slate-600 dark:text-slate-400">
                                Maybe you are opening a new office. Launching a
                                company. Establishing a school. Expanding into
                                another location. Setting up a new department.
                                Building a digital product. Or replacing an
                                outdated environment.
                            </p>

                            <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-400">
                                You can come to us with the problem before you
                                know the solution. We can help translate the
                                requirement into a technology plan.
                            </p>

                            <div className="mt-8">
                                <a
                                    href="#our-approach"
                                    className="inline-flex items-center gap-2 font-bold text-blue-600 dark:text-blue-400"
                                >
                                    See how we work
                                    <ArrowRight size={17} />
                                </a>
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {[
                                {
                                    icon: Search,
                                    title: "Tell us the problem",
                                    text: "You don't need to know the exact product or system.",
                                },
                                {
                                    icon: Lightbulb,
                                    title: "We clarify the need",
                                    text: "We help turn the business requirement into technical requirements.",
                                },
                                {
                                    icon: Layers3,
                                    title: "We connect the pieces",
                                    text: "Infrastructure, software, users and workflows are considered together.",
                                },
                                {
                                    icon: Rocket,
                                    title: "We help make it real",
                                    text: "The plan can move into sourcing, development, implementation and support.",
                                },
                            ].map((item) => {
                                const Icon = item.icon;

                                return (
                                    <div
                                        key={item.title}
                                        className="rounded-3xl border border-slate-200 bg-white/80 p-7 shadow-sm dark:border-white/10 dark:bg-slate-900/70"
                                    >
                                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                            <Icon size={21} />
                                        </div>

                                        <h3 className="mt-6 font-bold text-slate-950 dark:text-white">
                                            {item.title}
                                        </h3>

                                        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                            {item.text}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                HOW WE THINK
            ========================================================== */}

            <section
                id="our-approach"
                className="relative py-24 lg:py-32"
            >
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <SectionLabel>Our approach</SectionLabel>

                        <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
                            Technology decisions should make business sense.
                        </h2>

                        <p className="mt-5 leading-8 text-slate-600 dark:text-slate-400">
                            We look beyond specifications and features. The
                            question is whether the technology is appropriate
                            for the organization, the people using it and the
                            outcome it is expected to produce.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {principles.map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.title}
                                    className="rounded-3xl border border-slate-200/80 bg-white/70 p-7 dark:border-white/10 dark:bg-slate-900/60"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-800 dark:bg-white/10 dark:text-white">
                                        <Icon size={22} />
                                    </div>

                                    <h3 className="mt-6 text-xl font-bold text-slate-950 dark:text-white">
                                        {item.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                        {item.text}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* =========================================================
                PROCESS
            ========================================================== */}

            <section className="relative py-24 lg:py-32">
                <div className="absolute inset-0 bg-slate-100/70 dark:bg-slate-900/30" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-14 lg:grid-cols-[.75fr_1.25fr]">
                        <div>
                            <SectionLabel>How we help</SectionLabel>

                            <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
                                From the first conversation to ongoing
                                improvement.
                            </h2>

                            <p className="mt-5 leading-8 text-slate-600 dark:text-slate-400">
                                Not every engagement needs every stage. The
                                process adapts to the organization's situation.
                                What matters is that the technology has a clear
                                path from requirement to useful outcome.
                            </p>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            {journey.map((item) => (
                                <JourneyCard key={item.number} item={item} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                WHO WE SERVE
            ========================================================== */}

            <section className="relative py-24 lg:py-32">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <SectionLabel>Who we serve</SectionLabel>

                        <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
                            Technology for organizations at different stages.
                        </h2>

                        <p className="mt-5 leading-8 text-slate-600 dark:text-slate-400">
                            Different organizations have different constraints.
                            Our role is to understand those differences and
                            design practical ways forward.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {audiences.map((item) => (
                            <AudienceCard key={item.title} item={item} />
                        ))}
                    </div>
                </div>
            </section>

            {/* =========================================================
                TECHNOLOGY ECOSYSTEM
            ========================================================== */}

            <section className="relative overflow-hidden py-24 lg:py-32">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-slate-900" />

                <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[140px]" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <SectionLabel>Connected thinking</SectionLabel>

                        <h2 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl">
                            Your technology environment is an ecosystem.
                        </h2>

                        <p className="mt-5 leading-8 text-slate-400">
                            A laptop does not operate in isolation. An
                            application needs infrastructure. Infrastructure
                            needs connectivity. Connectivity needs security.
                            People need support. Good technology planning sees
                            those relationships.
                        </p>
                    </div>

                    <div className="mx-auto mt-14 max-w-5xl">
                        <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl sm:p-8">
                            <div className="grid gap-4 sm:grid-cols-3">
                                {[
                                    [Cpu, "Devices", "Endpoints, computers and workplace technology"],
                                    [Network, "Connectivity", "Networks, Wi-Fi and communications"],
                                    [Server, "Infrastructure", "Servers, hosting and digital infrastructure"],
                                    [Code2, "Applications", "Software, platforms and business systems"],
                                    [Lock, "Security", "Identity, access, protection and resilience"],
                                    [Workflow, "Operations", "Automation, integration and managed support"],
                                ].map(([Icon, title, text]) => (
                                    <div
                                        key={title}
                                        className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
                                    >
                                        <Icon
                                            size={21}
                                            className="text-blue-400"
                                        />

                                        <h3 className="mt-4 font-bold text-white">
                                            {title}
                                        </h3>

                                        <p className="mt-2 text-xs leading-6 text-slate-500">
                                            {text}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 flex items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10 p-6 text-center">
                                <div>
                                    <Sparkles
                                        size={22}
                                        className="mx-auto text-blue-400"
                                    />

                                    <div className="mt-3 font-bold text-white">
                                        One technology strategy
                                    </div>

                                    <div className="mt-1 text-xs text-slate-400">
                                        Designed around your organization's
                                        actual objectives.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                VALUES
            ========================================================== */}

            <section className="relative py-24 lg:py-32">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
                        <div>
                            <SectionLabel>Our values</SectionLabel>

                            <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
                                The standard we want our work to represent.
                            </h2>

                            <p className="mt-5 leading-8 text-slate-600 dark:text-slate-400">
                                Technology relationships require trust. Our
                                approach is built around clear communication,
                                responsible execution and a commitment to
                                creating useful outcomes.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                            {values.map((value) => (
                                <div
                                    key={value}
                                    className="flex min-h-28 items-center justify-center rounded-2xl border border-slate-200 bg-white p-5 text-center text-sm font-bold text-slate-800 shadow-sm dark:border-white/10 dark:bg-slate-900 dark:text-white"
                                >
                                    {value}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                WHY CLIENTS CAN START WITH US
            ========================================================== */}

            <section className="relative py-24 lg:py-32">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-xl dark:border-white/10 dark:bg-slate-900">
                        <div className="grid lg:grid-cols-2">
                            <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-slate-950 p-8 text-white sm:p-12 lg:p-14">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                                    <Handshake size={25} />
                                </div>

                                <h2 className="mt-8 text-4xl font-black tracking-tight">
                                    You don't have to manage every technology
                                    supplier yourself.
                                </h2>

                                <p className="mt-5 leading-8 text-blue-100">
                                    Where appropriate, we can help coordinate
                                    different parts of the technology journey so
                                    your organization has a clearer path from
                                    requirement to implementation.
                                </p>

                                <div className="mt-8">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            startSupportChat(
                                                "I'd like to start with our current technology requirement and work through what we need.",
                                                { Intent: "Start conversation" }
                                            )
                                        }
                                        className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-blue-50"
                                    >
                                        Start a conversation
                                        <ArrowRight size={17} />
                                    </button>
                                </div>
                            </div>

                            <div className="p-8 sm:p-12 lg:p-14">
                                <div className="space-y-6">
                                    {[
                                        {
                                            icon: Search,
                                            title: "One starting point",
                                            text: "Bring the requirement to us before you decide exactly what you need.",
                                        },
                                        {
                                            icon: Layers3,
                                            title: "Connected planning",
                                            text: "We consider how the different technology components need to work together.",
                                        },
                                        {
                                            icon: ShieldCheck,
                                            title: "Responsible implementation",
                                            text: "Security, maintainability and future requirements remain part of the conversation.",
                                        },
                                        {
                                            icon: Headphones,
                                            title: "Support beyond delivery",
                                            text: "Where required, we can remain involved after implementation.",
                                        },
                                    ].map((item) => {
                                        const Icon = item.icon;

                                        return (
                                            <div
                                                key={item.title}
                                                className="flex gap-4"
                                            >
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                                    <Icon size={19} />
                                                </div>

                                                <div>
                                                    <h3 className="font-bold text-slate-950 dark:text-white">
                                                        {item.title}
                                                    </h3>

                                                    <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                                        {item.text}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                MATURITY
            ========================================================== */}

            <section className="relative py-24 lg:py-32">
                <div className="absolute inset-0 bg-slate-100/60 dark:bg-slate-900/30" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <SectionLabel>Built for maturity</SectionLabel>

                        <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
                            Good technology should become easier to manage over
                            time.
                        </h2>

                        <p className="mt-5 leading-8 text-slate-600 dark:text-slate-400">
                            We think beyond the initial installation. Clear
                            documentation, sensible architecture, security,
                            support and future scalability all contribute to a
                            healthier technology environment.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-4 md:grid-cols-3">
                        {[
                            [
                                Award,
                                "Reliable foundations",
                                "Start with infrastructure and systems that are appropriate for the organization's present needs.",
                            ],
                            [
                                BarChart3,
                                "Visible improvement",
                                "Technology should create measurable improvements in efficiency, communication, reliability or capability.",
                            ],
                            [
                                Database,
                                "Better information",
                                "Well-designed systems can help organizations organize, access and use information more effectively.",
                            ],
                        ].map(([Icon, title, text]) => (
                            <div
                                key={title}
                                className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-white/10 dark:bg-slate-900"
                            >
                                <Icon
                                    size={24}
                                    className="text-blue-600 dark:text-blue-400"
                                />

                                <h3 className="mt-6 text-xl font-bold text-slate-950 dark:text-white">
                                    {title}
                                </h3>

                                <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                    {text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* =========================================================
                FAQ
            ========================================================== */}

            <section className="relative py-24 lg:py-32">
                <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <SectionLabel>Frequently asked</SectionLabel>

                        <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
                            A few things you may want to know.
                        </h2>
                    </div>

                    <div className="mt-12 space-y-3">
                        {faq.map((item, index) => {
                            const isOpen = openFaq === index;

                            return (
                                <div
                                    key={item.question}
                                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-slate-900"
                                >
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setOpenFaq(isOpen ? null : index)
                                        }
                                        className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                                    >
                                        <span className="font-bold text-slate-900 dark:text-white">
                                            {item.question}
                                        </span>

                                        <ChevronDown
                                            size={19}
                                            className={`shrink-0 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""
                                                }`}
                                        />
                                    </button>

                                    <div
                                        className={`grid transition-all duration-300 ${isOpen
                                            ? "grid-rows-[1fr]"
                                            : "grid-rows-[0fr]"
                                            }`}
                                    >
                                        <div className="overflow-hidden">
                                            <p className="px-6 pb-6 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                                {item.answer}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* =========================================================
                CTA
            ========================================================== */}

            <section
                id="contact"
                className="relative overflow-hidden pb-24 lg:pb-32"
            >
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 px-7 py-16 text-center shadow-2xl sm:px-12 lg:px-20 lg:py-20">
                        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-600/30 blur-[100px]" />
                        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-cyan-500/20 blur-[100px]" />

                        <div className="relative mx-auto max-w-3xl">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-blue-400">
                                <Sparkles size={25} />
                            </div>

                            <h2 className="mt-7 text-4xl font-black tracking-tight text-white sm:text-5xl">
                                Let's start with what you need.
                            </h2>

                            <p className="mt-5 text-base leading-8 text-slate-400">
                                You don't need a complete technical plan before
                                reaching out. Tell us what you are trying to
                                build, improve, purchase, automate, secure or
                                solve. We can help you work through the next
                                step.
                            </p>

                            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like a quote for our technology requirement.",
                                            { Intent: "Request quote" }
                                        )
                                    }
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-7 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-blue-50"
                                >
                                    Request a quote
                                    <ArrowRight size={17} />
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to talk to AB TECHNOLOGIES about our technology needs.",
                                            { Intent: "Talk to team" }
                                        )
                                    }
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/[0.05] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
                                >
                                    Talk to AB TECHNOLOGIES
                                    <ArrowUpRight size={17} />
                                </button>
                            </div>

                            <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs text-slate-500">
                                <span className="flex items-center gap-2">
                                    <Check size={14} />
                                    Start from scratch
                                </span>

                                <span className="flex items-center gap-2">
                                    <Check size={14} />
                                    Improve what you have
                                </span>

                                <span className="flex items-center gap-2">
                                    <Check size={14} />
                                    Plan for what comes next
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}