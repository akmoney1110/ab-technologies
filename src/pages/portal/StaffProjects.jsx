// src/pages/staff/StaffProjects.jsx

import React, {
    Component,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import {
    Activity,
    AlertCircle,
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
    BadgeCheck,
    Check,
    CheckCircle2,
    ChevronDown,
    ChevronRight,
    Circle,
    Clock3,
    Code2,
    Copy,
    Download,
    ExternalLink,
    File,
    FileImage,
    FileText,
    Filter,
    FolderKanban,
    Globe,
    Grid3x3,
    Image as ImageIcon,
    Info,
    Layers,
    Layers3,
    LayoutList,
    Loader2,
    Lock,
    Mail,
    MapPin,
    Moon,
    Package,
    Palette,
    Phone,
    RefreshCw,
    Rocket,
    Search,
    Server,
    ShieldCheck,
    Smartphone,
    Sparkles,
    Sun,
    Target,
    TrendingUp,
    Upload,
    UserRound,
    Users,
    X,
    Zap,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const API_URL = (
    import.meta.env.VITE_API_URL ||
    "http://127.0.0.1:8000"
).replace(/\/$/, "");


/* ============================================================
   CONSTANTS
============================================================ */

const PROJECT_STATUSES = ["accepted", "completed"];

const MILESTONE_STATUSES = ["pending", "in_progress", "completed"];


/* ============================================================
   AUTH / API HELPERS
============================================================ */

function getToken() {
    return (
        localStorage.getItem("access_token") ||
        localStorage.getItem("access") ||
        localStorage.getItem("token") ||
        ""
    );
}

function getApiHeaders({ token, json = false } = {}) {
    const headers = {};
    if (token) headers.Authorization = `Bearer ${token}`;
    if (json) headers["Content-Type"] = "application/json";
    return headers;
}

async function parseResponse(response) {
    const contentType = response.headers.get("content-type") || "";
    if (contentType.toLowerCase().includes("application/json")) {
        try {
            return await response.json();
        } catch {
            return { detail: "The server returned invalid JSON." };
        }
    }
    try {
        const text = await response.text();
        return { detail: text || `Server returned HTTP ${response.status}.` };
    } catch {
        return { detail: `Server returned HTTP ${response.status}.` };
    }
}

function getApiErrorMessage(data, fallback = "An unexpected error occurred.") {
    if (!data) return fallback;
    if (typeof data === "string") return data;
    if (typeof data.detail === "string" && data.detail.trim()) return data.detail;
    if (typeof data.message === "string" && data.message.trim()) return data.message;
    if (typeof data.error === "string" && data.error.trim()) return data.error;
    if (typeof data === "object") {
        const messages = [];
        Object.entries(data).forEach(([field, value]) => {
            if (Array.isArray(value)) {
                value.forEach((item) => {
                    if (typeof item === "string") {
                        messages.push(`${field}: ${item}`);
                    }
                });
            } else if (typeof value === "string") {
                messages.push(`${field}: ${value}`);
            }
        });
        if (messages.length) return messages.join(" ");
    }
    return fallback;
}


/* ============================================================
   GENERAL HELPERS
============================================================ */

function formatCurrency(value) {
    if (value === null || value === undefined || value === "") return "—";
    const number = Number(value);
    if (Number.isNaN(number)) return String(value);
    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0,
    }).format(number);
}

