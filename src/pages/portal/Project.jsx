// src/pages/portal/Projects.jsx

import { useEffect, useMemo, useRef, useState } from "react";
import {
    AlertCircle,
    ArrowRight,
    ArrowUpRight,
    BriefcaseBusiness,
    CalendarDays,
    CheckCircle2,
    ChevronDown,
    Clock3,
    Command,
    Download,
    Filter,
    Flag,
    FolderOpen,
    Grid3x3,
    KanbanSquare,
    Layers,
    LayoutList,
    Milestone,
    Plus,
    RefreshCw,
    Search,
    SlidersHorizontal,
    Sparkles,
    Target,
    TrendingUp,
    User,
    Users,
    X,
    Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const API_URL =
    import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

/* =========================================================
   HELPERS
========================================================= */

function formatDate(value) {
    if (!value) return "Not set";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Not set";
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

function formatRelativeDate(value) {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return formatDate(value);
}

function getStatusLabel(status) {
    if (!status) return "Unknown";
    return String(status)
        .toLowerCase()
        .replace(/_/g, " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function normalizeStatus(status) {
    const value = String(status || "").trim().toLowerCase();
    if (["accepted", "active", "in_progress", "in progress"].includes(value)) return "ACTIVE";
    if (["completed", "complete", "done"].includes(value)) return "COMPLETED";
    if (["cancelled", "canceled"].includes(value)) return "CANCELLED";
    if (["on_hold", "on hold"].includes(value)) return "ON_HOLD";
    if (["planning", "draft", "pending"].includes(value)) return "PLANNING";
    return "PLANNING";
}

function clampProgress(value) {
    const number = Number(value);
    if (Number.isNaN(number)) return 0;
    return Math.min(100, Math.max(0, number));
}

function getMilestones(project) {
    return Array.isArray(project?.milestones) ? project.milestones : [];
}

function isMilestoneCompleted(milestone) {
    return ["completed", "complete", "done"].includes(
        String(milestone?.status || "").trim().toLowerCase()
    );
}

function getProgress(project) {
    if (normalizeStatus(project?.status) === "COMPLETED") return 100;
    if (project?.progress !== undefined) return clampProgress(project.progress);
    const milestones = getMilestones(project);
    if (!milestones.length) return 0;
    const completed = milestones.filter(isMilestoneCompleted).length;
    return Math.round((completed / milestones.length) * 100);
}

function getCompletedMilestones(project) {
    const milestones = getMilestones(project);
    if (normalizeStatus(project?.status) === "COMPLETED") return milestones.length;
    return milestones.filter(isMilestoneCompleted).length;
}

function getProjectCode(project) {
    return (
        project?.code ||
        project?.project_code ||
        `PROJ-${String(project?.id || "").slice(0, 8).toUpperCase()}`
    );
}

function getProjectName(project) {
    return project?.name || project?.title || "Untitled Project";
}

function getProjectDescription(project) {
    return (
        project?.description ||
        project?.client_summary ||
        "Your project information and progress will appear here."
    );
}

function getDeadlineState(project) {
    const raw = project?.expected_completion_date || project?.deadline || project?.due_date;
    if (!raw) return null;
    const deadline = new Date(raw);
    if (Number.isNaN(deadline.getTime())) return null;
    const now = new Date();
    const diffDays = Math.ceil((deadline - now) / 86400000);
    if (diffDays < 0) return { label: "Overdue", tone: "danger", days: diffDays };
    if (diffDays <= 7) return { label: "Due soon", tone: "warning", days: diffDays };
    if (diffDays <= 30) return { label: `${diffDays}d left`, tone: "info", days: diffDays };
    return { label: `${diffDays}d left`, tone: "neutral", days: diffDays };
}

function getPriority(project) {
    const raw = String(project?.priority || project?.urgency || "").toLowerCase();
    if (["urgent", "critical", "high"].includes(raw)) return "high";
    if (["medium", "normal"].includes(raw)) return "medium";
    if (["low"].includes(raw)) return "low";
    return null;
}

/* =========================================================
   STATUS STYLES
========================================================= */

function statusTheme(status, darkMode) {
    switch (normalizeStatus(status)) {
        case "ACTIVE":
            return {
                chip: darkMode
                    ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                    : "border-emerald-200 bg-emerald-50 text-emerald-700",
                dot: "bg-emerald-500",
                bar: "bg-gradient-to-r from-emerald-500 to-teal-500",
                ring: darkMode ? "ring-emerald-400/20" : "ring-emerald-100",
            };
        case "COMPLETED":
            return {
                chip: darkMode
                    ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                    : "border-emerald-200 bg-emerald-50 text-emerald-700",
                dot: "bg-emerald-500",
                bar: "bg-gradient-to-r from-emerald-500 to-teal-500",
                ring: darkMode ? "ring-emerald-400/20" : "ring-emerald-100",
            };
        case "CANCELLED":
            return {
                chip: darkMode
                    ? "border-red-400/30 bg-red-400/10 text-red-300"
                    : "border-red-200 bg-red-50 text-red-700",
                dot: "bg-red-500",
                bar: "bg-red-500",
                ring: darkMode ? "ring-red-400/20" : "ring-red-100",
            };
        case "ON_HOLD":
            return {
                chip: darkMode
                    ? "border-amber-400/30 bg-amber-400/10 text-amber-300"
                    : "border-amber-200 bg-amber-50 text-amber-700",
                dot: "bg-amber-500",
                bar: "bg-amber-500",
                ring: darkMode ? "ring-amber-400/20" : "ring-amber-100",
            };
        default:
            return {
                chip: darkMode
                    ? "border-sky-400/30 bg-sky-400/10 text-sky-300"
                    : "border-sky-200 bg-sky-50 text-sky-700",
                dot: "bg-sky-500",
                bar: "bg-gradient-to-r from-sky-500 to-indigo-500",
                ring: darkMode ? "ring-sky-400/20" : "ring-sky-100",
            };
    }
}

/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({ status, darkMode }) {
    const normalized = normalizeStatus(status);
    const theme = statusTheme(status, darkMode);
    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold tracking-wide ${theme.chip}`}
        >
            {normalized === "COMPLETED" ? (
                <CheckCircle2 size={11} />
            ) : (
                <span className={`h-1.5 w-1.5 rounded-full ${theme.dot}`} />
            )}
            {getStatusLabel(status)}
        </span>
    );
}

/* =========================================================
   SPARKLINE
========================================================= */

function Sparkline({ data, color = "#0ea5e9", height = 28, width = 96 }) {
    const points = useMemo(() => {
        if (!data || data.length < 2) return null;
        const max = Math.max(...data, 1);
        const min = Math.min(...data, 0);
        const range = max - min || 1;
        return data.map((v, i) => {
            const x = (i / (data.length - 1)) * width;
            const y = height - ((v - min) / range) * height;
            return [x, y];
        });
    }, [data, height, width]);

    if (!points) return null;
    const path = points
        .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`)
        .join(" ");
    const area = `${path} L${width},${height} L0,${height} Z`;
    const id = `spark-${color.replace("#", "")}`;
    const last = points[points.length - 1];

    return (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
            <defs>
                <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={color} stopOpacity="0" />
                </linearGradient>
            </defs>
            <polygon points={`${area}`} fill={`url(#${id})`} />
            <polyline
                points={path}
                fill="none"
                stroke={color}
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <circle cx={last[0]} cy={last[1]} r="2.2" fill={color} />
        </svg>
    );
}

/* =========================================================
   PROGRESS RING
========================================================= */

function ProgressRing({ progress, darkMode, size = 44, stroke = 4 }) {
    const clamped = Math.min(Math.max(Number(progress) || 0, 0), 100);
    const r = (size - stroke) / 2;
    const c = 2 * Math.PI * r;
    const isComplete = clamped === 100;

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="-rotate-90">
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={r}
                    fill="none"
                    stroke={darkMode ? "#1e293b" : "#e2e8f0"}
                    strokeWidth={stroke}
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={r}
                    fill="none"
                    stroke={isComplete ? "#10b981" : "#0ea5e9"}
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeDasharray={c}
                    strokeDashoffset={c - (clamped / 100) * c}
                    className="transition-all duration-700"
                />
            </svg>
            <span
                className={`absolute inset-0 flex items-center justify-center text-[10px] font-black ${darkMode ? "text-white" : "text-slate-900"
                    }`}
            >
                {clamped}%
            </span>
        </div>
    );
}

/* =========================================================
   PROJECT CARD
========================================================= */

function ProjectCard({ project, darkMode, view }) {
    const status = normalizeStatus(project.status);
    const isCompleted = status === "COMPLETED";
    const progress = getProgress(project);
    const milestones = getMilestones(project);
    const completed = getCompletedMilestones(project);
    const theme = statusTheme(project.status, darkMode);
    const deadline = getDeadlineState(project);
    const priority = getPriority(project);

    const priorityTheme = {
        high: darkMode
            ? "border-red-400/30 bg-red-400/10 text-red-300"
            : "border-red-200 bg-red-50 text-red-700",
        medium: darkMode
            ? "border-amber-400/30 bg-amber-400/10 text-amber-300"
            : "border-amber-200 bg-amber-50 text-amber-700",
        low: darkMode
            ? "border-slate-500/30 bg-slate-500/10 text-slate-300"
            : "border-slate-200 bg-slate-100 text-slate-600",
    };

    const deadlineTheme = {
        danger: darkMode
            ? "text-red-300 bg-red-400/10 border-red-400/20"
            : "text-red-700 bg-red-50 border-red-200",
        warning: darkMode
            ? "text-amber-300 bg-amber-400/10 border-amber-400/20"
            : "text-amber-700 bg-amber-50 border-amber-200",
        info: darkMode
            ? "text-sky-300 bg-sky-400/10 border-sky-400/20"
            : "text-sky-700 bg-sky-50 border-sky-200",
        neutral: darkMode
            ? "text-slate-400 bg-white/[0.03] border-white/[0.08]"
            : "text-slate-500 bg-slate-50 border-slate-200",
    };

    /* ---------- LIST VIEW ---------- */
    if (view === "list") {
        return (
            <Link
                to={`/portal/projects/${project.id}`}
                className={`group flex items-center gap-5 rounded-2xl border p-4 transition-all duration-300 ${darkMode
                        ? "border-white/[0.07] bg-white/[0.025] hover:-translate-y-0.5 hover:border-cyan-400/20 hover:bg-white/[0.04] hover:shadow-xl hover:shadow-black/30"
                        : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-lg hover:shadow-slate-200/60"
                    }`}
            >
                <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${isCompleted
                            ? darkMode
                                ? "bg-emerald-400/10 text-emerald-300"
                                : "bg-emerald-50 text-emerald-600"
                            : darkMode
                                ? "bg-cyan-400/10 text-cyan-300"
                                : "bg-cyan-50 text-cyan-600"
                        }`}
                >
                    {isCompleted ? <CheckCircle2 size={22} /> : <BriefcaseBusiness size={22} />}
                </div>

                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                        <p
                            className={`font-mono text-[10px] font-bold uppercase tracking-widest ${darkMode ? "text-slate-500" : "text-slate-400"
                                }`}
                        >
                            {getProjectCode(project)}
                        </p>
                        {priority && (
                            <span
                                className={`rounded-md border px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider ${priorityTheme[priority]}`}
                            >
                                {priority}
                            </span>
                        )}
                    </div>
                    <h3
                        className={`mt-1 truncate text-sm font-bold ${darkMode ? "text-white" : "text-slate-900"
                            }`}
                    >
                        {getProjectName(project)}
                    </h3>
                    <p
                        className={`mt-0.5 line-clamp-1 text-[11px] ${darkMode ? "text-slate-500" : "text-slate-400"
                            }`}
                    >
                        {getProjectDescription(project)}
                    </p>
                </div>

                <div className="hidden w-40 shrink-0 sm:block">
                    <div className="mb-1.5 flex items-center justify-between">
                        <span
                            className={`text-[10px] font-semibold ${darkMode ? "text-slate-500" : "text-slate-400"
                                }`}
                        >
                            {completed}/{milestones.length || "—"}
                        </span>
                        <span
                            className={`text-[11px] font-black ${isCompleted
                                    ? "text-emerald-500"
                                    : darkMode
                                        ? "text-cyan-300"
                                        : "text-cyan-600"
                                }`}
                        >
                            {progress}%
                        </span>
                    </div>
                    <div
                        className={`h-1.5 overflow-hidden rounded-full ${darkMode ? "bg-white/[0.07]" : "bg-slate-100"
                            }`}
                    >
                        <div
                            className={`h-full rounded-full transition-all duration-700 ${theme.bar}`}
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                <div className="hidden shrink-0 items-center gap-3 md:flex">
                    <StatusBadge status={project.status} darkMode={darkMode} />
                </div>

                <ArrowUpRight
                    size={16}
                    className={`shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${darkMode ? "text-slate-600" : "text-slate-400"
                        }`}
                />
            </Link>
        );
    }

    /* ---------- GRID / KANBAN VIEW ---------- */
    return (
        <article
            className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${darkMode
                    ? "border-white/[0.07] bg-white/[0.025] hover:border-cyan-400/20 hover:bg-white/[0.04] hover:shadow-2xl hover:shadow-black/40"
                    : "border-slate-200 bg-white hover:border-cyan-200 hover:shadow-xl hover:shadow-slate-200/60"
                }`}
        >
            {/* Top accent bar */}
            <div
                className={`absolute left-0 right-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r transition-transform duration-500 group-hover:scale-x-100 ${isCompleted
                        ? "from-emerald-500 to-teal-500"
                        : "from-cyan-500 to-indigo-500"
                    }`}
            />

            <div className="p-5 sm:p-6">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-start gap-3">
                        <div
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105 ${isCompleted
                                    ? darkMode
                                        ? "bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/20"
                                        : "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100"
                                    : darkMode
                                        ? "bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-400/20"
                                        : "bg-cyan-50 text-cyan-600 ring-1 ring-cyan-100"
                                }`}
                        >
                            {isCompleted ? (
                                <CheckCircle2 size={21} />
                            ) : (
                                <BriefcaseBusiness size={21} />
                            )}
                        </div>

                        <div className="min-w-0">
                            <div className="flex items-center gap-2">
                                <p
                                    className={`font-mono text-[10px] font-bold uppercase tracking-[0.16em] ${darkMode ? "text-slate-500" : "text-slate-400"
                                        }`}
                                >
                                    {getProjectCode(project)}
                                </p>
                                {priority && (
                                    <span
                                        className={`rounded-md border px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider ${priorityTheme[priority]}`}
                                    >
                                        {priority}
                                    </span>
                                )}
                            </div>
                            <h3
                                className={`mt-1 truncate text-base font-bold transition-colors group-hover:text-cyan-500 ${darkMode ? "text-white" : "text-slate-900"
                                    }`}
                            >
                                {getProjectName(project)}
                            </h3>
                        </div>
                    </div>

                    <StatusBadge status={project.status} darkMode={darkMode} />
                </div>

                {/* Description */}
                <p
                    className={`mt-5 line-clamp-2 text-sm leading-6 ${darkMode ? "text-slate-400" : "text-slate-500"
                        }`}
                >
                    {getProjectDescription(project)}
                </p>

                {/* Progress */}
                <div className="mt-6">
                    <div className="mb-2 flex items-center justify-between">
                        <span
                            className={`text-xs font-medium ${darkMode ? "text-slate-400" : "text-slate-500"
                                }`}
                        >
                            {isCompleted ? "Project completed" : "Project progress"}
                        </span>
                        <span
                            className={`text-sm font-black ${isCompleted
                                    ? darkMode
                                        ? "text-emerald-300"
                                        : "text-emerald-600"
                                    : darkMode
                                        ? "text-cyan-300"
                                        : "text-cyan-600"
                                }`}
                        >
                            {progress}%
                        </span>
                    </div>
                    <div
                        className={`h-2 overflow-hidden rounded-full p-0.5 ${darkMode ? "bg-white/[0.07]" : "bg-slate-100"
                            }`}
                    >
                        <div
                            className={`h-full rounded-full transition-all duration-700 ${theme.bar}`}
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Deadline chip + team */}
                {(deadline || project.team_count !== undefined) && (
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                        {deadline && (
                            <span
                                className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[10px] font-bold ${deadlineTheme[deadline.tone]}`}
                            >
                                <CalendarDays size={11} />
                                {deadline.label}
                            </span>
                        )}
                        {project.team_count !== undefined && (
                            <span
                                className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[10px] font-bold ${darkMode
                                        ? "border-white/[0.08] bg-white/[0.03] text-slate-400"
                                        : "border-slate-200 bg-slate-50 text-slate-500"
                                    }`}
                            >
                                <Users size={11} />
                                {project.team_count} on team
                            </span>
                        )}
                    </div>
                )}

                {/* Stats */}
                <div className="mt-6 grid grid-cols-2 gap-3">
                    <MiniStat
                        icon={Milestone}
                        label="Milestones"
                        value={
                            isCompleted
                                ? `${milestones.length}/${milestones.length}`
                                : `${completed}/${milestones.length || 0}`
                        }
                        darkMode={darkMode}
                        tone={isCompleted ? "emerald" : "sky"}
                    />
                    <MiniStat
                        icon={CalendarDays}
                        label={isCompleted ? "Completed" : "Expected"}
                        value={
                            isCompleted
                                ? formatDate(
                                    project.completed_at ||
                                    project.updated_at ||
                                    project.accepted_at
                                )
                                : formatDate(
                                    project.expected_completion_date ||
                                    project.accepted_at
                                )
                        }
                        darkMode={darkMode}
                        tone={isCompleted ? "emerald" : "sky"}
                    />
                </div>

                {/* Footer */}
                <div
                    className={`mt-6 flex items-center justify-between border-t pt-4 ${darkMode ? "border-white/[0.06]" : "border-slate-100"
                        }`}
                >
                    <div
                        className={`flex items-center gap-1.5 text-xs ${darkMode ? "text-slate-500" : "text-slate-400"
                            }`}
                    >
                        <Clock3 size={13} />
                        Updated {formatRelativeDate(project.updated_at)}
                    </div>

                    <Link
                        to={`/portal/projects/${project.id}`}
                        className={`group/btn inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm font-bold transition-colors ${darkMode
                                ? "text-cyan-300 hover:bg-cyan-400/10 hover:text-cyan-200"
                                : "text-cyan-600 hover:bg-cyan-50 hover:text-cyan-700"
                            }`}
                    >
                        View project
                        <ArrowRight
                            size={15}
                            className="transition-transform group-hover/btn:translate-x-0.5"
                        />
                    </Link>
                </div>
            </div>
        </article>
    );
}

/* =========================================================
   MINI STAT
========================================================= */

function MiniStat({ icon: Icon, label, value, darkMode, tone = "sky" }) {
    const tones = {
        sky: darkMode ? "bg-sky-400/10 text-sky-400" : "bg-sky-50 text-sky-600",
        emerald: darkMode
            ? "bg-emerald-400/10 text-emerald-400"
            : "bg-emerald-50 text-emerald-600",
        amber: darkMode
            ? "bg-amber-400/10 text-amber-400"
            : "bg-amber-50 text-amber-600",
    };

    return (
        <div
            className={`rounded-xl border p-3 transition-colors ${darkMode
                    ? "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.1]"
                    : "border-slate-100 bg-slate-50 hover:border-slate-200"
                }`}
        >
            <div className="flex items-center gap-2">
                <div
                    className={`flex h-6 w-6 items-center justify-center rounded-lg ${tones[tone] || tones.sky
                        }`}
                >
                    <Icon size={12} />
                </div>
                <span
                    className={`text-[10px] font-bold uppercase tracking-wide ${darkMode ? "text-slate-500" : "text-slate-400"
                        }`}
                >
                    {label}
                </span>
            </div>
            <p
                className={`mt-2 text-sm font-bold ${darkMode ? "text-slate-200" : "text-slate-700"
                    }`}
            >
                {value}
            </p>
        </div>
    );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyState({ darkMode, filtered, onClear }) {
    return (
        <div
            className={`relative overflow-hidden rounded-3xl border px-6 py-20 text-center ${darkMode
                    ? "border-white/[0.07] bg-white/[0.02]"
                    : "border-slate-200 bg-white"
                }`}
        >
            {/* Ambient glow */}
            <div
                className={`pointer-events-none absolute -top-24 left-1/2 h-56 w-96 -translate-x-1/2 rounded-full blur-3xl ${darkMode ? "bg-cyan-400/10" : "bg-cyan-100/60"
                    }`}
            />

            {/* Floating dots */}
            <div className="pointer-events-none absolute inset-0">
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className={`absolute h-1 w-1 rounded-full ${darkMode ? "bg-cyan-400/30" : "bg-cyan-400/40"
                            }`}
                        style={{
                            left: `${8 + (i * 7) % 90}%`,
                            top: `${15 + (i * 11) % 70}%`,
                            animation: `floatDot ${3 + (i % 3)}s ease-in-out infinite`,
                            animationDelay: `${i * 0.2}s`,
                        }}
                    />
                ))}
            </div>

            <div
                className={`relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${darkMode
                        ? "bg-gradient-to-br from-cyan-400/15 to-cyan-400/5 text-cyan-300 ring-1 ring-cyan-400/20"
                        : "bg-gradient-to-br from-cyan-50 to-cyan-100/60 text-cyan-600 ring-1 ring-cyan-100"
                    }`}
            >
                <FolderOpen size={26} />
            </div>

            <h3
                className={`relative mt-6 text-lg font-black ${darkMode ? "text-white" : "text-slate-900"
                    }`}
            >
                {filtered ? "No projects found" : "No projects yet"}
            </h3>

            <p
                className={`relative mx-auto mt-2 max-w-md text-sm leading-6 ${darkMode ? "text-slate-400" : "text-slate-500"
                    }`}
            >
                {filtered
                    ? "Try adjusting your search or filters to find what you're looking for."
                    : "Accepted projects for your account will appear here once AB Technologies begins delivery."}
            </p>

            <div className="relative mt-6 flex flex-wrap items-center justify-center gap-3">
                {filtered ? (
                    <button
                        type="button"
                        onClick={onClear}
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/30 transition-all hover:-translate-y-0.5 hover:shadow-cyan-500/50"
                    >
                        <X size={15} />
                        Clear filters
                    </button>
                ) : (
                    <Link
                        to="/portal/support"
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/30 transition-all hover:-translate-y-0.5 hover:shadow-cyan-500/50"
                    >
                        <Plus size={15} />
                        Request a project
                    </Link>
                )}
            </div>

            <style>{`
                @keyframes floatDot {
                    0%, 100% { transform: translateY(0); opacity: 0.3; }
                    50% { transform: translateY(-10px); opacity: 1; }
                }
            `}</style>
        </div>
    );
}

/* =========================================================
   SUMMARY CARD
========================================================= */

function SummaryCard({
    label,
    value,
    icon: Icon,
    darkMode,
    accent = "sky",
    spark,
    trend,
}) {
    const accents = {
        sky: darkMode
            ? "bg-sky-400/10 text-sky-400 ring-sky-400/20"
            : "bg-sky-50 text-sky-600 ring-sky-100",
        emerald: darkMode
            ? "bg-emerald-400/10 text-emerald-400 ring-emerald-400/20"
            : "bg-emerald-50 text-emerald-600 ring-emerald-100",
        amber: darkMode
            ? "bg-amber-400/10 text-amber-400 ring-amber-400/20"
            : "bg-amber-50 text-amber-600 ring-amber-100",
        violet: darkMode
            ? "bg-violet-400/10 text-violet-400 ring-violet-400/20"
            : "bg-violet-50 text-violet-600 ring-violet-100",
    };

    const sparkColors = {
        sky: "#0ea5e9",
        emerald: "#10b981",
        amber: "#f59e0b",
        violet: "#8b5cf6",
    };

    return (
        <div
            className={`group relative overflow-hidden rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-0.5 sm:p-5 ${darkMode
                    ? "border-white/[0.07] bg-white/[0.025] hover:border-white/[0.12] hover:bg-white/[0.04]"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50"
                }`}
        >
            <div className="flex items-start justify-between">
                <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ring-1 transition-transform group-hover:scale-110 ${accents[accent]
                        }`}
                >
                    <Icon size={17} />
                </div>

                {typeof trend === "number" && (
                    <span
                        className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-black ${trend >= 0
                                ? darkMode
                                    ? "bg-emerald-400/10 text-emerald-400"
                                    : "bg-emerald-50 text-emerald-600"
                                : darkMode
                                    ? "bg-red-400/10 text-red-400"
                                    : "bg-red-50 text-red-600"
                            }`}
                    >
                        <TrendingUp size={10} className={trend < 0 ? "rotate-180" : ""} />
                        {Math.abs(trend)}%
                    </span>
                )}
            </div>

            <div className="mt-4">
                <p
                    className={`text-[10px] font-black uppercase tracking-[0.14em] ${darkMode ? "text-slate-500" : "text-slate-400"
                        }`}
                >
                    {label}
                </p>
                <p
                    className={`mt-1 text-2xl font-black tracking-tight ${darkMode ? "text-white" : "text-slate-900"
                        }`}
                >
                    {value}
                </p>
            </div>

            {spark && (
                <div className="mt-3">
                    <Sparkline data={spark} color={sparkColors[accent]} width={100} height={24} />
                </div>
            )}
        </div>
    );
}

/* =========================================================
   VIEW TOGGLE
========================================================= */

function ViewToggle({ view, setView, darkMode }) {
    const options = [
        { value: "grid", icon: Grid3x3, label: "Grid" },
        { value: "list", icon: LayoutList, label: "List" },
    ];

    return (
        <div
            className={`inline-flex items-center gap-1 rounded-xl border p-1 ${darkMode
                    ? "border-white/[0.08] bg-white/[0.03]"
                    : "border-slate-200 bg-slate-50"
                }`}
        >
            {options.map(({ value, icon: Icon, label }) => (
                <button
                    key={value}
                    type="button"
                    onClick={() => setView(value)}
                    title={`${label} view`}
                    className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-bold transition-all ${view === value
                            ? "bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-sm shadow-cyan-500/30"
                            : darkMode
                                ? "text-slate-400 hover:bg-white/[0.05] hover:text-white"
                                : "text-slate-500 hover:bg-white hover:text-slate-900"
                        }`}
                >
                    <Icon size={14} />
                    <span className="hidden sm:inline">{label}</span>
                </button>
            ))}
        </div>
    );
}

