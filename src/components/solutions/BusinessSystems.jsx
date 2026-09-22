import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowRight,
    ArrowUpRight,
    BarChart3,
    Bell,
    BriefcaseBusiness,
    Building2,
    Calculator,
    CalendarDays,
    Check,
    ChevronDown,
    ChevronRight,
    ClipboardCheck,
    Clock3,
    Cloud,
    CreditCard,
    Database,
    FileBarChart,
    FileCheck2,
    FileText,
    FolderKanban,
    Gauge,
    Globe2,
    Headphones,
    Layers3,
    LockKeyhole,
    Mail,
    Menu,
    MessageSquare,
    Package,
    PieChart,
    Receipt,
    RefreshCw,
    Search,
    Settings2,
    ShieldCheck,
    ShoppingCart,
    Sparkles,
    Target,
    TrendingUp,
    Truck,
    UserCheck,
    UserRound,
    Users,
    WalletCards,
    Workflow,
    X,
    Zap,
} from "lucide-react";

import { queueSupportRequest } from "../AI";

/* =========================================================
   DATA
========================================================= */

const modules = [
    { icon: Gauge, title: "Executive Dashboard", description: "Give owners and management a clear view of revenue, expenses, orders, outstanding payments, inventory, staff activity and operational performance.", tag: "Management" },
    { icon: Users, title: "Customer & CRM", description: "Organize customers, contacts, opportunities, interactions, follow-ups, quotations, sales history and relationship activity in one place.", tag: "CRM" },
    { icon: ShoppingCart, title: "Sales Management", description: "Manage enquiries, quotations, sales orders, invoices, payments and customer fulfilment from enquiry through completion.", tag: "Sales" },
    { icon: Package, title: "Inventory Management", description: "Track products, stock levels, warehouses, transfers, adjustments, low-stock alerts, stock valuation and movement history.", tag: "Operations" },
    { icon: Truck, title: "Procurement", description: "Create purchase requests, compare suppliers, manage purchase orders, receive goods and maintain supplier records.", tag: "Procurement" },
    { icon: WalletCards, title: "Finance & Expenses", description: "Track income, expenses, invoices, receivables, payables, budgets, approvals and financial activity.", tag: "Finance" },
    { icon: UserCheck, title: "HR & Workforce", description: "Manage employees, departments, attendance, leave, roles, assignments, documents and workforce information.", tag: "People" },
    { icon: FolderKanban, title: "Projects & Tasks", description: "Plan projects, assign responsibilities, monitor deadlines, track progress and keep project activity organized.", tag: "Projects" },
    { icon: FileText, title: "Documents", description: "Centralize business documents, contracts, quotations, invoices, reports and operational files with controlled access.", tag: "Documents" },
    { icon: BarChart3, title: "Reports & Analytics", description: "Turn operational information into useful reports covering sales, finance, inventory, customers, employees and performance.", tag: "Analytics" },
    { icon: Workflow, title: "Workflow Automation", description: "Automate repetitive business processes such as approvals, reminders, notifications, assignments and status changes.", tag: "Automation" },
    { icon: ShieldCheck, title: "Security & Permissions", description: "Control access by user, department, role and responsibility while keeping a history of important business activities.", tag: "Security" },
];

const businessAreas = [
    { icon: Building2, title: "Business Operations", text: "Bring everyday operations into a structured digital environment where teams can work from a shared source of information." },
    { icon: CreditCard, title: "Financial Control", text: "Know what has been invoiced, what has been paid, what is outstanding and where business expenses are going." },
    { icon: TrendingUp, title: "Growth Management", text: "Monitor sales pipelines, customer activity, revenue trends and operational indicators that influence growth." },
    { icon: Package, title: "Stock & Assets", text: "Maintain visibility over products, inventory, equipment, assets, warehouses and stock movement." },
    { icon: Users, title: "People & Teams", text: "Give employees the right information and permissions while management retains appropriate oversight." },
    { icon: Target, title: "Planning & Performance", text: "Convert business objectives into projects, tasks, responsibilities, deadlines and measurable results." },
];

const financeFeatures = [
    "Income and expense tracking", "Customer invoices", "Supplier bills", "Payment records",
    "Accounts receivable visibility", "Accounts payable visibility", "Expense categorization",
    "Budget monitoring", "Financial summaries", "Payment status tracking", "Approval workflows", "Exportable reports",
];

const salesFeatures = [
    "Lead capture", "Customer profiles", "Contact management", "Sales pipeline",
    "Quotation management", "Sales orders", "Invoice generation", "Payment tracking",
    "Customer follow-ups", "Sales performance", "Product catalogue", "Sales reporting",
];

const inventoryFeatures = [
    "Product catalogue", "SKU management", "Multiple warehouses", "Stock receiving",
    "Stock transfers", "Stock adjustments", "Low-stock alerts", "Inventory valuation",
    "Stock movement history", "Supplier association", "Product categories", "Inventory reporting",
];

const automationFeatures = [
    { title: "Approval Routing", description: "Send purchase requests, expenses, discounts or other sensitive actions to the appropriate person for approval." },
    { title: "Automatic Notifications", description: "Notify responsible users when tasks, payments, stock levels, approvals or deadlines require attention." },
    { title: "Scheduled Reports", description: "Prepare recurring management reports so decision-makers receive important information without manually compiling it." },
    { title: "Task Assignment", description: "Automatically assign responsibilities based on business rules, departments or operational events." },
];

const roles = [
    { title: "Owner / Director", description: "High-level visibility into business performance, finances, operations, staff activity and strategic indicators." },
    { title: "Administrator", description: "Configure users, permissions, business settings, workflows, departments and operational structures." },
    { title: "Manager", description: "Manage teams, approve transactions, monitor performance and oversee assigned operational areas." },
    { title: "Finance", description: "Work with invoices, expenses, payments, financial records, receivables and reporting." },
    { title: "Sales Team", description: "Manage customers, leads, quotations, orders, follow-ups and sales activities." },
    { title: "Operations", description: "Handle inventory, procurement, fulfilment, projects, tasks and day-to-day operations." },
    { title: "Staff", description: "Access only the tools and information required for assigned responsibilities." },
];

const industries = [
    "Professional services", "Technology companies", "Retail businesses", "Wholesale businesses",
    "Schools & education", "Healthcare organizations", "Construction", "Logistics",
    "Manufacturing", "Hospitality", "Non-profit organizations", "Growing SMEs",
];

const implementationSteps = [
    { number: "01", title: "Understand", text: "We study how your business currently operates, where information lives and which processes create unnecessary work." },
    { number: "02", title: "Design", text: "We structure the system around your organization, departments, workflows, permissions and reporting requirements." },
    { number: "03", title: "Configure", text: "We configure modules, users, roles, workflows, dashboards, notifications and business rules." },
    { number: "04", title: "Integrate", text: "Where necessary, the platform can connect with other systems, APIs, communication services and external tools." },
    { number: "05", title: "Test", text: "Business processes are tested before deployment to reduce errors and ensure the system reflects real operations." },
    { number: "06", title: "Deploy", text: "We deploy the solution and help transition your team from disconnected processes to a structured digital workflow." },
    { number: "07", title: "Train", text: "Users receive practical guidance so they understand how to use the system effectively." },
    { number: "08", title: "Support", text: "We remain available for improvements, troubleshooting, maintenance and future expansion." },
];

