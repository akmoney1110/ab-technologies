import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { queueSupportRequest } from "../AI";
import {
    ArrowRight,
    ArrowUpRight,
    Award,
    BookOpen,
    BrainCircuit,
    BriefcaseBusiness,
    CalendarDays,
    Check,
    CheckCircle2,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Clock3,
    Code2,
    Download,
    FileCheck2,
    FileText,
    Filter,
    GraduationCap,
    Headphones,
    Laptop,
    Lightbulb,
    LockKeyhole,
    Mail,
    Network,
    Play,
    Search,
    Send,
    ShieldCheck,
    Sparkles,
    Star,
    Target,
    TrendingUp,
    Users,
    X,
    Zap,
} from "lucide-react";

const categories = [
    "All",
    "Software Development",
    "AI & Automation",
    "Cloud & Infrastructure",
    "Cybersecurity",
    "IT & Networking",
    "Business Technology",
    "Procurement",
    "Digital Skills",
];

const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

const courses = [
    {
        id: 1,
        title: "Modern Full-Stack Web Development",
        shortTitle: "Full-Stack Development",
        description:
            "Build production-ready web applications from frontend interfaces to APIs, databases, authentication and deployment.",
        category: "Software Development",
        level: "Intermediate",
        duration: "10 weeks",
        lessons: 54,
        students: "1,240+",
        rating: 4.9,
        reviews: 184,
        price: "₦85,000",
        oldPrice: "₦120,000",
        featured: true,
        certificate: true,
        popular: true,
        icon: Code2,
        gradient: "from-blue-600 via-indigo-600 to-violet-700",
        tags: ["React", "Python", "Django", "APIs"],
    },
    {
        id: 2,
        title: "Practical Artificial Intelligence for Business",
        shortTitle: "AI for Business",
        description:
            "Learn how to identify practical AI opportunities, automate workflows and introduce intelligent tools into everyday business operations.",
        category: "AI & Automation",
        level: "Beginner",
        duration: "6 weeks",
        lessons: 36,
        students: "980+",
        rating: 4.8,
        reviews: 121,
        price: "₦70,000",
        oldPrice: "₦95,000",
        featured: true,
        certificate: true,
        popular: true,
        icon: BrainCircuit,
        gradient: "from-violet-600 via-purple-600 to-fuchsia-700",
        tags: ["AI", "Automation", "Prompting", "Business"],
    },
    {
        id: 3,
        title: "Cloud Infrastructure & Deployment",
        shortTitle: "Cloud Infrastructure",
        description:
            "Understand cloud architecture, servers, containers, deployment, security, monitoring and reliable infrastructure.",
        category: "Cloud & Infrastructure",
        level: "Intermediate",
        duration: "8 weeks",
        lessons: 45,
        students: "740+",
        rating: 4.9,
        reviews: 97,
        price: "₦90,000",
        oldPrice: "₦125,000",
        featured: true,
        certificate: true,
        popular: false,
        icon: CloudIcon,
        gradient: "from-cyan-500 via-blue-600 to-indigo-700",
        tags: ["Cloud", "Docker", "Linux", "DevOps"],
    },
    {
        id: 4,
        title: "Cybersecurity Fundamentals",
        shortTitle: "Cybersecurity",
        description:
            "Build a practical understanding of security threats, identity, access control, endpoint protection and organizational security.",
        category: "Cybersecurity",
        level: "Beginner",
        duration: "7 weeks",
        lessons: 40,
        students: "1,010+",
        rating: 4.8,
        reviews: 144,
        price: "₦65,000",
        oldPrice: "₦90,000",
        featured: false,
        certificate: true,
        popular: true,
        icon: ShieldCheck,
        gradient: "from-rose-500 via-red-600 to-orange-700",
        tags: ["Security", "Identity", "Risk", "Protection"],
    },
    {
        id: 5,
        title: "Networking & IT Infrastructure",
        shortTitle: "Networking",
        description:
            "Learn the foundations of business networks, switches, routers, Wi-Fi, IP addressing, troubleshooting and infrastructure planning.",
        category: "IT & Networking",
        level: "Beginner",
        duration: "8 weeks",
        lessons: 48,
        students: "860+",
        rating: 4.7,
        reviews: 106,
        price: "₦75,000",
        oldPrice: "₦100,000",
        featured: false,
        certificate: true,
        popular: false,
        icon: Network,
        gradient: "from-emerald-500 via-teal-600 to-cyan-700",
        tags: ["Networking", "Wi-Fi", "Servers", "IT"],
    },
    {
        id: 6,
        title: "Business Technology Management",
        shortTitle: "Business Technology",
        description:
            "Learn how organizations plan, evaluate, budget and manage technology investments around real business outcomes.",
        category: "Business Technology",
        level: "Intermediate",
        duration: "5 weeks",
        lessons: 28,
        students: "530+",
        rating: 4.8,
        reviews: 72,
        price: "₦55,000",
        oldPrice: "₦75,000",
        featured: false,
        certificate: true,
        popular: false,
        icon: BriefcaseBusiness,
        gradient: "from-slate-600 via-blue-700 to-indigo-800",
        tags: ["Strategy", "IT Management", "Planning", "ROI"],
    },
    {
        id: 7,
        title: "Technology Procurement Masterclass",
        shortTitle: "Tech Procurement",
        description:
            "Learn how to define requirements, compare vendors, evaluate quotations, verify products and manage procurement projects.",
        category: "Procurement",
        level: "Intermediate",
        duration: "4 weeks",
        lessons: 24,
        students: "460+",
        rating: 4.9,
        reviews: 63,
        price: "₦60,000",
        oldPrice: "₦80,000",
        featured: false,
        certificate: true,
        popular: true,
        icon: FileCheck2,
        gradient: "from-orange-500 via-amber-600 to-yellow-700",
        tags: ["Procurement", "Sourcing", "Vendors", "Quotations"],
    },
    {
        id: 8,
        title: "Professional Digital Skills",
        shortTitle: "Digital Skills",
        description:
            "Build practical digital skills for productivity, collaboration, communication, documentation and modern work.",
        category: "Digital Skills",
        level: "Beginner",
        duration: "4 weeks",
        lessons: 30,
        students: "1,850+",
        rating: 4.8,
        reviews: 210,
        price: "₦35,000",
        oldPrice: "₦50,000",
        featured: false,
        certificate: true,
        popular: true,
        icon: Laptop,
        gradient: "from-sky-500 via-blue-600 to-cyan-700",
        tags: ["Productivity", "Office", "Collaboration", "Digital"],
    },
    {
        id: 9,
        title: "Python Programming from Zero to Production",
        shortTitle: "Python Programming",
        description:
            "Start with Python fundamentals and progress into APIs, databases, automation, testing and production applications.",
        category: "Software Development",
        level: "Beginner",
        duration: "12 weeks",
        lessons: 70,
        students: "2,100+",
        rating: 4.9,
        reviews: 315,
        price: "₦95,000",
        oldPrice: "₦130,000",
        featured: true,
        certificate: true,
        popular: true,
        icon: Code2,
        gradient: "from-yellow-500 via-orange-600 to-red-700",
        tags: ["Python", "Programming", "APIs", "Automation"],
    },
    {
        id: 10,
        title: "Prompt Engineering & AI Productivity",
        shortTitle: "Prompt Engineering",
        description:
            "Learn how to communicate effectively with AI systems and design reliable prompts for research, writing, analysis and automation.",
        category: "AI & Automation",
        level: "Beginner",
        duration: "3 weeks",
        lessons: 18,
        students: "1,600+",
        rating: 4.9,
        reviews: 248,
        price: "₦30,000",
        oldPrice: "₦45,000",
        featured: false,
        certificate: true,
        popular: true,
        icon: Sparkles,
        gradient: "from-fuchsia-500 via-purple-600 to-blue-700",
        tags: ["AI", "Prompts", "Productivity", "Automation"],
    },
    {
        id: 11,
        title: "Linux Server Administration",
        shortTitle: "Linux Administration",
        description:
            "Develop practical Linux administration skills for servers, users, services, networking, security and deployment.",
        category: "Cloud & Infrastructure",
        level: "Intermediate",
        duration: "7 weeks",
        lessons: 42,
        students: "620+",
        rating: 4.8,
        reviews: 81,
        price: "₦70,000",
        oldPrice: "₦95,000",
        featured: false,
        certificate: true,
        popular: false,
        icon: ServerIcon,
        gradient: "from-slate-700 via-slate-800 to-blue-900",
        tags: ["Linux", "Servers", "SSH", "Administration"],
    },
    {
        id: 12,
        title: "Business Automation with APIs",
        shortTitle: "API Automation",
        description:
            "Connect business systems and eliminate repetitive work through APIs, integrations, webhooks and automated workflows.",
        category: "AI & Automation",
        level: "Advanced",
        duration: "6 weeks",
        lessons: 35,
        students: "410+",
        rating: 4.9,
        reviews: 54,
        price: "₦80,000",
        oldPrice: "₦110,000",
        featured: false,
        certificate: true,
        popular: false,
        icon: Zap,
        gradient: "from-indigo-500 via-blue-600 to-cyan-700",
        tags: ["APIs", "Automation", "Integration", "Webhooks"],
    },
];

