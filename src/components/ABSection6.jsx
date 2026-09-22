
import React from "react";
import {
    ArrowRight,
    Award,
    BrainCircuit,
    BriefcaseBusiness,
    CheckCircle2,
    Code2,
    Database,
    GraduationCap,
    Laptop,
    LockKeyhole,
    Monitor,
    Network,
    Palette,
    Rocket,
    School,
    Settings2,
    ShieldCheck,
    Smartphone,
    Sparkles,
    Users,
    Wrench,
} from "lucide-react";

export default function ABTrainingSection() {
    const trainingCategories = [
        {
            icon: Laptop,
            title: "Computer & Digital Skills",
            description:
                "Learn how to confidently use computers, operating systems, productivity tools, internet services and everyday digital technology.",
            topics: [
                "Computer Fundamentals",
                "Windows & macOS",
                "Microsoft Office",
                "Google Workspace",
                "Internet & Email",
                "Digital Productivity",
            ],
        },
        {
            icon: Code2,
            title: "Web Development",
            description:
                "Learn how to design and build modern websites and web applications from the ground up.",
            topics: [
                "HTML & CSS",
                "JavaScript",
                "React",
                "Tailwind CSS",
                "Python & Django",
                "APIs & Backend Development",
            ],
        },
        {
            icon: Smartphone,
            title: "Mobile App Development",
            description:
                "Learn how to build mobile applications for Android and iOS using modern development technologies.",
            topics: [
                "React Native",
                "Expo",
                "Mobile UI Design",
                "APIs & Authentication",
                "App Deployment",
                "Mobile Development",
            ],
        },
        {
            icon: BrainCircuit,
            title: "AI & Automation",
            description:
                "Understand how artificial intelligence and automation can be used to improve work, business and productivity.",
            topics: [
                "AI Fundamentals",
                "AI Tools",
                "Prompt Engineering",
                "AI Applications",
                "Business Automation",
                "AI Integration",
            ],
        },
        {
            icon: Network,
            title: "Networking & IT",
            description:
                "Build practical knowledge of computer networks, infrastructure, servers and IT environments.",
            topics: [
                "Networking Fundamentals",
                "LAN & WAN",
                "Routers & Switches",
                "Servers",
                "Cloud Infrastructure",
                "IT Administration",
            ],
        },
        {
            icon: ShieldCheck,
            title: "Cybersecurity",
            description:
                "Learn practical cybersecurity principles for protecting devices, accounts, systems and digital information.",
            topics: [
                "Security Fundamentals",
                "Password Security",
                "Phishing Awareness",
                "Device Security",
                "Network Security",
                "Security Best Practices",
            ],
        },
        {
            icon: Database,
            title: "Data & Databases",
            description:
                "Learn how to work with data, databases and the systems businesses use to organize and understand information.",
            topics: [
                "Database Fundamentals",
                "SQL",
                "PostgreSQL",
                "Data Management",
                "Data Analysis",
                "Business Reporting",
            ],
        },
        {
            icon: Palette,
            title: "UI & Digital Design",
            description:
                "Learn how to create modern, usable and professional digital interfaces for websites and applications.",
            topics: [
                "UI Design",
                "UX Fundamentals",
                "Responsive Design",
                "Design Systems",
                "Prototyping",
                "Web Design",
            ],
        },
        {
            icon: BriefcaseBusiness,
            title: "Business Technology",
            description:
                "Help business owners and professionals understand how technology can improve their operations and productivity.",
            topics: [
                "Business Software",
                "Digital Workflows",
                "Cloud Tools",
                "Business Automation",
                "Digital Transformation",
                "Technology Planning",
            ],
        },
        {
            icon: Settings2,
            title: "Software & Systems",
            description:
                "Learn how to use, manage and work effectively with the software and technology systems used by your organization.",
            topics: [
                "Business Applications",
                "ERP Systems",
                "CRM Systems",
                "Dashboards",
                "Collaboration Tools",
                "System Administration",
            ],
        },
        {
            icon: Wrench,
            title: "Technical Support Skills",
            description:
                "Develop practical skills for diagnosing common computer, software, networking and technology problems.",
            topics: [
                "Troubleshooting",
                "Hardware Basics",
                "Software Installation",
                "Network Troubleshooting",
                "System Maintenance",
                "IT Support",
            ],
        },
        {
            icon: Rocket,
            title: "Professional Development",
            description:
                "Build practical technology skills for starting a career, improving your current role or moving into a new field.",
            topics: [
                "Technology Careers",
                "Developer Skills",
                "Portfolio Development",
                "Project-Based Learning",
                "Professional Tools",
                "Career Preparation",
            ],
        },
    ];

    const audiences = [
        {
            icon: Users,
            title: "Individuals",
            text: "Anyone who wants to learn technology, develop a new skill or become more confident using digital tools.",
        },
        {
            icon: BriefcaseBusiness,
            title: "Business Owners",
            text: "Business owners who want to understand technology, improve operations or make better technology decisions.",
        },
        {
            icon: School,
            title: "Students",
            text: "Students looking to develop practical technology skills alongside their academic education.",
        },
        {
            icon: GraduationCap,
            title: "Schools & Institutions",
            text: "Schools and institutions looking for structured technology training for students, teachers or staff.",
        },
        {
            icon: Users,
            title: "Teams & Organizations",
            text: "Organizations that need their people trained on software, systems, cybersecurity and digital workflows.",
        },
        {
            icon: Award,
            title: "Professionals",
            text: "Professionals who want to upgrade their skills, learn new technologies or transition into technology roles.",
        },
    ];

    return (
        <section
            id="training"
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
                ATMOSPHERIC BACKGROUND
            ====================================================== */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -top-56
                    -left-40
                    h-[650px]
                    w-[650px]
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
                    -right-48
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
                    h-[450px]
                    w-[450px]
                    rounded-full
                    bg-cyan-500/5
                    blur-3xl
                "
            />

            {/* Technical grid */}

            <div
                className="
                    pointer-events-none
                    absolute inset-0
                    opacity-40
                    dark:opacity-20
                    [background-image:linear-gradient(to_right,rgba(100,116,139,0.11)_1px,transparent_1px),linear-gradient(to_bottom,rgba(100,116,139,0.11)_1px,transparent_1px)]
                    [background-size:50px_50px]
                    [mask-image:linear-gradient(to_bottom,black,transparent_92%)]
                "
            />

            <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                {/* =================================================
                    HEADER
                ================================================== */}

                <div className="mx-auto max-w-4xl text-center">

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
                        <GraduationCap className="h-4 w-4" />

                        Training & Technology Education
                    </div>

                    <h2
                        className="
                            mt-6
                            text-4xl
                            font-black
                            leading-[1.03]
                            tracking-[-0.05em]
                            sm:text-5xl
                            lg:text-6xl
                        "
                    >
                        Learn technology.
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
                            Build skills that move you forward.
                        </span>
                    </h2>

                    <p
                        className="
                            mx-auto
                            mt-6
                            max-w-3xl
                            text-base
                            leading-8
                            text-slate-600
                            dark:text-slate-400
                            sm:text-lg
                        "
                    >
                        Technology training shouldn't be limited to employees.
                        We train individuals, students, professionals,
                        entrepreneurs, teams, schools, institutions and
                        organizations — from complete beginners to people
                        looking to advance their technical skills.
                    </p>

                </div>

                {/* =================================================
                    WHO WE TRAIN
                ================================================== */}

                <div className="mt-14">

                    <div className="mb-7 text-center">

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
                            Who can learn with us?
                        </p>

                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                        {audiences.map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.title}
                                    className="
                                        group
                                        rounded-3xl
                                        border
                                        border-slate-200/80
                                        bg-white/70
                                        p-6
                                        backdrop-blur-xl
                                        transition-all
                                        duration-300
                                        hover:-translate-y-1
                                        hover:border-blue-300
                                        hover:shadow-xl
                                        dark:border-white/10
                                        dark:bg-white/[0.035]
                                        dark:hover:border-blue-400/30
                                    "
                                >
                                    <div
                                        className="
                                            flex
                                            h-11 w-11
                                            items-center
                                            justify-center
                                            rounded-2xl
                                            bg-blue-500/10
                                            text-blue-600
                                            transition-transform
                                            duration-300
                                            group-hover:scale-110
                                            dark:bg-blue-400/10
                                            dark:text-blue-400
                                        "
                                    >
                                        <Icon className="h-5 w-5" />
                                    </div>

                                    <h3 className="mt-5 font-black">
                                        {item.title}
                                    </h3>

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

                {/* =================================================
                    TRAINING CATALOG
                ================================================== */}

                <div className="mt-20">

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

                        <div>

                            <div
                                className="
                                    text-sm
                                    font-bold
                                    uppercase
                                    tracking-widest
                                    text-blue-600
                                    dark:text-blue-400
                                "
                            >
                                Training areas
                            </div>

                            <h3
                                className="
                                    mt-3
                                    text-3xl
                                    font-black
                                    tracking-tight
                                    sm:text-4xl
                                "
                            >
                                Something for every level.
                            </h3>

                        </div>

                        <p
                            className="
                                max-w-md
                                text-sm
                                leading-6
                                text-slate-500
                                dark:text-slate-500
                            "
                        >
                            Training can be adapted to your goals, experience
                            level, industry and preferred learning format.
                        </p>

                    </div>

                    <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                        {trainingCategories.map((category) => {
                            const Icon = category.icon;

                            return (
                                <div
                                    key={category.title}
                                    className="
                                        group
                                        relative
                                        overflow-hidden
                                        rounded-[2rem]
                                        border
                                        border-slate-200
                                        bg-white/75
                                        p-7
                                        shadow-sm
                                        backdrop-blur-xl
                                        transition-all
                                        duration-500
                                        hover:-translate-y-2
                                        hover:shadow-2xl
                                        dark:border-white/10
                                        dark:bg-slate-900/60
                                    "
                                >

                                    {/* Card glow */}

                                    <div
                                        className="
                                            pointer-events-none
                                            absolute
                                            -right-16
                                            -top-16
                                            h-40
                                            w-40
                                            rounded-full
                                            bg-blue-500/10
                                            blur-3xl
                                            transition-transform
                                            duration-500
                                            group-hover:scale-150
                                        "
                                    />

                                    <div className="relative">

                                        <div className="flex items-center justify-between">

                                            <div
                                                className="
                                                    flex
                                                    h-12 w-12
                                                    items-center
                                                    justify-center
                                                    rounded-2xl
                                                    bg-blue-500/10
                                                    text-blue-600
                                                    dark:bg-blue-400/10
                                                    dark:text-blue-400
                                                "
                                            >
                                                <Icon className="h-6 w-6" />
                                            </div>

                                            <span
                                                className="
                                                    text-xs
                                                    font-bold
                                                    uppercase
                                                    tracking-widest
                                                    text-slate-300
                                                    dark:text-slate-700
                                                "
                                            >
                                                Training
                                            </span>

                                        </div>

                                        <h4
                                            className="
                                                mt-6
                                                text-xl
                                                font-black
                                                tracking-tight
                                            "
                                        >
                                            {category.title}
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
                                            {category.description}
                                        </p>

                                        <div className="mt-6 flex flex-wrap gap-2">

                                            {category.topics.map((topic) => (
                                                <span
                                                    key={topic}
                                                    className="
                                                        rounded-full
                                                        border
                                                        border-slate-200
                                                        bg-slate-50
                                                        px-3
                                                        py-1.5
                                                        text-[11px]
                                                        font-semibold
                                                        text-slate-600
                                                        dark:border-white/10
                                                        dark:bg-white/[0.04]
                                                        dark:text-slate-400
                                                    "
                                                >
                                                    {topic}
                                                </span>
                                            ))}

                                        </div>

                                    </div>
                                </div>
                            );
                        })}

                    </div>
                </div>

                {/* =================================================
                    TRAINING FORMATS
                ================================================== */}

                <div
                    className="
                        mt-20
                        rounded-[2rem]
                        border
                        border-slate-200
                        bg-white/70
                        p-8
                        backdrop-blur-xl
                        dark:border-white/10
                        dark:bg-slate-900/60
                        lg:p-10
                    "
                >

                    <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">

                        <div>

                            <div
                                className="
                                    flex
                                    h-14 w-14
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    bg-purple-500/10
                                    text-purple-600
                                    dark:bg-purple-400/10
                                    dark:text-purple-400
                                "
                            >
                                <Monitor className="h-7 w-7" />
                            </div>

                            <h3
                                className="
                                    mt-6
                                    text-3xl
                                    font-black
                                    tracking-tight
                                "
                            >
                                Learn your way.
                            </h3>

                            <p
                                className="
                                    mt-4
                                    leading-7
                                    text-slate-600
                                    dark:text-slate-400
                                "
                            >
                                We can structure training around the learner,
                                the organization and the subject. Whether you
                                need a quick introduction or a deeper practical
                                program, we can build the learning experience
                                around your objectives.
                            </p>

                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">

                            {[
                                {
                                    title: "One-on-One",
                                    text: "Personalized training for individuals who want focused attention.",
                                },
                                {
                                    title: "Group Training",
                                    text: "Structured sessions for teams, departments and organizations.",
                                },
                                {
                                    title: "Workshops",
                                    text: "Focused practical sessions around a specific technology or skill.",
                                },
                                {
                                    title: "Corporate Training",
                                    text: "Technology training designed around your organization's systems and workflows.",
                                },
                                {
                                    title: "School Programs",
                                    text: "Technology education and practical digital skills for students and institutions.",
                                },
                                {
                                    title: "Practical Projects",
                                    text: "Learn by building real projects instead of relying only on theory.",
                                },
                            ].map((item) => (
                                <div
                                    key={item.title}
                                    className="
                                        rounded-2xl
                                        border
                                        border-slate-200
                                        bg-slate-50/70
                                        p-5
                                        dark:border-white/10
                                        dark:bg-white/[0.035]
                                    "
                                >
                                    <div className="flex items-center gap-2">

                                        <CheckCircle2
                                            className="
                                                h-4 w-4
                                                text-purple-500
                                            "
                                        />

                                        <h4 className="font-bold">
                                            {item.title}
                                        </h4>

                                    </div>

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
                            ))}

                        </div>

                    </div>
                </div>

                {/* =================================================
                    FINAL TRAINING CTA
                ================================================== */}

                <div
                    className="
                        relative
                        mt-10
                        overflow-hidden
                        rounded-[2rem]
                        bg-slate-950
                        p-8
                        text-white
                        sm:p-10
                        lg:p-12
                    "
                >

                    <div
                        className="
                            pointer-events-none
                            absolute
                            -right-32
                            -top-32
                            h-80
                            w-80
                            rounded-full
                            bg-blue-500/20
                            blur-3xl
                        "
                    />

                    <div
                        className="
                            pointer-events-none
                            absolute
                            -bottom-32
                            left-1/3
                            h-80
                            w-80
                            rounded-full
                            bg-purple-500/20
                            blur-3xl
                        "
                    />

                    <div
                        className="
                            relative
                            flex
                            flex-col
                            gap-8
                            lg:flex-row
                            lg:items-center
                            lg:justify-between
                        "
                    >

                        <div className="max-w-3xl">

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    text-sm
                                    font-bold
                                    uppercase
                                    tracking-widest
                                    text-blue-400
                                "
                            >
                                <Sparkles className="h-4 w-4" />

                                Start learning
                            </div>

                            <h3
                                className="
                                    mt-4
                                    text-3xl
                                    font-black
                                    tracking-tight
                                    sm:text-4xl
                                "
                            >
                                Whatever your starting point,
                                <span className="text-blue-400">
                                    {" "}we can help you grow.
                                </span>
                            </h3>

                            <p
                                className="
                                    mt-4
                                    leading-7
                                    text-slate-400
                                "
                            >
                                Whether you're learning your first computer
                                skill, training your employees on new software,
                                developing a technical team or preparing for a
                                career in technology, let's build the right
                                training path for you.
                            </p>

                        </div>

                        <a
                            href="/resources/learning"
                            className="
                                group
                                inline-flex
                                shrink-0
                                items-center
                                justify-center
                                gap-3
                                rounded-2xl
                                bg-white
                                px-6
                                py-4
                                text-sm
                                font-bold
                                text-slate-950
                                transition-all
                                duration-300
                                hover:-translate-y-1
                                hover:bg-blue-500
                                hover:text-white
                            "
                        >
                            Explore Training

                            <ArrowRight
                                className="
                                    h-4 w-4
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

