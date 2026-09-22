
import React from "react";
import {
    ArrowRight,
    CheckCircle2,
    ClipboardList,
    GraduationCap,
    Headphones,
    Lightbulb,
    Settings2,
    ShieldCheck,
    Users,
    Wrench,
} from "lucide-react";

export default function ABProcessSection() {
    const steps = [
        {
            number: "01",
            icon: ClipboardList,
            title: "Tell Us",
            description:
                "Tell us what you're building, what you need, what isn't working or what you want your team to accomplish.",
        },
        {
            number: "02",
            icon: Lightbulb,
            title: "We Plan",
            description:
                "We assess your requirements, understand your environment and recommend practical technology around your goals and budget.",
        },
        {
            number: "03",
            icon: Settings2,
            title: "We Build & Deploy",
            description:
                "We source, develop, configure, install, integrate and deploy the technology your organization needs.",
        },
        {
            number: "04",
            icon: Headphones,
            title: "We Train & Support",
            description:
                "We train your people to confidently use the technology, then remain available for support, maintenance and improvements.",
        },
    ];

    const trainingAreas = [
        {
            icon: GraduationCap,
            title: "Software Training",
            text: "We train employees on the business applications, platforms and custom software your organization uses.",
        },
        {
            icon: Users,
            title: "Employee Training",
            text: "Practical training that helps your team become more confident and productive with workplace technology.",
        },
        {
            icon: ShieldCheck,
            title: "Cybersecurity Awareness",
            text: "Teach employees how to identify phishing, suspicious links, unsafe practices and common security threats.",
        },
        {
            icon: Wrench,
            title: "Systems & Equipment",
            text: "Training on computers, networks, devices, collaboration tools and the technology we deploy for you.",
        },
    ];

    return (
        <section
            id="process"
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
            {/* =====================================================
                UNIQUE BACKGROUND
            ====================================================== */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -top-48
                    left-1/4
                    h-[500px]
                    w-[500px]
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
                    -bottom-48
                    right-0
                    h-[550px]
                    w-[550px]
                    rounded-full
                    bg-purple-500/10
                    blur-3xl
                    dark:bg-purple-600/10
                "
            />

            {/* Technical grid */}

            <div
                className="
                    pointer-events-none
                    absolute inset-0
                    opacity-40
                    dark:opacity-20
                    [background-image:linear-gradient(to_right,rgba(100,116,139,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(100,116,139,0.12)_1px,transparent_1px)]
                    [background-size:52px_52px]
                    [mask-image:linear-gradient(to_bottom,black,transparent_90%)]
                "
            />

            <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                {/* =================================================
                    HEADER
                ================================================== */}

                <div className="mx-auto max-w-3xl text-center">

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
                        <span className="h-2 w-2 rounded-full bg-blue-500" />

                        How We Work
                    </div>

                    <h2
                        className="
                            mt-6
                            text-4xl
                            font-black
                            leading-[1.05]
                            tracking-[-0.04em]
                            sm:text-5xl
                            lg:text-6xl
                        "
                    >
                        Simple for you.
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
                            Thorough behind the scenes.
                        </span>
                    </h2>

                    <p
                        className="
                            mt-6
                            text-base
                            leading-8
                            text-slate-600
                            dark:text-slate-400
                            sm:text-lg
                        "
                    >
                        From understanding your needs to deploying technology,
                        training your people and providing ongoing support,
                        we take care of the complexity so your organization
                        can focus on what it does best.
                    </p>

                </div>

                {/* =================================================
                    PROCESS STEPS
                ================================================== */}

                <div className="relative mt-16">

                    {/* Connecting line */}

                    <div
                        className="
                            pointer-events-none
                            absolute
                            left-[12%]
                            right-[12%]
                            top-12
                            hidden
                            h-px
                            bg-gradient-to-r
                            from-blue-500/10
                            via-blue-500/30
                            to-purple-500/10
                            lg:block
                        "
                    />

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

                        {steps.map((step) => {
                            const Icon = step.icon;

                            return (
                                <div
                                    key={step.number}
                                    className="
                                        group
                                        relative
                                        rounded-[2rem]
                                        border
                                        border-slate-200/80
                                        bg-white/75
                                        p-7
                                        shadow-xl
                                        shadow-slate-950/5
                                        backdrop-blur-xl
                                        transition-all
                                        duration-500
                                        hover:-translate-y-2
                                        hover:border-blue-300
                                        dark:border-white/10
                                        dark:bg-slate-900/60
                                        dark:shadow-black/20
                                        dark:hover:border-blue-400/30
                                    "
                                >

                                    {/* Number */}

                                    <div className="flex items-center justify-between">

                                        <div
                                            className="
                                                flex
                                                h-12 w-12
                                                items-center
                                                justify-center
                                                rounded-2xl
                                                bg-slate-950
                                                text-sm
                                                font-black
                                                text-white
                                                transition-all
                                                duration-300
                                                group-hover:bg-blue-600
                                                group-hover:scale-105
                                                dark:bg-white
                                                dark:text-slate-950
                                                dark:group-hover:bg-blue-500
                                                dark:group-hover:text-white
                                            "
                                        >
                                            {step.number}
                                        </div>

                                        <Icon
                                            className="
                                                h-6 w-6
                                                text-slate-300
                                                transition-all
                                                duration-300
                                                group-hover:text-blue-500
                                                group-hover:scale-110
                                                dark:text-slate-700
                                            "
                                        />

                                    </div>

                                    <h3
                                        className="
                                            mt-7
                                            text-xl
                                            font-black
                                            tracking-tight
                                        "
                                    >
                                        {step.title}
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
                                        {step.description}
                                    </p>

                                </div>
                            );
                        })}

                    </div>
                </div>

                {/* =================================================
                    TRAINING SECTION
                ================================================== */}

                <div
                    className="
                        relative
                        mt-8
                        overflow-hidden
                        rounded-[2.25rem]
                        border
                        border-emerald-200/70
                        bg-gradient-to-br
                        from-emerald-50
                        via-white
                        to-cyan-50
                        p-8
                        dark:border-emerald-400/10
                        dark:from-emerald-950/30
                        dark:via-slate-900
                        dark:to-cyan-950/20
                        lg:p-10
                    "
                >

                    {/* Background glow */}

                    <div
                        className="
                            pointer-events-none
                            absolute
                            -left-24
                            -top-24
                            h-72
                            w-72
                            rounded-full
                            bg-emerald-500/10
                            blur-3xl
                        "
                    />

                    <div
                        className="
                            pointer-events-none
                            absolute
                            -bottom-24
                            -right-24
                            h-72
                            w-72
                            rounded-full
                            bg-cyan-500/10
                            blur-3xl
                        "
                    />

                    <div className="relative">

                        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">

                            {/* Training introduction */}

                            <div>

                                <div
                                    className="
                                        flex
                                        h-14 w-14
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        bg-emerald-500/10
                                        text-emerald-600
                                        dark:bg-emerald-400/10
                                        dark:text-emerald-400
                                    "
                                >
                                    <GraduationCap className="h-7 w-7" />
                                </div>

                                <div
                                    className="
                                        mt-6
                                        text-sm
                                        font-bold
                                        uppercase
                                        tracking-widest
                                        text-emerald-600
                                        dark:text-emerald-400
                                    "
                                >
                                    Training & Enablement
                                </div>

                                <h3
                                    className="
                                        mt-4
                                        text-3xl
                                        font-black
                                        leading-tight
                                        tracking-tight
                                        sm:text-4xl
                                    "
                                >
                                    We don't just give you the technology.
                                    <span
                                        className="
                                            block
                                            text-emerald-600
                                            dark:text-emerald-400
                                        "
                                    >
                                        We teach your people how to use it.
                                    </span>
                                </h3>

                                <p
                                    className="
                                        mt-5
                                        leading-7
                                        text-slate-600
                                        dark:text-slate-400
                                    "
                                >
                                    Every technology environment is only as
                                    effective as the people using it. That's
                                    why we help your team understand the
                                    systems, software and tools we deploy.
                                </p>

                                <p
                                    className="
                                        mt-4
                                        leading-7
                                        text-slate-600
                                        dark:text-slate-400
                                    "
                                >
                                    Training can be delivered to individuals,
                                    departments or entire organizations,
                                    depending on your needs.
                                </p>

                                <a
                                    href="/support"
                                    className="
                                        group
                                        mt-7
                                        inline-flex
                                        items-center
                                        gap-2
                                        text-sm
                                        font-bold
                                        text-emerald-600
                                        transition-colors
                                        hover:text-emerald-700
                                        dark:text-emerald-400
                                        dark:hover:text-emerald-300
                                    "
                                >
                                    Ask about training

                                    <ArrowRight
                                        className="
                                            h-4 w-4
                                            transition-transform
                                            group-hover:translate-x-1
                                        "
                                    />
                                </a>

                            </div>

                            {/* Training areas */}

                            <div className="grid gap-4 sm:grid-cols-2">

                                {trainingAreas.map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <div
                                            key={item.title}
                                            className="
                                                group
                                                rounded-3xl
                                                border
                                                border-slate-200
                                                bg-white/75
                                                p-6
                                                transition-all
                                                duration-300
                                                hover:-translate-y-1
                                                hover:shadow-lg
                                                dark:border-white/10
                                                dark:bg-white/[0.04]
                                            "
                                        >

                                            <div
                                                className="
                                                    flex
                                                    h-11 w-11
                                                    items-center
                                                    justify-center
                                                    rounded-2xl
                                                    bg-emerald-500/10
                                                    text-emerald-600
                                                    transition-transform
                                                    duration-300
                                                    group-hover:scale-110
                                                    dark:bg-emerald-400/10
                                                    dark:text-emerald-400
                                                "
                                            >
                                                <Icon className="h-5 w-5" />
                                            </div>

                                            <h4
                                                className="
                                                    mt-5
                                                    font-black
                                                "
                                            >
                                                {item.title}
                                            </h4>

                                            <p
                                                className="
                                                    mt-2
                                                    text-sm
                                                    leading-6
                                                    text-slate-500
                                                    dark:text-slate-500
                                                "
                                            >
                                                {item.text}
                                            </p>

                                        </div>
                                    );
                                })}

                            </div>

                        </div>
                    </div>
                </div>

                {/* =================================================
                    WHAT WE CAN HELP WITH
                ================================================== */}

                <div className="mt-16">

                    <div className="text-center">

                        <p
                            className="
                                text-xs
                                font-bold
                                uppercase
                                tracking-[0.2em]
                                text-slate-400
                                dark:text-slate-600
                            "
                        >
                            From technology to people
                        </p>

                        <h3
                            className="
                                mt-3
                                text-2xl
                                font-black
                                tracking-tight
                                sm:text-3xl
                            "
                        >
                            We help your organization get more from technology.
                        </h3>

                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">

                        {[
                            "IT Infrastructure",
                            "Software",
                            "Web & Mobile",
                            "AI & Automation",
                            "Cybersecurity",
                            "Training",
                        ].map((item) => (
                            <div
                                key={item}
                                className="
                                    flex
                                    min-h-[90px]
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    bg-white/60
                                    px-4
                                    text-center
                                    text-sm
                                    font-bold
                                    text-slate-600
                                    backdrop-blur
                                    transition-all
                                    hover:-translate-y-1
                                    hover:border-blue-300
                                    hover:text-blue-600
                                    dark:border-white/10
                                    dark:bg-white/[0.03]
                                    dark:text-slate-400
                                    dark:hover:border-blue-400/30
                                    dark:hover:text-blue-400
                                "
                            >
                                {item}
                            </div>
                        ))}

                    </div>

                </div>

            </div>
        </section>
    );
}