const learningPaths = [
    {
        title: "Become a Full-Stack Developer",
        description:
            "A structured path from programming fundamentals through modern web application development.",
        courses: [
            "Python Programming",
            "Modern Full-Stack Web Development",
            "Business Automation with APIs",
        ],
        duration: "6–9 months",
        icon: Code2,
        gradient: "from-blue-600 to-indigo-700",
    },
    {
        title: "Become an AI-Ready Professional",
        description:
            "Learn practical AI, prompt engineering and automation skills for modern work.",
        courses: [
            "Prompt Engineering",
            "Practical AI for Business",
            "Business Automation with APIs",
        ],
        duration: "3–5 months",
        icon: BrainCircuit,
        gradient: "from-violet-600 to-fuchsia-700",
    },
    {
        title: "Build IT Infrastructure Skills",
        description:
            "Develop a strong foundation in networking, Linux, cloud and infrastructure operations.",
        courses: [
            "Networking & IT Infrastructure",
            "Linux Server Administration",
            "Cloud Infrastructure",
        ],
        duration: "5–7 months",
        icon: Network,
        gradient: "from-cyan-600 to-blue-700",
    },
];

const freeResources = [
    {
        title: "Technology Buying Checklist",
        description:
            "A practical checklist for evaluating business technology before purchasing.",
        type: "PDF Guide",
        icon: FileText,
    },
    {
        title: "AI Prompt Starter Pack",
        description:
            "Useful prompts for research, business writing, planning and productivity.",
        type: "Prompt Pack",
        icon: Sparkles,
    },
    {
        title: "IT Infrastructure Checklist",
        description:
            "A starting point for planning business networks, servers, backups and support.",
        type: "Checklist",
        icon: Network,
    },
    {
        title: "Vendor Evaluation Template",
        description:
            "A simple framework for comparing suppliers and technology vendors.",
        type: "Template",
        icon: FileCheck2,
    },
];

const instructors = [
    {
        name: "AB Software Team",
        role: "Software Engineering",
        description:
            "Practical development knowledge focused on building maintainable applications.",
        icon: Code2,
    },
    {
        name: "AB Infrastructure Team",
        role: "Cloud & IT Infrastructure",
        description:
            "Infrastructure professionals focused on reliable systems and deployment.",
        icon: Network,
    },
    {
        name: "AB Digital Solutions",
        role: "AI & Automation",
        description:
            "Practical AI and automation strategies designed around business outcomes.",
        icon: BrainCircuit,
    },
];

const testimonials = [
    {
        quote:
            "The course structure made it much easier to understand what I should learn first and what could wait.",
        name: "Technology Professional",
        role: "Course participant",
    },
    {
        quote:
            "I liked that the lessons were focused on practical use rather than just theory.",
        name: "Business Owner",
        role: "Course participant",
    },
    {
        quote:
            "The procurement training helped me understand how to compare vendors and requirements properly.",
        name: "Procurement Professional",
        role: "Course participant",
    },
];

