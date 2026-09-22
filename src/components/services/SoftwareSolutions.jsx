import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    ArrowDown,
    ArrowRight,
    ArrowUpRight,
    Bot,
    BriefcaseBusiness,
    Check,
    ChevronDown,
    ChevronRight,
    Cloud,
    Code2,
    Cpu,
    Database,
    Download,
    ExternalLink,
    FileCode2,
    Globe2,
    Headphones,
    Layers3,
    Lock,
    Menu,
    MessageSquare,
    Monitor,
    Network,
    Package,
    Play,
    Rocket,
    Search,
    Server,
    Settings2,
    ShieldCheck,
    Smartphone,
    Sparkles,
    Terminal,
    Users,
    Workflow,
    X,
    Zap,
} from "lucide-react";

import { queueSupportRequest } from "../AI";


/* =========================================================
   SOFTWARE & DIGITAL SOLUTIONS
   Complete React + Tailwind Page
   Light + Dark Mode
   ========================================================= */


/* =========================================================
   DATA
   ========================================================= */

const solutionCategories = [
    {
        id: "custom-software",
        icon: Code2,
        number: "01",
        title: "Custom Software Development",
        short:
            "Purpose-built software designed around the way your organization actually works.",
        description:
            "We design and develop custom software for businesses, organizations, institutions and teams that need more than an off-the-shelf application can provide.",
        features: [
            "Business management systems",
            "Internal enterprise applications",
            "Workflow management platforms",
            "Operations dashboards",
            "Customer portals",
            "Employee portals",
            "Administrative systems",
            "Document management platforms",
        ],
        prompt:
            "I'd like to discuss custom software development for my organization.",
    },
    {
        id: "web-applications",
        icon: Globe2,
        number: "02",
        title: "Web Applications",
        short:
            "Modern, secure and scalable web applications accessible from anywhere.",
        description:
            "From customer-facing platforms to complex internal applications, we build responsive web solutions that work across desktops, tablets and mobile devices.",
        features: [
            "Business web applications",
            "Customer portals",
            "Admin dashboards",
            "SaaS platforms",
            "Booking systems",
            "Membership platforms",
            "Marketplaces",
            "Enterprise portals",
        ],
        prompt:
            "I'd like to discuss building a web application.",
    },
    {
        id: "mobile-apps",
        icon: Smartphone,
        number: "03",
        title: "Mobile Applications",
        short:
            "Mobile experiences that bring your services and operations directly to users.",
        description:
            "We build mobile applications for businesses and products that need a reliable mobile presence without compromising usability or scalability.",
        features: [
            "iOS applications",
            "Android applications",
            "Cross-platform applications",
            "Customer apps",
            "Employee apps",
            "Business operations apps",
            "Booking and service apps",
            "Mobile dashboards",
        ],
        prompt:
            "I'd like to discuss building a mobile application.",
    },
    {
        id: "automation",
        icon: Workflow,
        number: "04",
        title: "Business Automation",
        short:
            "Reduce repetitive work by connecting processes, people and systems.",
        description:
            "We identify repetitive processes and replace unnecessary manual work with automated workflows, integrations, notifications and intelligent systems.",
        features: [
            "Workflow automation",
            "Email automation",
            "Document automation",
            "Report generation",
            "Data synchronization",
            "Scheduled processes",
            "Notifications",
            "Approval workflows",
        ],
        prompt:
            "I'd like to discuss automating some of my business processes.",
    },
    {
        id: "ai-solutions",
        icon: Bot,
        number: "05",
        title: "AI & Intelligent Solutions",
        short:
            "Practical AI systems designed to solve real business problems.",
        description:
            "We integrate artificial intelligence into useful business workflows rather than adding AI simply for appearance.",
        features: [
            "AI assistants",
            "AI-powered search",
            "Document analysis",
            "Intelligent support",
            "AI content workflows",
            "Recommendation systems",
            "AI-powered forms",
            "Business intelligence",
        ],
        prompt:
            "I'd like to discuss integrating AI into my business systems.",
    },
    {
        id: "integrations",
        icon: Layers3,
        number: "06",
        title: "Systems & API Integration",
        short:
            "Connect the software you already use so information can move efficiently.",
        description:
            "We connect applications, databases, APIs and third-party services to create a more unified digital environment.",
        features: [
            "REST API integration",
            "Third-party APIs",
            "Payment integrations",
            "Email integrations",
            "CRM integrations",
            "Cloud integrations",
            "Database synchronization",
            "Internal system integration",
        ],
        prompt:
            "I'd like to connect or integrate the software systems we already use.",
    },
    {
        id: "cloud",
        icon: Cloud,
        number: "07",
        title: "Cloud & Deployment",
        short:
            "Reliable environments for deploying, hosting and maintaining applications.",
        description:
            "We help move applications from development into dependable production environments with deployment, monitoring, security and maintenance.",
        features: [
            "Application deployment",
            "Cloud configuration",
            "Server setup",
            "SSL configuration",
            "Domain configuration",
            "Performance optimization",
            "Backup strategies",
            "Production monitoring",
        ],
        prompt:
            "I'd like to discuss cloud deployment and hosting for an application.",
    },
    {
        id: "security",
        icon: ShieldCheck,
        number: "08",
        title: "Security & Access Control",
        short:
            "Protect applications, users, data and business operations.",
        description:
            "Security is incorporated into the architecture and workflow of the systems we build rather than being treated as an afterthought.",
        features: [
            "Authentication systems",
            "Role-based permissions",
            "Access control",
            "Secure APIs",
            "Data protection",
            "Session management",
            "Audit trails",
            "Security reviews",
        ],
        prompt:
            "I'd like to discuss application security and access control.",
    },
];


const productTypes = [
    {
        icon: BriefcaseBusiness,
        title: "Business Management",
        description:
            "Systems for managing customers, employees, inventory, operations, documents and business activities.",
    },
    {
        icon: Database,
        title: "Data & Records",
        description:
            "Centralized systems for storing, searching, organizing and reporting business information.",
    },
    {
        icon: Users,
        title: "Customer Platforms",
        description:
            "Portals and applications that allow customers to access services, records, requests and information.",
    },
    {
        icon: Workflow,
        title: "Workflow Systems",
        description:
            "Digital workflows that move tasks between teams, departments and approval stages.",
    },
    {
        icon: Monitor,
        title: "Dashboards",
        description:
            "Clear operational dashboards for monitoring activity, performance, financial information and KPIs.",
    },
    {
        icon: Smartphone,
        title: "Mobile Solutions",
        description:
            "Mobile applications that extend your business operations beyond the office.",
    },
];