function formatDate(value) {
    if (!value) return "—";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "—";
    return date.toLocaleDateString("en-NG", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

function formatDateTime(value) {
    if (!value) return "—";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "—";
    return date.toLocaleString("en-NG", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
    });
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

function normalizeStatus(status) {
    return String(status || "pending")
        .trim()
        .toLowerCase()
        .replace(/[\s-]+/g, "_");
}

function getStatusLabel(status) {
    switch (normalizeStatus(status)) {
        case "completed":
        case "complete":
        case "done":
            return "Completed";
        case "in_progress":
            return "In Progress";
        case "pending":
            return "Pending";
        case "accepted":
            return "Accepted";
        case "draft":
            return "Draft";
        case "submitted":
            return "Submitted";
        case "reviewed":
            return "Reviewed";
        case "approved":
            return "Approved";
        default:
            return status || "Unknown";
    }
}

function isCompletedStatus(status) {
    return ["completed", "complete", "done"].includes(normalizeStatus(status));
}

function isProjectStatus(status) {
    return PROJECT_STATUSES.includes(normalizeStatus(status));
}

function normalizeArray(value) {
    if (Array.isArray(value)) return value;
    if (Array.isArray(value?.results)) return value.results;
    if (Array.isArray(value?.data)) return value.data;
    if (Array.isArray(value?.items)) return value.items;
    return [];
}

function normalizeMilestones(milestones) {
    if (!Array.isArray(milestones)) return [];
    return milestones.map((milestone, index) => {
        const safe =
            milestone && typeof milestone === "object"
                ? { ...milestone }
                : { title: String(milestone ?? "") };
        if (!safe.id) safe.id = index + 1;
        safe.status = normalizeStatus(safe.status);
        return safe;
    });
}

function normalizeProject(project) {
    if (!project || typeof project !== "object") {
        return { id: null, milestones: [] };
    }
    const normalized = {
        ...project,
        milestones: normalizeMilestones(project.milestones),
    };
    if (isCompletedStatus(normalized.status)) {
        normalized.status = "completed";
        normalized.progress = 100;
    }
    return normalized;
}


/* ============================================================
   PROGRESS
============================================================ */

function getProgress(project) {
    if (isCompletedStatus(project?.status)) return 100;
    if (typeof project?.progress === "number") {
        return Math.max(0, Math.min(100, project.progress));
    }
    const milestones = normalizeMilestones(project?.milestones);
    if (milestones.length === 0) return 0;
    const completed = milestones.filter((m) =>
        isCompletedStatus(m.status)
    ).length;
    return Math.round((completed / milestones.length) * 100);
}

function getCompletedMilestones(project) {
    return normalizeMilestones(project?.milestones).filter((m) =>
        isCompletedStatus(m.status)
    ).length;
}

function areAllMilestonesCompleted(milestones) {
    const normalized = normalizeMilestones(milestones);
    return (
        normalized.length > 0 &&
        normalized.every((m) => isCompletedStatus(m.status))
    );
}


/* ============================================================
   FILE HELPERS
============================================================ */

function getFileName(file) {
    if (file?.original_name) return file.original_name;
    if (file?.name) return file.name;
    if (file?.filename) return file.filename;
    if (typeof file?.file === "string") {
        return file.file.split("/").pop() || "Uploaded file";
    }
    if (file?.file && typeof file.file === "object") {
        return file.file.name || file.file.original_name || "Uploaded file";
    }
    return "Uploaded file";
}

function getFileUrl(file) {
    let raw =
        file?.url ||
        file?.file_url ||
        file?.download_url ||
        file?.path ||
        "";
    if (!raw && typeof file?.file === "string") raw = file.file;
    if (!raw && file?.file && typeof file.file === "object") {
        raw = file.file.url || file.file.path || "";
    }
    if (!raw || typeof raw !== "string") return "";
    if (/^https?:\/\//i.test(raw)) return raw;
    return `${API_URL}${raw.startsWith("/") ? "" : "/"}${raw}`;
}

function getFileMimeType(file) {
    return String(
        file?.mime_type || file?.content_type || file?.file?.type || ""
    ).toLowerCase();
}

function isImageFile(file) {
    const type = getFileMimeType(file);
    if (type.startsWith("image/")) return true;
    return /\.(jpg|jpeg|png|gif|webp|svg|bmp|avif|heic|heif)$/i.test(
        getFileName(file)
    );
}

function isPdfFile(file) {
    if (getFileMimeType(file) === "application/pdf") return true;
    return getFileName(file).toLowerCase().endsWith(".pdf");
}

function isVideoFile(file) {
    const type = getFileMimeType(file);
    if (type.startsWith("video/")) return true;
    return /\.(mp4|webm|mov|avi|mkv)$/i.test(getFileName(file));
}

function getFileTypeLabel(file) {
    const type = normalizeStatus(file?.file_type);
    const labels = {
        logo: "Logo",
        image: "Image",
        document: "Document",
        video: "Video",
        brand_guideline: "Brand Guideline",
        content: "Content",
        other: "File",
    };
    return labels[type] || file?.file_type || "File";
}


/* ============================================================
   STATUS THEME
============================================================ */

function statusTheme(status, darkMode) {
    const normalized = normalizeStatus(status);

    if (normalized === "completed") {
        return {
            chip: darkMode
                ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/25"
                : "bg-emerald-50 text-emerald-700 border-emerald-200",
            dot: "bg-emerald-500",
            bar: "bg-gradient-to-r from-emerald-500 to-teal-500",
            glow: "bg-emerald-500/20",
        };
    }
    if (normalized === "accepted" || normalized === "in_progress") {
        return {
            chip: darkMode
                ? "bg-sky-500/10 text-sky-300 border-sky-500/25"
                : "bg-sky-50 text-sky-700 border-sky-200",
            dot: "bg-sky-500",
            bar: "bg-gradient-to-r from-sky-500 to-indigo-500",
            glow: "bg-sky-500/20",
        };
    }
    if (normalized === "submitted" || normalized === "reviewed") {
        return {
            chip: darkMode
                ? "bg-amber-500/10 text-amber-300 border-amber-500/25"
                : "bg-amber-50 text-amber-700 border-amber-200",
            dot: "bg-amber-500",
            bar: "bg-amber-500",
            glow: "bg-amber-500/20",
        };
    }
    return {
        chip: darkMode
            ? "bg-slate-800/60 text-slate-400 border-slate-700"
            : "bg-slate-100 text-slate-600 border-slate-200",
        dot: "bg-slate-400",
        bar: "bg-slate-400",
        glow: "bg-slate-500/20",
    };
}


/* ============================================================
   ERROR BOUNDARY
============================================================ */

class ProjectDetailsErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    componentDidCatch(error, info) {
        console.error("PROJECT DETAILS RENDER ERROR:", error);
        console.error("PROJECT DETAILS ERROR INFO:", info);
    }
    handleRetry = () => this.setState({ hasError: false, error: null });
    render() {
        if (this.state.hasError) {
            return (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-5 backdrop-blur-sm">
                    <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-7 shadow-2xl">
                        <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                                <AlertCircle size={22} />
                            </div>
                            <div className="min-w-0">
                                <h2 className="text-lg font-black text-slate-900">
                                    Project screen error
                                </h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    The project details could not be rendered.
                                </p>
                            </div>
                        </div>
                        <div className="mt-5 rounded-2xl bg-red-50 p-4">
                            <pre className="whitespace-pre-wrap break-words text-xs leading-6 text-red-700">
                                {this.state.error?.message ||
                                    "Unknown rendering error"}
                            </pre>
                        </div>
                        <div className="mt-5 flex flex-wrap gap-2">
                            <button
                                type="button"
                                onClick={this.handleRetry}
                                className="rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/30 transition-all hover:-translate-y-0.5"
                            >
                                Try again
                            </button>
                            <button
                                type="button"
                                onClick={() => window.location.reload()}
                                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50"
                            >
                                Reload page
                            </button>
                        </div>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}


/* ============================================================
   STATUS BADGE
============================================================ */

function StatusBadge({ status, darkMode }) {
    const theme = statusTheme(status, darkMode);
    const normalized = normalizeStatus(status);
    return (
        <span
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${theme.chip}`}
        >
            {normalized === "completed" ? (
                <CheckCircle2 size={11} />
            ) : (
                <span className={`h-1.5 w-1.5 rounded-full ${theme.dot}`} />
            )}
            {getStatusLabel(status)}
        </span>
    );
}


/* ============================================================
   COUNT UP
============================================================ */

function CountUp({ value, duration = 900 }) {
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

    return <>{Math.round(display).toLocaleString()}</>;
}


/* ============================================================
   PROJECT CARD
============================================================ */

function ProjectCard({ project, onOpen, darkMode }) {
    const safe = normalizeProject(project);
    const progress = getProgress(safe);
    const completed = getCompletedMilestones(safe);
    const total = safe.milestones.length;
    const projectCompleted = isCompletedStatus(safe.status);
    const theme = statusTheme(safe.status, darkMode);
    const projectId = safe.id;

    return (
        <button
            type="button"
            onClick={() => onOpen(safe)}
            className={`group relative w-full overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300 hover:-translate-y-1 ${darkMode
                    ? "border-white/[0.07] bg-white/[0.025] hover:border-white/[0.14] hover:shadow-2xl hover:shadow-black/40"
                    : "border-slate-200 bg-white shadow-sm hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/60"
                }`}
        >
            {/* Top accent bar */}
            <div
                className={`absolute left-0 right-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 ${projectCompleted
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                        : "bg-gradient-to-r from-cyan-500 to-indigo-500"
                    }`}
            />

            {/* Header */}
            <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-start gap-3">
                    <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 transition-transform duration-300 group-hover:scale-105 ${projectCompleted
                                ? darkMode
                                    ? "bg-emerald-400/10 text-emerald-300 ring-emerald-400/20"
                                    : "bg-emerald-50 text-emerald-600 ring-emerald-100"
                                : darkMode
                                    ? "bg-cyan-400/10 text-cyan-300 ring-cyan-400/20"
                                    : "bg-cyan-50 text-cyan-600 ring-cyan-100"
                            }`}
                    >
                        <FolderKanban size={20} />
                    </div>

                    <div className="min-w-0">
                        <div
                            className={`font-mono text-[10px] font-black uppercase tracking-widest ${darkMode ? "text-slate-500" : "text-slate-400"
                                }`}
                        >
                            {safe.project_code ||
                                safe.code ||
                                String(projectId || "")
                                    .slice(0, 8)
                                    .toUpperCase()}
                        </div>
                        <h3
                            className={`mt-1 truncate text-base font-black tracking-tight ${darkMode ? "text-white" : "text-slate-900"
                                }`}
                        >
                            {safe.title || safe.name || "Untitled Project"}
                        </h3>
                        <p
                            className={`mt-0.5 truncate text-xs font-bold ${darkMode ? "text-slate-500" : "text-slate-500"
                                }`}
                        >
                            {safe.client ||
                                safe.lead_name ||
                                "Client not specified"}
                        </p>
                    </div>
                </div>

                <StatusBadge status={safe.status} darkMode={darkMode} />
            </div>

            {/* Progress */}
            <div className="mt-5">
                <div className="mb-2 flex items-center justify-between">
                    <span
                        className={`text-[11px] font-black uppercase tracking-wider ${darkMode ? "text-slate-500" : "text-slate-400"
                            }`}
                    >
                        Project progress
                    </span>
                    <span
                        className={`text-sm font-black ${darkMode ? "text-white" : "text-slate-900"
                            }`}
                    >
                        {progress}%
                    </span>
                </div>
                <div
                    className={`h-2 overflow-hidden rounded-full ${darkMode ? "bg-white/[0.06]" : "bg-slate-100"
                        }`}
                >
                    <div
                        className={`h-full rounded-full transition-all duration-1000 ${theme.bar}`}
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Stats */}
            <div
                className={`mt-5 grid grid-cols-2 gap-3 border-t pt-4 ${darkMode ? "border-white/[0.06]" : "border-slate-100"
                    }`}
            >
                <div>
                    <div
                        className={`text-[10px] font-black uppercase tracking-wider ${darkMode ? "text-slate-500" : "text-slate-400"
                            }`}
                    >
                        Milestones
                    </div>
                    <div
                        className={`mt-1 text-sm font-black ${darkMode ? "text-slate-200" : "text-slate-800"
                            }`}
                    >
                        {completed} / {total}
                    </div>
                </div>
                <div>
                    <div
                        className={`text-[10px] font-black uppercase tracking-wider ${darkMode ? "text-slate-500" : "text-slate-400"
                            }`}
                    >
                        Project value
                    </div>
                    <div
                        className={`mt-1 text-sm font-black ${darkMode ? "text-slate-200" : "text-slate-800"
                            }`}
                    >
                        {formatCurrency(safe.value ?? safe.total_price)}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-4 flex items-center justify-between gap-3">
                <span
                    className={`inline-flex items-center gap-1.5 text-[11px] font-bold ${darkMode ? "text-slate-500" : "text-slate-400"
                        }`}
                >
                    <Clock3 size={11} />
                    {projectCompleted
                        ? `Completed ${formatDate(
                            safe.completed_at || safe.updated_at
                        )}`
                        : `Accepted ${formatDate(safe.accepted_at)}`}
                </span>
                <span
                    className={`inline-flex items-center gap-1 text-xs font-black transition-colors ${darkMode
                            ? "text-cyan-300 group-hover:text-cyan-200"
                            : "text-cyan-600 group-hover:text-cyan-700"
                        }`}
                >
                    View project
                    <ArrowRight
                        size={13}
                        className="transition-transform group-hover:translate-x-0.5"
                    />
                </span>
            </div>
        </button>
    );
}


/* ============================================================
   MILESTONE ROW
============================================================ */

function MilestoneRow({
    milestone,
    onStatusChange,
    updating,
    projectCompleted,
    darkMode,
}) {
    const safe = milestone || {};
    const status = normalizeStatus(safe.status);
    const completed = isCompletedStatus(status);
    const inProgress = status === "in_progress";
    const disabled = updating || projectCompleted;

    return (
        <div
            className={`rounded-2xl border p-4 transition-all ${completed
                    ? darkMode
                        ? "border-emerald-500/20 bg-emerald-500/[0.04]"
                        : "border-emerald-100 bg-emerald-50/40"
                    : darkMode
                        ? "border-white/[0.07] bg-white/[0.02]"
                        : "border-slate-200 bg-white"
                }`}
        >
            <div className="flex items-start gap-4">
                <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ring-1 ${completed
                            ? darkMode
                                ? "bg-emerald-500/15 text-emerald-300 ring-emerald-500/20"
                                : "bg-emerald-100 text-emerald-600 ring-emerald-200"
                            : inProgress
                                ? darkMode
                                    ? "bg-cyan-500/15 text-cyan-300 ring-cyan-500/20"
                                    : "bg-cyan-100 text-cyan-600 ring-cyan-200"
                                : darkMode
                                    ? "bg-white/[0.05] text-slate-500 ring-white/[0.06]"
                                    : "bg-slate-100 text-slate-400 ring-slate-200"
                        }`}
                >
                    {completed ? (
                        <Check size={17} />
                    ) : inProgress ? (
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
                        </span>
                    ) : (
                        <Circle size={15} />
                    )}
                </div>

                <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                            <div
                                className={`font-mono text-[10px] font-black uppercase tracking-widest ${darkMode
                                        ? "text-slate-500"
                                        : "text-slate-400"
                                    }`}
                            >
                                Milestone #{safe.id}
                            </div>
                            <h4
                                className={`mt-1 text-sm font-black tracking-tight ${darkMode
                                        ? "text-white"
                                        : "text-slate-900"
                                    }`}
                            >
                                {safe.title ||
                                    safe.name ||
                                    "Untitled Milestone"}
                            </h4>
                        </div>

                        <StatusBadge status={safe.status} darkMode={darkMode} />
                    </div>

                    {safe.description && (
                        <p
                            className={`mt-2 text-sm leading-6 ${darkMode ? "text-slate-400" : "text-slate-500"
                                }`}
                        >
                            {safe.description}
                        </p>
                    )}

                    <div className="mt-4">
                        <label
                            className={`mb-1.5 block text-[10px] font-black uppercase tracking-wider ${darkMode ? "text-slate-500" : "text-slate-400"
                                }`}
                        >
                            {projectCompleted
                                ? "Project completed"
                                : "Update status"}
                        </label>

                        <div className="relative max-w-xs">
                            <select
                                value={
                                    MILESTONE_STATUSES.includes(status)
                                        ? status
                                        : "pending"
                                }
                                disabled={disabled}
                                onChange={(event) =>
                                    onStatusChange(
                                        safe.id,
                                        event.target.value
                                    )
                                }
                                className={`w-full appearance-none rounded-xl border px-3 py-2.5 pr-9 text-sm font-bold outline-none transition disabled:cursor-not-allowed disabled:opacity-60 ${darkMode
                                        ? "border-white/[0.08] bg-white/[0.03] text-slate-200 focus:border-cyan-400/40"
                                        : "border-slate-200 bg-white text-slate-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                                    }`}
                            >
                                <option value="pending">Pending</option>
                                <option value="in_progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>

                            {updating ? (
                                <Loader2
                                    size={16}
                                    className={`absolute right-3 top-3 animate-spin ${darkMode
                                            ? "text-slate-400"
                                            : "text-slate-400"
                                        }`}
                                />
                            ) : (
                                <ChevronDown
                                    size={16}
                                    className={`pointer-events-none absolute right-3 top-3 ${darkMode
                                            ? "text-slate-500"
                                            : "text-slate-400"
                                        }`}
                                />
                            )}
                        </div>

                        {projectCompleted && (
                            <div
                                className={`mt-2 inline-flex items-center gap-1.5 text-[11px] font-black ${darkMode
                                        ? "text-emerald-300"
                                        : "text-emerald-600"
                                    }`}
                            >
                                <Lock size={11} />
                                This project is completed — milestones are locked
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}


/* ============================================================
   CONTENT FIELD
============================================================ */

function ContentField({ label, value, children }) {
    const hasValue =
        value !== null &&
        value !== undefined &&
        (typeof value === "object"
            ? Object.keys(value || {}).length > 0
            : String(value).trim() !== "");

    return (
        <div>
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                {label}
            </div>
            <div className="mt-1.5 text-sm leading-6 text-slate-700">
                {children !== undefined ? (
                    children
                ) : hasValue ? (
                    typeof value === "object" ? (
                        <pre className="whitespace-pre-wrap break-words font-sans">
                            {JSON.stringify(value, null, 2)}
                        </pre>
                    ) : (
                        value
                    )
                ) : (
                    <span className="text-slate-400">Not provided</span>
                )}
            </div>
        </div>
    );
}


/* ============================================================
   COLOR CARD
============================================================ */

function ColorCard({ label, value, darkMode }) {
    const valid = typeof value === "string" && value.trim() !== "";

    return (
        <div
            className={`rounded-xl border p-3 transition-all hover:-translate-y-0.5 ${darkMode
                    ? "border-white/[0.07] bg-white/[0.02] hover:border-white/[0.14]"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                }`}
        >
            <div className="flex items-center gap-3">
                <div
                    className={`h-10 w-10 shrink-0 rounded-lg shadow-sm ring-1 ${darkMode ? "ring-white/[0.06]" : "ring-slate-200"
                        }`}
                    style={{
                        backgroundColor: valid ? value : "#e2e8f0",
                    }}
                />
                <div className="min-w-0">
                    <div
                        className={`text-[10px] font-black uppercase tracking-wider ${darkMode ? "text-slate-500" : "text-slate-400"
                            }`}
                    >
                        {label}
                    </div>
                    <div
                        className={`mt-0.5 truncate font-mono text-xs font-black ${darkMode ? "text-slate-300" : "text-slate-700"
                            }`}
                    >
                        {valid ? value : "—"}
                    </div>
                </div>
            </div>
        </div>
    );
}


/* ============================================================
   CLIENT FILE CARD
============================================================ */

function ClientFileCard({ file, onPreview, darkMode }) {
    const url = getFileUrl(file);
    const image = isImageFile(file);
    const video = isVideoFile(file);
    const pdf = isPdfFile(file);
    const name = getFileName(file);

    return (
        <div
            className={`group overflow-hidden rounded-2xl border transition-all hover:-translate-y-1 ${darkMode
                    ? "border-white/[0.07] bg-white/[0.025] hover:border-white/[0.14] hover:shadow-2xl hover:shadow-black/40"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-lg"
                }`}
        >
            <div
                className={`aspect-[16/10] overflow-hidden ${darkMode ? "bg-slate-900" : "bg-slate-100"
                    }`}
            >
                {image && url ? (
                    <button
                        type="button"
                        onClick={() => onPreview(file)}
                        className="block h-full w-full"
                    >
                        <img
                            src={url}
                            alt={name}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            onError={(event) => {
                                event.currentTarget.style.display = "none";
                            }}
                        />
                    </button>
                ) : video && url ? (
                    <video
                        src={url}
                        controls
                        preload="metadata"
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full flex-col items-center justify-center px-4 text-center">
                        {pdf ? (
                            <FileText size={35} className="text-red-500" />
                        ) : (
                            <File
                                size={35}
                                className={
                                    darkMode ? "text-slate-500" : "text-slate-400"
                                }
                            />
                        )}
                        <div
                            className={`mt-2 max-w-full truncate text-xs font-bold ${darkMode ? "text-slate-400" : "text-slate-500"
                                }`}
                        >
                            {name}
                        </div>
                    </div>
                )}
            </div>

            <div className="p-3">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <div
                            className={`truncate text-sm font-black ${darkMode ? "text-slate-200" : "text-slate-800"
                                }`}
                        >
                            {name}
                        </div>

                        <div className="mt-1 flex flex-wrap items-center gap-1.5">
                            <span
                                className={`rounded-full border px-2 py-0.5 text-[9px] font-black uppercase tracking-wider ${darkMode
                                        ? "border-white/[0.08] bg-white/[0.04] text-slate-400"
                                        : "border-slate-200 bg-slate-100 text-slate-600"
                                    }`}
                            >
                                {getFileTypeLabel(file)}
                            </span>

                            {file?.uploaded_at && (
                                <span
                                    className={`text-[10px] font-bold ${darkMode
                                            ? "text-slate-500"
                                            : "text-slate-400"
                                        }`}
                                >
                                    {formatDate(file.uploaded_at)}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {file?.description && (
                    <p
                        className={`mt-2 line-clamp-2 text-xs leading-5 ${darkMode ? "text-slate-500" : "text-slate-500"
                            }`}
                    >
                        {file.description}
                    </p>
                )}

                {url && (
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                        {(image || video) && (
                            <button
                                type="button"
                                onClick={() => onPreview(file)}
                                className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[10px] font-black uppercase tracking-wider transition-colors ${darkMode
                                        ? "border-white/[0.08] text-slate-300 hover:bg-white/[0.05]"
                                        : "border-slate-200 text-slate-700 hover:bg-slate-50"
                                    }`}
                            >
                                <ImageIcon size={12} />
                                Preview
                            </button>
                        )}

                        <a
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                            className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[10px] font-black uppercase tracking-wider transition-colors ${darkMode
                                    ? "border-white/[0.08] text-slate-300 hover:bg-white/[0.05]"
                                    : "border-slate-200 text-slate-700 hover:bg-slate-50"
                                }`}
                        >
                            <ExternalLink size={12} />
                            Open
                        </a>

                        <a
                            href={url}
                            download={name}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 px-2.5 py-1.5 text-[10px] font-black uppercase tracking-wider text-white shadow-md shadow-cyan-500/30 transition-all hover:-translate-y-0.5"
                        >
                            <Download size={12} />
                            Download
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}


/* ============================================================
   FILE PREVIEW MODAL
============================================================ */

function FilePreviewModal({ file, onClose, darkMode }) {
    useEffect(() => {
        if (!file) return undefined;
        const handler = (event) => {
            if (event.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [file, onClose]);

    if (!file) return null;

    const url = getFileUrl(file);
    const image = isImageFile(file);
    const video = isVideoFile(file);

    return (
        <div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
        >
            <div
                className={`relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-2xl border shadow-2xl ${darkMode
                        ? "border-white/[0.08] bg-[#0b1826]"
                        : "border-slate-200 bg-white"
                    }`}
            >
                <div
                    className={`flex items-center justify-between gap-4 border-b px-5 py-4 ${darkMode ? "border-white/[0.08]" : "border-slate-100"
                        }`}
                >
                    <div className="min-w-0">
                        <div
                            className={`truncate text-sm font-black ${darkMode ? "text-white" : "text-slate-900"
                                }`}
                        >
                            {getFileName(file)}
                        </div>
                        <div
                            className={`text-[10px] font-black uppercase tracking-wider ${darkMode ? "text-slate-500" : "text-slate-400"
                                }`}
                        >
                            {getFileTypeLabel(file)}
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close preview"
                        className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${darkMode
                                ? "text-slate-400 hover:bg-white/10 hover:text-white"
                                : "text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                            }`}
                    >
                        <X size={18} />
                    </button>
                </div>

                <div
                    className={`max-h-[calc(90vh-65px)] overflow-auto p-4 ${darkMode ? "bg-black/60" : "bg-slate-950"
                        }`}
                >
                    {image && url ? (
                        <img
                            src={url}
                            alt={getFileName(file)}
                            className="mx-auto max-h-[75vh] max-w-full rounded-lg object-contain"
                        />
                    ) : video && url ? (
                        <video
                            src={url}
                            controls
                            autoPlay
                            className="mx-auto max-h-[75vh] max-w-full rounded-lg"
                        />
                    ) : (
                        <div className="py-20 text-center text-white">
                            <FileText
                                size={45}
                                className="mx-auto text-slate-400"
                            />
                            <p className="mt-4 text-sm text-slate-300">
                                Preview is not available for this file.
                            </p>
                            {url && (
                                <a
                                    href={url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/30"
                                >
                                    <ExternalLink size={15} />
                                    Open file
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}


/* ============================================================
   CLIENT CONTENT PANEL
============================================================ */

function ClientContentPanel({ content, onPreview, darkMode }) {
    if (!content || typeof content !== "object") {
        return (
            <div
                className={`relative overflow-hidden rounded-2xl border border-dashed p-12 text-center ${darkMode
                        ? "border-slate-800 bg-slate-900/30"
                        : "border-slate-300 bg-white"
                    }`}
            >
                <div
                    className={`pointer-events-none absolute -top-20 left-1/2 h-40 w-72 -translate-x-1/2 rounded-full blur-3xl ${darkMode ? "bg-cyan-400/10" : "bg-cyan-100/60"
                        }`}
                />
                <div
                    className={`relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ring-1 ${darkMode
                            ? "bg-gradient-to-br from-cyan-400/15 to-cyan-400/5 text-cyan-300 ring-cyan-400/20"
                            : "bg-gradient-to-br from-cyan-50 to-cyan-100/60 text-cyan-600 ring-cyan-100"
                        }`}
                >
                    <Palette size={28} />
                </div>
                <h3
                    className={`relative mt-4 text-base font-black ${darkMode ? "text-white" : "text-slate-900"
                        }`}
                >
                    No client content submitted
                </h3>
                <p
                    className={`relative mx-auto mt-2 max-w-md text-sm leading-6 ${darkMode ? "text-slate-400" : "text-slate-500"
                        }`}
                >
                    The client has not submitted project content, brand
                    information, or uploads for this project yet.
                </p>
            </div>
        );
    }

    const files = Array.isArray(content.files) ? content.files : [];
    const additionalContent =
        content.additional_content &&
            typeof content.additional_content === "object" &&
            !Array.isArray(content.additional_content)
            ? content.additional_content
            : {};

    return (
        <div className="space-y-5">
            {/* Submission header */}
            <section
                className={`rounded-2xl border p-5 sm:p-6 ${darkMode
                        ? "border-white/[0.07] bg-white/[0.025]"
                        : "border-slate-200 bg-white shadow-sm"
                    }`}
            >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <div
                            className={`text-[10px] font-black uppercase tracking-wider ${darkMode ? "text-slate-500" : "text-slate-400"
                                }`}
                        >
                            Client submission
                        </div>
                        <h3
                            className={`mt-1 text-lg font-black ${darkMode ? "text-white" : "text-slate-900"
                                }`}
                        >
                            Project Content
                        </h3>
                        <p
                            className={`mt-1 text-sm ${darkMode ? "text-slate-400" : "text-slate-500"
                                }`}
                        >
                            All information and assets supplied by the client.
                        </p>
                    </div>

                    <StatusBadge status={content.status} darkMode={darkMode} />
                </div>

                <div
                    className={`mt-5 grid gap-4 border-t pt-5 sm:grid-cols-3 ${darkMode ? "border-white/[0.06]" : "border-slate-100"
                        }`}
                >
                    <ContentField label="Submitted">
                        <span
                            className={
                                darkMode ? "text-slate-300" : "text-slate-700"
                            }
                        >
                            {formatDateTime(content.submitted_at)}
                        </span>
                    </ContentField>

                    <ContentField label="Reviewed">
                        <span
                            className={
                                darkMode ? "text-slate-300" : "text-slate-700"
                            }
                        >
                            {formatDateTime(content.reviewed_at)}
                        </span>
                    </ContentField>

                    <ContentField label="Last updated">
                        <span
                            className={
                                darkMode ? "text-slate-300" : "text-slate-700"
                            }
                        >
                            {formatDateTime(content.updated_at)}
                        </span>
                    </ContentField>
                </div>
            </section>

            {/* Brand identity */}
            <section
                className={`rounded-2xl border p-5 sm:p-6 ${darkMode
                        ? "border-white/[0.07] bg-white/[0.025]"
                        : "border-slate-200 bg-white shadow-sm"
                    }`}
            >
                <div className="flex items-center gap-2.5">
                    <div
                        className={`flex h-8 w-8 items-center justify-center rounded-lg ${darkMode
                                ? "bg-cyan-400/10 text-cyan-300"
                                : "bg-cyan-50 text-cyan-600"
                            }`}
                    >
                        <Palette size={15} />
                    </div>
                    <h3
                        className={`text-base font-black ${darkMode ? "text-white" : "text-slate-900"
                            }`}
                    >
                        Brand Identity
                    </h3>
                </div>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                    <ContentField
                        label="Brand name"
                        value={content.brand_name}
                    />
                    <ContentField label="Tagline" value={content.tagline} />
                    <ContentField
                        label="Font family"
                        value={content.font_family}
                    />
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                    <ColorCard
                        label="Primary"
                        value={content.primary_color}
                        darkMode={darkMode}
                    />
                    <ColorCard
                        label="Secondary"
                        value={content.secondary_color}
                        darkMode={darkMode}
                    />
                    <ColorCard
                        label="Accent"
                        value={content.accent_color}
                        darkMode={darkMode}
                    />
                    <ColorCard
                        label="Background"
                        value={content.background_color}
                        darkMode={darkMode}
                    />
                    <ColorCard
                        label="Text"
                        value={content.text_color}
                        darkMode={darkMode}
                    />
                </div>
            </section>

            {/* Company & project info */}
            <section
                className={`rounded-2xl border p-5 sm:p-6 ${darkMode
                        ? "border-white/[0.07] bg-white/[0.025]"
                        : "border-slate-200 bg-white shadow-sm"
                    }`}
            >
                <div className="flex items-center gap-2.5">
                    <div
                        className={`flex h-8 w-8 items-center justify-center rounded-lg ${darkMode
                                ? "bg-indigo-400/10 text-indigo-300"
                                : "bg-indigo-50 text-indigo-600"
                            }`}
                    >
                        <UserRound size={15} />
                    </div>
                    <h3
                        className={`text-base font-black ${darkMode ? "text-white" : "text-slate-900"
                            }`}
                    >
                        Company & Project Information
                    </h3>
                </div>

                <div className="mt-5 space-y-5">
                    <ContentField
                        label="Company description"
                        value={content.company_description}
                    />
                    <ContentField
                        label="About"
                        value={content.about_content}
                    />
                    <div className="grid gap-5 sm:grid-cols-2">
                        <ContentField
                            label="Mission"
                            value={content.mission}
                        />
                        <ContentField
                            label="Vision"
                            value={content.vision}
                        />
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section
                className={`rounded-2xl border p-5 sm:p-6 ${darkMode
                        ? "border-white/[0.07] bg-white/[0.025]"
                        : "border-slate-200 bg-white shadow-sm"
                    }`}
            >
                <div className="flex items-center gap-2.5">
                    <div
                        className={`flex h-8 w-8 items-center justify-center rounded-lg ${darkMode
                                ? "bg-sky-400/10 text-sky-300"
                                : "bg-sky-50 text-sky-600"
                            }`}
                    >
                        <Globe size={15} />
                    </div>
                    <h3
                        className={`text-base font-black ${darkMode ? "text-white" : "text-slate-900"
                            }`}
                    >
                        Contact Information
                    </h3>
                </div>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                    <ContentField label="Email">
                        {content.email ? (
                            <a
                                href={`mailto:${content.email}`}
                                className={`inline-flex items-center gap-2 font-bold hover:underline ${darkMode
                                        ? "text-cyan-300"
                                        : "text-cyan-600"
                                    }`}
                            >
                                <Mail size={14} />
                                {content.email}
                            </a>
                        ) : (
                            <span className="text-slate-400">
                                Not provided
                            </span>
                        )}
                    </ContentField>

                    <ContentField label="Phone">
                        {content.phone ? (
                            <a
                                href={`tel:${content.phone}`}
                                className={`inline-flex items-center gap-2 font-bold hover:underline ${darkMode
                                        ? "text-cyan-300"
                                        : "text-cyan-600"
                                    }`}
                            >
                                <Phone size={14} />
                                {content.phone}
                            </a>
                        ) : (
                            <span className="text-slate-400">
                                Not provided
                            </span>
                        )}
                    </ContentField>

                    <ContentField label="Website">
                        {content.website ? (
                            <a
                                href={content.website}
                                target="_blank"
                                rel="noreferrer"
                                className={`inline-flex items-center gap-2 font-bold hover:underline ${darkMode
                                        ? "text-cyan-300"
                                        : "text-cyan-600"
                                    }`}
                            >
                                <Globe size={14} />
                                {content.website}
                            </a>
                        ) : (
                            <span className="text-slate-400">
                                Not provided
                            </span>
                        )}
                    </ContentField>

                    <ContentField label="Address">
                        {content.address ? (
                            <span className="inline-flex items-start gap-2">
                                <MapPin
                                    size={14}
                                    className={`mt-1 shrink-0 ${darkMode
                                            ? "text-slate-500"
                                            : "text-slate-400"
                                        }`}
                                />
                                <span
                                    className={
                                        darkMode
                                            ? "text-slate-300"
                                            : "text-slate-700"
                                    }
                                >
                                    {content.address}
                                </span>
                            </span>
                        ) : (
                            <span className="text-slate-400">
                                Not provided
                            </span>
                        )}
                    </ContentField>
                </div>

                <div
                    className={`mt-5 border-t pt-5 ${darkMode ? "border-white/[0.06]" : "border-slate-100"
                        }`}
                >
                    <ContentField
                        label="Additional contact information"
                        value={content.contact_information}
                    />
                </div>
            </section>

            {/* Additional content */}
            <section
                className={`rounded-2xl border p-5 sm:p-6 ${darkMode
                        ? "border-white/[0.07] bg-white/[0.025]"
                        : "border-slate-200 bg-white shadow-sm"
                    }`}
            >
                <div className="flex items-center gap-2.5">
                    <div
                        className={`flex h-8 w-8 items-center justify-center rounded-lg ${darkMode
                                ? "bg-violet-400/10 text-violet-300"
                                : "bg-violet-50 text-violet-600"
                            }`}
                    >
                        <FileText size={15} />
                    </div>
                    <h3
                        className={`text-base font-black ${darkMode ? "text-white" : "text-slate-900"
                            }`}
                    >
                        Additional Content
                    </h3>
                </div>

                <div className="mt-5">
                    {Object.keys(additionalContent).length > 0 ? (
                        <div className="space-y-3">
                            {Object.entries(additionalContent).map(
                                ([key, value]) => (
                                    <div
                                        key={key}
                                        className={`rounded-xl border p-4 ${darkMode
                                                ? "border-white/[0.06] bg-white/[0.02]"
                                                : "border-slate-200 bg-slate-50"
                                            }`}
                                    >
                                        <div
                                            className={`text-[10px] font-black uppercase tracking-wider ${darkMode
                                                    ? "text-slate-500"
                                                    : "text-slate-400"
                                                }`}
                                        >
                                            {key.replace(/_/g, " ")}
                                        </div>
                                        <div
                                            className={`mt-1.5 whitespace-pre-wrap break-words text-sm leading-6 ${darkMode
                                                    ? "text-slate-300"
                                                    : "text-slate-700"
                                                }`}
                                        >
                                            {typeof value === "object"
                                                ? JSON.stringify(value, null, 2)
                                                : String(value ?? "")}
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    ) : (
                        <p
                            className={`text-sm ${darkMode ? "text-slate-500" : "text-slate-400"
                                }`}
                        >
                            No additional structured content provided.
                        </p>
                    )}
                </div>

                {content.notes && (
                    <div
                        className={`mt-5 border-t pt-5 ${darkMode
                                ? "border-white/[0.06]"
                                : "border-slate-100"
                            }`}
                    >
                        <ContentField
                            label="Client notes"
                            value={content.notes}
                        />
                    </div>
                )}
            </section>

            {/* Uploads */}
            <section
                className={`rounded-2xl border p-5 sm:p-6 ${darkMode
                        ? "border-white/[0.07] bg-white/[0.025]"
                        : "border-slate-200 bg-white shadow-sm"
                    }`}
            >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-2.5">
                        <div
                            className={`flex h-8 w-8 items-center justify-center rounded-lg ${darkMode
                                    ? "bg-amber-400/10 text-amber-300"
                                    : "bg-amber-50 text-amber-600"
                                }`}
                        >
                            <Upload size={15} />
                        </div>
                        <div>
                            <h3
                                className={`text-base font-black ${darkMode ? "text-white" : "text-slate-900"
                                    }`}
                            >
                                Client Uploads
                            </h3>
                            <p
                                className={`mt-0.5 text-xs ${darkMode
                                        ? "text-slate-500"
                                        : "text-slate-500"
                                    }`}
                            >
                                Files supplied by the client
                            </p>
                        </div>
                    </div>

                    <span
                        className={`inline-flex shrink-0 items-center rounded-full border px-3 py-1.5 text-[10px] font-black uppercase tracking-wider ${darkMode
                                ? "border-white/[0.08] bg-white/[0.04] text-slate-400"
                                : "border-slate-200 bg-slate-100 text-slate-600"
                            }`}
                    >
                        {files.length} {files.length === 1 ? "file" : "files"}
                    </span>
                </div>

                {files.length === 0 ? (
                    <div
                        className={`mt-5 rounded-2xl border border-dashed p-10 text-center ${darkMode
                                ? "border-slate-800 bg-slate-900/30"
                                : "border-slate-300 bg-slate-50"
                            }`}
                    >
                        <FileImage
                            size={32}
                            className={`mx-auto ${darkMode ? "text-slate-600" : "text-slate-300"
                                }`}
                        />
                        <p
                            className={`mt-3 text-sm font-bold ${darkMode ? "text-slate-400" : "text-slate-500"
                                }`}
                        >
                            No client files uploaded.
                        </p>
                    </div>
                ) : (
                    <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {files.map((file, index) => (
                            <ClientFileCard
                                key={file?.id || `${getFileName(file)}-${index}`}
                                file={file}
                                onPreview={onPreview}
                                darkMode={darkMode}
                            />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}


/* ============================================================
   PROJECT DETAILS DRAWER
============================================================ */

function ProjectDetails({ project, onClose, onProjectUpdate, darkMode }) {
    const [detailProject, setDetailProject] = useState(() =>
        normalizeProject(project)
    );
    const [loadingDetail, setLoadingDetail] = useState(true);
    const [detailError, setDetailError] = useState("");
    const [updatingMilestone, setUpdatingMilestone] = useState(null);
    const [activeTab, setActiveTab] = useState("overview");
    const [previewFile, setPreviewFile] = useState(null);
    const requestIdRef = useRef(0);

    useEffect(() => {
        setDetailProject(normalizeProject(project));
        setDetailError("");
        setActiveTab("overview");
        setPreviewFile(null);
    }, [project.id]);

    const loadDetail = useCallback(async () => {
        const currentRequestId = ++requestIdRef.current;
        setLoadingDetail(true);
        setDetailError("");
        const controller = new AbortController();

        try {
            const token = getToken();
            if (!token) throw new Error("Your session has expired. Please sign in again.");
            if (!project?.id) throw new Error("This project does not have a valid ID.");

            const response = await fetch(
                `${API_URL}/api/projects/staff/${project.id}/`,
                {
                    method: "GET",
                    cache: "no-store",
                    signal: controller.signal,
                    headers: getApiHeaders({ token }),
                }
            );

            const data = await parseResponse(response);

            if (currentRequestId !== requestIdRef.current) return;
            if (!response.ok) {
                throw new Error(
                    getApiErrorMessage(
                        data,
                        `Unable to load project details. HTTP ${response.status}.`
                    )
                );
            }

            setDetailProject(normalizeProject(data));
        } catch (error) {
            if (error?.name === "AbortError") return;
            if (currentRequestId !== requestIdRef.current) return;
            setDetailError(error?.message || "Unable to load project details.");
        } finally {
            if (currentRequestId === requestIdRef.current) {
                setLoadingDetail(false);
            }
        }

        return () => controller.abort();
    }, [project.id]);

    useEffect(() => {
        let active = true;
        const run = async () => {
            if (active) await loadDetail();
        };
        run();
        return () => {
            active = false;
            requestIdRef.current += 1;
        };
    }, [loadDetail]);

    useEffect(() => {
        const handler = (event) => {
            if (event.key === "Escape" && !previewFile) onClose();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose, previewFile]);

    const safeDetailProject = normalizeProject(detailProject);
    const milestones = safeDetailProject.milestones;
    const progress = getProgress(safeDetailProject);
    const completed = getCompletedMilestones(safeDetailProject);
    const projectCompleted = isCompletedStatus(safeDetailProject.status);

    const handleStatusChange = async (milestoneId, newStatus) => {
        if (projectCompleted) return;
        if (updatingMilestone !== null) return;
        if (!MILESTONE_STATUSES.includes(newStatus)) return;

        setUpdatingMilestone(milestoneId);

        try {
            const token = getToken();
            if (!token) throw new Error("Your session has expired. Please sign in again.");

            const projectId = safeDetailProject.id;
            if (!projectId) throw new Error("This project does not have a valid ID.");

            const optimisticMilestones = milestones.map((m) =>
                String(m.id) === String(milestoneId)
                    ? { ...m, status: newStatus }
                    : m
            );

            let optimisticProject = {
                ...safeDetailProject,
                milestones: optimisticMilestones,
            };

            if (areAllMilestonesCompleted(optimisticMilestones)) {
                optimisticProject = {
                    ...optimisticProject,
                    status: "completed",
                    progress: 100,
                };
            } else {
                optimisticProject = {
                    ...optimisticProject,
                    progress: getProgress(optimisticProject),
                };
            }

            setDetailProject(optimisticProject);
            onProjectUpdate(optimisticProject);

            const response = await fetch(
                `${API_URL}/api/projects/staff/${projectId}/milestones/${milestoneId}/`,
                {
                    method: "PATCH",
                    headers: getApiHeaders({ token, json: true }),
                    body: JSON.stringify({ status: newStatus }),
                }
            );

            const data = await parseResponse(response);

            if (!response.ok) {
                setDetailProject(safeDetailProject);
                onProjectUpdate(safeDetailProject);
                throw new Error(
                    getApiErrorMessage(data, "Unable to update milestone.")
                );
            }

            let updatedProject = { ...optimisticProject };

            if (data && typeof data === "object" && !Array.isArray(data)) {
                if (Array.isArray(data.milestones)) {
                    updatedProject.milestones = normalizeMilestones(
                        data.milestones
                    );
                }
                if (data.status) updatedProject.status = data.status;
                if (typeof data.progress === "number")
                    updatedProject.progress = data.progress;
                if (data.completed_at)
                    updatedProject.completed_at = data.completed_at;

                if (data.id && String(data.id) === String(projectId)) {
                    updatedProject = {
                        ...updatedProject,
                        ...data,
                        milestones: Array.isArray(data.milestones)
                            ? normalizeMilestones(data.milestones)
                            : updatedProject.milestones,
                    };
                }
            }

            updatedProject = normalizeProject(updatedProject);

            if (areAllMilestonesCompleted(updatedProject.milestones)) {
                updatedProject.status = "completed";
                updatedProject.progress = 100;
            }

            setDetailProject(updatedProject);
            onProjectUpdate(updatedProject);

            await loadDetail();
        } catch (error) {
            console.error("MILESTONE UPDATE ERROR:", error);
            window.alert(error?.message || "Unable to update milestone.");
        } finally {
            setUpdatingMilestone(null);
        }
    };

    const tabs = [
        { id: "overview", label: "Overview", icon: Info },
        {
            id: "milestones",
            label: "Milestones",
            icon: Target,
            count: milestones.length,
        },
        {
            id: "client_content",
            label: "Client Content",
            icon: Palette,
            count: safeDetailProject?.client_content?.files?.length || 0,
        },
    ];

    const theme = statusTheme(safeDetailProject.status, darkMode);

    return (
        <>
            <div
                className={`fixed inset-0 z-50 overflow-y-auto p-3 backdrop-blur-sm sm:p-6 ${darkMode ? "bg-slate-950/70" : "bg-slate-950/40"
                    }`}
                onMouseDown={(event) => {
                    if (event.target === event.currentTarget) onClose();
                }}
            >
                <div
                    className={`mx-auto max-w-6xl overflow-hidden rounded-3xl border shadow-2xl ${darkMode
                            ? "border-white/[0.08] bg-[#020611]"
                            : "border-slate-200 bg-slate-50"
                        }`}
                >
                    {/* Sticky header */}
                    <div
                        className={`sticky top-0 z-20 border-b px-5 py-4 backdrop-blur-xl sm:px-7 ${darkMode
                                ? "border-white/[0.06] bg-[#020611]/95"
                                : "border-slate-200 bg-white/95"
                            }`}
                    >
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex min-w-0 items-center gap-3">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    aria-label="Back to projects"
                                    className={`group flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all ${darkMode
                                            ? "border-white/[0.08] text-slate-400 hover:bg-white/[0.05] hover:text-white"
                                            : "border-slate-200 text-slate-600 hover:bg-slate-50"
                                        }`}
                                >
                                    <ArrowLeft
                                        size={17}
                                        className="transition-transform group-hover:-translate-x-0.5"
                                    />
                                </button>

                                <div className="min-w-0">
                                    <div
                                        className={`font-mono text-[10px] font-black uppercase tracking-widest ${darkMode
                                                ? "text-slate-500"
                                                : "text-slate-400"
                                            }`}
                                    >
                                        {safeDetailProject.project_code ||
                                            safeDetailProject.code ||
                                            String(safeDetailProject.id || "")
                                                .slice(0, 8)
                                                .toUpperCase()}
                                    </div>
                                    <h2
                                        className={`mt-0.5 truncate text-lg font-black tracking-tight ${darkMode
                                                ? "text-white"
                                                : "text-slate-900"
                                            }`}
                                    >
                                        {safeDetailProject.title ||
                                            safeDetailProject.name ||
                                            "Project"}
                                    </h2>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <StatusBadge
                                    status={safeDetailProject.status}
                                    darkMode={darkMode}
                                />

                                <button
                                    type="button"
                                    onClick={loadDetail}
                                    disabled={loadingDetail}
                                    aria-label="Refresh project"
                                    className={`hidden h-10 items-center gap-2 rounded-xl border px-3 text-xs font-bold transition-colors disabled:opacity-60 sm:flex ${darkMode
                                            ? "border-white/[0.08] text-slate-300 hover:bg-white/[0.05]"
                                            : "border-slate-200 text-slate-700 hover:bg-slate-50"
                                        }`}
                                >
                                    <RefreshCw
                                        size={14}
                                        className={
                                            loadingDetail ? "animate-spin" : ""
                                        }
                                    />
                                    Refresh
                                </button>

                                <button
                                    type="button"
                                    onClick={onClose}
                                    aria-label="Close project"
                                    className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${darkMode
                                            ? "text-slate-400 hover:bg-white/10 hover:text-white"
                                            : "text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                                        }`}
                                >
                                    <X size={19} />
                                </button>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="mt-4 flex gap-1 overflow-x-auto">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                const active = activeTab === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${active
                                                ? "bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md shadow-cyan-500/30"
                                                : darkMode
                                                    ? "text-slate-400 hover:bg-white/[0.05] hover:text-white"
                                                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                                            }`}
                                    >
                                        <Icon size={13} />
                                        {tab.label}
                                        {typeof tab.count === "number" &&
                                            tab.count > 0 && (
                                                <span
                                                    className={`rounded-full px-1.5 py-0.5 text-[9px] font-black ${active
                                                            ? "bg-white/20 text-white"
                                                            : darkMode
                                                                ? "bg-white/[0.06] text-slate-400"
                                                                : "bg-slate-100 text-slate-500"
                                                        }`}
                                                >
                                                    {tab.count}
                                                </span>
                                            )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-6 p-5 sm:p-7">
                        {loadingDetail ? (
                            <ProjectDetailsSkeleton darkMode={darkMode} />
                        ) : detailError ? (
                            <div
                                className={`rounded-2xl border p-6 ${darkMode
                                        ? "border-red-500/20 bg-red-500/[0.06]"
                                        : "border-red-200 bg-red-50"
                                    }`}
                            >
                                <div className="flex items-start gap-3">
                                    <div
                                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${darkMode
                                                ? "bg-red-500/15 text-red-300"
                                                : "bg-red-100 text-red-600"
                                            }`}
                                    >
                                        <AlertCircle size={19} />
                                    </div>
                                    <div>
                                        <div
                                            className={`text-sm font-black ${darkMode
                                                    ? "text-red-300"
                                                    : "text-red-800"
                                                }`}
                                        >
                                            Unable to load project details
                                        </div>
                                        <p
                                            className={`mt-1 text-sm leading-6 ${darkMode
                                                    ? "text-red-300/80"
                                                    : "text-red-700"
                                                }`}
                                        >
                                            {detailError}
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={loadDetail}
                                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-500/30 transition-all hover:-translate-y-0.5"
                                >
                                    <RefreshCw size={14} />
                                    Try again
                                </button>
                            </div>
                        ) : (
                            <>
                                {/* OVERVIEW */}
                                {activeTab === "overview" && (
                                    <div className="space-y-6">
                                        {/* Hero card */}
                                        <section
                                            className={`relative overflow-hidden rounded-2xl border ${darkMode
                                                    ? "border-white/[0.07] bg-gradient-to-br from-white/[0.03] via-white/[0.015] to-transparent"
                                                    : "border-slate-200 bg-gradient-to-br from-white via-slate-50/60 to-cyan-50/30 shadow-sm"
                                                }`}
                                        >
                                            <div
                                                className={`pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl ${theme.glow}`}
                                            />

                                            <div className="relative p-5 sm:p-6">
                                                <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                                                    <div className="min-w-0">
                                                        <div
                                                            className={`text-[10px] font-black uppercase tracking-wider ${darkMode
                                                                    ? "text-slate-500"
                                                                    : "text-slate-400"
                                                                }`}
                                                        >
                                                            Client
                                                        </div>
                                                        <div
                                                            className={`mt-1 text-lg font-black ${darkMode
                                                                    ? "text-white"
                                                                    : "text-slate-900"
                                                                }`}
                                                        >
                                                            {safeDetailProject.client ||
                                                                safeDetailProject.lead_name ||
                                                                "Client not specified"}
                                                        </div>
                                                        <div
                                                            className={`mt-1 text-xs font-bold ${darkMode
                                                                    ? "text-slate-500"
                                                                    : "text-slate-500"
                                                                }`}
                                                        >
                                                            {projectCompleted
                                                                ? `Completed ${formatDate(
                                                                    safeDetailProject.completed_at ||
                                                                    safeDetailProject.updated_at
                                                                )}`
                                                                : `Accepted ${formatDate(
                                                                    safeDetailProject.accepted_at
                                                                )}`}
                                                        </div>
                                                    </div>

                                                    <div className="text-left lg:text-right">
                                                        <div
                                                            className={`text-[10px] font-black uppercase tracking-wider ${darkMode
                                                                    ? "text-slate-500"
                                                                    : "text-slate-400"
                                                                }`}
                                                        >
                                                            Project value
                                                        </div>
                                                        <div
                                                            className={`mt-1 bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-2xl font-black text-transparent`}
                                                        >
                                                            {formatCurrency(
                                                                safeDetailProject.value ??
                                                                safeDetailProject.total_price
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div
                                                    className={`mt-6 border-t pt-5 ${darkMode
                                                            ? "border-white/[0.06]"
                                                            : "border-slate-100"
                                                        }`}
                                                >
                                                    <div className="mb-2 flex items-center justify-between">
                                                        <span
                                                            className={`text-[11px] font-black uppercase tracking-wider ${darkMode
                                                                    ? "text-slate-500"
                                                                    : "text-slate-500"
                                                                }`}
                                                        >
                                                            Overall progress
                                                        </span>
                                                        <span
                                                            className={`text-xl font-black ${darkMode
                                                                    ? "text-white"
                                                                    : "text-slate-900"
                                                                }`}
                                                        >
                                                            {progress}%
                                                        </span>
                                                    </div>

                                                    <div
                                                        className={`h-3 overflow-hidden rounded-full ${darkMode
                                                                ? "bg-white/[0.06]"
                                                                : "bg-slate-100"
                                                            }`}
                                                    >
                                                        <div
                                                            className={`h-full rounded-full transition-all duration-1000 ${theme.bar}`}
                                                            style={{
                                                                width: `${progress}%`,
                                                            }}
                                                        />
                                                    </div>

                                                    <div
                                                        className={`mt-2 flex flex-wrap items-center justify-between gap-2 text-[10px] font-black uppercase tracking-wider ${darkMode
                                                                ? "text-slate-500"
                                                                : "text-slate-400"
                                                            }`}
                                                    >
                                                        <span>
                                                            {completed} of{" "}
                                                            {milestones.length}{" "}
                                                            milestones completed
                                                        </span>
                                                        {projectCompleted && (
                                                            <span
                                                                className={`inline-flex items-center gap-1 ${darkMode
                                                                        ? "text-emerald-300"
                                                                        : "text-emerald-600"
                                                                    }`}
                                                            >
                                                                <CheckCircle2 size={10} />
                                                                Project completed
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                        {/* Client summary */}
                                        {safeDetailProject.client_summary && (
                                            <section
                                                className={`rounded-2xl border p-5 sm:p-6 ${darkMode
                                                        ? "border-white/[0.07] bg-white/[0.025]"
                                                        : "border-slate-200 bg-white shadow-sm"
                                                    }`}
                                            >
                                                <div className="flex items-center gap-2.5">
                                                    <div
                                                        className={`flex h-8 w-8 items-center justify-center rounded-lg ${darkMode
                                                                ? "bg-cyan-400/10 text-cyan-300"
                                                                : "bg-cyan-50 text-cyan-600"
                                                            }`}
                                                    >
                                                        <FileText size={15} />
                                                    </div>
                                                    <h3
                                                        className={`text-base font-black ${darkMode
                                                                ? "text-white"
                                                                : "text-slate-900"
                                                            }`}
                                                    >
                                                        Project Summary
                                                    </h3>
                                                </div>

                                                <p
                                                    className={`mt-4 whitespace-pre-wrap break-words text-sm leading-7 ${darkMode
                                                            ? "text-slate-400"
                                                            : "text-slate-600"
                                                        }`}
                                                >
                                                    {safeDetailProject.client_summary}
                                                </p>
                                            </section>
                                        )}

                                        {/* Scope */}
                                        <section
                                            className={`rounded-2xl border p-5 sm:p-6 ${darkMode
                                                    ? "border-white/[0.07] bg-white/[0.025]"
                                                    : "border-slate-200 bg-white shadow-sm"
                                                }`}
                                        >
                                            <div className="flex items-center gap-2.5">
                                                <div
                                                    className={`flex h-8 w-8 items-center justify-center rounded-lg ${darkMode
                                                            ? "bg-indigo-400/10 text-indigo-300"
                                                            : "bg-indigo-50 text-indigo-600"
                                                        }`}
                                                >
                                                    <FolderKanban size={15} />
                                                </div>
                                                <h3
                                                    className={`text-base font-black ${darkMode
                                                            ? "text-white"
                                                            : "text-slate-900"
                                                        }`}
                                                >
                                                    Project Scope
                                                </h3>
                                            </div>

                                            <div className="mt-5 space-y-5">
                                                <ContentField
                                                    label="Scope"
                                                    value={
                                                        safeDetailProject.scope
                                                    }
                                                />
                                                {safeDetailProject.timeline && (
                                                    <div
                                                        className={`border-t pt-5 ${darkMode
                                                                ? "border-white/[0.06]"
                                                                : "border-slate-100"
                                                            }`}
                                                    >
                                                        <ContentField
                                                            label="Timeline"
                                                            value={
                                                                safeDetailProject.timeline
                                                            }
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </section>

                                        <ListSection
                                            title="Deliverables"
                                            icon={<Layers3 size={15} />}
                                            items={safeDetailProject.deliverables}
                                            darkMode={darkMode}
                                        />

                                        <ListSection
                                            title="Features"
                                            icon={<Sparkles size={15} />}
                                            items={safeDetailProject.features}
                                            pills
                                            darkMode={darkMode}
                                        />

                                        {/* Technical scope */}
                                        <section>
                                            <div className="mb-4">
                                                <h3
                                                    className={`text-lg font-black ${darkMode
                                                            ? "text-white"
                                                            : "text-slate-900"
                                                        }`}
                                                >
                                                    Technical Scope
                                                </h3>
                                                <p
                                                    className={`mt-1 text-sm ${darkMode
                                                            ? "text-slate-500"
                                                            : "text-slate-500"
                                                        }`}
                                                >
                                                    Technical requirements
                                                    included in the proposal.
                                                </p>
                                            </div>

                                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                                <TechnicalCard
                                                    icon={<Code2 size={15} />}
                                                    title="Backend"
                                                    value={
                                                        safeDetailProject.backend ??
                                                        safeDetailProject
                                                            .technical_scope
                                                            ?.backend
                                                    }
                                                    darkMode={darkMode}
                                                />
                                                <TechnicalCard
                                                    icon={
                                                        <Smartphone size={15} />
                                                    }
                                                    title="Mobile"
                                                    value={
                                                        safeDetailProject.mobile ??
                                                        safeDetailProject
                                                            .technical_scope
                                                            ?.mobile
                                                    }
                                                    darkMode={darkMode}
                                                />
                                                <TechnicalCard
                                                    icon={<Server size={15} />}
                                                    title="DevOps"
                                                    value={
                                                        safeDetailProject.devops ??
                                                        safeDetailProject
                                                            .technical_scope
                                                            ?.devops
                                                    }
                                                    darkMode={darkMode}
                                                />
                                                <TechnicalCard
                                                    icon={
                                                        <Sparkles size={15} />
                                                    }
                                                    title="Integrations"
                                                    value={
                                                        safeDetailProject.integrations ??
                                                        safeDetailProject
                                                            .technical_scope
                                                            ?.integrations
                                                    }
                                                    darkMode={darkMode}
                                                />
                                            </div>
                                        </section>
                                    </div>
                                )}

                                {/* MILESTONES */}
                                {activeTab === "milestones" && (
                                    <section>
                                        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                                            <div>
                                                <h3
                                                    className={`text-lg font-black ${darkMode
                                                            ? "text-white"
                                                            : "text-slate-900"
                                                        }`}
                                                >
                                                    Milestones
                                                </h3>
                                                <p
                                                    className={`mt-1 text-sm ${darkMode
                                                            ? "text-slate-500"
                                                            : "text-slate-500"
                                                        }`}
                                                >
                                                    {projectCompleted
                                                        ? "This project has been completed. Its milestones are locked."
                                                        : "Update project progress by changing milestone status."}
                                                </p>
                                            </div>

                                            {projectCompleted && (
                                                <div
                                                    className={`inline-flex shrink-0 items-center gap-2 self-start rounded-xl border px-3 py-2 text-[11px] font-black ${darkMode
                                                            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                                                            : "border-emerald-200 bg-emerald-50 text-emerald-700"
                                                        }`}
                                                >
                                                    <CheckCircle2 size={13} />
                                                    Project completed
                                                </div>
                                            )}
                                        </div>

                                        {milestones.length === 0 ? (
                                            <div
                                                className={`rounded-2xl border border-dashed p-12 text-center ${darkMode
                                                        ? "border-slate-800 bg-slate-900/30"
                                                        : "border-slate-300 bg-white"
                                                    }`}
                                            >
                                                <Circle
                                                    size={32}
                                                    className={`mx-auto ${darkMode
                                                            ? "text-slate-600"
                                                            : "text-slate-300"
                                                        }`}
                                                />
                                                <p
                                                    className={`mt-3 text-sm font-bold ${darkMode
                                                            ? "text-slate-400"
                                                            : "text-slate-500"
                                                        }`}
                                                >
                                                    No milestones have been
                                                    added to this project.
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="space-y-3">
                                                {milestones.map((milestone) => (
                                                    <MilestoneRow
                                                        key={milestone.id}
                                                        milestone={milestone}
                                                        updating={
                                                            String(
                                                                updatingMilestone
                                                            ) ===
                                                            String(milestone.id)
                                                        }
                                                        projectCompleted={
                                                            projectCompleted
                                                        }
                                                        onStatusChange={
                                                            handleStatusChange
                                                        }
                                                        darkMode={darkMode}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </section>
                                )}

                                {/* CLIENT CONTENT */}
                                {activeTab === "client_content" && (
                                    <ClientContentPanel
                                        content={
                                            safeDetailProject.client_content
                                        }
                                        onPreview={setPreviewFile}
                                        darkMode={darkMode}
                                    />
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

            {previewFile && (
                <FilePreviewModal
                    file={previewFile}
                    onClose={() => setPreviewFile(null)}
                    darkMode={darkMode}
                />
            )}
        </>
    );
}


/* ============================================================
   LIST SECTION
============================================================ */

function ListSection({ title, icon, items, pills = false, darkMode }) {
    const list = Array.isArray(items) ? items : [];

    return (
        <section
            className={`rounded-2xl border p-5 sm:p-6 ${darkMode
                    ? "border-white/[0.07] bg-white/[0.025]"
                    : "border-slate-200 bg-white shadow-sm"
                }`}
        >
            <div className="flex items-center gap-2.5">
                <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg ${darkMode
                            ? "bg-cyan-400/10 text-cyan-300"
                            : "bg-cyan-50 text-cyan-600"
                        }`}
                >
                    {icon}
                </div>
                <h3
                    className={`text-base font-black ${darkMode ? "text-white" : "text-slate-900"
                        }`}
                >
                    {title}
                </h3>
            </div>

            {list.length ? (
                pills ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {list.map((item, index) => (
                            <span
                                key={index}
                                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold ${darkMode
                                        ? "border-white/[0.08] bg-white/[0.03] text-slate-300"
                                        : "border-slate-200 bg-slate-50 text-slate-700"
                                    }`}
                            >
                                <Sparkles
                                    size={10}
                                    className={
                                        darkMode
                                            ? "text-cyan-400"
                                            : "text-cyan-600"
                                    }
                                />
                                {typeof item === "string"
                                    ? item
                                    : item?.title ||
                                    item?.name ||
                                    JSON.stringify(item)}
                            </span>
                        ))}
                    </div>
                ) : (
                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                        {list.map((item, index) => (
                            <div
                                key={index}
                                className={`flex items-start gap-2 rounded-xl p-3 text-sm ${darkMode
                                        ? "bg-white/[0.02] text-slate-300"
                                        : "bg-slate-50 text-slate-600"
                                    }`}
                            >
                                <CheckCircle2
                                    size={15}
                                    className={`mt-0.5 shrink-0 ${darkMode
                                            ? "text-emerald-400"
                                            : "text-emerald-600"
                                        }`}
                                />
                                <span className="break-words">
                                    {typeof item === "string"
                                        ? item
                                        : item?.title ||
                                        item?.name ||
                                        JSON.stringify(item)}
                                </span>
                            </div>
                        ))}
                    </div>
                )
            ) : (
                <p
                    className={`mt-3 text-sm ${darkMode ? "text-slate-500" : "text-slate-400"
                        }`}
                >
                    No {title.toLowerCase()} listed.
                </p>
            )}
        </section>
    );
}


/* ============================================================
   TECHNICAL CARD
============================================================ */

function TechnicalCard({ icon, title, value, darkMode }) {
    const hasValue =
        value !== null &&
        value !== undefined &&
        (typeof value !== "object"
            ? String(value).trim() !== ""
            : Object.keys(value || {}).length > 0);

    return (
        <div
            className={`rounded-2xl border p-4 transition-all hover:-translate-y-0.5 ${darkMode
                    ? "border-white/[0.07] bg-white/[0.025] hover:border-white/[0.14]"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md"
                }`}
        >
            <div
                className={`flex items-center gap-2 ${darkMode ? "text-cyan-400" : "text-cyan-600"
                    }`}
            >
                {icon}
                <span className="text-[10px] font-black uppercase tracking-wider">
                    {title}
                </span>
            </div>

            <div
                className={`mt-3 whitespace-pre-wrap break-words text-sm leading-6 ${darkMode ? "text-slate-300" : "text-slate-700"
                    }`}
            >
                {hasValue
                    ? typeof value === "string"
                        ? value
                        : JSON.stringify(value, null, 2)
                    : "Not specified"}
            </div>
        </div>
    );
}


/* ============================================================
   EMPTY STATE
============================================================ */

function EmptyState({ search, darkMode }) {
    return (
        <div
            className={`relative overflow-hidden rounded-3xl border border-dashed px-6 py-20 text-center ${darkMode
                    ? "border-slate-800 bg-slate-900/30"
                    : "border-slate-300 bg-white"
                }`}
        >
            <div
                className={`pointer-events-none absolute -top-20 left-1/2 h-56 w-96 -translate-x-1/2 rounded-full blur-3xl ${darkMode ? "bg-cyan-400/10" : "bg-cyan-100/60"
                    }`}
            />

            <div
                className={`relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ring-1 ${darkMode
                        ? "bg-gradient-to-br from-cyan-400/15 to-cyan-400/5 text-cyan-300 ring-cyan-400/20"
                        : "bg-gradient-to-br from-cyan-50 to-cyan-100/60 text-cyan-600 ring-cyan-100"
                    }`}
            >
                <FolderKanban size={28} />
            </div>

            <h3
                className={`relative mt-4 text-lg font-black ${darkMode ? "text-white" : "text-slate-900"
                    }`}
            >
                {search ? "No projects found" : "No projects yet"}
            </h3>

            <p
                className={`relative mx-auto mt-2 max-w-md text-sm leading-6 ${darkMode ? "text-slate-400" : "text-slate-500"
                    }`}
            >
                {search
                    ? "Try changing your search."
                    : "Accepted proposals will appear here as projects."}
            </p>
        </div>
    );
}


/* ============================================================
   STAT CARD
============================================================ */

function StatCard({ icon, label, value, darkMode, accent = "sky" }) {
    const accents = {
        sky: darkMode
            ? "bg-sky-400/10 text-sky-300 ring-sky-400/20"
            : "bg-sky-50 text-sky-600 ring-sky-100",
        amber: darkMode
            ? "bg-amber-400/10 text-amber-300 ring-amber-400/20"
            : "bg-amber-50 text-amber-600 ring-amber-100",
        emerald: darkMode
            ? "bg-emerald-400/10 text-emerald-300 ring-emerald-400/20"
            : "bg-emerald-50 text-emerald-600 ring-emerald-100",
        slate: darkMode
            ? "bg-white/[0.04] text-slate-300 ring-white/[0.06]"
            : "bg-slate-100 text-slate-600 ring-slate-200",
    };

    const glows = {
        sky: "bg-sky-500/20",
        amber: "bg-amber-500/20",
        emerald: "bg-emerald-500/20",
        slate: "bg-slate-500/20",
    };

    return (
        <div
            className={`group relative overflow-hidden rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-1 ${darkMode
                    ? "border-white/[0.07] bg-white/[0.025] hover:border-white/[0.14] hover:shadow-xl hover:shadow-black/30"
                    : "border-slate-200 bg-white shadow-sm hover:border-slate-300 hover:shadow-md"
                }`}
        >
            <div
                className={`pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100 ${glows[accent]
                    }`}
            />

            <div
                className={`relative flex h-10 w-10 items-center justify-center rounded-xl ring-1 transition-transform duration-300 group-hover:scale-110 ${accents[accent]
                    }`}
            >
                {icon}
            </div>

            <div className="relative mt-4">
                <p
                    className={`text-[10px] font-black uppercase tracking-wider ${darkMode ? "text-slate-500" : "text-slate-400"
                        }`}
                >
                    {label}
                </p>
                <p
                    className={`mt-1 text-2xl font-black tracking-tight ${darkMode ? "text-white" : "text-slate-900"
                        }`}
                >
                    <CountUp value={Number(value || 0)} />
                </p>
            </div>
        </div>
    );
}


/* ============================================================
   SKELETON
============================================================ */

function ProjectDetailsSkeleton({ darkMode }) {
    const block = (className) => (
        <div
            className={`animate-pulse rounded-2xl ${darkMode ? "bg-white/[0.03]" : "bg-slate-200/70"
                } ${className}`}
        />
    );

    return (
        <div className="space-y-6">
            {block("h-56")}
            {block("h-40")}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className={`h-32 animate-pulse rounded-2xl ${darkMode ? "bg-white/[0.03]" : "bg-slate-200/70"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}


/* ============================================================
   MAIN
============================================================ */

export default function StaffProjects({ darkMode = false }) {
    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [sort, setSort] = useState("recent");
    const [selectedProject, setSelectedProject] = useState(null);

    const listRequestRef = useRef(0);

    const loadProjects = useCallback(async (isRefresh = false) => {
        const requestId = ++listRequestRef.current;

        if (isRefresh) setRefreshing(true);
        else setLoading(true);

        setError("");

        try {
            const token = getToken();
            if (!token)
                throw new Error(
                    "Your session has expired. Please sign in again."
                );

            const response = await fetch(`${API_URL}/api/projects/staff/`, {
                method: "GET",
                cache: "no-store",
                headers: getApiHeaders({ token }),
            });

            const data = await parseResponse(response);

            if (requestId !== listRequestRef.current) return;
            if (!response.ok) {
                throw new Error(
                    getApiErrorMessage(
                        data,
                        `Unable to load projects. HTTP ${response.status}.`
                    )
                );
            }

            const list = normalizeArray(data).map((item) =>
                normalizeProject(item)
            );
            const projectList = list.filter((project) =>
                isProjectStatus(project.status)
            );

            setProjects(projectList);
        } catch (err) {
            if (requestId !== listRequestRef.current) return;
            console.error("STAFF PROJECT LIST ERROR:", err);
            setError(err?.message || "Unable to load projects.");
        } finally {
            if (requestId === listRequestRef.current) {
                setLoading(false);
                setRefreshing(false);
            }
        }
    }, []);

    useEffect(() => {
        loadProjects();
        return () => {
            listRequestRef.current += 1;
        };
    }, [loadProjects]);

    useEffect(() => {
        const handleFocus = () => loadProjects(true);
        window.addEventListener("focus", handleFocus);
        return () => window.removeEventListener("focus", handleFocus);
    }, [loadProjects]);

    const filteredProjects = useMemo(() => {
        const query = search.trim().toLowerCase();

        const filtered = projects.filter((project) => {
            const status = normalizeStatus(project.status);
            const matchesStatus =
                statusFilter === "all" ||
                (statusFilter === "active" &&
                    status === "accepted" &&
                    getProgress(project) < 100) ||
                (statusFilter === "completed" &&
                    status === "completed") ||
                (statusFilter === "pending" &&
                    getProgress(project) === 0);

            if (!matchesStatus) return false;
            if (!query) return true;

            const title = String(project.title || project.name || "").toLowerCase();
            const client = String(
                project.client || project.lead_name || ""
            ).toLowerCase();
            const code = String(
                project.project_code || project.code || ""
            ).toLowerCase();

            return (
                title.includes(query) ||
                client.includes(query) ||
                code.includes(query)
            );
        });

        const sorted = [...filtered];
        switch (sort) {
            case "progress":
                sorted.sort((a, b) => getProgress(b) - getProgress(a));
                break;
            case "value":
                sorted.sort(
                    (a, b) =>
                        Number(b.value || b.total_price || 0) -
                        Number(a.value || a.total_price || 0)
                );
                break;
            case "name":
                sorted.sort((a, b) =>
                    String(a.title || a.name || "").localeCompare(
                        String(b.title || b.name || "")
                    )
                );
                break;
            case "recent":
            default:
                sorted.sort(
                    (a, b) =>
                        new Date(b.updated_at || b.created_at || 0) -
                        new Date(a.updated_at || a.created_at || 0)
                );
        }

        return sorted;
    }, [projects, search, statusFilter, sort]);

    const statistics = useMemo(() => {
        const total = projects.length;
        const active = projects.filter((project) => {
            const progress = getProgress(project);
            return (
                !isCompletedStatus(project.status) &&
                progress > 0 &&
                progress < 100
            );
        }).length;
        const completed = projects.filter(
            (project) =>
                isCompletedStatus(project.status) ||
                getProgress(project) === 100
        ).length;
        const pending = projects.filter((project) => {
            const progress = getProgress(project);
            return !isCompletedStatus(project.status) && progress === 0;
        }).length;

        return { total, active, completed, pending };
    }, [projects]);

    const updateProject = useCallback((updatedProject) => {
        if (!updatedProject?.id) return;
        const normalized = normalizeProject(updatedProject);

        setProjects((current) =>
            current.map((project) =>
                String(project.id) === String(normalized.id)
                    ? normalizeProject({ ...project, ...normalized })
                    : project
            )
        );

        setSelectedProject((current) =>
            current && String(current.id) === String(normalized.id)
                ? normalizeProject({ ...current, ...normalized })
                : current
        );
    }, []);

    function clearFilters() {
        setSearch("");
        setStatusFilter("all");
        setSort("recent");
    }

    const pageClasses = darkMode
        ? "bg-[#020611] text-white"
        : "bg-slate-50 text-slate-900";

    /* ========================================================
       LOADING
    ======================================================== */
    if (loading) {
        return (
            <div className={`min-h-screen ${pageClasses}`}>
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <StaffProjectsSkeleton darkMode={darkMode} />
                </div>
            </div>
        );
    }

    /* ========================================================
       MAIN
    ======================================================== */
    return (
        <div className={`min-h-screen ${pageClasses}`}>
            <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                {/* BACK + BREADCRUMB */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className={`group inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-bold transition-all ${darkMode
                                    ? "border-white/[0.08] bg-white/[0.03] text-slate-300 hover:border-white/[0.14] hover:bg-white/[0.06]"
                                    : "border-slate-200 bg-white text-slate-600 shadow-sm hover:border-slate-300 hover:bg-slate-50"
                                }`}
                        >
                            <ArrowLeft
                                size={14}
                                className="transition-transform group-hover:-translate-x-0.5"
                            />
                            Back
                        </button>

                        <div
                            className={`hidden items-center gap-2 text-xs sm:flex ${darkMode ? "text-slate-500" : "text-slate-400"
                                }`}
                        >
                            <span
                                className={`font-bold ${darkMode
                                        ? "text-slate-300"
                                        : "text-slate-600"
                                    }`}
                            >
                                Staff Workspace
                            </span>
                            <span>/</span>
                            <span
                                className={`font-bold ${darkMode
                                        ? "text-slate-300"
                                        : "text-slate-600"
                                    }`}
                            >
                                Projects
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => navigate("/staff/procurement")}
                            className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-bold transition-colors ${darkMode
                                    ? "border-white/[0.08] text-slate-400 hover:bg-white/[0.04] hover:text-white"
                                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                                }`}
                        >
                            <Package size={13} />
                            Procurement
                        </button>
                        <button
                            type="button"
                            onClick={() => loadProjects(true)}
                            disabled={refreshing}
                            className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-bold transition-colors ${darkMode
                                    ? "border-white/[0.08] text-slate-400 hover:bg-white/[0.04] hover:text-white"
                                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                                } disabled:opacity-60`}
                        >
                            <RefreshCw
                                size={13}
                                className={
                                    refreshing ? "animate-spin text-cyan-500" : ""
                                }
                            />
                            Refresh
                        </button>
                    </div>
                </div>

                {/* HEADER */}
                <div className="mt-5 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                    <div className="flex items-start gap-4">
                        <div
                            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ring-1 ${darkMode
                                    ? "bg-gradient-to-br from-cyan-400/15 to-indigo-400/10 text-cyan-300 ring-cyan-400/20"
                                    : "bg-gradient-to-br from-cyan-50 to-indigo-50 text-cyan-600 ring-cyan-100"
                                }`}
                        >
                            <FolderKanban size={26} />
                        </div>

                        <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                                <h1
                                    className={`text-2xl font-black tracking-tight sm:text-3xl ${darkMode ? "text-white" : "text-slate-900"
                                        }`}
                                >
                                    Projects
                                </h1>
                                <span
                                    className={`rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${darkMode
                                            ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-300"
                                            : "border-cyan-200 bg-cyan-50 text-cyan-700"
                                        }`}
                                >
                                    {statistics.total}{" "}
                                    {statistics.total === 1 ? "project" : "projects"}
                                </span>
                                <span
                                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${darkMode
                                            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                                            : "border-emerald-200 bg-emerald-50 text-emerald-700"
                                        }`}
                                >
                                    <span className="relative flex h-1.5 w-1.5">
                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                    </span>
                                    Live
                                </span>
                            </div>
                            <p
                                className={`mt-2 max-w-2xl text-sm leading-6 ${darkMode ? "text-slate-400" : "text-slate-500"
                                    }`}
                            >
                                Manage accepted projects, milestones, and client
                                submissions.
                            </p>
                        </div>
                    </div>
                </div>

                {/* STATS */}
                <div className="mt-7 grid grid-cols-2 gap-4 lg:grid-cols-4">
                    <StatCard
                        icon={<FolderKanban size={18} />}
                        label="Total Projects"
                        value={statistics.total}
                        darkMode={darkMode}
                        accent="sky"
                    />
                    <StatCard
                        icon={<Clock3 size={18} />}
                        label="In Progress"
                        value={statistics.active}
                        darkMode={darkMode}
                        accent="amber"
                    />
                    <StatCard
                        icon={<CheckCircle2 size={18} />}
                        label="Completed"
                        value={statistics.completed}
                        darkMode={darkMode}
                        accent="emerald"
                    />
                    <StatCard
                        icon={<Circle size={18} />}
                        label="Not Started"
                        value={statistics.pending}
                        darkMode={darkMode}
                        accent="slate"
                    />
                </div>

                {/* FILTERS */}
                <div
                    className={`sticky top-[76px] z-20 mt-7 rounded-2xl border p-3 backdrop-blur-xl ${darkMode
                            ? "border-white/[0.07] bg-[#020611]/85"
                            : "border-slate-200 bg-white/85"
                        }`}
                >
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                        <div className="relative flex-1">
                            <Search
                                size={17}
                                className={`pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 ${darkMode ? "text-slate-500" : "text-slate-400"
                                    }`}
                            />
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search projects, clients, or project codes..."
                                className={`h-11 w-full rounded-xl border pl-10 pr-10 text-sm outline-none transition-colors ${darkMode
                                        ? "border-white/[0.07] bg-white/[0.025] text-white placeholder:text-slate-600 focus:border-cyan-400/40 focus:bg-white/[0.05]"
                                        : "border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-cyan-400 focus:bg-white"
                                    }`}
                            />
                            {search && (
                                <button
                                    type="button"
                                    onClick={() => setSearch("")}
                                    className={`absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 transition-colors ${darkMode
                                            ? "text-slate-500 hover:bg-white/[0.05] hover:text-white"
                                            : "text-slate-400 hover:bg-slate-100 hover:text-slate-900"
                                        }`}
                                >
                                    <X size={13} />
                                </button>
                            )}
                        </div>

                        <div
                            className={`inline-flex items-center gap-1 rounded-xl border p-1 ${darkMode
                                    ? "border-white/[0.08] bg-white/[0.03]"
                                    : "border-slate-200 bg-slate-50"
                                }`}
                        >
                            {[
                                ["all", "All"],
                                ["active", "Active"],
                                ["pending", "Not started"],
                                ["completed", "Completed"],
                            ].map(([value, label]) => (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => setStatusFilter(value)}
                                    className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${statusFilter === value
                                            ? "bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-sm shadow-cyan-500/30"
                                            : darkMode
                                                ? "text-slate-400 hover:bg-white/[0.05] hover:text-white"
                                                : "text-slate-500 hover:bg-white hover:text-slate-900"
                                        }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>

                        <SortDropdown
                            sort={sort}
                            setSort={setSort}
                            darkMode={darkMode}
                        />

                        {(search ||
                            statusFilter !== "all" ||
                            sort !== "recent") && (
                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2.5 text-xs font-bold transition-colors ${darkMode
                                            ? "border-white/[0.08] bg-white/[0.03] text-slate-300 hover:bg-white/[0.06]"
                                            : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                                        }`}
                                >
                                    <X size={13} />
                                    Clear
                                </button>
                            )}
                    </div>

                    <div
                        className={`mt-3 flex flex-col gap-1 text-xs sm:flex-row sm:items-center sm:justify-between ${darkMode ? "text-slate-500" : "text-slate-400"
                            }`}
                    >
                        <span>
                            Showing{" "}
                            <span
                                className={`font-bold ${darkMode ? "text-slate-300" : "text-slate-600"
                                    }`}
                            >
                                {filteredProjects.length}
                            </span>{" "}
                            of{" "}
                            <span
                                className={`font-bold ${darkMode ? "text-slate-300" : "text-slate-600"
                                    }`}
                            >
                                {projects.length}
                            </span>{" "}
                            projects
                        </span>
                        {(search ||
                            statusFilter !== "all" ||
                            sort !== "recent") && (
                                <span className="inline-flex items-center gap-1">
                                    <Filter size={11} />
                                    Filters active
                                </span>
                            )}
                    </div>
                </div>

                {/* ERROR */}
                {error && (
                    <div
                        className={`mt-6 rounded-2xl border p-4 ${darkMode
                                ? "border-red-500/20 bg-red-500/[0.06]"
                                : "border-red-200 bg-red-50"
                            }`}
                    >
                        <div className="flex items-start gap-3">
                            <div
                                className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${darkMode
                                        ? "bg-red-500/15 text-red-300"
                                        : "bg-red-100 text-red-600"
                                    }`}
                            >
                                <AlertCircle size={16} />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p
                                    className={`font-bold ${darkMode ? "text-red-300" : "text-red-800"
                                        }`}
                                >
                                    Unable to load projects
                                </p>
                                <p
                                    className={`mt-1 text-sm leading-6 ${darkMode ? "text-red-300/80" : "text-red-700"
                                        }`}
                                >
                                    {error}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setError("")}
                                className={`rounded-lg p-1.5 transition ${darkMode
                                        ? "text-red-300 hover:bg-red-500/10"
                                        : "text-red-500 hover:bg-red-100"
                                    }`}
                            >
                                <X size={15} />
                            </button>
                        </div>
                    </div>
                )}

                {/* PROJECTS */}
                {filteredProjects.length === 0 ? (
                    <EmptyState search={search} darkMode={darkMode} />
                ) : (
                    <div className="mt-6 grid gap-4 lg:grid-cols-2">
                        {filteredProjects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onOpen={setSelectedProject}
                                darkMode={darkMode}
                            />
                        ))}
                    </div>
                )}
            </main>

            {/* DRAWER */}
            {selectedProject && (
                <ProjectDetailsErrorBoundary>
                    <ProjectDetails
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                        onProjectUpdate={updateProject}
                        darkMode={darkMode}
                    />
                </ProjectDetailsErrorBoundary>
            )}
        </div>
    );
}


/* ============================================================
   SORT DROPDOWN
============================================================ */

function SortDropdown({ sort, setSort, darkMode }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const listener = (e) => {
            if (!ref.current || ref.current.contains(e.target)) return;
            setOpen(false);
        };
        document.addEventListener("mousedown", listener);
        return () => document.removeEventListener("mousedown", listener);
    }, []);

    const options = [
        { value: "recent", label: "Recently updated" },
        { value: "name", label: "Name (A–Z)" },
        { value: "progress", label: "Progress (high → low)" },
        { value: "value", label: "Value (high → low)" },
    ];

    const currentLabel =
        options.find((o) => o.value === sort)?.label || "Sort";

    return (
        <div ref={ref} className="relative">
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className={`inline-flex w-full items-center justify-between gap-2 rounded-xl border px-3.5 py-2.5 text-xs font-bold transition-colors sm:w-auto ${darkMode
                        ? "border-white/[0.08] bg-white/[0.03] text-slate-300 hover:bg-white/[0.06]"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
            >
                <span className="inline-flex items-center gap-2">
                    <Filter size={13} />
                    {currentLabel}
                </span>
                <ChevronDown
                    size={13}
                    className={`transition-transform ${open ? "rotate-180" : ""}`}
                />
            </button>

            {open && (
                <div
                    className={`absolute right-0 top-12 z-40 w-60 overflow-hidden rounded-xl border p-1.5 shadow-2xl ${darkMode
                            ? "border-slate-800 bg-[#0b1826] shadow-black/50"
                            : "border-slate-200 bg-white shadow-xl"
                        }`}
                >
                    {options.map((opt) => (
                        <button
                            key={opt.value}
                            type="button"
                            onClick={() => {
                                setSort(opt.value);
                                setOpen(false);
                            }}
                            className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium transition-colors ${sort === opt.value
                                    ? darkMode
                                        ? "bg-cyan-400/10 text-cyan-300"
                                        : "bg-cyan-50 text-cyan-700"
                                    : darkMode
                                        ? "text-slate-300 hover:bg-white/[0.05]"
                                        : "text-slate-600 hover:bg-slate-50"
                                }`}
                        >
                            {sort === opt.value && (
                                <CheckCircle2 size={13} className="text-cyan-500" />
                            )}
                            <span className={sort === opt.value ? "" : "ml-[21px]"}>
                                {opt.label}
                            </span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}


/* ============================================================
   TOP-LEVEL SKELETON
============================================================ */

function StaffProjectsSkeleton({ darkMode }) {
    const block = (className) => (
        <div
            className={`animate-pulse rounded-2xl ${darkMode ? "bg-white/[0.03]" : "bg-slate-200/70"
                } ${className}`}
        />
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                {block("h-9 w-24")}
                {block("h-9 w-40")}
            </div>

            <div className="flex items-center gap-4">
                {block("h-14 w-14 rounded-2xl")}
                <div className="space-y-2">
                    {block("h-8 w-52")}
                    {block("h-4 w-80 max-w-full")}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className={`h-28 animate-pulse rounded-2xl ${darkMode ? "bg-white/[0.03]" : "bg-slate-200/70"
                            }`}
                    />
                ))}
            </div>

            <div
                className={`h-20 animate-pulse rounded-2xl ${darkMode ? "bg-white/[0.03]" : "bg-slate-200/70"
                    }`}
            />

            <div className="grid gap-4 lg:grid-cols-2">
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className={`h-64 animate-pulse rounded-2xl ${darkMode ? "bg-white/[0.03]" : "bg-slate-200/70"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}