// src/pages/staff/StaffProcurement.jsx

import React, {
    Component,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import {
    AlertCircle,
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
    BadgeCheck,
    Box,
    Check,
    CheckCircle2,
    ChevronDown,
    ChevronRight,
    Circle,
    Clock3,
    Copy,
    ExternalLink,
    FileText,
    Filter,
    Grid3x3,
    Info,
    Layers,
    LayoutList,
    Loader2,
    Lock,
    MapPin,
    Package,
    PackageCheck,
    RefreshCw,
    Search,
    Send,
    ShieldCheck,
    Sparkles,
    Tag,
    Target,
    Truck,
    Users,
    X,
    Zap,
} from "lucide-react";


const API_URL = (
    import.meta.env.VITE_API_URL ||
    "http://127.0.0.1:8000"
).replace(/\/$/, "");


/* ============================================================
   CONSTANTS
============================================================ */

const PROCUREMENT_STATUSES = ["accepted", "completed"];

const TRACKING_STATUSES = [
    { value: "order_confirmed", label: "Order Confirmed" },
    { value: "supplier_confirmed", label: "Supplier Confirmed" },
    { value: "order_placed", label: "Order Placed" },
    { value: "processing", label: "Processing" },
    { value: "ready_for_dispatch", label: "Ready for Dispatch" },
    { value: "dispatched", label: "Dispatched" },
    { value: "in_transit", label: "In Transit" },
    { value: "arrived", label: "Arrived" },
    { value: "delivered", label: "Delivered" },
    { value: "completed", label: "Completed" },
    { value: "on_hold", label: "On Hold" },
    { value: "delayed", label: "Delayed" },
    { value: "cancelled", label: "Cancelled" },
];


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

function formatCurrency(value, currency = "NGN") {
    if (value === null || value === undefined || value === "") return "—";
    const number = Number(value);
    if (Number.isNaN(number)) return String(value);
    try {
        return new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency,
            maximumFractionDigits: 0,
        }).format(number);
    } catch {
        return `${currency} ${number.toLocaleString()}`;
    }
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
    const normalized = normalizeStatus(status);
    const knownLabels = {
        order_confirmed: "Order Confirmed",
        supplier_confirmed: "Supplier Confirmed",
        order_placed: "Order Placed",
        processing: "Processing",
        ready_for_dispatch: "Ready for Dispatch",
        dispatched: "Dispatched",
        in_transit: "In Transit",
        arrived: "Arrived",
        delivered: "Delivered",
        completed: "Completed",
        on_hold: "On Hold",
        delayed: "Delayed",
        cancelled: "Cancelled",
        accepted: "Accepted",
        pending: "Pending",
    };
    if (knownLabels[normalized]) return knownLabels[normalized];
    return normalized.replaceAll("_", " ").replace(/\b\w/g, (l) => l.toUpperCase());
}

function isCompletedStatus(status) {
    return ["completed", "complete", "done"].includes(normalizeStatus(status));
}

function isProcurementStatus(status) {
    return PROCUREMENT_STATUSES.includes(normalizeStatus(status));
}

function normalizeArray(value) {
    if (Array.isArray(value)) return value;
    if (Array.isArray(value?.results)) return value.results;
    if (Array.isArray(value?.data)) return value.data;
    if (Array.isArray(value?.items)) return value.items;
    return [];
}

function normalizeProcurement(procurement) {
    if (!procurement || typeof procurement !== "object") {
        return { id: null, quotation: null, tracking: [] };
    }
    return {
        ...procurement,
        quotation:
            procurement.quotation && typeof procurement.quotation === "object"
                ? procurement.quotation
                : null,
        tracking: Array.isArray(procurement.tracking)
            ? procurement.tracking
            : [],
    };
}


/* ============================================================
   STATUS THEMES
============================================================ */

function statusTheme(status, darkMode) {
    const n = normalizeStatus(status);

    if (n === "completed" || n === "delivered") {
        return {
            chip: darkMode
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                : "border-emerald-200 bg-emerald-50 text-emerald-700",
            dot: "bg-emerald-500",
            glow: "bg-emerald-500/20",
        };
    }
    if (n === "accepted") {
        return {
            chip: darkMode
                ? "border-sky-500/30 bg-sky-500/10 text-sky-300"
                : "border-sky-200 bg-sky-50 text-sky-700",
            dot: "bg-sky-500",
            glow: "bg-sky-500/20",
        };
    }
    if (n === "order_confirmed" || n === "supplier_confirmed") {
        return {
            chip: darkMode
                ? "border-indigo-500/30 bg-indigo-500/10 text-indigo-300"
                : "border-indigo-200 bg-indigo-50 text-indigo-700",
            dot: "bg-indigo-500",
            glow: "bg-indigo-500/20",
        };
    }
    if (n === "order_placed" || n === "processing") {
        return {
            chip: darkMode
                ? "border-violet-500/30 bg-violet-500/10 text-violet-300"
                : "border-violet-200 bg-violet-50 text-violet-700",
            dot: "bg-violet-500",
            glow: "bg-violet-500/20",
        };
    }
    if (
        n === "ready_for_dispatch" ||
        n === "dispatched" ||
        n === "in_transit"
    ) {
        return {
            chip: darkMode
                ? "border-sky-500/30 bg-sky-500/10 text-sky-300"
                : "border-sky-200 bg-sky-50 text-sky-700",
            dot: "bg-sky-500",
            glow: "bg-sky-500/20",
        };
    }
    if (n === "arrived") {
        return {
            chip: darkMode
                ? "border-teal-500/30 bg-teal-500/10 text-teal-300"
                : "border-teal-200 bg-teal-50 text-teal-700",
            dot: "bg-teal-500",
            glow: "bg-teal-500/20",
        };
    }
    if (n === "on_hold" || n === "delayed" || n === "pending") {
        return {
            chip: darkMode
                ? "border-amber-500/30 bg-amber-500/10 text-amber-300"
                : "border-amber-200 bg-amber-50 text-amber-700",
            dot: "bg-amber-500",
            glow: "bg-amber-500/20",
        };
    }
    if (n === "cancelled") {
        return {
            chip: darkMode
                ? "border-red-500/30 bg-red-500/10 text-red-300"
                : "border-red-200 bg-red-50 text-red-700",
            dot: "bg-red-500",
            glow: "bg-red-500/20",
        };
    }
    return {
        chip: darkMode
            ? "border-slate-700 bg-slate-800/60 text-slate-400"
            : "border-slate-200 bg-slate-100 text-slate-600",
        dot: "bg-slate-400",
        glow: "bg-slate-500/20",
    };
}