const developmentStages = [
    {
        number: "01",
        title: "Understand",
        icon: Search,
        description:
            "We begin by understanding your organization, problem, users, existing processes and desired outcome.",
        details: [
            "Business discovery",
            "Requirements gathering",
            "Process review",
            "User identification",
            "Problem definition",
        ],
    },
    {
        number: "02",
        title: "Plan",
        icon: Layers3,
        description:
            "We turn the requirements into a practical technical and product plan before development begins.",
        details: [
            "System architecture",
            "Feature planning",
            "Technology selection",
            "Database planning",
            "Delivery roadmap",
        ],
    },
    {
        number: "03",
        title: "Design",
        icon: Sparkles,
        description:
            "We create a clear and intuitive experience so the system is easy to understand and use.",
        details: [
            "Interface design",
            "User experience",
            "Responsive layouts",
            "Navigation",
            "Interaction patterns",
        ],
    },
    {
        number: "04",
        title: "Build",
        icon: Code2,
        description:
            "The product is developed in structured stages with testing and review throughout the process.",
        details: [
            "Frontend development",
            "Backend development",
            "Database implementation",
            "API development",
            "Integrations",
        ],
    },
    {
        number: "05",
        title: "Test",
        icon: ShieldCheck,
        description:
            "We test the system across functionality, usability, responsiveness, security and real-world workflows.",
        details: [
            "Functional testing",
            "Responsive testing",
            "Security checks",
            "Performance checks",
            "User acceptance",
        ],
    },
    {
        number: "06",
        title: "Deploy",
        icon: Rocket,
        description:
            "Once approved, we prepare the system for production and help move it into its live environment.",
        details: [
            "Production setup",
            "Domain configuration",
            "SSL",
            "Deployment",
            "Launch support",
        ],
    },
    {
        number: "07",
        title: "Improve",
        icon: Zap,
        description:
            "After launch, we can continue improving the product as your organization grows.",
        details: [
            "Maintenance",
            "Updates",
            "New features",
            "Optimization",
            "Technical support",
        ],
    },
];


const engagementModels = [
    {
        title: "Build From Scratch",
        label: "For new ideas",
        description:
            "Have an idea but nothing built yet? We can help take it from concept and requirements through design, development and launch.",
        icon: Rocket,
        points: [
            "Idea discovery",
            "Requirements",
            "UX/UI",
            "Development",
            "Deployment",
            "Post-launch support",
        ],
        prompt:
            "I have an idea for software and would like help taking it from concept to launch.",
    },
    {
        title: "Improve Existing Software",
        label: "For existing systems",
        description:
            "Already have an application? We can improve the design, fix problems, add functionality, modernize the architecture or continue development.",
        icon: Settings2,
        points: [
            "Existing-system review",
            "Bug fixing",
            "Feature development",
            "Performance improvements",
            "Security improvements",
            "UI modernization",
        ],
        prompt:
            "I have existing software I'd like to improve, fix or extend.",
    },
    {
        title: "Connect Your Systems",
        label: "For growing organizations",
        description:
            "If your business uses multiple systems, we can help connect them so your teams spend less time moving information manually.",
        icon: Network,
        points: [
            "API integration",
            "Data synchronization",
            "Automated workflows",
            "Third-party services",
            "Notifications",
            "Reporting",
        ],
        prompt:
            "I'd like to connect multiple systems we use so data flows between them automatically.",
    },
];


const freeTools = [
    {
        icon: Package,
        title: "File Utilities",
        description:
            "Simple tools for everyday file-related tasks.",
        examples: [
            "ZIP tools",
            "File conversion",
            "File compression",
            "File extraction",
        ],
    },
    {
        icon: FileCode2,
        title: "Document Tools",
        description:
            "Useful utilities for common document workflows.",
        examples: [
            "PDF utilities",
            "Document conversion",
            "PDF merging",
            "PDF splitting",
        ],
    },
    {
        icon: Monitor,
        title: "Image Tools",
        description:
            "Quick browser-based tools for everyday image tasks.",
        examples: [
            "Image conversion",
            "Image compression",
            "Resize images",
            "Format conversion",
        ],
    },
    {
        icon: Terminal,
        title: "Developer Utilities",
        description:
            "Small utilities designed to make common technical tasks easier.",
        examples: [
            "JSON tools",
            "Text utilities",
            "Encoding tools",
            "Formatting tools",
        ],
    },
];


const faqs = [
    {
        question: "Can you build software completely from scratch?",
        answer:
            "Yes. We can work from an initial idea, business problem or rough requirements and help turn it into a structured product. The process can include discovery, requirements, design, development, testing, deployment and ongoing support.",
    },
    {
        question: "Can you work on software that another developer built?",
        answer:
            "Yes. Where the existing system is accessible and technically supportable, we can review the application, understand its architecture, identify issues and continue development or modernization.",
    },
    {
        question: "Do you only build websites?",
        answer:
            "No. Websites are only one part of the service. We work across web applications, mobile applications, internal business systems, automation, integrations, AI solutions, dashboards, APIs, cloud deployment and ongoing technical support.",
    },
    {
        question: "Can you build internal software for employees?",
        answer:
            "Yes. Internal systems can be designed around your organization's workflows, including employee accounts, permissions, dashboards, approvals, records, reporting and administrative functions.",
    },
    {
        question: "Can you connect different software systems?",
        answer:
            "Yes. We can integrate systems through APIs and other supported integration methods so information can move between applications and repetitive manual processes can be reduced.",
    },
    {
        question: "Can you add AI to an existing application?",
        answer:
            "Yes. AI can be integrated into suitable existing systems for tasks such as intelligent search, document analysis, support assistants, content workflows and other practical use cases.",
    },
    {
        question: "Do you provide hosting and deployment?",
        answer:
            "Yes. Depending on the project, we can assist with servers, domains, SSL, deployment, production configuration, backups, monitoring and ongoing technical maintenance.",
    },
    {
        question: "Can I start with a small project?",
        answer:
            "Yes. Not every project needs to start as a large enterprise system. We can begin with a focused version, validate the idea and expand it as requirements and usage grow.",
    },
];


/* =========================================================
   SMALL REUSABLE COMPONENTS
   ========================================================= */

function SectionBadge({ children }) {
    return (
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-300/80 bg-white/70 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-slate-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-300">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            {children}
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
            className={`${align === "center"
                ? "mx-auto text-center"
                : "text-left"
                } max-w-3xl`}
        >
            {eyebrow && (
                <div className="mb-5">
                    <SectionBadge>{eyebrow}</SectionBadge>
                </div>
            )}

            <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
                {title}
            </h2>

            {description && (
                <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-400">
                    {description}
                </p>
            )}
        </div>
    );
}


function GlowOrb({ className = "" }) {
    return (
        <div
            className={`pointer-events-none absolute rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-500/10 ${className}`}
        />
    );
}


