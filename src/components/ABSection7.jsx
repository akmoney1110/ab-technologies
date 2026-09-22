
import React, { useState } from "react";
import {
    ArrowRight,
    ChevronDown,
    CheckCircle2,
    CircleHelp,
    Headphones,
    Lightbulb,
    Network,
    ShieldCheck,
    Sparkles,
    Target,
    Users,
    Zap,
} from "lucide-react";

export default function ABAboutSection() {
    const [openFaq, setOpenFaq] = useState(0);

    const reasons = [
        {
            number: "01",
            icon: Target,
            title: "We start with your objective.",
            description:
                "We don't begin by pushing products. We first understand what you're trying to achieve, the challenges you're facing and the environment you're operating in. Then we recommend technology that makes sense for your situation.",
            color: "blue",
        },
        {
            number: "02",
            icon: Network,
            title: "We think beyond the device.",
            description:
                "A laptop, server or network device is only one part of the bigger picture. We consider infrastructure, software, connectivity, security, users, training and ongoing support.",
            color: "purple",
        },
        {
            number: "03",
            icon: Users,
            title: "Built for individuals and organizations.",
            description:
                "Whether you're an individual looking to learn, a startup buying its first computers, a school upgrading its technology or an established organization deploying hundreds of devices, we can work around your needs.",
            color: "cyan",
        },
        {
            number: "04",
            icon: ShieldCheck,
            title: "We care about security.",
            description:
                "Technology should make your organization more capable without unnecessarily exposing it to risk. We consider security, access, data protection and good technology practices throughout our work.",
            color: "emerald",
        },
        {
            number: "05",
            icon: Lightbulb,
            title: "Practical solutions over unnecessary complexity.",
            description:
                "We believe technology should solve problems, not create new ones. Our goal is to recommend solutions that are practical, understandable, scalable and appropriate for your budget.",
            color: "orange",
        },
        {
            number: "06",
            icon: Headphones,
            title: "We're here after deployment.",
            description:
                "Our relationship doesn't have to end when a project is delivered. We can provide maintenance, troubleshooting, upgrades, training and ongoing technology support as your needs evolve.",
            color: "indigo",
        },
    ];

    const faqs = [
        {
            question: "What exactly does AB Technologies do?",
            answer:
                "AB Technologies provides a broad range of technology services. This can include IT infrastructure, technology procurement, computers and equipment, networking, software development, web and mobile applications, AI and automation, cybersecurity, technology consulting, training and ongoing technical support.",
        },
        {
            question: "Do you only work with companies?",
            answer:
                "No. We can work with individuals, startups, small businesses, established companies, schools, institutions, teams and other organizations. Our services can be structured around the size, objectives and technology needs of the client.",
        },
        {
            question: "Can I contact you if I don't know what technology I need?",
            answer:
                "Absolutely. You don't need to arrive with a technical specification. Tell us what you're trying to accomplish, what you currently have and what you're struggling with. We can help identify the technology, equipment, software or approach that may be appropriate.",
        },
        {
            question: "Do you sell computers and other technology equipment?",
            answer:
                "Yes. We can assist with technology procurement and sourcing, including computers, laptops, servers, networking equipment, printers, security equipment, software and other technology products. The exact procurement approach depends on your requirements.",
        },
        {
            question: "Can you equip an entire new office?",
            answer:
                "Yes. We can help coordinate technology requirements for a new office or facility, including planning, procurement, computers, networking, connectivity, servers, software, security, deployment, configuration, user training and ongoing support.",
        },
        {
            question: "Do you build custom software?",
            answer:
                "Yes. We can design and develop custom web applications, mobile applications, SaaS platforms, dashboards, business systems, APIs, integrations and automation solutions based on your organization's requirements.",
        },
        {
            question: "Do you provide AI and automation services?",
            answer:
                "Yes. We can help identify repetitive or inefficient processes and determine where AI or automation could create practical value. Solutions may include AI-powered applications, chatbots, workflow automation, intelligent data systems and integrations.",
        },
        {
            question: "Who can receive training from AB Technologies?",
            answer:
                "Anyone can learn with us. We can train individuals, students, beginners, professionals, business owners, employees, technical teams, schools, institutions and organizations. Training can range from basic computer and digital skills to software, programming, networking, cybersecurity, AI and other technology subjects.",
        },
        {
            question: "Can you train my employees on software we implement?",
            answer:
                "Yes. Training can be included as part of a technology deployment. We can help users understand the software, systems, devices and workflows they need to use so that your investment in technology translates into real day-to-day productivity.",
        },
        {
            question: "Do you provide ongoing support after a project?",
            answer:
                "Yes. Depending on the engagement, we can provide technical support, maintenance, troubleshooting, updates, system improvements, infrastructure management and additional training after deployment.",
        },
        {
            question: "Can you work with a small budget?",
            answer:
                "We aim to recommend solutions that match the actual requirements and available budget. Rather than assuming that the most expensive option is the best option, we can help prioritize what matters most and identify a practical path forward.",
        },
        {
            question: "How do I get started?",
            answer:
                "Simply contact us and explain what you're trying to achieve. You can request a consultation, ask about a specific service or describe a problem you're trying to solve. We'll help determine the appropriate next step.",
        },
    ];

    const colorClasses = {
        blue: {
            icon: "bg-blue-500/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400",
            number:
                "bg-blue-500/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400",
        },
        purple: {
            icon: "bg-purple-500/10 text-purple-600 dark:bg-purple-400/10 dark:text-purple-400",
            number:
                "bg-purple-500/10 text-purple-600 dark:bg-purple-400/10 dark:text-purple-400",
        },
        cyan: {
            icon: "bg-cyan-500/10 text-cyan-600 dark:bg-cyan-400/10 dark:text-cyan-400",
            number:
                "bg-cyan-500/10 text-cyan-600 dark:bg-cyan-400/10 dark:text-cyan-400",
        },
        emerald: {
            icon: "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400",
            number:
                "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400",
        },
        orange: {
            icon: "bg-orange-500/10 text-orange-600 dark:bg-orange-400/10 dark:text-orange-400",
            number:
                "bg-orange-500/10 text-orange-600 dark:bg-orange-400/10 dark:text-orange-400",
        },
        indigo: {
            icon: "bg-indigo-500/10 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-400",
            number:
                "bg-indigo-500/10 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-400",
        },
    };

    return (
        <>
            {/* =========================================================
                WHY AB TECHNOLOGIES
            ========================================================== */}

            <section
                id="about"
                className="
                    relative isolate overflow-hidden
                    py-24 lg:py-32
                    bg-slate-50
                    text-slate-950
                    transition-colors duration-500
                    dark:bg-slate-950
                    dark:text-white
                "
            >
                {/* Background atmosphere */}

                <div
                    className="
                        pointer-events-none
                        absolute
                        -top-64
                        -left-48
                        h-[700px]
                        w-[700px]
                        rounded-full
                        bg-blue-500/10
                        blur-3xl
                        dark:bg-blue-600/10
                    "
                />

                <div
                    className="
                        pointer-events-none
                        absolute
                        top-1/3
                        -right-56
                        h-[650px]
                        w-[650px]
                        rounded-full
                        bg-purple-500/10
                        blur-3xl
                        dark:bg-purple-600/10
                    "
                />

                <div
                    className="
                        pointer-events-none
                        absolute
                        bottom-0
                        left-1/3
                        h-[400px]
                        w-[400px]
                        rounded-full
                        bg-cyan-500/5
                        blur-3xl
                    "
                />

                {/* Grid */}

                <div
                    className="
                        pointer-events-none
                        absolute inset-0
                        opacity-40
                        dark:opacity-20
                        [background-image:linear-gradient(to_right,rgba(100,116,139,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(100,116,139,0.10)_1px,transparent_1px)]
                        [background-size:52px_52px]
                        [mask-image:linear-gradient(to_bottom,black,transparent_90%)]
                    "
                />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    {/* Header */}

                    <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">

                        <div>

                            <div
                                className="
                                    inline-flex
                                    items-center
                                    gap-2
                                    rounded-full
                                    border
                                    border-blue-500/20
                                    bg-blue-500/5
                                    px-4 py-2
                                    text-xs
                                    font-bold
                                    uppercase
                                    tracking-[0.18em]
                                    text-blue-600
                                    dark:border-blue-400/20
                                    dark:bg-blue-400/5
                                    dark:text-blue-400
                                "
                            >
                                <Sparkles className="h-4 w-4" />

                                Why AB Technologies
                            </div>

                            <h2
                                className="
                                    mt-6
                                    text-4xl
                                    font-black
                                    leading-[1.05]
                                    tracking-[-0.05em]
                                    sm:text-5xl
                                    lg:text-6xl
                                "
                            >
                                More than a technology vendor.
                                <span
                                    className="
                                        block
                                        bg-gradient-to-r
                                        from-blue-600
                                        via-indigo-500
                                        to-purple-600
                                        bg-clip-text
                                        text-transparent
                                        dark:from-blue-400
                                        dark:via-cyan-400
                                        dark:to-purple-400
                                    "
                                >
                                    Your technology partner.
                                </span>
                            </h2>

                        </div>

                        <div>

                            <p
                                className="
                                    max-w-2xl
                                    text-lg
                                    leading-8
                                    text-slate-600
                                    dark:text-slate-400
                                "
                            >
                                Technology is not just about buying devices or
                                installing software. It's about giving people
                                and organizations the tools, systems, knowledge
                                and support they need to do better work.
                            </p>

                            <p
                                className="
                                    mt-4
                                    max-w-2xl
                                    leading-7
                                    text-slate-500
                                    dark:text-slate-500
                                "
                            >
                                That's the approach we bring to every project,
                                whether we're helping one person learn a new
                                skill or helping an organization build an
                                entire technology environment.
                            </p>

                        </div>

                    </div>

                    {/* Reasons */}

                    <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                        {reasons.map((reason) => {
                            const Icon = reason.icon;
                            const colors = colorClasses[reason.color];

                            return (
                                <div
                                    key={reason.number}
                                    className="
                                        group
                                        relative
                                        overflow-hidden
                                        rounded-[2rem]
                                        border
                                        border-slate-200/80
                                        bg-white/70
                                        p-7
                                        backdrop-blur-xl
                                        transition-all
                                        duration-500
                                        hover:-translate-y-2
                                        hover:shadow-2xl
                                        dark:border-white/10
                                        dark:bg-slate-900/60
                                    "
                                >

                                    <div
                                        className="
                                            pointer-events-none
                                            absolute
                                            -right-16
                                            -top-16
                                            h-40
                                            w-40
                                            rounded-full
                                            bg-blue-500/5
                                            blur-3xl
                                            transition-transform
                                            duration-500
                                            group-hover:scale-150
                                        "
                                    />

                                    <div className="relative">

                                        <div className="flex items-center justify-between">

                                            <div
                                                className={`
                                                    flex
                                                    h-12 w-12
                                                    items-center
                                                    justify-center
                                                    rounded-2xl
                                                    ${colors.icon}
                                                    transition-transform
                                                    duration-300
                                                    group-hover:scale-110
                                                `}
                                            >
                                                <Icon className="h-5 w-5" />
                                            </div>

                                            <span
                                                className={`
                                                    flex
                                                    h-9 w-9
                                                    items-center
                                                    justify-center
                                                    rounded-full
                                                    text-xs
                                                    font-black
                                                    ${colors.number}
                                                `}
                                            >
                                                {reason.number}
                                            </span>

                                        </div>

                                        <h3
                                            className="
                                                mt-7
                                                text-xl
                                                font-black
                                                tracking-tight
                                            "
                                        >
                                            {reason.title}
                                        </h3>

                                        <p
                                            className="
                                                mt-3
                                                text-sm
                                                leading-7
                                                text-slate-500
                                                dark:text-slate-400
                                            "
                                        >
                                            {reason.description}
                                        </p>

                                        <div
                                            className="
                                                mt-6
                                                h-px
                                                w-10
                                                bg-slate-200
                                                transition-all
                                                duration-300
                                                group-hover:w-20
                                                group-hover:bg-blue-500
                                                dark:bg-white/10
                                            "
                                        />

                                    </div>
                                </div>
                            );
                        })}

                    </div>

                    {/* Promise strip */}

                    <div
                        className="
                            mt-8
                            grid
                            gap-4
                            rounded-[2rem]
                            border
                            border-slate-200
                            bg-white/60
                            p-6
                            backdrop-blur-xl
                            sm:grid-cols-3
                            dark:border-white/10
                            dark:bg-white/[0.03]
                        "
                    >

                        {[
                            {
                                icon: Zap,
                                title: "Practical",
                                text: "Solutions built around real needs.",
                            },
                            {
                                icon: Users,
                                title: "People-first",
                                text: "Technology your people can actually use.",
                            },
                            {
                                icon: CheckCircle2,
                                title: "End-to-end",
                                text: "From planning through support.",
                            },
                        ].map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.title}
                                    className="flex items-center gap-4 p-3"
                                >
                                    <div
                                        className="
                                            flex
                                            h-11 w-11
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-xl
                                            bg-blue-500/10
                                            text-blue-600
                                            dark:text-blue-400
                                        "
                                    >
                                        <Icon className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <h4 className="font-black">
                                            {item.title}
                                        </h4>

                                        <p
                                            className="
                                                mt-1
                                                text-sm
                                                text-slate-500
                                                dark:text-slate-500
                                            "
                                        >
                                            {item.text}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}

                    </div>

                </div>
            </section>

            {/* =========================================================
                FAQ
            ========================================================== */}

            <section
                id="faq"
                className="
                    relative isolate overflow-hidden
                    py-24 lg:py-32
                    bg-white
                    text-slate-950
                    dark:bg-slate-900
                    dark:text-white
                "
            >

                {/* Background shapes */}

                <div
                    className="
                        pointer-events-none
                        absolute
                        -left-48
                        top-20
                        h-[500px]
                        w-[500px]
                        rounded-full
                        bg-indigo-500/5
                        blur-3xl
                        dark:bg-indigo-500/10
                    "
                />

                <div
                    className="
                        pointer-events-none
                        absolute
                        -right-40
                        bottom-0
                        h-[500px]
                        w-[500px]
                        rounded-full
                        bg-blue-500/5
                        blur-3xl
                        dark:bg-blue-500/10
                    "
                />

                <div className="relative mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">

                    {/* FAQ header */}

                    <div className="mx-auto max-w-3xl text-center">

                        <div
                            className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-full
                                border
                                border-purple-500/20
                                bg-purple-500/5
                                px-4 py-2
                                text-xs
                                font-bold
                                uppercase
                                tracking-[0.18em]
                                text-purple-600
                                dark:border-purple-400/20
                                dark:bg-purple-400/5
                                dark:text-purple-400
                            "
                        >
                            <CircleHelp className="h-4 w-4" />

                            Frequently Asked Questions
                        </div>

                        <h2
                            className="
                                mt-6
                                text-4xl
                                font-black
                                tracking-[-0.04em]
                                sm:text-5xl
                            "
                        >
                            Questions?
                            <span
                                className="
                                    block
                                    bg-gradient-to-r
                                    from-blue-600
                                    to-purple-600
                                    bg-clip-text
                                    text-transparent
                                    dark:from-blue-400
                                    dark:to-purple-400
                                "
                            >
                                We've got answers.
                            </span>
                        </h2>

                        <p
                            className="
                                mt-5
                                text-lg
                                leading-8
                                text-slate-600
                                dark:text-slate-400
                            "
                        >
                            Here are some of the questions we commonly receive
                            about our services, technology solutions and
                            training.
                        </p>

                    </div>

                    {/* FAQ list */}

                    <div className="mt-14 space-y-3">

                        {faqs.map((faq, index) => {
                            const isOpen = openFaq === index;

                            return (
                                <div
                                    key={faq.question}
                                    className={`
                                        overflow-hidden
                                        rounded-2xl
                                        border
                                        transition-all
                                        duration-300
                                        ${isOpen
                                            ? "border-blue-300 bg-blue-50/60 shadow-lg shadow-blue-500/5 dark:border-blue-400/20 dark:bg-blue-500/5"
                                            : "border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.02]"
                                        }
                                    `}
                                >

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setOpenFaq(
                                                isOpen ? -1 : index
                                            )
                                        }
                                        className="
                                            flex
                                            w-full
                                            items-center
                                            justify-between
                                            gap-6
                                            px-6
                                            py-6
                                            text-left
                                        "
                                        aria-expanded={isOpen}
                                    >

                                        <div className="flex items-start gap-4">

                                            <span
                                                className="
                                                    mt-0.5
                                                    text-xs
                                                    font-black
                                                    text-slate-300
                                                    dark:text-slate-700
                                                "
                                            >
                                                {String(index + 1).padStart(
                                                    2,
                                                    "0"
                                                )}
                                            </span>

                                            <span
                                                className="
                                                    text-base
                                                    font-bold
                                                    text-slate-900
                                                    dark:text-white
                                                    sm:text-lg
                                                "
                                            >
                                                {faq.question}
                                            </span>

                                        </div>

                                        <span
                                            className={`
                                                flex
                                                h-9 w-9
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-full
                                                transition-all
                                                duration-300
                                                ${isOpen
                                                    ? "rotate-180 bg-blue-600 text-white"
                                                    : "bg-slate-100 text-slate-500 dark:bg-white/10 dark:text-slate-400"
                                                }
                                            `}
                                        >
                                            <ChevronDown className="h-4 w-4" />
                                        </span>

                                    </button>

                                    <div
                                        className={`
                                            grid
                                            transition-all
                                            duration-300
                                            ${isOpen
                                                ? "grid-rows-[1fr]"
                                                : "grid-rows-[0fr]"
                                            }
                                        `}
                                    >
                                        <div className="overflow-hidden">

                                            <div
                                                className="
                                                    border-t
                                                    border-slate-200/70
                                                    px-6
                                                    pb-6
                                                    pt-5
                                                    pl-[4.5rem]
                                                    text-sm
                                                    leading-7
                                                    text-slate-600
                                                    dark:border-white/5
                                                    dark:text-slate-400
                                                "
                                            >
                                                {faq.answer}
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            );
                        })}

                    </div>

                </div>
            </section>

            {/* =========================================================
                FINAL CTA
            ========================================================== */}

            {/* =========================================================
    FINAL CTA — DARK + LIGHT MODE
========================================================= */}

            <section
                id="contact"
                className="
        relative isolate overflow-hidden
        py-24 lg:py-32
        bg-slate-100 text-slate-950
        transition-colors duration-500
        dark:bg-slate-950 dark:text-white
    "
            >
                {/* =========================
        LIGHT MODE ATMOSPHERE
    ========================== */}

                <div
                    className="
            pointer-events-none absolute
            -top-48 -left-40
            h-[600px] w-[600px]
            rounded-full
            bg-blue-400/15
            blur-3xl
            dark:bg-blue-600/15
        "
                />

                <div
                    className="
            pointer-events-none absolute
            -bottom-56 -right-40
            h-[650px] w-[650px]
            rounded-full
            bg-purple-400/15
            blur-3xl
            dark:bg-purple-600/15
        "
                />

                <div
                    className="
            pointer-events-none absolute
            top-1/3 left-1/2
            h-[350px] w-[350px]
            -translate-x-1/2
            rounded-full
            bg-cyan-400/10
            blur-3xl
            dark:bg-cyan-500/10
        "
                />

                {/* =========================
        TECH GRID
    ========================== */}

                <div
                    className="
            pointer-events-none absolute inset-0
            opacity-40
            dark:opacity-20
            [background-image:linear-gradient(to_right,rgba(100,116,139,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(100,116,139,0.10)_1px,transparent_1px)]
            [background-size:60px_60px]
        "
                />

                <div className="relative mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">

                    {/* =========================
            CTA CARD
        ========================== */}

                    <div
                        className="
                relative overflow-hidden
                rounded-[2.5rem]
                border
                border-slate-200
                bg-white/70
                p-8
                text-center
                shadow-2xl shadow-slate-300/30
                backdrop-blur-2xl
                transition-all duration-500
                sm:p-12
                lg:p-16

                dark:border-white/10
                dark:bg-white/[0.045]
                dark:shadow-blue-950/20
            "
                    >

                        {/* Card glow */}

                        <div
                            className="
                    pointer-events-none absolute
                    left-1/2 top-0
                    h-48 w-[70%]
                    -translate-x-1/2
                    rounded-full
                    bg-blue-500/10
                    blur-3xl
                    dark:bg-blue-500/10
                "
                        />

                        {/* Decorative circles */}

                        <div
                            className="
                    pointer-events-none absolute
                    -right-16 -top-16
                    h-40 w-40
                    rounded-full
                    border
                    border-blue-500/10
                    dark:border-blue-400/10
                "
                        />

                        <div
                            className="
                    pointer-events-none absolute
                    -left-20 -bottom-20
                    h-48 w-48
                    rounded-full
                    border
                    border-purple-500/10
                    dark:border-purple-400/10
                "
                        />

                        <div className="relative">

                            {/* =========================
                    BADGE
                ========================== */}

                            <div
                                className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        border
                        border-blue-500/20
                        bg-blue-500/10
                        px-4 py-2
                        text-sm
                        font-semibold
                        text-blue-700

                        dark:border-blue-400/20
                        dark:bg-blue-400/10
                        dark:text-blue-300
                    "
                            >
                                <Sparkles className="h-4 w-4" />

                                Let's build something better
                            </div>

                            {/* =========================
                    HEADING
                ========================== */}

                            <h2
                                className="
                        mx-auto
                        mt-7
                        max-w-4xl
                        text-4xl
                        font-black
                        leading-[1.05]
                        tracking-[-0.05em]
                        sm:text-5xl
                        lg:text-6xl
                    "
                            >
                                Not sure what you need?

                                <span
                                    className="
                            block
                            bg-gradient-to-r
                            from-blue-600
                            via-cyan-500
                            to-purple-600
                            bg-clip-text
                            text-transparent

                            dark:from-blue-400
                            dark:via-cyan-300
                            dark:to-purple-400
                        "
                                >
                                    That's exactly why we're here.
                                </span>
                            </h2>

                            {/* =========================
                    DESCRIPTION
                ========================== */}

                            <p
                                className="
                        mx-auto
                        mt-6
                        max-w-2xl
                        text-base
                        leading-8
                        text-slate-600

                        dark:text-slate-400
                        sm:text-lg
                    "
                            >
                                Tell us what you're trying to achieve. Whether you need
                                technology procurement, IT infrastructure, custom
                                software, AI and automation, cybersecurity, training or
                                ongoing support, we'll help you determine the right way
                                forward.
                            </p>

                            {/* =========================
                    SERVICE PILLS
                ========================== */}

                            <div
                                className="
                        mx-auto
                        mt-9
                        flex
                        max-w-4xl
                        flex-wrap
                        justify-center
                        gap-2
                    "
                            >
                                {[
                                    "IT & Infrastructure",
                                    "Procurement",
                                    "Software",
                                    "Web & Mobile",
                                    "AI & Automation",
                                    "Cybersecurity",
                                    "Training",
                                    "Support",
                                ].map((item) => (
                                    <span
                                        key={item}
                                        className="
                                rounded-full
                                border
                                border-slate-200
                                bg-slate-50
                                px-4 py-2
                                text-xs
                                font-semibold
                                text-slate-600
                                transition-colors

                                dark:border-white/10
                                dark:bg-white/5
                                dark:text-slate-300
                            "
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>

                            {/* =========================
                    BUTTONS
                ========================== */}

                            <div
                                className="
                        mt-10
                        flex
                        flex-col
                        justify-center
                        gap-4
                        sm:flex-row
                    "
                            >

                                {/* PRIMARY */}

                                <a
                                    href="/support"
                                    className="
                            group
                            inline-flex
                            items-center
                            justify-center
                            gap-2
                            rounded-2xl
                            bg-slate-950
                            px-7 py-4
                            font-black
                            text-white
                            shadow-xl
                            shadow-slate-950/10
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:bg-blue-600
                            hover:shadow-blue-500/25

                            dark:bg-white
                            dark:text-slate-950
                            dark:shadow-black/20
                            dark:hover:bg-blue-500
                            dark:hover:text-white
                        "
                                >
                                    Request a Consultation

                                    <ArrowRight
                                        className="
                                h-4 w-4
                                transition-transform
                                duration-300
                                group-hover:translate-x-1
                            "
                                    />
                                </a>

                                {/* SECONDARY */}

                                <a
                                    href="/support"
                                    className="
                            inline-flex
                            items-center
                            justify-center
                            gap-2
                            rounded-2xl
                            border
                            border-slate-300
                            bg-white/70
                            px-7 py-4
                            font-black
                            text-slate-900
                            backdrop-blur
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:border-blue-400
                            hover:bg-blue-50

                            dark:border-white/15
                            dark:bg-white/5
                            dark:text-white
                            dark:hover:border-white/30
                            dark:hover:bg-white/10
                        "
                                >
                                    Talk to Our Team
                                </a>

                            </div>

                            {/* =========================
                    SMALL TRUST LINE
                ========================== */}

                            <div
                                className="
                        mt-8
                        flex
                        flex-wrap
                        items-center
                        justify-center
                        gap-x-6
                        gap-y-3
                        text-xs
                        text-slate-500
                        dark:text-slate-500
                    "
                            >

                                <span className="flex items-center gap-2">
                                    <CheckCircle2
                                        className="
                                h-4 w-4
                                text-emerald-500
                            "
                                    />
                                    Practical solutions
                                </span>

                                <span className="flex items-center gap-2">
                                    <CheckCircle2
                                        className="
                                h-4 w-4
                                text-blue-500
                            "
                                    />
                                    Built around your needs
                                </span>

                                <span className="flex items-center gap-2">
                                    <CheckCircle2
                                        className="
                                h-4 w-4
                                text-purple-500
                            "
                                    />
                                    Support beyond delivery
                                </span>

                            </div>

                        </div>
                    </div>
                </div>
            </section>


        </>
    );
}