const faqs = [
    { question: "Can the system be built specifically for our business?", answer: "Yes. A business management system does not have to force your organization into a rigid template. We can design the workflows, permissions, dashboards and modules around how your business actually operates." },
    { question: "Can different employees have different access?", answer: "Yes. Role-based permissions can control which modules, records and actions different users can access. This allows management, finance, sales, operations and general staff to work with appropriate levels of access." },
    { question: "Can it support multiple branches?", answer: "Yes. Multi-branch structures can be designed so the organization can monitor individual branches while maintaining centralized management visibility." },
    { question: "Can I see business performance from one dashboard?", answer: "Yes. Executive dashboards can bring together key indicators such as sales, expenses, receivables, stock, orders, projects and operational activity." },
    { question: "Can it integrate with other software?", answer: "Yes. Depending on the system involved, integrations can connect the platform with APIs, email services, communication tools, payment systems, accounting platforms and other business applications." },
    { question: "Can we start small and expand later?", answer: "Absolutely. We can begin with the highest-priority workflows and add additional modules as your business grows." },
];

/* =========================================================
   SMALL REUSABLE COMPONENTS
========================================================= */

function SectionHeading({ eyebrow, title, description, centered = false }) {
    return (
        <div className={`max-w-3xl ${centered ? "mx-auto text-center" : ""}`}>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-400">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                {eyebrow}
            </div>

            <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
                {title}
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-300">
                {description}
            </p>
        </div>
    );
}

function CheckList({ items, onItemClick }) {
    return (
        <ul className="space-y-3">
            {items.map((item) => (
                <li key={item}>
                    <button
                        type="button"
                        onClick={() => onItemClick && onItemClick(item)}
                        className="flex w-full items-start gap-3 text-left text-sm leading-6 text-slate-600 transition hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
                    >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400">
                            <Check size={13} strokeWidth={3} />
                        </span>
                        {item}
                    </button>
                </li>
            ))}
        </ul>
    );
}