function FeatureCheck({ children }) {
    return (
        <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                <Check size={12} strokeWidth={3} />
            </div>

            <span className="text-sm leading-6 text-slate-600 dark:text-slate-400">
                {children}
            </span>
        </div>
    );
}


function IconBox({ icon: Icon, size = "md" }) {
    const sizes = {
        sm: "h-10 w-10 rounded-xl",
        md: "h-12 w-12 rounded-2xl",
        lg: "h-14 w-14 rounded-2xl",
    };

    return (
        <div
            className={`${sizes[size]} flex items-center justify-center border border-blue-200 bg-blue-50 text-blue-600 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400`}
        >
            <Icon size={size === "lg" ? 25 : 21} />
        </div>
    );
}


/* =========================================================
   HERO
   ========================================================= */

function Hero({ onStartChat }) {
    return (
        <section className="relative isolate overflow-hidden border-b border-slate-200/70 bg-slate-50 dark:border-white/5 dark:bg-slate-950">

            <GlowOrb className="-left-40 top-20 h-96 w-96" />
            <GlowOrb className="right-[-120px] top-40 h-[500px] w-[500px]" />

            <div className="absolute inset-0 -z-10 opacity-[0.35] dark:opacity-[0.15]">
                <div
                    className="h-full w-full"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(15,23,42,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,.08) 1px, transparent 1px)",
                        backgroundSize: "56px 56px",
                    }}
                />
            </div>


            <div className="mx-auto grid max-w-7xl gap-16 px-5 py-20 sm:px-6 sm:py-24 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:px-8 lg:py-32">

                <div>

                    <SectionBadge>
                        Software & Digital Solutions
                    </SectionBadge>

                    <h1 className="mt-7 max-w-4xl text-5xl font-black tracking-[-0.04em] text-slate-950 sm:text-6xl lg:text-7xl dark:text-white">
                        Turn ideas, problems and processes into{" "}
                        <span className="text-blue-600 dark:text-blue-400">
                            useful digital systems.
                        </span>
                    </h1>

                    <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl dark:text-slate-400">
                        From a simple idea to a complete business platform,
                        we help you plan, design, build, deploy and improve
                        software that makes your organization easier to run.
                    </p>


                    <div className="mt-9 flex flex-col gap-3 sm:flex-row">

                        <button
                            type="button"
                            onClick={() =>
                                onStartChat(
                                    "I'd like to discuss a software or digital solution for my organization.",
                                    {
                                        Source:
                                            "Software & Digital Solutions",
                                        Stage:
                                            "Initial conversation",
                                    }
                                )
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-black text-white shadow-xl shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
                        >
                            Tell Us What You Need
                            <ArrowRight size={17} />
                        </button>

                        <a
                            href="#solutions"
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/80 px-6 py-3.5 text-sm font-black text-slate-800 transition hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08]"
                        >
                            Explore Solutions
                            <ArrowDown size={17} />
                        </a>

                    </div>


                    <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-500">
                        <span className="flex items-center gap-2">
                            <Check size={14} className="text-blue-500" />
                            From scratch
                        </span>

                        <span className="flex items-center gap-2">
                            <Check size={14} className="text-blue-500" />
                            Existing systems
                        </span>

                        <span className="flex items-center gap-2">
                            <Check size={14} className="text-blue-500" />
                            Business focused
                        </span>
                    </div>
                </div>


                <div className="relative">

                    <div className="rounded-[2rem] border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-950/10 dark:border-white/10 dark:bg-slate-900">

                        <div className="rounded-[1.5rem] bg-slate-950 p-6 text-white dark:bg-slate-800">

                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                                        Digital Operations
                                    </div>

                                    <div className="mt-2 text-xl font-black">
                                        Business Control Center
                                    </div>
                                </div>

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
                                    <ActivityIcon />
                                </div>
                            </div>


                            <div className="mt-8 grid grid-cols-2 gap-3">

                                {[
                                    ["Operations", "98.4%"],
                                    ["Automation", "74%"],
                                    ["Tasks", "1,284"],
                                    ["Response", "1.8s"],
                                ].map(([label, value]) => (
                                    <div
                                        key={label}
                                        className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                                    >
                                        <div className="text-xs text-slate-400">
                                            {label}
                                        </div>

                                        <div className="mt-2 text-xl font-black">
                                            {value}
                                        </div>
                                    </div>
                                ))}

                            </div>


                            <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">

                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-bold">
                                        Workflow progress
                                    </span>

                                    <span className="text-xs font-bold text-blue-400">
                                        Active
                                    </span>
                                </div>

                                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                                    <div className="h-full w-[78%] rounded-full bg-blue-500" />
                                </div>

                                <div className="mt-3 flex justify-between text-xs text-slate-500">
                                    <span>Requests</span>
                                    <span>Approval</span>
                                    <span>Completed</span>
                                </div>

                            </div>


                            <div className="mt-4 flex items-center gap-3 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4">

                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500 text-white">
                                    <Bot size={17} />
                                </div>

                                <div className="flex-1">
                                    <div className="text-xs font-bold text-blue-300">
                                        Intelligent assistant
                                    </div>

                                    <div className="mt-1 text-xs text-slate-400">
                                        Helping teams process routine work.
                                    </div>
                                </div>

                                <ArrowUpRight
                                    size={16}
                                    className="text-blue-400"
                                />

                            </div>

                        </div>
                    </div>


                    <div className="absolute -bottom-7 -left-7 hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:block dark:border-white/10 dark:bg-slate-900">

                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                <ShieldCheck size={19} />
                            </div>

                            <div>
                                <div className="text-xs font-bold text-slate-500">
                                    Built with
                                </div>

                                <div className="text-sm font-black text-slate-900 dark:text-white">
                                    Security in mind
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}


function ActivityIcon() {
    return (
        <div className="flex items-end gap-1">
            <span className="h-3 w-1 rounded-full bg-current" />
            <span className="h-5 w-1 rounded-full bg-current" />
            <span className="h-7 w-1 rounded-full bg-current" />
            <span className="h-4 w-1 rounded-full bg-current" />
        </div>
    );
}


/* =========================================================
   POSITIONING
   ========================================================= */

