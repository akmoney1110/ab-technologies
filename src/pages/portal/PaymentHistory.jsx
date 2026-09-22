// src/pages/portal/GlobalPayments.jsx

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    AlertCircle,
    ArrowDownLeft,
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
    BadgeCheck,
    Calendar,
    CheckCircle2,
    ChevronDown,
    ChevronRight,
    Clock3,
    Copy,
    CreditCard,
    DollarSign,
    Download,
    ExternalLink,
    Filter,
    Hash,
    Info,
    LayoutList,
    Loader2,
    Receipt,
    RefreshCw,
    Search,
    ShieldCheck,
    SlidersHorizontal,
    Sparkles,
    TrendingUp,
    Wallet,
    X,
    Zap,
} from "lucide-react";

const API_URL =
    import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

/* ============================================================
   HELPERS
============================================================ */

function getToken() {
    return (
        localStorage.getItem("access_token") ||
        localStorage.getItem("access") ||
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

function parseAmount(payment) {
    if (payment?.amount !== undefined && payment?.amount !== null) {
        const n = Number(payment.amount);
        if (!Number.isNaN(n)) return n;
    }
    if (payment?.amount_formatted) {
        const cleaned = String(payment.amount_formatted).replace(/[^\d.-]/g, "");
        const n = Number(cleaned);
        if (!Number.isNaN(n)) return n;
    }
    return 0;
}

function formatCurrency(amount, currency = "NGN") {
    if (amount === null || amount === undefined || amount === "") return "—";
    const n = Number(amount);
    if (Number.isNaN(n)) return String(amount);
    try {
        return new Intl.NumberFormat(undefined, {
            style: "currency",
            currency: currency || "NGN",
            maximumFractionDigits: 2,
        }).format(n);
    } catch {
        return `${currency} ${n.toLocaleString()}`;
    }
}

function getPaymentStatus(payment) {
    return String(
        payment?.status_label || payment?.status || "unknown"
    )
        .trim()
        .toLowerCase();
}

function paymentStatusTheme(payment, darkMode) {
    const raw = String(payment?.status || "").trim().toLowerCase();
    const label = String(payment?.status_label || "").trim().toLowerCase();
    const value = raw || label;

    if (
        value.includes("success") ||
        value.includes("paid") ||
        value.includes("complete") ||
        value === "succeeded"
    ) {
        return {
            chip: darkMode
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                : "border-emerald-200 bg-emerald-50 text-emerald-700",
            dot: "bg-emerald-500",
            glow: "bg-emerald-500/30",
            icon: CheckCircle2,
        };
    }
    if (
        value.includes("pending") ||
        value.includes("process") ||
        value.includes("await")
    ) {
        return {
            chip: darkMode
                ? "border-amber-500/30 bg-amber-500/10 text-amber-300"
                : "border-amber-200 bg-amber-50 text-amber-700",
            dot: "bg-amber-500",
            glow: "bg-amber-500/30",
            icon: Clock3,
        };
    }
    if (
        value.includes("fail") ||
        value.includes("cancel") ||
        value.includes("decline")
    ) {
        return {
            chip: darkMode
                ? "border-red-500/30 bg-red-500/10 text-red-300"
                : "border-red-200 bg-red-50 text-red-700",
            dot: "bg-red-500",
            glow: "bg-red-500/30",
            icon: AlertCircle,
        };
    }
    if (value.includes("refund")) {
        return {
            chip: darkMode
                ? "border-violet-500/30 bg-violet-500/10 text-violet-300"
                : "border-violet-200 bg-violet-50 text-violet-700",
            dot: "bg-violet-500",
            glow: "bg-violet-500/30",
            icon: ArrowDownLeft,
        };
    }
    return {
        chip: darkMode
            ? "border-slate-700 bg-slate-800/60 text-slate-400"
            : "border-slate-200 bg-slate-100 text-slate-600",
        dot: "bg-slate-400",
        glow: "bg-slate-500/30",
        icon: Info,
    };
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
   MAIN
============================================================ */

export default function GlobalPayments({ darkMode = false }) {
    const navigate = useNavigate();

    const [payments, setPayments] = useState([]);
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
    const load = useCallback(
        async ({ silent = false } = {}) => {
            const token = getToken();
            if (!token) {
                window.location.href = "/portal";
                return;
            }

            if (silent) setRefreshing(true);
            else setLoading(true);

            setError("");

            try {
                const response = await fetch(
                    `${API_URL}/api/payments/client/all/`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: "application/json",
                        },
                    }
                );

                const data = await response.json().catch(() => ({}));

                if (response.status === 401) {
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("access");
                    localStorage.removeItem("token");
                    window.location.href = "/portal";
                    return;
                }

                if (!response.ok) {
                    throw new Error(
                        data?.error || "Unable to load payments."
                    );
                }

                setPayments(Array.isArray(data?.payments) ? data.payments : []);
            } catch (err) {
                console.error("Global payments error:", err);
                setError(err?.message || "Unable to load payments.");
            } finally {
                setLoading(false);
                setRefreshing(false);
            }
        },
        []
    );

    useEffect(() => {
        load();
    }, [load]);

    /* ========================================================
       FILTERED + SORTED
    ======================================================== */
    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();

        const list = payments.filter((p) => {
            const status = getPaymentStatus(p);
            const matchesStatus =
                statusFilter === "all" ||
                (statusFilter === "paid" &&
                    (status.includes("paid") ||
                        status.includes("success") ||
                        status.includes("complete"))) ||
                (statusFilter === "pending" &&
                    (status.includes("pending") ||
                        status.includes("process"))) ||
                (statusFilter === "failed" &&
                    (status.includes("fail") ||
                        status.includes("cancel") ||
                        status.includes("decline")));

            if (!matchesStatus) return false;
            if (!q) return true;

            const haystack = [
                p?.proposal?.title,
                p?.transaction_reference,
                p?.milestone_title,
                p?.status_label,
                p?.status,
                p?.amount_formatted,
                p?.proposal?.id,
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();

            return haystack.includes(q);
        });

        const sorted = [...list];
        switch (sort) {
            case "amount-high":
                sorted.sort((a, b) => parseAmount(b) - parseAmount(a));
                break;
            case "amount-low":
                sorted.sort((a, b) => parseAmount(a) - parseAmount(b));
                break;
            case "recent":
            default:
                sorted.sort((a, b) => {
                    const da = new Date(
                        a?.created_at || a?.paid_at || a?.updated_at || 0
                    );
                    const db = new Date(
                        b?.created_at || b?.paid_at || b?.updated_at || 0
                    );
                    return db - da;
                });
        }

        return sorted;
    }, [payments, search, statusFilter, sort]);

    /* ========================================================
       SUMMARY
    ======================================================== */
    const summary = useMemo(() => {
        let totalPaid = 0;
        let totalPending = 0;
        let totalFailed = 0;
        let countPaid = 0;
        let countPending = 0;
        let countFailed = 0;

        payments.forEach((p) => {
            const amount = parseAmount(p);
            const status = getPaymentStatus(p);
            const isPaid =
                status.includes("paid") ||
                status.includes("success") ||
                status.includes("complete");
            const isPending =
                status.includes("pending") || status.includes("process");
            const isFailed =
                status.includes("fail") ||
                status.includes("cancel") ||
                status.includes("decline");

            if (isPaid) {
                totalPaid += amount;
                countPaid += 1;
            } else if (isPending) {
                totalPending += amount;
                countPending += 1;
            } else if (isFailed) {
                totalFailed += amount;
                countFailed += 1;
            }
        });

        return {
            count: payments.length,
            totalPaid,
            totalPending,
            totalFailed,
            countPaid,
            countPending,
            countFailed,
        };
    }, [payments]);

    /* ========================================================
       ACTIONS
    ======================================================== */
    function clearFilters() {
        setSearch("");
        setStatusFilter("all");
        setSort("recent");
    }

    function copyReference(payment) {
        const value = payment?.transaction_reference;
        if (!value) return;
        try {
            navigator.clipboard.writeText(String(value));
            setCopiedId(payment.id);
            setTimeout(() => setCopiedId(null), 1800);
        } catch {
            /* silent */
        }
    }

    function openPayment(payment) {
        const proposalId = payment?.proposal?.id;
        const paymentId = payment?.id;
        if (!proposalId || !paymentId) return;
        navigate(
            `/portal/projects/${proposalId}/payments/${paymentId}`
        );
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
                    <GlobalPaymentsSkeleton darkMode={darkMode} />
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
                    BACK + BREADCRUMB
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
                                Payments
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
                        <ShieldCheck size={13} />
                        Billing support
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
                            <Wallet size={26} />
                        </div>

                        <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                                <h1
                                    className={`text-2xl font-black tracking-tight sm:text-3xl ${darkMode ? "text-white" : "text-slate-900"
                                        }`}
                                >
                                    All Payments
                                </h1>
                                <span
                                    className={`rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${darkMode
                                        ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-300"
                                        : "border-cyan-200 bg-cyan-50 text-cyan-700"
                                        }`}
                                >
                                    {summary.count}{" "}
                                    {summary.count === 1 ? "record" : "records"}
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
                                Every transaction across your projects — invoiced,
                                settled, and pending.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <ViewToggle view={view} setView={setView} darkMode={darkMode} />
                        <button
                            type="button"
                            onClick={() => load({ silent: true })}
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
                                <AlertCircle size={16} />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p
                                    className={`font-bold ${darkMode ? "text-red-300" : "text-red-800"
                                        }`}
                                >
                                    Unable to load payments
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
                        label="Total Transactions"
                        value={summary.count}
                        icon={Receipt}
                        darkMode={darkMode}
                        accent="sky"
                    />
                    <SummaryCard
                        label="Total Paid"
                        value={summary.totalPaid}
                        icon={CheckCircle2}
                        darkMode={darkMode}
                        accent="emerald"
                        isCurrency
                        sublabel={`${summary.countPaid} ${summary.countPaid === 1 ? "payment" : "payments"
                            }`}
                    />
                    <SummaryCard
                        label="Pending"
                        value={summary.totalPending}
                        icon={Clock3}
                        darkMode={darkMode}
                        accent="amber"
                        isCurrency
                        sublabel={`${summary.countPending} ${summary.countPending === 1 ? "payment" : "payments"
                            }`}
                    />
                    <SummaryCard
                        label="Failed"
                        value={summary.totalFailed}
                        icon={AlertCircle}
                        darkMode={darkMode}
                        accent="violet"
                        isCurrency
                        sublabel={`${summary.countFailed} ${summary.countFailed === 1 ? "payment" : "payments"
                            }`}
                    />
                </div>

                {/* ============================================
                    FILTERS
                ============================================ */}
                {payments.length > 0 && (
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
                                    placeholder="Search by project, reference, or milestone..."
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

                            {/* STATUS CHIPS */}
                            <div
                                className={`inline-flex items-center gap-1 rounded-xl border p-1 ${darkMode
                                    ? "border-white/[0.08] bg-white/[0.03]"
                                    : "border-slate-200 bg-slate-50"
                                    }`}
                            >
                                {[
                                    ["all", "All"],
                                    ["paid", "Paid"],
                                    ["pending", "Pending"],
                                    ["failed", "Failed"],
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

                        {/* RESULT COUNT */}
                        <div
                            className={`mt-3 flex flex-col gap-1 text-xs sm:flex-row sm:items-center sm:justify-between ${darkMode ? "text-slate-500" : "text-slate-400"
                                }`}
                        >
                            <span>
                                Showing{" "}
                                <span
                                    className={`font-bold ${darkMode
                                        ? "text-slate-300"
                                        : "text-slate-600"
                                        }`}
                                >
                                    {filtered.length}
                                </span>{" "}
                                of{" "}
                                <span
                                    className={`font-bold ${darkMode
                                        ? "text-slate-300"
                                        : "text-slate-600"
                                        }`}
                                >
                                    {payments.length}
                                </span>{" "}
                                transactions
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
                )}

                {/* ============================================
                    EMPTY STATE
                ============================================ */}
                {payments.length === 0 && !error && (
                    <EmptyState
                        darkMode={darkMode}
                        title="No payments yet"
                        description="Your payment history will appear here once transactions are processed."
                        icon={Receipt}
                    />
                )}

                {payments.length > 0 && filtered.length === 0 && (
                    <EmptyState
                        darkMode={darkMode}
                        title="No matching payments"
                        description="Try adjusting your search or filter to find what you're looking for."
                        icon={Search}
                        actionLabel="Clear filters"
                        onAction={clearFilters}
                    />
                )}

                {/* ============================================
                    LIST
                ============================================ */}
                {filtered.length > 0 && (
                    <div
                        className={
                            view === "grid"
                                ? "mt-6 grid gap-4 xl:grid-cols-2"
                                : "mt-6 space-y-3"
                        }
                    >
                        {filtered.map((payment, index) => (
                            <PaymentCard
                                key={payment.id || index}
                                payment={payment}
                                darkMode={darkMode}
                                view={view}
                                copied={copiedId === payment.id}
                                onCopy={() => copyReference(payment)}
                                onOpen={() => openPayment(payment)}
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
                                Questions about a payment?
                            </p>
                            <p
                                className={`mt-0.5 text-xs ${darkMode ? "text-slate-500" : "text-slate-500"
                                    }`}
                            >
                                Our billing team responds within one business day.
                            </p>
                        </div>
                    </div>

                    <Link
                        to="/portal/support"
                        className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/30 transition-all hover:-translate-y-0.5 hover:shadow-cyan-500/50"
                    >
                        Contact billing
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
    isCurrency = false,
    sublabel,
}) {
    const accents = {
        sky: darkMode
            ? "bg-sky-400/10 text-sky-300 ring-sky-400/20"
            : "bg-sky-50 text-sky-600 ring-sky-100",
        emerald: darkMode
            ? "bg-emerald-400/10 text-emerald-300 ring-emerald-400/20"
            : "bg-emerald-50 text-emerald-600 ring-emerald-100",
        amber: darkMode
            ? "bg-amber-400/10 text-amber-300 ring-amber-400/20"
            : "bg-amber-50 text-amber-600 ring-amber-100",
        violet: darkMode
            ? "bg-violet-400/10 text-violet-300 ring-violet-400/20"
            : "bg-violet-50 text-violet-600 ring-violet-100",
    };

    const glows = {
        sky: "bg-sky-500/20",
        emerald: "bg-emerald-500/20",
        amber: "bg-amber-500/20",
        violet: "bg-violet-500/20",
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
                    {isCurrency ? (
                        <CountUp
                            value={value}
                            format={(v) => formatCurrency(v)}
                        />
                    ) : (
                        <CountUp value={value} />
                    )}
                </p>
                {sublabel && (
                    <p
                        className={`mt-1 text-[11px] font-bold ${darkMode ? "text-slate-600" : "text-slate-400"
                            }`}
                    >
                        {sublabel}
                    </p>
                )}
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
        { value: "grid", icon: LayoutList, label: "Grid" },
    ];

    return (
        <div
            className={`hidden items-center gap-1 rounded-xl border p-1 sm:inline-flex ${darkMode
                ? "border-white/[0.08] bg-white/[0.03]"
                : "border-slate-200 bg-slate-50"
                }`}
        >
            {options.map(({ value, icon: Icon }) => (
                <button
                    key={value}
                    type="button"
                    onClick={() => setView(value)}
                    className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-bold transition-all ${view === value
                        ? "bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-sm shadow-cyan-500/30"
                        : darkMode
                            ? "text-slate-400 hover:bg-white/[0.05] hover:text-white"
                            : "text-slate-500 hover:bg-white hover:text-slate-900"
                        }`}
                >
                    <Icon size={14} />
                    <span className="hidden md:inline capitalize">{value}</span>
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
        { value: "recent", label: "Most recent" },
        { value: "amount-high", label: "Amount (high → low)" },
        { value: "amount-low", label: "Amount (low → high)" },
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

/* ============================================================
   PAYMENT CARD
============================================================ */

function PaymentCard({ payment, darkMode, view, copied, onCopy, onOpen }) {
    const theme = paymentStatusTheme(payment, darkMode);
    const StatusIcon = theme.icon;
    const amount = parseAmount(payment);
    const reference = payment?.transaction_reference || "";
    const paidAt =
        payment?.paid_at || payment?.created_at || payment?.updated_at;

    /* ---------- GRID ---------- */
    if (view === "grid") {
        return (
            <button
                type="button"
                onClick={onOpen}
                className={`group relative w-full overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300 hover:-translate-y-1 ${darkMode
                    ? "border-white/[0.07] bg-white/[0.025] hover:border-white/[0.14] hover:shadow-2xl hover:shadow-black/40"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/60"
                    }`}
            >
                <div
                    className={`pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100 ${theme.glow}`}
                />

                <div className="relative flex items-start justify-between gap-3">
                    <div
                        className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-transform group-hover:scale-105 ${theme.chip}`}
                    >
                        <StatusIcon size={18} />
                    </div>

                    <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${theme.chip}`}
                    >
                        <span className={`h-1.5 w-1.5 rounded-full ${theme.dot}`} />
                        {payment?.status_label || payment?.status || "Unknown"}
                    </span>
                </div>

                <div className="relative mt-4">
                    <p
                        className={`line-clamp-2 text-sm font-black tracking-tight ${darkMode ? "text-white" : "text-slate-900"
                            }`}
                    >
                        {payment?.proposal?.title || "Project"}
                    </p>
                    <p
                        className={`mt-1 text-[11px] font-bold ${darkMode ? "text-slate-500" : "text-slate-500"
                            }`}
                    >
                        {payment?.milestone_title || "Full balance"}
                    </p>
                </div>

                <div className="relative mt-4 flex items-baseline justify-between gap-3">
                    <div>
                        <p
                            className={`text-[9px] font-black uppercase tracking-wider ${darkMode ? "text-slate-500" : "text-slate-400"
                                }`}
                        >
                            Amount
                        </p>
                        <p
                            className={`mt-0.5 text-lg font-black ${darkMode ? "text-white" : "text-slate-900"
                                }`}
                        >
                            {payment?.amount_formatted ||
                                formatCurrency(amount)}
                        </p>
                    </div>
                    <ArrowUpRight
                        size={16}
                        className={`transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${darkMode ? "text-slate-600" : "text-slate-300"
                            }`}
                    />
                </div>

                {reference && (
                    <div
                        className={`relative mt-4 flex items-center gap-2 rounded-lg border px-2.5 py-2 ${darkMode
                            ? "border-white/[0.06] bg-white/[0.02]"
                            : "border-slate-100 bg-slate-50"
                            }`}
                    >
                        <Hash
                            size={11}
                            className={
                                darkMode ? "text-slate-500" : "text-slate-400"
                            }
                        />
                        <span
                            className={`min-w-0 flex-1 truncate font-mono text-[10px] font-bold ${darkMode ? "text-slate-400" : "text-slate-500"
                                }`}
                        >
                            {reference}
                        </span>
                        <span
                            onClick={(e) => {
                                e.stopPropagation();
                                onCopy();
                            }}
                            className={`shrink-0 cursor-pointer rounded p-0.5 transition-colors ${darkMode
                                ? "text-slate-600 hover:text-slate-300"
                                : "text-slate-300 hover:text-slate-600"
                                }`}
                        >
                            {copied ? (
                                <CheckCircle2
                                    size={11}
                                    className="text-emerald-500"
                                />
                            ) : (
                                <Copy size={11} />
                            )}
                        </span>
                    </div>
                )}

                {paidAt && (
                    <p
                        className={`relative mt-3 inline-flex items-center gap-1.5 text-[10px] font-bold ${darkMode ? "text-slate-500" : "text-slate-400"
                            }`}
                    >
                        <Clock3 size={10} />
                        {timeAgo(paidAt)}
                    </p>
                )}
            </button>
        );
    }

    /* ---------- LIST ---------- */
    return (
        <button
            type="button"
            onClick={onOpen}
            className={`group flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-300 hover:-translate-y-0.5 sm:p-5 ${darkMode
                ? "border-white/[0.07] bg-white/[0.025] hover:border-white/[0.14] hover:bg-white/[0.04] hover:shadow-lg hover:shadow-black/30"
                : "border-slate-200 bg-white shadow-sm hover:border-slate-300 hover:shadow-md"
                }`}
        >
            {/* STATUS ICON */}
            <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-transform group-hover:scale-105 ${theme.chip}`}
            >
                <StatusIcon size={18} />
            </div>

            {/* LEFT CONTENT */}
            <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                    <p
                        className={`truncate text-sm font-black ${darkMode ? "text-white" : "text-slate-900"
                            }`}
                    >
                        {payment?.proposal?.title || "Project"}
                    </p>
                    <span
                        className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2 py-0.5 text-[9px] font-black uppercase tracking-wider ${theme.chip}`}
                    >
                        <span className={`h-1 w-1 rounded-full ${theme.dot}`} />
                        {payment?.status_label || payment?.status || "Unknown"}
                    </span>
                </div>

                <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span
                        className={`inline-flex items-center gap-1 text-[11px] font-bold ${darkMode ? "text-slate-500" : "text-slate-500"
                            }`}
                    >
                        <Sparkles size={10} />
                        {payment?.milestone_title || "Full balance"}
                    </span>

                    {reference && (
                        <>
                            <span
                                className={`h-1 w-1 rounded-full ${darkMode ? "bg-slate-700" : "bg-slate-300"
                                    }`}
                            />
                            <span
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onCopy();
                                }}
                                className={`inline-flex cursor-pointer items-center gap-1 font-mono text-[10px] font-bold transition-colors ${darkMode
                                    ? "text-slate-600 hover:text-slate-300"
                                    : "text-slate-400 hover:text-slate-600"
                                    }`}
                            >
                                <Hash size={9} />
                                {reference}
                                {copied ? (
                                    <CheckCircle2
                                        size={9}
                                        className="text-emerald-500"
                                    />
                                ) : (
                                    <Copy size={9} />
                                )}
                            </span>
                        </>
                    )}
                </div>
            </div>

            {/* AMOUNT */}
            <div className="shrink-0 text-right">
                <p
                    className={`text-base font-black tracking-tight ${darkMode ? "text-white" : "text-slate-900"
                        }`}
                >
                    {payment?.amount_formatted || formatCurrency(amount)}
                </p>
                {paidAt && (
                    <p
                        className={`mt-0.5 inline-flex items-center gap-1 text-[10px] font-bold ${darkMode ? "text-slate-500" : "text-slate-400"
                            }`}
                    >
                        <Clock3 size={9} />
                        {timeAgo(paidAt)}
                    </p>
                )}
            </div>

            {/* ARROW */}
            <ChevronRight
                size={16}
                className={`shrink-0 transition-transform group-hover:translate-x-0.5 ${darkMode ? "text-slate-600" : "text-slate-400"
                    }`}
            />
        </button>
    );
}

/* ============================================================
   EMPTY STATE
============================================================ */

function EmptyState({
    darkMode,
    title,
    description,
    icon: Icon,
    actionLabel,
    onAction,
}) {
    return (
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
                        className={`absolute h-1 w-1 rounded-full ${darkMode ? "bg-cyan-400/30" : "bg-cyan-400/40"
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
                <Icon size={28} />
            </div>

            <h2
                className={`relative mt-6 text-lg font-black ${darkMode ? "text-white" : "text-slate-900"
                    }`}
            >
                {title}
            </h2>

            <p
                className={`relative mx-auto mt-2 max-w-md text-sm leading-6 ${darkMode ? "text-slate-400" : "text-slate-500"
                    }`}
            >
                {description}
            </p>

            {actionLabel && onAction && (
                <button
                    type="button"
                    onClick={onAction}
                    className="relative mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/30 transition-all hover:-translate-y-0.5 hover:shadow-cyan-500/50"
                >
                    <X size={15} />
                    {actionLabel}
                </button>
            )}

            <style>{`
                @keyframes floatDot {
                    0%, 100% { transform: translateY(0); opacity: 0.3; }
                    50% { transform: translateY(-10px); opacity: 1; }
                }
            `}</style>
        </div>
    );
}

/* ============================================================
   SKELETON
============================================================ */

function GlobalPaymentsSkeleton({ darkMode }) {
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

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className={`h-32 rounded-2xl ${darkMode ? "bg-white/[0.03]" : "bg-slate-200/70"
                            } animate-pulse`}
                    />
                ))}
            </div>

            <div
                className={`h-20 rounded-2xl ${darkMode ? "bg-white/[0.03]" : "bg-slate-200/70"
                    } animate-pulse`}
            />

            <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div
                        key={i}
                        className={`h-20 rounded-2xl ${darkMode ? "bg-white/[0.03]" : "bg-slate-200/70"
                            } animate-pulse`}
                    />
                ))}
            </div>
        </div>
    );
}