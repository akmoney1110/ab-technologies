// src/pages/portal/ProcurementList.jsx

import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import {
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
    Box,
    Calendar,
    CheckCircle2,
    ChevronDown,
    ChevronRight,
    ClipboardList,
    Clock3,
    Copy,
    DollarSign,
    FileText,
    Filter,
    Grid3x3,
    Hash,
    Info,
    LayoutList,
    Package,
    PackageCheck,
    PackageOpen,
    RefreshCw,
    Search,
    ShoppingCart,
    SlidersHorizontal,
    Sparkles,
    Tag,
    TrendingUp,
    Users,
    X,
    Zap,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

const API_URL =
    import.meta.env.VITE_API_URL ||
    "http://127.0.0.1:8000";


/* ============================================================
   HELPERS
============================================================ */

function getToken() {
    return (
        localStorage.getItem("access") ||
        localStorage.getItem("access_token") ||
        localStorage.getItem("token") ||
        ""
    );
}

function formatDate(value) {
    if (!value) return "—";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "—";
    return new Intl.DateTimeFormat(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
    }).format(date);
}

function formatDateTime(value) {
    if (!value) return "—";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "—";
    return new Intl.DateTimeFormat(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
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

function formatCurrency(amount, currency = "NGN") {
    if (amount === null || amount === undefined || amount === "") return "—";
    const numericAmount = Number(amount);
    if (Number.isNaN(numericAmount)) return `${currency || "NGN"} ${amount}`;
    try {
        return new Intl.NumberFormat(undefined, {
            style: "currency",
            currency: currency || "NGN",
            maximumFractionDigits: 2,
        }).format(numericAmount);
    } catch {
        return `${currency || "NGN"} ${numericAmount.toLocaleString()}`;
    }
}

function getStatusValue(status) {
    return String(status || "").trim().toLowerCase();
}

function getStatusLabel(status) {
    const value = getStatusValue(status);
    const labels = {
        accepted: "Accepted",
        completed: "Completed",
        ready: "Ready",
        sent: "Sent",
        viewed: "Viewed",
        negotiation: "Negotiation",
        revision_requested: "Revision Requested",
        rejected: "Rejected",
        expired: "Expired",
        cancelled: "Cancelled",
        draft: "Draft",
        pending: "Pending",
        processing: "Processing",
    };
    return labels[value] || status || "Unknown";
}

function statusTheme(status, darkMode) {
    const value = getStatusValue(status);

    if (value === "completed") {
        return {
            chip: darkMode
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                : "border-emerald-200 bg-emerald-50 text-emerald-700",
            dot: "bg-emerald-500",
            glow: "bg-emerald-500/20",
        };
    }
    if (value === "accepted") {
        return {
            chip: darkMode
                ? "border-sky-500/30 bg-sky-500/10 text-sky-300"
                : "border-sky-200 bg-sky-50 text-sky-700",
            dot: "bg-sky-500",
            glow: "bg-sky-500/20",
        };
    }
    if (value === "negotiation" || value === "revision_requested") {
        return {
            chip: darkMode
                ? "border-amber-500/30 bg-amber-500/10 text-amber-300"
                : "border-amber-200 bg-amber-50 text-amber-700",
            dot: "bg-amber-500",
            glow: "bg-amber-500/20",
        };
    }
    if (value === "rejected" || value === "cancelled" || value === "expired") {
        return {
            chip: darkMode
                ? "border-red-500/30 bg-red-500/10 text-red-300"
                : "border-red-200 bg-red-50 text-red-700",
            dot: "bg-red-500",
            glow: "bg-red-500/20",
        };
    }
    if (value === "sent" || value === "viewed" || value === "ready") {
        return {
            chip: darkMode
                ? "border-indigo-500/30 bg-indigo-500/10 text-indigo-300"
                : "border-indigo-200 bg-indigo-50 text-indigo-700",
            dot: "bg-indigo-500",
            glow: "bg-indigo-500/20",
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

function getRequestTypeLabel(type) {
    const value = String(type || "").trim().toLowerCase();
    const labels = {
        procurement: "Procurement",
        service: "Service",
        product: "Product",
        mixed: "Mixed Request",
        other: "Other",
    };
    return labels[value] || type || "Procurement";
}

function getItemCount(item) {
    if (item?.item_count !== undefined && item?.item_count !== null) {
        return Number(item.item_count) || 0;
    }
    return Array.isArray(item?.items)
        ? item.items.filter((p) => p?.included !== false).length
        : 0;
}

function getTotalQuantity(item) {
    if (item?.total_quantity !== undefined && item?.total_quantity !== null) {
        return Number(item.total_quantity) || 0;
    }
    if (!Array.isArray(item?.items)) return 0;
    return item.items
        .filter((p) => p?.included !== false)
        .reduce((sum, p) => sum + (Number(p?.quantity) || 0), 0);
}

function getVisibleProducts(item) {
    if (!Array.isArray(item?.items)) return [];
    return item.items.filter(
        (p) => p?.included !== false && Number(p?.quantity || 0) > 0
    );
}


/* ============================================================
   SMALL HOOKS / UTILITIES
============================================================ */

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

function CountUp({ value, duration = 900, format }) {
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
    return <>{Math.round(display).toLocaleString()}</>;
}


/* ============================================================
   MAIN COMPONENT
============================================================ */

export default function ProcurementList({ darkMode = false }) {
    const navigate = useNavigate();

    const [procurement, setProcurement] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [sort, setSort] = useState("recent");
    const [view, setView] = useState("list");
    const [copiedId, setCopiedId] = useState(null);

    /* ========================================================
       LOAD
    ======================================================== */
    const loadProcurement = useCallback(
        async ({ silent = false } = {}) => {
            const token = getToken();
            if (!token) {
                navigate("/login");
                return;
            }

            if (silent) setRefreshing(true);
            else setLoading(true);

            setError("");

            try {
                const response = await fetch(
                    `${API_URL}/api/proposals/client/procurement/`,
                    {
                        method: "GET",
                        headers: {
                            Accept: "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const responseText = await response.text();
                let data = {};
                try {
                    data = responseText ? JSON.parse(responseText) : {};
                } catch {
                    throw new Error(
                        `Server returned an invalid response (${response.status}).`
                    );
                }

                if (response.status === 401) {
                    localStorage.removeItem("access");
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("token");
                    navigate("/login");
                    return;
                }

                if (!response.ok) {
                    throw new Error(
                        data?.detail || data?.error || "Unable to load procurement."
                    );
                }

                if (data?.success === false) {
                    throw new Error(data?.error || "Unable to load procurement.");
                }

                setProcurement(
                    Array.isArray(data?.procurement) ? data.procurement : []
                );
            } catch (err) {
                console.error("Procurement list error:", err);
                setError(err?.message || "Unable to load procurement.");
            } finally {
                setLoading(false);
                setRefreshing(false);
            }
        },
        [navigate]
    );

    useEffect(() => {
        loadProcurement();
    }, [loadProcurement]);

    /* ========================================================
       FILTER + SORT
    ======================================================== */
    const filteredProcurement = useMemo(() => {
        const searchValue = search.trim().toLowerCase();

        const filtered = procurement.filter((item) => {
            const itemStatus = getStatusValue(item.status);
            const matchesStatus =
                statusFilter === "all" || itemStatus === statusFilter;
            if (!matchesStatus) return false;
            if (!searchValue) return true;

            const searchableText = [
                item.title,
                item.request_type,
                item.description,
                item.purpose,
                item.notes,
                item.quote_request_id,
                item.currency,
                ...(item.items || []).flatMap((p) => [
                    p?.name,
                    p?.brand,
                    p?.model,
                    p?.category,
                    p?.description,
                    p?.specifications,
                ]),
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();

            return searchableText.includes(searchValue);
        });

        const sorted = [...filtered];
        switch (sort) {
            case "value-high":
                sorted.sort(
                    (a, b) => (Number(b.total) || 0) - (Number(a.total) || 0)
                );
                break;
            case "value-low":
                sorted.sort(
                    (a, b) => (Number(a.total) || 0) - (Number(b.total) || 0)
                );
                break;
            case "title":
                sorted.sort((a, b) =>
                    String(a.title || "").localeCompare(String(b.title || ""))
                );
                break;
            case "deadline":
                sorted.sort((a, b) => {
                    if (!a.deadline) return 1;
                    if (!b.deadline) return -1;
                    return new Date(a.deadline) - new Date(b.deadline);
                });
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
    }, [procurement, search, statusFilter, sort]);

    /* ========================================================
       SUMMARY
    ======================================================== */
    const summary = useMemo(() => {
        const total = procurement.length;
        const accepted = procurement.filter(
            (item) => getStatusValue(item.status) === "accepted"
        ).length;
        const completed = procurement.filter(
            (item) => getStatusValue(item.status) === "completed"
        ).length;
        const totalItems = procurement.reduce(
            (sum, item) => sum + getItemCount(item),
            0
        );
        const totalQuantity = procurement.reduce(
            (sum, item) => sum + getTotalQuantity(item),
            0
        );
        const totalValue = procurement.reduce((sum, item) => {
            const value = Number(item?.total);
            if (Number.isNaN(value)) return sum;
            return sum + value;
        }, 0);

        return {
            total,
            accepted,
            completed,
            totalItems,
            totalQuantity,
            totalValue,
        };
    }, [procurement]);

    /* ========================================================
       ACTIONS
    ======================================================== */
    function openProcurement(item) {
        if (!item?.public_token) {
            setError(
                "This procurement does not have a valid proposal reference."
            );
            return;
        }
        navigate(`/proposals/${item.public_token}`);
    }

    function openProcurementDetails(item) {
        if (!item?.public_token) {
            setError(
                "This procurement does not have a valid proposal reference."
            );
            return;
        }
        navigate(`/procurement/${item.public_token}`);
    }

    function clearFilters() {
        setSearch("");
        setStatusFilter("all");
        setSort("recent");
    }

    function copyReference(item) {
        const value = item?.quote_request_id;
        if (!value) return;
        try {
            navigator.clipboard.writeText(String(value));
            setCopiedId(item.id);
            setTimeout(() => setCopiedId(null), 1800);
        } catch {
            // silently fail
        }
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
                    <ProcurementListSkeleton darkMode={darkMode} />
                </div>
            </div>
        );
    }

    /* ========================================================
       RENDER
    ======================================================== */
    return (
        <div className={`min-h-screen ${pageClasses}`}>
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                {/* ============================================
                    BREADCRUMB + BACK
                ============================================ */}
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
                            <Link
                                to="/portal/dashboard"
                                className={`transition-colors ${darkMode
                                    ? "hover:text-slate-300"
                                    : "hover:text-slate-600"
                                    }`}
                            >
                                Dashboard
                            </Link>
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

                    <Link
                        to="/portal/support"
                        className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-bold transition-colors ${darkMode
                            ? "border-white/[0.08] text-slate-400 hover:bg-white/[0.04] hover:text-white"
                            : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                            }`}
                    >
                        <Users size={14} />
                        Get help
                    </Link>
                </div>

                {/* ============================================
                    HEADER
                ============================================ */}
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
                                    {summary.total}{" "}
                                    {summary.total === 1 ? "record" : "records"}
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
                                className={`mt-2 max-w-2xl text-sm leading-6 ${darkMode
                                    ? "text-slate-400"
                                    : "text-slate-500"
                                    }`}
                            >
                                Track your procurement quotations, requested items,
                                approved purchases, and complete procurement history.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <ViewToggle
                            view={view}
                            setView={setView}
                            darkMode={darkMode}
                        />
                        <button
                            type="button"
                            onClick={() => loadProcurement({ silent: true })}
                            disabled={refreshing}
                            className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-bold transition-all ${darkMode
                                ? "border-white/[0.08] bg-white/[0.03] text-slate-200 hover:bg-white/[0.06]"
                                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:shadow-sm"
                                } disabled:opacity-60`}
                        >
                            <RefreshCw
                                size={14}
                                className={refreshing ? "animate-spin text-cyan-500" : ""}
                            />
                            {refreshing ? "Refreshing..." : "Refresh"}
                        </button>
                    </div>
                </div>

                {/* ============================================
                    ERROR
                ============================================ */}
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
                                <Info size={16} />
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
                                    ? "text-red-300 hover:bg-red-500/10 hover:text-red-200"
                                    : "text-red-500 hover:bg-red-100 hover:text-red-700"
                                    }`}
                                aria-label="Dismiss error"
                            >
                                <X size={15} />
                            </button>
                        </div>
                    </div>
                )}

                {/* ============================================
                    SUMMARY CARDS
                ============================================ */}
                <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <SummaryCard
                        label="Total Procurement"
                        value={summary.total}
                        icon={Package}
                        darkMode={darkMode}
                        accent="sky"
                        trend={8}
                    />
                    <SummaryCard
                        label="Accepted"
                        value={summary.accepted}
                        icon={CheckCircle2}
                        darkMode={darkMode}
                        accent="emerald"
                        trend={4}
                    />
                    <SummaryCard
                        label="Completed"
                        value={summary.completed}
                        icon={PackageCheck}
                        darkMode={darkMode}
                        accent="violet"
                        trend={12}
                    />
                    <SummaryCard
                        label="Requested Items"
                        value={summary.totalItems}
                        icon={PackageOpen}
                        darkMode={darkMode}
                        accent="amber"
                    />
                </div>

                {/* ============================================
                    OVERVIEW STRIP
                ============================================ */}
                {summary.totalQuantity > 0 && (
                    <div
                        className={`mt-4 overflow-hidden rounded-2xl border ${darkMode
                            ? "border-white/[0.07] bg-gradient-to-br from-white/[0.03] to-transparent"
                            : "border-slate-200 bg-gradient-to-br from-white to-slate-50/60 shadow-sm"
                            }`}
                    >
                        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-4">
                                <div
                                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${darkMode
                                        ? "bg-cyan-400/10 text-cyan-300"
                                        : "bg-cyan-50 text-cyan-600"
                                        }`}
                                >
                                    <ShoppingCart size={18} />
                                </div>
                                <div>
                                    <p
                                        className={`text-[10px] font-black uppercase tracking-wider ${darkMode
                                            ? "text-slate-500"
                                            : "text-slate-400"
                                            }`}
                                    >
                                        Procurement overview
                                    </p>
                                    <p
                                        className={`mt-1 text-sm ${darkMode
                                            ? "text-slate-400"
                                            : "text-slate-600"
                                            }`}
                                    >
                                        You have{" "}
                                        <span
                                            className={`font-bold ${darkMode
                                                ? "text-white"
                                                : "text-slate-900"
                                                }`}
                                        >
                                            {summary.totalQuantity.toLocaleString()}
                                        </span>{" "}
                                        requested units across{" "}
                                        <span
                                            className={`font-bold ${darkMode
                                                ? "text-white"
                                                : "text-slate-900"
                                                }`}
                                        >
                                            {summary.totalItems.toLocaleString()}
                                        </span>{" "}
                                        item types.
                                    </p>
                                </div>
                            </div>

                            <div className="sm:text-right">
                                <p
                                    className={`text-[10px] font-black uppercase tracking-wider ${darkMode
                                        ? "text-slate-500"
                                        : "text-slate-400"
                                        }`}
                                >
                                    Quoted value
                                </p>
                                <p
                                    className={`mt-1 bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-xl font-black text-transparent`}
                                >
                                    {formatCurrency(summary.totalValue)}
                                </p>
                                <p
                                    className={`text-[10px] ${darkMode
                                        ? "text-slate-500"
                                        : "text-slate-400"
                                        }`}
                                >
                                    Combined displayed totals
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* ============================================
                    FILTERS (STICKY)
                ============================================ */}
                <div
                    className={`sticky top-[76px] z-20 mt-7 rounded-2xl border p-3 backdrop-blur-xl ${darkMode
                        ? "border-white/[0.07] bg-[#020611]/85"
                        : "border-slate-200 bg-white/85"
                        }`}
                >
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                        {/* SEARCH */}
                        <div className="relative flex-1">
                            <Search
                                size={17}
                                className={`pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 ${darkMode
                                    ? "text-slate-500"
                                    : "text-slate-400"
                                    }`}
                            />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search procurement, products, brands, models..."
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

                        {/* FILTER CHIPS */}
                        <div
                            className={`inline-flex items-center gap-1 rounded-xl border p-1 ${darkMode
                                ? "border-white/[0.08] bg-white/[0.03]"
                                : "border-slate-200 bg-slate-50"
                                }`}
                        >
                            {[
                                ["all", "All"],
                                ["accepted", "Accepted"],
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

                        {/* SORT */}
                        <SortDropdown
                            sort={sort}
                            setSort={setSort}
                            darkMode={darkMode}
                        />

                        {/* CLEAR */}
                        {(search || statusFilter !== "all" || sort !== "recent") && (
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

                    {/* FILTER RESULT COUNT */}
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
                                {filteredProcurement.length}
                            </span>{" "}
                            of{" "}
                            <span
                                className={`font-bold ${darkMode ? "text-slate-300" : "text-slate-600"
                                    }`}
                            >
                                {procurement.length}
                            </span>{" "}
                            procurement records
                        </span>
                        {(search ||
                            statusFilter !== "all" ||
                            sort !== "recent") && (
                                <span className="inline-flex items-center gap-1">
                                    <Filter size={11} />
                                    Filters are active
                                </span>
                            )}
                    </div>
                </div>

                {/* ============================================
                    EMPTY STATE
                ============================================ */}
                {!error && filteredProcurement.length === 0 && (
                    <div
                        className={`relative mt-7 overflow-hidden rounded-3xl border border-dashed px-6 py-20 text-center ${darkMode
                            ? "border-slate-800 bg-slate-900/30"
                            : "border-slate-300 bg-white"
                            }`}
                    >
                        <div
                            className={`pointer-events-none absolute -top-20 left-1/2 h-56 w-96 -translate-x-1/2 rounded-full blur-3xl ${darkMode ? "bg-cyan-400/10" : "bg-cyan-100/60"
                                }`}
                        />

                        <div className="pointer-events-none absolute inset-0">
                            {[...Array(12)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`absolute h-1 w-1 rounded-full ${darkMode
                                        ? "bg-cyan-400/30"
                                        : "bg-cyan-400/40"
                                        }`}
                                    style={{
                                        left: `${8 + ((i * 7) % 90)}%`,
                                        top: `${15 + ((i * 11) % 70)}%`,
                                        animation: `floatDot ${3 + (i % 3)
                                            }s ease-in-out infinite`,
                                        animationDelay: `${i * 0.2}s`,
                                    }}
                                />
                            ))}
                        </div>

                        <div
                            className={`relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ring-1 ${darkMode
                                ? "bg-gradient-to-br from-cyan-400/15 to-cyan-400/5 text-cyan-300 ring-cyan-400/20"
                                : "bg-gradient-to-br from-cyan-50 to-cyan-100/60 text-cyan-600 ring-cyan-100"
                                }`}
                        >
                            <Package size={28} />
                        </div>

                        <h2
                            className={`relative mt-6 text-lg font-black ${darkMode ? "text-white" : "text-slate-900"
                                }`}
                        >
                            No procurement found
                        </h2>

                        <p
                            className={`relative mx-auto mt-2 max-w-md text-sm leading-6 ${darkMode ? "text-slate-400" : "text-slate-500"
                                }`}
                        >
                            {search || statusFilter !== "all"
                                ? "No procurement records match your current search or filter."
                                : "You don't have any accepted or completed procurement quotations yet."}
                        </p>

                        {(search || statusFilter !== "all" || sort !== "recent") && (
                            <button
                                type="button"
                                onClick={clearFilters}
                                className="relative mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/30 transition-all hover:-translate-y-0.5 hover:shadow-cyan-500/50"
                            >
                                <X size={15} />
                                Clear filters
                            </button>
                        )}

                        <style>{`
                            @keyframes floatDot {
                                0%, 100% { transform: translateY(0); opacity: 0.3; }
                                50% { transform: translateY(-10px); opacity: 1; }
                            }
                        `}</style>
                    </div>
                )}

                {/* ============================================
                    LIST
                ============================================ */}
                {filteredProcurement.length > 0 && (
                    <div
                        className={
                            view === "grid"
                                ? "mt-7 grid gap-4 xl:grid-cols-2"
                                : "mt-7 space-y-4"
                        }
                    >
                        {filteredProcurement.map((item) => (
                            <ProcurementCard
                                key={item.id}
                                item={item}
                                darkMode={darkMode}
                                view={view}
                                onOpen={() => openProcurement(item)}
                                onDetails={() => openProcurementDetails(item)}
                                copied={copiedId === item.id}
                                onCopy={() => copyReference(item)}
                            />
                        ))}
                    </div>
                )}

                {/* ============================================
                    FOOTER CTA
                ============================================ */}
                <div
                    className={`mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border p-5 sm:flex-row sm:p-6 ${darkMode
                        ? "border-white/[0.07] bg-gradient-to-br from-white/[0.03] to-transparent"
                        : "border-slate-200 bg-gradient-to-br from-white to-slate-50/60 shadow-sm"
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
                                Need to source something specific?
                            </p>
                            <p
                                className={`mt-0.5 text-xs ${darkMode ? "text-slate-500" : "text-slate-500"
                                    }`}
                            >
                                Our procurement team can source and deliver enterprise-grade hardware.
                            </p>
                        </div>
                    </div>

                    <Link
                        to="/portal/support"
                        className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/30 transition-all hover:-translate-y-0.5 hover:shadow-cyan-500/50"
                    >
                        Start a request
                        <ArrowRight size={15} />
                    </Link>
                </div>
            </div>
        </div>
    );
}


/* ============================================================
   SUMMARY CARD
============================================================ */

function SummaryCard({
    label,
    value,
    icon: Icon,
    darkMode,
    accent = "sky",
    trend,
}) {
    const accents = {
        sky: darkMode
            ? "bg-sky-400/10 text-sky-300 ring-sky-400/20"
            : "bg-sky-50 text-sky-600 ring-sky-100",
        emerald: darkMode
            ? "bg-emerald-400/10 text-emerald-300 ring-emerald-400/20"
            : "bg-emerald-50 text-emerald-600 ring-emerald-100",
        violet: darkMode
            ? "bg-violet-400/10 text-violet-300 ring-violet-400/20"
            : "bg-violet-50 text-violet-600 ring-violet-100",
        amber: darkMode
            ? "bg-amber-400/10 text-amber-300 ring-amber-400/20"
            : "bg-amber-50 text-amber-600 ring-amber-100",
    };

    const glows = {
        sky: "bg-sky-500/20",
        emerald: "bg-emerald-500/20",
        violet: "bg-violet-500/20",
        amber: "bg-amber-500/20",
    };

    return (
        <div
            className={`group relative overflow-hidden rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 ${darkMode
                ? "border-white/[0.07] bg-white/[0.025] hover:border-white/[0.14] hover:shadow-xl hover:shadow-black/30"
                : "border-slate-200 bg-white shadow-sm hover:border-slate-300 hover:shadow-lg"
                }`}
        >
            <div
                className={`pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100 ${glows[accent]
                    }`}
            />

            <div className="relative flex items-start justify-between gap-4">
                <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ring-1 transition-transform duration-300 group-hover:scale-110 ${accents[accent]
                        }`}
                >
                    <Icon size={19} />
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

            <div className="relative mt-5">
                <p
                    className={`text-[10px] font-black uppercase tracking-wider ${darkMode ? "text-slate-500" : "text-slate-400"
                        }`}
                >
                    {label}
                </p>
                <p
                    className={`mt-1.5 text-2xl font-black tracking-tight ${darkMode ? "text-white" : "text-slate-900"
                        }`}
                >
                    <CountUp value={Number(value || 0)} />
                </p>
            </div>
        </div>
    );
}


/* ============================================================
   VIEW TOGGLE
============================================================ */

function ViewToggle({ view, setView, darkMode }) {
    const options = [
        { value: "list", icon: LayoutList, label: "List" },
        { value: "grid", icon: Grid3x3, label: "Grid" },
    ];

    return (
        <div
            className={`hidden items-center gap-1 rounded-xl border p-1 sm:inline-flex ${darkMode
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
                    <span className="hidden md:inline">{label}</span>
                </button>
            ))}
        </div>
    );
}


/* ============================================================
   SORT DROPDOWN
============================================================ */

function SortDropdown({ sort, setSort, darkMode }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    useOutsideClick(ref, () => setOpen(false));

    const options = [
        { value: "recent", label: "Recently updated" },
        { value: "title", label: "Title (A–Z)" },
        { value: "value-high", label: "Value (high → low)" },
        { value: "value-low", label: "Value (low → high)" },
        { value: "deadline", label: "Deadline (soonest)" },
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
                    <SlidersHorizontal size={13} />
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
   PROCUREMENT CARD
============================================================ */

function ProcurementCard({
    item,
    darkMode,
    view,
    onOpen,
    onDetails,
    copied,
    onCopy,
}) {
    const products = getVisibleProducts(item);
    const itemCount = getItemCount(item);
    const totalQuantity = getTotalQuantity(item);
    const theme = statusTheme(item.status, darkMode);
    const statusValue = getStatusValue(item.status);
    const isCompleted = statusValue === "completed";
    const isAccepted = statusValue === "accepted";

    const referenceId = item.quote_request_id
        ? `#${String(item.quote_request_id).slice(0, 8)}`
        : "—";

    /* ---------- COMPACT GRID CARD ---------- */
    if (view === "grid") {
        return (
            <div
                className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${darkMode
                    ? "border-white/[0.07] bg-white/[0.025] hover:border-white/[0.14] hover:shadow-2xl hover:shadow-black/40"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/60"
                    }`}
            >
                {/* Top accent bar */}
                <div
                    className={`absolute left-0 right-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 ${isCompleted
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                        : isAccepted
                            ? "bg-gradient-to-r from-sky-500 to-indigo-500"
                            : "bg-gradient-to-r from-cyan-500 to-indigo-500"
                        }`}
                />

                <div className="flex flex-1 flex-col p-5">
                    {/* Status row */}
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <span
                                className={`rounded-md border px-2 py-0.5 text-[9px] font-black uppercase tracking-wider ${darkMode
                                    ? "border-white/[0.08] bg-white/[0.04] text-slate-400"
                                    : "border-slate-200 bg-slate-50 text-slate-500"
                                    }`}
                            >
                                Procurement
                            </span>
                            <span
                                className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${theme.chip}`}
                            >
                                <span className={`h-1.5 w-1.5 rounded-full ${theme.dot}`} />
                                {getStatusLabel(item.status)}
                            </span>
                        </div>

                        <ArrowUpRight
                            size={16}
                            className={`transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${darkMode ? "text-slate-600" : "text-slate-300"
                                }`}
                        />
                    </div>

                    {/* Title */}
                    <h2
                        className={`mt-4 line-clamp-2 text-base font-black tracking-tight ${darkMode ? "text-white" : "text-slate-900"
                            }`}
                    >
                        {item.title || "Procurement Request"}
                    </h2>

                    {item.request_type && (
                        <p
                            className={`mt-1 text-xs font-bold ${darkMode ? "text-slate-500" : "text-slate-500"
                                }`}
                        >
                            {getRequestTypeLabel(item.request_type)}
                        </p>
                    )}

                    {item.description && (
                        <p
                            className={`mt-3 line-clamp-2 text-xs leading-5 ${darkMode ? "text-slate-500" : "text-slate-500"
                                }`}
                        >
                            {item.description}
                        </p>
                    )}

                    {/* Value + meta strip */}
                    <div
                        className={`mt-4 flex items-baseline justify-between gap-3 rounded-xl border px-3 py-3 ${darkMode
                            ? "border-white/[0.06] bg-white/[0.02]"
                            : "border-slate-100 bg-slate-50"
                            }`}
                    >
                        <div>
                            <p
                                className={`text-[9px] font-black uppercase tracking-wider ${darkMode ? "text-slate-500" : "text-slate-400"
                                    }`}
                            >
                                Total
                            </p>
                            <p
                                className={`mt-0.5 text-lg font-black ${darkMode ? "text-white" : "text-slate-900"
                                    }`}
                            >
                                {formatCurrency(item.total, item.currency)}
                            </p>
                        </div>
                        <div className="text-right">
                            <p
                                className={`text-[9px] font-black uppercase tracking-wider ${darkMode ? "text-slate-500" : "text-slate-400"
                                    }`}
                            >
                                Items
                            </p>
                            <p
                                className={`mt-0.5 text-sm font-black ${darkMode ? "text-slate-300" : "text-slate-700"
                                    }`}
                            >
                                {itemCount}
                                <span
                                    className={`ml-1 text-[10px] font-medium ${darkMode ? "text-slate-600" : "text-slate-400"
                                        }`}
                                >
                                    ×{totalQuantity}
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* Products preview */}
                    {products.length > 0 && (
                        <div className="mt-4 flex-1">
                            <div className="space-y-1.5">
                                {products.slice(0, 2).map((p) => (
                                    <div
                                        key={p.id}
                                        className={`flex items-center justify-between gap-2 rounded-lg px-2.5 py-2 ${darkMode
                                            ? "bg-white/[0.02]"
                                            : "bg-slate-50"
                                            }`}
                                    >
                                        <span
                                            className={`truncate text-xs font-bold ${darkMode
                                                ? "text-slate-300"
                                                : "text-slate-700"
                                                }`}
                                        >
                                            {p?.name || "Unnamed item"}
                                        </span>
                                        <span
                                            className={`shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-black ${darkMode
                                                ? "bg-white/[0.05] text-slate-400"
                                                : "bg-white text-slate-600 ring-1 ring-slate-200"
                                                }`}
                                        >
                                            ×{Number(p?.quantity || 0)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            {products.length > 2 && (
                                <p
                                    className={`mt-2 text-[10px] font-bold ${darkMode ? "text-slate-500" : "text-slate-400"
                                        }`}
                                >
                                    +{products.length - 2} more items
                                </p>
                            )}
                        </div>
                    )}

                    {/* Footer */}
                    <div
                        className={`mt-4 flex items-center gap-2 border-t pt-4 ${darkMode ? "border-white/[0.06]" : "border-slate-100"
                            }`}
                    >
                        <button
                            type="button"
                            onClick={onDetails}
                            className={`flex-1 rounded-lg border px-3 py-2 text-[11px] font-bold transition-colors ${darkMode
                                ? "border-white/[0.08] text-slate-300 hover:bg-white/[0.05]"
                                : "border-slate-200 text-slate-600 hover:bg-slate-50"
                                }`}
                        >
                            Details
                        </button>
                        <button
                            type="button"
                            onClick={onOpen}
                            className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 px-3 py-2 text-[11px] font-bold text-white shadow-md shadow-cyan-500/30 transition-all hover:shadow-lg hover:shadow-cyan-500/50"
                        >
                            Quotation
                            <ArrowRight size={11} />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    /* ---------- FULL LIST CARD ---------- */
    return (
        <div
            className={`group overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-0.5 ${darkMode
                ? "border-white/[0.07] bg-white/[0.025] hover:border-white/[0.14] hover:shadow-2xl hover:shadow-black/40"
                : "border-slate-200 bg-white shadow-sm hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/60"
                }`}
        >
            <div className="p-5 sm:p-6">
                {/* TOP */}
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                            <span
                                className={`rounded-md border px-2 py-0.5 text-[9px] font-black uppercase tracking-wider ${darkMode
                                    ? "border-white/[0.08] bg-white/[0.04] text-slate-400"
                                    : "border-slate-200 bg-slate-50 text-slate-500"
                                    }`}
                            >
                                Procurement
                            </span>
                            <span
                                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${theme.chip}`}
                            >
                                <span className={`h-1.5 w-1.5 rounded-full ${theme.dot}`} />
                                {getStatusLabel(item.status)}
                            </span>
                        </div>

                        <h2
                            className={`mt-3 text-xl font-black tracking-tight ${darkMode ? "text-white" : "text-slate-900"
                                }`}
                        >
                            {item.title || "Procurement Request"}
                        </h2>

                        {item.request_type && (
                            <p
                                className={`mt-1 text-sm font-bold ${darkMode ? "text-slate-500" : "text-slate-500"
                                    }`}
                            >
                                {getRequestTypeLabel(item.request_type)}
                            </p>
                        )}

                        {item.description && (
                            <p
                                className={`mt-3 line-clamp-2 max-w-3xl text-sm leading-6 ${darkMode ? "text-slate-400" : "text-slate-500"
                                    }`}
                            >
                                {item.description}
                            </p>
                        )}
                    </div>

                    {/* Total */}
                    <div
                        className={`shrink-0 rounded-2xl border px-5 py-4 lg:min-w-[200px] lg:text-right ${darkMode
                            ? "border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent"
                            : "border-slate-100 bg-gradient-to-br from-slate-50 to-white"
                            }`}
                    >
                        <p
                            className={`text-[10px] font-black uppercase tracking-wider ${darkMode ? "text-slate-500" : "text-slate-400"
                                }`}
                        >
                            Total
                        </p>
                        <p
                            className={`mt-1 text-xl font-black ${darkMode ? "text-white" : "text-slate-900"
                                }`}
                        >
                            {formatCurrency(item.total, item.currency)}
                        </p>
                        {item.currency && (
                            <p
                                className={`mt-0.5 text-[10px] font-bold uppercase tracking-wider ${darkMode ? "text-slate-600" : "text-slate-400"
                                    }`}
                            >
                                {item.currency}
                            </p>
                        )}
                    </div>
                </div>

                {/* META */}
                <div
                    className={`mt-5 grid gap-4 border-y py-4 sm:grid-cols-2 lg:grid-cols-4 ${darkMode ? "border-white/[0.06]" : "border-slate-100"
                        }`}
                >
                    <MetaItem
                        label="Reference"
                        value={referenceId}
                        darkMode={darkMode}
                        copyable={Boolean(item.quote_request_id)}
                        copied={copied}
                        onCopy={onCopy}
                    />
                    <MetaItem
                        label="Item types"
                        value={itemCount.toLocaleString()}
                        darkMode={darkMode}
                    />
                    <MetaItem
                        label="Total units"
                        value={totalQuantity.toLocaleString()}
                        darkMode={darkMode}
                    />
                    <MetaItem
                        label="Deadline"
                        value={formatDate(item.deadline)}
                        darkMode={darkMode}
                    />
                </div>

                {/* PRODUCTS */}
                {products.length > 0 && (
                    <div className="mt-5">
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-2">
                                <Box
                                    size={14}
                                    className={
                                        darkMode ? "text-cyan-400" : "text-cyan-600"
                                    }
                                />
                                <h3
                                    className={`text-sm font-black ${darkMode ? "text-white" : "text-slate-900"
                                        }`}
                                >
                                    Requested items
                                </h3>
                            </div>
                            <span
                                className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${darkMode
                                    ? "border-white/[0.08] bg-white/[0.03] text-slate-400"
                                    : "border-slate-200 bg-slate-50 text-slate-500"
                                    }`}
                            >
                                {products.length} shown
                            </span>
                        </div>

                        <div className="mt-3 grid gap-2 sm:grid-cols-2">
                            {products.slice(0, 6).map((product) => (
                                <ProcurementProduct
                                    key={product.id}
                                    product={product}
                                    darkMode={darkMode}
                                />
                            ))}
                        </div>

                        {products.length > 6 && (
                            <p
                                className={`mt-3 text-xs font-bold ${darkMode ? "text-slate-500" : "text-slate-400"
                                    }`}
                            >
                                +{products.length - 6} more item
                                {products.length - 6 === 1 ? "" : "s"} available in details.
                            </p>
                        )}
                    </div>
                )}

                {/* FOOTER */}
                <div
                    className={`mt-6 flex flex-col gap-4 border-t pt-5 sm:flex-row sm:items-center sm:justify-between ${darkMode ? "border-white/[0.06]" : "border-slate-100"
                        }`}
                >
                    <div
                        className={`inline-flex items-center gap-1.5 text-xs ${darkMode ? "text-slate-500" : "text-slate-400"
                            }`}
                    >
                        <Clock3 size={12} />
                        {item.updated_at ? (
                            <>
                                Last updated{" "}
                                <span
                                    className={`font-bold ${darkMode ? "text-slate-400" : "text-slate-500"
                                        }`}
                                >
                                    {timeAgo(item.updated_at)}
                                </span>
                            </>
                        ) : (
                            "Procurement record"
                        )}
                    </div>

                    <div className="flex flex-col gap-2 sm:flex-row">
                        <button
                            type="button"
                            onClick={onDetails}
                            className={`inline-flex items-center justify-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-bold transition-colors ${darkMode
                                ? "border-white/[0.08] bg-white/[0.03] text-slate-300 hover:bg-white/[0.06]"
                                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                                }`}
                        >
                            <FileText size={14} />
                            Details
                        </button>

                        <button
                            type="button"
                            onClick={onOpen}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/30 transition-all hover:-translate-y-0.5 hover:shadow-cyan-500/50"
                        >
                            View quotation
                            <ArrowRight size={15} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}


/* ============================================================
   PROCUREMENT PRODUCT
============================================================ */

function ProcurementProduct({ product, darkMode }) {
    const brandModel = [product?.brand, product?.model]
        .filter(Boolean)
        .join(" ");

    return (
        <div
            className={`group/prod rounded-xl border p-3.5 transition-all hover:-translate-y-0.5 ${darkMode
                ? "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12]"
                : "border-slate-100 bg-slate-50 hover:border-slate-200 hover:bg-white hover:shadow-sm"
                }`}
        >
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                    <p
                        className={`truncate text-sm font-bold ${darkMode ? "text-slate-200" : "text-slate-800"
                            }`}
                    >
                        {product?.name || "Unnamed item"}
                    </p>

                    {brandModel && (
                        <p
                            className={`mt-0.5 truncate text-[11px] font-medium ${darkMode ? "text-slate-500" : "text-slate-500"
                                }`}
                        >
                            {brandModel}
                        </p>
                    )}

                    {product?.category && (
                        <span
                            className={`mt-1.5 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-black uppercase tracking-wider ${darkMode
                                ? "border-white/[0.08] bg-white/[0.04] text-slate-400"
                                : "border-slate-200 bg-white text-slate-500"
                                }`}
                        >
                            <Tag size={9} />
                            {product.category}
                        </span>
                    )}
                </div>

                <span
                    className={`shrink-0 rounded-lg px-2.5 py-1 text-xs font-black ${darkMode
                        ? "bg-white/[0.05] text-slate-300 ring-1 ring-white/[0.06]"
                        : "bg-white text-slate-600 ring-1 ring-slate-200"
                        }`}
                >
                    ×{Number(product?.quantity || 0).toLocaleString()}
                </span>
            </div>
        </div>
    );
}


/* ============================================================
   META ITEM
============================================================ */

function MetaItem({
    label,
    value,
    darkMode,
    copyable,
    copied,
    onCopy,
}) {
    return (
        <div>
            <div className="flex items-center gap-1.5">
                <p
                    className={`text-[10px] font-black uppercase tracking-wider ${darkMode ? "text-slate-500" : "text-slate-400"
                        }`}
                >
                    {label}
                </p>
                {copyable && (
                    <button
                        type="button"
                        onClick={onCopy}
                        className={`rounded p-0.5 transition-colors ${darkMode
                            ? "text-slate-600 hover:text-slate-300"
                            : "text-slate-300 hover:text-slate-600"
                            }`}
                        title="Copy reference"
                    >
                        {copied ? (
                            <CheckCircle2 size={11} className="text-emerald-500" />
                        ) : (
                            <Copy size={11} />
                        )}
                    </button>
                )}
            </div>
            <p
                className={`mt-1 font-mono text-sm font-black ${darkMode ? "text-slate-200" : "text-slate-700"
                    }`}
            >
                {value}
            </p>
        </div>
    );
}


/* ============================================================
   SKELETON
============================================================ */

function ProcurementListSkeleton({ darkMode }) {
    const block = (className) => (
        <div
            className={`animate-pulse rounded-2xl ${darkMode ? "bg-white/[0.03]" : "bg-slate-200/70"
                } ${className}`}
        />
    );

    return (
        <div className="space-y-6">
            {/* Back + header */}
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

            {/* Summary cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className={`h-28 rounded-2xl ${darkMode ? "bg-white/[0.03]" : "bg-slate-200/70"
                            } animate-pulse`}
                    />
                ))}
            </div>

            {/* Filter bar */}
            <div
                className={`h-24 rounded-2xl ${darkMode ? "bg-white/[0.03]" : "bg-slate-200/70"
                    } animate-pulse`}
            />

            {/* Cards */}
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className={`h-72 rounded-2xl ${darkMode ? "bg-white/[0.03]" : "bg-slate-200/70"
                            } animate-pulse`}
                    />
                ))}
            </div>
        </div>
    );
}