function Positioning() {
    return (
        <section className="relative overflow-hidden bg-white py-20 lg:py-28 dark:bg-slate-950">

            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-start">

                    <SectionHeading
                        eyebrow="Not just development"
                        title="We start with the problem, not the technology."
                        description="The right software is not necessarily the software with the most features. It is the system that solves the right problem and fits the way your organization works."
                    />


                    <div className="grid gap-4 sm:grid-cols-2">

                        {[
                            {
                                icon: Search,
                                title: "Understand first",
                                text: "We look at what you are trying to accomplish before recommending what should be built.",
                            },
                            {
                                icon: Settings2,
                                title: "Fit your workflow",
                                text: "The system should support your people and processes instead of forcing your organization into unnecessary complexity.",
                            },
                            {
                                icon: ShieldCheck,
                                title: "Build responsibly",
                                text: "We consider permissions, data, security, reliability and maintainability throughout the project.",
                            },
                            {
                                icon: Rocket,
                                title: "Plan for growth",
                                text: "Good software should leave room for your organization, users and requirements to grow.",
                            },
                        ].map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.title}
                                    className="rounded-3xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-950/5 dark:border-white/10 dark:bg-white/[0.035] dark:hover:bg-white/[0.05]"
                                >
                                    <IconBox icon={Icon} />

                                    <h3 className="mt-5 text-lg font-black text-slate-950 dark:text-white">
                                        {item.title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                        {item.text}
                                    </p>
                                </div>
                            );
                        })}

                    </div>

                </div>

            </div>
        </section>
    );
}


/* =========================================================
   CORE SOLUTIONS
   ========================================================= */