function CloudIcon({ className = "" }) {
    return <Network className={className} />;
}

function ServerIcon({ className = "" }) {
    return <Network className={className} />;
}

function CourseCard({ course, onPreview }) {
    const Icon = course.icon;

    return (
        <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-white/10 dark:bg-slate-900">
            <div
                className={`relative h-52 overflow-hidden bg-gradient-to-br ${course.gradient} p-6`}
            >
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border border-white/20" />
                <div className="absolute -bottom-20 -left-10 h-52 w-52 rounded-full border border-white/10" />

                <div className="relative flex h-full flex-col justify-between">
                    <div className="flex items-center justify-between">
                        <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
                            {course.category}
                        </span>

                        {course.popular && (
                            <span className="flex items-center gap-1 rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold text-white">
                                <TrendingUp className="h-3.5 w-3.5" />
                                Popular
                            </span>
                        )}
                    </div>

                    <div className="flex items-end justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
                                {course.level}
                            </p>

                            <h3 className="mt-2 max-w-xs text-xl font-black leading-tight text-white">
                                {course.shortTitle}
                            </h3>
                        </div>

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                            <Icon className="h-6 w-6 text-white" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-black leading-snug text-slate-950 dark:text-white">
                    {course.title}
                </h3>

                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {course.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                    {course.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-white/5 dark:text-slate-300"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="mt-5 flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1.5">
                        <Clock3 className="h-4 w-4" />
                        {course.duration}
                    </span>

                    <span className="flex items-center gap-1.5">
                        <BookOpen className="h-4 w-4" />
                        {course.lessons} lessons
                    </span>
                </div>

                <div className="mt-4 flex items-center gap-2">
                    <div className="flex items-center gap-1 text-sm font-bold text-amber-500">
                        <Star className="h-4 w-4 fill-current" />
                        {course.rating}
                    </div>

                    <span className="text-xs text-slate-400">
                        ({course.reviews} reviews)
                    </span>
                </div>

                <div className="mt-auto pt-6">
                    <div className="mb-5 flex items-end justify-between">
                        <div>
                            <p className="text-xs text-slate-400">
                                Course price
                            </p>

                            <p className="mt-1 text-2xl font-black text-slate-950 dark:text-white">
                                {course.price}
                            </p>
                        </div>

                        <span className="text-sm text-slate-400 line-through">
                            {course.oldPrice}
                        </span>
                    </div>

                    <button
                        type="button"
                        onClick={() => onPreview(course)}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-black text-white transition hover:bg-blue-700 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-50"
                    >
                        View course
                        <ArrowRight className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </article>
    );
}

export default function TrainingLearningStudy() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [level, setLevel] = useState("All Levels");
    const [showFilters, setShowFilters] = useState(false);
    const [visibleCourses, setVisibleCourses] = useState(6);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedPath, setSelectedPath] = useState(null);
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);
    const [activeTestimonial, setActiveTestimonial] = useState(0);

    const startSupportChat = (message, metadata = {}) => {
        queueSupportRequest({
            message:
                message ||
                "I'd like help choosing a course, learning path or training option.",
            metadata: {
                Source: "Training & Learning",
                ...metadata,
            },
        });

        navigate("/support/ai");
    };

    const filteredCourses = useMemo(() => {
        const query = search.trim().toLowerCase();

        return courses.filter((course) => {
            const matchesCategory =
                category === "All" || course.category === category;

            const matchesLevel =
                level === "All Levels" || course.level === level;

            const text = [
                course.title,
                course.description,
                course.category,
                course.level,
                ...course.tags,
            ]
                .join(" ")
                .toLowerCase();

            const matchesSearch = !query || text.includes(query);

            return matchesCategory && matchesLevel && matchesSearch;
        });
    }, [search, category, level]);

    const displayedCourses = filteredCourses.slice(0, visibleCourses);

    const resetFilters = () => {
        setSearch("");
        setCategory("All");
        setLevel("All Levels");
        setVisibleCourses(6);
    };

    const handleSubscribe = (event) => {
        event.preventDefault();

        if (!email.trim()) return;

        setSubscribed(true);
        setEmail("");
    };

    const nextTestimonial = () => {
        setActiveTestimonial(
            (current) => (current + 1) % testimonials.length
        );
    };

    const previousTestimonial = () => {
        setActiveTestimonial(
            (current) =>
                (current - 1 + testimonials.length) % testimonials.length
        );
    };

    return (
        <main className="min-h-screen overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-500 dark:bg-slate-950 dark:text-white">
            {/* ============================================================
                HERO
            ============================================================ */}

            <section className="relative isolate overflow-hidden border-b border-slate-200 bg-white dark:border-white/10 dark:bg-slate-950">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute -left-40 top-0 h-[32rem] w-[32rem] rounded-full bg-blue-500/10 blur-3xl" />
                    <div className="absolute right-0 top-20 h-[28rem] w-[28rem] rounded-full bg-violet-500/10 blur-3xl" />
                    <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
                </div>

                <div
                    className="
                        absolute inset-0 -z-10 opacity-[0.035]
                        [background-image:linear-gradient(to_right,#64748b_1px,transparent_1px),linear-gradient(to_bottom,#64748b_1px,transparent_1px)]
                        [background-size:48px_48px]
                        dark:opacity-[0.06]
                    "
                />

                <div className="mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
                    <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
                        <div>
                            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700 dark:border-blue-400/20 dark:bg-blue-500/10 dark:text-blue-300">
                                <GraduationCap className="h-4 w-4" />
                                AB Learning
                            </div>

                            <h1 className="max-w-4xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-7xl dark:text-white">
                                Learn the skills that move
                                <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                                    technology forward.
                                </span>
                            </h1>

                            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl dark:text-slate-300">
                                Practical training, structured learning paths
                                and study resources for developers,
                                professionals, businesses, students and
                                organizations.
                            </p>

                            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                                <a
                                    href="#courses"
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 py-3.5 font-black text-white shadow-xl transition hover:bg-blue-700 dark:bg-white dark:text-slate-950"
                                >
                                    Explore courses
                                    <ArrowRight className="h-5 w-5" />
                                </a>

                                <a
                                    href="#free-resources"
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-6 py-3.5 font-black text-slate-800 transition hover:border-blue-400 hover:text-blue-600 dark:border-white/15 dark:bg-white/5 dark:text-white"
                                >
                                    Free resources
                                    <Download className="h-5 w-5" />
                                </a>
                            </div>

                            <div className="mt-10 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
                                {[
                                    ["25+", "Courses"],
                                    ["8,000+", "Learners"],
                                    ["50+", "Free resources"],
                                    ["4.8/5", "Average rating"],
                                ].map(([value, label]) => (
                                    <div
                                        key={label}
                                        className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/[0.03]"
                                    >
                                        <p className="text-xl font-black text-slate-950 dark:text-white">
                                            {value}
                                        </p>

                                        <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                                            {label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-blue-500/20 via-violet-500/10 to-cyan-500/20 blur-3xl" />

                            <div className="relative rounded-[2rem] border border-slate-200 bg-slate-950 p-5 shadow-2xl dark:border-white/10">
                                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-300">
                                                Learning dashboard
                                            </p>

                                            <h2 className="mt-2 text-xl font-black text-white">
                                                Your next skill starts here.
                                            </h2>
                                        </div>

                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/15">
                                            <Target className="h-6 w-6 text-blue-300" />
                                        </div>
                                    </div>

                                    <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-xs text-slate-400">
                                                    Recommended path
                                                </p>

                                                <p className="mt-1 font-black text-white">
                                                    AI-Ready Professional
                                                </p>
                                            </div>

                                            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-300">
                                                68% complete
                                            </span>
                                        </div>

                                        <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                                            <div className="h-full w-[68%] rounded-full bg-blue-500" />
                                        </div>

                                        <div className="mt-3 flex justify-between text-xs text-slate-500">
                                            <span>12 lessons completed</span>
                                            <span>6 remaining</span>
                                        </div>
                                    </div>

                                    <div className="mt-4 grid grid-cols-2 gap-3">
                                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                                            <Sparkles className="h-5 w-5 text-violet-300" />

                                            <p className="mt-4 text-sm font-bold text-white">
                                                AI learning
                                            </p>

                                            <p className="mt-1 text-xs leading-5 text-slate-400">
                                                Learn practical AI workflows.
                                            </p>
                                        </div>

                                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                                            <Code2 className="h-5 w-5 text-blue-300" />

                                            <p className="mt-4 text-sm font-bold text-white">
                                                Build projects
                                            </p>

                                            <p className="mt-1 text-xs leading-5 text-slate-400">
                                                Learn by doing real work.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex items-center gap-3 rounded-2xl border border-blue-400/20 bg-blue-500/10 p-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
                                            <Award className="h-5 w-5 text-blue-300" />
                                        </div>

                                        <div>
                                            <p className="text-sm font-bold text-white">
                                                Certificates included
                                            </p>

                                            <p className="text-xs text-slate-400">
                                                Show what you've learned.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================
                LEARNING PHILOSOPHY
            ============================================================ */}

            <section className="bg-slate-100 py-16 dark:bg-slate-900/60 lg:py-24">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
                        <div>
                            <div className="mb-3 text-sm font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
                                How we teach
                            </div>

                            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                                Learning should lead somewhere.
                            </h2>

                            <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
                                Our courses are designed around practical skills,
                                not simply completing videos. The objective is
                                to help learners understand concepts, apply them
                                and use them confidently.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {[
                                {
                                    icon: Target,
                                    title: "Outcome-focused",
                                    text: "Know exactly what you should be able to do after learning.",
                                },
                                {
                                    icon: Code2,
                                    title: "Practical",
                                    text: "Apply knowledge through exercises, examples and projects.",
                                },
                                {
                                    icon: BrainCircuit,
                                    title: "Modern",
                                    text: "Learn tools, workflows and technologies relevant to today's work.",
                                },
                                {
                                    icon: Users,
                                    title: "Career-aware",
                                    text: "Develop skills that can translate into professional opportunities.",
                                },
                            ].map((item) => {
                                const Icon = item.icon;

                                return (
                                    <div
                                        key={item.title}
                                        className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-slate-950"
                                    >
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                            <Icon className="h-5 w-5" />
                                        </div>

                                        <h3 className="mt-5 font-black">
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

            {/* ============================================================
                COURSE EXPLORER
            ============================================================ */}

            <section
                id="courses"
                className="scroll-mt-20 bg-white py-16 dark:bg-slate-950 lg:py-24"
            >
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <div className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
                            <BookOpen className="h-4 w-4" />
                            Course marketplace
                        </div>

                        <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                            Learn something useful.
                        </h2>

                        <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-400">
                            Explore technology, business, software, AI,
                            infrastructure and professional development
                            courses.
                        </p>
                    </div>

                    <div className="mt-10 flex flex-col gap-4 lg:flex-row">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                            <input
                                value={search}
                                onChange={(event) => {
                                    setSearch(event.target.value);
                                    setVisibleCourses(6);
                                }}
                                type="search"
                                placeholder="Search courses, skills or technologies..."
                                className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-5 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                            />
                        </div>

                        <button
                            type="button"
                            onClick={() => setShowFilters(!showFilters)}
                            className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-6 font-bold dark:border-white/10 dark:bg-white/[0.04] lg:hidden"
                        >
                            <Filter className="h-5 w-5" />
                            Filters
                            <ChevronDown
                                className={`h-4 w-4 transition ${showFilters ? "rotate-180" : ""
                                    }`}
                            />
                        </button>
                    </div>

                    <div
                        className={`mt-5 ${showFilters ? "block" : "hidden"
                            } lg:block`}
                    >
                        <div className="flex flex-wrap gap-2">
                            {categories.map((item) => (
                                <button
                                    type="button"
                                    key={item}
                                    onClick={() => {
                                        setCategory(item);
                                        setVisibleCourses(6);
                                    }}
                                    className={`rounded-full px-4 py-2.5 text-sm font-bold transition ${category === item
                                        ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                                        : "border border-slate-200 bg-white text-slate-600 hover:border-blue-400 hover:text-blue-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-300"
                                        }`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>

                        <div className="mt-4 flex flex-wrap items-center gap-2">
                            {levels.map((item) => (
                                <button
                                    type="button"
                                    key={item}
                                    onClick={() => {
                                        setLevel(item);
                                        setVisibleCourses(6);
                                    }}
                                    className={`rounded-xl px-4 py-2 text-xs font-bold transition ${level === item
                                        ? "bg-blue-600 text-white"
                                        : "bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-slate-300"
                                        }`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 flex items-center justify-between border-b border-slate-200 pb-5 dark:border-white/10">
                        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                            {filteredCourses.length} courses available
                        </p>

                        {(search ||
                            category !== "All" ||
                            level !== "All Levels") && (
                                <button
                                    type="button"
                                    onClick={resetFilters}
                                    className="text-sm font-bold text-blue-600 dark:text-blue-400"
                                >
                                    Reset filters
                                </button>
                            )}
                    </div>

                    {displayedCourses.length > 0 ? (
                        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {displayedCourses.map((course) => (
                                <CourseCard
                                    key={course.id}
                                    course={course}
                                    onPreview={setSelectedCourse}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-16 text-center dark:border-white/10 dark:bg-white/[0.03]">
                            <Search className="mx-auto h-8 w-8 text-slate-400" />

                            <h3 className="mt-5 text-xl font-black">
                                No courses found
                            </h3>

                            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                                Try a different search term or category.
                            </p>

                            <button
                                type="button"
                                onClick={resetFilters}
                                className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white"
                            >
                                Show all courses
                            </button>
                        </div>
                    )}

                    {visibleCourses < filteredCourses.length && (
                        <div className="mt-12 flex justify-center">
                            <button
                                type="button"
                                onClick={() =>
                                    setVisibleCourses(
                                        (current) => current + 6
                                    )
                                }
                                className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-7 py-3.5 font-black text-slate-800 transition hover:border-blue-500 hover:text-blue-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
                            >
                                Load more courses
                                <ChevronDown className="h-4 w-4" />
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* ============================================================
                LEARNING PATHS
            ============================================================ */}

            <section className="border-y border-slate-200 bg-slate-50 py-16 dark:border-white/10 dark:bg-slate-900/60 lg:py-24">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <div className="mb-3 text-sm font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
                            Structured learning
                        </div>

                        <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                            Don't know what to learn first?
                        </h2>

                        <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-400">
                            Follow a learning path designed around a specific
                            goal instead of choosing individual courses at
                            random.
                        </p>
                    </div>

                    <div className="mt-10 grid gap-6 lg:grid-cols-3">
                        {learningPaths.map((path) => {
                            const Icon = path.icon;

                            return (
                                <article
                                    key={path.title}
                                    className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-950"
                                >
                                    <div
                                        className={`bg-gradient-to-br ${path.gradient} p-7`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                                                <Icon className="h-6 w-6 text-white" />
                                            </div>

                                            <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-white">
                                                {path.duration}
                                            </span>
                                        </div>

                                        <h3 className="mt-8 text-2xl font-black text-white">
                                            {path.title}
                                        </h3>
                                    </div>

                                    <div className="p-7">
                                        <p className="text-sm leading-7 text-slate-600 dark:text-slate-400">
                                            {path.description}
                                        </p>

                                        <div className="mt-6 space-y-3">
                                            {path.courses.map((course, index) => (
                                                <div
                                                    key={course}
                                                    className="flex items-center gap-3"
                                                >
                                                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-xs font-black text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                                        {index + 1}
                                                    </div>

                                                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                                        {course}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => setSelectedPath(path)}
                                            className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 font-bold text-slate-800 transition hover:border-blue-400 hover:text-blue-600 dark:border-white/10 dark:text-white"
                                        >
                                            View learning path
                                            <ArrowRight className="h-4 w-4" />
                                        </button>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ============================================================
                WHY LEARN WITH AB
            ============================================================ */}

            <section className="bg-white py-16 dark:bg-slate-950 lg:py-24">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
                        <div>
                            <div className="mb-3 text-sm font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
                                Built for real learning
                            </div>

                            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                                More than watching videos.
                            </h2>

                            <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
                                Technology changes quickly. We focus on helping
                                learners understand principles while gaining
                                practical experience with modern tools.
                            </p>

                            <a
                                href="#courses"
                                className="mt-7 inline-flex items-center gap-2 font-black text-blue-600 dark:text-blue-400"
                            >
                                Explore the curriculum
                                <ArrowRight className="h-4 w-4" />
                            </a>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {[
                                {
                                    icon: Play,
                                    title: "Video lessons",
                                    text: "Clear lessons broken into manageable learning units.",
                                },
                                {
                                    icon: Code2,
                                    title: "Hands-on practice",
                                    text: "Exercises and practical work to reinforce concepts.",
                                },
                                {
                                    icon: FileCheck2,
                                    title: "Assessments",
                                    text: "Check your understanding as you progress.",
                                },
                                {
                                    icon: Award,
                                    title: "Certificates",
                                    text: "Complete eligible courses and receive a certificate.",
                                },
                                {
                                    icon: Download,
                                    title: "Study resources",
                                    text: "Use downloadable guides and supporting materials.",
                                },
                                {
                                    icon: Headphones,
                                    title: "Support",
                                    text: "Get guidance when you need help moving forward.",
                                },
                            ].map((feature) => {
                                const Icon = feature.icon;

                                return (
                                    <div
                                        key={feature.title}
                                        className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-white/[0.03]"
                                    >
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                                            <Icon className="h-5 w-5" />
                                        </div>

                                        <h3 className="mt-5 font-black">
                                            {feature.title}
                                        </h3>

                                        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                            {feature.text}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================
                FREE RESOURCES
            ============================================================ */}

            <section
                id="free-resources"
                className="scroll-mt-20 bg-slate-950 py-16 text-white lg:py-24"
            >
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                        <div>
                            <div className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-blue-300">
                                <Download className="h-4 w-4" />
                                Free study resources
                            </div>

                            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                                Start learning without paying.
                            </h2>

                            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
                                Get practical guides, templates, checklists and
                                AI resources designed to help you make progress
                                before you ever enroll in a paid course.
                            </p>

                            <div className="mt-7 flex flex-wrap gap-3">
                                {[
                                    "Free guides",
                                    "Templates",
                                    "Checklists",
                                    "Prompt packs",
                                ].map((item) => (
                                    <span
                                        key={item}
                                        className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-300"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {freeResources.map((resource) => {
                                const Icon = resource.icon;

                                return (
                                    <article
                                        key={resource.title}
                                        className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 transition hover:bg-white/[0.08]"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10">
                                                <Icon className="h-5 w-5 text-blue-300" />
                                            </div>

                                            <span className="rounded-full bg-white/5 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-slate-400">
                                                {resource.type}
                                            </span>
                                        </div>

                                        <h3 className="mt-6 font-black text-white">
                                            {resource.title}
                                        </h3>

                                        <p className="mt-2 text-sm leading-6 text-slate-400">
                                            {resource.description}
                                        </p>

                                        <button
                                            type="button"
                                            className="mt-6 inline-flex items-center gap-2 text-sm font-black text-blue-300"
                                        >
                                            Download free
                                            <Download className="h-4 w-4" />
                                        </button>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================
                AI LEARNING
            ============================================================ */}

            <section className="bg-white py-16 dark:bg-slate-950 lg:py-24">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-[2rem] border border-violet-200 bg-gradient-to-br from-violet-50 via-white to-blue-50 dark:border-violet-400/20 dark:from-violet-500/10 dark:via-slate-900 dark:to-blue-500/10">
                        <div className="grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-[1fr_0.8fr] lg:p-16">
                            <div>
                                <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-4 py-2 text-xs font-black uppercase tracking-widest text-violet-700 dark:border-white/10 dark:bg-white/5 dark:text-violet-300">
                                    <BrainCircuit className="h-4 w-4" />
                                    AI-assisted learning
                                </div>

                                <h2 className="mt-6 max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">
                                    Learn with AI. Think for yourself.
                                </h2>

                                <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                                    AI can help explain difficult concepts,
                                    generate practice questions, summarize
                                    material and provide alternative
                                    explanations. Our approach is to use AI as
                                    a learning assistant—not a replacement for
                                    understanding.
                                </p>

                                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                                    {[
                                        "Concept explanations",
                                        "Practice questions",
                                        "Study summaries",
                                        "Learning assistance",
                                    ].map((item) => (
                                        <div
                                            key={item}
                                            className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300"
                                        >
                                            <CheckCircle2 className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="relative">
                                <div className="absolute -inset-6 rounded-full bg-violet-500/20 blur-3xl" />

                                <div className="relative rounded-3xl border border-violet-200 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-slate-950">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10">
                                            <Sparkles className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                                        </div>

                                        <div>
                                            <p className="font-black">
                                                AI Study Assistant
                                            </p>

                                            <p className="text-xs text-slate-400">
                                                Learning support
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-6 rounded-2xl bg-slate-100 p-4 dark:bg-white/[0.04]">
                                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                            Learner
                                        </p>

                                        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                                            Explain APIs to me as if I'm
                                            learning backend development for
                                            the first time.
                                        </p>
                                    </div>

                                    <div className="mt-3 rounded-2xl bg-violet-50 p-4 dark:bg-violet-500/10">
                                        <p className="text-xs font-bold uppercase tracking-wider text-violet-500">
                                            AI assistant
                                        </p>

                                        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                                            An API is a structured way for
                                            different software systems to
                                            communicate and exchange data...
                                        </p>
                                    </div>

                                    <div className="mt-5 flex items-center justify-between text-xs text-slate-400">
                                        <span>Ask • Practice • Review</span>
                                        <BrainCircuit className="h-4 w-4" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================
                INSTRUCTORS
            ============================================================ */}

            <section className="border-y border-slate-200 bg-slate-50 py-16 dark:border-white/10 dark:bg-slate-900/60 lg:py-24">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <div className="mb-3 text-sm font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
                            Learn from practitioners
                        </div>

                        <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                            Knowledge built around real work.
                        </h2>

                        <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-400">
                            Our learning content is organized around the same
                            technology areas AB Technologies works with in
                            real-world projects.
                        </p>
                    </div>

                    <div className="mt-10 grid gap-6 md:grid-cols-3">
                        {instructors.map((instructor) => {
                            const Icon = instructor.icon;

                            return (
                                <article
                                    key={instructor.name}
                                    className="rounded-3xl border border-slate-200 bg-white p-7 dark:border-white/10 dark:bg-slate-950"
                                >
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                        <Icon className="h-7 w-7" />
                                    </div>

                                    <h3 className="mt-6 text-xl font-black">
                                        {instructor.name}
                                    </h3>

                                    <p className="mt-1 text-sm font-bold text-blue-600 dark:text-blue-400">
                                        {instructor.role}
                                    </p>

                                    <p className="mt-4 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                        {instructor.description}
                                    </p>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ============================================================
                BUSINESS TRAINING
            ============================================================ */}

            <section className="bg-white py-16 dark:bg-slate-950 lg:py-24">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 dark:border-white/10 dark:bg-white/[0.03] sm:p-12 lg:p-16">
                        <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
                            <div>
                                <div className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
                                    <Users className="h-4 w-4" />
                                    Training for organizations
                                </div>

                                <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                                    Train your team around your business.
                                </h2>

                                <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
                                    Give employees practical technology skills
                                    through structured training designed around
                                    your organization's tools, processes and
                                    goals.
                                </p>

                                <div className="mt-7 space-y-3">
                                    {[
                                        "Private team training",
                                        "Custom curriculum",
                                        "Technology adoption workshops",
                                        "AI productivity training",
                                        "IT and cybersecurity awareness",
                                        "Digital skills programs",
                                    ].map((item) => (
                                        <div
                                            key={item}
                                            className="flex items-center gap-3"
                                        >
                                            <CheckCircle2 className="h-5 w-5 text-emerald-500" />

                                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                                {item}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to discuss private or customized technology training for our organization.",
                                            {
                                                Intent: "Team training enquiry",
                                                Training: "Organization / Team Training",
                                            }
                                        )
                                    }
                                    className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 font-black text-white transition hover:bg-blue-700 dark:bg-white dark:text-slate-950"
                                >
                                    Discuss team training
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                {[
                                    ["Small teams", "Flexible group sessions"],
                                    ["Enterprises", "Structured programs"],
                                    ["Schools", "Digital skills training"],
                                    ["NGOs", "Capacity development"],
                                ].map(([title, text]) => (
                                    <div
                                        key={title}
                                        className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-slate-950"
                                    >
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                            <GraduationCap className="h-5 w-5" />
                                        </div>

                                        <h3 className="mt-5 font-black">
                                            {title}
                                        </h3>

                                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                            {text}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================
                CERTIFICATION
            ============================================================ */}

            <section className="bg-slate-950 py-16 text-white lg:py-24">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
                        <div>
                            <div className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-blue-300">
                                <Award className="h-4 w-4" />
                                Certificates
                            </div>

                            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                                Finish with something you can show.
                            </h2>

                            <p className="mt-5 text-lg leading-8 text-slate-300">
                                Eligible courses include completion
                                certificates that document the training you
                                have completed.
                            </p>
                        </div>

                        <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-7 sm:p-9">
                            <div className="flex items-center gap-5">
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10">
                                    <Award className="h-8 w-8 text-blue-300" />
                                </div>

                                <div>
                                    <p className="text-xs font-black uppercase tracking-widest text-blue-300">
                                        Certificate of completion
                                    </p>

                                    <h3 className="mt-2 text-xl font-black">
                                        Technology & Digital Skills
                                    </h3>
                                </div>
                            </div>

                            <div className="mt-8 grid gap-3 sm:grid-cols-3">
                                {[
                                    "Course completed",
                                    "Assessment passed",
                                    "Completion verified",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                                    >
                                        <CheckCircle2 className="h-5 w-5 text-emerald-400" />

                                        <p className="mt-3 text-xs font-semibold leading-5 text-slate-400">
                                            {item}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================
                TESTIMONIALS
            ============================================================ */}

            <section className="bg-white py-16 dark:bg-slate-950 lg:py-24">
                <div className="mx-auto max-w-5xl px-5 text-center sm:px-6 lg:px-8">
                    <div className="mb-3 text-sm font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
                        Learner feedback
                    </div>

                    <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                        Built around practical learning.
                    </h2>

                    <div className="mt-10 rounded-[2rem] border border-slate-200 bg-slate-50 p-8 dark:border-white/10 dark:bg-white/[0.03] sm:p-12">
                        <div className="flex justify-center gap-1 text-amber-500">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <Star
                                    key={index}
                                    className="h-5 w-5 fill-current"
                                />
                            ))}
                        </div>

                        <blockquote className="mx-auto mt-7 max-w-3xl text-2xl font-bold leading-10 text-slate-800 dark:text-slate-100">
                            “{testimonials[activeTestimonial].quote}”
                        </blockquote>

                        <div className="mt-7">
                            <p className="font-black">
                                {testimonials[activeTestimonial].name}
                            </p>

                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                {testimonials[activeTestimonial].role}
                            </p>
                        </div>

                        <div className="mt-8 flex justify-center gap-3">
                            <button
                                type="button"
                                onClick={previousTestimonial}
                                className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 dark:border-white/10"
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </button>

                            <button
                                type="button"
                                onClick={nextTestimonial}
                                className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 dark:border-white/10"
                            >
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================
                NEWSLETTER
            ============================================================ */}

            <section className="border-t border-slate-200 bg-slate-100 py-16 dark:border-white/10 dark:bg-slate-900/60 lg:py-24">
                <div className="mx-auto max-w-4xl px-5 text-center sm:px-6 lg:px-8">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-600/20">
                        <Mail className="h-7 w-7" />
                    </div>

                    <h2 className="mt-7 text-3xl font-black tracking-tight sm:text-4xl">
                        Keep learning.
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">
                        Get new courses, free resources, technology guides and
                        learning opportunities when they become available.
                    </p>

                    {subscribed ? (
                        <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-800 dark:border-emerald-400/20 dark:bg-emerald-500/10 dark:text-emerald-300">
                            <div className="flex items-center justify-center gap-2 font-bold">
                                <CheckCircle2 className="h-5 w-5" />
                                You're subscribed.
                            </div>
                        </div>
                    ) : (
                        <form
                            onSubmit={handleSubscribe}
                            className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
                        >
                            <div className="relative flex-1">
                                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                    placeholder="Your email address"
                                    className="h-14 w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-5 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-slate-950"
                                />
                            </div>

                            <button
                                type="submit"
                                className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-7 font-black text-white hover:bg-blue-700"
                            >
                                Subscribe
                                <Send className="h-4 w-4" />
                            </button>
                        </form>
                    )}

                    <p className="mt-4 text-xs text-slate-400">
                        Useful learning updates. No unnecessary noise.
                    </p>
                </div>
            </section>

            {/* ============================================================
                FINAL CTA
            ============================================================ */}

            <section className="bg-white py-16 dark:bg-slate-950 lg:py-24">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-600 via-indigo-700 to-violet-800 p-8 text-white shadow-2xl sm:p-12 lg:p-16">
                        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/10" />
                        <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full border border-white/10" />

                        <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
                            <div>
                                <div className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-blue-100">
                                    <Lightbulb className="h-4 w-4" />
                                    Your next step
                                </div>

                                <h2 className="mt-5 max-w-3xl text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                                    Don't just use technology. Understand it.
                                </h2>

                                <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-100">
                                    Start with a free resource, choose a course
                                    or follow a structured learning path that
                                    matches where you want to go.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                                <a
                                    href="#courses"
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-7 py-4 font-black text-slate-950 transition hover:bg-blue-50"
                                >
                                    Browse courses
                                    <ArrowRight className="h-5 w-5" />
                                </a>

                                <a
                                    href="#free-resources"
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-7 py-4 font-black text-white transition hover:bg-white/15"
                                >
                                    Start free
                                    <Download className="h-5 w-5" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================
                COURSE PREVIEW MODAL
            ============================================================ */}

            {selectedCourse && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/75 p-4 backdrop-blur-sm"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            setSelectedCourse(null);
                        }
                    }}
                >
                    <div className="my-8 w-full max-w-3xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-slate-900">
                        <div
                            className={`relative h-60 bg-gradient-to-br ${selectedCourse.gradient} p-7 sm:p-10`}
                        >
                            <button
                                type="button"
                                onClick={() => setSelectedCourse(null)}
                                className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-xl bg-black/20 text-white"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            <div className="flex h-full flex-col justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="rounded-full bg-white/15 px-4 py-2 text-xs font-black uppercase tracking-wider text-white">
                                        {selectedCourse.category}
                                    </span>

                                    <span className="rounded-full bg-white/15 px-4 py-2 text-xs font-black text-white">
                                        {selectedCourse.level}
                                    </span>
                                </div>

                                <h2 className="max-w-2xl text-3xl font-black leading-tight text-white">
                                    {selectedCourse.title}
                                </h2>
                            </div>
                        </div>

                        <div className="p-7 sm:p-10">
                            <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">
                                {selectedCourse.description}
                            </p>

                            <div className="mt-7 grid gap-3 sm:grid-cols-3">
                                <div className="rounded-2xl bg-slate-50 p-5 dark:bg-white/[0.04]">
                                    <Clock3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />

                                    <p className="mt-3 text-xs text-slate-400">
                                        Duration
                                    </p>

                                    <p className="mt-1 font-black">
                                        {selectedCourse.duration}
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-slate-50 p-5 dark:bg-white/[0.04]">
                                    <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />

                                    <p className="mt-3 text-xs text-slate-400">
                                        Lessons
                                    </p>

                                    <p className="mt-1 font-black">
                                        {selectedCourse.lessons}
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-slate-50 p-5 dark:bg-white/[0.04]">
                                    <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />

                                    <p className="mt-3 text-xs text-slate-400">
                                        Learners
                                    </p>

                                    <p className="mt-1 font-black">
                                        {selectedCourse.students}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8">
                                <h3 className="text-xl font-black">
                                    What you'll learn
                                </h3>

                                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                    {[
                                        "Core concepts and terminology",
                                        "Practical workflows",
                                        "Real-world implementation",
                                        "Tools and best practices",
                                        "Troubleshooting techniques",
                                        "Project-based application",
                                    ].map((item) => (
                                        <div
                                            key={item}
                                            className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300"
                                        >
                                            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-8 flex items-end justify-between border-t border-slate-200 pt-7 dark:border-white/10">
                                <div>
                                    <p className="text-xs text-slate-400">
                                        Course investment
                                    </p>

                                    <p className="mt-1 text-3xl font-black">
                                        {selectedCourse.price}
                                    </p>
                                </div>

                                <span className="text-sm text-slate-400 line-through">
                                    {selectedCourse.oldPrice}
                                </span>
                            </div>

                            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to enroll in ${selectedCourse.title}.`,
                                            {
                                                Intent: "Course enrollment",
                                                Course: selectedCourse.title,
                                                Category: selectedCourse.category,
                                                Level: selectedCourse.level,
                                                Price: selectedCourse.price,
                                            }
                                        )
                                    }
                                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 font-black text-white hover:bg-blue-700"
                                >
                                    Enroll now
                                    <ArrowRight className="h-4 w-4" />
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setSelectedCourse(null)}
                                    className="rounded-xl border border-slate-300 px-5 py-3.5 font-bold dark:border-white/10"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ============================================================
                LEARNING PATH MODAL
            ============================================================ */}

            {selectedPath && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/75 p-4 backdrop-blur-sm"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            setSelectedPath(null);
                        }
                    }}
                >
                    <div className="my-8 w-full max-w-2xl rounded-[2rem] border border-slate-200 bg-white p-7 shadow-2xl dark:border-white/10 dark:bg-slate-900 sm:p-10">
                        <div className="flex items-start justify-between gap-5">
                            <div>
                                <p className="text-sm font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
                                    Learning path
                                </p>

                                <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                                    {selectedPath.title}
                                </h2>
                            </div>

                            <button
                                type="button"
                                onClick={() => setSelectedPath(null)}
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 dark:border-white/10"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <p className="mt-5 leading-7 text-slate-600 dark:text-slate-400">
                            {selectedPath.description}
                        </p>

                        <div className="mt-7 space-y-3">
                            {selectedPath.courses.map((course, index) => (
                                <div
                                    key={course}
                                    className="flex items-center gap-4 rounded-2xl border border-slate-200 p-4 dark:border-white/10"
                                >
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-sm font-black text-white">
                                        {index + 1}
                                    </div>

                                    <div className="flex-1">
                                        <p className="font-bold">{course}</p>

                                        <p className="mt-1 text-xs text-slate-400">
                                            Recommended course
                                        </p>
                                    </div>

                                    <CheckCircle2 className="h-5 w-5 text-slate-300" />
                                </div>
                            ))}
                        </div>

                        <div className="mt-7 flex items-center justify-between rounded-2xl bg-slate-50 p-5 dark:bg-white/[0.04]">
                            <div>
                                <p className="text-xs text-slate-400">
                                    Estimated completion
                                </p>

                                <p className="mt-1 font-black">
                                    {selectedPath.duration}
                                </p>
                            </div>

                            <GraduationCap className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                startSupportChat(
                                    `I'd like to start the ${selectedPath.title} learning path.`,
                                    {
                                        Intent: "Learning path enrollment",
                                        "Learning Path": selectedPath.title,
                                        Duration: selectedPath.duration,
                                    }
                                )
                            }
                            className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 font-black text-white hover:bg-blue-700"
                        >
                            Start this path
                            <ArrowRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}