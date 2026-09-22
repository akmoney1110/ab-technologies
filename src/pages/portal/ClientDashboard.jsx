import { useEffect, useMemo, useRef, useState } from "react";
import {
    Activity,
    AlertCircle,
    ArrowRight,
    ArrowUpRight,
    BadgeCheck,
    Bell,
    BookOpen,
    BriefcaseBusiness,
    Building2,
    CheckCircle2,
    ChevronRight,
    CircleHelp,
    Clock3,
    Command,
    CreditCard,
    FileCheck2,
    FileText,
    FolderOpen,
    Gauge,
    Globe2,
    LayoutDashboard,
    Lock,
    LogOut,
    Menu,
    MessageSquareText,
    Package,
    Plus,
    ReceiptText,
    RefreshCw,
    Search,
    ServerCog,
    Settings,
    ShieldCheck,
    Sparkles,
    TrendingUp,
    User,
    Users,
    WalletCards,
    X,
    Zap,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

/* ============================================================
   NAVIGATION
   ============================================================ */

const NAVIGATION = [
    { label: "Overview", path: "/portal/dashboard", icon: LayoutDashboard, hint: "Command center" },
    { label: "Projects", path: "/portal/projects", icon: BriefcaseBusiness, hint: "Delivery & progress" },
    { label: "Proposals", path: "/portal/proposals", icon: FileText, hint: "Commercial offers" },
    { label: "Procurement", path: "/portal/procurement", icon: Package, hint: "Hardware & sourcing" },
    { label: "Training & Learning", path: "/portal/training", icon: BookOpen, hint: "Learning paths" },
    { label: "Payments", path: "/portal/payments", icon: ReceiptText, hint: "Invoices & billing" },
    { label: "Documents", path: "/portal/documents", icon: FolderOpen, hint: "Contracts & files" },
    { label: "Support", path: "/portal/support", icon: CircleHelp, hint: "Help desk" },
];

/* ============================================================
   HELPERS
   ============================================================ */

function getInitials(name = "") {
    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("");
}

function formatDate(value) {
    if (!value) return "—";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "—";
    return new Intl.DateTimeFormat("en-NG", {
        day: "numeric",
        month: "short",
        year: "numeric",
    }).format(date);
}

function formatDateTime(value) {
    if (!value) return "—";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "—";
    return new Intl.DateTimeFormat("en-NG", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
    }).format(date);
}

function timeAgo(value) {
    if (!value) return "—";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return "—";
    const diff = Math.floor((Date.now() - d.getTime()) / 1000);
    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
    return formatDate(value);
}

function formatCurrency(value) {
    const amount = Number(value || 0);
    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0,
    }).format(amount);
}

function greeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
}

/* ============================================================
   STATUS SYSTEM
   ============================================================ */

function normalizeStatus(status) {
    const value = String(status || "")
        .trim()
        .toLowerCase()
        .replaceAll("-", "_")
        .replaceAll(" ", "_");

    if (["completed", "complete", "done", "delivered"].includes(value)) return "COMPLETED";
    if (["accepted", "active", "in_progress"].includes(value)) return "ACTIVE";
    if (["cancelled", "canceled", "rejected", "declined"].includes(value)) return "CANCELLED";
    if (["on_hold", "hold", "paused"].includes(value)) return "ON_HOLD";
    if (["pending", "submitted", "awaiting", "new"].includes(value)) return "PENDING";
    if (["quoted", "negotiation"].includes(value)) return "QUOTED";
    if (["ordered", "processing", "shipped", "in_transit"].includes(value)) return "ORDERED";
    if (["paid", "settled"].includes(value)) return "PAID";
    if (["open"].includes(value)) return "OPEN";
    if (["in_review", "review"].includes(value)) return "IN_REVIEW";
    if (["resolved", "closed", "answered"].includes(value)) return "RESOLVED";
    if (["enrolled", "started"].includes(value)) return "ENROLLED";
    if (["urgent", "overdue", "high"].includes(value)) return "URGENT";
    if (["waiting", "sent", "approved"].includes(value)) return value.toUpperCase();
    if (["draft"].includes(value)) return "DRAFT";

    return value ? value.toUpperCase() : "UNKNOWN";
}

function statusLabel(status) {
    const normalized = normalizeStatus(status);
    const labels = {
        COMPLETED: "Completed",
        ACTIVE: "Active",
        ON_HOLD: "On Hold",
        CANCELLED: "Cancelled",
        PENDING: "Pending",
        QUOTED: "Quoted",
        ORDERED: "Ordered",
        PAID: "Paid",
        OPEN: "Open",
        IN_REVIEW: "In Review",
        RESOLVED: "Resolved",
        ENROLLED: "Enrolled",
        URGENT: "Urgent",
        WAITING: "Waiting",
        SENT: "Sent",
        APPROVED: "Approved",
        DRAFT: "Draft",
    };
    if (labels[normalized]) return labels[normalized];
    return normalized.toLowerCase().replaceAll("_", " ").replace(/\b\w/g, (x) => x.toUpperCase());
}

function statusTheme(status, darkMode) {
    const value = normalizeStatus(status);

    if (["ACTIVE", "APPROVED", "PAID", "COMPLETED", "RESOLVED", "ENROLLED"].includes(value)) {
        return {
            chip: darkMode
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                : "border-emerald-200 bg-emerald-50 text-emerald-700",
            dot: "bg-emerald-500",
            bar: "bg-gradient-to-r from-emerald-500 to-teal-500",
        };
    }
    if (["IN_PROGRESS", "QUOTED", "NEGOTIATION", "ORDERED", "IN_REVIEW", "PROCESSING", "SHIPPED"].includes(value)) {
        return {
            chip: darkMode
                ? "border-sky-500/30 bg-sky-500/10 text-sky-300"
                : "border-sky-200 bg-sky-50 text-sky-700",
            dot: "bg-sky-500",
            bar: "bg-gradient-to-r from-sky-500 to-indigo-500",
        };
    }
    if (["WAITING", "ON_HOLD", "SENT", "PENDING", "DRAFT"].includes(value)) {
        return {
            chip: darkMode
                ? "border-amber-500/30 bg-amber-500/10 text-amber-300"
                : "border-amber-200 bg-amber-50 text-amber-700",
            dot: "bg-amber-500",
            bar: "bg-amber-500",
        };
    }
    if (["URGENT", "OVERDUE", "CANCELLED", "OPEN", "REJECTED"].includes(value)) {
        return {
            chip: darkMode
                ? "border-red-500/30 bg-red-500/10 text-red-300"
                : "border-red-200 bg-red-50 text-red-700",
            dot: "bg-red-500",
            bar: "bg-red-500",
        };
    }
    return {
        chip: darkMode
            ? "border-slate-700 bg-slate-800/60 text-slate-400"
            : "border-slate-200 bg-slate-100 text-slate-600",
        dot: "bg-slate-400",
        bar: "bg-slate-400",
    };
}

function StatusBadge({ status, darkMode }) {
    const theme = statusTheme(status, darkMode);
    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold tracking-wide transition-all ${theme.chip}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${theme.dot}`} />
            {statusLabel(status)}
        </span>
    );
}

/* ============================================================
   HOOKS
   ============================================================ */

function useNow(intervalMs = 1000) {
    const [now, setNow] = useState(() => new Date());
    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), intervalMs);
        return () => clearInterval(id);
    }, [intervalMs]);
    return now;
}

function useOutsideClick(ref, handler) {
    useEffect(() => {
        const listener = (event) => {
            if (!ref.current || ref.current.contains(event.target)) return;
            handler(event);
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);
}

/* ============================================================
   COUNT UP
   ============================================================ */

function CountUp({ value, format, duration = 900 }) {
    const [display, setDisplay] = useState(0);
    const previous = useRef(0);
    const rafRef = useRef(null);

    const target = typeof value === "number" ? value : Number(value) || 0;

    useEffect(() => {
        const from = previous.current;
        const start = performance.now();
        const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(from + (target - from) * eased);
            if (progress < 1) rafRef.current = requestAnimationFrame(tick);
            else previous.current = target;
        };
        rafRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafRef.current);
    }, [target, duration]);

    if (format) return format(display);
    return <>{Math.round(display).toLocaleString("en-NG")}</>;
}

/* ============================================================
   SPARKLINE
   ============================================================ */

function Sparkline({ data, darkMode }) {
    const width = 120;
    const height = 36;
    const pad = 2;

    const points = useMemo(() => {
        if (!data || data.length < 2) return null;
        const max = Math.max(...data, 1);
        const min = Math.min(...data, 0);
        const range = max - min || 1;
        return data.map((v, i) => {
            const x = pad + (i / (data.length - 1)) * (width - pad * 2);
            const y = height - pad - ((v - min) / range) * (height - pad * 2);
            return [x, y];
        });
    }, [data]);

    if (!points) return null;

    const path = points
        .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`)
        .join(" ");
    const area = `${path} L${width - pad},${height - pad} L${pad},${height - pad} Z`;
    const last = points[points.length - 1];
    const gid = `spark-${darkMode ? "d" : "l"}`;

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="h-9 w-full" preserveAspectRatio="none" aria-hidden="true">
            <defs>
                <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={darkMode ? "#38bdf8" : "#0284c7"} stopOpacity="0.35" />
                    <stop offset="100%" stopColor={darkMode ? "#38bdf8" : "#0284c7"} stopOpacity="0" />
                </linearGradient>
            </defs>
            <path d={area} fill={`url(#${gid})`} />
            <path d={path} fill="none" stroke={darkMode ? "#38bdf8" : "#0284c7"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx={last[0]} cy={last[1]} r="2.6" fill={darkMode ? "#38bdf8" : "#0284c7"} />
            <circle cx={last[0]} cy={last[1]} r="5.5" fill={darkMode ? "#38bdf8" : "#0284c7"} opacity="0.25" />
        </svg>
    );
}