function CoreSolutions({ onStartChat }) {
    const [active, setActive] = useState("custom-software");

    const selected =
        solutionCategories.find(
            (item) => item.id === active
        ) || solutionCategories[0];

    const SelectedIcon = selected.icon;

    return (
        <section
            id="solutions"
            className="relative scroll-mt-24 overflow-hidden border-y border-slate-200/70 bg-slate-50 py-20 lg:py-28 dark:border-white/5 dark:bg-slate-900/40"
        >

            <GlowOrb className="right-[-180px] top-1/3 h-[500px] w-[500px]" />

            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                <SectionHeading
                    eyebrow="What we build"
                    title="A complete digital solutions capability."
                    description="Whether you need one application or a connected digital environment, our services cover the major building blocks required to design, develop and operate modern software."
                />


                <div className="mt-14 grid gap-8 lg:grid-cols-[.75fr_1.25fr]">

                    <div className="space-y-2">

                        {solutionCategories.map((item) => {
                            const Icon = item.icon;
                            const isActive = active === item.id;

                            return (
                                <button
                                    type="button"
                                    key={item.id}
                                    onClick={() => setActive(item.id)}
                                    className={`group flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${isActive
                                        ? "border-blue-500/30 bg-white shadow-xl shadow-slate-950/5 dark:bg-white/[0.06]"
                                        : "border-transparent hover:border-slate-200 hover:bg-white/70 dark:hover:border-white/10 dark:hover:bg-white/[0.03]"
                                        }`}
                                >

                                    <div
                                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${isActive
                                            ? "bg-blue-600 text-white"
                                            : "bg-slate-200 text-slate-600 dark:bg-white/10 dark:text-slate-400"
                                            }`}
                                    >
                                        <Icon size={19} />
                                    </div>


                                    <div className="min-w-0 flex-1">

                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-black tracking-[0.15em] text-slate-400">
                                                {item.number}
                                            </span>

                                            <span
                                                className={`text-sm font-black ${isActive
                                                    ? "text-slate-950 dark:text-white"
                                                    : "text-slate-700 dark:text-slate-300"
                                                    }`}
                                            >
                                                {item.title}
                                            </span>
                                        </div>

                                        <p className="mt-1 line-clamp-1 text-xs text-slate-500">
                                            {item.short}
                                        </p>

                                    </div>


                                    <ChevronRight
                                        size={17}
                                        className={`shrink-0 ${isActive
                                            ? "text-blue-500"
                                            : "text-slate-400"
                                            }`}
                                    />

                                </button>
                            );
                        })}

                    </div>


                    <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-7 shadow-xl shadow-slate-950/5 lg:p-9 dark:border-white/10 dark:bg-slate-950">

                        <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />

                        <div className="relative">

                            <div className="flex flex-col justify-between gap-5 sm:flex-row">

                                <IconBox
                                    icon={SelectedIcon}
                                    size="lg"
                                />

                                <div className="sm:text-right">
                                    <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                                        {selected.number}
                                    </div>

                                    <div className="mt-1 text-xs font-semibold text-slate-500">
                                        Digital capability
                                    </div>
                                </div>

                            </div>


                            <h3 className="mt-8 text-3xl font-black tracking-tight text-slate-950 dark:text-white">
                                {selected.title}
                            </h3>

                            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-400">
                                {selected.description}
                            </p>


                            <div className="mt-8 grid gap-3 sm:grid-cols-2">

                                {selected.features.map((feature) => (
                                    <FeatureCheck key={feature}>
                                        {feature}
                                    </FeatureCheck>
                                ))}

                            </div>


                            <div className="mt-9 flex flex-wrap items-center gap-3">

                                <button
                                    type="button"
                                    onClick={() =>
                                        onStartChat(
                                            selected.prompt,
                                            {
                                                Source:
                                                    "Software & Digital Solutions",
                                                Capability:
                                                    selected.title,
                                            }
                                        )
                                    }
                                    className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-700 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                                >
                                    Discuss this with AB AI
                                    <Sparkles size={16} />
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        onStartChat(
                                            `I'd like to explore ${selected.title.toLowerCase()} in more detail.`,
                                            {
                                                Source:
                                                    "Software & Digital Solutions",
                                                Capability:
                                                    selected.title,
                                                "Interest level":
                                                    "Detailed review",
                                            }
                                        )
                                    }
                                    className="inline-flex items-center gap-2 text-sm font-black text-blue-600 hover:gap-3 dark:text-blue-400"
                                >
                                    Explore this solution
                                    <ArrowRight size={17} />
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}


/* =========================================================
   SOFTWARE TYPES
   ========================================================= */

function SoftwareTypes({ onStartChat }) {
    return (
        <section className="bg-white py-20 lg:py-28 dark:bg-slate-950">

            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                <SectionHeading
                    eyebrow="What the software can become"
                    title="Built around your people, processes and customers."
                    description="There is no single type of business software. The right solution depends on what you need to manage, automate, connect or deliver."
                />


                <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                    {productTypes.map((item) => {
                        const Icon = item.icon;

                        return (
                            <button
                                type="button"
                                key={item.title}
                                onClick={() =>
                                    onStartChat(
                                        `I'm interested in ${item.title.toLowerCase()} software: ${item.description}`,
                                        {
                                            Source:
                                                "Software & Digital Solutions",
                                            "Software type":
                                                item.title,
                                        }
                                    )
                                }
                                className="group rounded-3xl border border-slate-200 bg-white p-7 text-left transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.025] dark:hover:border-blue-500/20"
                            >

                                <IconBox icon={Icon} />

                                <h3 className="mt-6 text-xl font-black text-slate-950 dark:text-white">
                                    {item.title}
                                </h3>

                                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                    {item.description}
                                </p>

                                <div className="mt-6 flex items-center gap-2 text-xs font-black uppercase tracking-[0.12em] text-blue-600 dark:text-blue-400">
                                    Discuss this with AB AI
                                    <ArrowRight
                                        size={14}
                                        className="transition group-hover:translate-x-1"
                                    />
                                </div>

                            </button>
                        );
                    })}

                </div>

            </div>
        </section>
    );
}


/* =========================================================
   FROM SCRATCH
   ========================================================= */

function FromScratch({ onStartChat }) {
    return (
        <section className="relative overflow-hidden bg-slate-950 py-20 text-white lg:py-28">

            <div className="absolute inset-0 opacity-30">
                <div
                    className="h-full w-full"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 20% 30%, rgba(59,130,246,.25), transparent 30%), radial-gradient(circle at 80% 70%, rgba(37,99,235,.2), transparent 30%)",
                    }}
                />
            </div>

            <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                <div className="grid gap-14 lg:grid-cols-[1fr_.9fr] lg:items-center">

                    <div>

                        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-slate-300">
                            <Sparkles size={13} className="text-blue-400" />
                            Starting from an idea?
                        </div>


                        <h2 className="mt-6 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                            You do not need to know exactly what to build.
                        </h2>


                        <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
                            You can come to us with an idea, a business problem,
                            a manual process, a spreadsheet, an outdated system
                            or simply a goal. We can help turn that starting
                            point into a practical digital solution.
                        </p>


                        <div className="mt-9 grid gap-4 sm:grid-cols-2">

                            {[
                                "I have an idea",
                                "I have a business problem",
                                "I use spreadsheets",
                                "My existing software is outdated",
                                "My team does things manually",
                                "I need a system but don't know where to start",
                            ].map((item) => (
                                <button
                                    type="button"
                                    key={item}
                                    onClick={() =>
                                        onStartChat(
                                            `My starting point is: "${item}". I'd like help exploring what could be built.`,
                                            {
                                                Source:
                                                    "Software & Digital Solutions",
                                                "Starting point":
                                                    item,
                                            }
                                        )
                                    }
                                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-left transition hover:border-blue-500/30 hover:bg-white/[0.06]"
                                >
                                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-blue-400">
                                        <Check size={14} />
                                    </div>

                                    <span className="text-sm font-semibold text-slate-300">
                                        {item}
                                    </span>
                                </button>
                            ))}

                        </div>


                        <button
                            type="button"
                            onClick={() =>
                                onStartChat(
                                    "I have an idea for a software product and would like help turning it into a real system.",
                                    {
                                        Source:
                                            "Software & Digital Solutions",
                                        "Starting point":
                                            "Idea stage",
                                    }
                                )
                            }
                            className="mt-9 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-black text-slate-950 transition hover:-translate-y-0.5"
                        >
                            Start With Your Idea
                            <ArrowRight size={17} />
                        </button>

                    </div>


                    <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 backdrop-blur">

                        <div className="rounded-[1.5rem] border border-white/10 bg-slate-900 p-6">

                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                                    <MessageSquare size={19} />
                                </div>

                                <div>
                                    <div className="text-xs font-bold text-slate-500">
                                        Your starting point
                                    </div>

                                    <div className="text-sm font-black">
                                        "We need a better way..."
                                    </div>
                                </div>
                            </div>


                            <div className="my-7 h-px bg-white/10" />


                            <div className="space-y-5">

                                {[
                                    [
                                        Search,
                                        "Understand",
                                        "What are you trying to improve?",
                                    ],
                                    [
                                        Layers3,
                                        "Structure",
                                        "What should the system handle?",
                                    ],
                                    [
                                        Code2,
                                        "Build",
                                        "What should be developed first?",
                                    ],
                                    [
                                        Rocket,
                                        "Launch",
                                        "How will people use it?",
                                    ],
                                ].map(([Icon, title, text], index) => (
                                    <div
                                        key={title}
                                        className="flex gap-4"
                                    >

                                        <div className="relative">

                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-blue-400">
                                                <Icon size={17} />
                                            </div>

                                            {index < 3 && (
                                                <div className="absolute left-1/2 top-10 h-6 w-px -translate-x-1/2 bg-white/10" />
                                            )}

                                        </div>


                                        <div>
                                            <div className="text-sm font-black">
                                                {title}
                                            </div>

                                            <div className="mt-1 text-xs leading-5 text-slate-500">
                                                {text}
                                            </div>
                                        </div>

                                    </div>
                                ))}

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}


/* =========================================================
   ENGAGEMENT MODELS
   ========================================================= */

function EngagementModels({ onStartChat }) {
    return (
        <section className="bg-slate-50 py-20 lg:py-28 dark:bg-slate-900/40">

            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                <SectionHeading
                    eyebrow="Flexible engagement"
                    title="Meet your project where it is."
                    description="Whether you are starting from zero, inheriting an existing application or trying to connect multiple systems, we can work from your current position."
                />


                <div className="mt-14 grid gap-5 lg:grid-cols-3">

                    {engagementModels.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.title}
                                className={`relative flex flex-col overflow-hidden rounded-3xl border p-7 ${index === 0
                                    ? "border-blue-500/20 bg-white shadow-xl shadow-blue-950/5 dark:bg-white/[0.04]"
                                    : "border-slate-200 bg-white/70 dark:border-white/10 dark:bg-white/[0.02]"
                                    }`}
                            >

                                <div className="flex items-start justify-between">

                                    <IconBox icon={Icon} />

                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-slate-500 dark:bg-white/5">
                                        {item.label}
                                    </span>

                                </div>


                                <h3 className="mt-7 text-2xl font-black text-slate-950 dark:text-white">
                                    {item.title}
                                </h3>


                                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                    {item.description}
                                </p>


                                <div className="mt-7 space-y-3">

                                    {item.points.map((point) => (
                                        <FeatureCheck key={point}>
                                            {point}
                                        </FeatureCheck>
                                    ))}

                                </div>


                                <button
                                    type="button"
                                    onClick={() =>
                                        onStartChat(item.prompt, {
                                            Source:
                                                "Software & Digital Solutions",
                                            Engagement:
                                                item.title,
                                        })
                                    }
                                    className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-xs font-black text-white transition hover:bg-blue-700 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                                >
                                    Discuss this route
                                    <Sparkles size={14} />
                                </button>

                            </div>
                        );
                    })}

                </div>

            </div>
        </section>
    );
}


/* =========================================================
   PROCESS
   ========================================================= */