/* ============================================================
   STATUS BADGE
============================================================ */

function StatusBadge({ status, darkMode }) {
    const theme = statusTheme(status, darkMode);
    const n = normalizeStatus(status);
    const isDone = n === "completed" || n === "delivered";

    return (
        <span
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${theme.chip}`}
        >
            {isDone ? (
                <CheckCircle2 size={10} />
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
   ERROR BOUNDARY
============================================================ */

class ProcurementErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    componentDidCatch(error, info) {
        console.error("PROCUREMENT RENDER ERROR:", error);
        console.error("PROCUREMENT ERROR INFO:", info);
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
                                    Procurement screen error
                                </h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    The procurement details could not be rendered.
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
   PROCUREMENT CARD
============================================================ */

function ProcurementCard({ procurement, onOpen, darkMode }) {
    const safe = normalizeProcurement(procurement);
    const quotation = safe.quotation || {};
    const completed = isCompletedStatus(safe.status);
    const includedCount = quotation.item_count ?? 0;
    const totalCount = quotation.total_item_count ?? includedCount;
    const latestTracking = safe.latest_tracking_status || null;
    const latestTrackingLabel =
        safe.latest_tracking_status_label ||
        (latestTracking ? getStatusLabel(latestTracking) : null);
    const theme = statusTheme(safe.status, darkMode);

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
                className={`absolute left-0 right-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 ${completed
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                        : "bg-gradient-to-r from-cyan-500 to-indigo-500"
                    }`}
            />

            {/* Header */}
            <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-start gap-3">
                    <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 transition-transform duration-300 group-hover:scale-105 ${completed
                                ? darkMode
                                    ? "bg-emerald-400/10 text-emerald-300 ring-emerald-400/20"
                                    : "bg-emerald-50 text-emerald-600 ring-emerald-100"
                                : darkMode
                                    ? "bg-cyan-400/10 text-cyan-300 ring-cyan-400/20"
                                    : "bg-cyan-50 text-cyan-600 ring-cyan-100"
                            }`}
                    >
                        <Package size={20} />
                    </div>

                    <div className="min-w-0">
                        <div
                            className={`font-mono text-[10px] font-black uppercase tracking-widest ${darkMode ? "text-slate-500" : "text-slate-400"
                                }`}
                        >
                            {safe.procurement_code ||
                                String(safe.id || "")
                                    .slice(0, 8)
                                    .toUpperCase()}
                        </div>
                        <h3
                            className={`mt-1 truncate text-base font-black tracking-tight ${darkMode ? "text-white" : "text-slate-900"
                                }`}
                        >
                            {safe.title || safe.name || "Procurement"}
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

            {/* Stats grid */}
            <div
                className={`mt-5 grid grid-cols-3 gap-3 border-t pt-4 ${darkMode ? "border-white/[0.06]" : "border-slate-100"
                    }`}
            >
                <div>
                    <div
                        className={`text-[10px] font-black uppercase tracking-wider ${darkMode ? "text-slate-500" : "text-slate-400"
                            }`}
                    >
                        Items
                    </div>
                    <div
                        className={`mt-1 text-sm font-black ${darkMode ? "text-slate-200" : "text-slate-800"
                            }`}
                    >
                        {includedCount}
                        {totalCount > includedCount ? (
                            <span
                                className={`ml-1 text-[10px] font-bold ${darkMode
                                        ? "text-slate-500"
                                        : "text-slate-400"
                                    }`}
                            >
                                / {totalCount}
                            </span>
                        ) : null}
                    </div>
                </div>

                <div className="min-w-0">
                    <div
                        className={`text-[10px] font-black uppercase tracking-wider ${darkMode ? "text-slate-500" : "text-slate-400"
                            }`}
                    >
                        Quotation
                    </div>
                    <div
                        className={`mt-1 truncate text-sm font-black ${darkMode ? "text-slate-200" : "text-slate-800"
                            }`}
                    >
                        {formatCurrency(
                            quotation.total || safe.total_price,
                            quotation.currency || safe.currency || "NGN"
                        )}
                    </div>
                </div>

                <div className="min-w-0">
                    <div
                        className={`text-[10px] font-black uppercase tracking-wider ${darkMode ? "text-slate-500" : "text-slate-400"
                            }`}
                    >
                        Tracking
                    </div>
                    <div
                        className={`mt-1 truncate text-sm font-black ${latestTrackingLabel
                                ? darkMode
                                    ? "text-cyan-300"
                                    : "text-cyan-600"
                                : darkMode
                                    ? "text-slate-500"
                                    : "text-slate-400"
                            }`}
                    >
                        {latestTrackingLabel || "—"}
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
                    {completed
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
                    View procurement
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
   QUOTATION ITEM ROW
============================================================ */

function QuotationItemRow({ item, darkMode }) {
    const included = item?.included !== false;

    return (
        <div
            className={`rounded-2xl border p-4 transition-all ${included
                    ? darkMode
                        ? "border-white/[0.07] bg-white/[0.025]"
                        : "border-slate-200 bg-white"
                    : darkMode
                        ? "border-white/[0.04] bg-white/[0.01] opacity-60"
                        : "border-slate-100 bg-slate-50/60 opacity-75"
                }`}
        >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                        <h4
                            className={`text-sm font-black ${darkMode ? "text-white" : "text-slate-900"
                                }`}
                        >
                            {item.name}
                        </h4>

                        {item.category && (
                            <span
                                className={`rounded-full border px-2 py-0.5 text-[9px] font-black uppercase tracking-wider ${darkMode
                                        ? "border-white/[0.08] bg-white/[0.04] text-slate-400"
                                        : "border-slate-200 bg-slate-100 text-slate-600"
                                    }`}
                            >
                                {item.category}
                            </span>
                        )}

                        {!included && (
                            <span
                                className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-black uppercase tracking-wider ${darkMode
                                        ? "border-orange-500/30 bg-orange-500/10 text-orange-300"
                                        : "border-orange-200 bg-orange-50 text-orange-700"
                                    }`}
                            >
                                <X size={9} />
                                Removed
                            </span>
                        )}
                    </div>

                    {(item.brand || item.model) && (
                        <p
                            className={`mt-1 text-xs font-bold ${darkMode ? "text-slate-500" : "text-slate-500"
                                }`}
                        >
                            {[item.brand, item.model].filter(Boolean).join(" · ")}
                        </p>
                    )}

                    {item.description && (
                        <p
                            className={`mt-2 text-sm leading-6 ${darkMode ? "text-slate-400" : "text-slate-600"
                                }`}
                        >
                            {item.description}
                        </p>
                    )}

                    {item.specifications &&
                        Object.keys(item.specifications).length > 0 && (
                            <div className="mt-3 grid gap-1.5 sm:grid-cols-2">
                                {Object.entries(item.specifications).map(
                                    ([key, value]) => (
                                        <div
                                            key={key}
                                            className={`rounded-lg border px-2.5 py-1.5 ${darkMode
                                                    ? "border-white/[0.06] bg-white/[0.02]"
                                                    : "border-slate-100 bg-slate-50"
                                                }`}
                                        >
                                            <span
                                                className={`text-[9px] font-black uppercase tracking-wider ${darkMode
                                                        ? "text-slate-500"
                                                        : "text-slate-400"
                                                    }`}
                                            >
                                                {String(key)
                                                    .replaceAll("_", " ")
                                                    .replace(/\b\w/g, (l) =>
                                                        l.toUpperCase()
                                                    )}
                                            </span>
                                            <p
                                                className={`mt-0.5 text-xs font-bold ${darkMode
                                                        ? "text-slate-300"
                                                        : "text-slate-700"
                                                    }`}
                                            >
                                                {typeof value === "object"
                                                    ? JSON.stringify(value)
                                                    : String(value)}
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>
                        )}
                </div>

                <div className="grid shrink-0 grid-cols-3 gap-3 sm:flex sm:flex-col sm:gap-2 sm:text-right">
                    <div>
                        <div
                            className={`text-[10px] font-black uppercase tracking-wider ${darkMode ? "text-slate-500" : "text-slate-400"
                                }`}
                        >
                            Qty
                        </div>
                        <div
                            className={`mt-0.5 text-sm font-black ${darkMode ? "text-slate-200" : "text-slate-800"
                                }`}
                        >
                            {item.quantity}
                        </div>
                    </div>

                    <div>
                        <div
                            className={`text-[10px] font-black uppercase tracking-wider ${darkMode ? "text-slate-500" : "text-slate-400"
                                }`}
                        >
                            Unit
                        </div>
                        <div
                            className={`mt-0.5 text-sm font-black ${darkMode ? "text-slate-200" : "text-slate-800"
                                }`}
                        >
                            {formatCurrency(item.unit_price, "NGN")}
                        </div>
                    </div>

                    <div>
                        <div
                            className={`text-[10px] font-black uppercase tracking-wider ${darkMode ? "text-slate-500" : "text-slate-400"
                                }`}
                        >
                            Total
                        </div>
                        <div
                            className={`mt-0.5 text-sm font-black ${darkMode ? "text-cyan-300" : "text-cyan-600"
                                }`}
                        >
                            {formatCurrency(item.total_price, "NGN")}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


/* ============================================================
   TRACKING TIMELINE ENTRY
============================================================ */

function TrackingEntry({ entry, darkMode, isFirst, isLast }) {
    const theme = statusTheme(entry.status, darkMode);

    return (
        <li className="relative flex gap-4">
            {/* Connector line */}
            {!isLast && (
                <span
                    className={`absolute left-[15px] top-8 h-full w-px ${darkMode ? "bg-white/[0.06]" : "bg-slate-200"
                        }`}
                    aria-hidden="true"
                />
            )}

            {/* Node */}
            <div
                className={`relative z-10 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ring-4 ${darkMode ? "ring-[#020611]" : "ring-white"
                    } ${theme.chip}`}
            >
                <span className={`h-2.5 w-2.5 rounded-full ${theme.dot}`} />
            </div>

            <div
                className={`min-w-0 flex-1 rounded-2xl border p-4 transition-all ${darkMode
                        ? "border-white/[0.07] bg-white/[0.025]"
                        : "border-slate-200 bg-white shadow-sm"
                    }`}
            >
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                        <StatusBadge status={entry.status} darkMode={darkMode} />
                        {isFirst && (
                            <span
                                className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-black uppercase tracking-wider ${darkMode
                                        ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-300"
                                        : "border-cyan-200 bg-cyan-50 text-cyan-700"
                                    }`}
                            >
                                <Sparkles size={9} />
                                Latest
                            </span>
                        )}
                    </div>

                    <span
                        className={`text-[10px] font-bold ${darkMode ? "text-slate-500" : "text-slate-400"
                            }`}
                    >
                        {formatDateTime(entry.created_at)}
                    </span>
                </div>

                <h4
                    className={`mt-2 text-sm font-black ${darkMode ? "text-white" : "text-slate-900"
                        }`}
                >
                    {entry.title}
                </h4>

                {entry.description && (
                    <p
                        className={`mt-1.5 whitespace-pre-wrap text-sm leading-6 ${darkMode ? "text-slate-400" : "text-slate-600"
                            }`}
                    >
                        {entry.description}
                    </p>
                )}

                <div
                    className={`mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-bold ${darkMode ? "text-slate-500" : "text-slate-400"
                        }`}
                >
                    {entry.location && (
                        <span className="inline-flex items-center gap-1">
                            <MapPin size={10} />
                            {entry.location}
                        </span>
                    )}

                    {entry.tracking_reference && (
                        <span className="inline-flex items-center gap-1 font-mono">
                            <Truck size={10} />
                            {entry.tracking_reference}
                        </span>
                    )}

                    {entry.updated_by && (
                        <span className="inline-flex items-center gap-1">
                            <Users size={10} />
                            {entry.updated_by}
                        </span>
                    )}
                </div>
            </div>
        </li>
    );
}


/* ============================================================
   TRACKING FORM
============================================================ */

function TrackingForm({ onSubmit, submitting, error, disabled, darkMode }) {
    const [status, setStatus] = useState(TRACKING_STATUSES[0].value);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [reference, setReference] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!title.trim()) return;

        const payload = {
            status,
            title: title.trim(),
            description: description.trim(),
            location: location.trim(),
            tracking_reference: reference.trim(),
        };

        const ok = await onSubmit(payload);
        if (ok) {
            setTitle("");
            setDescription("");
            setLocation("");
            setReference("");
            setStatus(TRACKING_STATUSES[0].value);
        }
    };

    const inputClass = `w-full rounded-xl border px-3 py-2.5 text-sm outline-none transition disabled:opacity-60 ${darkMode
            ? "border-white/[0.08] bg-white/[0.03] text-slate-200 placeholder:text-slate-600 focus:border-cyan-400/40"
            : "border-slate-200 bg-white text-slate-700 placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
        }`;

    const labelClass = `mb-1.5 block text-[10px] font-black uppercase tracking-wider ${darkMode ? "text-slate-500" : "text-slate-400"
        }`;

    return (
        <form
            onSubmit={handleSubmit}
            className={`rounded-2xl border p-5 ${darkMode
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
                    <Send size={15} />
                </div>
                <h3
                    className={`text-base font-black ${darkMode ? "text-white" : "text-slate-900"
                        }`}
                >
                    Add tracking update
                </h3>
            </div>

            <p
                className={`mt-1 text-xs ${darkMode ? "text-slate-500" : "text-slate-500"
                    }`}
            >
                Post a new status so the client sees progress on this
                procurement.
            </p>

            {error && (
                <div
                    className={`mt-4 flex items-start gap-2 rounded-xl border px-4 py-3 text-xs font-bold ${darkMode
                            ? "border-red-500/20 bg-red-500/[0.06] text-red-300"
                            : "border-red-200 bg-red-50 text-red-700"
                        }`}
                >
                    <AlertCircle size={14} className="mt-0.5 shrink-0" />
                    {error}
                </div>
            )}

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                    <label className={labelClass}>Status</label>
                    <div className="relative">
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            disabled={submitting || disabled}
                            className={`${inputClass} appearance-none pr-9 font-bold`}
                        >
                            {TRACKING_STATUSES.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <ChevronDown
                            size={15}
                            className={`pointer-events-none absolute right-3 top-3 ${darkMode ? "text-slate-500" : "text-slate-400"
                                }`}
                        />
                    </div>
                </div>

                <div>
                    <label className={labelClass}>Tracking reference</label>
                    <input
                        type="text"
                        value={reference}
                        onChange={(e) => setReference(e.target.value)}
                        disabled={submitting || disabled}
                        placeholder="e.g. DHL-9988776655"
                        className={inputClass}
                    />
                </div>

                <div className="sm:col-span-2">
                    <label className={labelClass}>
                        Title <span className="ml-1 text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        disabled={submitting || disabled}
                        placeholder="e.g. Shipment dispatched from Lagos warehouse"
                        required
                        className={inputClass}
                    />
                </div>

                <div className="sm:col-span-2">
                    <label className={labelClass}>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        disabled={submitting || disabled}
                        rows={3}
                        placeholder="Optional details about this update..."
                        className={`${inputClass} resize-none`}
                    />
                </div>

                <div className="sm:col-span-2">
                    <label className={labelClass}>Location</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        disabled={submitting || disabled}
                        placeholder="e.g. Lagos, Nigeria"
                        className={inputClass}
                    />
                </div>
            </div>

            <div className="mt-5 flex justify-end">
                <button
                    type="submit"
                    disabled={submitting || disabled || !title.trim()}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/30 transition-all hover:-translate-y-0.5 hover:shadow-cyan-500/50 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                    {submitting ? (
                        <Loader2 size={14} className="animate-spin" />
                    ) : (
                        <Send size={14} />
                    )}
                    {submitting ? "Posting..." : "Post update"}
                </button>
            </div>
        </form>
    );
}


/* ============================================================
   DETAIL MODAL
============================================================ */

function ProcurementDetails({
    procurement,
    onClose,
    onProcurementUpdate,
    darkMode,
}) {
    const [detail, setDetail] = useState(() =>
        normalizeProcurement(procurement)
    );
    const [loadingDetail, setLoadingDetail] = useState(true);
    const [detailError, setDetailError] = useState("");
    const [activeTab, setActiveTab] = useState("overview");
    const [submittingTracking, setSubmittingTracking] = useState(false);
    const [trackingError, setTrackingError] = useState("");
    const [completing, setCompleting] = useState(false);
    const requestIdRef = useRef(0);

    useEffect(() => {
        setDetail(normalizeProcurement(procurement));
        setDetailError("");
        setActiveTab("overview");
        setTrackingError("");
    }, [procurement.id]);

    const loadDetail = useCallback(async () => {
        const currentRequestId = ++requestIdRef.current;
        setLoadingDetail(true);
        setDetailError("");

        try {
            const token = getToken();
            if (!token)
                throw new Error(
                    "Your session has expired. Please sign in again."
                );
            if (!procurement?.id)
                throw new Error(
                    "This procurement does not have a valid ID."
                );

            const response = await fetch(
                `${API_URL}/api/procurement/staff/${procurement.id}/`,
                {
                    method: "GET",
                    cache: "no-store",
                    headers: getApiHeaders({ token }),
                }
            );

            const data = await parseResponse(response);

            if (currentRequestId !== requestIdRef.current) return;
            if (!response.ok) {
                throw new Error(
                    getApiErrorMessage(
                        data,
                        `Unable to load procurement details. HTTP ${response.status}.`
                    )
                );
            }

            setDetail(normalizeProcurement(data));
        } catch (error) {
            if (currentRequestId !== requestIdRef.current) return;
            console.error("STAFF PROCUREMENT DETAIL ERROR:", error);
            setDetailError(
                error?.message || "Unable to load procurement details."
            );
        } finally {
            if (currentRequestId === requestIdRef.current) {
                setLoadingDetail(false);
            }
        }
    }, [procurement.id]);

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
            if (event.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    const safeDetail = normalizeProcurement(detail);
    const quotation = safeDetail.quotation || {};
    const tracking = Array.isArray(safeDetail.tracking)
        ? safeDetail.tracking
        : [];
    const isCompleted = isCompletedStatus(safeDetail.status);
    const theme = statusTheme(safeDetail.status, darkMode);

    const handleSubmitTracking = async (payload) => {
        setSubmittingTracking(true);
        setTrackingError("");

        try {
            const token = getToken();
            if (!token)
                throw new Error(
                    "Your session has expired. Please sign in again."
                );

            const response = await fetch(
                `${API_URL}/api/procurement/staff/${safeDetail.id}/tracking/`,
                {
                    method: "POST",
                    headers: getApiHeaders({ token, json: true }),
                    body: JSON.stringify(payload),
                }
            );

            const data = await parseResponse(response);

            if (!response.ok) {
                throw new Error(
                    getApiErrorMessage(data, "Unable to save tracking update.")
                );
            }

            if (data?.tracking) {
                setDetail((current) => ({
                    ...current,
                    tracking: [data.tracking, ...(current.tracking || [])],
                    latest_tracking_status: data.tracking.status,
                    latest_tracking_status_label:
                        data.tracking.status_label ||
                        getStatusLabel(data.tracking.status),
                }));
            }

            onProcurementUpdate?.({
                ...safeDetail,
                latest_tracking_status:
                    data?.tracking?.status ||
                    safeDetail.latest_tracking_status,
                latest_tracking_status_label:
                    data?.tracking?.status_label ||
                    getStatusLabel(data?.tracking?.status),
            });

            await loadDetail();
            return true;
        } catch (error) {
            console.error("TRACKING UPDATE ERROR:", error);
            setTrackingError(
                error?.message || "Unable to save tracking update."
            );
            return false;
        } finally {
            setSubmittingTracking(false);
        }
    };

    const handleComplete = async () => {
        const confirmed = window.confirm(
            "Mark this procurement as completed?\n\nThis cannot be undone."
        );
        if (!confirmed) return;

        setCompleting(true);
        setTrackingError("");

        try {
            const token = getToken();
            if (!token)
                throw new Error(
                    "Your session has expired. Please sign in again."
                );

            const response = await fetch(
                `${API_URL}/api/procurement/staff/${safeDetail.id}/complete/`,
                {
                    method: "POST",
                    headers: getApiHeaders({ token, json: true }),
                }
            );

            const data = await parseResponse(response);

            if (!response.ok) {
                throw new Error(
                    getApiErrorMessage(
                        data,
                        "Unable to mark procurement as completed."
                    )
                );
            }

            if (data?.procurement) {
                const updated = normalizeProcurement(data.procurement);
                setDetail((current) => ({ ...current, ...updated }));
                onProcurementUpdate?.(updated);
            }

            await loadDetail();
        } catch (error) {
            console.error("PROCUREMENT COMPLETE ERROR:", error);
            setTrackingError(
                error?.message ||
                "Unable to mark procurement as completed."
            );
        } finally {
            setCompleting(false);
        }
    };

    const tabs = [
        { id: "overview", label: "Overview", icon: Info },
        {
            id: "items",
            label: "Items",
            icon: Layers,
            count: quotation.item_count ?? 0,
        },
        {
            id: "tracking",
            label: "Tracking",
            icon: Truck,
            count: tracking.length,
        },
    ];

    return (
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
                                aria-label="Back"
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
                                    {safeDetail.procurement_code ||
                                        String(safeDetail.id || "")
                                            .slice(0, 8)
                                            .toUpperCase()}
                                </div>
                                <h2
                                    className={`mt-0.5 truncate text-lg font-black tracking-tight ${darkMode
                                            ? "text-white"
                                            : "text-slate-900"
                                        }`}
                                >
                                    {safeDetail.title ||
                                        safeDetail.name ||
                                        "Procurement"}
                                </h2>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <StatusBadge
                                status={safeDetail.status}
                                darkMode={darkMode}
                            />

                            <button
                                type="button"
                                onClick={loadDetail}
                                disabled={loadingDetail}
                                aria-label="Refresh"
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
                                aria-label="Close"
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
                        <ProcurementDetailsSkeleton darkMode={darkMode} />
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
                                        Unable to load procurement details
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
                                                        {safeDetail.client ||
                                                            safeDetail.lead_name ||
                                                            "Client not specified"}
                                                    </div>
                                                    <div
                                                        className={`mt-1 text-xs font-bold ${darkMode
                                                                ? "text-slate-500"
                                                                : "text-slate-500"
                                                            }`}
                                                    >
                                                        {isCompleted
                                                            ? `Completed ${formatDate(
                                                                safeDetail.completed_at ||
                                                                safeDetail.updated_at
                                                            )}`
                                                            : `Accepted ${formatDate(
                                                                safeDetail.accepted_at
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
                                                        Quotation total
                                                    </div>
                                                    <div
                                                        className={`mt-1 bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-2xl font-black text-transparent`}
                                                    >
                                                        {formatCurrency(
                                                            quotation.total ||
                                                            safeDetail.total_price,
                                                            quotation.currency ||
                                                            safeDetail.currency ||
                                                            "NGN"
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div
                                                className={`mt-6 grid grid-cols-3 gap-3 border-t pt-5 ${darkMode
                                                        ? "border-white/[0.06]"
                                                        : "border-slate-100"
                                                    }`}
                                            >
                                                <div>
                                                    <div
                                                        className={`text-[10px] font-black uppercase tracking-wider ${darkMode
                                                                ? "text-slate-500"
                                                                : "text-slate-400"
                                                            }`}
                                                    >
                                                        Included
                                                    </div>
                                                    <div
                                                        className={`mt-1 text-sm font-black ${darkMode
                                                                ? "text-slate-200"
                                                                : "text-slate-800"
                                                            }`}
                                                    >
                                                        {quotation.item_count ?? 0}
                                                    </div>
                                                </div>

                                                <div>
                                                    <div
                                                        className={`text-[10px] font-black uppercase tracking-wider ${darkMode
                                                                ? "text-slate-500"
                                                                : "text-slate-400"
                                                            }`}
                                                    >
                                                        Removed
                                                    </div>
                                                    <div
                                                        className={`mt-1 text-sm font-black ${darkMode
                                                                ? "text-slate-200"
                                                                : "text-slate-800"
                                                            }`}
                                                    >
                                                        {quotation.removed_items
                                                            ?.length ?? 0}
                                                    </div>
                                                </div>

                                                <div>
                                                    <div
                                                        className={`text-[10px] font-black uppercase tracking-wider ${darkMode
                                                                ? "text-slate-500"
                                                                : "text-slate-400"
                                                            }`}
                                                    >
                                                        Total qty
                                                    </div>
                                                    <div
                                                        className={`mt-1 text-sm font-black ${darkMode
                                                                ? "text-slate-200"
                                                                : "text-slate-800"
                                                            }`}
                                                    >
                                                        {quotation.total_quantity ??
                                                            0}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    {quotation.description && (
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
                                                    Request
                                                </h3>
                                            </div>

                                            <p
                                                className={`mt-4 whitespace-pre-wrap break-words text-sm leading-7 ${darkMode
                                                        ? "text-slate-400"
                                                        : "text-slate-600"
                                                    }`}
                                            >
                                                {quotation.description}
                                            </p>

                                            {quotation.purpose && (
                                                <div
                                                    className={`mt-5 border-t pt-5 ${darkMode
                                                            ? "border-white/[0.06]"
                                                            : "border-slate-100"
                                                        }`}
                                                >
                                                    <div
                                                        className={`text-[10px] font-black uppercase tracking-wider ${darkMode
                                                                ? "text-slate-500"
                                                                : "text-slate-400"
                                                            }`}
                                                    >
                                                        Purpose
                                                    </div>
                                                    <p
                                                        className={`mt-2 whitespace-pre-wrap break-words text-sm leading-7 ${darkMode
                                                                ? "text-slate-400"
                                                                : "text-slate-600"
                                                            }`}
                                                    >
                                                        {quotation.purpose}
                                                    </p>
                                                </div>
                                            )}
                                        </section>
                                    )}

                                    {!isCompleted && (
                                        <section
                                            className={`relative overflow-hidden rounded-2xl border p-5 sm:p-6 ${darkMode
                                                    ? "border-emerald-500/20 bg-gradient-to-br from-emerald-500/[0.08] to-teal-500/[0.04]"
                                                    : "border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50"
                                                }`}
                                        >
                                            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-400/20 blur-3xl" />

                                            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <div
                                                            className={`flex h-9 w-9 items-center justify-center rounded-xl ${darkMode
                                                                    ? "bg-emerald-500/15 text-emerald-300"
                                                                    : "bg-white text-emerald-600 ring-1 ring-emerald-100"
                                                                }`}
                                                        >
                                                            <CheckCircle2 size={17} />
                                                        </div>
                                                        <h3
                                                            className={`text-sm font-black ${darkMode
                                                                    ? "text-emerald-300"
                                                                    : "text-emerald-900"
                                                                }`}
                                                        >
                                                            Mark procurement complete
                                                        </h3>
                                                    </div>

                                                    <p
                                                        className={`mt-2 text-xs leading-5 ${darkMode
                                                                ? "text-emerald-300/80"
                                                                : "text-emerald-800"
                                                            }`}
                                                    >
                                                        Only do this when all
                                                        items have been
                                                        delivered and accepted by
                                                        the client.
                                                    </p>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={handleComplete}
                                                    disabled={completing}
                                                    className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                                                >
                                                    {completing ? (
                                                        <Loader2
                                                            size={14}
                                                            className="animate-spin"
                                                        />
                                                    ) : (
                                                        <Check size={14} />
                                                    )}
                                                    {completing
                                                        ? "Completing..."
                                                        : "Mark complete"}
                                                </button>
                                            </div>
                                        </section>
                                    )}
                                </div>
                            )}

                            {/* ITEMS */}
                            {activeTab === "items" && (
                                <section className="space-y-4">
                                    <div>
                                        <h3
                                            className={`text-lg font-black ${darkMode
                                                    ? "text-white"
                                                    : "text-slate-900"
                                                }`}
                                        >
                                            Included items
                                        </h3>
                                        <p
                                            className={`mt-1 text-sm ${darkMode
                                                    ? "text-slate-500"
                                                    : "text-slate-500"
                                                }`}
                                        >
                                            Items the client confirmed on the
                                            accepted quotation.
                                        </p>
                                    </div>

                                    {(quotation.included_items || []).length ===
                                        0 ? (
                                        <div
                                            className={`rounded-2xl border border-dashed p-12 text-center ${darkMode
                                                    ? "border-slate-800 bg-slate-900/30"
                                                    : "border-slate-300 bg-white"
                                                }`}
                                        >
                                            <Box
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
                                                No items on this procurement.
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            {(quotation.included_items || []).map(
                                                (item) => (
                                                    <QuotationItemRow
                                                        key={item.id}
                                                        item={item}
                                                        darkMode={darkMode}
                                                    />
                                                )
                                            )}
                                        </div>
                                    )}

                                    {(quotation.removed_items || []).length >
                                        0 && (
                                            <div className="mt-6 space-y-4">
                                                <div>
                                                    <h3
                                                        className={`text-lg font-black ${darkMode
                                                                ? "text-white"
                                                                : "text-slate-900"
                                                            }`}
                                                    >
                                                        Removed items
                                                    </h3>
                                                    <p
                                                        className={`mt-1 text-sm ${darkMode
                                                                ? "text-slate-500"
                                                                : "text-slate-500"
                                                            }`}
                                                    >
                                                        These items were removed by
                                                        the client before
                                                        acceptance.
                                                    </p>
                                                </div>

                                                <div className="space-y-3">
                                                    {quotation.removed_items.map(
                                                        (item) => (
                                                            <QuotationItemRow
                                                                key={item.id}
                                                                item={item}
                                                                darkMode={darkMode}
                                                            />
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                </section>
                            )}

                            {/* TRACKING */}
                            {activeTab === "tracking" && (
                                <section className="space-y-4">
                                    {!isCompleted && (
                                        <TrackingForm
                                            onSubmit={handleSubmitTracking}
                                            submitting={submittingTracking}
                                            error={trackingError}
                                            disabled={false}
                                            darkMode={darkMode}
                                        />
                                    )}

                                    {isCompleted && (
                                        <div
                                            className={`flex items-start gap-3 rounded-2xl border p-4 ${darkMode
                                                    ? "border-emerald-500/20 bg-emerald-500/[0.06]"
                                                    : "border-emerald-200 bg-emerald-50"
                                                }`}
                                        >
                                            <div
                                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${darkMode
                                                        ? "bg-emerald-500/15 text-emerald-300"
                                                        : "bg-emerald-100 text-emerald-600"
                                                    }`}
                                            >
                                                <Lock size={15} />
                                            </div>
                                            <p
                                                className={`text-sm leading-6 ${darkMode
                                                        ? "text-emerald-300"
                                                        : "text-emerald-800"
                                                    }`}
                                            >
                                                This procurement is completed.
                                                No further tracking updates can
                                                be posted.
                                            </p>
                                        </div>
                                    )}

                                    <div>
                                        <h3
                                            className={`text-lg font-black ${darkMode
                                                    ? "text-white"
                                                    : "text-slate-900"
                                                }`}
                                        >
                                            Tracking history
                                        </h3>
                                        <p
                                            className={`mt-1 text-sm ${darkMode
                                                    ? "text-slate-500"
                                                    : "text-slate-500"
                                                }`}
                                        >
                                            Every update posted for this
                                            procurement, newest first.
                                        </p>
                                    </div>

                                    {tracking.length === 0 ? (
                                        <div
                                            className={`rounded-2xl border border-dashed p-12 text-center ${darkMode
                                                    ? "border-slate-800 bg-slate-900/30"
                                                    : "border-slate-300 bg-white"
                                                }`}
                                        >
                                            <Truck
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
                                                No tracking updates yet.
                                            </p>
                                            <p
                                                className={`mt-1 text-xs ${darkMode
                                                        ? "text-slate-600"
                                                        : "text-slate-400"
                                                    }`}
                                            >
                                                Post the first update above.
                                            </p>
                                        </div>
                                    ) : (
                                        <ol className="relative space-y-3">
                                            {tracking.map((entry, index) => (
                                                <TrackingEntry
                                                    key={entry.id}
                                                    entry={entry}
                                                    darkMode={darkMode}
                                                    isFirst={index === 0}
                                                    isLast={
                                                        index ===
                                                        tracking.length - 1
                                                    }
                                                />
                                            ))}
                                        </ol>
                                    )}
                                </section>
                            )}
                        </>
                    )}
                </div>
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
                <Package size={28} />
            </div>

            <h3
                className={`relative mt-4 text-lg font-black ${darkMode ? "text-white" : "text-slate-900"
                    }`}
            >
                {search ? "No procurement found" : "No procurement yet"}
            </h3>

            <p
                className={`relative mx-auto mt-2 max-w-md text-sm leading-6 ${darkMode ? "text-slate-400" : "text-slate-500"
                    }`}
            >
                {search
                    ? "Try changing your search."
                    : "Accepted procurement quotations will appear here."}
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
        violet: darkMode
            ? "bg-violet-400/10 text-violet-300 ring-violet-400/20"
            : "bg-violet-50 text-violet-600 ring-violet-100",
    };

    const glows = {
        sky: "bg-sky-500/20",
        amber: "bg-amber-500/20",
        emerald: "bg-emerald-500/20",
        violet: "bg-violet-500/20",
    };

    return (
        <div
            className={`group relative overflow-hidden rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-1 ${darkMode
                    ? "border-white/[0.07] bg-white/[0.025] hover:border-white/[0.14] hover:shadow-xl hover:shadow-black/30"
                    : "border-slate-200 bg-white shadow-sm hover:border-slate-300 hover:shadow-md"
                }`}
        >
            <div
                className={`pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100 ${glows[accent]}`}
            />

            <div
                className={`relative flex h-10 w-10 items-center justify-center rounded-xl ring-1 transition-transform duration-300 group-hover:scale-110 ${accents[accent]}`}
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

function ProcurementDetailsSkeleton({ darkMode }) {
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
            {block("h-64")}
        </div>
    );
}

function StaffProcurementSkeleton({ darkMode }) {
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
                {block("h-9 w-32")}
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


/* ============================================================
   MAIN
============================================================ */

export default function StaffProcurement({ darkMode = false }) {
    const [procurements, setProcurements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [sort, setSort] = useState("recent");
    const [selected, setSelected] = useState(null);

    const listRequestRef = useRef(0);

    const loadProcurements = useCallback(async (isRefresh = false) => {
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

            const response = await fetch(`${API_URL}/api/procurement/staff/`, {
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
                        `Unable to load procurement. HTTP ${response.status}.`
                    )
                );
            }

            const list = normalizeArray(data)
                .map(normalizeProcurement)
                .filter((item) => isProcurementStatus(item.status));

            setProcurements(list);
        } catch (err) {
            if (requestId !== listRequestRef.current) return;
            console.error("STAFF PROCUREMENT LIST ERROR:", err);
            setError(err?.message || "Unable to load procurement.");
        } finally {
            if (requestId === listRequestRef.current) {
                setLoading(false);
                setRefreshing(false);
            }
        }
    }, []);

    useEffect(() => {
        loadProcurements();
        return () => {
            listRequestRef.current += 1;
        };
    }, [loadProcurements]);

    useEffect(() => {
        const handleFocus = () => loadProcurements(true);
        window.addEventListener("focus", handleFocus);
        return () => window.removeEventListener("focus", handleFocus);
    }, [loadProcurements]);

    const filtered = useMemo(() => {
        const query = search.trim().toLowerCase();

        const list = procurements.filter((item) => {
            const status = normalizeStatus(item.status);
            const trackingStatus = normalizeStatus(
                item.latest_tracking_status
            );

            const matchesStatus =
                statusFilter === "all" ||
                (statusFilter === "active" && status === "accepted") ||
                (statusFilter === "completed" && status === "completed") ||
                (statusFilter === "in_transit" && trackingStatus === "in_transit");

            if (!matchesStatus) return false;
            if (!query) return true;

            const title = String(item.title || item.name || "").toLowerCase();
            const client = String(
                item.client || item.lead_name || ""
            ).toLowerCase();
            const code = String(
                item.procurement_code || item.code || ""
            ).toLowerCase();

            return (
                title.includes(query) ||
                client.includes(query) ||
                code.includes(query)
            );
        });

        const sorted = [...list];
        switch (sort) {
            case "value":
                sorted.sort(
                    (a, b) =>
                        Number(b.quotation?.total || b.total_price || 0) -
                        Number(a.quotation?.total || a.total_price || 0)
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
    }, [procurements, search, statusFilter, sort]);

    const statistics = useMemo(() => {
        const total = procurements.length;
        const active = procurements.filter(
            (item) => !isCompletedStatus(item.status)
        ).length;
        const completed = procurements.filter((item) =>
            isCompletedStatus(item.status)
        ).length;
        const inTransit = procurements.filter(
            (item) =>
                normalizeStatus(item.latest_tracking_status) === "in_transit"
        ).length;

        return { total, active, completed, inTransit };
    }, [procurements]);

    const updateProcurement = useCallback((updated) => {
        if (!updated?.id) return;
        const normalized = normalizeProcurement(updated);

        setProcurements((current) =>
            current.map((item) =>
                String(item.id) === String(normalized.id)
                    ? normalizeProcurement({ ...item, ...normalized })
                    : item
            )
        );

        setSelected((current) =>
            current && String(current.id) === String(normalized.id)
                ? normalizeProcurement({ ...current, ...normalized })
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
                    <StaffProcurementSkeleton darkMode={darkMode} />
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
                            onClick={() => window.history.back()}
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
                                Procurement
                            </span>
                        </div>
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
                            <Package size={26} />
                        </div>

                        <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                                <h1
                                    className={`text-2xl font-black tracking-tight sm:text-3xl ${darkMode ? "text-white" : "text-slate-900"
                                        }`}
                                >
                                    Procurement
                                </h1>
                                <span
                                    className={`rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${darkMode
                                            ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-300"
                                            : "border-cyan-200 bg-cyan-50 text-cyan-700"
                                        }`}
                                >
                                    {statistics.total}{" "}
                                    {statistics.total === 1 ? "record" : "records"}
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
                                Manage accepted procurement quotations and post
                                tracking updates.
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => loadProcurements(true)}
                        disabled={refreshing}
                        className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-bold transition-all ${darkMode
                                ? "border-white/[0.08] bg-white/[0.03] text-slate-200 hover:bg-white/[0.06]"
                                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:shadow-sm"
                            } disabled:opacity-60`}
                    >
                        <RefreshCw
                            size={14}
                            className={
                                refreshing ? "animate-spin text-cyan-500" : ""
                            }
                        />
                        {refreshing ? "Refreshing..." : "Refresh"}
                    </button>
                </div>

                {/* STATS */}
                <div className="mt-7 grid grid-cols-2 gap-4 lg:grid-cols-4">
                    <StatCard
                        icon={<Package size={18} />}
                        label="Total"
                        value={statistics.total}
                        darkMode={darkMode}
                        accent="sky"
                    />
                    <StatCard
                        icon={<Clock3 size={18} />}
                        label="Active"
                        value={statistics.active}
                        darkMode={darkMode}
                        accent="amber"
                    />
                    <StatCard
                        icon={<Truck size={18} />}
                        label="In Transit"
                        value={statistics.inTransit}
                        darkMode={darkMode}
                        accent="violet"
                    />
                    <StatCard
                        icon={<CheckCircle2 size={18} />}
                        label="Completed"
                        value={statistics.completed}
                        darkMode={darkMode}
                        accent="emerald"
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
                                placeholder="Search procurement, clients, or codes..."
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
                                ["in_transit", "In Transit"],
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
                                {filtered.length}
                            </span>{" "}
                            of{" "}
                            <span
                                className={`font-bold ${darkMode ? "text-slate-300" : "text-slate-600"
                                    }`}
                            >
                                {procurements.length}
                            </span>{" "}
                            procurement records
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
                                    Unable to load procurement
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

                {/* LIST */}
                {filtered.length === 0 ? (
                    <EmptyState search={search} darkMode={darkMode} />
                ) : (
                    <div className="mt-6 grid gap-4 lg:grid-cols-2">
                        {filtered.map((item) => (
                            <ProcurementCard
                                key={item.id}
                                procurement={item}
                                onOpen={setSelected}
                                darkMode={darkMode}
                            />
                        ))}
                    </div>
                )}
            </main>

            {/* DETAIL MODAL */}
            {selected && (
                <ProcurementErrorBoundary>
                    <ProcurementDetails
                        procurement={selected}
                        onClose={() => setSelected(null)}
                        onProcurementUpdate={updateProcurement}
                        darkMode={darkMode}
                    />
                </ProcurementErrorBoundary>
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