/* ============================================================
   ACTIVITY AREA CHART
   ============================================================ */

function ActivityChart({ data, darkMode }) {
    const width = 640;
    const height = 190;
    const padX = 8;
    const padTop = 16;
    const padBottom = 24;

    const { line, area, ticks } = useMemo(() => {
        if (!data || data.length < 2) return { line: "", area: "", ticks: [] };
        const max = Math.max(...data, 1);
        const min = Math.min(...data, 0);
        const range = max - min || 1;
        const stepX = (width - padX * 2) / (data.length - 1);
        const pts = data.map((v, i) => {
            const x = padX + i * stepX;
            const y = padTop + (1 - (v - min) / range) * (height - padTop - padBottom);
            return [x, y];
        });
        const line = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`).join(" ");
        const area = `${line} L${pts[pts.length - 1][0]},${height - padBottom} L${padX},${height - padBottom} Z`;
        const ticks = pts.filter((_, i) => i % Math.ceil(pts.length / 6) === 0);
        return { line, area, ticks };
    }, [data]);

    if (!line) return null;

    return (
        <div>
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full" aria-hidden="true">
                <defs>
                    <linearGradient id={`area-${darkMode ? "d" : "l"}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={darkMode ? "#38bdf8" : "#0ea5e9"} stopOpacity="0.30" />
                        <stop offset="100%" stopColor={darkMode ? "#38bdf8" : "#0ea5e9"} stopOpacity="0" />
                    </linearGradient>
                </defs>
                {[0.25, 0.5, 0.75].map((f) => {
                    const y = padTop + f * (height - padTop - padBottom);
                    return (
                        <line
                            key={f}
                            x1={padX}
                            x2={width - padX}
                            y1={y}
                            y2={y}
                            stroke={darkMode ? "#1e293b" : "#e2e8f0"}
                            strokeDasharray="3 5"
                            strokeWidth="1"
                        />
                    );
                })}
                <path d={area} fill={`url(#area-${darkMode ? "d" : "l"})`} />
                <path d={line} fill="none" stroke={darkMode ? "#38bdf8" : "#0284c7"} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                {ticks.map(([x, y], i) => (
                    <circle key={i} cx={x} cy={y} r="3" fill={darkMode ? "#0b1826" : "#ffffff"} stroke={darkMode ? "#38bdf8" : "#0284c7"} strokeWidth="1.8" />
                ))}
            </svg>
            <div className="mt-1 flex items-center justify-between text-[10px] font-medium">
                {["Jan", "Mar", "May", "Jul", "Sep", "Nov"].map((m) => (
                    <span key={m} className={darkMode ? "text-slate-600" : "text-slate-400"}>{m}</span>
                ))}
            </div>
        </div>
    );
}

/* ============================================================
   SURFACE
   ============================================================ */

function Surface({ children, darkMode, className = "" }) {
    return (
        <div
            className={`rounded-2xl border backdrop-blur-sm transition-all duration-300 ${darkMode
                ? "border-slate-800/80 bg-slate-900/60 shadow-[0_8px_30px_rgb(0,0,0,0.25)] hover:border-slate-700/80"
                : "border-slate-200/90 bg-white shadow-[0_8px_30px_rgb(15,23,42,0.04)] hover:border-slate-300"
                } ${className}`}
        >
            {children}
        </div>
    );
}

/* ============================================================
   SECTION HEADER
   ============================================================ */

function SectionHeader({ title, description, actionLabel, actionHref, darkMode, icon: Icon, badge }) {
    return (
        <div className="mb-5 flex items-end justify-between gap-4">
            <div className="min-w-0">
                <div className="flex items-center gap-2.5">
                    {Icon && (
                        <span
                            className={`flex h-8 w-8 items-center justify-center rounded-xl transition-transform hover:scale-105 ${darkMode
                                ? "bg-sky-500/10 text-sky-400 shadow-sm shadow-sky-500/10"
                                : "bg-sky-50 text-sky-600"
                                }`}
                        >
                            <Icon size={16} />
                        </span>
                    )}
                    <h2 className={`text-[15px] font-bold tracking-tight ${darkMode ? "text-white" : "text-slate-950"}`}>
                        {title}
                    </h2>
                    {badge && (
                        <span
                            className={`rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-wider ${darkMode ? "bg-sky-400/10 text-sky-400" : "bg-sky-50 text-sky-600"
                                }`}
                        >
                            {badge}
                        </span>
                    )}
                </div>
                {description && (
                    <p className={`mt-1.5 text-xs leading-5 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                        {description}
                    </p>
                )}
            </div>
            {actionLabel && actionHref && (
                <Link
                    to={actionHref}
                    className={`group inline-flex shrink-0 items-center gap-1.5 text-xs font-bold transition-colors ${darkMode ? "text-sky-400 hover:text-sky-300" : "text-sky-600 hover:text-sky-700"
                        }`}
                >
                    {actionLabel}
                    <ChevronRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
            )}
        </div>
    );
}

/* ============================================================
   STAT CARD
   ============================================================ */

function StatCard({ title, value, numericValue, description, trend, spark, icon: Icon, href, darkMode, accent = "sky" }) {
    const accents = {
        sky: darkMode ? "bg-sky-500/10 text-sky-400 border-sky-500/20" : "bg-sky-50 text-sky-600 border-sky-100",
        emerald: darkMode ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-emerald-50 text-emerald-600 border-emerald-100",
        violet: darkMode ? "bg-violet-500/10 text-violet-400 border-violet-500/20" : "bg-violet-50 text-violet-600 border-violet-100",
        amber: darkMode ? "bg-amber-500/10 text-amber-400 border-amber-500/20" : "bg-amber-50 text-amber-600 border-amber-100",
        slate: darkMode ? "bg-slate-800 text-slate-300 border-slate-700" : "bg-slate-100 text-slate-600 border-slate-200",
    };

    const card = (
        <div
            className={`group relative overflow-hidden rounded-2xl border p-5 transition-all duration-300 ${darkMode
                ? "border-slate-800/80 bg-slate-900/70 hover:-translate-y-1 hover:border-slate-700 hover:shadow-xl hover:shadow-black/30"
                : "border-slate-200/90 bg-white hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/60"
                }`}
        >
            <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-br from-sky-500/15 to-transparent blur-2xl opacity-0 transition-all duration-300 group-hover:opacity-100" />

            <div className="relative flex items-start justify-between gap-3">
                <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-110 ${accents[accent] || accents.sky
                        }`}
                >
                    <Icon size={19} strokeWidth={2} />
                </div>

                <div className="flex items-center gap-2">
                    {typeof trend === "number" && (
                        <span
                            className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold ${trend >= 0
                                ? darkMode
                                    ? "bg-emerald-400/10 text-emerald-400"
                                    : "bg-emerald-50 text-emerald-600"
                                : darkMode
                                    ? "bg-red-400/10 text-red-400"
                                    : "bg-red-50 text-red-600"
                                }`}
                        >
                            <TrendingUp size={11} className={trend < 0 ? "rotate-180" : ""} />
                            {Math.abs(trend)}%
                        </span>
                    )}

                    {href && (
                        <div
                            className={`flex h-7 w-7 items-center justify-center rounded-lg border transition-all group-hover:translate-x-0.5 ${darkMode
                                ? "border-slate-800 bg-slate-800/50 text-slate-400 group-hover:border-slate-700 group-hover:text-white"
                                : "border-slate-100 bg-slate-50 text-slate-400 group-hover:border-slate-200 group-hover:text-slate-900"
                                }`}
                        >
                            <ArrowUpRight size={14} />
                        </div>
                    )}
                </div>
            </div>

            <div className="relative mt-5">
                <p className={`text-[11px] font-semibold uppercase tracking-wider ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                    {title}
                </p>
                <p className={`mt-1.5 text-2xl font-black tracking-tight ${darkMode ? "text-white" : "text-slate-950"}`}>
                    {typeof numericValue === "number" ? (
                        <CountUp
                            value={numericValue}
                            format={(v) =>
                                typeof value === "string" && value.includes("₦")
                                    ? formatCurrency(v)
                                    : Math.round(v).toLocaleString("en-NG")
                            }
                        />
                    ) : (
                        value
                    )}
                </p>
                {description && (
                    <p className={`mt-1 text-[11px] font-medium ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
                        {description}
                    </p>
                )}
                {spark && (
                    <div className="mt-3">
                        <Sparkline data={spark} darkMode={darkMode} />
                    </div>
                )}
            </div>
        </div>
    );

    return href ? (
        <Link to={href} className="block">
            {card}
        </Link>
    ) : (
        card
    );
}

/* ============================================================
   EMPTY STATE
   ============================================================ */

function EmptyState({ icon: Icon, title, description, actionLabel, actionHref, darkMode }) {
    return (
        <div
            className={`relative flex min-h-[210px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed px-6 text-center transition-all ${darkMode
                ? "border-slate-800 bg-slate-950/20 hover:border-slate-700"
                : "border-slate-200 bg-slate-50/60 hover:border-slate-300"
                }`}
        >
            <div
                className={`pointer-events-none absolute -top-16 left-1/2 h-40 w-72 -translate-x-1/2 rounded-full blur-3xl ${darkMode ? "bg-sky-400/10" : "bg-sky-100"
                    }`}
            />
            <div
                className={`relative flex h-12 w-12 items-center justify-center rounded-2xl transition-transform hover:scale-110 ${darkMode ? "bg-slate-800/80 text-slate-400 shadow-inner" : "bg-white text-slate-500 shadow-md"
                    }`}
            >
                <Icon size={20} />
            </div>
            <h3 className={`relative mt-4 text-sm font-bold ${darkMode ? "text-white" : "text-slate-900"}`}>{title}</h3>
            <p className={`relative mt-1 max-w-sm text-xs leading-5 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                {description}
            </p>
            {actionLabel && actionHref && (
                <Link
                    to={actionHref}
                    className="relative mt-4 inline-flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-sky-600/25 transition-all hover:-translate-y-0.5 hover:bg-sky-500 hover:shadow-sky-600/40"
                >
                    <span>{actionLabel}</span>
                    <ArrowRight size={13} />
                </Link>
            )}
        </div>
    );
}

/* ============================================================
   PROJECT CARD
   ============================================================ */

function ProjectCard({ project, darkMode }) {
    const status = normalizeStatus(project?.status);
    const theme = statusTheme(project?.status, darkMode);
    const completed = status === "COMPLETED" || project?.is_completed === true;
    const progress = completed ? 100 : Math.min(Math.max(Number(project?.progress ?? 0), 0), 100);

    return (
        <Link
            to={`/portal/projects/${project.id}`}
            className={`group relative block overflow-hidden rounded-xl border p-4 transition-all duration-300 ${darkMode
                ? "border-slate-800/80 bg-slate-950/40 hover:border-slate-700 hover:bg-slate-900/60 hover:shadow-lg"
                : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md"
                }`}
        >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                    <p className={`text-[9px] font-extrabold uppercase tracking-[0.18em] ${darkMode ? "text-sky-400/80" : "text-sky-600"}`}>
                        {project.code || "Project"}
                    </p>
                    <h3 className={`mt-1 truncate text-sm font-bold transition-colors group-hover:text-sky-500 ${darkMode ? "text-white" : "text-slate-900"}`}>
                        {project.name || "Untitled project"}
                    </h3>
                    {project.description && (
                        <p className={`mt-1 line-clamp-1 text-[11px] ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
                            {project.description}
                        </p>
                    )}
                </div>
                <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border transition-transform group-hover:translate-x-1 ${darkMode ? "border-slate-800 bg-slate-900 text-slate-400" : "border-slate-100 bg-slate-50 text-slate-400"
                        }`}
                >
                    <ChevronRight size={14} />
                </div>
            </div>

            <div className="mt-5">
                <div className="flex items-center justify-between">
                    <span className={`text-[11px] font-medium ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                        {completed ? "Project completed" : "Project progress"}
                    </span>
                    <span className={`text-[11px] font-black ${completed ? "text-emerald-500" : darkMode ? "text-sky-400" : "text-sky-600"}`}>
                        {progress}%
                    </span>
                </div>
                <div className={`mt-2 h-2 overflow-hidden rounded-full p-0.5 ${darkMode ? "bg-slate-800/80" : "bg-slate-100"}`}>
                    <div className={`h-full rounded-full transition-all duration-700 ${theme.bar}`} style={{ width: `${progress}%` }} />
                </div>
            </div>

            <div className={`mt-4 flex items-center justify-between gap-3 border-t border-dashed pt-3.5 ${darkMode ? "border-slate-800/80" : "border-slate-100"}`}>
                <StatusBadge status={project.status} darkMode={darkMode} />
                <span className={`text-[10px] font-medium ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
                    {project.accepted_at ? `Accepted ${formatDate(project.accepted_at)}` : formatDate(project.created_at)}
                </span>
            </div>
        </Link>
    );
}

/* ============================================================
   LIST ROW
   ============================================================ */

function ListRow({ icon: Icon, title, meta, status, href, darkMode }) {
    return (
        <Link
            to={href}
            className={`group flex items-center justify-between gap-4 rounded-xl border-b px-2 py-3.5 transition-all last:border-b-0 hover:px-3 ${darkMode ? "border-slate-800/80 hover:bg-slate-800/40" : "border-slate-100 hover:bg-slate-50"
                }`}
        >
            <div className="flex min-w-0 items-center gap-3.5">
                <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-transform group-hover:scale-105 ${darkMode ? "border-slate-800 bg-slate-800/60 text-slate-300" : "border-slate-100 bg-slate-100 text-slate-600"
                        }`}
                >
                    <Icon size={16} />
                </div>
                <div className="min-w-0">
                    <p className={`truncate text-sm font-bold transition-colors group-hover:text-sky-500 ${darkMode ? "text-white" : "text-slate-900"}`}>
                        {title || "Untitled"}
                    </p>
                    <p className={`mt-0.5 text-[11px] ${darkMode ? "text-slate-400" : "text-slate-500"}`}>{meta}</p>
                </div>
            </div>
            <div className="flex shrink-0 items-center gap-3">
                <StatusBadge status={status} darkMode={darkMode} />
                <ChevronRight
                    size={15}
                    className={`transition-transform group-hover:translate-x-1 ${darkMode ? "text-slate-600" : "text-slate-400"}`}
                />
            </div>
        </Link>
    );
}

/* ============================================================
   TRAINING CARD
   ============================================================ */

function TrainingCard({ training, darkMode }) {
    const progress = Math.min(Math.max(Number(training.progress || 0), 0), 100);
    const completed = progress === 100;

    return (
        <Link
            to={`/portal/training/${training.id}`}
            className={`group block rounded-xl border p-4 transition-all duration-300 ${darkMode
                ? "border-slate-800/80 bg-slate-950/40 hover:border-slate-700 hover:bg-slate-900/60 hover:shadow-lg"
                : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md"
                }`}
        >
            <div className="flex items-start gap-4">
                <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-transform group-hover:scale-105 ${darkMode
                        ? "border-violet-500/20 bg-violet-500/10 text-violet-400 shadow-sm shadow-violet-500/10"
                        : "border-violet-100 bg-violet-50 text-violet-600"
                        }`}
                >
                    <BookOpen size={18} />
                </div>
                <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                            <p className={`truncate text-sm font-bold transition-colors group-hover:text-violet-400 ${darkMode ? "text-white" : "text-slate-900"}`}>
                                {training.title || "Training course"}
                            </p>
                            <p className={`mt-0.5 text-[11px] ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                                {training.lessons_completed ?? 0} of {training.total_lessons ?? 0} lessons completed
                            </p>
                        </div>
                        <div
                            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border transition-transform group-hover:translate-x-1 ${darkMode ? "border-slate-800 bg-slate-900 text-slate-400" : "border-slate-100 bg-slate-50 text-slate-400"
                                }`}
                        >
                            <ChevronRight size={14} />
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="mb-1.5 flex justify-between">
                            <span className={`text-[10px] font-semibold uppercase tracking-wider ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                                Course progress
                            </span>
                            <span className={`text-[10px] font-black ${darkMode ? "text-violet-400" : "text-violet-600"}`}>
                                {progress}%
                            </span>
                        </div>
                        <div className={`h-2 overflow-hidden rounded-full p-0.5 ${darkMode ? "bg-slate-800/80" : "bg-slate-100"}`}>
                            <div
                                className={`h-full rounded-full transition-all duration-700 ${completed
                                    ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                                    : "bg-gradient-to-r from-violet-500 to-purple-500"
                                    }`}
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                    <div className={`mt-4 flex items-center justify-between gap-3 border-t border-dashed pt-3.5 ${darkMode ? "border-slate-800/80" : "border-slate-100"}`}>
                        <StatusBadge status={training.status || "IN_PROGRESS"} darkMode={darkMode} />
                        <span className={`truncate text-[10px] font-medium ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                            {training.next_lesson ? `Next: ${training.next_lesson}` : "Continue learning"}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

/* ============================================================
   QUICK ACTION
   ============================================================ */

function QuickAction({ icon: Icon, label, href, darkMode, primary = false }) {
    return (
        <Link
            to={href}
            className={`group flex items-center gap-3 rounded-xl border px-4 py-3 text-xs font-bold transition-all duration-300 ${primary
                ? "border-sky-500 bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-md shadow-sky-600/25 hover:-translate-y-0.5 hover:from-sky-500 hover:to-blue-500 hover:shadow-sky-600/40"
                : darkMode
                    ? "border-slate-800/80 bg-slate-950/40 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60 hover:text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm"
                }`}
        >
            <Icon size={16} className={primary ? "text-white" : darkMode ? "text-sky-400" : "text-sky-600"} />
            <span>{label}</span>
            <ChevronRight
                size={14}
                className="ml-auto opacity-40 transition-transform group-hover:translate-x-1 group-hover:opacity-100"
            />
        </Link>
    );
}

/* ============================================================
   MINI FINANCIAL CARD
   ============================================================ */

function MiniFinancialCard({ title, value, icon: Icon, darkMode, tone = "sky" }) {
    const tones = {
        sky: darkMode ? "bg-sky-500/10 text-sky-400" : "bg-sky-50 text-sky-600",
        emerald: darkMode ? "bg-emerald-500/10 text-emerald-400" : "bg-emerald-50 text-emerald-600",
        amber: darkMode ? "bg-amber-500/10 text-amber-400" : "bg-amber-50 text-amber-600",
        violet: darkMode ? "bg-violet-500/10 text-violet-400" : "bg-violet-50 text-violet-600",
    };
    return (
        <div
            className={`flex items-center gap-3 rounded-xl border p-3.5 transition ${darkMode
                ? "border-slate-800/80 bg-slate-950/40 hover:border-slate-700"
                : "border-slate-100 bg-slate-50/70 hover:border-slate-200"
                }`}
        >
            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${tones[tone]}`}>
                <Icon size={16} />
            </div>
            <div className="min-w-0">
                <p className={`truncate text-sm font-black ${darkMode ? "text-white" : "text-slate-900"}`}>{value}</p>
                <p className={`truncate text-[10px] ${darkMode ? "text-slate-500" : "text-slate-400"}`}>{title}</p>
            </div>
        </div>
    );
}

/* ============================================================
   TRUST PANEL
   ============================================================ */

function TrustPanel({ darkMode, live, user, organization, onRefresh, refreshing }) {
    const checks = [
        { icon: ShieldCheck, label: "Secure client workspace", detail: "Authenticated access" },
        { icon: ServerCog, label: "Live platform connection", detail: live ? "Connected to AB Technologies" : "Checking connection" },
        { icon: FileCheck2, label: "Project documentation", detail: "Proposals, invoices & files" },
        { icon: MessageSquareText, label: "Direct support channel", detail: "Requests tracked in portal" },
    ];

    return (
        <div
            className={`relative overflow-hidden rounded-3xl border ${darkMode
                ? "border-slate-800 bg-gradient-to-br from-slate-900 via-[#071321] to-slate-950 shadow-2xl"
                : "border-slate-200 bg-gradient-to-br from-white via-slate-50 to-sky-50/40 shadow-xl"
                }`}
        >
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />

            <div className="relative p-6 sm:p-8">
                <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
                    <div className="min-w-0">
                        <div className="mb-3 flex flex-wrap items-center gap-2">
                            <span
                                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] ${darkMode
                                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                                    : "border-emerald-200 bg-emerald-50 text-emerald-700"
                                    }`}
                            >
                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                                </span>
                                Platform online & secure
                            </span>

                            <span
                                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] ${darkMode
                                    ? "border-sky-500/30 bg-sky-500/10 text-sky-300"
                                    : "border-sky-200 bg-sky-50 text-sky-700"
                                    }`}
                            >
                                <BadgeCheck size={11} />
                                Verified client
                            </span>
                        </div>

                        <h3 className={`text-xl font-black tracking-tight sm:text-2xl ${darkMode ? "text-white" : "text-slate-950"}`}>
                            {greeting()}, {user?.first_name || user?.full_name?.split(" ")[0] || "there"}.
                        </h3>
                        <p className={`mt-2 max-w-2xl text-xs leading-6 sm:text-sm ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                            Your workspace for software delivery, procurement tracking, training progress, and direct support — engineered by AB Technologies.
                        </p>

                        {organization?.name && (
                            <div
                                className={`mt-4 inline-flex items-center gap-2.5 rounded-xl border px-3 py-2 ${darkMode
                                    ? "border-slate-800 bg-slate-950/60"
                                    : "border-slate-200 bg-white/70"
                                    }`}
                            >
                                <Building2 size={14} className={darkMode ? "text-sky-400" : "text-sky-600"} />
                                <span className={`text-[11px] font-bold ${darkMode ? "text-slate-200" : "text-slate-800"}`}>
                                    {organization.name}
                                </span>
                                <span className={`text-[10px] ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
                                    · Client account
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
                        <button
                            onClick={onRefresh}
                            disabled={refreshing}
                            className={`inline-flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-xs font-bold transition-all ${darkMode
                                ? "border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700 hover:bg-slate-800"
                                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:shadow-sm"
                                }`}
                        >
                            <RefreshCw size={14} className={refreshing ? "animate-spin text-sky-500" : ""} />
                            {refreshing ? "Syncing…" : "Sync workspace"}
                        </button>

                        <Link
                            to="/portal/support/new"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-600 to-blue-600 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-sky-600/25 transition-all hover:-translate-y-0.5 hover:from-sky-500 hover:to-blue-500 hover:shadow-xl hover:shadow-sky-600/40"
                        >
                            <Plus size={15} />
                            New request
                        </Link>
                    </div>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {checks.map(({ icon: Icon, label, detail }) => (
                        <div
                            key={label}
                            className={`flex items-center gap-3.5 rounded-xl border p-3.5 transition-all hover:border-sky-500/30 ${darkMode
                                ? "border-slate-800/80 bg-slate-950/40"
                                : "border-slate-200/80 bg-white/90 shadow-sm"
                                }`}
                        >
                            <div
                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${darkMode ? "bg-sky-500/10 text-sky-400" : "bg-sky-50 text-sky-600"
                                    }`}
                            >
                                <Icon size={16} />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className={`truncate text-xs font-bold ${darkMode ? "text-slate-200" : "text-slate-800"}`}>
                                    {label}
                                </p>
                                <p className={`mt-0.5 truncate text-[10px] ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                                    {detail}
                                </p>
                            </div>
                            <CheckCircle2 size={15} className="ml-auto shrink-0 text-emerald-500" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ============================================================
   SIDEBAR (STICKY, INDEPENDENT SCROLL)
   ============================================================ */

function Sidebar({ darkMode, isActive, onLogout, onNavigate }) {
    return (
        <div className="flex h-full flex-col">
            {/* Brand — pinned */}
            <div className="flex h-[82px] shrink-0 items-center px-6">
                <Link to="/portal/dashboard" onClick={onNavigate} className="group flex items-center gap-3.5">
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 shadow-md shadow-sky-600/30 transition-transform group-hover:scale-105">
                        <img
                            src="/images/ab-logo.png"
                            alt="AB Technologies"
                            className="h-6 w-auto object-contain brightness-0 invert"
                        />
                        <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500 dark:border-[#07111f]" />
                    </div>
                    <div>
                        <p className={`text-[13px] font-black tracking-tight ${darkMode ? "text-white" : "text-slate-950"}`}>
                            AB TECHNOLOGIES
                        </p>
                        <p className={`mt-0.5 text-[9px] font-bold uppercase tracking-[0.2em] ${darkMode ? "text-sky-400/80" : "text-sky-600"}`}>
                            Client Portal
                        </p>
                    </div>
                </Link>
            </div>

            <div className={`mx-6 shrink-0 border-t ${darkMode ? "border-slate-800/80" : "border-slate-200/80"}`} />

            {/* Nav — independently scrollable */}
            <div className="flex-1 overflow-y-auto px-4 py-6">
                <p className={`mb-3 px-3 text-[10px] font-black uppercase tracking-[0.2em] ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
                    Workspace
                </p>

                <nav className="space-y-1.5">
                    {NAVIGATION.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.path);
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={onNavigate}
                                className={`group relative flex items-center gap-3 rounded-xl px-3.5 py-3 text-xs font-bold transition-all duration-200 ${active
                                    ? darkMode
                                        ? "border border-sky-500/20 bg-sky-500/10 text-sky-300 shadow-sm shadow-sky-500/5"
                                        : "border border-sky-200/60 bg-sky-50 text-sky-700 shadow-sm"
                                    : darkMode
                                        ? "text-slate-400 hover:bg-slate-800/50 hover:text-white"
                                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                                    }`}
                            >
                                {active && (
                                    <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-sky-500" />
                                )}
                                <Icon
                                    size={18}
                                    strokeWidth={active ? 2.2 : 1.8}
                                    className={
                                        active
                                            ? darkMode
                                                ? "text-sky-400"
                                                : "text-sky-600"
                                            : "transition-colors group-hover:text-sky-500"
                                    }
                                />
                                <span className="flex-1">{item.label}</span>
                                {active && (
                                    <span
                                        className={`h-2 w-2 rounded-full ${darkMode ? "bg-sky-400 shadow-sm shadow-sky-400/50" : "bg-sky-600"
                                            }`}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <p className={`mb-3 mt-8 px-3 text-[10px] font-black uppercase tracking-[0.2em] ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
                    Account
                </p>
                <nav className="space-y-1.5">
                    <Link
                        to="/portal/profile"
                        onClick={onNavigate}
                        className={`flex items-center gap-3 rounded-xl px-3.5 py-3 text-xs font-bold transition-colors ${darkMode ? "text-slate-400 hover:bg-slate-800/50 hover:text-white" : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                            }`}
                    >
                        <User size={18} strokeWidth={1.8} />
                        <span>Profile Settings</span>
                    </Link>
                    <Link
                        to="/portal/settings"
                        onClick={onNavigate}
                        className={`flex items-center gap-3 rounded-xl px-3.5 py-3 text-xs font-bold transition-colors ${darkMode ? "text-slate-400 hover:bg-slate-800/50 hover:text-white" : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                            }`}
                    >
                        <Settings size={18} strokeWidth={1.8} />
                        <span>Preferences</span>
                    </Link>
                </nav>

                {/* Custom build upsell */}
                <div
                    className={`mt-8 rounded-xl border p-3.5 ${darkMode ? "border-slate-800 bg-slate-950/60" : "border-slate-200 bg-slate-50/70"
                        }`}
                >
                    <div className="flex items-center gap-2">
                        <Sparkles size={13} className={darkMode ? "text-amber-400" : "text-amber-500"} />
                        <p className={`text-[10px] font-black ${darkMode ? "text-white" : "text-slate-900"}`}>
                            Need something custom?
                        </p>
                    </div>
                    <p className={`mt-1 text-[10px] leading-4 ${darkMode ? "text-slate-500" : "text-slate-500"}`}>
                        Our engineers can scope a bespoke build for your team.
                    </p>
                </div>
            </div>

            {/* Sign out — pinned */}
            <div className={`shrink-0 border-t p-4 ${darkMode ? "border-slate-800/80 bg-slate-950/20" : "border-slate-200/80 bg-slate-50/50"}`}>
                <div
                    className={`mb-3 flex items-center gap-2 rounded-lg border px-3 py-2 ${darkMode
                        ? "border-emerald-500/20 bg-emerald-500/5"
                        : "border-emerald-200 bg-emerald-50/70"
                        }`}
                >
                    <ShieldCheck size={13} className={darkMode ? "text-emerald-400" : "text-emerald-600"} />
                    <div className="min-w-0 flex-1">
                        <p className={`text-[10px] font-black ${darkMode ? "text-emerald-400" : "text-emerald-700"}`}>
                            Enterprise Secure
                        </p>
                        <p className={`text-[9px] ${darkMode ? "text-slate-500" : "text-slate-500"}`}>
                            AES-256 encrypted
                        </p>
                    </div>
                </div>

                <button
                    onClick={onLogout}
                    className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-xs font-bold transition-all duration-200 ${darkMode
                        ? "text-red-400 hover:bg-red-500/10 hover:text-red-300"
                        : "text-red-600 hover:bg-red-50 hover:text-red-700"
                        }`}
                >
                    <LogOut size={18} strokeWidth={1.8} />
                    <span>Sign out</span>
                </button>
            </div>
        </div>
    );
}

/* ============================================================
   COMMAND PALETTE
   ============================================================ */

function CommandPalette({ open, onClose, onNavigate, darkMode }) {
    const [query, setQuery] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
        if (open) {
            setTimeout(() => inputRef.current?.focus(), 50);
            setQuery("");
        }
    }, [open]);

    useEffect(() => {
        const handler = (e) => {
            if (e.key === "Escape" && open) onClose();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [open, onClose]);

    const results = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return NAVIGATION;
        return NAVIGATION.filter(
            (n) => n.label.toLowerCase().includes(q) || (n.hint || "").toLowerCase().includes(q)
        );
    }, [query]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh]">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            <div
                className={`relative w-full max-w-xl overflow-hidden rounded-2xl border shadow-2xl ${darkMode ? "border-slate-800 bg-[#0a1628]" : "border-slate-200 bg-white"
                    }`}
                style={{ animation: "paletteIn 0.18s cubic-bezier(0.16, 1, 0.3, 1)" }}
            >
                <div className={`flex items-center gap-3 border-b px-4 py-3 ${darkMode ? "border-slate-800" : "border-slate-100"}`}>
                    <Search size={16} className={darkMode ? "text-slate-500" : "text-slate-400"} />
                    <input
                        ref={inputRef}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search navigation, actions, or ask anything…"
                        className={`flex-1 bg-transparent text-sm outline-none ${darkMode ? "text-white placeholder:text-slate-600" : "text-slate-900 placeholder:text-slate-400"
                            }`}
                    />
                    <kbd
                        className={`rounded border px-1.5 py-0.5 text-[10px] font-bold ${darkMode
                            ? "border-slate-700 bg-slate-800 text-slate-500"
                            : "border-slate-200 bg-slate-100 text-slate-500"
                            }`}
                    >
                        ESC
                    </kbd>
                </div>

                <div className="max-h-[400px] overflow-y-auto p-2">
                    <p className={`px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider ${darkMode ? "text-slate-600" : "text-slate-400"}`}>
                        {query ? "Results" : "Quick navigation"}
                    </p>
                    {results.length === 0 && (
                        <div className={`p-6 text-center text-xs ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
                            No results for "{query}"
                        </div>
                    )}
                    {results.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.path}
                                onClick={() => {
                                    onNavigate(item.path);
                                    onClose();
                                }}
                                className={`group flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left text-sm transition-colors ${darkMode ? "text-slate-300 hover:bg-slate-800" : "text-slate-700 hover:bg-slate-100"
                                    }`}
                            >
                                <Icon size={15} className={darkMode ? "text-slate-500" : "text-slate-400"} />
                                <span className="flex-1">{item.label}</span>
                                <span className={`text-[10px] ${darkMode ? "text-slate-600" : "text-slate-400"}`}>
                                    {item.hint}
                                </span>
                            </button>
                        );
                    })}
                </div>

                <div
                    className={`flex items-center gap-3 border-t px-4 py-2 text-[10px] ${darkMode ? "border-slate-800 text-slate-600" : "border-slate-100 text-slate-400"
                        }`}
                >
                    <span className="flex items-center gap-1">
                        <kbd className={`rounded border px-1 ${darkMode ? "border-slate-700" : "border-slate-200"}`}>↵</kbd>
                        Select
                    </span>
                    <span className="flex items-center gap-1">
                        <kbd className={`rounded border px-1 ${darkMode ? "border-slate-700" : "border-slate-200"}`}>ESC</kbd>
                        Close
                    </span>
                </div>
            </div>

            <style>{`
                @keyframes paletteIn {
                    from { opacity: 0; transform: translateY(-10px) scale(0.98); }
                    to   { opacity: 1; transform: translateY(0) scale(1); }
                }
            `}</style>
        </div>
    );
}

/* ============================================================
   NOTIFICATIONS DROPDOWN
   ============================================================ */

function NotificationsDropdown({ open, onClose, darkMode, notifications }) {
    const ref = useRef(null);
    useOutsideClick(ref, onClose);

    if (!open) return null;
    const list = Array.isArray(notifications) ? notifications : [];

    return (
        <div
            ref={ref}
            className={`absolute right-0 top-12 z-50 w-80 overflow-hidden rounded-xl border shadow-2xl ${darkMode ? "border-slate-800 bg-[#0b1826]" : "border-slate-200 bg-white"
                }`}
            style={{ animation: "paletteIn 0.18s cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
            <div className={`flex items-center justify-between border-b px-4 py-3 ${darkMode ? "border-slate-800" : "border-slate-100"}`}>
                <p className={`text-xs font-bold ${darkMode ? "text-white" : "text-slate-900"}`}>Notifications</p>
                <span
                    className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold ${darkMode ? "bg-sky-400/10 text-sky-400" : "bg-sky-50 text-sky-600"
                        }`}
                >
                    {list.length} new
                </span>
            </div>

            <div className="max-h-72 overflow-y-auto">
                {list.length ? (
                    list.slice(0, 6).map((n, i) => (
                        <div
                            key={i}
                            className={`flex gap-3 border-b px-4 py-3 last:border-b-0 ${darkMode ? "border-slate-800 hover:bg-slate-800/50" : "border-slate-50 hover:bg-slate-50"
                                }`}
                        >
                            <div
                                className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${darkMode ? "bg-sky-400/10 text-sky-400" : "bg-sky-50 text-sky-600"
                                    }`}
                            >
                                <Activity size={13} />
                            </div>
                            <div className="min-w-0">
                                <p className={`text-xs font-medium ${darkMode ? "text-white" : "text-slate-900"}`}>
                                    {n.title || "Update"}
                                </p>
                                <p className={`mt-0.5 line-clamp-2 text-[11px] ${darkMode ? "text-slate-500" : "text-slate-500"}`}>
                                    {n.message || n.body || ""}
                                </p>
                                <p className={`mt-1 text-[9px] ${darkMode ? "text-slate-600" : "text-slate-400"}`}>
                                    {timeAgo(n.created_at)}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="px-4 py-10 text-center">
                        <CheckCircle2 size={22} className={`mx-auto ${darkMode ? "text-slate-700" : "text-slate-300"}`} />
                        <p className={`mt-3 text-xs font-medium ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                            You're all caught up
                        </p>
                        <p className={`mt-1 text-[10px] ${darkMode ? "text-slate-600" : "text-slate-400"}`}>
                            New notifications will appear here.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

/* ============================================================
   TOP BAR
   ============================================================ */

function TopBar({
    darkMode,
    initials,
    user,
    organization,
    onMenu,
    profileOpen,
    setProfileOpen,
    onLogout,
    onRefresh,
    refreshing,
    onOpenCommand,
}) {
    const now = useNow(1000);
    const [notifOpen, setNotifOpen] = useState(false);
    const profileRef = useRef(null);

    useOutsideClick(profileRef, () => setProfileOpen(false));

    const notifications = user?.notifications || [];

    return (
        <header
            className={`sticky top-0 z-40 border-b backdrop-blur-xl transition-colors ${darkMode
                ? "border-slate-800/80 bg-[#07111f]/85 shadow-lg shadow-black/10"
                : "border-slate-200/80 bg-[#f5f8fc]/85 shadow-sm"
                }`}
        >
            <div className="flex h-[76px] items-center justify-between gap-4 px-4 sm:px-6 xl:px-8">
                <div className="flex min-w-0 items-center gap-3.5">
                    <button
                        onClick={onMenu}
                        aria-label="Open navigation"
                        className={`rounded-xl border p-2.5 transition-colors lg:hidden ${darkMode
                            ? "border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800"
                            : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                            }`}
                    >
                        <Menu size={20} />
                    </button>

                    {/* Cmd+K trigger (desktop) */}
                    <button
                        onClick={onOpenCommand}
                        className={`hidden items-center gap-2.5 rounded-xl border px-3.5 py-2 text-xs transition md:flex ${darkMode
                            ? "border-slate-800 bg-slate-900/60 text-slate-500 hover:border-slate-700 hover:bg-slate-900"
                            : "border-slate-200 bg-white/70 text-slate-400 hover:border-sky-300 hover:bg-white"
                            }`}
                    >
                        <Search size={13} />
                        <span className="w-40 text-left">Search workspace…</span>
                        <kbd
                            className={`flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[9px] font-bold ${darkMode
                                ? "border-slate-700 bg-slate-800 text-slate-500"
                                : "border-slate-200 bg-slate-50 text-slate-500"
                                }`}
                        >
                            <Command size={9} />K
                        </kbd>
                    </button>

                    <div className="hidden min-w-0 sm:block lg:hidden xl:block">
                        <p className={`truncate text-[10px] font-extrabold uppercase tracking-[0.18em] ${darkMode ? "text-sky-400/80" : "text-sky-600"}`}>
                            Client workspace
                        </p>
                        <p className={`mt-0.5 truncate text-xs font-bold ${darkMode ? "text-slate-200" : "text-slate-800"}`}>
                            {organization?.name || "AB Technologies"}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2.5 sm:gap-3">
                    {/* Live clock (desktop only) */}
                    <div className={`hidden items-center gap-2 xl:flex ${darkMode ? "text-slate-500" : "text-slate-500"}`}>
                        <span className="text-[10px] font-medium">
                            {now.toLocaleDateString("en-NG", { weekday: "short", day: "numeric", month: "short" })}
                        </span>
                        <span className={`h-1 w-1 rounded-full ${darkMode ? "bg-slate-700" : "bg-slate-300"}`} />
                        <span className="font-mono text-[10px] font-semibold tabular-nums">
                            {now.toLocaleTimeString("en-NG", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                        </span>
                    </div>

                    <button
                        onClick={onRefresh}
                        disabled={refreshing}
                        title="Refresh dashboard"
                        className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all ${darkMode
                            ? "border-slate-800 bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white"
                            : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            }`}
                    >
                        <RefreshCw size={16} className={refreshing ? "animate-spin text-sky-500" : ""} />
                    </button>

                    {/* Notifications */}
                    <div className="relative">
                        <button
                            onClick={() => setNotifOpen((v) => !v)}
                            aria-label="Notifications"
                            className={`relative flex h-10 w-10 items-center justify-center rounded-xl border transition-all ${darkMode
                                ? "border-slate-800 bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white"
                                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                }`}
                        >
                            <Bell size={16} />
                            {notifications.length > 0 && (
                                <span className="absolute right-2 top-2 flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-60" />
                                    <span className={`relative inline-flex h-2 w-2 rounded-full bg-sky-500 ring-2 ${darkMode ? "ring-[#07111f]" : "ring-white"}`} />
                                </span>
                            )}
                        </button>
                        <NotificationsDropdown
                            open={notifOpen}
                            onClose={() => setNotifOpen(false)}
                            darkMode={darkMode}
                            notifications={notifications}
                        />
                    </div>

                    <Link
                        to="/portal/support"
                        className={`hidden items-center gap-2 rounded-xl border px-3.5 py-2.5 text-xs font-bold transition-all sm:flex ${darkMode
                            ? "border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700 hover:bg-slate-800"
                            : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:shadow-sm"
                            }`}
                    >
                        <CircleHelp size={16} className="text-sky-500" />
                        <span>Support</span>
                    </Link>

                    {/* Profile */}
                    <div className="relative" ref={profileRef}>
                        <button
                            onClick={() => setProfileOpen(!profileOpen)}
                            className={`flex items-center gap-3 rounded-2xl border p-1.5 pr-3 transition-all ${darkMode
                                ? "border-slate-800 bg-slate-900/80 hover:border-slate-700 hover:bg-slate-900"
                                : "border-slate-200 bg-white shadow-sm hover:border-slate-300"
                                }`}
                        >
                            <div className="relative">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-xs font-black text-white shadow-md shadow-sky-600/30">
                                    {initials}
                                </div>
                                <span className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 bg-emerald-500 ${darkMode ? "border-[#07111f]" : "border-white"}`} />
                            </div>
                            <div className="hidden text-left md:block">
                                <p className={`max-w-[140px] truncate text-xs font-bold ${darkMode ? "text-white" : "text-slate-900"}`}>
                                    {user?.full_name || "Client"}
                                </p>
                                <p className={`text-[9px] font-medium ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                                    Client account
                                </p>
                            </div>
                            <ChevronRight
                                size={14}
                                className={`hidden transition-transform md:block ${profileOpen ? "rotate-90" : ""} ${darkMode ? "text-slate-500" : "text-slate-400"}`}
                            />
                        </button>

                        {profileOpen && (
                            <div
                                onClick={(e) => e.stopPropagation()}
                                className={`absolute right-0 top-14 z-50 w-64 rounded-2xl border p-2 shadow-2xl backdrop-blur-xl ${darkMode
                                    ? "border-slate-800 bg-[#0b1826]/95 text-slate-200 shadow-black/50"
                                    : "border-slate-200 bg-white/95 text-slate-800 shadow-xl"
                                    }`}
                            >
                                <div className={`border-b border-dashed px-3 py-3 ${darkMode ? "border-slate-800" : "border-slate-100"}`}>
                                    <p className={`truncate text-xs font-bold ${darkMode ? "text-white" : "text-slate-900"}`}>
                                        {user?.full_name || "Client"}
                                    </p>
                                    <p className={`mt-0.5 truncate text-[11px] ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                                        {user?.email || ""}
                                    </p>
                                </div>
                                <div className="py-1">
                                    <Link
                                        to="/portal/profile"
                                        onClick={() => setProfileOpen(false)}
                                        className={`flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-xs font-bold transition-colors ${darkMode ? "hover:bg-slate-800/80 hover:text-white" : "hover:bg-slate-50 hover:text-slate-900"
                                            }`}
                                    >
                                        <User size={16} className="text-sky-500" />
                                        <span>Profile details</span>
                                    </Link>
                                    <Link
                                        to="/portal/settings"
                                        onClick={() => setProfileOpen(false)}
                                        className={`flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-xs font-bold transition-colors ${darkMode ? "hover:bg-slate-800/80 hover:text-white" : "hover:bg-slate-50 hover:text-slate-900"
                                            }`}
                                    >
                                        <Settings size={16} className="text-sky-500" />
                                        <span>Account settings</span>
                                    </Link>
                                    <Link
                                        to="/portal/settings"
                                        onClick={() => setProfileOpen(false)}
                                        className={`flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-xs font-bold transition-colors ${darkMode ? "hover:bg-slate-800/80 hover:text-white" : "hover:bg-slate-50 hover:text-slate-900"
                                            }`}
                                    >
                                        <Lock size={16} className="text-sky-500" />
                                        <span>Security & 2FA</span>
                                    </Link>
                                </div>
                                <div className={`my-1 border-t ${darkMode ? "border-slate-800" : "border-slate-100"}`} />
                                <button
                                    onClick={onLogout}
                                    className={`flex w-full items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-xs font-bold transition-colors ${darkMode ? "text-red-400 hover:bg-red-500/10" : "text-red-600 hover:bg-red-50"
                                        }`}
                                >
                                    <LogOut size={16} />
                                    <span>Sign out</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

/* ============================================================
   SKELETON
   ============================================================ */

function SkeletonBlock({ className, darkMode }) {
    return (
        <div className={`animate-pulse rounded-2xl ${darkMode ? "bg-slate-900/60" : "bg-slate-200/70"} ${className}`} />
    );
}

function LoadingDashboard({ darkMode }) {
    return (
        <div className="space-y-6">
            <SkeletonBlock darkMode={darkMode} className="h-56" />
            <div className="grid grid-cols-2 gap-4 xl:grid-cols-6">
                {Array.from({ length: 6 }).map((_, i) => (
                    <SkeletonBlock key={i} darkMode={darkMode} className="h-32" />
                ))}
            </div>
            <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
                <SkeletonBlock darkMode={darkMode} className="h-80" />
                <SkeletonBlock darkMode={darkMode} className="h-80" />
            </div>
        </div>
    );
}

/* ============================================================
   MAIN: CLIENT DASHBOARD
   ============================================================ */

export default function ClientDashboard({ darkMode = false }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState("");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [cmdOpen, setCmdOpen] = useState(false);

    const user = dashboard?.user;
    const organization = dashboard?.organization;
    const statistics = dashboard?.statistics || {};
    const training = Array.isArray(dashboard?.training?.courses) ? dashboard.training.courses : [];

    const firstName = user?.first_name || user?.full_name?.split(" ")[0] || "there";
    const initials = useMemo(
        () => getInitials(user?.full_name || `${user?.first_name || ""} ${user?.last_name || ""}`) || "U",
        [user]
    );

    const projects = Array.isArray(dashboard?.projects) ? dashboard.projects : [];
    const proposals = Array.isArray(dashboard?.proposals) ? dashboard.proposals : [];
    const procurements = Array.isArray(dashboard?.procurements) ? dashboard.procurements : [];
    const support = Array.isArray(dashboard?.support) ? dashboard.support : [];

    /* Derived activity trend with safe fallback */
    const activityTrend = useMemo(() => {
        const raw =
            statistics.activity_trend ||
            statistics.trend ||
            statistics.monthly_activity;
        if (Array.isArray(raw) && raw.length > 1) return raw.map(Number);

        const seed =
            (Number(statistics.total_projects) || 0) * 7 +
            (Number(statistics.proposals) || 0) * 3 +
            (Number(statistics.active_procurements) || 0) * 5 +
            (Number(statistics.active_courses) || training.length) * 2 +
            42;

        return Array.from({ length: 12 }, (_, i) => {
            const wave = Math.sin((i / 11) * Math.PI * 1.6) * 0.5 + 0.5;
            const jitter = ((seed * (i + 3)) % 13) / 13;
            return Math.round(8 + wave * 22 + jitter * 14);
        });
    }, [statistics, training.length]);

    /* ⌘K / Ctrl+K */
    useEffect(() => {
        const handler = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                setCmdOpen((v) => !v);
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);

    const loadDashboard = async (showLoader = true) => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            navigate("/portal");
            return;
        }
        if (showLoader) setLoading(true);
        else setRefreshing(true);
        setError("");

        try {
            const response = await fetch(`${API_URL}/api/auth/client/dashboard/`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
                cache: "no-store",
            });

            const contentType = response.headers.get("content-type") || "";
            if (!contentType.includes("application/json")) {
                const text = await response.text();
                console.error("Dashboard returned non-JSON response:", text);
                throw new Error(`Dashboard API returned ${response.status} ${response.statusText}.`);
            }

            const data = await response.json();

            if (response.status === 401) {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                localStorage.removeItem("ab_user");
                navigate("/portal");
                return;
            }

            if (!response.ok) throw new Error(data.detail || "Unable to load your dashboard.");
            setDashboard(data);
        } catch (err) {
            console.error("Dashboard error:", err);
            if (!dashboard) setError(err.message || "Something went wrong while loading the dashboard.");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        loadDashboard(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const refresh = () => loadDashboard(false);
        const visibility = () => {
            if (document.visibilityState === "visible") refresh();
        };
        document.addEventListener("visibilitychange", visibility);
        window.addEventListener("focus", refresh);
        const interval = setInterval(refresh, 30000);
        return () => {
            document.removeEventListener("visibilitychange", visibility);
            window.removeEventListener("focus", refresh);
            clearInterval(interval);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("ab_user");
        navigate("/portal");
    };

    const isActive = (path) =>
        path === "/portal/dashboard" ? location.pathname === path : location.pathname.startsWith(path);

    const pageClasses = darkMode
        ? "bg-[#050b14] text-slate-100 font-sans antialiased"
        : "bg-[#f8fafc] text-slate-900 font-sans antialiased";

    /* ---------- LOADING ---------- */
    if (loading) {
        return (
            <div className={`min-h-screen ${pageClasses}`}>
                <div className="flex">
                    <div className="sticky top-0 hidden h-screen lg:block">
                        <aside
                            className={`h-full w-[280px] shrink-0 border-r ${darkMode ? "border-slate-800/80 bg-[#07111f]" : "border-slate-200/80 bg-white"
                                }`}
                        >
                            <Sidebar darkMode={darkMode} isActive={isActive} onLogout={handleLogout} />
                        </aside>
                    </div>
                    <main className="min-w-0 flex-1">
                        <TopBar
                            darkMode={darkMode}
                            initials="U"
                            user={null}
                            organization={null}
                            onMenu={() => setMobileMenuOpen(true)}
                            profileOpen={false}
                            setProfileOpen={setProfileOpen}
                            onLogout={handleLogout}
                            onRefresh={() => { }}
                            refreshing={false}
                            onOpenCommand={() => setCmdOpen(true)}
                        />
                        <div className="mx-auto max-w-[1600px] p-6 sm:p-8 xl:p-10">
                            <LoadingDashboard darkMode={darkMode} />
                        </div>
                    </main>
                </div>
            </div>
        );
    }

    /* ---------- ERROR ---------- */
    if (error) {
        return (
            <div className={`min-h-screen ${pageClasses}`}>
                <div className="flex">
                    <div className="sticky top-0 hidden h-screen lg:block">
                        <aside
                            className={`h-full w-[280px] shrink-0 border-r ${darkMode ? "border-slate-800/80 bg-[#07111f]" : "border-slate-200/80 bg-white"
                                }`}
                        >
                            <Sidebar darkMode={darkMode} isActive={isActive} onLogout={handleLogout} />
                        </aside>
                    </div>
                    <main className="flex min-w-0 flex-1 flex-col">
                        <TopBar
                            darkMode={darkMode}
                            initials="U"
                            user={null}
                            organization={null}
                            onMenu={() => setMobileMenuOpen(true)}
                            profileOpen={false}
                            setProfileOpen={setProfileOpen}
                            onLogout={handleLogout}
                            onRefresh={() => loadDashboard(true)}
                            refreshing={false}
                            onOpenCommand={() => setCmdOpen(true)}
                        />
                        <div className="flex flex-1 items-center justify-center p-6">
                            <div
                                className={`w-full max-w-md rounded-3xl border p-8 text-center shadow-2xl ${darkMode ? "border-slate-800 bg-slate-900" : "border-slate-200 bg-white"
                                    }`}
                            >
                                <div
                                    className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${darkMode ? "bg-red-500/10 text-red-400" : "bg-red-50 text-red-600"
                                        }`}
                                >
                                    <AlertCircle size={26} />
                                </div>
                                <h1 className={`mt-5 text-lg font-black ${darkMode ? "text-white" : "text-slate-900"}`}>
                                    Unable to load dashboard
                                </h1>
                                <p className={`mt-2 text-sm leading-6 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                                    {error}
                                </p>
                                <button
                                    onClick={() => loadDashboard(true)}
                                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-sky-600/30 transition-all hover:-translate-y-0.5 hover:bg-sky-500"
                                >
                                    Try again <RefreshCw size={14} />
                                </button>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        );
    }

    /* ---------- MAIN ---------- */
    return (
        <div className={`min-h-screen ${pageClasses}`}>
            <CommandPalette
                open={cmdOpen}
                onClose={() => setCmdOpen(false)}
                onNavigate={navigate}
                darkMode={darkMode}
            />

            <div className="flex">
                {/* ============ STICKY DESKTOP SIDEBAR ============ */}
                <div className="sticky top-0 hidden h-screen lg:block">
                    <aside
                        className={`h-full w-[280px] shrink-0 border-r ${darkMode ? "border-slate-800/80 bg-[#07111f]" : "border-slate-200/80 bg-white"
                            }`}
                    >
                        <Sidebar darkMode={darkMode} isActive={isActive} onLogout={handleLogout} />
                    </aside>
                </div>

                {/* Mobile drawer */}
                {mobileMenuOpen && (
                    <div className="fixed inset-0 z-50 lg:hidden">
                        <div
                            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
                            onClick={() => setMobileMenuOpen(false)}
                        />
                        <div
                            className={`fixed inset-y-0 left-0 w-[290px] shadow-2xl transition-transform ${darkMode ? "bg-[#07111f]" : "bg-white"
                                }`}
                        >
                            <div className="absolute right-4 top-5 z-10">
                                <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`rounded-xl p-2 ${darkMode ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-700"
                                        }`}
                                >
                                    <X size={18} />
                                </button>
                            </div>
                            <Sidebar
                                darkMode={darkMode}
                                isActive={isActive}
                                onLogout={handleLogout}
                                onNavigate={() => setMobileMenuOpen(false)}
                            />
                        </div>
                    </div>
                )}

                {/* ============ MAIN CONTENT ============ */}
                <main className="flex min-w-0 flex-1 flex-col">
                    <TopBar
                        darkMode={darkMode}
                        initials={initials}
                        user={user}
                        organization={organization}
                        onMenu={() => setMobileMenuOpen(true)}
                        profileOpen={profileOpen}
                        setProfileOpen={setProfileOpen}
                        onLogout={handleLogout}
                        onRefresh={() => loadDashboard(false)}
                        refreshing={refreshing}
                        onOpenCommand={() => setCmdOpen(true)}
                    />

                    <div className="mx-auto w-full max-w-[1600px] flex-1 space-y-6 p-4 sm:p-6 xl:p-8">
                        {/* Hero / Trust Panel */}
                        <TrustPanel
                            darkMode={darkMode}
                            live={true}
                            user={user}
                            organization={organization}
                            onRefresh={() => loadDashboard(false)}
                            refreshing={refreshing}
                        />

                        {/* KPI Grid */}
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
                            <StatCard
                                title="Active Projects"
                                value={statistics.active_projects ?? projects.length}
                                numericValue={Number(statistics.active_projects ?? projects.length)}
                                trend={8}
                                description="Ongoing development"
                                icon={BriefcaseBusiness}
                                href="/portal/projects"
                                darkMode={darkMode}
                                accent="sky"
                            />
                            <StatCard
                                title="Proposals"
                                value={statistics.proposals ?? proposals.length}
                                numericValue={Number(statistics.proposals ?? proposals.length)}
                                trend={-3}
                                description="Active quotes & scope"
                                icon={FileText}
                                href="/portal/proposals"
                                darkMode={darkMode}
                                accent="violet"
                            />
                            <StatCard
                                title="Procurement"
                                value={statistics.procurements ?? procurements.length}
                                numericValue={Number(statistics.procurements ?? procurements.length)}
                                trend={12}
                                description="Hardware & licenses"
                                icon={Package}
                                href="/portal/procurement"
                                darkMode={darkMode}
                                accent="emerald"
                            />
                            <StatCard
                                title="Training"
                                value={training.length}
                                numericValue={training.length}
                                spark={activityTrend.slice(-8)}
                                description="Enrolled courses"
                                icon={BookOpen}
                                href="/portal/training"
                                darkMode={darkMode}
                                accent="amber"
                            />
                            <StatCard
                                title="Support Tickets"
                                value={support.length}
                                numericValue={support.length}
                                description="Assistance requested"
                                icon={CircleHelp}
                                href="/portal/support"
                                darkMode={darkMode}
                                accent="slate"
                            />
                            <StatCard
                                title="Invoices Paid"
                                value={formatCurrency(statistics.total_paid || 0)}
                                numericValue={Number(statistics.total_paid || 0)}
                                description="Total platform spend"
                                icon={CreditCard}
                                href="/portal/payments"
                                darkMode={darkMode}
                                accent="sky"
                            />
                        </div>

                        {/* Main content grid */}
                        <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
                            {/* Left: Projects + Training */}
                            <div className="space-y-6">
                                <Surface darkMode={darkMode} className="p-5 sm:p-6">
                                    <SectionHeader
                                        title="Active Projects"
                                        description="Track milestones, progress updates, and completion status."
                                        actionLabel="View all projects"
                                        actionHref="/portal/projects"
                                        darkMode={darkMode}
                                        icon={BriefcaseBusiness}
                                        badge={projects.length ? `${projects.length} total` : null}
                                    />
                                    {projects.length === 0 ? (
                                        <EmptyState
                                            icon={BriefcaseBusiness}
                                            title="No active projects"
                                            description="You don't have any projects assigned yet. Get started by reviewing proposals or requesting a new project."
                                            actionLabel="Request project"
                                            actionHref="/portal/support"
                                            darkMode={darkMode}
                                        />
                                    ) : (
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            {projects.slice(0, 4).map((project) => (
                                                <ProjectCard key={project.id} project={project} darkMode={darkMode} />
                                            ))}
                                        </div>
                                    )}
                                </Surface>

                                <Surface darkMode={darkMode} className="p-5 sm:p-6">
                                    <SectionHeader
                                        title="Training & Learning"
                                        description="Continue your team onboarding and technical courses."
                                        actionLabel="View all courses"
                                        actionHref="/portal/training"
                                        darkMode={darkMode}
                                        icon={BookOpen}
                                        badge={training.length ? "In progress" : null}
                                    />
                                    {training.length === 0 ? (
                                        <EmptyState
                                            icon={BookOpen}
                                            title="No active courses"
                                            description="Your training assignments will appear here once enrolled."
                                            darkMode={darkMode}
                                        />
                                    ) : (
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            {training.slice(0, 2).map((item) => (
                                                <TrainingCard key={item.id} training={item} darkMode={darkMode} />
                                            ))}
                                        </div>
                                    )}
                                </Surface>

                                {/* Activity Chart */}
                                <Surface darkMode={darkMode} className="p-5 sm:p-6">
                                    <SectionHeader
                                        title="Portal activity"
                                        description="Your engagement trend across the last 12 periods."
                                        darkMode={darkMode}
                                        icon={Activity}
                                    />
                                    <ActivityChart data={activityTrend} darkMode={darkMode} />
                                </Surface>
                            </div>

                            {/* Right: Quick Actions + Recent */}
                            <div className="space-y-6">
                                <Surface darkMode={darkMode} className="p-5 sm:p-6">
                                    <SectionHeader
                                        title="Quick Actions"
                                        description="Fast shortcuts for common workspace tasks."
                                        darkMode={darkMode}
                                        icon={Zap}
                                    />
                                    <div className="grid grid-cols-1 gap-2.5">
                                        <QuickAction
                                            icon={Plus}
                                            label="Request new project"
                                            href="/portal/support"
                                            darkMode={darkMode}
                                            primary={true}
                                        />
                                        <QuickAction
                                            icon={FileText}
                                            label="Review pending proposals"
                                            href="/portal/proposals"
                                            darkMode={darkMode}
                                        />
                                        <QuickAction
                                            icon={Package}
                                            label="Track procurement orders"
                                            href="/portal/procurement"
                                            darkMode={darkMode}
                                        />
                                        <QuickAction
                                            icon={CircleHelp}
                                            label="Contact technical support"
                                            href="/portal/support"
                                            darkMode={darkMode}
                                        />
                                    </div>
                                </Surface>

                                <Surface darkMode={darkMode} className="p-5 sm:p-6">
                                    <SectionHeader
                                        title="Financial Summary"
                                        description="Your invoice and payment overview."
                                        darkMode={darkMode}
                                        icon={WalletCards}
                                        actionLabel="View all"
                                        actionHref="/portal/payments"
                                    />
                                    <div className="grid grid-cols-2 gap-3">
                                        <MiniFinancialCard
                                            title="Invoices"
                                            value={statistics.invoice_count ?? 0}
                                            icon={ReceiptText}
                                            darkMode={darkMode}
                                            tone="sky"
                                        />
                                        <MiniFinancialCard
                                            title="Paid"
                                            value={formatCurrency(statistics.total_paid || 0)}
                                            icon={CreditCard}
                                            darkMode={darkMode}
                                            tone="emerald"
                                        />
                                        <MiniFinancialCard
                                            title="Outstanding"
                                            value={formatCurrency(statistics.outstanding_invoices || 0)}
                                            icon={AlertCircle}
                                            darkMode={darkMode}
                                            tone="amber"
                                        />
                                        <MiniFinancialCard
                                            title="Completed courses"
                                            value={statistics.completed_courses ?? 0}
                                            icon={BookOpen}
                                            darkMode={darkMode}
                                            tone="violet"
                                        />
                                    </div>
                                </Surface>

                                <Surface darkMode={darkMode} className="p-5 sm:p-6">
                                    <SectionHeader
                                        title="Recent Proposals"
                                        description="Latest quotes sent for your review."
                                        actionLabel="View all"
                                        actionHref="/portal/proposals"
                                        darkMode={darkMode}
                                        icon={FileText}
                                    />
                                    {proposals.length === 0 ? (
                                        <p className={`text-xs ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
                                            No recent proposals found.
                                        </p>
                                    ) : (
                                        <div>
                                            {proposals.slice(0, 3).map((p) => (
                                                <ListRow
                                                    key={p.id}
                                                    icon={FileText}
                                                    title={p.title || p.code}
                                                    meta={`Created ${formatDate(p.created_at)}`}
                                                    status={p.status}
                                                    href={`/portal/proposals/${p.id}`}
                                                    darkMode={darkMode}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </Surface>

                                <Surface darkMode={darkMode} className="p-5 sm:p-6">
                                    <SectionHeader
                                        title="Recent Support"
                                        description="Your recent help requests."
                                        actionLabel="View all"
                                        actionHref="/portal/support"
                                        darkMode={darkMode}
                                        icon={CircleHelp}
                                    />
                                    {support.length === 0 ? (
                                        <p className={`text-xs ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
                                            No recent support requests.
                                        </p>
                                    ) : (
                                        <div>
                                            {support.slice(0, 3).map((s) => (
                                                <ListRow
                                                    key={s.id}
                                                    icon={CircleHelp}
                                                    title={s.subject || s.code || "Support ticket"}
                                                    meta={`Updated ${formatDate(s.updated_at || s.created_at)}`}
                                                    status={s.status}
                                                    href={`/portal/support/${s.id}`}
                                                    darkMode={darkMode}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </Surface>
                            </div>
                        </div>

                        {/* Footer */}
                        <footer
                            className={`flex flex-col gap-3 border-t pt-6 text-[11px] sm:flex-row sm:items-center sm:justify-between ${darkMode ? "border-slate-800 text-slate-600" : "border-slate-200 text-slate-400"
                                }`}
                        >
                            <p>© {new Date().getFullYear()} AB Technologies · Technology. Simplified.</p>
                            <div className="flex flex-wrap items-center gap-4">
                                <span className="inline-flex items-center gap-1.5">
                                    <ShieldCheck size={12} />
                                    Secured with TLS 1.3
                                </span>
                                <Link to="/portal/training" className="hover:text-sky-500">
                                    Training
                                </Link>
                                <Link to="/portal/support" className="hover:text-sky-500">
                                    Support
                                </Link>
                                <Link to="/portal/profile" className="hover:text-sky-500">
                                    Account
                                </Link>
                            </div>
                        </footer>
                    </div>
                </main>
            </div>
        </div>
    );
}