/* =========================================================
   SORT DROPDOWN
========================================================= */

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
        { value: "deadline", label: "Deadline (soonest)" },
    ];

    const currentLabel =
        options.find((o) => o.value === sort)?.label || "Sort";

    return (
        <div ref={ref} className="relative">
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-xs font-bold transition-colors ${darkMode
                        ? "border-white/[0.08] bg-white/[0.03] text-slate-300 hover:bg-white/[0.06]"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
            >
                <SlidersHorizontal size={14} />
                <span className="hidden sm:inline">{currentLabel}</span>
                <ChevronDown
                    size={13}
                    className={`transition-transform ${open ? "rotate-180" : ""}`}
                />
            </button>

            {open && (
                <div
                    className={`absolute right-0 top-12 z-40 w-56 overflow-hidden rounded-xl border p-1.5 shadow-2xl ${darkMode
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

/* =========================================================
   MAIN PROJECTS PAGE
========================================================= */

export default function Projects({ darkMode = true }) {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [view, setView] = useState("grid");
    const [sort, setSort] = useState("recent");

    /* =====================================================
       LOAD PROJECTS
    ===================================================== */
    const loadProjects = async (isRefresh = false) => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            window.location.href = "/portal";
            return;
        }

        if (isRefresh) setRefreshing(true);
        else setLoading(true);
        setError("");

        try {
            const response = await fetch(`${API_URL}/api/projects/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 401) {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                localStorage.removeItem("ab_user");
                window.location.href = "/portal";
                return;
            }

            const contentType = response.headers.get("content-type") || "";
            if (!contentType.includes("application/json")) {
                throw new Error(`Projects API returned ${response.status}.`);
            }

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.detail || data.message || "Unable to load your projects."
                );
            }

            let projectList = [];
            if (Array.isArray(data)) projectList = data;
            else if (Array.isArray(data.results)) projectList = data.results;
            else if (Array.isArray(data.projects)) projectList = data.projects;
            else if (Array.isArray(data.data)) projectList = data.data;

            const uniqueProjects = Array.from(
                new Map(
                    projectList.map((project, index) => [
                        String(project?.id ?? `project-${index}`),
                        project,
                    ])
                ).values()
            );

            setProjects(uniqueProjects);
        } catch (err) {
            console.error("Projects error:", err);
            setError(err.message || "Unable to load your projects.");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        loadProjects();
    }, []);

    /* =====================================================
       FILTERED + SORTED PROJECTS
    ===================================================== */
    const filteredProjects = useMemo(() => {
        const query = search.trim().toLowerCase();

        const filtered = projects.filter((project) => {
            const normalized = normalizeStatus(project.status);
            const matchesStatus =
                statusFilter === "ALL" || normalized === statusFilter;

            const matchesSearch =
                !query ||
                [
                    getProjectName(project),
                    getProjectCode(project),
                    getProjectDescription(project),
                    project.status,
                ]
                    .filter(Boolean)
                    .some((value) =>
                        String(value).toLowerCase().includes(query)
                    );

            return matchesStatus && matchesSearch;
        });

        /* Sorting */
        const sorted = [...filtered];
        switch (sort) {
            case "name":
                sorted.sort((a, b) =>
                    getProjectName(a).localeCompare(getProjectName(b))
                );
                break;
            case "progress":
                sorted.sort((a, b) => getProgress(b) - getProgress(a));
                break;
            case "deadline":
                sorted.sort((a, b) => {
                    const da = a.expected_completion_date || a.deadline || a.due_date;
                    const db = b.expected_completion_date || b.deadline || b.due_date;
                    if (!da) return 1;
                    if (!db) return -1;
                    return new Date(da) - new Date(db);
                });
                break;
            case "recent":
            default:
                sorted.sort((a, b) => {
                    const da = new Date(a.updated_at || a.created_at || 0);
                    const db = new Date(b.updated_at || b.created_at || 0);
                    return db - da;
                });
        }

        return sorted;
    }, [projects, search, statusFilter, sort]);

    /* =====================================================
       STATISTICS
    ===================================================== */
    const statistics = useMemo(() => {
        const total = projects.length;
        const active = projects.filter(
            (p) => normalizeStatus(p.status) === "ACTIVE"
        ).length;
        const completed = projects.filter(
            (p) => normalizeStatus(p.status) === "COMPLETED"
        ).length;
        const onHold = projects.filter(
            (p) => normalizeStatus(p.status) === "ON_HOLD"
        ).length;
        const averageProgress = projects.length
            ? Math.round(
                projects.reduce((sum, p) => sum + getProgress(p), 0) /
                projects.length
            )
            : 0;

        return { total, active, completed, onHold, averageProgress };
    }, [projects]);

    /* Sample sparklines (deterministic; replace with real data if available) */
    const sparks = useMemo(
        () => ({
            total: [3, 5, 4, 7, 6, 8, 9],
            active: [2, 3, 4, 3, 5, 4, 6],
            completed: [1, 2, 2, 3, 4, 4, 5],
            progress: [40, 45, 52, 58, 63, 71, 78],
        }),
        []
    );

    const clearFilters = () => {
        setSearch("");
        setStatusFilter("ALL");
    };

    /* =====================================================
       LOADING
    ===================================================== */
    if (loading) {
        return (
            <div
                className={`min-h-screen ${darkMode
                        ? "bg-[#020611] text-white"
                        : "bg-slate-50 text-slate-900"
                    }`}
            >
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    {/* Skeleton header */}
                    <div
                        className={`h-4 w-40 animate-pulse rounded ${darkMode ? "bg-slate-900" : "bg-slate-200"
                            }`}
                    />
                    <div
                        className={`mt-6 h-10 w-72 animate-pulse rounded ${darkMode ? "bg-slate-900" : "bg-slate-200"
                            }`}
                    />
                    <div
                        className={`mt-3 h-4 w-full max-w-xl animate-pulse rounded ${darkMode ? "bg-slate-900" : "bg-slate-200"
                            }`}
                    />

                    {/* Skeleton stats */}
                    <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div
                                key={i}
                                className={`h-28 animate-pulse rounded-2xl ${darkMode ? "bg-slate-900/60" : "bg-slate-200/70"
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Skeleton cards */}
                    <div className="mt-8 grid gap-5 lg:grid-cols-2">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div
                                key={i}
                                className={`h-64 animate-pulse rounded-2xl ${darkMode ? "bg-slate-900/60" : "bg-slate-200/70"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    /* =====================================================
       ERROR
    ===================================================== */
    if (error) {
        return (
            <div
                className={`min-h-screen ${darkMode
                        ? "bg-[#020611] text-white"
                        : "bg-slate-50 text-slate-900"
                    }`}
            >
                <div className="mx-auto max-w-3xl px-4 py-16">
                    <div
                        className={`relative overflow-hidden rounded-3xl border p-8 text-center ${darkMode
                                ? "border-red-400/15 bg-red-400/[0.03]"
                                : "border-red-200 bg-white shadow-xl shadow-red-100/40"
                            }`}
                    >
                        <div
                            className={`pointer-events-none absolute -top-20 left-1/2 h-40 w-72 -translate-x-1/2 rounded-full blur-3xl ${darkMode ? "bg-red-400/10" : "bg-red-100"
                                }`}
                        />

                        <div
                            className={`relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${darkMode
                                    ? "bg-red-400/10 text-red-300"
                                    : "bg-red-50 text-red-600"
                                }`}
                        >
                            <AlertCircle size={26} />
                        </div>

                        <h2
                            className={`relative mt-5 text-lg font-black ${darkMode ? "text-white" : "text-slate-900"
                                }`}
                        >
                            Unable to load projects
                        </h2>

                        <p
                            className={`relative mt-2 text-sm leading-6 ${darkMode ? "text-slate-400" : "text-slate-500"
                                }`}
                        >
                            {error}
                        </p>

                        <button
                            type="button"
                            onClick={() => loadProjects()}
                            className="relative mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/30 transition-all hover:-translate-y-0.5 hover:shadow-cyan-500/50"
                        >
                            Try again <RefreshCw size={15} />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    /* =====================================================
       MAIN PAGE
    ===================================================== */
    return (
        <div
            className={`min-h-screen ${darkMode
                    ? "bg-[#020611] text-white"
                    : "bg-slate-50 text-slate-900"
                }`}
        >
            <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                {/* =================================================
                    HEADER
                ================================================= */}
                <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2">
                            <Link
                                to="/portal/dashboard"
                                className={`text-sm transition-colors ${darkMode
                                        ? "text-slate-500 hover:text-slate-300"
                                        : "text-slate-400 hover:text-slate-600"
                                    }`}
                            >
                                Dashboard
                            </Link>
                            <span
                                className={
                                    darkMode ? "text-slate-700" : "text-slate-300"
                                }
                            >
                                /
                            </span>
                            <span
                                className={`text-sm font-bold ${darkMode ? "text-slate-300" : "text-slate-600"
                                    }`}
                            >
                                Projects
                            </span>
                        </div>

                        {/* Title with badge */}
                        <div className="mt-4 flex flex-wrap items-center gap-3">
                            <h1
                                className={`text-2xl font-black tracking-tight sm:text-3xl ${darkMode ? "text-white" : "text-slate-900"
                                    }`}
                            >
                                Your Projects
                            </h1>
                            <span
                                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${darkMode
                                        ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-300"
                                        : "border-cyan-200 bg-cyan-50 text-cyan-700"
                                    }`}
                            >
                                <Sparkles size={11} />
                                Live workspace
                            </span>
                        </div>

                        <p
                            className={`mt-2 max-w-2xl text-sm leading-6 sm:text-base ${darkMode ? "text-slate-400" : "text-slate-500"
                                }`}
                        >
                            Track delivery progress, review milestones, and stay in
                            sync with the AB Technologies team — all in one place.
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-2">
                        <button
                            type="button"
                            onClick={() => loadProjects(true)}
                            disabled={refreshing}
                            className={`inline-flex w-fit items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-bold transition-all ${darkMode
                                    ? "border-white/[0.08] bg-white/[0.03] text-slate-200 hover:bg-white/[0.06]"
                                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:shadow-sm"
                                }`}
                        >
                            <RefreshCw
                                size={15}
                                className={refreshing ? "animate-spin text-cyan-500" : ""}
                            />
                            Refresh
                        </button>

                        <Link
                            to="/portal/support"
                            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/30 transition-all hover:-translate-y-0.5 hover:shadow-cyan-500/50"
                        >
                            <Plus size={15} />
                            New project
                        </Link>
                    </div>
                </div>

                {/* =================================================
                    SUMMARY CARDS
                ================================================= */}
                <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
                    <SummaryCard
                        label="Total projects"
                        value={statistics.total}
                        icon={BriefcaseBusiness}
                        darkMode={darkMode}
                        accent="sky"
                        spark={sparks.total}
                        trend={8}
                    />
                    <SummaryCard
                        label="Active"
                        value={statistics.active}
                        icon={Zap}
                        darkMode={darkMode}
                        accent="emerald"
                        spark={sparks.active}
                        trend={4}
                    />
                    <SummaryCard
                        label="Completed"
                        value={statistics.completed}
                        icon={CheckCircle2}
                        darkMode={darkMode}
                        accent="violet"
                        spark={sparks.completed}
                        trend={12}
                    />
                    <SummaryCard
                        label="Avg. progress"
                        value={`${statistics.averageProgress}%`}
                        icon={Target}
                        darkMode={darkMode}
                        accent="amber"
                        spark={sparks.progress}
                    />
                </div>

                {/* =================================================
                    SEARCH / FILTER / VIEW TOGGLE
                ================================================= */}
                <div
                    className={`sticky top-[76px] z-20 mt-8 rounded-2xl border p-3 backdrop-blur-xl ${darkMode
                            ? "border-white/[0.07] bg-[#020611]/85"
                            : "border-slate-200 bg-white/85"
                        }`}
                >
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                        {/* Search */}
                        <div className="relative flex-1">
                            <Search
                                size={17}
                                className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${darkMode ? "text-slate-500" : "text-slate-400"
                                    }`}
                            />
                            <input
                                type="search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search projects by name, code, or description…"
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

                        {/* Filters */}
                        <div className="flex flex-wrap items-center gap-2">
                            <div
                                className={`inline-flex items-center gap-1 rounded-xl border p-1 ${darkMode
                                        ? "border-white/[0.08] bg-white/[0.03]"
                                        : "border-slate-200 bg-slate-50"
                                    }`}
                            >
                                {[
                                    ["ALL", "All"],
                                    ["ACTIVE", "Active"],
                                    ["COMPLETED", "Completed"],
                                    ["ON_HOLD", "On hold"],
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

                            <SortDropdown sort={sort} setSort={setSort} darkMode={darkMode} />
                            <ViewToggle view={view} setView={setView} darkMode={darkMode} />
                        </div>
                    </div>
                </div>

                {/* =================================================
                    RESULT COUNT
                ================================================= */}
                <div className="mt-6 flex items-center justify-between">
                    <p
                        className={`text-sm ${darkMode ? "text-slate-500" : "text-slate-400"
                            }`}
                    >
                        <span
                            className={`font-bold ${darkMode ? "text-white" : "text-slate-900"
                                }`}
                        >
                            {filteredProjects.length}
                        </span>{" "}
                        {filteredProjects.length === 1 ? "project" : "projects"}
                        {search && (
                            <>
                                {" "}
                                matching{" "}
                                <span
                                    className={
                                        darkMode ? "text-slate-300" : "text-slate-600"
                                    }
                                >
                                    "{search}"
                                </span>
                            </>
                        )}
                    </p>

                    {(search || statusFilter !== "ALL" || sort !== "recent") && (
                        <button
                            type="button"
                            onClick={() => {
                                clearFilters();
                                setSort("recent");
                            }}
                            className={`text-xs font-bold transition-colors ${darkMode
                                    ? "text-cyan-300 hover:text-cyan-200"
                                    : "text-cyan-600 hover:text-cyan-700"
                                }`}
                        >
                            Reset all
                        </button>
                    )}
                </div>

                {/* =================================================
                    PROJECTS
                ================================================= */}
                <div className="mt-4">
                    {filteredProjects.length === 0 ? (
                        <EmptyState
                            darkMode={darkMode}
                            filtered={Boolean(search || statusFilter !== "ALL")}
                            onClear={clearFilters}
                        />
                    ) : (
                        <div
                            className={
                                view === "list"
                                    ? "space-y-3"
                                    : "grid gap-5 lg:grid-cols-2"
                            }
                        >
                            {filteredProjects.map((project) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    darkMode={darkMode}
                                    view={view}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* =================================================
                    FOOTER CTA
                ================================================= */}
                <div
                    className={`mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border p-5 sm:flex-row sm:p-6 ${darkMode
                            ? "border-white/[0.07] bg-gradient-to-br from-white/[0.03] to-transparent"
                            : "border-slate-200 bg-gradient-to-br from-white to-slate-50/60"
                        }`}
                >
                    <div className="flex items-center gap-4">
                        <div
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${darkMode
                                    ? "bg-cyan-400/10 text-cyan-300"
                                    : "bg-cyan-50 text-cyan-600"
                                }`}
                        >
                            <Sparkles size={19} />
                        </div>
                        <div>
                            <p
                                className={`text-sm font-bold ${darkMode ? "text-white" : "text-slate-900"
                                    }`}
                            >
                                Need a new project scoped?
                            </p>
                            <p
                                className={`mt-0.5 text-xs ${darkMode ? "text-slate-500" : "text-slate-500"
                                    }`}
                            >
                                Our engineers can architect, build, and deliver end-to-end.
                            </p>
                        </div>
                    </div>

                    <Link
                        to="/portal/support"
                        className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/30 transition-all hover:-translate-y-0.5 hover:shadow-cyan-500/50"
                    >
                        Start a project
                        <ArrowRight size={15} />
                    </Link>
                </div>
            </main>
        </div>
    );
}