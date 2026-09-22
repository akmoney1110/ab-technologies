import React from "react";
import {
    ArrowRight,
    Building2,
    Rocket,
    TrendingUp,
    RefreshCw,
    CheckCircle2,
    Sparkles,
    Monitor,
    Network,
    ShieldCheck,
    Cloud,
    Server,
    Laptop,
    Database,
    ChevronRight,
} from "lucide-react";

export default function ABSection3() {
    const solutions = [
        {
            number: "01",
            title: "New Business",
            short: "Launch",
            description:
                "Everything you need to establish a reliable technology foundation from day one.",
            icon: Rocket,
            accent: "blue",
        },
        {
            number: "02",
            title: "New Office",
            short: "Deploy",
            description:
                "Equip your office, branch or facility with connected systems built to work together.",
            icon: Building2,
            accent: "purple",
        },
        {
            number: "03",
            title: "Growing Company",
            short: "Scale",
            description:
                "Expand infrastructure, devices and systems without letting technology slow growth.",
            icon: TrendingUp,
            accent: "cyan",
        },
        {
            number: "04",
            title: "Existing Systems",
            short: "Modernize",
            description:
                "Upgrade, integrate, secure and maintain what you already have.",
            icon: RefreshCw,
            accent: "emerald",
        },
    ];

    const accentStyles = {
        blue: {
            icon: "bg-blue-500/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400",
            number: "text-blue-600 dark:text-blue-400",
            glow: "bg-blue-500",
            line: "from-blue-500/0 via-blue-500/60 to-blue-500/0",
        },
        purple: {
            icon: "bg-purple-500/10 text-purple-600 dark:bg-purple-400/10 dark:text-purple-400",
            number: "text-purple-600 dark:text-purple-400",
            glow: "bg-purple-500",
            line: "from-purple-500/0 via-purple-500/60 to-purple-500/0",
        },
        cyan: {
            icon: "bg-cyan-500/10 text-cyan-600 dark:bg-cyan-400/10 dark:text-cyan-400",
            number: "text-cyan-600 dark:text-cyan-400",
            glow: "bg-cyan-500",
            line: "from-cyan-500/0 via-cyan-500/60 to-cyan-500/0",
        },
        emerald: {
            icon: "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400",
            number: "text-emerald-600 dark:text-emerald-400",
            glow: "bg-emerald-500",
            line: "from-emerald-500/0 via-emerald-500/60 to-emerald-500/0",
        },
    };

    return (
        <section
            id="solutions"
            className="
                relative isolate overflow-hidden
                bg-slate-50
                py-20
                [content-visibility:auto]
                [contain-intrinsic-size:1px_2200px]
                text-slate-950
                transition-colors
                duration-500
                dark:bg-[#050912]
                dark:text-white
                sm:py-32
            "
        >
            {/* =========================================================
                BACKGROUND ATMOSPHERE
            ========================================================= */}

            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {/* Main blue glow */}
                <div
                    className="
                        absolute
                        hidden
                        md:block
                        -right-[18%]
                        top-[5%]
                        h-[600px]
                        w-[600px]
                        rounded-full
                        bg-blue-500/[0.07]
                        blur-[120px]
                        dark:bg-blue-500/[0.12]
                    "
                />

                {/* Purple glow */}
                <div
                    className="
                        absolute
                        hidden
                        md:block
                        -bottom-[20%]
                        -left-[15%]
                        h-[600px]
                        w-[600px]
                        rounded-full
                        bg-purple-500/[0.06]
                        blur-[120px]
                        dark:bg-purple-500/[0.10]
                    "
                />

                {/* Center glow */}
                <div
                    className="
                        absolute
                        hidden
                        lg:block
                        left-1/2
                        top-1/2
                        h-[500px]
                        w-[500px]
                        -translate-x-1/2
                        -translate-y-1/2
                        rounded-full
                        bg-cyan-500/[0.025]
                        blur-[120px]
                    "
                />

                {/* Technical grid */}
                <div
                    className="
                        absolute
                        inset-0
                        opacity-[0.35]
                        dark:opacity-[0.18]
                        [background-image:linear-gradient(to_right,rgba(100,116,139,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(100,116,139,0.10)_1px,transparent_1px)]
                        [background-size:52px_52px]
                        [mask-image:linear-gradient(to_bottom,black,transparent_92%)]
                    "
                />

                {/* Top fade */}
                <div
                    className="
                        absolute
                        inset-x-0
                        top-0
                        h-40
                        bg-gradient-to-b
                        from-white
                        to-transparent
                        dark:from-[#050912]
                    "
                />
            </div>

            <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                {/* =========================================================
                    TOP LABEL
                ========================================================= */}

                <div className="mb-14 flex items-center justify-between gap-6 lg:mb-20">
                    <div className="flex items-center gap-3">
                        <div className="h-px w-10 bg-blue-500" />

                        <span
                            className="
                                text-[11px]
                                font-black
                                uppercase
                                tracking-[0.25em]
                                text-blue-600
                                dark:text-blue-400
                            "
                        >
                            Technology from the ground up
                        </span>
                    </div>

                    <div
                        className="
                            hidden
                            items-center
                            gap-2
                            text-xs
                            font-medium
                            text-slate-400
                            sm:flex
                        "
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-500/50 motion-reduce:animate-none" />
                            <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
                        </span>

                        Built for real businesses
                    </div>
                </div>

                {/* =========================================================
                    MAIN GRID
                ========================================================= */}

                <div className="grid items-center gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">

                    {/* =====================================================
                        LEFT CONTENT
                    ===================================================== */}

                    <div className="relative z-10 max-w-2xl">

                        {/* Badge */}

                        <div
                            className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-full
                                border
                                border-blue-500/20
                                bg-blue-500/[0.06]
                                px-4
                                py-2
                                text-[11px]
                                font-black
                                uppercase
                                tracking-[0.18em]
                                text-blue-600
                                dark:border-blue-400/20
                                dark:bg-blue-400/[0.06]
                                dark:text-blue-400
                            "
                        >
                            <Sparkles className="h-3.5 w-3.5" />

                            Start anywhere
                        </div>

                        {/* Heading */}

                        <h2
                            className="
                                mt-7
                                max-w-[700px]
                                text-[2.8rem]
                                font-black
                                leading-[0.98]
                                tracking-[-0.055em]
                                sm:text-5xl
                                lg:text-[4.5rem]
                            "
                        >
                            Starting from
                            <span className="block">scratch?</span>

                            <span
                                className="
                                    mt-3
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
                                We'll build it with you.
                            </span>
                        </h2>

                        {/* Description */}

                        <p
                            className="
                                mt-8
                                max-w-xl
                                text-base
                                leading-8
                                text-slate-600
                                dark:text-slate-400
                                sm:text-lg
                            "
                        >
                            You don't need an IT department or a technical
                            shopping list. Tell us what you're building,
                            how many people you're supporting and where
                            you're going.
                        </p>

                        <p
                            className="
                                mt-4
                                max-w-xl
                                text-base
                                leading-8
                                text-slate-600
                                dark:text-slate-400
                                sm:text-lg
                            "
                        >
                            We turn those requirements into a practical
                            technology environment — from devices and
                            connectivity to software, security, cloud and
                            ongoing support.
                        </p>

                        {/* =================================================
                            MINI FEATURE ROW
                        ================================================= */}

                        <div
                            className="
                                mt-9
                                grid
                                grid-cols-1
                                gap-3
                                sm:grid-cols-3
                            "
                        >
                            {[
                                ["01", "Plan"],
                                ["02", "Build"],
                                ["03", "Support"],
                            ].map(([number, label]) => (
                                <div
                                    key={number}
                                    className="
                                        group
                                        flex
                                        items-center
                                        gap-3
                                        rounded-2xl
                                        border
                                        border-slate-200/80
                                        bg-white
                                        px-4
                                        py-3
                                        md:bg-white/70
                                        lg:backdrop-blur-sm
                                        dark:border-white/[0.08]
                                        dark:bg-white/[0.025]
                                    "
                                >
                                    <span
                                        className="
                                            text-[10px]
                                            font-black
                                            tracking-widest
                                            text-blue-500
                                        "
                                    >
                                        {number}
                                    </span>

                                    <span
                                        className="
                                            text-xs
                                            font-bold
                                            text-slate-700
                                            dark:text-slate-300
                                        "
                                    >
                                        {label}
                                    </span>

                                    <ChevronRight
                                        className="
                                            ml-auto
                                            h-3.5
                                            w-3.5
                                            text-slate-300
                                            transition-transform
                                            group-hover:translate-x-1
                                        "
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Trust points */}

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
                                "Practical solutions",
                                "Built to scale",
                                "End-to-end support",
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="
                                        flex
                                        items-center
                                        gap-2
                                        text-xs
                                        font-medium
                                        text-slate-500
                                        dark:text-slate-400
                                    "
                                >
                                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />

                                    {item}
                                </div>
                            ))}
                        </div>

                        {/* CTA */}

                        <a
                            href="/support"
                            className="
                                group
                                mt-9
                                inline-flex
                                items-center
                                gap-3
                                rounded-2xl
                                bg-slate-950
                                px-6
                                py-4
                                text-sm
                                font-black
                                text-white
                                shadow-[0_15px_40px_rgba(15,23,42,0.18)]
                                transition-all
                                duration-300
                                lg:hover:-translate-y-1
                                motion-reduce:transform-none
                                motion-reduce:transition-none
                                hover:bg-blue-600
                                hover:shadow-[0_20px_50px_rgba(37,99,235,0.25)]
                                dark:bg-white
                                dark:text-slate-950
                                dark:hover:bg-blue-500
                                dark:hover:text-white
                            "
                        >
                            Start Your Project

                            <ArrowRight
                                className="
                                    h-4
                                    w-4
                                    transition-transform
                                    duration-300
                                    group-hover:translate-x-1.5
                                "
                            />
                        </a>
                    </div>

                    {/* =====================================================
                        RIGHT VISUAL
                    ===================================================== */}

                    <div className="relative min-h-[430px] sm:min-h-[520px] lg:min-h-[570px]">

                        {/* Ambient glow */}

                        <div
                            className="
                                absolute
                                hidden
                                md:block
                                left-1/2
                                top-1/2
                                h-[360px]
                                w-[360px]
                                -translate-x-1/2
                                -translate-y-1/2
                                rounded-full
                                bg-blue-500/[0.10]
                                blur-[100px]
                            "
                        />

                        {/* =================================================
                            CENTRAL TECHNOLOGY HUB
                        ================================================= */}

                        <div
                            className="
                                absolute
                                left-1/2
                                top-1/2
                                z-20
                                flex
                                h-40
                                w-40
                                -translate-x-1/2
                                -translate-y-1/2
                                items-center
                                justify-center
                                rounded-[2.5rem]
                                border
                                border-blue-500/20
                                bg-white
                                shadow-[0_16px_45px_rgba(37,99,235,0.10)]
                                md:bg-white/85
                                lg:backdrop-blur-xl
                                lg:shadow-[0_30px_100px_rgba(37,99,235,0.16)]
                                dark:border-white/10
                                dark:bg-slate-900
                                lg:dark:bg-slate-900/80
                                lg:dark:shadow-[0_30px_100px_rgba(37,99,235,0.15)]
                            "
                        >
                            {/* rotating ring */}

                            <div
                                className="
                                    absolute
                                    inset-[-15px]
                                    rounded-[3rem]
                                    md:animate-[spin_18s_linear_infinite]
                                    motion-reduce:animate-none
                                    border
                                    border-dashed
                                    border-blue-500/20
                                "
                            />

                            <div
                                className="
                                    absolute
                                    inset-[-30px]
                                    rounded-[3.5rem]
                                    border
                                    border-blue-500/[0.06]
                                "
                            />

                            <div className="text-center">
                                <div
                                    className="
                                        mx-auto
                                        flex
                                        h-12
                                        w-12
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        bg-gradient-to-br
                                        from-blue-600
                                        to-indigo-600
                                        text-white
                                        shadow-lg
                                        shadow-blue-500/30
                                    "
                                >
                                    <Sparkles className="h-6 w-6" />
                                </div>

                                <div className="mt-3 text-sm font-black">
                                    AB Technologies
                                </div>

                                <div
                                    className="
                                        mt-1
                                        text-[9px]
                                        font-bold
                                        uppercase
                                        tracking-[0.2em]
                                        text-slate-400
                                    "
                                >
                                    Technology Hub
                                </div>
                            </div>
                        </div>

                        {/* =================================================
                            CONNECTION LINES
                        ================================================= */}

                        <div
                            className="
                                pointer-events-none
                                absolute
                                hidden
                                sm:block
                                left-1/2
                                top-1/2
                                h-[420px]
                                w-[420px]
                                -translate-x-1/2
                                -translate-y-1/2
                            "
                        >
                            <div
                                className="
                                    absolute
                                    left-1/2
                                    top-0
                                    h-full
                                    w-px
                                    -translate-x-1/2
                                    bg-gradient-to-b
                                    from-transparent
                                    via-blue-500/20
                                    to-transparent
                                "
                            />

                            <div
                                className="
                                    absolute
                                    left-0
                                    top-1/2
                                    h-px
                                    w-full
                                    -translate-y-1/2
                                    bg-gradient-to-r
                                    from-transparent
                                    via-blue-500/20
                                    to-transparent
                                "
                            />

                            <div
                                className="
                                    absolute
                                    left-1/2
                                    top-1/2
                                    h-[300px]
                                    w-[300px]
                                    -translate-x-1/2
                                    -translate-y-1/2
                                    rotate-45
                                    border
                                    border-blue-500/[0.07]
                                "
                            />
                        </div>

                        {/* =================================================
                            FLOATING TECHNOLOGY ICONS
                        ================================================= */}

                        <FloatingIcon
                            icon={Laptop}
                            label="Devices"
                            position="left-[2%] top-[5%]"
                        />

                        <FloatingIcon
                            icon={Network}
                            label="Network"
                            position="right-[1%] top-[15%]"
                        />

                        <FloatingIcon
                            icon={Cloud}
                            label="Cloud"
                            position="left-[0%] bottom-[17%]"
                        />

                        <FloatingIcon
                            icon={ShieldCheck}
                            label="Security"
                            position="right-[0%] bottom-[7%]"
                        />

                        {/* =================================================
                            TOP MINI CARD
                        ================================================= */}

                        <div
                            className="
                                absolute
                                right-[12%]
                                top-[-1%]
                                hidden
                                rounded-2xl
                                border
                                border-slate-200/80
                                bg-white/75
                                px-4
                                py-3
                                shadow-lg
                                dark:border-white/[0.08]
                                dark:bg-slate-900/70
                                md:block
                                lg:backdrop-blur-md
                            "
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className="
                                        flex
                                        h-8
                                        w-8
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-emerald-500/10
                                        text-emerald-500
                                    "
                                >
                                    <CheckCircle2 className="h-4 w-4" />
                                </div>

                                <div>
                                    <div className="text-[10px] font-black">
                                        READY TO SCALE
                                    </div>

                                    <div className="mt-0.5 text-[9px] text-slate-400">
                                        Infrastructure aligned
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* =================================================
                            TECHNOLOGY STACK CARDS
                        ================================================= */}

                        <div
                            className="
                                absolute
                                bottom-[-3%]
                                left-1/2
                                z-30
                                w-[92%]
                                -translate-x-1/2
                                rounded-[2rem]
                                border
                                border-slate-200/80
                                bg-white
                                p-4
                                shadow-[0_14px_40px_rgba(15,23,42,0.10)]
                                md:bg-white/90
                                lg:backdrop-blur-xl
                                lg:shadow-[0_25px_80px_rgba(15,23,42,0.12)]
                                dark:border-white/[0.08]
                                dark:bg-slate-900
                                lg:dark:bg-slate-900/80
                                lg:dark:shadow-[0_25px_80px_rgba(0,0,0,0.35)]
                                sm:w-[80%]
                            "
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <div
                                        className="
                                            text-[9px]
                                            font-black
                                            uppercase
                                            tracking-[0.2em]
                                            text-blue-500
                                        "
                                    >
                                        Your technology stack
                                    </div>

                                    <div className="mt-1 text-sm font-black">
                                        Connected. Secure. Ready.
                                    </div>
                                </div>

                                <div
                                    className="
                                        flex
                                        h-9
                                        w-9
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-slate-100
                                        dark:bg-white/5
                                    "
                                >
                                    <Server className="h-4 w-4 text-blue-500" />
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-4 gap-2">
                                {[
                                    [Monitor, "Software"],
                                    [Network, "Network"],
                                    [Database, "Data"],
                                    [ShieldCheck, "Security"],
                                ].map(([Icon, label]) => (
                                    <div
                                        key={label}
                                        className="
                                            rounded-xl
                                            border
                                            border-slate-100
                                            bg-slate-50
                                            p-2.5
                                            dark:border-white/[0.05]
                                            dark:bg-white/[0.025]
                                        "
                                    >
                                        <Icon className="h-4 w-4 text-blue-500" />

                                        <div
                                            className="
                                                mt-2
                                                text-[9px]
                                                font-bold
                                                text-slate-500
                                                dark:text-slate-400
                                            "
                                        >
                                            {label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* =========================================================
                    SOLUTIONS SECTION
                ========================================================= */}

                <div className="mt-32 lg:mt-40">

                    {/* Section heading */}

                    <div
                        className="
                            flex
                            flex-col
                            gap-5
                            lg:flex-row
                            lg:items-end
                            lg:justify-between
                        "
                    >
                        <div>
                            <div
                                className="
                                    text-[10px]
                                    font-black
                                    uppercase
                                    tracking-[0.25em]
                                    text-blue-500
                                "
                            >
                                Whatever stage you're in
                            </div>

                            <h3
                                className="
                                    mt-3
                                    text-3xl
                                    font-black
                                    tracking-[-0.04em]
                                    sm:text-4xl
                                "
                            >
                                Technology that fits your stage.
                            </h3>
                        </div>

                        <p
                            className="
                                max-w-md
                                text-sm
                                leading-7
                                text-slate-500
                                dark:text-slate-400
                            "
                        >
                            Whether you're opening your first office,
                            expanding a team or modernizing an existing
                            environment, we can start where you are.
                        </p>
                    </div>

                    {/* =====================================================
                        SOLUTION CARDS
                    ===================================================== */}

                    <div
                        className="
                            mt-10
                            grid
                            gap-4
                            md:grid-cols-2
                            xl:grid-cols-4
                        "
                    >
                        {solutions.map((item) => {
                            const Icon = item.icon;
                            const styles = accentStyles[item.accent];

                            return (
                                <div
                                    key={item.number}
                                    className="
                                        group
                                        relative
                                        overflow-hidden
                                        rounded-[2rem]
                                        border
                                        border-slate-200/80
                                        bg-white
                                        p-6
                                        shadow-sm
                                        transition-shadow
                                        duration-300
                                        md:bg-white/80
                                        lg:backdrop-blur-md
                                        lg:hover:-translate-y-1
                                        lg:hover:shadow-[0_20px_55px_rgba(15,23,42,0.08)]
                                        motion-reduce:transform-none
                                        motion-reduce:transition-none
                                        dark:border-white/[0.08]
                                        dark:bg-white/[0.025]
                                        dark:shadow-[0_20px_60px_rgba(0,0,0,0.18)]
                                        sm:p-7
                                    "
                                >
                                    {/* Hover glow */}

                                    <div
                                        className={`
                                            pointer-events-none
                                            absolute
                                            hidden
                                            lg:block
                                            -right-16
                                            -top-16
                                            h-40
                                            w-40
                                            rounded-full
                                            ${styles.glow}
                                            opacity-[0.045]
                                            blur-3xl
                                            transition-transform
                                            duration-700
                                            group-hover:scale-150
                                        `}
                                    />

                                    {/* Number */}

                                    <div className="relative flex items-center justify-between">
                                        <span
                                            className={`
                                                text-[11px]
                                                font-black
                                                tracking-[0.2em]
                                                ${styles.number}
                                            `}
                                        >
                                            {item.number}
                                        </span>

                                        <span
                                            className="
                                                rounded-full
                                                border
                                                border-slate-200
                                                px-2.5
                                                py-1
                                                text-[9px]
                                                font-black
                                                uppercase
                                                tracking-wider
                                                text-slate-400
                                                dark:border-white/10
                                            "
                                        >
                                            {item.short}
                                        </span>
                                    </div>

                                    {/* Icon */}

                                    <div
                                        className={`
                                            relative
                                            mt-8
                                            flex
                                            h-12
                                            w-12
                                            items-center
                                            justify-center
                                            rounded-2xl
                                            ${styles.icon}
                                            transition-all
                                            duration-500
                                            lg:group-hover:scale-110
                                            lg:group-hover:rotate-3
                                            motion-reduce:transform-none
                                        `}
                                    >
                                        <Icon className="h-5 w-5" />
                                    </div>

                                    {/* Content */}

                                    <div className="relative mt-6">
                                        <h4
                                            className="
                                                text-xl
                                                font-black
                                                tracking-tight
                                            "
                                        >
                                            {item.title}
                                        </h4>

                                        <p
                                            className="
                                                mt-3
                                                text-sm
                                                leading-7
                                                text-slate-500
                                                dark:text-slate-400
                                            "
                                        >
                                            {item.description}
                                        </p>
                                    </div>

                                    {/* Bottom */}

                                    <div
                                        className="
                                            relative
                                            mt-7
                                            flex
                                            items-center
                                            justify-between
                                        "
                                    >
                                        <div
                                            className={`
                                                h-px
                                                flex-1
                                                bg-gradient-to-r
                                                ${styles.line}
                                            `}
                                        />

                                        <div
                                            className="
                                                ml-4
                                                flex
                                                h-8
                                                w-8
                                                items-center
                                                justify-center
                                                rounded-full
                                                border
                                                border-slate-200
                                                text-slate-400
                                                transition-all
                                                duration-300
                                                group-hover:border-blue-500/30
                                                group-hover:bg-blue-500
                                                group-hover:text-white
                                                dark:border-white/10
                                            "
                                        >
                                            <ArrowRight className="h-3.5 w-3.5" />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* =========================================================
                    BOTTOM STATEMENT
                ========================================================= */}

                <div
                    className="
                        mt-16
                        overflow-hidden
                        rounded-[2rem]
                        border
                        border-slate-200/80
                        bg-white
                        px-6
                        py-6
                        md:bg-white/70
                        lg:backdrop-blur-md
                        dark:border-white/[0.08]
                        dark:bg-white/[0.025]
                        sm:px-8
                    "
                >
                    <div
                        className="
                            flex
                            flex-col
                            gap-5
                            lg:flex-row
                            lg:items-center
                            lg:justify-between
                        "
                    >
                        <div className="flex items-center gap-4">
                            <div
                                className="
                                    flex
                                    h-11
                                    w-11
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    bg-blue-500/10
                                    text-blue-500
                                "
                            >
                                <Sparkles className="h-5 w-5" />
                            </div>

                            <div>
                                <div className="text-sm font-black">
                                    From your first computer...
                                </div>

                                <div
                                    className="
                                        mt-1
                                        text-xs
                                        text-slate-500
                                        dark:text-slate-400
                                    "
                                >
                                    To your complete technology infrastructure.
                                </div>
                            </div>
                        </div>

                        <div
                            className="
                                flex
                                items-center
                                gap-3
                                text-xs
                                font-bold
                                text-slate-600
                                dark:text-slate-300
                            "
                        >
                            <span className="relative flex h-2.5 w-2.5">
                                <span
                                    className="
                                        absolute
                                        h-full
                                        w-full
                                        animate-ping
                                        motion-reduce:animate-none
                                        rounded-full
                                        bg-emerald-500/40
                                    "
                                />

                                <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-500" />
                            </span>

                            Technology that grows with you
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* =============================================================
   FLOATING TECHNOLOGY ICON
============================================================= */

function FloatingIcon({ icon: Icon, label, position }) {
    return (
        <div
            className={`
                absolute
                ${position}
                z-10
                hidden
                md:block
            `}
        >
            <div
                className="
                    group
                    flex
                    items-center
                    gap-3
                    rounded-2xl
                    border
                    border-slate-200/80
                    bg-white/75
                    px-3
                    py-2.5
                    shadow-lg
                    lg:backdrop-blur-md
                    transition-all
                    duration-300
                    lg:hover:-translate-y-1
                    motion-reduce:transform-none
                    motion-reduce:transition-none
                    hover:border-blue-500/20
                    dark:border-white/[0.08]
                    dark:bg-slate-900/70
                "
            >
                <div
                    className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-xl
                        bg-blue-500/10
                        text-blue-500
                        transition-transform
                        duration-500
                        lg:group-hover:scale-110
                        motion-reduce:transform-none
                    "
                >
                    <Icon className="h-4 w-4" />
                </div>

                <span
                    className="
                        text-[10px]
                        font-black
                        uppercase
                        tracking-wider
                        text-slate-600
                        dark:text-slate-300
                    "
                >
                    {label}
                </span>
            </div>
        </div>
    );
}