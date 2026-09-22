import {
    ArrowRight,
    CheckCircle2,
    Cpu,
    Layers3,
    Network,
    Rocket,
    ShieldCheck,
    Sparkles,
    Workflow,
} from "lucide-react";

export default function TechnologyPartnerSection() {
    const pathways = [
        {
            number: "01",
            icon: Rocket,
            eyebrow: "BUILD FROM ZERO",
            title: "Starting from scratch?",
            description:
                "We help you build the technology foundation your organization needs — from computers/devices and networks/connectivity to software, cloud, security and business systems.",
            points: [
                "Technology planning",
                "Hardware & infrastructure",
                "Software & business systems",
            ],
            color: "sky",
        },
        {
            number: "02",
            icon: Layers3,
            eyebrow: "SCALE WITH CONFIDENCE",
            title: "Need technology at scale?",
            description:
                "From a few devices to large corporate or institutional deployments, we coordinate sourcing, verification, logistics and implementation.",
            points: [
                "Corporate procurement",
                "Supplier coordination",
                "Deployment & logistics",
            ],
            color: "purple",
        },
        {
            number: "03",
            icon: Workflow,
            eyebrow: "MODERNIZE & IMPROVE",
            title: "Already have technology?",
            description:
                "We can improve what you already have — modernizing systems, integrating platforms, strengthening security and keeping your environment running.",
            points: [
                "Modernization & integration",
                "Security & optimization",
                "Managed IT & support",
            ],
            color: "cyan",
        },
    ];

    const journey = [
        {
            number: "01",
            title: "Understand",
            description: "Your goals, environment & requirements",
            icon: Sparkles,
            color: "text-sky-400",
            bg: "bg-sky-500/10",
            border: "border-sky-500/20",
        },
        {
            number: "02",
            title: "Plan",
            description: "The right technology strategy",
            icon: Layers3,
            color: "text-purple-400",
            bg: "bg-purple-500/10",
            border: "border-purple-500/20",
        },
        {
            number: "03",
            title: "Source & Build",
            description: "Hardware, software & infrastructure",
            icon: Cpu,
            color: "text-cyan-400",
            bg: "bg-cyan-500/10",
            border: "border-cyan-500/20",
        },
        {
            number: "04",
            title: "Deploy",
            description: "Install, configure & integrate",
            icon: Network,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
            border: "border-emerald-500/20",
        },
        {
            number: "05",
            title: "Support",
            description: "Maintain, secure & improve",
            icon: ShieldCheck,
            color: "text-orange-400",
            bg: "bg-orange-500/10",
            border: "border-orange-500/20",
        },
    ];

    return (
        <section
            id="technology-partner"
            className="
                relative
                overflow-hidden
                bg-slate-50
                py-22
                text-slate-900
                dark:bg-slate-950
                dark:text-white
                sm:py-22
                lg:py-22
            "
        >
            {/* =========================================================
                BACKGROUND  —  LIGHT MODE GRID
            ========================================================= */}

            <div
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    block
                    dark:hidden
                    opacity-[0.04]
                "
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(0,0,0,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.15) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />

            {/* =========================================================
                BACKGROUND  —  DARK MODE GRID
            ========================================================= */}

            <div
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    hidden
                    dark:block
                    opacity-[0.035]
                "
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    left-[-180px]
                    top-[15%]
                    h-[500px]
                    w-[500px]
                    rounded-full
                    bg-sky-400/10
                    blur-[120px]
                    dark:bg-sky-500/[0.06]
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    right-[-180px]
                    bottom-[5%]
                    h-[500px]
                    w-[500px]
                    rounded-full
                    bg-purple-400/10
                    blur-[120px]
                    dark:bg-purple-500/[0.05]
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    inset-x-0
                    top-0
                    h-px
                    bg-gradient-to-r
                    from-transparent
                    via-slate-900/10
                    to-transparent
                    dark:via-white/10
                "
            />

            <div
                className="
                    relative
                    mx-auto
                    max-w-7xl
                    px-5
                    sm:px-6
                    lg:px-8
                "
            >
                {/* =====================================================
                    SECTION INTRO
                ===================================================== */}

                <div className="max-w-4xl">
                    <div className="flex items-center gap-3">
                        <span
                            className="
                                h-px
                                w-10
                                bg-sky-500
                            "
                        />

                        <span
                            className="
                                text-[10px]
                                font-bold
                                uppercase
                                tracking-[0.28em]
                                text-sky-400
                            "
                        >
                            Your Technology Partner
                        </span>
                    </div>

                    <h2
                        className="
                            mt-6
                            max-w-4xl
                            text-4xl
                            font-black
                            leading-[1.05]
                            tracking-[-0.035em]
                            text-slate-900
                            dark:text-white
                            sm:text-5xl
                            lg:text-6xl
                        "
                    >
                        You focus on your business.
                        <span className="block text-slate-500">
                            We handle the technology behind it.
                        </span>
                    </h2>

                    <p
                        className="
                            mt-7
                            max-w-2xl
                            text-base
                            leading-8
                            text-slate-500
                            sm:text-lg
                        "
                    >
                        Whether you're starting from scratch, expanding
                        operations or modernizing an existing environment,
                        we help you make the right technology decisions —
                        then turn those decisions into working systems.
                    </p>
                </div>

                {/* =====================================================
                    THREE PATHWAYS
                ===================================================== */}

                <div
                    className="
                        mt-16
                        grid
                        gap-4
                        md:grid-cols-3
                        lg:mt-20
                    "
                >
                    {pathways.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.number}
                                className="
                                    group
                                    relative
                                    overflow-hidden
                                    rounded-[1.75rem]
                                    border
                                    border-slate-200
                                    bg-white
                                    p-6
                                    transition-all
                                    duration-500
                                    hover:-translate-y-1
                                    hover:border-slate-300
                                    hover:bg-slate-50
                                    dark:border-white/[0.07]
                                    dark:bg-white/[0.025]
                                    dark:hover:border-white/[0.14]
                                    dark:hover:bg-white/[0.04]
                                    sm:p-7
                                "
                            >
                                {/* Card glow */}

                                <div
                                    className={`
                                        pointer-events-none
                                        absolute
                                        -right-20
                                        -top-20
                                        h-40
                                        w-40
                                        rounded-full
                                        blur-[70px]
                                        opacity-0
                                        transition-opacity
                                        duration-500
                                        group-hover:opacity-100
                                        ${item.color === "sky"
                                            ? "bg-sky-500/20"
                                            : item.color === "purple"
                                                ? "bg-purple-500/20"
                                                : "bg-cyan-500/20"
                                        }
                                    `}
                                />

                                <div className="relative">
                                    {/* TOP */}

                                    <div className="flex items-center justify-between">
                                        <div
                                            className="
                                                flex
                                                h-11
                                                w-11
                                                items-center
                                                justify-center
                                                rounded-xl
                                                border
                                                border-slate-200
                                                bg-slate-100
                                                dark:border-white/10
                                                dark:bg-white/[0.04]
                                            "
                                        >
                                            <Icon
                                                size={19}
                                                className={
                                                    item.color === "sky"
                                                        ? "text-sky-400"
                                                        : item.color ===
                                                            "purple"
                                                            ? "text-purple-400"
                                                            : "text-cyan-400"
                                                }
                                            />
                                        </div>

                                        <span
                                            className="
                                                text-3xl
                                                font-black
                                                tracking-tight
                                                text-slate-900/10
                                                dark:text-white/[0.08]
                                            "
                                        >
                                            {item.number}
                                        </span>
                                    </div>

                                    <div
                                        className="
                                            mt-7
                                            text-[9px]
                                            font-bold
                                            uppercase
                                            tracking-[0.22em]
                                            text-slate-500
                                        "
                                    >
                                        {item.eyebrow}
                                    </div>

                                    <h3
                                        className="
                                            mt-2
                                            text-xl
                                            font-bold
                                            tracking-tight
                                            text-slate-900
                                            dark:text-white
                                        "
                                    >
                                        {item.title}
                                    </h3>

                                    <p
                                        className="
                                            mt-3
                                            text-sm
                                            leading-6
                                            text-slate-500
                                        "
                                    >
                                        {item.description}
                                    </p>

                                    {/* POINTS */}

                                    <div
                                        className="
                                            mt-6
                                            border-t
                                            border-slate-200
                                            pt-5
                                            dark:border-white/[0.06]
                                        "
                                    >
                                        <div className="space-y-2.5">
                                            {item.points.map((point) => (
                                                <div
                                                    key={point}
                                                    className="
                                                        flex
                                                        items-center
                                                        gap-2.5
                                                        text-[11px]
                                                        font-medium
                                                        text-slate-500
                                                        dark:text-slate-400
                                                    "
                                                >
                                                    <CheckCircle2
                                                        size={13}
                                                        className="
                                                            shrink-0
                                                            text-slate-400
                                                            dark:text-slate-600
                                                        "
                                                    />

                                                    <span>{point}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* ARROW */}

                                    <div
                                        className="
                                            mt-7
                                            flex
                                            items-center
                                            gap-2
                                            text-[10px]
                                            font-bold
                                            uppercase
                                            tracking-[0.15em]
                                            text-slate-500
                                            transition-colors
                                            duration-300
                                            group-hover:text-slate-900
                                            dark:group-hover:text-white
                                        "
                                    >
                                        Explore the possibilities

                                        <ArrowRight
                                            size={13}
                                            className="
                                                transition-transform
                                                duration-300
                                                group-hover:translate-x-1
                                            "
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* =====================================================
                    END-TO-END AREA
                ===================================================== */}

                <div
                    className="
                        mt-20
                        grid
                        items-center
                        gap-10
                        lg:mt-28
                        lg:grid-cols-[0.82fr_1.18fr]
                        lg:gap-16
                    "
                >
                    {/* LEFT COPY */}

                    <div>
                        <div className="flex items-center gap-3">
                            <span
                                className="
                                    h-px
                                    w-8
                                    bg-purple-400
                                "
                            />

                            <span
                                className="
                                    text-[9px]
                                    font-bold
                                    uppercase
                                    tracking-[0.25em]
                                    text-purple-400
                                "
                            >
                                End-to-End Delivery
                            </span>
                        </div>

                        <h3
                            className="
                                mt-5
                                text-3xl
                                font-black
                                leading-tight
                                tracking-tight
                                text-slate-900
                                dark:text-white
                                sm:text-4xl
                            "
                        >
                            One technology partner.
                            <span className="block text-slate-500">
                                From idea to infrastructure.
                            </span>
                        </h3>

                        <p
                            className="
                                mt-5
                                max-w-lg
                                text-sm
                                leading-7
                                text-slate-500
                            "
                        >
                            Technology projects rarely involve just one
                            thing. A new office may need computers, networking,
                            cloud services, security, software and support.
                            We bring those pieces together into one coordinated
                            technology journey.
                        </p>

                        <div
                            className="
                                mt-7
                                flex
                                flex-wrap
                                gap-x-5
                                gap-y-3
                            "
                        >
                            {[
                                "Plan",
                                "Source",
                                "Build",
                                "Deploy",
                                "Support",
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="
                                        flex
                                        items-center
                                        gap-2
                                        text-[10px]
                                        font-bold
                                        uppercase
                                        tracking-[0.14em]
                                        text-slate-400
                                    "
                                >
                                    <span className="h-1 w-1 rounded-full bg-sky-400" />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* =================================================
                        JOURNEY PANEL
                    ================================================= */}

                    <div className="relative">
                        <div
                            className="
                                absolute
                                -inset-4
                                rounded-[2rem]
                                bg-sky-400/10
                                blur-2xl
                                dark:bg-sky-500/[0.035]
                            "
                        />

                        <div
                            className="
                                relative
                                overflow-hidden
                                rounded-[2rem]
                                border
                                border-slate-200
                                bg-white
                                shadow-[0_35px_100px_rgba(0,0,0,0.1)]
                                dark:border-white/[0.09]
                                dark:bg-[#050a14]
                                dark:shadow-[0_35px_100px_rgba(0,0,0,.4)]
                            "
                        >
                            {/* Browser header */}

                            <div
                                className="
                                    flex
                                    items-center
                                    justify-between
                                    border-b
                                    border-slate-200
                                    px-5
                                    py-4
                                    dark:border-white/[0.07]
                                    sm:px-6
                                "
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex gap-1.5">
                                        <span className="h-2 w-2 rounded-full bg-red-400/80" />
                                        <span className="h-2 w-2 rounded-full bg-yellow-400/80" />
                                        <span className="h-2 w-2 rounded-full bg-green-400/80" />
                                    </div>

                                    <span
                                        className="
                                            text-[10px]
                                            font-medium
                                            text-slate-400
                                            dark:text-white/40
                                        "
                                    >
                                        AB Technology Journey
                                    </span>
                                </div>

                                <div
                                    className="
                                        hidden
                                        text-[8px]
                                        font-bold
                                        uppercase
                                        tracking-[0.2em]
                                        text-slate-400
                                        dark:text-white/25
                                        sm:block
                                    "
                                >
                                    END-TO-END
                                </div>
                            </div>

                            <div className="p-5 sm:p-7">
                                <div className="flex items-end justify-between gap-4">
                                    <div>
                                        <div
                                            className="
                                                text-[9px]
                                                font-bold
                                                uppercase
                                                tracking-[0.2em]
                                                text-sky-400
                                            "
                                        >
                                            How we deliver
                                        </div>

                                        <div
                                            className="
                                                mt-2
                                                text-xl
                                                font-bold
                                                tracking-tight
                                                text-slate-900
                                                dark:text-white
                                                sm:text-2xl
                                            "
                                        >
                                            From requirement to reality.
                                        </div>
                                    </div>

                                    <div
                                        className="
                                            hidden
                                            h-10
                                            w-10
                                            items-center
                                            justify-center
                                            rounded-xl
                                            border
                                            border-slate-200
                                            bg-slate-100
                                            sm:flex
                                            dark:border-white/10
                                            dark:bg-white/[0.03]
                                        "
                                    >
                                        <Workflow
                                            size={17}
                                            className="text-sky-400"
                                        />
                                    </div>
                                </div>

                                {/* Journey */}

                                <div className="relative mt-7">
                                    {/* Connecting line */}

                                    <div
                                        className="
                                            absolute
                                            bottom-6
                                            left-5
                                            top-6
                                            w-px
                                            bg-gradient-to-b
                                            from-sky-500/40
                                            via-purple-500/30
                                            to-orange-500/30
                                            sm:left-[22px]
                                        "
                                    />

                                    <div className="relative space-y-2.5">
                                        {journey.map((step) => {
                                            const Icon = step.icon;

                                            return (
                                                <div
                                                    key={step.number}
                                                    className="
                                                        group/journey
                                                        relative
                                                        flex
                                                        items-center
                                                        gap-4
                                                        rounded-2xl
                                                        border
                                                        border-slate-200
                                                        bg-slate-50
                                                        p-3.5
                                                        transition-all
                                                        duration-300
                                                        hover:border-slate-300
                                                        hover:bg-slate-100
                                                        dark:border-white/[0.05]
                                                        dark:bg-white/[0.018]
                                                        dark:hover:border-white/[0.1]
                                                        dark:hover:bg-white/[0.035]
                                                        sm:p-4
                                                    "
                                                >
                                                    <div
                                                        className={`
                                                            relative
                                                            z-10
                                                            flex
                                                            h-10
                                                            w-10
                                                            shrink-0
                                                            items-center
                                                            justify-center
                                                            rounded-xl
                                                            border
                                                            ${step.border}
                                                            ${step.bg}
                                                            ${step.color}
                                                        `}
                                                    >
                                                        <Icon size={16} />
                                                    </div>

                                                    <div className="min-w-0 flex-1">
                                                        <div className="flex items-center gap-2">
                                                            <span
                                                                className="
                                                                    text-[8px]
                                                                    font-bold
                                                                    tracking-[0.15em]
                                                                    text-slate-500
                                                                    dark:text-slate-600
                                                                "
                                                            >
                                                                {step.number}
                                                            </span>

                                                            <h4
                                                                className="
                                                                    text-[11px]
                                                                    font-bold
                                                                    text-slate-700
                                                                    transition-colors
                                                                    group-hover/journey:text-slate-900
                                                                    dark:text-slate-200
                                                                    dark:group-hover/journey:text-white
                                                                "
                                                            >
                                                                {step.title}
                                                            </h4>
                                                        </div>

                                                        <p
                                                            className="
                                                                mt-0.5
                                                                text-[10px]
                                                                leading-4
                                                                text-slate-500
                                                                dark:text-slate-600
                                                            "
                                                        >
                                                            {step.description}
                                                        </p>
                                                    </div>

                                                    <ArrowRight
                                                        size={13}
                                                        className="
                                                            mr-1
                                                            shrink-0
                                                            text-slate-400
                                                            transition-all
                                                            duration-300
                                                            group-hover/journey:translate-x-1
                                                            group-hover/journey:text-slate-600
                                                            dark:text-slate-700
                                                            dark:group-hover/journey:text-slate-400
                                                        "
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Panel footer */}

                            <div
                                className="
                                    flex
                                    flex-col
                                    gap-3
                                    border-t
                                    border-slate-200
                                    bg-slate-50
                                    px-5
                                    py-4
                                    sm:flex-row
                                    sm:items-center
                                    sm:justify-between
                                    sm:px-7
                                    dark:border-white/[0.06]
                                    dark:bg-white/[0.015]
                                "
                            >
                                <div>
                                    <div
                                        className="
                                            text-[10px]
                                            font-bold
                                            text-slate-900
                                            dark:text-white
                                        "
                                    >
                                        Technology. Simplified.
                                    </div>

                                    <div
                                        className="
                                            mt-0.5
                                            text-[9px]
                                            text-slate-500
                                            dark:text-slate-600
                                        "
                                    >
                                        One coordinated approach.
                                    </div>
                                </div>

                                <a
                                    href="/support"
                                    className="
                                        inline-flex
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-xl
                                        bg-slate-900
                                        px-4
                                        py-2.5
                                        text-[9px]
                                        font-bold
                                        uppercase
                                        tracking-[0.1em]
                                        text-white
                                        transition-all
                                        duration-300
                                        hover:bg-sky-700
                                        hover:shadow-[0_0_30px_rgba(0,0,0,0.1)]
                                        dark:bg-white
                                        dark:text-slate-950
                                        dark:hover:bg-sky-50
                                        dark:hover:shadow-[0_0_30px_rgba(255,255,255,.1)]
                                    "
                                >
                                    Start a Conversation
                                    <ArrowRight size={12} />
                                </a>
                            </div>
                        </div>

                        {/* =================================================
                            FLOATING BADGE
                        ================================================= */}

                        <div
                            className="
                                absolute
                                -bottom-7
                                -left-5
                                hidden
                                rounded-2xl
                                border
                                border-slate-200
                                bg-white
                                p-4
                                shadow-[0_20px_60px_rgba(0,0,0,0.15)]
                                sm:block
                                lg:-left-7
                                dark:border-slate-800
                                dark:bg-slate-900
                                dark:shadow-[0_20px_60px_rgba(0,0,0,.3)]
                            "
                        >
                            <div
                                className="
                                    flex
                                    items-center
                                    gap-3
                                "
                            >
                                <div
                                    className="
                                        flex
                                        h-10
                                        w-10
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-slate-100
                                        text-sky-400
                                        dark:bg-slate-950
                                    "
                                >
                                    <CheckCircle2 size={18} />
                                </div>

                                <div>
                                    <div
                                        className="
                                            text-[8px]
                                            font-bold
                                            uppercase
                                            tracking-[0.18em]
                                            text-slate-500
                                            dark:text-slate-400
                                        "
                                    >
                                        One Partner
                                    </div>

                                    <div
                                        className="
                                            mt-0.5
                                            text-sm
                                            font-black
                                            text-slate-900
                                            dark:text-white
                                        "
                                    >
                                        Complete IT
                                    </div>

                                    <div
                                        className="
                                            mt-0.5
                                            text-[9px]
                                            text-slate-500
                                        "
                                    >
                                        From scratch to scale.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* =====================================================
                    BOTTOM STATEMENT
                ===================================================== */}

                <div
                    className="
                        mt-20
                        border-t
                        border-slate-200
                        pt-8
                        lg:mt-28
                        dark:border-white/[0.07]
                    "
                >
                    <div
                        className="
                            flex
                            flex-col
                            gap-4
                            sm:flex-row
                            sm:items-center
                            sm:justify-between
                        "
                    >
                        <p
                            className="
                                max-w-2xl
                                text-sm
                                leading-6
                                text-slate-600
                            "
                        >
                            You don't need to become a technology expert to
                            build a technology-enabled organization. You just
                            need the right partner.
                        </p>

                        <a
                            href="#services"
                            className="
                                group
                                inline-flex
                                shrink-0
                                items-center
                                gap-2
                                text-[10px]
                                font-bold
                                uppercase
                                tracking-[0.16em]
                                text-slate-500
                                transition-colors
                                hover:text-slate-900
                                dark:text-slate-400
                                dark:hover:text-white
                            "
                        >
                            Explore our capabilities

                            <ArrowRight
                                size={13}
                                className="
                                    transition-transform
                                    duration-300
                                    group-hover:translate-x-1
                                "
                            />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}