function Process() {
    return (
        <section className="bg-white py-20 lg:py-28 dark:bg-slate-950">

            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                <SectionHeading
                    eyebrow="How we work"
                    title="A structured path from problem to production."
                    description="We keep the process clear so you know what is happening, what comes next and why decisions are being made."
                />


                <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">

                    {developmentStages.map((stage) => {
                        const Icon = stage.icon;

                        return (
                            <div
                                key={stage.number}
                                className="group rounded-3xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-xl dark:border-white/10 dark:bg-white/[0.025] dark:hover:bg-white/[0.05]"
                            >

                                <div className="flex items-center justify-between">

                                    <span className="text-xs font-black tracking-[0.2em] text-slate-400">
                                        {stage.number}
                                    </span>

                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm dark:bg-white/5 dark:text-blue-400">
                                        <Icon size={17} />
                                    </div>

                                </div>


                                <h3 className="mt-6 text-lg font-black text-slate-950 dark:text-white">
                                    {stage.title}
                                </h3>


                                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                    {stage.description}
                                </p>


                                <div className="mt-5 space-y-2">

                                    {stage.details.map((detail) => (
                                        <div
                                            key={detail}
                                            className="flex items-center gap-2 text-xs font-semibold text-slate-500"
                                        >
                                            <span className="h-1 w-1 rounded-full bg-blue-500" />
                                            {detail}
                                        </div>
                                    ))}

                                </div>

                            </div>
                        );
                    })}

                </div>

            </div>
        </section>
    );
}


/* =========================================================
   TECHNOLOGY STACK
   ========================================================= */

function TechnologySection({ onStartChat }) {
    const technologies = [
        ["Frontend", "React • TypeScript • Tailwind CSS"],
        ["Backend", "Python • Django • REST APIs"],
        ["Mobile", "React Native • Expo"],
        ["Data", "PostgreSQL • SQLite • Structured data"],
        ["Automation", "Celery • Redis • Background workflows"],
        ["Infrastructure", "Docker • Nginx • Linux • Cloud"],
        ["AI", "AI APIs • Intelligent workflows • Assistants"],
        ["Security", "Authentication • Permissions • Secure APIs"],
    ];

    return (
        <section className="border-y border-slate-200/70 bg-slate-50 py-20 lg:py-28 dark:border-white/5 dark:bg-slate-900/40">

            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">

                    <SectionHeading
                        eyebrow="Technology"
                        title="Modern tools. Practical architecture."
                        description="We use proven technologies where they make sense for the project, with an emphasis on maintainability, performance and the actual requirements of your organization."
                    />


                    <div className="grid gap-3 sm:grid-cols-2">

                        {technologies.map(([title, text]) => (
                            <button
                                type="button"
                                key={title}
                                onClick={() =>
                                    onStartChat(
                                        `I'd like to discuss ${title.toLowerCase()} for a software project: ${text}.`,
                                        {
                                            Source:
                                                "Software & Digital Solutions",
                                            "Technology area":
                                                title,
                                        }
                                    )
                                }
                                className="rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:border-blue-200 hover:shadow-md dark:border-white/10 dark:bg-white/[0.025] dark:hover:border-blue-500/20"
                            >

                                <div className="flex items-center gap-3">

                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-slate-400">
                                        <Code2 size={16} />
                                    </div>

                                    <div className="text-sm font-black text-slate-950 dark:text-white">
                                        {title}
                                    </div>

                                </div>

                                <p className="mt-3 text-xs leading-6 text-slate-500">
                                    {text}
                                </p>

                            </button>
                        ))}

                    </div>

                </div>

            </div>
        </section>
    );
}


/* =========================================================
   AI SECTION
   ========================================================= */

function AISection({ onStartChat }) {
    return (
        <section className="relative overflow-hidden bg-white py-20 lg:py-28 dark:bg-slate-950">

            <GlowOrb className="left-[-150px] top-1/3 h-[450px] w-[450px]" />

            <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-slate-900">

                    <div className="grid lg:grid-cols-[1fr_.9fr]">

                        <div className="p-8 sm:p-10 lg:p-14">

                            <SectionBadge>
                                Artificial Intelligence
                            </SectionBadge>


                            <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                                Use AI where it creates real value.
                            </h2>


                            <p className="mt-5 max-w-xl text-base leading-8 text-slate-600 dark:text-slate-400">
                                AI can be incorporated into applications and
                                workflows to help people search, understand,
                                process, classify, generate and act on
                                information more efficiently.
                            </p>


                            <div className="mt-8 grid gap-3 sm:grid-cols-2">

                                {[
                                    "AI-powered customer support",
                                    "Intelligent document processing",
                                    "Natural-language search",
                                    "Business assistants",
                                    "Automated content workflows",
                                    "Recommendations",
                                    "Classification",
                                    "Data analysis",
                                ].map((item) => (
                                    <FeatureCheck key={item}>
                                        {item}
                                    </FeatureCheck>
                                ))}

                            </div>


                            <button
                                type="button"
                                onClick={() =>
                                    onStartChat(
                                        "I'd like to discuss integrating AI into my business systems, workflows or applications.",
                                        {
                                            Source:
                                                "Software & Digital Solutions",
                                            Topic:
                                                "AI integration",
                                        }
                                    )
                                }
                                className="mt-9 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-700 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                            >
                                Explore AI solutions with AB AI
                                <Sparkles size={16} />
                            </button>

                        </div>


                        <div className="relative min-h-[400px] overflow-hidden bg-slate-950 p-6 text-white">

                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(59,130,246,.25),transparent_45%)]" />

                            <div className="relative flex h-full items-center justify-center">

                                <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur">

                                    <div className="flex items-center gap-3 border-b border-white/10 pb-4">

                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
                                            <Bot size={19} />
                                        </div>

                                        <div>
                                            <div className="text-sm font-black">
                                                Digital Assistant
                                            </div>

                                            <div className="text-xs text-slate-500">
                                                Connected to your workflow
                                            </div>
                                        </div>

                                        <span className="ml-auto h-2 w-2 rounded-full bg-emerald-400" />

                                    </div>


                                    <div className="space-y-4 py-5">

                                        <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white/5 p-4 text-xs leading-6 text-slate-400">
                                            Summarize today's outstanding
                                            customer requests and identify
                                            those requiring immediate action.
                                        </div>

                                        <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-blue-600 p-4 text-xs leading-6 text-white">
                                            18 requests remain open. 4 require
                                            immediate attention based on
                                            priority and response time.
                                        </div>

                                    </div>


                                    <button
                                        type="button"
                                        onClick={() =>
                                            onStartChat(
                                                "I want to see how an AI assistant could be integrated into our business workflow.",
                                                {
                                                    Source:
                                                        "Software & Digital Solutions",
                                                    Topic:
                                                        "AI assistant demo",
                                                }
                                            )
                                        }
                                        className="flex w-full items-center gap-2 rounded-xl border border-white/10 bg-black/10 px-3 py-3 text-left text-xs text-slate-500 transition hover:bg-black/20 hover:text-slate-300"
                                    >
                                        Ask your system anything...
                                        <ArrowRight
                                            size={14}
                                            className="ml-auto text-blue-400"
                                        />
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}


