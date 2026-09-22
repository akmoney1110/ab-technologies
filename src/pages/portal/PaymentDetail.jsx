// src/pages/portal/PaymentDetail.jsx

import { useCallback, useEffect, useMemo, useState } from "react";
import {
    AlertCircle,
    ArrowLeft,
    ArrowRight,
    BadgeCheck,
    CalendarDays,
    CheckCircle2,
    ChevronRight,
    Clock3,
    Copy,
    CreditCard,
    DollarSign,
    Download,
    ExternalLink,
    FileText,
    Hash,
    Info,
    Layers,
    Loader2,
    Lock,
    Receipt,
    RefreshCw,
    RotateCcw,
    ShieldCheck,
    Sparkles,
    Tag,
    User,
    X,
    XCircle,
    Zap,
} from "lucide-react";

import { Link, useNavigate, useParams } from "react-router-dom";

const API_URL =
    import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

/* =========================================================
   HELPERS
========================================================= */

function getToken() {
    return (
        localStorage.getItem("access_token") ||
        localStorage.getItem("access") ||
        localStorage.getItem("token") ||
        ""
    );
}

function formatDateTime(value) {
    if (!value) return "—";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "—";
    return date.toLocaleString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
    });
}

function formatDate(value) {
    if (!value) return "—";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "—";
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
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

function formatMoney(value, currency = "NGN") {
    const amount = Number(value || 0);
    try {
        return new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: currency || "NGN",
            maximumFractionDigits: 2,
        }).format(amount);
    } catch {
        return `${currency || "NGN"} ${amount.toLocaleString()}`;
    }
}

function getProposalPublicToken(project) {
    return (
        project?.proposal_public_token ||
        project?.proposal?.public_token ||
        project?.proposal_publicToken ||
        project?.proposal_public_id ||
        project?.proposal?.publicToken ||
        ""
    );
}

function statusMeta(status, darkMode) {
    const value = String(status || "").toLowerCase();

    if (value === "successful") {
        return {
            label: "Successful",
            tone: "emerald",
            icon: CheckCircle2,
            accent: "from-emerald-500 to-teal-500",
            glow: "bg-emerald-500/30",
            chip: darkMode
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                : "border-emerald-200 bg-emerald-50 text-emerald-700",
            dot: "bg-emerald-500",
        };
    }
    if (value === "partially_refunded") {
        return {
            label: "Partially Refunded",
            tone: "amber",
            icon: RotateCcw,
            accent: "from-amber-500 to-orange-500",
            glow: "bg-amber-500/30",
            chip: darkMode
                ? "border-amber-500/30 bg-amber-500/10 text-amber-300"
                : "border-amber-200 bg-amber-50 text-amber-700",
            dot: "bg-amber-500",
        };
    }
    if (value === "refunded") {
        return {
            label: "Refunded",
            tone: "slate",
            icon: Receipt,
            accent: "from-slate-500 to-slate-700",
            glow: "bg-slate-500/30",
            chip: darkMode
                ? "border-slate-700 bg-slate-800/60 text-slate-300"
                : "border-slate-200 bg-slate-100 text-slate-600",
            dot: "bg-slate-400",
        };
    }
    if (value === "processing" || value === "pending") {
        return {
            label: value === "processing" ? "Processing" : "Pending",
            tone: "amber",
            icon: Clock3,
            accent: "from-amber-500 to-yellow-500",
            glow: "bg-amber-500/30",
            chip: darkMode
                ? "border-amber-500/30 bg-amber-500/10 text-amber-300"
                : "border-amber-200 bg-amber-50 text-amber-700",
            dot: "bg-amber-500",
        };
    }
    if (value === "failed") {
        return {
            label: "Failed",
            tone: "red",
            icon: XCircle,
            accent: "from-red-500 to-rose-500",
            glow: "bg-red-500/30",
            chip: darkMode
                ? "border-red-500/30 bg-red-500/10 text-red-300"
                : "border-red-200 bg-red-50 text-red-700",
            dot: "bg-red-500",
        };
    }
    if (value === "cancelled") {
        return {
            label: "Cancelled",
            tone: "slate",
            icon: XCircle,
            accent: "from-slate-500 to-slate-700",
            glow: "bg-slate-500/30",
            chip: darkMode
                ? "border-slate-700 bg-slate-800/60 text-slate-300"
                : "border-slate-200 bg-slate-100 text-slate-600",
            dot: "bg-slate-400",
        };
    }
    return {
        label:
            value.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) ||
            "—",
        tone: "slate",
        icon: Receipt,
        accent: "from-slate-500 to-slate-700",
        glow: "bg-slate-500/30",
        chip: darkMode
            ? "border-slate-700 bg-slate-800/60 text-slate-400"
            : "border-slate-200 bg-slate-100 text-slate-600",
        dot: "bg-slate-400",
    };
}