function FeatureCard({ icon: Icon, title, description, tag, onExplore }) {
    return (
        <button
            type="button"
            onClick={onExplore}
            className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/75 p-6 text-left shadow-sm backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5 dark:border-white/10 dark:bg-white/[0.045] dark:hover:border-blue-400/30"
        >
            <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-blue-500/5 blur-2xl transition group-hover:bg-blue-500/10" />

            <div className="relative">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-950/10 dark:bg-white dark:text-slate-950">
                        <Icon size={21} />
                    </div>

                    {tag && (
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:bg-white/10 dark:text-slate-400">
                            {tag}
                        </span>
                    )}
                </div>

                <h3 className="mt-6 text-lg font-extrabold text-slate-950 dark:text-white">
                    {title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                    {description}
                </p>

                <div className="mt-5 flex items-center gap-2 text-sm font-bold text-blue-600 transition group-hover:gap-3 dark:text-blue-400">
                    Explore capability
                    <ArrowRight size={15} />
                </div>
            </div>
        </button>
    );
}

function MiniMetric({ label, value, change, icon: Icon, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:border-blue-300 hover:shadow-md dark:border-white/10 dark:bg-white/[0.045] dark:hover:border-blue-400/30"
        >
            <div className="flex items-center justify-between">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    {label}
                </div>

                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400">
                    <Icon size={15} />
                </div>
            </div>

            <div className="mt-3 text-2xl font-black text-slate-950 dark:text-white">
                {value}
            </div>

            <div className="mt-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                {change}
            </div>
        </button>
    );
}

function DashboardPreview({ onMetric, onActivity, onChart }) {
    return (
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white/90 p-4 shadow-2xl shadow-slate-900/10 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80 dark:shadow-black/30">
            <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-4 dark:border-white/10">
                <div>
                    <div className="text-sm font-black text-slate-950 dark:text-white">
                        Business Overview
                    </div>
                    <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        Executive dashboard
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        Live
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                <MiniMetric label="Revenue" value="₦24.8M" change="+18.4%" icon={TrendingUp} onClick={() => onMetric("Revenue")} />
                <MiniMetric label="Orders" value="384" change="+12.7%" icon={ShoppingCart} onClick={() => onMetric("Orders")} />
                <MiniMetric label="Customers" value="1,248" change="+9.2%" icon={Users} onClick={() => onMetric("Customers")} />
                <MiniMetric label="Receivables" value="₦3.2M" change="Monitor" icon={Receipt} onClick={() => onMetric("Receivables")} />
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
                <button
                    type="button"
                    onClick={onChart}
                    className="rounded-2xl border border-slate-200 p-4 text-left transition hover:border-blue-300 dark:border-white/10 dark:hover:border-blue-400/30"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-sm font-bold text-slate-900 dark:text-white">
                                Revenue performance
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">
                                Monthly overview
                            </div>
                        </div>

                        <BarChart3 size={17} className="text-blue-600 dark:text-blue-400" />
                    </div>

                    <div className="mt-8 flex h-32 items-end gap-2">
                        {[32, 46, 39, 63, 54, 76, 68, 88, 72, 94, 83, 100].map(
                            (height, index) => (
                                <div
                                    key={index}
                                    className="flex-1 rounded-t-lg bg-blue-500/15 transition hover:bg-blue-500/30 dark:bg-blue-400/15"
                                    style={{ height: `${height}%` }}
                                >
                                    <div className="h-full w-full rounded-t-lg bg-gradient-to-t from-blue-600/50 to-blue-400/20" />
                                </div>
                            )
                        )}
                    </div>
                </button>

                <div className="rounded-2xl border border-slate-200 p-4 dark:border-white/10">
                    <div className="flex items-center justify-between">
                        <div className="text-sm font-bold text-slate-900 dark:text-white">
                            Activity
                        </div>
                        <Bell size={17} className="text-slate-400" />
                    </div>

                    <div className="mt-5 space-y-4">
                        {[
                            ["Invoice paid", "₦450,000"],
                            ["Purchase approved", "Office supplies"],
                            ["New customer", "Corporate account"],
                            ["Stock alert", "12 items low"],
                        ].map(([title, detail]) => (
                            <button
                                type="button"
                                key={title}
                                onClick={() => onActivity(title)}
                                className="flex w-full items-start gap-3 text-left transition hover:opacity-80"
                            >
                                <div className="mt-1 h-2 w-2 rounded-full bg-blue-500" />

                                <div className="min-w-0">
                                    <div className="truncate text-xs font-bold text-slate-800 dark:text-slate-200">
                                        {title}
                                    </div>

                                    <div className="mt-0.5 truncate text-[11px] text-slate-500 dark:text-slate-400">
                                        {detail}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function BusinessManagementSystem() {
    const navigate = useNavigate();
    const [openFaq, setOpenFaq] = useState(null);

    const startSupportChat = (message, metadata) => {
        queueSupportRequest({
            message:
                message ||
                "I'd like to discuss a business management system for my organization.",
            metadata: metadata || {
                Source: "Business Management System",
            },
        });

        navigate("/support/ai");
    };

    const scrollTo = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <main className="min-h-screen overflow-hidden bg-slate-50 text-slate-950 transition-colors duration-300 dark:bg-[#050811] dark:text-white">

            {/* HERO */}
            <section className="relative isolate overflow-hidden border-b border-slate-200/70 dark:border-white/10">
                <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_20%,rgba(37,99,235,0.13),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(14,165,233,0.10),transparent_28%),linear-gradient(135deg,#f8fafc,#eef4ff_50%,#f8fafc)] dark:bg-[radial-gradient(circle_at_15%_20%,rgba(37,99,235,0.18),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(14,165,233,0.13),transparent_28%),linear-gradient(135deg,#050811,#081225_50%,#050811)]" />
                <div className="absolute left-1/2 top-0 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[140px]" />

                <div className="mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
                    <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">

                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-700 shadow-sm backdrop-blur dark:border-blue-400/20 dark:bg-white/[0.05] dark:text-blue-300">
                                <Sparkles size={14} />
                                Business Management Systems
                            </div>

                            <h1 className="mt-7 max-w-4xl text-4xl font-black leading-[1.02] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl xl:text-7xl dark:text-white">
                                Run your business from{" "}
                                <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 bg-clip-text text-transparent">
                                    one intelligent system.
                                </span>
                            </h1>

                            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-300">
                                Bring customers, sales, finance, inventory,
                                procurement, employees, projects, documents,
                                reporting and everyday operations together
                                in one structured business management
                                environment.
                            </p>

                            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500 dark:text-slate-400">
                                Whether you are starting from scratch,
                                replacing spreadsheets or connecting several
                                disconnected tools, we can help you design,
                                build, deploy and support a system around the
                                way your organization actually works.
                            </p>

                            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to discuss a business management system for my organization. Here's what we need:",
                                            {
                                                Source: "Business Management System",
                                                Stage: "Hero — discuss business",
                                            }
                                        )
                                    }
                                    className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-slate-950 px-6 py-4 text-sm font-bold text-white shadow-xl shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-blue-600 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-400"
                                >
                                    Discuss Your Business
                                    <ArrowRight size={17} className="transition group-hover:translate-x-1" />
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to explore the modules of your business management system.",
                                            {
                                                Source: "Business Management System",
                                                Stage: "Hero — explore modules",
                                            }
                                        )
                                    }
                                    className="inline-flex items-center justify-center gap-3 rounded-2xl border border-slate-300 bg-white/70 px-6 py-4 text-sm font-bold text-slate-800 backdrop-blur transition hover:border-blue-500/40 hover:bg-white dark:border-white/15 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08]"
                                >
                                    Explore Modules
                                    <ChevronRight size={17} />
                                </button>
                            </div>

                            <div className="mt-9 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
                                {[
                                    ["CRM", "Customers"],
                                    ["ERP", "Operations"],
                                    ["BI", "Analytics"],
                                    ["AI", "Automation"],
                                ].map(([title, text]) => (
                                    <button
                                        type="button"
                                        key={title}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to explore the "${title}" capability — ${text}.`,
                                                {
                                                    Source: "Business Management System",
                                                    Capability: title,
                                                }
                                            )
                                        }
                                        className="border-l border-slate-300 pl-3 text-left transition hover:border-blue-500 dark:border-white/15 dark:hover:border-blue-400"
                                    >
                                        <div className="text-sm font-black text-slate-950 dark:text-white">
                                            {title}
                                        </div>

                                        <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                            {text}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-8 rounded-[3rem] bg-blue-500/10 blur-3xl" />
                            <div className="relative">
                                <DashboardPreview
                                    onMetric={(label) =>
                                        startSupportChat(
                                            `I'd like to discuss the "${label}" metric on the executive dashboard.`,
                                            {
                                                Source: "Business Management System",
                                                "Dashboard metric": label,
                                            }
                                        )
                                    }
                                    onActivity={(title) =>
                                        startSupportChat(
                                            `I'd like to discuss the dashboard activity: "${title}".`,
                                            {
                                                Source: "Business Management System",
                                                "Activity": title,
                                            }
                                        )
                                    }
                                    onChart={() =>
                                        startSupportChat(
                                            "I'd like to discuss the revenue performance chart on the executive dashboard.",
                                            {
                                                Source: "Business Management System",
                                                "Dashboard element": "Revenue chart",
                                            }
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TRUST / POSITIONING */}
            <section className="relative border-b border-slate-200/70 bg-white/70 dark:border-white/10 dark:bg-white/[0.02]">
                <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
                    <div className="grid gap-8 md:grid-cols-3">
                        {[
                            [Layers3, "One connected environment", "Reduce scattered information and disconnected workflows.", "blue"],
                            [ShieldCheck, "Controlled access", "Give every team member the access they need.", "emerald"],
                            [Sparkles, "Ready to grow", "Start with what matters and expand as you grow.", "violet"],
                        ].map(([Icon, title, text, accent]) => (
                            <button
                                type="button"
                                key={title}
                                onClick={() =>
                                    startSupportChat(
                                        `I'd like to know more about "${title}": ${text}`,
                                        {
                                            Source: "Business Management System",
                                            Highlight: title,
                                        }
                                    )
                                }
                                className="flex gap-4 rounded-2xl p-2 text-left transition hover:bg-blue-50/40 dark:hover:bg-white/[0.04]"
                            >
                                <div
                                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${accent === "emerald"
                                            ? "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400"
                                            : accent === "violet"
                                                ? "bg-violet-500/10 text-violet-600 dark:bg-violet-400/10 dark:text-violet-400"
                                                : "bg-blue-500/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400"
                                        }`}
                                >
                                    <Icon size={20} />
                                </div>

                                <div>
                                    <h3 className="font-extrabold text-slate-950 dark:text-white">
                                        {title}
                                    </h3>

                                    <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                        {text}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* BUSINESS PROBLEM */}
            <section className="relative py-20 lg:py-28">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_50%,rgba(59,130,246,0.08),transparent_30%)] dark:bg-[radial-gradient(circle_at_80%_50%,rgba(59,130,246,0.08),transparent_30%)]" />

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-14 lg:grid-cols-2 lg:items-center">

                        <SectionHeading
                            eyebrow="The problem"
                            title="Your business should not depend on scattered information."
                            description="Many businesses operate through a combination of spreadsheets, notebooks, messaging apps, email, disconnected software and manually prepared reports. That can make important information difficult to find and decisions difficult to make."
                        />

                        <div className="grid gap-4 sm:grid-cols-2">
                            {[
                                [FileText, "Too many spreadsheets", "Different departments maintain separate records that may not agree."],
                                [MessageSquare, "Information everywhere", "Important conversations and decisions can become buried inside messages."],
                                [Clock3, "Manual processes", "Teams repeatedly enter, copy and reconcile the same information."],
                                [BarChart3, "Limited visibility", "Management may struggle to see what is happening across the organization."],
                            ].map(([Icon, title, text]) => (
                                <button
                                    type="button"
                                    key={title}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss this business problem: ${title} — ${text}`,
                                            {
                                                Source: "Business Management System",
                                                "Business problem": title,
                                            }
                                        )
                                    }
                                    className="rounded-3xl border border-slate-200 bg-white/80 p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-blue-400/30"
                                >
                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                                        <Icon size={19} />
                                    </div>

                                    <h3 className="mt-5 font-extrabold text-slate-950 dark:text-white">
                                        {title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                        {text}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FROM SCRATCH */}
            <section className="relative overflow-hidden border-y border-slate-200/70 py-20 dark:border-white/10 lg:py-28">
                <div className="absolute inset-0 -z-10 bg-slate-100 dark:bg-[#08101f]" />
                <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-blue-500/10 blur-[100px]" />

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr]">

                        <div>
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-600/20">
                                <Zap size={24} />
                            </div>

                            <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
                                Starting from scratch?
                                <span className="block text-blue-600 dark:text-blue-400">
                                    We can help there too.
                                </span>
                            </h2>

                            <p className="mt-6 text-base leading-8 text-slate-600 dark:text-slate-300">
                                You do not need to already have a sophisticated
                                digital infrastructure. We can start by
                                understanding your business, mapping the
                                processes and identifying what should be
                                digitized first.
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like to understand how you approach implementation for a business starting from scratch.",
                                        {
                                            Source: "Business Management System",
                                            Stage: "Implementation approach",
                                        }
                                    )
                                }
                                className="mt-7 inline-flex items-center gap-2 font-bold text-blue-600 dark:text-blue-400"
                            >
                                See how we approach implementation
                                <ArrowRight size={16} />
                            </button>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {[
                                "Business process discovery", "Digital workflow planning", "System architecture",
                                "Database design", "User and role design", "Dashboard planning",
                                "Custom module development", "Data migration", "Integration planning",
                                "Deployment", "Staff training", "Ongoing support",
                            ].map((item, index) => (
                                <button
                                    type="button"
                                    key={item}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss from-scratch setup: ${item}.`,
                                            {
                                                Source: "Business Management System",
                                                "From-scratch item": item,
                                            }
                                        )
                                    }
                                    className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/70 p-4 text-left transition hover:border-blue-300 dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-blue-400/30"
                                >
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-xs font-black text-blue-600 dark:bg-blue-400/10 dark:text-blue-400">
                                        {String(index + 1).padStart(2, "0")}
                                    </div>

                                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                        {item}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* MODULES */}
            <section id="modules" className="scroll-mt-20 py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <SectionHeading
                        centered
                        eyebrow="Business platform"
                        title="Everything your organization needs can live together."
                        description="Build a connected management environment around the functions that matter most to your organization."
                    />

                    <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {modules.map((module) => (
                            <FeatureCard
                                key={module.title}
                                {...module}
                                onExplore={() =>
                                    startSupportChat(
                                        `I'd like to explore the "${module.title}" module (${module.tag}): ${module.description}`,
                                        {
                                            Source: "Business Management System",
                                            Module: module.title,
                                            Category: module.tag,
                                        }
                                    )
                                }
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* SALES */}
            <section className="relative overflow-hidden border-y border-slate-200/70 py-20 dark:border-white/10 lg:py-28">
                <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,#eff6ff,#f8fafc_50%,#ecfeff)] dark:bg-[linear-gradient(135deg,#071225,#050811_50%,#07131a)]" />

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-14 lg:grid-cols-2 lg:items-center">

                        <div>
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white">
                                <TrendingUp size={24} />
                            </div>

                            <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                                Turn enquiries into organized sales.
                            </h2>

                            <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                                Give your sales team a structured path from
                                first contact to completed transaction.
                                Customer information, quotations, orders,
                                invoices and payment activity can remain
                                connected throughout the process.
                            </p>

                            <div className="mt-8">
                                <CheckList
                                    items={salesFeatures}
                                    onItemClick={(item) =>
                                        startSupportChat(
                                            `I'd like to discuss sales management capability: ${item}.`,
                                            {
                                                Source: "Business Management System",
                                                "Sales feature": item,
                                            }
                                        )
                                    }
                                />
                            </div>
                        </div>

                        <div className="rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-xl dark:border-white/10 dark:bg-white/[0.045]">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-black text-slate-950 dark:text-white">
                                        Sales pipeline
                                    </div>
                                    <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                        Current opportunities
                                    </div>
                                </div>

                                <span className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 dark:border-white/10 dark:text-slate-300">
                                    This month
                                </span>
                            </div>

                            <div className="mt-7 space-y-3">
                                {[
                                    ["New enquiries", "48"],
                                    ["Qualified", "31"],
                                    ["Quotation sent", "24"],
                                    ["Negotiation", "12"],
                                    ["Won", "8"],
                                ].map(([title, count]) => (
                                    <button
                                        type="button"
                                        key={title}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to discuss the sales pipeline stage: ${title} (${count}).`,
                                                {
                                                    Source: "Business Management System",
                                                    "Sales stage": title,
                                                }
                                            )
                                        }
                                        className="w-full rounded-2xl border border-slate-200 p-4 text-left transition hover:border-blue-300 dark:border-white/10 dark:hover:border-blue-400/30"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                                                {title}
                                            </span>
                                            <span className="text-lg font-black text-slate-950 dark:text-white">
                                                {count}
                                            </span>
                                        </div>

                                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                                            <div
                                                className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400"
                                                style={{ width: `${Math.min(Number(count) * 2, 100)}%` }}
                                            />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FINANCE */}
            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">

                        <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl dark:border-white/10 dark:bg-white/[0.04]">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to discuss total income tracking in the finance module.",
                                            { Source: "Business Management System", "Finance metric": "Total income" }
                                        )
                                    }
                                    className="rounded-2xl bg-slate-950 p-5 text-left text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-semibold opacity-70">Total income</span>
                                        <TrendingUp size={16} />
                                    </div>
                                    <div className="mt-5 text-3xl font-black">₦18.4M</div>
                                    <div className="mt-2 text-xs opacity-60">This period</div>
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to discuss expense tracking in the finance module.",
                                            { Source: "Business Management System", "Finance metric": "Expenses" }
                                        )
                                    }
                                    className="rounded-2xl bg-blue-600 p-5 text-left text-white transition hover:bg-blue-700"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-semibold opacity-80">Expenses</span>
                                        <Calculator size={16} />
                                    </div>
                                    <div className="mt-5 text-3xl font-black">₦6.2M</div>
                                    <div className="mt-2 text-xs opacity-80">This period</div>
                                </button>
                            </div>

                            <div className="mt-4 rounded-2xl border border-slate-200 p-5 dark:border-white/10">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                                        Outstanding invoices
                                    </span>
                                    <span className="text-sm font-black text-orange-500">₦3.2M</span>
                                </div>

                                <div className="mt-5 space-y-3">
                                    {[
                                        ["ACME Ltd", "₦1,200,000", "Due"],
                                        ["Northstar", "₦850,000", "Pending"],
                                        ["Greenfield", "₦640,000", "Due"],
                                        ["Other", "₦510,000", "Pending"],
                                    ].map(([name, amount, status]) => (
                                        <button
                                            type="button"
                                            key={name}
                                            onClick={() =>
                                                startSupportChat(
                                                    `I'd like to discuss outstanding invoice for ${name}: ${amount} (${status}).`,
                                                    {
                                                        Source: "Business Management System",
                                                        Invoice: name,
                                                        Amount: amount,
                                                        Status: status,
                                                    }
                                                )
                                            }
                                            className="flex w-full items-center justify-between border-b border-slate-100 pb-3 text-left last:border-0 last:pb-0 dark:border-white/5"
                                        >
                                            <div>
                                                <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                                                    {name}
                                                </div>
                                                <div className="mt-1 text-[11px] text-slate-400">
                                                    {status}
                                                </div>
                                            </div>

                                            <div className="text-xs font-black text-slate-700 dark:text-slate-300">
                                                {amount}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-white">
                                <Calculator size={24} />
                            </div>

                            <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                                Understand the money moving through your business.
                            </h2>

                            <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                                Financial management should not be limited to
                                a spreadsheet at the end of the month. Keep
                                operational financial information organized
                                throughout the transaction lifecycle.
                            </p>

                            <div className="mt-8">
                                <CheckList
                                    items={financeFeatures}
                                    onItemClick={(item) =>
                                        startSupportChat(
                                            `I'd like to discuss finance capability: ${item}.`,
                                            {
                                                Source: "Business Management System",
                                                "Finance feature": item,
                                            }
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* INVENTORY */}
            <section className="relative overflow-hidden border-y border-slate-200/70 py-20 dark:border-white/10 lg:py-28">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_50%,rgba(16,185,129,0.08),transparent_30%),linear-gradient(135deg,#f8fafc,#f0fdf4)] dark:bg-[radial-gradient(circle_at_20%_50%,rgba(16,185,129,0.08),transparent_30%),linear-gradient(135deg,#050811,#07130f)]" />

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-14 lg:grid-cols-2 lg:items-center">

                        <div>
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-white">
                                <Package size={24} />
                            </div>

                            <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                                Know what you have, where it is and where it is going.
                            </h2>

                            <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                                For businesses dealing with physical products,
                                inventory visibility can directly affect
                                customer service, procurement and profitability.
                            </p>

                            <div className="mt-8">
                                <CheckList
                                    items={inventoryFeatures}
                                    onItemClick={(item) =>
                                        startSupportChat(
                                            `I'd like to discuss inventory capability: ${item}.`,
                                            {
                                                Source: "Business Management System",
                                                "Inventory feature": item,
                                            }
                                        )
                                    }
                                />
                            </div>
                        </div>

                        <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl dark:border-white/10 dark:bg-white/[0.04]">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-black text-slate-950 dark:text-white">
                                        Inventory overview
                                    </div>
                                    <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                        All locations
                                    </div>
                                </div>

                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400">
                                    <Package size={16} />
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-3 gap-3">
                                {[
                                    ["Products", "2,480", ""],
                                    ["In stock", "1,932", ""],
                                    ["Alerts", "18", "text-orange-500"],
                                ].map(([label, value, cls]) => (
                                    <button
                                        type="button"
                                        key={label}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to discuss inventory metric: ${label} (${value}).`,
                                                {
                                                    Source: "Business Management System",
                                                    "Inventory metric": label,
                                                }
                                            )
                                        }
                                        className="rounded-2xl bg-slate-50 p-4 text-left transition hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10"
                                    >
                                        <div className="text-xs text-slate-500 dark:text-slate-400">
                                            {label}
                                        </div>
                                        <div className={`mt-2 text-xl font-black dark:text-white ${cls}`}>
                                            {value}
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <div className="mt-5 space-y-3">
                                {[
                                    ["Laptop Computers", "84", "Healthy"],
                                    ["Network Equipment", "42", "Healthy"],
                                    ["Office Accessories", "18", "Low"],
                                    ["Printer Supplies", "9", "Low"],
                                ].map(([product, quantity, state]) => (
                                    <button
                                        type="button"
                                        key={product}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to discuss inventory item: ${product} (${quantity} units, ${state}).`,
                                                {
                                                    Source: "Business Management System",
                                                    Product: product,
                                                    Quantity: quantity,
                                                    State: state,
                                                }
                                            )
                                        }
                                        className="flex w-full items-center justify-between rounded-2xl border border-slate-200 p-4 text-left transition hover:border-emerald-300 dark:border-white/10 dark:hover:border-emerald-400/30"
                                    >
                                        <div>
                                            <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                                                {product}
                                            </div>
                                            <div className="mt-1 text-[11px] text-slate-400">
                                                {quantity} units
                                            </div>
                                        </div>

                                        <span
                                            className={`rounded-full px-3 py-1 text-[10px] font-bold ${state === "Low"
                                                    ? "bg-orange-500/10 text-orange-600 dark:text-orange-400"
                                                    : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                                }`}
                                        >
                                            {state}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* BUSINESS AREAS */}
            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <SectionHeading
                        eyebrow="Connected operations"
                        title="One system. Multiple areas of the business."
                        description="The value of a management platform is not just the individual modules. It is the way information can move between them."
                    />

                    <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {businessAreas.map((area) => (
                            <button
                                type="button"
                                key={area.title}
                                onClick={() =>
                                    startSupportChat(
                                        `I'd like to discuss ${area.title}: ${area.text}`,
                                        {
                                            Source: "Business Management System",
                                            "Business area": area.title,
                                        }
                                    )
                                }
                                className="group rounded-3xl border border-slate-200 bg-white p-6 text-left transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-blue-400/30"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-800 group-hover:bg-blue-600 group-hover:text-white dark:bg-white/10 dark:text-white dark:group-hover:bg-blue-500">
                                    <area.icon size={20} />
                                </div>

                                <h3 className="mt-6 text-lg font-extrabold text-slate-950 dark:text-white">
                                    {area.title}
                                </h3>

                                <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                    {area.text}
                                </p>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* AI */}
            <section className="relative overflow-hidden border-y border-slate-200/70 py-20 dark:border-white/10 lg:py-28">
                <div className="absolute inset-0 -z-20 bg-[#071225]" />
                <div className="absolute -right-40 top-0 -z-10 h-96 w-96 rounded-full bg-blue-500/20 blur-[130px]" />
                <div className="absolute -left-40 bottom-0 -z-10 h-96 w-96 rounded-full bg-cyan-500/10 blur-[130px]" />

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">

                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
                                <Sparkles size={14} />
                                Intelligent layer
                            </div>

                            <h2 className="mt-6 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                                Add AI where it actually helps the business.
                            </h2>

                            <p className="mt-5 text-base leading-8 text-slate-300">
                                AI should not simply be added because it is
                                fashionable. It should help people find
                                information, summarize activity, identify
                                patterns, automate repetitive work and make
                                business processes easier.
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like to discuss AI opportunities inside our business management system.",
                                        {
                                            Source: "Business Management System",
                                            Stage: "AI opportunities",
                                        }
                                    )
                                }
                                className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-white px-6 py-4 text-sm font-black text-slate-950 transition hover:bg-blue-100"
                            >
                                Discuss AI opportunities
                                <ArrowUpRight size={17} />
                            </button>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {[
                                [Search, "Ask your business data", "Create natural-language interfaces for finding relevant business information."],
                                [FileBarChart, "Summarize reports", "Turn large operational datasets into concise management insights."],
                                [Workflow, "Automate repetitive tasks", "Use intelligent workflows to reduce unnecessary manual work."],
                                [Target, "Identify opportunities", "Surface patterns and signals that deserve management attention."],
                            ].map(([Icon, title, text]) => (
                                <button
                                    type="button"
                                    key={title}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss AI capability: ${title} — ${text}`,
                                            {
                                                Source: "Business Management System",
                                                "AI capability": title,
                                            }
                                        )
                                    }
                                    className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 text-left backdrop-blur transition hover:border-blue-400/40 hover:bg-white/[0.08]"
                                >
                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-400/10 text-blue-300">
                                        <Icon size={19} />
                                    </div>

                                    <h3 className="mt-5 font-extrabold text-white">
                                        {title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-slate-400">
                                        {text}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* AUTOMATION */}
            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <SectionHeading
                        centered
                        eyebrow="Automation"
                        title="Let the system handle predictable work."
                        description="Automated workflows can reduce repetitive administration while keeping important decisions under appropriate human control."
                    />

                    <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                        {automationFeatures.map((item, index) => (
                            <button
                                type="button"
                                key={item.title}
                                onClick={() =>
                                    startSupportChat(
                                        `I'd like to discuss automation: ${item.title} — ${item.description}`,
                                        {
                                            Source: "Business Management System",
                                            Automation: item.title,
                                        }
                                    )
                                }
                                className="rounded-3xl border border-slate-200 bg-white p-6 text-left transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-blue-400/30"
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-sm font-black text-blue-600 dark:bg-blue-400/10 dark:text-blue-400">
                                    0{index + 1}
                                </div>

                                <h3 className="mt-6 font-extrabold text-slate-950 dark:text-white">
                                    {item.title}
                                </h3>

                                <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                    {item.description}
                                </p>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* USERS / PERMISSIONS */}
            <section className="relative overflow-hidden border-y border-slate-200/70 py-20 dark:border-white/10 lg:py-28">
                <div className="absolute inset-0 -z-10 bg-slate-100 dark:bg-[#080e1b]" />

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-14 lg:grid-cols-2 lg:items-start">

                        <div>
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600 text-white">
                                <LockKeyhole size={24} />
                            </div>

                            <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                                Everyone gets the access they need — and nothing more.
                            </h2>

                            <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                                A professional management system should not
                                treat every employee as an administrator.
                                Access can be structured according to
                                responsibility, department and business role.
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like to discuss auditability — how important activities are associated with users and timestamps.",
                                        {
                                            Source: "Business Management System",
                                            Topic: "Auditability",
                                        }
                                    )
                                }
                                className="mt-8 w-full rounded-3xl border border-violet-500/20 bg-violet-500/5 p-6 text-left transition hover:border-violet-400/40 dark:bg-violet-400/5"
                            >
                                <div className="flex gap-4">
                                    <ShieldCheck className="mt-1 shrink-0 text-violet-600 dark:text-violet-400" />
                                    <div>
                                        <h3 className="font-extrabold text-slate-950 dark:text-white">
                                            Auditability matters
                                        </h3>
                                        <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                            Important activities can be
                                            associated with users and
                                            timestamps, helping organizations
                                            understand what happened and when.
                                        </p>
                                    </div>
                                </div>
                            </button>
                        </div>

                        <div className="grid gap-4">
                            {roles.map((role) => (
                                <button
                                    type="button"
                                    key={role.title}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss the "${role.title}" role: ${role.description}`,
                                            {
                                                Source: "Business Management System",
                                                Role: role.title,
                                            }
                                        )
                                    }
                                    className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:border-violet-300 dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-violet-400/30"
                                >
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-200">
                                        <UserRound size={18} />
                                    </div>

                                    <div>
                                        <h3 className="font-extrabold text-slate-950 dark:text-white">
                                            {role.title}
                                        </h3>
                                        <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                            {role.description}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* REPORTING */}
            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">

                        <div>
                            <SectionHeading
                                eyebrow="Business intelligence"
                                title="Replace guesswork with useful information."
                                description="Management dashboards and reports can turn day-to-day activity into a clearer picture of what is happening inside the business."
                            />

                            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                                {[
                                    "Sales reports", "Expense reports", "Customer reports",
                                    "Inventory reports", "Employee reports", "Project reports",
                                ].map((item) => (
                                    <button
                                        type="button"
                                        key={item}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to discuss the "${item}" capability.`,
                                                {
                                                    Source: "Business Management System",
                                                    "Report type": item,
                                                }
                                            )
                                        }
                                        className="rounded-2xl border border-slate-200 bg-white p-4 text-left text-xs font-bold text-slate-700 transition hover:border-blue-300 dark:border-white/10 dark:bg-white/[0.035] dark:text-slate-300 dark:hover:border-blue-400/30"
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-white/[0.04]">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-black text-slate-950 dark:text-white">
                                        Performance summary
                                    </div>
                                    <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                        Management indicators
                                    </div>
                                </div>

                                <FileBarChart className="text-blue-600 dark:text-blue-400" size={20} />
                            </div>

                            <div className="mt-7 space-y-5">
                                {[
                                    ["Revenue growth", 78],
                                    ["Customer retention", 86],
                                    ["Order fulfilment", 92],
                                    ["Project completion", 69],
                                    ["Collection rate", 74],
                                ].map(([label, value]) => (
                                    <button
                                        type="button"
                                        key={label}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to discuss the management indicator: ${label} (${value}%).`,
                                                {
                                                    Source: "Business Management System",
                                                    "Indicator": label,
                                                }
                                            )
                                        }
                                        className="block w-full text-left transition hover:opacity-90"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                                                {label}
                                            </span>
                                            <span className="text-xs font-black text-slate-950 dark:text-white">
                                                {value}%
                                            </span>
                                        </div>
                                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                                            <div
                                                className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400"
                                                style={{ width: `${value}%` }}
                                            />
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like to discuss the management insight about revenue trending upward and collection activity being a management priority.",
                                        {
                                            Source: "Business Management System",
                                            Topic: "Management insight",
                                        }
                                    )
                                }
                                className="mt-7 w-full rounded-2xl bg-slate-950 p-5 text-left text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                            >
                                <div className="flex items-center gap-3">
                                    <Sparkles size={17} />
                                    <span className="text-sm font-bold">Management insight</span>
                                </div>
                                <p className="mt-3 text-xs leading-6 opacity-75">
                                    Revenue is trending upward while
                                    collection activity should remain a
                                    management priority.
                                </p>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* DOCUMENTS */}
            <section className="border-y border-slate-200/70 py-20 dark:border-white/10 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-14 lg:grid-cols-2 lg:items-center">

                        <div className="order-2 lg:order-1">
                            <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl dark:border-white/10 dark:bg-white/[0.04]">
                                <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-white/10">
                                    <div className="flex items-center gap-3">
                                        <FolderKanban size={18} className="text-blue-600 dark:text-blue-400" />
                                        <span className="text-sm font-black dark:text-white">Business documents</span>
                                    </div>
                                    <Search size={16} className="text-slate-400" />
                                </div>

                                <div className="mt-4 space-y-2">
                                    {[
                                        ["Quotation #QT-2048", "Sales"],
                                        ["Invoice #INV-1042", "Finance"],
                                        ["Supplier Contract", "Procurement"],
                                        ["Employee Handbook", "HR"],
                                        ["Project Proposal", "Projects"],
                                    ].map(([name, type]) => (
                                        <button
                                            type="button"
                                            key={name}
                                            onClick={() =>
                                                startSupportChat(
                                                    `I'd like to discuss document management for: ${name} (${type}).`,
                                                    {
                                                        Source: "Business Management System",
                                                        Document: name,
                                                        Category: type,
                                                    }
                                                )
                                            }
                                            className="flex w-full items-center justify-between rounded-2xl p-3 text-left transition hover:bg-slate-50 dark:hover:bg-white/5"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400">
                                                    <FileText size={16} />
                                                </div>
                                                <div>
                                                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                                                        {name}
                                                    </div>
                                                    <div className="mt-0.5 text-[10px] text-slate-400">
                                                        {type}
                                                    </div>
                                                </div>
                                            </div>
                                            <ChevronRight size={15} className="text-slate-400" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white">
                                <FileCheck2 size={24} />
                            </div>

                            <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                                Keep the documents behind the business organized too.
                            </h2>

                            <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                                Quotations, invoices, contracts, reports,
                                supplier documents, employee records and
                                project files should not disappear into random
                                folders and conversations.
                            </p>

                            <div className="mt-7 space-y-4">
                                {[
                                    "Centralized document organization", "Controlled access",
                                    "Document categories", "Business record association", "Searchable information",
                                ].map((item) => (
                                    <button
                                        type="button"
                                        key={item}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to discuss document management: ${item}.`,
                                                {
                                                    Source: "Business Management System",
                                                    "Document feature": item,
                                                }
                                            )
                                        }
                                        className="flex w-full items-center gap-3 text-left transition hover:opacity-90"
                                    >
                                        <Check size={17} className="text-emerald-500" />
                                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                            {item}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* INTEGRATIONS */}
            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <SectionHeading
                        centered
                        eyebrow="Connected ecosystem"
                        title="Your management system does not have to work alone."
                        description="Where appropriate, your business platform can connect with external services and existing tools through integrations and APIs."
                    />

                    <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            [Mail, "Email services"],
                            [CreditCard, "Payment services"],
                            [Cloud, "Cloud platforms"],
                            [MessageSquare, "Communication"],
                            [Database, "Databases"],
                            [Globe2, "Web applications"],
                            [RefreshCw, "External APIs"],
                            [Settings2, "Business software"],
                        ].map(([Icon, title]) => (
                            <button
                                type="button"
                                key={title}
                                onClick={() =>
                                    startSupportChat(
                                        `I'd like to discuss integrating our business platform with: ${title}.`,
                                        {
                                            Source: "Business Management System",
                                            "Integration target": title,
                                        }
                                    )
                                }
                                className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:border-blue-300 dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-blue-400/30"
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-200">
                                    <Icon size={18} />
                                </div>
                                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                                    {title}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* MULTI BRANCH */}
            <section className="relative overflow-hidden border-y border-slate-200/70 py-20 dark:border-white/10 lg:py-28">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_90%_20%,rgba(99,102,241,0.12),transparent_30%),linear-gradient(135deg,#f8fafc,#eef2ff)] dark:bg-[radial-gradient(circle_at_90%_20%,rgba(99,102,241,0.12),transparent_30%),linear-gradient(135deg,#050811,#0b0e20)]" />

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-14 lg:grid-cols-2 lg:items-center">

                        <div>
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white">
                                <Building2 size={24} />
                            </div>

                            <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                                Built for one location today. Ready for more tomorrow.
                            </h2>

                            <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                                If your organization operates across branches,
                                departments, warehouses or business units,
                                the platform can be structured to provide
                                local operational control and centralized
                                visibility.
                            </p>

                            <div className="mt-8 grid gap-3 sm:grid-cols-2">
                                {[
                                    "Branch-level operations", "Central management", "Department visibility",
                                    "Location-based inventory", "Branch reporting", "Centralized user management",
                                ].map((item) => (
                                    <button
                                        type="button"
                                        key={item}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to discuss multi-branch capability: ${item}.`,
                                                {
                                                    Source: "Business Management System",
                                                    "Multi-branch": item,
                                                }
                                            )
                                        }
                                        className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/70 p-4 text-left transition hover:border-indigo-300 dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-indigo-400/30"
                                    >
                                        <Check size={15} className="text-indigo-600 dark:text-indigo-400" />
                                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                                            {item}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-xl dark:border-white/10 dark:bg-white/[0.04]">
                                <div className="text-sm font-black text-slate-950 dark:text-white">
                                    Organization structure
                                </div>

                                <div className="mt-7 space-y-3">
                                    {[
                                        ["Head Office", "Central"],
                                        ["Lagos Branch", "Operations"],
                                        ["Abuja Branch", "Operations"],
                                        ["Port Harcourt", "Operations"],
                                    ].map(([branch, type], index) => (
                                        <button
                                            type="button"
                                            key={branch}
                                            onClick={() =>
                                                startSupportChat(
                                                    `I'd like to discuss the "${branch}" branch structure (${type}).`,
                                                    {
                                                        Source: "Business Management System",
                                                        Branch: branch,
                                                        Type: type,
                                                    }
                                                )
                                            }
                                            className="flex w-full items-center gap-4 rounded-2xl border border-slate-200 p-4 text-left transition hover:border-indigo-300 dark:border-white/10 dark:hover:border-indigo-400/30"
                                        >
                                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-400">
                                                <Building2 size={16} />
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                                                    {branch}
                                                </div>
                                                <div className="mt-1 text-[10px] text-slate-400">
                                                    {type}
                                                </div>
                                            </div>
                                            <span className="text-[10px] font-bold text-slate-400">
                                                {index === 0 ? "HQ" : "Branch"}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* IMPLEMENTATION */}
            <section id="implementation" className="scroll-mt-20 py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <SectionHeading
                        centered
                        eyebrow="How we work"
                        title="From business idea to working system."
                        description="We do not believe in simply installing software and leaving you to figure it out. We help structure the solution around your organization."
                    />

                    <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {implementationSteps.map((step) => (
                            <button
                                type="button"
                                key={step.number}
                                onClick={() =>
                                    startSupportChat(
                                        `I'd like to understand the implementation step: ${step.title} — ${step.text}`,
                                        {
                                            Source: "Business Management System",
                                            Step: `${step.number} — ${step.title}`,
                                        }
                                    )
                                }
                                className="relative rounded-3xl border border-slate-200 bg-white p-6 text-left transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-blue-400/30"
                            >
                                <span className="text-xs font-black tracking-[0.2em] text-blue-600 dark:text-blue-400">
                                    {step.number}
                                </span>
                                <h3 className="mt-5 text-lg font-extrabold text-slate-950 dark:text-white">
                                    {step.title}
                                </h3>
                                <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                    {step.text}
                                </p>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* INDUSTRIES */}
            <section className="border-y border-slate-200/70 bg-slate-100/70 py-20 dark:border-white/10 dark:bg-white/[0.02] lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <SectionHeading
                        eyebrow="Industries"
                        title="Adapt the platform to your business."
                        description="A management system should reflect the organization using it. Different industries can require different workflows, records, permissions and reporting."
                    />

                    <div className="mt-10 flex flex-wrap gap-3">
                        {industries.map((industry) => (
                            <button
                                type="button"
                                key={industry}
                                onClick={() =>
                                    startSupportChat(
                                        `I'd like to discuss a business management system for ${industry}.`,
                                        {
                                            Source: "Business Management System",
                                            Industry: industry,
                                        }
                                    )
                                }
                                className="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 dark:hover:border-blue-400/30 dark:hover:text-blue-300"
                            >
                                {industry}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* CUSTOM DEVELOPMENT */}
            <section className="relative py-20 lg:py-28">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.10),transparent_35%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.12),transparent_35%)]" />

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="rounded-[2.5rem] border border-slate-200 bg-white p-7 shadow-xl dark:border-white/10 dark:bg-white/[0.035] sm:p-10 lg:p-14">
                        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">

                            <div>
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                                    <Settings2 size={24} />
                                </div>

                                <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                                    Standard software is not always enough.
                                </h2>

                                <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                                    Some businesses have unique processes,
                                    approval structures, calculations,
                                    reports or integrations that generic
                                    software cannot handle properly.
                                </p>

                                <p className="mt-4 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                    That is where custom business application
                                    development becomes useful. We can design
                                    software around your actual process rather
                                    than asking your business to change
                                    everything to fit an application.
                                </p>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2">
                                {[
                                    "Custom dashboards", "Custom workflows", "Custom calculations",
                                    "Custom reports", "Custom approval systems", "Custom portals",
                                    "Custom APIs", "Custom integrations", "Mobile applications", "Web applications",
                                ].map((item) => (
                                    <button
                                        type="button"
                                        key={item}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to discuss custom development: ${item}.`,
                                                {
                                                    Source: "Business Management System",
                                                    "Custom development": item,
                                                }
                                            )
                                        }
                                        className="flex items-center gap-3 rounded-2xl border border-slate-200 p-4 text-left transition hover:border-blue-300 dark:border-white/10 dark:hover:border-blue-400/30"
                                    >
                                        <div className="h-2 w-2 rounded-full bg-blue-500" />
                                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                            {item}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECURITY */}
            <section className="relative overflow-hidden border-y border-slate-200/70 py-20 dark:border-white/10 lg:py-28">
                <div className="absolute inset-0 -z-10 bg-[#06101b]" />

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-14 lg:grid-cols-2 lg:items-center">

                        <div>
                            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-white">
                                <ShieldCheck size={24} />
                            </div>

                            <h2 className="mt-6 text-3xl font-black tracking-tight text-white sm:text-4xl">
                                Business information deserves deliberate protection.
                            </h2>

                            <p className="mt-5 text-base leading-8 text-slate-300">
                                Security is not a single feature. It involves
                                authentication, authorization, access
                                controls, data handling, backups, monitoring
                                and sensible operational practices.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {[
                                ["Access control", "Control what different users can access."],
                                ["Role permissions", "Separate responsibilities across teams."],
                                ["Audit activity", "Maintain useful activity history."],
                                ["Secure deployment", "Apply appropriate infrastructure practices."],
                                ["Backups", "Plan for recovery and business continuity."],
                                ["Monitoring", "Keep visibility into system health."],
                            ].map(([title, text]) => (
                                <button
                                    type="button"
                                    key={title}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss security: ${title} — ${text}`,
                                            {
                                                Source: "Business Management System",
                                                Security: title,
                                            }
                                        )
                                    }
                                    className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 text-left transition hover:border-emerald-400/40 hover:bg-white/[0.08]"
                                >
                                    <ShieldCheck size={19} className="text-emerald-400" />
                                    <h3 className="mt-5 font-extrabold text-white">
                                        {title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-6 text-slate-400">
                                        {text}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* SUPPORT */}
            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">

                        <div>
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white">
                                <Headphones size={24} />
                            </div>

                            <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                                The relationship does not have to end at deployment.
                            </h2>

                            <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                                Businesses evolve. New employees join, new
                                branches open, new processes appear and new
                                requirements emerge. Your system should be able
                                to evolve with you.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {[
                                [Headphones, "Technical support"],
                                [RefreshCw, "System maintenance"],
                                [Settings2, "Feature improvements"],
                                [ShieldCheck, "Security updates"],
                                [Database, "Data assistance"],
                                [Users, "User support"],
                            ].map(([Icon, title]) => (
                                <button
                                    type="button"
                                    key={title}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss ongoing support: ${title}.`,
                                            {
                                                Source: "Business Management System",
                                                Support: title,
                                            }
                                        )
                                    }
                                    className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:border-blue-300 dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-blue-400/30"
                                >
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400">
                                        <Icon size={18} />
                                    </div>
                                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                                        {title}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="border-y border-slate-200/70 bg-slate-100/70 py-20 dark:border-white/10 dark:bg-white/[0.02] lg:py-28">
                <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">

                    <SectionHeading
                        centered
                        eyebrow="FAQ"
                        title="Questions businesses often ask."
                        description="A few common questions about business management systems and how we can help."
                    />

                    <div className="mt-12 space-y-3">
                        {faqs.map((faq, index) => {
                            const isOpen = openFaq === index;

                            return (
                                <div
                                    key={faq.question}
                                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.035]"
                                >
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setOpenFaq(isOpen ? null : index)
                                        }
                                        className="flex w-full items-center justify-between gap-5 p-5 text-left"
                                    >
                                        <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                                            {faq.question}
                                        </span>

                                        <ChevronDown
                                            size={18}
                                            className={`shrink-0 text-slate-400 transition ${isOpen ? "rotate-180" : ""}`}
                                        />
                                    </button>

                                    {isOpen && (
                                        <div className="border-t border-slate-200 px-5 pb-5 pt-4 dark:border-white/10">
                                            <p className="text-sm leading-7 text-slate-500 dark:text-slate-400">
                                                {faq.answer}
                                            </p>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    startSupportChat(
                                                        `I have a question about: "${faq.question}"`,
                                                        {
                                                            Source: "Business Management System",
                                                            FAQ: faq.question,
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

            {/* FINAL CTA */}
            <section id="contact" className="scroll-mt-20 relative overflow-hidden py-20 lg:py-28">
                <div className="absolute inset-0 -z-20 bg-slate-950 dark:bg-[#02050b]" />
                <div className="absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/20 blur-[140px]" />

                <div className="mx-auto max-w-5xl px-5 text-center sm:px-6 lg:px-8">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-slate-950 shadow-2xl">
                        <BriefcaseBusiness size={27} />
                    </div>

                    <h2 className="mt-8 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Your business already has a system.
                        <span className="block text-blue-400">
                            Let us make it better.
                        </span>
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                        Whether you need a complete business management
                        platform, a focused internal application or simply
                        want to understand where to start, we can help you
                        map the journey from idea to implementation.
                    </p>

                    <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                        <button
                            type="button"
                            onClick={() =>
                                startSupportChat(
                                    "I'd like to start a conversation about a business management system. Here's what we need:",
                                    {
                                        Source: "Business Management System",
                                        Stage: "Final CTA — start conversation",
                                    }
                                )
                            }
                            className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-white px-7 py-4 text-sm font-black text-slate-950 transition hover:bg-blue-100"
                        >
                            Start a Conversation
                            <ArrowRight size={17} className="transition group-hover:translate-x-1" />
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                startSupportChat(
                                    "I'd like to request a quote for a business management system.",
                                    {
                                        Source: "Business Management System",
                                        Stage: "Final CTA — request quote",
                                    }
                                )
                            }
                            className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-7 py-4 text-sm font-bold text-white backdrop-blur transition hover:bg-white/10"
                        >
                            Request a Quote
                            <FileText size={17} />
                        </button>
                    </div>

                    <div className="mt-10 flex flex-wrap justify-center gap-x-7 gap-y-3 text-xs font-semibold text-slate-400">
                        {[
                            "Start from scratch",
                            "Customize existing systems",
                            "Integrate existing tools",
                            "Ongoing support",
                        ].map((label) => (
                            <button
                                type="button"
                                key={label}
                                onClick={() =>
                                    startSupportChat(
                                        `I'd like to discuss: ${label}.`,
                                        {
                                            Source: "Business Management System",
                                            "Final bullet": label,
                                        }
                                    )
                                }
                                className="flex items-center gap-2 transition hover:text-white"
                            >
                                <Check size={14} className="text-emerald-400" />
                                {label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

        </main>
    );
}