/* =========================================================
   FREE TOOLS
   ========================================================= */

function FreeTools() {
    return (
        <section className="bg-slate-50 py-20 lg:py-28 dark:bg-slate-900/40">

            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

                    <SectionHeading
                        eyebrow="Free digital tools"
                        title="Useful software should not always require a subscription."
                        description="We are building a collection of practical free utilities for everyday digital tasks, alongside our commercial software products."
                    />

                    <a
                        href="/free-tools"
                        className="inline-flex shrink-0 items-center gap-2 text-sm font-black text-blue-600 dark:text-blue-400"
                    >
                        View free tools
                        <ArrowRight size={17} />
                    </a>

                </div>


                <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">

                    {freeTools.map((tool) => {
                        const Icon = tool.icon;

                        return (
                            <div
                                key={tool.title}
                                className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.025]"
                            >

                                <IconBox icon={Icon} />

                                <h3 className="mt-5 text-lg font-black text-slate-950 dark:text-white">
                                    {tool.title}
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                    {tool.description}
                                </p>

                                <div className="mt-5 space-y-2">

                                    {tool.examples.map((example) => (
                                        <div
                                            key={example}
                                            className="flex items-center gap-2 text-xs font-semibold text-slate-500"
                                        >
                                            <Download size={13} className="text-blue-500" />
                                            {example}
                                        </div>
                                    ))}

                                </div>

                            </div>
                        );
                    })}

                </div>

            </div>
        </section>
    );
}


/* =========================================================
   SOFTWARE MARKETPLACE
   ========================================================= */

function SoftwareMarketplace() {
    const products = [
        {
            category: "Business",
            title: "Business Operations Suite",
            description:
                "A centralized environment for managing everyday business activities.",
            status: "Available / Customizable",
        },
        {
            category: "Productivity",
            title: "Document Utility Suite",
            description:
                "Practical tools for handling common document and file workflows.",
            status: "Growing",
        },
        {
            category: "Automation",
            title: "Workflow Automation",
            description:
                "Automate repetitive tasks, notifications and internal processes.",
            status: "Available",
        },
    ];

    return (
        <section className="bg-white py-20 lg:py-28 dark:bg-slate-950">

            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-xl shadow-slate-950/5 sm:p-10 dark:border-white/10 dark:bg-slate-900">

                    <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">

                        <SectionHeading
                            eyebrow="Software marketplace"
                            title="Products, subscriptions and solutions."
                            description="Alongside custom development, we are building software products that organizations can use directly, subscribe to or customize around their needs."
                        />

                        <a
                            href="/software"
                            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white dark:bg-white dark:text-slate-950"
                        >
                            Explore software
                            <ArrowUpRight size={16} />
                        </a>

                    </div>


                    <div className="mt-12 grid gap-4 lg:grid-cols-3">

                        {products.map((product) => (
                            <div
                                key={product.title}
                                className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-white/[0.025]"
                            >

                                <div className="flex items-center justify-between">

                                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                                        {product.category}
                                    </span>

                                    <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                                        {product.status}
                                    </span>

                                </div>


                                <h3 className="mt-5 text-lg font-black text-slate-950 dark:text-white">
                                    {product.title}
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                    {product.description}
                                </p>


                                <a
                                    href="/software"
                                    className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.12em] text-slate-600 dark:text-slate-400"
                                >
                                    View product
                                    <ArrowRight size={14} />
                                </a>

                            </div>
                        ))}

                    </div>

                </div>

            </div>
        </section>
    );
}


/* =========================================================
   SUPPORT
   ========================================================= */