/* =========================================================
   MAIN
========================================================= */

export default function PaymentDetail({ darkMode = false }) {
    const { projectId, paymentId } = useParams();
    const navigate = useNavigate();

    const [project, setProject] = useState(null);
    const [payment, setPayment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState("");
    const [copiedField, setCopiedField] = useState("");

    const logout = useCallback(() => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("ab_user");
        window.location.href = "/portal";
    }, []);

    /* =====================================================
       LOAD
    ===================================================== */
    const loadData = useCallback(
        async ({ silent = false } = {}) => {
            const token = getToken();
            if (!token) {
                logout();
                return;
            }

            if (silent) setRefreshing(true);
            else setLoading(true);

            setError("");

            try {
                const headers = {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                };

                const projectResponse = await fetch(
                    `${API_URL}/api/projects/${projectId}/`,
                    { headers }
                );

                if (projectResponse.status === 401) {
                    logout();
                    return;
                }

                const projectData = await projectResponse.json();
                if (!projectResponse.ok) {
                    throw new Error(
                        projectData?.detail || "Project not found."
                    );
                }

                setProject(projectData);

                const publicToken = getProposalPublicToken(projectData);

                if (!publicToken) {
                    throw new Error(
                        "This project is not linked to a proposal yet."
                    );
                }

                const detailResponse = await fetch(
                    `${API_URL}/api/payments/client/${publicToken}/payments/${paymentId}/`,
                    { headers }
                );

                if (detailResponse.status === 401) {
                    logout();
                    return;
                }

                const detailData = await detailResponse
                    .json()
                    .catch(() => ({}));

                if (detailResponse.status === 404) {
                    throw new Error("Payment not found.");
                }

                if (!detailResponse.ok) {
                    throw new Error(
                        detailData?.error ||
                        detailData?.detail ||
                        `Unable to load payment (${detailResponse.status}).`
                    );
                }

                setPayment(detailData?.payment || null);
            } catch (err) {
                console.error("Payment detail error:", err);
                setError(err?.message || "Unable to load payment.");
            } finally {
                setLoading(false);
                setRefreshing(false);
            }
        },
        [projectId, paymentId, logout]
    );

    useEffect(() => {
        loadData();
    }, [loadData]);

    /* =====================================================
       COPY
    ===================================================== */
    const copyToClipboard = async (label, value) => {
        if (!value) return;
        try {
            await navigator.clipboard.writeText(String(value));
            setCopiedField(label);
            setTimeout(() => setCopiedField(""), 1500);
        } catch {
            /* clipboard may not be available */
        }
    };

    /* =====================================================
       DERIVED
    ===================================================== */
    const meta = useMemo(
        () => statusMeta(payment?.status, darkMode),
        [payment?.status, darkMode]
    );
    const StatusIcon = meta.icon;
    const currency = payment?.currency || project?.currency || "NGN";

    const hasRefund =
        payment?.refunded_amount &&
        Number(payment.refunded_amount) > 0;

    const receiptFileName = `receipt-${payment?.transaction_reference || paymentId
        }.txt`;

    const handleDownloadReceipt = () => {
        const lines = [
            "AB Technologies — Payment Receipt",
            "====================================",
            "",
            `Reference:        ${payment?.transaction_reference || "—"}`,
            `Provider ref:     ${payment?.provider_reference || "—"}`,
            `Status:           ${meta.label}`,
            `Payment type:     ${payment?.payment_type_label || payment?.payment_type || "—"
            }`,
            `Provider:         ${payment?.provider_label || payment?.provider || "—"
            }`,
            "",
            `Amount:           ${formatMoney(payment?.amount, currency)}`,
            `Currency:         ${currency}`,
            "",
            `Milestone:        ${payment?.milestone_title
                ? `${payment.milestone_order || ""} ${payment.milestone_title
                    }`.trim()
                : "Full balance payment"
            }`,
            "",
            `Created:          ${formatDateTime(payment?.created_at)}`,
            `Paid at:          ${formatDateTime(payment?.paid_at)}`,
            "",
            "Thank you for your business.",
        ];

        const blob = new Blob([lines.join("\n")], {
            type: "text/plain;charset=utf-8",
        });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = receiptFileName;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        URL.revokeObjectURL(url);
    };

    const pageClasses = darkMode
        ? "bg-[#020611] text-white"
        : "bg-slate-50 text-slate-900";

    /* =====================================================
       LOADING
    ===================================================== */
    if (loading) {
        return (
            <div className={`min-h-screen ${pageClasses}`}>
                <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
                    <PaymentDetailSkeleton darkMode={darkMode} />
                </div>
            </div>
        );
    }

    /* =====================================================
       ERROR
    ===================================================== */
    if (error || !payment) {
        return (
            <div className={`min-h-screen ${pageClasses}`}>
                <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
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

                        <Link
                            to="/portal/payments"
                            className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-bold transition-colors ${darkMode
                                    ? "border-white/[0.08] text-slate-400 hover:bg-white/[0.04] hover:text-white"
                                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                                }`}
                        >
                            All payments
                            <ArrowRight size={13} />
                        </Link>
                    </div>

                    <div
                        className={`relative mt-6 overflow-hidden rounded-3xl border p-10 text-center ${darkMode
                                ? "border-white/[0.07] bg-white/[0.025]"
                                : "border-slate-200 bg-white shadow-sm"
                            }`}
                    >
                        <div
                            className={`pointer-events-none absolute -top-20 left-1/2 h-40 w-72 -translate-x-1/2 rounded-full blur-3xl ${darkMode ? "bg-red-500/10" : "bg-red-100"
                                }`}
                        />

                        <div
                            className={`relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${darkMode
                                    ? "bg-red-500/10 text-red-300"
                                    : "bg-red-50 text-red-600"
                                }`}
                        >
                            <AlertCircle size={28} />
                        </div>

                        <h2
                            className={`relative mt-5 text-xl font-black ${darkMode ? "text-white" : "text-slate-900"
                                }`}
                        >
                            Payment unavailable
                        </h2>
                        <p
                            className={`relative mt-2 text-sm leading-6 ${darkMode ? "text-slate-400" : "text-slate-500"
                                }`}
                        >
                            {error || "This payment could not be loaded."}
                        </p>

                        <div className="relative mt-6 flex flex-wrap justify-center gap-3">
                            <button
                                type="button"
                                onClick={() => loadData()}
                                className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-bold transition-colors ${darkMode
                                        ? "border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10"
                                        : "border-cyan-200 text-cyan-700 hover:bg-cyan-50"
                                    }`}
                            >
                                <RefreshCw size={15} />
                                Try again
                            </button>
                            <Link
                                to={`/portal/projects/${projectId}/payments`}
                                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/30 transition-all hover:-translate-y-0.5 hover:shadow-cyan-500/50"
                            >
                                Back to payments
                                <ArrowRight size={15} />
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    /* =====================================================
       RENDER
    ===================================================== */
    return (
        <div className={`min-h-screen ${pageClasses}`}>
            <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                {/* ============================================
                    TOP NAV
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
                            <Link
                                to="/portal/payments"
                                className={`transition-colors ${darkMode
                                        ? "hover:text-slate-300"
                                        : "hover:text-slate-600"
                                    }`}
                            >
                                Payments
                            </Link>
                            <span>/</span>
                            <span
                                className={`max-w-[200px] truncate font-bold ${darkMode
                                        ? "text-slate-300"
                                        : "text-slate-600"
                                    }`}
                            >
                                {payment?.transaction_reference || "Detail"}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => loadData({ silent: true })}
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
                        <button
                            type="button"
                            onClick={handleDownloadReceipt}
                            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-cyan-500/30 transition-all hover:-translate-y-0.5 hover:shadow-cyan-500/50"
                        >
                            <Download size={13} />
                            Download receipt
                        </button>
                    </div>
                </div>

                {/* ============================================
                    HERO
                ============================================ */}
                <section
                    className={`relative mt-5 overflow-hidden rounded-3xl border ${darkMode
                            ? "border-white/[0.07] bg-gradient-to-br from-white/[0.03] via-white/[0.015] to-transparent"
                            : "border-slate-200 bg-gradient-to-br from-white via-slate-50/60 to-cyan-50/30"
                        }`}
                >
                    <div
                        className={`pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl ${meta.glow}`}
                    />
                    <div className="pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />

                    <div className="relative p-6 sm:p-8">
                        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                            <div className="flex items-start gap-4">
                                <div
                                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border ring-1 transition-transform hover:scale-105 ${meta.chip}`}
                                >
                                    <StatusIcon size={24} />
                                </div>

                                <div className="min-w-0">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span
                                            className={`rounded-md border px-2 py-0.5 text-[9px] font-black uppercase tracking-wider ${darkMode
                                                    ? "border-white/[0.08] bg-white/[0.04] text-slate-400"
                                                    : "border-slate-200 bg-slate-50 text-slate-500"
                                                }`}
                                        >
                                            Payment
                                        </span>
                                        <span
                                            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${meta.chip}`}
                                        >
                                            <span
                                                className={`h-1.5 w-1.5 rounded-full ${meta.dot}`}
                                            />
                                            {meta.label}
                                        </span>
                                        {hasRefund && (
                                            <span
                                                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${darkMode
                                                        ? "border-violet-500/30 bg-violet-500/10 text-violet-300"
                                                        : "border-violet-200 bg-violet-50 text-violet-700"
                                                    }`}
                                            >
                                                <RotateCcw size={10} />
                                                Refund
                                            </span>
                                        )}
                                    </div>

                                    <h1
                                        className={`mt-3 break-words text-3xl font-black tracking-tight sm:text-4xl ${darkMode
                                                ? "text-white"
                                                : "text-slate-900"
                                            }`}
                                    >
                                        {formatMoney(
                                            payment?.amount,
                                            currency
                                        )}
                                    </h1>

                                    <p
                                        className={`mt-2 text-xs font-bold ${darkMode
                                                ? "text-slate-500"
                                                : "text-slate-500"
                                            }`}
                                    >
                                        {payment?.payment_type_label ||
                                            payment?.payment_type ||
                                            "Payment"}{" "}
                                        · via{" "}
                                        {payment?.provider_label ||
                                            payment?.provider ||
                                            "—"}
                                    </p>
                                </div>
                            </div>

                            {/* REFERENCE */}
                            <div
                                className={`w-full rounded-2xl border p-4 lg:max-w-xs ${darkMode
                                        ? "border-white/[0.06] bg-white/[0.02]"
                                        : "border-slate-200 bg-white/70 backdrop-blur"
                                    }`}
                            >
                                <p
                                    className={`text-[10px] font-black uppercase tracking-wider ${darkMode
                                            ? "text-slate-500"
                                            : "text-slate-400"
                                        }`}
                                >
                                    Transaction reference
                                </p>
                                <button
                                    type="button"
                                    onClick={() =>
                                        copyToClipboard(
                                            "reference",
                                            payment?.transaction_reference
                                        )
                                    }
                                    className={`mt-2 flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-left transition-colors ${darkMode
                                            ? "border-white/[0.08] bg-white/[0.03] text-slate-200 hover:bg-white/[0.06]"
                                            : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                                        }`}
                                >
                                    <Hash
                                        size={12}
                                        className={
                                            darkMode
                                                ? "text-slate-500"
                                                : "text-slate-400"
                                        }
                                    />
                                    <span className="min-w-0 flex-1 truncate font-mono text-[11px] font-bold">
                                        {payment?.transaction_reference || "—"}
                                    </span>
                                    {copiedField === "reference" ? (
                                        <CheckCircle2
                                            size={13}
                                            className="shrink-0 text-emerald-500"
                                        />
                                    ) : (
                                        <Copy
                                            size={13}
                                            className={`shrink-0 ${darkMode
                                                    ? "text-slate-600"
                                                    : "text-slate-400"
                                                }`}
                                        />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ============================================
                    MAIN GRID
                ============================================ */}
                <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
                    {/* LEFT COLUMN */}
                    <div className="space-y-6">
                        {/* TRANSACTION */}
                        <DetailCard
                            title="Transaction"
                            icon={CreditCard}
                            darkMode={darkMode}
                        >
                            <DetailGrid>
                                <Field
                                    label="Provider"
                                    value={
                                        payment?.provider_label ||
                                        payment?.provider ||
                                        "—"
                                    }
                                    darkMode={darkMode}
                                />
                                <Field
                                    label="Payment type"
                                    value={
                                        payment?.payment_type_label ||
                                        payment?.payment_type ||
                                        "—"
                                    }
                                    darkMode={darkMode}
                                />
                                <Field
                                    label="Status"
                                    value={meta.label}
                                    darkMode={darkMode}
                                    highlight={
                                        meta.tone === "emerald" ? "positive" : null
                                    }
                                />
                                <Field
                                    label="Currency"
                                    value={currency}
                                    darkMode={darkMode}
                                />
                                <Field
                                    label="Amount"
                                    value={formatMoney(
                                        payment?.amount,
                                        currency
                                    )}
                                    darkMode={darkMode}
                                    highlight="emphasis"
                                />
                                <Field
                                    label="Refundable amount"
                                    value={formatMoney(
                                        payment?.refundable_amount ??
                                        payment?.amount,
                                        currency
                                    )}
                                    darkMode={darkMode}
                                />
                            </DetailGrid>
                        </DetailCard>

                        {/* REFERENCES */}
                        <DetailCard
                            title="References"
                            icon={Hash}
                            darkMode={darkMode}
                        >
                            <div className="space-y-3">
                                <CopyRow
                                    label="Transaction reference"
                                    value={payment?.transaction_reference}
                                    darkMode={darkMode}
                                    onCopy={() =>
                                        copyToClipboard(
                                            "tx_ref",
                                            payment?.transaction_reference
                                        )
                                    }
                                    copied={copiedField === "tx_ref"}
                                />
                                <CopyRow
                                    label="Provider reference"
                                    value={payment?.provider_reference}
                                    darkMode={darkMode}
                                    onCopy={() =>
                                        copyToClipboard(
                                            "prov_ref",
                                            payment?.provider_reference
                                        )
                                    }
                                    copied={copiedField === "prov_ref"}
                                />
                            </div>
                        </DetailCard>

                        {/* MILESTONE */}
                        <DetailCard
                            title="Milestone"
                            icon={Tag}
                            darkMode={darkMode}
                        >
                            {payment?.milestone_title ? (
                                <div className="space-y-3">
                                    <Field
                                        label="Milestone"
                                        value={
                                            payment?.milestone_order
                                                ? `${payment.milestone_order}. ${payment.milestone_title}`
                                                : payment.milestone_title
                                        }
                                        darkMode={darkMode}
                                    />
                                    <Field
                                        label="Milestone ID"
                                        value={payment?.milestone_id || "—"}
                                        darkMode={darkMode}
                                    />
                                </div>
                            ) : (
                                <div
                                    className={`rounded-xl border p-4 ${darkMode
                                            ? "border-white/[0.06] bg-white/[0.02]"
                                            : "border-slate-100 bg-slate-50"
                                        }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div
                                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${darkMode
                                                    ? "bg-cyan-400/10 text-cyan-300"
                                                    : "bg-cyan-50 text-cyan-600"
                                                }`}
                                        >
                                            <Layers size={16} />
                                        </div>
                                        <p
                                            className={`text-xs leading-5 ${darkMode
                                                    ? "text-slate-400"
                                                    : "text-slate-500"
                                                }`}
                                        >
                                            This was a{" "}
                                            <strong
                                                className={
                                                    darkMode
                                                        ? "font-black text-slate-200"
                                                        : "font-black text-slate-700"
                                                }
                                            >
                                                full-balance payment
                                            </strong>
                                            . It is not tied to a single
                                            milestone.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </DetailCard>

                        {/* REFUNDS */}
                        {hasRefund && (
                            <DetailCard
                                title="Refunds"
                                icon={RotateCcw}
                                darkMode={darkMode}
                            >
                                <DetailGrid>
                                    <Field
                                        label="Refund status"
                                        value={
                                            payment?.refund_status || "—"
                                        }
                                        darkMode={darkMode}
                                    />
                                    <Field
                                        label="Refunded amount"
                                        value={formatMoney(
                                            payment?.refunded_amount,
                                            currency
                                        )}
                                        darkMode={darkMode}
                                        highlight="emphasis"
                                    />
                                    <Field
                                        label="Refunded at"
                                        value={formatDateTime(
                                            payment?.refunded_at
                                        )}
                                        darkMode={darkMode}
                                    />
                                </DetailGrid>
                            </DetailCard>
                        )}

                        {/* PROVIDER RESPONSE */}
                        <DetailCard
                            title="Provider response"
                            icon={Info}
                            darkMode={darkMode}
                        >
                            <pre
                                className={`max-h-72 overflow-auto rounded-xl p-4 text-[10px] leading-5 ${darkMode
                                        ? "bg-black/40 text-slate-400"
                                        : "bg-slate-50 text-slate-600 ring-1 ring-slate-100"
                                    }`}
                            >
                                {JSON.stringify(
                                    payment?.provider_response || {},
                                    null,
                                    2
                                )}
                            </pre>
                        </DetailCard>
                    </div>

                    {/* RIGHT COLUMN — STICKY */}
                    <div className="space-y-6 lg:sticky lg:top-[92px] lg:self-start">
                        {/* TIMESTAMPS */}
                        <DetailCard
                            title="Timestamps"
                            icon={CalendarDays}
                            darkMode={darkMode}
                        >
                            <div className="space-y-3">
                                <Field
                                    label="Created"
                                    value={formatDateTime(
                                        payment?.created_at
                                    )}
                                    darkMode={darkMode}
                                    icon={Sparkles}
                                />
                                <Field
                                    label="Paid at"
                                    value={formatDateTime(payment?.paid_at)}
                                    darkMode={darkMode}
                                    icon={CheckCircle2}
                                />
                                <Field
                                    label="Last updated"
                                    value={formatDateTime(
                                        payment?.updated_at
                                    )}
                                    darkMode={darkMode}
                                    icon={RefreshCw}
                                />
                            </div>
                        </DetailCard>

                        {/* PROJECT */}
                        <DetailCard
                            title="Project"
                            icon={FileText}
                            darkMode={darkMode}
                        >
                            <div className="space-y-3">
                                <Field
                                    label="Project"
                                    value={
                                        project?.name ||
                                        project?.title ||
                                        "—"
                                    }
                                    darkMode={darkMode}
                                />
                                <Field
                                    label="Currency"
                                    value={currency}
                                    darkMode={darkMode}
                                />
                                <Link
                                    to={`/portal/projects/${projectId}`}
                                    className={`group mt-2 inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-bold transition-colors ${darkMode
                                            ? "border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10"
                                            : "border-cyan-200 text-cyan-700 hover:bg-cyan-50"
                                        }`}
                                >
                                    Open project workspace
                                    <ExternalLink
                                        size={12}
                                        className="transition-transform group-hover:translate-x-0.5"
                                    />
                                </Link>
                            </div>
                        </DetailCard>

                        {/* SECURITY */}
                        <div
                            className={`flex items-start gap-3 rounded-2xl border p-4 ${darkMode
                                    ? "border-emerald-500/20 bg-emerald-500/[0.06]"
                                    : "border-emerald-200 bg-emerald-50"
                                }`}
                        >
                            <ShieldCheck
                                size={16}
                                className={`mt-0.5 shrink-0 ${darkMode
                                        ? "text-emerald-300"
                                        : "text-emerald-600"
                                    }`}
                            />
                            <div>
                                <p
                                    className={`text-xs font-black ${darkMode
                                            ? "text-emerald-300"
                                            : "text-emerald-700"
                                        }`}
                                >
                                    Secure transaction
                                </p>
                                <p
                                    className={`mt-0.5 text-[11px] leading-5 ${darkMode
                                            ? "text-emerald-300/80"
                                            : "text-emerald-700/80"
                                        }`}
                                >
                                    This payment was processed through
                                    PCI-DSS compliant infrastructure.
                                </p>
                            </div>
                        </div>

                        {/* SUPPORT CTA */}
                        <Link
                            to="/portal/support"
                            className={`group flex items-center justify-between gap-3 rounded-2xl border p-4 transition-all hover:-translate-y-0.5 ${darkMode
                                    ? "border-white/[0.07] bg-white/[0.025] hover:border-white/[0.14]"
                                    : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md"
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${darkMode
                                            ? "bg-cyan-400/10 text-cyan-300"
                                            : "bg-cyan-50 text-cyan-600"
                                        }`}
                                >
                                    <User size={18} />
                                </div>
                                <div>
                                    <p
                                        className={`text-sm font-black ${darkMode
                                                ? "text-white"
                                                : "text-slate-900"
                                            }`}
                                    >
                                        Need help?
                                    </p>
                                    <p
                                        className={`mt-0.5 text-[11px] ${darkMode
                                                ? "text-slate-500"
                                                : "text-slate-500"
                                            }`}
                                    >
                                        Contact billing support
                                    </p>
                                </div>
                            </div>
                            <ChevronRight
                                size={16}
                                className={`shrink-0 transition-transform group-hover:translate-x-0.5 ${darkMode
                                        ? "text-slate-600"
                                        : "text-slate-400"
                                    }`}
                            />
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function DetailCard({ title, icon: Icon, darkMode, children }) {
    return (
        <section
            className={`rounded-2xl border p-5 sm:p-6 ${darkMode
                    ? "border-white/[0.07] bg-white/[0.025]"
                    : "border-slate-200 bg-white shadow-sm"
                }`}
        >
            <div className="mb-5 flex items-center gap-2.5">
                {Icon && (
                    <div
                        className={`flex h-8 w-8 items-center justify-center rounded-lg ${darkMode
                                ? "bg-cyan-400/10 text-cyan-300"
                                : "bg-cyan-50 text-cyan-600"
                            }`}
                    >
                        <Icon size={15} />
                    </div>
                )}
                <h2
                    className={`text-sm font-black ${darkMode ? "text-white" : "text-slate-900"
                        }`}
                >
                    {title}
                </h2>
            </div>
            {children}
        </section>
    );
}

function DetailGrid({ children }) {
    return <div className="grid gap-4 sm:grid-cols-2">{children}</div>;
}

function Field({ label, value, darkMode, highlight, icon: Icon }) {
    const valueColor =
        highlight === "positive"
            ? darkMode
                ? "text-emerald-300"
                : "text-emerald-600"
            : highlight === "emphasis"
                ? darkMode
                    ? "text-cyan-300"
                    : "text-cyan-600"
                : darkMode
                    ? "text-slate-200"
                    : "text-slate-700";

    return (
        <div>
            <p
                className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-wider ${darkMode ? "text-slate-500" : "text-slate-400"
                    }`}
            >
                {Icon && <Icon size={10} />}
                {label}
            </p>
            <p
                className={`mt-1 break-words text-sm font-black ${valueColor}`}
            >
                {value || "—"}
            </p>
        </div>
    );
}

function CopyRow({ label, value, darkMode, onCopy, copied }) {
    return (
        <div
            className={`flex items-center justify-between gap-3 rounded-xl border px-3 py-2.5 ${darkMode
                    ? "border-white/[0.06] bg-white/[0.02]"
                    : "border-slate-200 bg-slate-50"
                }`}
        >
            <div className="min-w-0 flex-1">
                <p
                    className={`text-[9px] font-black uppercase tracking-wider ${darkMode ? "text-slate-500" : "text-slate-400"
                        }`}
                >
                    {label}
                </p>
                <p
                    className={`mt-0.5 truncate font-mono text-xs font-bold ${darkMode ? "text-slate-200" : "text-slate-700"
                        }`}
                >
                    {value || "—"}
                </p>
            </div>
            <button
                type="button"
                onClick={onCopy}
                disabled={!value}
                className={`shrink-0 rounded-lg border p-2 transition-colors ${darkMode
                        ? "border-white/[0.08] text-slate-400 hover:bg-white/[0.05] hover:text-white"
                        : "border-slate-200 text-slate-500 hover:bg-slate-100"
                    } disabled:opacity-40`}
                title="Copy"
            >
                {copied ? (
                    <CheckCircle2 size={13} className="text-emerald-500" />
                ) : (
                    <Copy size={13} />
                )}
            </button>
        </div>
    );
}

/* =========================================================
   SKELETON
========================================================= */

function PaymentDetailSkeleton({ darkMode }) {
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

            {block("h-56")}

            <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
                <div className="space-y-6">
                    {block("h-64")}
                    {block("h-40")}
                    {block("h-40")}
                </div>
                <div className="space-y-6">
                    {block("h-56")}
                    {block("h-40")}
                    {block("h-32")}
                </div>
            </div>
        </div>
    );
}