function SupportSection() {
    return (
        <section className="border-y border-slate-200/70 bg-slate-50 py-20 lg:py-28 dark:border-white/5 dark:bg-slate-900/40">

            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                <div className="grid gap-5 md:grid-cols-3">

                    {[
                        {
                            icon: Headphones,
                            title: "Technical Support",
                            text: "Help with application issues, updates, troubleshooting and ongoing technical needs.",
                        },
                        {
                            icon: Settings2,
                            title: "Maintenance",
                            text: "Keep your application updated, monitored and aligned with changing requirements.",
                        },
                        {
                            icon: Rocket,
                            title: "Continuous Development",
                            text: "Add new capabilities as your users, organization and business requirements grow.",
                        },
                    ].map((item) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.title}
                                className="rounded-3xl border border-slate-200 bg-white p-7 dark:border-white/10 dark:bg-white/[0.025]"
                            >

                                <IconBox icon={Icon} />

                                <h3 className="mt-6 text-xl font-black text-slate-950 dark:text-white">
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
    );
}


/* =========================================================
   FAQ
   ========================================================= */

function FAQ({ onStartChat }) {
    const [open, setOpen] = useState(0);

    return (
        <section className="bg-white py-20 lg:py-28 dark:bg-slate-950">

            <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">

                <SectionHeading
                    eyebrow="Frequently asked"
                    title="Questions about software projects."
                    description="A few answers to common questions before you get started."
                    align="center"
                />


                <div className="mt-12 space-y-3">

                    {faqs.map((faq, index) => {
                        const isOpen = open === index;

                        return (
                            <div
                                key={faq.question}
                                className={`overflow-hidden rounded-2xl border transition ${isOpen
                                    ? "border-blue-500/30 bg-slate-50 dark:bg-white/[0.035]"
                                    : "border-slate-200 dark:border-white/10"
                                    }`}
                            >

                                <button
                                    type="button"
                                    onClick={() =>
                                        setOpen(
                                            isOpen ? -1 : index
                                        )
                                    }
                                    className="flex w-full items-center justify-between gap-5 p-5 text-left"
                                >

                                    <span className="text-sm font-black text-slate-900 sm:text-base dark:text-white">
                                        {faq.question}
                                    </span>

                                    <ChevronDown
                                        size={18}
                                        className={`shrink-0 text-slate-400 transition ${isOpen
                                            ? "rotate-180 text-blue-500"
                                            : ""
                                            }`}
                                    />

                                </button>


                                {isOpen && (
                                    <div className="border-t border-slate-200 px-5 pb-5 pt-4 dark:border-white/10">

                                        <p className="text-sm leading-7 text-slate-600 dark:text-slate-400">
                                            {faq.answer}
                                        </p>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                onStartChat(
                                                    `I have a question about: "${faq.question}"`,
                                                    {
                                                        Source:
                                                            "Software & Digital Solutions",
                                                        FAQ:
                                                            faq.question,
                                                    }
                                                )
                                            }
                                            className="mt-4 inline-flex items-center gap-2 text-xs font-black text-blue-600 hover:gap-3 dark:text-blue-400"
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
    );
}


/* =========================================================
   CTA
   ========================================================= */

function CTA({ onStartChat }) {
    return (
        <section className="relative overflow-hidden bg-slate-950 py-20 text-white lg:py-28">

            <div className="absolute inset-0">

                <div className="absolute left-[-100px] top-[-100px] h-[400px] w-[400px] rounded-full bg-blue-600/15 blur-3xl" />

                <div className="absolute bottom-[-150px] right-[-100px] h-[450px] w-[450px] rounded-full bg-blue-500/10 blur-3xl" />

            </div>


            <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-6 lg:px-8">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-blue-400">
                    <Rocket size={25} />
                </div>


                <h2 className="mt-7 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                    Have a problem that software could solve?
                </h2>


                <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
                    Tell us what you are trying to achieve. You do not need
                    a complete technical specification. We can help you
                    understand the options and determine the right next step.
                </p>


                <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">

                    <button
                        type="button"
                        onClick={() =>
                            onStartChat(
                                "I'd like to discuss a software project. Here's what we're trying to solve:",
                                {
                                    Source:
                                        "Software & Digital Solutions",
                                    Stage:
                                        "Project review request",
                                }
                            )
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-black text-slate-950 transition hover:-translate-y-0.5"
                    >
                        Request a Project Review
                        <ArrowRight size={17} />
                    </button>


                    <Link
                        to="/contact"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-black text-white transition hover:bg-white/10"
                    >
                        Talk to Us
                        <MessageSquare size={17} />
                    </Link>

                </div>


                <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-500">

                    <span>Software development</span>
                    <span>•</span>
                    <span>Automation</span>
                    <span>•</span>
                    <span>AI</span>
                    <span>•</span>
                    <span>Integrations</span>
                    <span>•</span>
                    <span>Support</span>

                </div>

            </div>
        </section>
    );
}


/* =========================================================
   FOOTER
   ========================================================= */

function Footer() {
    const columns = [
        {
            title: "Solutions",
            links: [
                ["Custom Software", "/solutions/custom-software"],
                ["Web Applications", "/solutions/web-applications"],
                ["Mobile Apps", "/solutions/mobile-apps"],
                ["Automation", "/solutions/automation"],
                ["AI Solutions", "/solutions/ai-solutions"],
                ["Integrations", "/solutions/integrations"],
            ],
        },
        {
            title: "Company",
            links: [
                ["About", "/about"],
                ["How We Work", "/how-we-work"],
                ["Industries", "/industries"],
                ["Resources", "/resources"],
                ["Contact", "/contact"],
            ],
        },
        {
            title: "Explore",
            links: [
                ["Software", "/software"],
                ["Free Tools", "/free-tools"],
                ["Training", "/training"],
                ["Hardware", "/hardware"],
                ["Networking", "/networking"],
                ["Request Quote", "/request-quote"],
            ],
        },
    ];

    return (
        <footer className="border-t border-slate-200 bg-white dark:border-white/10 dark:bg-slate-950">

            <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">

                <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">

                    <div>

                        <Link
                            to="/"
                            className="inline-flex items-center gap-3"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                                <Cpu size={20} />
                            </div>

                            <div>
                                <div className="text-sm font-black text-slate-950 dark:text-white">
                                    AB TECHNOLOGY
                                </div>

                                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                                    Technology. Simplified.
                                </div>
                            </div>
                        </Link>


                        <p className="mt-6 max-w-sm text-sm leading-7 text-slate-600 dark:text-slate-400">
                            Software, digital solutions, technology
                            infrastructure and practical support for
                            businesses, organizations and individuals.
                        </p>


                        <Link
                            to="/request-quote"
                            className="mt-6 inline-flex items-center gap-2 text-sm font-black text-blue-600 dark:text-blue-400"
                        >
                            Start a conversation
                            <ArrowRight size={16} />
                        </Link>

                    </div>


                    {columns.map((column) => (
                        <div key={column.title}>

                            <h3 className="text-xs font-black uppercase tracking-[0.16em] text-slate-950 dark:text-white">
                                {column.title}
                            </h3>


                            <div className="mt-5 space-y-3">

                                {column.links.map(([label, path]) => (
                                    <Link
                                        key={label}
                                        to={path}
                                        className="block text-sm text-slate-500 transition hover:text-blue-600 dark:text-slate-500 dark:hover:text-blue-400"
                                    >
                                        {label}
                                    </Link>
                                ))}

                            </div>

                        </div>
                    ))}

                </div>


                <div className="mt-14 flex flex-col justify-between gap-5 border-t border-slate-200 pt-7 text-xs text-slate-500 sm:flex-row dark:border-white/10">

                    <p>
                        © {new Date().getFullYear()} AB Technology.
                        All rights reserved.
                    </p>


                    <div className="flex flex-wrap gap-5">

                        <Link
                            to="/privacy"
                            className="hover:text-slate-950 dark:hover:text-white"
                        >
                            Privacy
                        </Link>

                        <Link
                            to="/terms"
                            className="hover:text-slate-950 dark:hover:text-white"
                        >
                            Terms
                        </Link>

                        <Link
                            to="/security"
                            className="hover:text-slate-950 dark:hover:text-white"
                        >
                            Security
                        </Link>

                    </div>

                </div>

            </div>

        </footer>
    );
}


/* =========================================================
   MAIN PAGE
   ========================================================= */

export default function SoftwareDigitalSolutions() {
    const navigate = useNavigate();

    /* -----------------------------------------------------
       Hand off a contextual request to the support page.
       The support page auto-sends it and continues the
       conversation with AB AI.
    ----------------------------------------------------- */

    const startSupportChat = (message, metadata) => {
        queueSupportRequest({
            message:
                message ||
                "I'd like to discuss a software or digital solution.",
            metadata: metadata || {
                Source: "Software & Digital Solutions",
            },
        });

        navigate("/support/ai");
    };

    return (
        <div className="min-h-screen overflow-x-hidden bg-white text-slate-950 dark:bg-slate-950 dark:text-white">

            <main>

                <Hero onStartChat={startSupportChat} />

                <Positioning />

                <CoreSolutions onStartChat={startSupportChat} />

                <SoftwareTypes onStartChat={startSupportChat} />

                <FromScratch onStartChat={startSupportChat} />

                <EngagementModels onStartChat={startSupportChat} />

                <Process />

                <TechnologySection onStartChat={startSupportChat} />

                <AISection onStartChat={startSupportChat} />

                <FreeTools />

                <SoftwareMarketplace />

                <SupportSection />

                <FAQ onStartChat={startSupportChat} />

                <CTA onStartChat={startSupportChat} />

            </main>

            <Footer />

        </div>
    );
}