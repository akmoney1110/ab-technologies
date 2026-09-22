// src/pages/portal/ProcurementDetails.jsx

import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

import { useNavigate, useParams, Link } from "react-router-dom";

import {
    AlertCircle,
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
    Box,
    Building2,
    Calendar,
    CheckCircle2,
    ChevronRight,
    ClipboardList,
    Clock3,
    Copy,
    CreditCard,
    DollarSign,
    FileText,
    Hash,
    Info,
    Loader2,
    Lock,
    MapPin,
    Package,
    PackageCheck,
    Receipt,
    RefreshCw,
    ShieldCheck,
    Sparkles,
    Tag,
    Truck,
    Users,
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

function formatCurrency(value, currency = "NGN") {
    if (value === null || value === undefined || value === "") return "—";
    const amount = Number(value);
    if (Number.isNaN(amount)) return `${currency} ${value}`;
    try {
        return new Intl.NumberFormat(undefined, {
            style: "currency",
            currency: currency || "NGN",
            maximumFractionDigits: 2,
        }).format(amount);
    } catch {
        return `${currency} ${amount.toLocaleString()}`;
    }
}

function getStatusLabel(status) {
    const value = String(status || "").toLowerCase().trim();
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
    };
    return labels[value] || status || "Unknown";
}

function statusTheme(status, darkMode) {
    const value = String(status || "").toLowerCase().trim();

    if (value === "completed") {
        return {
            chip: darkMode
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                : "border-emerald-200 bg-emerald-50 text-emerald-700",
            dot: "bg-emerald-500",
        };
    }
    if (value === "accepted") {
        return {
            chip: darkMode
                ? "border-sky-500/30 bg-sky-500/10 text-sky-300"
                : "border-sky-200 bg-sky-50 text-sky-700",
            dot: "bg-sky-500",
        };
    }
    if (value === "negotiation" || value === "revision_requested") {
        return {
            chip: darkMode
                ? "border-amber-500/30 bg-amber-500/10 text-amber-300"
                : "border-amber-200 bg-amber-50 text-amber-700",
            dot: "bg-amber-500",
        };
    }
    if (value === "rejected" || value === "cancelled" || value === "expired") {
        return {
            chip: darkMode
                ? "border-red-500/30 bg-red-500/10 text-red-300"
                : "border-red-200 bg-red-50 text-red-700",
            dot: "bg-red-500",
        };
    }
    if (value === "sent" || value === "viewed" || value === "ready") {
        return {
            chip: darkMode
                ? "border-indigo-500/30 bg-indigo-500/10 text-indigo-300"
                : "border-indigo-200 bg-indigo-50 text-indigo-700",
            dot: "bg-indigo-500",
        };
    }
    return {
        chip: darkMode
            ? "border-slate-700 bg-slate-800/60 text-slate-400"
            : "border-slate-200 bg-slate-100 text-slate-600",
        dot: "bg-slate-400",
    };
}

function getItemSpecifications(specifications) {
    if (!specifications) return [];
    if (typeof specifications === "string") return [specifications];
    if (typeof specifications === "object") return Object.entries(specifications);
    return [];
}

/* ============================================================
   TRACKING HELPERS
============================================================ */

function getTrackingLabel(status, fallbackLabel) {
    const value = String(status || "").toLowerCase().trim();
    const labels = {
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
    };
    if (labels[value]) return labels[value];
    if (fallbackLabel) return fallbackLabel;
    return (
        value.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) ||
        "Update"
    );
}

function trackingTheme(status, darkMode) {
    const value = String(status || "").toLowerCase().trim();

    if (value === "completed" || value === "delivered") {
        return {
            chip: darkMode
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                : "border-emerald-200 bg-emerald-50 text-emerald-700",
            dot: "bg-emerald-500",
            glow: "bg-emerald-500/30",
        };
    }
    if (value === "cancelled" || value === "delayed") {
        return {
            chip: darkMode
                ? "border-red-500/30 bg-red-500/10 text-red-300"
                : "border-red-200 bg-red-50 text-red-700",
            dot: "bg-red-500",
            glow: "bg-red-500/30",
        };
    }
    if (value === "on_hold") {
        return {
            chip: darkMode
                ? "border-amber-500/30 bg-amber-500/10 text-amber-300"
                : "border-amber-200 bg-amber-50 text-amber-700",
            dot: "bg-amber-500",
            glow: "bg-amber-500/30",
        };
    }
    if (
        value === "in_transit" ||
        value === "dispatched" ||
        value === "ready_for_dispatch"
    ) {
        return {
            chip: darkMode
                ? "border-sky-500/30 bg-sky-500/10 text-sky-300"
                : "border-sky-200 bg-sky-50 text-sky-700",
            dot: "bg-sky-500",
            glow: "bg-sky-500/30",
        };
    }
    if (value === "order_confirmed" || value === "supplier_confirmed") {
        return {
            chip: darkMode
                ? "border-indigo-500/30 bg-indigo-500/10 text-indigo-300"
                : "border-indigo-200 bg-indigo-50 text-indigo-700",
            dot: "bg-indigo-500",
            glow: "bg-indigo-500/30",
        };
    }
    if (value === "order_placed" || value === "processing") {
        return {
            chip: darkMode
                ? "border-violet-500/30 bg-violet-500/10 text-violet-300"
                : "border-violet-200 bg-violet-50 text-violet-700",
            dot: "bg-violet-500",
            glow: "bg-violet-500/30",
        };
    }
    if (value === "arrived") {
        return {
            chip: darkMode
                ? "border-teal-500/30 bg-teal-500/10 text-teal-300"
                : "border-teal-200 bg-teal-50 text-teal-700",
            dot: "bg-teal-500",
            glow: "bg-teal-500/30",
        };
    }
    return {
        chip: darkMode
            ? "border-slate-700 bg-slate-800/60 text-slate-400"
            : "border-slate-200 bg-slate-100 text-slate-600",
        dot: "bg-slate-400",
        glow: "bg-slate-500/30",
    };
}

/* ============================================================
   PAYMENT HELPERS
============================================================ */

function getPaymentMilestones(data) {
    const milestones = Array.isArray(data?.milestones) ? data.milestones : [];

    return milestones
        .map((milestone, index) => {
            const amount = Number(milestone.amount) || 0;
            const totalPaid = Number(milestone.total_paid) || 0;
            const outstandingRaw = Number(milestone.outstanding_balance);
            const outstanding = Number.isFinite(outstandingRaw)
                ? Math.max(outstandingRaw, 0)
                : Math.max(amount - totalPaid, 0);

            return {
                ...milestone,
                id: milestone.milestone_id ?? milestone.id ?? `milestone-${index}`,
                milestone_id: milestone.milestone_id ?? milestone.id,
                order: Number(milestone.order) || index + 1,
                amount,
                total_paid: totalPaid,
                outstanding_balance: outstanding,
                payment_required: milestone.payment_required !== false,
                payment_status: String(milestone.payment_status || "").toLowerCase(),
                status: String(milestone.status || "").toLowerCase(),
            };
        })
        .sort((a, b) => a.order - b.order);
}

function getMilestonePaymentState(milestone, milestones) {
    if (!milestone.payment_required) {
        return { type: "not_required", label: "Included" };
    }
    if (milestone.payment_status === "paid" || milestone.status === "completed") {
        return { type: "paid", label: "Paid" };
    }
    if (milestone.status === "cancelled") {
        return { type: "cancelled", label: "Cancelled" };
    }

    const previousPaymentMilestone = milestones
        .filter(
            (item) =>
                item.payment_required &&
                item.order < milestone.order &&
                item.status !== "cancelled"
        )
        .sort((a, b) => b.order - a.order)[0];

    if (
        previousPaymentMilestone &&
        previousPaymentMilestone.payment_status !== "paid" &&
        previousPaymentMilestone.status !== "completed"
    ) {
        return {
            type: "locked",
            label: "Locked",
            previousMilestone: previousPaymentMilestone,
        };
    }

    if (milestone.outstanding_balance <= 0) {
        return { type: "paid", label: "Paid" };
    }

    return { type: "payable", label: "Payment due" };
}

/* ============================================================
   PAGE
============================================================ */

export default function ProcurementDetails({ darkMode = false }) {
    const { publicToken } = useParams();
    const navigate = useNavigate();

    const [procurement, setProcurement] = useState(null);
    const [tracking, setTracking] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [paymentData, setPaymentData] = useState(null);
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [paymentError, setPaymentError] = useState("");
    const [payingMilestoneId, setPayingMilestoneId] = useState(null);
    const [payingFullBalance, setPayingFullBalance] = useState(false);
    const [paymentActionMessage, setPaymentActionMessage] = useState("");
    const [copied, setCopied] = useState(false);

    /* ========================================================
       LOAD PAYMENTS
    ======================================================== */
    const loadPayments = useCallback(
        async (proposalToken) => {
            const token = getToken();
            if (!token || !proposalToken) return;

            setPaymentLoading(true);
            setPaymentError("");

            try {
                const response = await fetch(
                    `${API_URL}/api/payments/client/${proposalToken}/payments/`,
                    {
                        method: "GET",
                        headers: {
                            Accept: "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json().catch(() => ({}));

                if (response.status === 401) {
                    localStorage.removeItem("access");
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("token");
                    navigate("/login");
                    return;
                }

                if (!response.ok) {
                    throw new Error(
                        data?.error ||
                        data?.detail ||
                        "Unable to load payment information."
                    );
                }

                setPaymentData(data);
            } catch (err) {
                console.error("Payments error:", err);
                setPaymentError(
                    err?.message || "Unable to load payment information."
                );
            } finally {
                setPaymentLoading(false);
            }
        },
        [navigate]
    );

    /* ========================================================
       LOAD PROCUREMENT
    ======================================================== */
    const loadProcurement = useCallback(async () => {
        const token = getToken();
        if (!token) {
            navigate("/login");
            return;
        }

        if (!publicToken) {
            setError("Invalid procurement reference.");
            setLoading(false);
            return;
        }

        setLoading(true);
        setError("");

        try {
            const detailPromise = fetch(
                `${API_URL}/api/proposals/client/procurement/${publicToken}/`,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const trackingPromise = fetch(
                `${API_URL}/api/procurement/client/${publicToken}/tracking/`,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            ).catch(() => null);

            const [detailResponse, trackingResponse] = await Promise.all([
                detailPromise,
                trackingPromise,
            ]);

            const detailText = await detailResponse.text();
            let detailData = {};
            try {
                detailData = detailText ? JSON.parse(detailText) : {};
            } catch {
                throw new Error(
                    `Server returned an invalid response (${detailResponse.status}).`
                );
            }

            if (detailResponse.status === 401) {
                localStorage.removeItem("access");
                localStorage.removeItem("access_token");
                localStorage.removeItem("token");
                navigate("/login");
                return;
            }

            if (!detailResponse.ok) {
                throw new Error(
                    detailData?.detail ||
                    detailData?.error ||
                    "Unable to load procurement."
                );
            }

            if (detailData.success === false) {
                throw new Error(
                    detailData?.error || "Unable to load procurement."
                );
            }

            setProcurement(detailData.procurement || null);

            if (trackingResponse && trackingResponse.ok) {
                const trackingText = await trackingResponse.text();
                let trackingData = {};
                try {
                    trackingData = trackingText ? JSON.parse(trackingText) : {};
                } catch {
                    trackingData = {};
                }

                if (
                    trackingData.success !== false &&
                    trackingData.procurement
                ) {
                    const trackingList = Array.isArray(
                        trackingData.procurement.tracking
                    )
                        ? trackingData.procurement.tracking
                        : [];
                    setTracking(trackingList);
                } else {
                    setTracking([]);
                }
            } else {
                setTracking([]);
            }
        } catch (err) {
            console.error("Procurement details error:", err);
            setError(err?.message || "Unable to load procurement.");
        } finally {
            setLoading(false);
        }
    }, [navigate, publicToken]);

    useEffect(() => {
        loadProcurement();
    }, [loadProcurement]);

    /* ========================================================
       DERIVED
    ======================================================== */
    const quotation = procurement?.quotation || null;

    const proposalPublicToken =
        procurement?.proposal_public_token ||
        procurement?.proposal?.public_token ||
        quotation?.proposal_public_token ||
        quotation?.proposal?.public_token ||
        procurement?.public_token ||
        "";

    const items = quotation?.items || [];

    const includedItems = useMemo(
        () =>
            items.filter(
                (item) =>
                    item.included !== false && Number(item.quantity) > 0
            ),
        [items]
    );

    const paymentMilestones = useMemo(
        () => getPaymentMilestones(paymentData),
        [paymentData]
    );

    const paymentSummary =
        paymentData?.summary || paymentData?.payment_summary || {};

    const paymentCurrency =
        paymentSummary?.currency ||
        paymentData?.currency ||
        quotation?.currency ||
        procurement?.currency ||
        "NGN";

    useEffect(() => {
        if (!procurement) return;
        if (!proposalPublicToken) return;
        loadPayments(proposalPublicToken);
    }, [procurement, proposalPublicToken, loadPayments]);

    const latestTracking = tracking.length > 0 ? tracking[0] : null;
    const currentTrackingStatus = latestTracking?.status || null;
    const currentTrackingLabel = latestTracking
        ? getTrackingLabel(latestTracking.status, latestTracking.status_label)
        : null;

    const trackingReference =
        quotation?.tracking_reference ||
        procurement?.tracking_reference ||
        "";

    /* ========================================================
       COPY REFERENCE
    ======================================================== */
    function copyReference() {
        if (!trackingReference) return;
        try {
            navigator.clipboard.writeText(String(trackingReference));
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch {
            // silent
        }
    }

    /* ========================================================
       PAYMENTS
    ======================================================== */
    const initiateMilestonePayment = async (milestone) => {
        if (!proposalPublicToken) {
            setPaymentActionMessage(
                "This procurement is not currently connected to a payment proposal."
            );
            return;
        }

        const milestoneId = milestone.milestone_id || milestone.id;
        if (!milestoneId) {
            setPaymentActionMessage(
                "This payment milestone is missing its reference."
            );
            return;
        }

        setPayingMilestoneId(milestoneId);
        setPaymentActionMessage("");
        setPaymentError("");

        try {
            const token = getToken();
            if (!token) {
                navigate("/login");
                return;
            }

            const response = await fetch(
                `${API_URL}/api/payments/client/${proposalPublicToken}/payments/initiate/`,
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ milestone_id: milestoneId }),
                }
            );

            const data = await response.json().catch(() => ({}));

            if (response.status === 401) {
                localStorage.removeItem("access");
                localStorage.removeItem("access_token");
                localStorage.removeItem("token");
                navigate("/login");
                return;
            }

            if (!response.ok) {
                throw new Error(
                    data?.error ||
                    data?.detail ||
                    "Unable to start payment."
                );
            }

            const checkoutUrl =
                data?.checkout_url ||
                data?.authorization_url ||
                data?.paystack?.authorization_url ||
                data?.data?.authorization_url;

            if (!checkoutUrl) {
                throw new Error("Payment checkout URL was not returned.");
            }

            sessionStorage.setItem(
                "payment_proposal_token",
                proposalPublicToken
            );
            sessionStorage.setItem(
                "payment_return_to",
                window.location.pathname
            );
            sessionStorage.setItem("payment_type", "milestone");

            const transactionReference =
                data?.payment?.transaction_reference ||
                data?.payment?.reference ||
                data?.transaction_reference ||
                data?.reference ||
                data?.paystack?.reference ||
                "";

            if (transactionReference) {
                sessionStorage.setItem(
                    "payment_reference",
                    transactionReference
                );
            }

            window.location.href = checkoutUrl;
        } catch (err) {
            console.error("Initiate payment error:", err);
            setPaymentActionMessage(
                err?.message || "Unable to start payment."
            );
        } finally {
            setPayingMilestoneId(null);
        }
    };

    const initiateFullBalancePayment = async () => {
        if (!proposalPublicToken) {
            setPaymentActionMessage(
                "This procurement is not currently connected to a payment proposal."
            );
            return;
        }

        const outstanding = Number(paymentSummary?.outstanding_balance) || 0;
        if (outstanding <= 0) {
            setPaymentActionMessage(
                "There is no outstanding balance to pay."
            );
            return;
        }

        setPayingFullBalance(true);
        setPaymentActionMessage("");
        setPaymentError("");

        try {
            const token = getToken();
            if (!token) {
                navigate("/login");
                return;
            }

            const response = await fetch(
                `${API_URL}/api/payments/client/${proposalPublicToken}/payments/pay-full/`,
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json().catch(() => ({}));

            if (response.status === 401) {
                localStorage.removeItem("access");
                localStorage.removeItem("access_token");
                localStorage.removeItem("token");
                navigate("/login");
                return;
            }

            if (!response.ok) {
                throw new Error(
                    data?.error ||
                    data?.detail ||
                    "Unable to start full balance payment."
                );
            }

            const checkoutUrl =
                data?.checkout_url ||
                data?.authorization_url ||
                data?.paystack?.authorization_url ||
                data?.data?.authorization_url;

            if (!checkoutUrl) {
                throw new Error("Payment checkout URL was not returned.");
            }

            sessionStorage.setItem(
                "payment_proposal_token",
                proposalPublicToken
            );
            sessionStorage.setItem(
                "payment_return_to",
                window.location.pathname
            );
            sessionStorage.setItem("payment_type", "full");

            const transactionReference =
                data?.payment?.transaction_reference ||
                data?.payment?.reference ||
                data?.transaction_reference ||
                data?.reference ||
                data?.paystack?.reference ||
                "";

            if (transactionReference) {
                sessionStorage.setItem(
                    "payment_reference",
                    transactionReference
                );
            }

            window.location.href = checkoutUrl;
        } catch (err) {
            console.error("Full balance payment error:", err);
            setPaymentActionMessage(
                err?.message || "Unable to start full balance payment."
            );
        } finally {
            setPayingFullBalance(false);
        }
    };

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
                    <ProcurementDetailsSkeleton darkMode={darkMode} />
                </div>
            </div>
        );
    }

    /* ========================================================
       ERROR
    ======================================================== */
    if (error || !procurement) {
        return (
            <div className={`min-h-screen ${pageClasses}`}>
                <div className="mx-auto max-w-xl px-4 py-16">
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
                            className={`relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${darkMode
                                    ? "bg-red-500/10 text-red-300"
                                    : "bg-red-50 text-red-600"
                                }`}
                        >
                            <AlertCircle size={28} />
                        </div>

                        <h1
                            className={`relative mt-5 text-2xl font-black ${darkMode ? "text-white" : "text-slate-900"
                                }`}
                        >
                            Procurement unavailable
                        </h1>
                        <p
                            className={`relative mt-2 text-sm leading-6 ${darkMode ? "text-slate-400" : "text-slate-500"
                                }`}
                        >
                            {error ||
                                "We could not find this procurement quotation."}
                        </p>

                        <div className="relative mt-6 flex flex-wrap justify-center gap-3">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-bold transition-colors ${darkMode
                                        ? "border-white/[0.08] text-slate-300 hover:bg-white/[0.05]"
                                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                                    }`}
                            >
                                <ArrowLeft size={15} />
                                Go back
                            </button>
                            <Link
                                to="/portal/procurement"
                                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/30 transition-all hover:-translate-y-0.5 hover:shadow-cyan-500/50"
                            >
                                Back to Procurement
                                <ArrowRight size={15} />
                            </Link>
                        </div>
                    </div>
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
                            <Link
                                to="/portal/procurement"
                                className={`transition-colors ${darkMode
                                        ? "hover:text-slate-300"
                                        : "hover:text-slate-600"
                                    }`}
                            >
                                Procurement
                            </Link>
                            <span>/</span>
                            <span
                                className={`max-w-[220px] truncate font-bold ${darkMode
                                        ? "text-slate-300"
                                        : "text-slate-600"
                                    }`}
                            >
                                {procurement.title || "Details"}
                            </span>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => loadProcurement()}
                        className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-bold transition-colors ${darkMode
                                ? "border-white/[0.08] text-slate-400 hover:bg-white/[0.04] hover:text-white"
                                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                            }`}
                    >
                        <RefreshCw size={13} />
                        Refresh
                    </button>
                </div>

                {/* ============================================
                    HERO HEADER
                ============================================ */}
                <section
                    className={`relative mt-5 overflow-hidden rounded-3xl border ${darkMode
                            ? "border-white/[0.07] bg-gradient-to-br from-white/[0.03] via-white/[0.015] to-transparent"
                            : "border-slate-200 bg-gradient-to-br from-white via-slate-50/60 to-cyan-50/30"
                        }`}
                >
                    <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />

                    <div className="relative p-6 sm:p-8">
                        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                            <div className="min-w-0 flex-1">
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
                                            <span
                                                className={`rounded-md border px-2 py-0.5 text-[9px] font-black uppercase tracking-wider ${darkMode
                                                        ? "border-white/[0.08] bg-white/[0.04] text-slate-400"
                                                        : "border-slate-200 bg-slate-50 text-slate-500"
                                                    }`}
                                            >
                                                Procurement
                                            </span>
                                            <StatusChip
                                                status={procurement.status}
                                                darkMode={darkMode}
                                            />
                                            {currentTrackingLabel && (
                                                <TrackingChip
                                                    status={currentTrackingStatus}
                                                    label={currentTrackingLabel}
                                                    darkMode={darkMode}
                                                />
                                            )}
                                        </div>

                                        <h1
                                            className={`mt-3 break-words text-2xl font-black tracking-tight sm:text-3xl ${darkMode
                                                    ? "text-white"
                                                    : "text-slate-900"
                                                }`}
                                        >
                                            {procurement.title}
                                        </h1>

                                        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
                                            {trackingReference && (
                                                <button
                                                    type="button"
                                                    onClick={copyReference}
                                                    className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 font-mono font-bold transition-colors ${darkMode
                                                            ? "border-white/[0.08] bg-white/[0.03] text-slate-300 hover:bg-white/[0.06]"
                                                            : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                                                        }`}
                                                >
                                                    <Hash size={11} />
                                                    {trackingReference}
                                                    {copied ? (
                                                        <CheckCircle2
                                                            size={11}
                                                            className="text-emerald-500"
                                                        />
                                                    ) : (
                                                        <Copy size={11} />
                                                    )}
                                                </button>
                                            )}

                                            {quotation?.request_type && (
                                                <span
                                                    className={`inline-flex items-center gap-1.5 ${darkMode
                                                            ? "text-slate-500"
                                                            : "text-slate-500"
                                                        }`}
                                                >
                                                    <Tag size={11} />
                                                    {quotation.request_type}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* TOTAL */}
                            <div
                                className={`w-full rounded-2xl border p-5 lg:max-w-xs ${darkMode
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
                                    Total procurement value
                                </p>
                                <p
                                    className={`mt-1.5 bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-2xl font-black text-transparent sm:text-3xl`}
                                >
                                    {formatCurrency(
                                        quotation?.total,
                                        quotation?.currency
                                    )}
                                </p>
                                {quotation?.currency && (
                                    <p
                                        className={`mt-1 text-[10px] font-black uppercase tracking-wider ${darkMode
                                                ? "text-slate-600"
                                                : "text-slate-400"
                                            }`}
                                    >
                                        {quotation.currency}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* INFO STRIP */}
                        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
                            <InfoTile
                                icon={Calendar}
                                label="Created"
                                value={formatDate(procurement.created_at)}
                                darkMode={darkMode}
                            />
                            <InfoTile
                                icon={Clock3}
                                label="Last updated"
                                value={timeAgo(
                                    latestTracking?.created_at ||
                                    procurement.updated_at
                                )}
                                darkMode={darkMode}
                            />
                            <InfoTile
                                icon={Calendar}
                                label="Deadline"
                                value={formatDate(quotation?.deadline)}
                                darkMode={darkMode}
                            />
                            <InfoTile
                                icon={Box}
                                label="Items"
                                value={String(
                                    quotation?.item_count ||
                                    includedItems.length
                                )}
                                darkMode={darkMode}
                            />
                        </div>
                    </div>
                </section>

                {/* ============================================
                    MAIN GRID
                ============================================ */}
                <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
                    {/* LEFT COLUMN */}
                    <div className="space-y-6">
                        {/* TRACKING */}
                        <section
                            className={`overflow-hidden rounded-2xl border ${darkMode
                                    ? "border-white/[0.07] bg-white/[0.025]"
                                    : "border-slate-200 bg-white shadow-sm"
                                }`}
                        >
                            <div
                                className={`flex flex-col gap-3 border-b p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6 ${darkMode
                                        ? "border-white/[0.06]"
                                        : "border-slate-100"
                                    }`}
                            >
                                <div className="flex items-start gap-3">
                                    <div
                                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${darkMode
                                                ? "bg-cyan-400/10 text-cyan-300"
                                                : "bg-cyan-50 text-cyan-600"
                                            }`}
                                    >
                                        <Truck size={18} />
                                    </div>
                                    <div>
                                        <h2
                                            className={`text-base font-black ${darkMode
                                                    ? "text-white"
                                                    : "text-slate-900"
                                                }`}
                                        >
                                            Tracking updates
                                        </h2>
                                        <p
                                            className={`mt-0.5 text-xs ${darkMode
                                                    ? "text-slate-500"
                                                    : "text-slate-500"
                                                }`}
                                        >
                                            Latest status and full history
                                        </p>
                                    </div>
                                </div>

                                {tracking.length > 0 && (
                                    <span
                                        className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${darkMode
                                                ? "border-white/[0.08] bg-white/[0.03] text-slate-400"
                                                : "border-slate-200 bg-slate-50 text-slate-500"
                                            }`}
                                    >
                                        <Zap size={10} />
                                        {tracking.length} update
                                        {tracking.length === 1 ? "" : "s"}
                                    </span>
                                )}
                            </div>

                            {tracking.length === 0 ? (
                                <div className="px-6 py-14 text-center">
                                    <div
                                        className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${darkMode
                                                ? "bg-white/[0.04] text-slate-500"
                                                : "bg-slate-100 text-slate-400"
                                            }`}
                                    >
                                        <Clock3 size={24} />
                                    </div>
                                    <p
                                        className={`mt-4 text-sm font-bold ${darkMode
                                                ? "text-slate-300"
                                                : "text-slate-700"
                                            }`}
                                    >
                                        No tracking updates yet
                                    </p>
                                    <p
                                        className={`mx-auto mt-1 max-w-sm text-xs leading-5 ${darkMode
                                                ? "text-slate-500"
                                                : "text-slate-400"
                                            }`}
                                    >
                                        Status updates will appear here as
                                        soon as our team posts them.
                                    </p>
                                </div>
                            ) : (
                                <ol className="relative space-y-5 p-6">
                                    {tracking.map((update, index) => (
                                        <TrackingTimelineRow
                                            key={update.id || index}
                                            update={update}
                                            trackingReference={trackingReference}
                                            isLatest={index === 0}
                                            isLast={index === tracking.length - 1}
                                            darkMode={darkMode}
                                        />
                                    ))}
                                </ol>
                            )}
                        </section>

                        {/* INFORMATION */}
                        {(quotation?.description ||
                            quotation?.purpose ||
                            quotation?.notes) && (
                                <section
                                    className={`rounded-2xl border p-5 sm:p-6 ${darkMode
                                            ? "border-white/[0.07] bg-white/[0.025]"
                                            : "border-slate-200 bg-white shadow-sm"
                                        }`}
                                >
                                    <div className="mb-5 flex items-center gap-3">
                                        <div
                                            className={`flex h-10 w-10 items-center justify-center rounded-xl ${darkMode
                                                    ? "bg-indigo-400/10 text-indigo-300"
                                                    : "bg-indigo-50 text-indigo-600"
                                                }`}
                                        >
                                            <FileText size={18} />
                                        </div>
                                        <h2
                                            className={`text-base font-black ${darkMode
                                                    ? "text-white"
                                                    : "text-slate-900"
                                                }`}
                                        >
                                            Procurement information
                                        </h2>
                                    </div>

                                    <div className="space-y-5">
                                        {quotation?.description && (
                                            <InfoSection
                                                label="Description"
                                                value={quotation.description}
                                                darkMode={darkMode}
                                            />
                                        )}
                                        {quotation?.purpose && (
                                            <InfoSection
                                                label="Purpose"
                                                value={quotation.purpose}
                                                darkMode={darkMode}
                                            />
                                        )}
                                        {quotation?.notes && (
                                            <InfoSection
                                                label="Notes"
                                                value={quotation.notes}
                                                darkMode={darkMode}
                                            />
                                        )}
                                    </div>
                                </section>
                            )}

                        {/* ITEMS */}
                        <section
                            className={`overflow-hidden rounded-2xl border ${darkMode
                                    ? "border-white/[0.07] bg-white/[0.025]"
                                    : "border-slate-200 bg-white shadow-sm"
                                }`}
                        >
                            <div
                                className={`flex flex-col gap-3 border-b p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6 ${darkMode
                                        ? "border-white/[0.06]"
                                        : "border-slate-100"
                                    }`}
                            >
                                <div className="flex items-start gap-3">
                                    <div
                                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${darkMode
                                                ? "bg-amber-400/10 text-amber-300"
                                                : "bg-amber-50 text-amber-600"
                                            }`}
                                    >
                                        <ClipboardList size={18} />
                                    </div>
                                    <div>
                                        <h2
                                            className={`text-base font-black ${darkMode
                                                    ? "text-white"
                                                    : "text-slate-900"
                                                }`}
                                        >
                                            Procurement items
                                        </h2>
                                        <p
                                            className={`mt-0.5 text-xs ${darkMode
                                                    ? "text-slate-500"
                                                    : "text-slate-500"
                                                }`}
                                        >
                                            Items included in this quotation
                                        </p>
                                    </div>
                                </div>

                                <span
                                    className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${darkMode
                                            ? "border-white/[0.08] bg-white/[0.03] text-slate-400"
                                            : "border-slate-200 bg-slate-50 text-slate-500"
                                        }`}
                                >
                                    {includedItems.length} item
                                    {includedItems.length === 1 ? "" : "s"}
                                </span>
                            </div>

                            {items.length === 0 ? (
                                <div className="px-6 py-14 text-center">
                                    <div
                                        className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${darkMode
                                                ? "bg-white/[0.04] text-slate-500"
                                                : "bg-slate-100 text-slate-400"
                                            }`}
                                    >
                                        <Package size={24} />
                                    </div>
                                    <p
                                        className={`mt-4 text-sm font-bold ${darkMode
                                                ? "text-slate-300"
                                                : "text-slate-700"
                                            }`}
                                    >
                                        No procurement items found
                                    </p>
                                </div>
                            ) : (
                                <div
                                    className={`divide-y ${darkMode
                                            ? "divide-white/[0.06]"
                                            : "divide-slate-100"
                                        }`}
                                >
                                    {items.map((item, index) => (
                                        <ProcurementItem
                                            key={item.id || index}
                                            item={item}
                                            currency={quotation?.currency}
                                            darkMode={darkMode}
                                        />
                                    ))}
                                </div>
                            )}
                        </section>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="space-y-6 lg:sticky lg:top-[92px] lg:self-start">
                        <ProcurementPaymentCard
                            milestones={paymentMilestones}
                            summary={paymentSummary}
                            currency={paymentCurrency}
                            loading={paymentLoading}
                            error={paymentError}
                            actionMessage={paymentActionMessage}
                            payingMilestoneId={payingMilestoneId}
                            payingFullBalance={payingFullBalance}
                            onPay={initiateMilestonePayment}
                            onPayFullBalance={initiateFullBalancePayment}
                            onRefresh={() =>
                                loadPayments(proposalPublicToken)
                            }
                            darkMode={darkMode}
                        />

                        {/* COST SUMMARY */}
                        <section
                            className={`rounded-2xl border p-5 sm:p-6 ${darkMode
                                    ? "border-white/[0.07] bg-white/[0.025]"
                                    : "border-slate-200 bg-white shadow-sm"
                                }`}
                        >
                            <div className="mb-5 flex items-center gap-3">
                                <div
                                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${darkMode
                                            ? "bg-emerald-400/10 text-emerald-300"
                                            : "bg-emerald-50 text-emerald-600"
                                        }`}
                                >
                                    <Receipt size={18} />
                                </div>
                                <h2
                                    className={`text-base font-black ${darkMode
                                            ? "text-white"
                                            : "text-slate-900"
                                        }`}
                                >
                                    Cost summary
                                </h2>
                            </div>

                            <div className="space-y-3">
                                <PriceRow
                                    label="Subtotal"
                                    value={formatCurrency(
                                        quotation?.subtotal,
                                        quotation?.currency
                                    )}
                                    darkMode={darkMode}
                                />
                                <PriceRow
                                    label="Discount"
                                    value={formatCurrency(
                                        quotation?.discount,
                                        quotation?.currency
                                    )}
                                    darkMode={darkMode}
                                />
                                <PriceRow
                                    label="Tax"
                                    value={formatCurrency(
                                        quotation?.tax,
                                        quotation?.currency
                                    )}
                                    darkMode={darkMode}
                                />
                                <PriceRow
                                    label="Delivery"
                                    value={formatCurrency(
                                        quotation?.delivery_fee,
                                        quotation?.currency
                                    )}
                                    darkMode={darkMode}
                                />

                                <div
                                    className={`my-4 border-t ${darkMode
                                            ? "border-white/[0.06]"
                                            : "border-slate-100"
                                        }`}
                                />

                                <div className="flex items-end justify-between gap-4">
                                    <span
                                        className={`text-sm font-black ${darkMode
                                                ? "text-white"
                                                : "text-slate-900"
                                            }`}
                                    >
                                        Total
                                    </span>
                                    <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-xl font-black text-transparent">
                                        {formatCurrency(
                                            quotation?.total,
                                            quotation?.currency
                                        )}
                                    </span>
                                </div>
                            </div>
                        </section>

                        {/* STATUS */}
                        <section
                            className={`rounded-2xl border p-5 sm:p-6 ${darkMode
                                    ? "border-white/[0.07] bg-white/[0.025]"
                                    : "border-slate-200 bg-white shadow-sm"
                                }`}
                        >
                            <div className="mb-5 flex items-center gap-3">
                                <div
                                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${darkMode
                                            ? "bg-sky-400/10 text-sky-300"
                                            : "bg-sky-50 text-sky-600"
                                        }`}
                                >
                                    <PackageCheck size={18} />
                                </div>
                                <h2
                                    className={`text-base font-black ${darkMode
                                            ? "text-white"
                                            : "text-slate-900"
                                        }`}
                                >
                                    Current status
                                </h2>
                            </div>

                            <div
                                className={`rounded-xl border p-4 ${darkMode
                                        ? "border-white/[0.06] bg-white/[0.02]"
                                        : "border-slate-100 bg-slate-50"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <span
                                        className={`h-3 w-3 rounded-full ${currentTrackingStatus
                                                ? trackingTheme(
                                                    currentTrackingStatus,
                                                    darkMode
                                                ).dot
                                                : procurement.status === "completed"
                                                    ? "bg-emerald-500"
                                                    : "bg-sky-500"
                                            }`}
                                    />
                                    <span
                                        className={`text-sm font-black ${darkMode
                                                ? "text-white"
                                                : "text-slate-800"
                                            }`}
                                    >
                                        {currentTrackingLabel ||
                                            getStatusLabel(procurement.status)}
                                    </span>
                                </div>

                                {currentTrackingLabel ? (
                                    <p
                                        className={`mt-3 text-xs leading-5 ${darkMode
                                                ? "text-slate-400"
                                                : "text-slate-500"
                                            }`}
                                    >
                                        Last updated{" "}
                                        {formatDateTime(
                                            latestTracking?.created_at
                                        )}
                                        {latestTracking?.location
                                            ? ` • ${latestTracking.location}`
                                            : ""}
                                    </p>
                                ) : procurement.status === "completed" ? (
                                    <p
                                        className={`mt-3 text-xs leading-5 ${darkMode
                                                ? "text-slate-400"
                                                : "text-slate-500"
                                            }`}
                                    >
                                        This procurement has been marked as
                                        completed.
                                    </p>
                                ) : procurement.status === "accepted" ? (
                                    <p
                                        className={`mt-3 text-xs leading-5 ${darkMode
                                                ? "text-slate-400"
                                                : "text-slate-500"
                                            }`}
                                    >
                                        This procurement has been accepted and
                                        is currently being processed.
                                    </p>
                                ) : null}
                            </div>
                        </section>

                        {/* TIMELINE */}
                        <section
                            className={`rounded-2xl border p-5 sm:p-6 ${darkMode
                                    ? "border-white/[0.07] bg-white/[0.025]"
                                    : "border-slate-200 bg-white shadow-sm"
                                }`}
                        >
                            <div className="mb-5 flex items-center gap-3">
                                <div
                                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${darkMode
                                            ? "bg-violet-400/10 text-violet-300"
                                            : "bg-violet-50 text-violet-600"
                                        }`}
                                >
                                    <Sparkles size={18} />
                                </div>
                                <h2
                                    className={`text-base font-black ${darkMode
                                            ? "text-white"
                                            : "text-slate-900"
                                        }`}
                                >
                                    Lifecycle
                                </h2>
                            </div>

                            <div className="space-y-5">
                                <TimelineItem
                                    label="Created"
                                    date={procurement.created_at}
                                    active
                                    darkMode={darkMode}
                                    isLast={false}
                                />
                                <TimelineItem
                                    label="Sent"
                                    date={procurement.sent_at}
                                    active={Boolean(procurement.sent_at)}
                                    darkMode={darkMode}
                                    isLast={false}
                                />
                                <TimelineItem
                                    label="Viewed"
                                    date={procurement.viewed_at}
                                    active={Boolean(procurement.viewed_at)}
                                    darkMode={darkMode}
                                    isLast={false}
                                />
                                <TimelineItem
                                    label="Accepted"
                                    date={procurement.accepted_at}
                                    active={Boolean(procurement.accepted_at)}
                                    darkMode={darkMode}
                                    isLast
                                />
                            </div>
                        </section>

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
                                    <Users size={18} />
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
                                        className={`mt-0.5 text-xs ${darkMode
                                                ? "text-slate-500"
                                                : "text-slate-500"
                                            }`}
                                    >
                                        Contact our team
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
            </div>
        </div>
    );
}


/* ============================================================
   PAYMENT CARD
============================================================ */

function ProcurementPaymentCard({
    milestones,
    summary,
    currency,
    loading,
    error,
    actionMessage,
    payingMilestoneId,
    payingFullBalance,
    onPay,
    onPayFullBalance,
    onRefresh,
    darkMode,
}) {
    const total =
        Number(
            summary?.payment_total ??
            summary?.proposal_total ??
            summary?.total ??
            0
        ) || 0;
    const paid = Number(summary?.total_paid) || 0;
    const outstandingRaw = Number(summary?.outstanding_balance);
    const outstanding = Number.isFinite(outstandingRaw)
        ? Math.max(outstandingRaw, 0)
        : Math.max(total - paid, 0);

    const percentageFromApi = Number(summary?.payment_percentage);
    const paymentPercentage = Number.isFinite(percentageFromApi)
        ? Math.min(Math.max(percentageFromApi, 0), 100)
        : total > 0
            ? Math.min((paid / total) * 100, 100)
            : 0;

    const isFullyPaid = outstanding <= 0;

    if (loading && !milestones.length) {
        return (
            <section
                className={`rounded-2xl border p-6 ${darkMode
                        ? "border-white/[0.07] bg-white/[0.025]"
                        : "border-slate-200 bg-white shadow-sm"
                    }`}
            >
                <div className="flex items-center gap-3">
                    <Loader2 size={18} className="animate-spin text-cyan-500" />
                    <div>
                        <h2
                            className={`text-base font-black ${darkMode ? "text-white" : "text-slate-900"
                                }`}
                        >
                            Payments
                        </h2>
                        <p
                            className={`mt-0.5 text-xs ${darkMode ? "text-slate-500" : "text-slate-500"
                                }`}
                        >
                            Loading payment information…
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    if (error && !milestones.length) {
        return (
            <section
                className={`rounded-2xl border p-6 ${darkMode
                        ? "border-white/[0.07] bg-white/[0.025]"
                        : "border-slate-200 bg-white shadow-sm"
                    }`}
            >
                <div className="flex gap-3">
                    <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${darkMode
                                ? "bg-red-500/10 text-red-300"
                                : "bg-red-50 text-red-600"
                            }`}
                    >
                        <AlertCircle size={19} />
                    </div>
                    <div className="min-w-0">
                        <h2
                            className={`text-base font-black ${darkMode ? "text-white" : "text-slate-900"
                                }`}
                        >
                            Payments
                        </h2>
                        <p
                            className={`mt-1 text-xs leading-5 ${darkMode ? "text-slate-400" : "text-slate-500"
                                }`}
                        >
                            {error}
                        </p>
                        <button
                            type="button"
                            onClick={onRefresh}
                            className={`mt-4 inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-bold transition-colors ${darkMode
                                    ? "border-white/[0.08] text-slate-300 hover:bg-white/[0.05]"
                                    : "border-slate-200 text-slate-700 hover:bg-slate-50"
                                }`}
                        >
                            <RefreshCw size={13} />
                            Try again
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section
            className={`overflow-hidden rounded-2xl border ${darkMode
                    ? "border-white/[0.07] bg-white/[0.025]"
                    : "border-slate-200 bg-white shadow-sm"
                }`}
        >
            {/* HEADER */}
            <div
                className={`border-b p-5 sm:p-6 ${darkMode ? "border-white/[0.06]" : "border-slate-100"
                    }`}
            >
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <div
                                className={`flex h-10 w-10 items-center justify-center rounded-xl ${darkMode
                                        ? "bg-sky-400/10 text-sky-300"
                                        : "bg-sky-50 text-sky-600"
                                    }`}
                            >
                                <CreditCard size={18} />
                            </div>
                            <h2
                                className={`text-base font-black ${darkMode ? "text-white" : "text-slate-900"
                                    }`}
                            >
                                Payments
                            </h2>
                        </div>
                        <p
                            className={`mt-2 text-xs leading-5 ${darkMode ? "text-slate-500" : "text-slate-500"
                                }`}
                        >
                            Manage your procurement payments.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onRefresh}
                        disabled={loading}
                        className={`rounded-lg border p-2 transition-colors disabled:opacity-50 ${darkMode
                                ? "border-white/[0.08] text-slate-400 hover:bg-white/[0.05]"
                                : "border-slate-200 text-slate-500 hover:bg-slate-50"
                            }`}
                        title="Refresh payments"
                    >
                        <RefreshCw
                            size={14}
                            className={loading ? "animate-spin text-cyan-500" : ""}
                        />
                    </button>
                </div>

                {/* MINI STATS */}
                <div className="mt-5 grid grid-cols-3 gap-2">
                    <PaymentMiniStat
                        label="Total"
                        value={formatCurrency(total, currency)}
                        tone="default"
                        darkMode={darkMode}
                    />
                    <PaymentMiniStat
                        label="Paid"
                        value={formatCurrency(paid, currency)}
                        tone="positive"
                        darkMode={darkMode}
                    />
                    <PaymentMiniStat
                        label="Outstanding"
                        value={formatCurrency(outstanding, currency)}
                        tone="emphasis"
                        darkMode={darkMode}
                    />
                </div>

                {/* PROGRESS */}
                <div className="mt-5">
                    <div className="mb-2 flex items-center justify-between gap-3">
                        <span
                            className={`text-[10px] font-black uppercase tracking-wider ${darkMode ? "text-slate-500" : "text-slate-400"
                                }`}
                        >
                            Payment progress
                        </span>
                        <span
                            className={`text-[11px] font-black ${darkMode ? "text-slate-300" : "text-slate-700"
                                }`}
                        >
                            {paymentPercentage.toFixed(0)}%
                        </span>
                    </div>
                    <div
                        className={`h-2 overflow-hidden rounded-full ${darkMode ? "bg-white/[0.06]" : "bg-slate-100"
                            }`}
                    >
                        <div
                            className={`h-full rounded-full transition-all duration-1000 ${paymentPercentage === 100
                                    ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                                    : "bg-gradient-to-r from-cyan-500 to-indigo-500"
                                }`}
                            style={{ width: `${paymentPercentage}%` }}
                        />
                    </div>
                </div>

                {/* FULL BALANCE / FULLY PAID */}
                {isFullyPaid ? (
                    <div
                        className={`mt-5 flex items-center gap-3 rounded-xl border p-4 ${darkMode
                                ? "border-emerald-500/20 bg-emerald-500/[0.06]"
                                : "border-emerald-200 bg-emerald-50"
                            }`}
                    >
                        <div
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${darkMode
                                    ? "bg-emerald-500/15 text-emerald-300"
                                    : "bg-emerald-100 text-emerald-600"
                                }`}
                        >
                            <CheckCircle2 size={19} />
                        </div>
                        <div className="min-w-0">
                            <p
                                className={`text-sm font-black ${darkMode
                                        ? "text-emerald-300"
                                        : "text-emerald-800"
                                    }`}
                            >
                                Fully Paid
                            </p>
                            <p
                                className={`mt-0.5 text-[11px] leading-5 ${darkMode
                                        ? "text-emerald-300/80"
                                        : "text-emerald-700"
                                    }`}
                            >
                                The full procurement balance has been paid.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div
                        className={`relative mt-5 overflow-hidden rounded-2xl border p-4 ${darkMode
                                ? "border-cyan-500/20 bg-gradient-to-br from-cyan-500/[0.08] to-indigo-500/[0.04]"
                                : "border-cyan-200 bg-gradient-to-br from-cyan-50 to-indigo-50"
                            }`}
                    >
                        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-400/20 blur-3xl" />

                        <div className="relative flex items-start gap-3">
                            <div
                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${darkMode
                                        ? "bg-cyan-500/15 text-cyan-300"
                                        : "bg-white text-cyan-600 ring-1 ring-cyan-100"
                                    }`}
                            >
                                <CreditCard size={18} />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p
                                    className={`text-sm font-black ${darkMode
                                            ? "text-white"
                                            : "text-slate-900"
                                        }`}
                                >
                                    Pay full balance
                                </p>
                                <p
                                    className={`mt-1 text-[11px] leading-5 ${darkMode
                                            ? "text-slate-400"
                                            : "text-slate-500"
                                        }`}
                                >
                                    Settle all remaining obligations in a
                                    single secure transaction.
                                </p>
                            </div>
                        </div>

                        <div className="relative mt-4 flex items-baseline justify-between gap-4">
                            <div>
                                <p
                                    className={`text-[9px] font-black uppercase tracking-wider ${darkMode
                                            ? "text-slate-500"
                                            : "text-slate-400"
                                        }`}
                                >
                                    Amount to pay
                                </p>
                                <p className="mt-1 bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-xl font-black text-transparent">
                                    {formatCurrency(outstanding, currency)}
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            disabled={payingFullBalance}
                            onClick={onPayFullBalance}
                            className="relative mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/30 transition-all hover:-translate-y-0.5 hover:shadow-cyan-500/50 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                        >
                            {payingFullBalance ? (
                                <>
                                    <Loader2
                                        size={16}
                                        className="animate-spin"
                                    />
                                    Preparing payment…
                                </>
                            ) : (
                                <>
                                    <CreditCard size={16} />
                                    Pay Full Balance
                                </>
                            )}
                        </button>

                        <div
                            className={`relative mt-3 flex items-center justify-center gap-1.5 text-[10px] font-bold ${darkMode ? "text-slate-500" : "text-slate-400"
                                }`}
                        >
                            <ShieldCheck size={11} />
                            Secure payment via Paystack
                        </div>
                    </div>
                )}

                {/* ACTION MESSAGE */}
                {actionMessage && (
                    <div
                        className={`mt-4 flex items-start gap-2 rounded-xl border px-3.5 py-2.5 text-xs leading-5 ${darkMode
                                ? "border-amber-500/20 bg-amber-500/[0.06] text-amber-300"
                                : "border-amber-200 bg-amber-50 text-amber-700"
                            }`}
                    >
                        <Info size={13} className="mt-0.5 shrink-0" />
                        <span>{actionMessage}</span>
                    </div>
                )}
            </div>

            {/* MILESTONES */}
            {milestones.length > 0 && (
                <div>
                    <div
                        className={`border-b px-5 py-4 sm:px-6 ${darkMode
                                ? "border-white/[0.06] bg-white/[0.015]"
                                : "border-slate-100 bg-slate-50/60"
                            }`}
                    >
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p
                                    className={`text-sm font-black ${darkMode
                                            ? "text-white"
                                            : "text-slate-800"
                                        }`}
                                >
                                    Payment milestones
                                </p>
                                <p
                                    className={`mt-0.5 text-[11px] ${darkMode
                                            ? "text-slate-500"
                                            : "text-slate-500"
                                        }`}
                                >
                                    Or pay individual milestones below
                                </p>
                            </div>
                            <span
                                className={`rounded-lg border px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${darkMode
                                        ? "border-white/[0.08] bg-white/[0.04] text-slate-400"
                                        : "border-slate-200 bg-white text-slate-500"
                                    }`}
                            >
                                {milestones.length}
                            </span>
                        </div>
                    </div>

                    <div
                        className={`divide-y ${darkMode ? "divide-white/[0.06]" : "divide-slate-100"
                            }`}
                    >
                        {milestones.map((milestone, index) => (
                            <ProcurementPaymentMilestone
                                key={milestone.id || index}
                                milestone={milestone}
                                milestones={milestones}
                                currency={currency}
                                payingMilestoneId={payingMilestoneId}
                                onPay={onPay}
                                darkMode={darkMode}
                            />
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}


/* ============================================================
   PAYMENT MILESTONE
============================================================ */

function ProcurementPaymentMilestone({
    milestone,
    milestones,
    currency,
    payingMilestoneId,
    onPay,
    darkMode,
}) {
    const paymentState = getMilestonePaymentState(milestone, milestones);
    const milestoneId = milestone.milestone_id || milestone.id;
    const isPaying = payingMilestoneId === milestoneId;
    const paid = Number(milestone.total_paid) || 0;
    const amount = Number(milestone.amount) || 0;
    const outstanding = Math.max(
        Number(milestone.outstanding_balance) || 0,
        0
    );

    const stateStyles = {
        paid: darkMode
            ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30"
            : "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100",
        payable: darkMode
            ? "bg-cyan-500/15 text-cyan-300 ring-1 ring-cyan-500/30"
            : "bg-cyan-50 text-cyan-600 ring-1 ring-cyan-100",
        locked: darkMode
            ? "bg-white/[0.05] text-slate-500 ring-1 ring-white/[0.06]"
            : "bg-slate-100 text-slate-400 ring-1 ring-slate-200",
        cancelled: darkMode
            ? "bg-red-500/15 text-red-300 ring-1 ring-red-500/30"
            : "bg-red-50 text-red-600 ring-1 ring-red-100",
        not_required: darkMode
            ? "bg-white/[0.05] text-slate-500 ring-1 ring-white/[0.06]"
            : "bg-slate-100 text-slate-500 ring-1 ring-slate-200",
    };

    return (
        <div className="p-5 sm:p-6">
            <div className="flex gap-3">
                {/* STEP ICON */}
                <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-black ${stateStyles[paymentState.type] ||
                        stateStyles.not_required
                        }`}
                >
                    {paymentState.type === "paid" ? (
                        <CheckCircle2 size={16} />
                    ) : paymentState.type === "locked" ? (
                        <Lock size={14} />
                    ) : paymentState.type === "cancelled" ? (
                        <X size={14} />
                    ) : (
                        milestone.order
                    )}
                </div>

                {/* CONTENT */}
                <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                            <h3
                                className={`text-sm font-black ${darkMode
                                        ? "text-white"
                                        : "text-slate-900"
                                    }`}
                            >
                                {milestone.title ||
                                    `Milestone ${milestone.order}`}
                            </h3>
                            {milestone.description && (
                                <p
                                    className={`mt-1 text-[11px] leading-5 ${darkMode
                                            ? "text-slate-500"
                                            : "text-slate-500"
                                        }`}
                                >
                                    {milestone.description}
                                </p>
                            )}
                        </div>

                        <PaymentStatusBadge
                            type={paymentState.type}
                            label={paymentState.label}
                            darkMode={darkMode}
                        />
                    </div>

                    {/* AMOUNTS */}
                    {milestone.payment_required && (
                        <div
                            className={`mt-4 space-y-2 rounded-xl border p-3.5 ${darkMode
                                    ? "border-white/[0.06] bg-white/[0.02]"
                                    : "border-slate-100 bg-slate-50"
                                }`}
                        >
                            <div className="flex items-center justify-between gap-3">
                                <span
                                    className={`text-[11px] font-bold uppercase tracking-wider ${darkMode
                                            ? "text-slate-500"
                                            : "text-slate-400"
                                        }`}
                                >
                                    Amount
                                </span>
                                <span
                                    className={`text-sm font-black ${darkMode
                                            ? "text-slate-200"
                                            : "text-slate-800"
                                        }`}
                                >
                                    {formatCurrency(amount, currency)}
                                </span>
                            </div>

                            <div className="flex items-center justify-between gap-3">
                                <span
                                    className={`text-[11px] font-bold uppercase tracking-wider ${darkMode
                                            ? "text-slate-500"
                                            : "text-slate-400"
                                        }`}
                                >
                                    Paid
                                </span>
                                <span className="text-xs font-bold text-emerald-500">
                                    {formatCurrency(paid, currency)}
                                </span>
                            </div>

                            {outstanding > 0 && (
                                <div className="flex items-center justify-between gap-3 border-t pt-2.5 mt-2.5 border-dashed"
                                    style={{
                                        borderColor: darkMode
                                            ? "rgba(255,255,255,0.06)"
                                            : "rgb(241,245,249)",
                                    }}
                                >
                                    <span
                                        className={`text-[11px] font-bold uppercase tracking-wider ${darkMode
                                                ? "text-slate-400"
                                                : "text-slate-600"
                                            }`}
                                    >
                                        Outstanding
                                    </span>
                                    <span
                                        className={`text-sm font-black ${darkMode
                                                ? "text-white"
                                                : "text-slate-900"
                                            }`}
                                    >
                                        {formatCurrency(outstanding, currency)}
                                    </span>
                                </div>
                            )}
                        </div>
                    )}

                    {/* LOCK MESSAGE */}
                    {paymentState.type === "locked" && (
                        <div
                            className={`mt-3 flex gap-2 rounded-lg border px-3 py-2.5 ${darkMode
                                    ? "border-amber-500/20 bg-amber-500/[0.06]"
                                    : "border-amber-100 bg-amber-50"
                                }`}
                        >
                            <Lock
                                size={13}
                                className={`mt-0.5 shrink-0 ${darkMode
                                        ? "text-amber-300"
                                        : "text-amber-500"
                                    }`}
                            />
                            <p
                                className={`text-[11px] leading-5 ${darkMode
                                        ? "text-amber-300/90"
                                        : "text-amber-700"
                                    }`}
                            >
                                Complete{" "}
                                <strong
                                    className={`font-black ${darkMode
                                            ? "text-amber-200"
                                            : "text-amber-800"
                                        }`}
                                >
                                    {paymentState.previousMilestone?.title ||
                                        "the previous payment milestone"}
                                </strong>{" "}
                                before paying this milestone.
                            </p>
                        </div>
                    )}

                    {/* PAY BUTTON */}
                    {paymentState.type === "payable" && (
                        <button
                            type="button"
                            disabled={isPaying}
                            onClick={() => onPay(milestone)}
                            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/30 transition-all hover:-translate-y-0.5 hover:shadow-cyan-500/50 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                        >
                            {isPaying ? (
                                <>
                                    <Loader2
                                        size={15}
                                        className="animate-spin"
                                    />
                                    Preparing payment…
                                </>
                            ) : (
                                <>
                                    <CreditCard size={15} />
                                    Pay {formatCurrency(outstanding, currency)}
                                </>
                            )}
                        </button>
                    )}

                    {/* PAID BADGE */}
                    {paymentState.type === "paid" && (
                        <div
                            className={`mt-4 flex items-center gap-2 rounded-xl border px-3 py-2.5 ${darkMode
                                    ? "border-emerald-500/20 bg-emerald-500/[0.06]"
                                    : "border-emerald-100 bg-emerald-50"
                                }`}
                        >
                            <CheckCircle2
                                size={15}
                                className={
                                    darkMode
                                        ? "text-emerald-300"
                                        : "text-emerald-600"
                                }
                            />
                            <span
                                className={`text-[11px] font-black ${darkMode
                                        ? "text-emerald-300"
                                        : "text-emerald-700"
                                    }`}
                            >
                                This milestone has been paid
                            </span>
                        </div>
                    )}

                    {/* NOT REQUIRED */}
                    {paymentState.type === "not_required" && (
                        <div
                            className={`mt-4 rounded-xl border px-3 py-2.5 ${darkMode
                                    ? "border-white/[0.06] bg-white/[0.02]"
                                    : "border-slate-100 bg-slate-50"
                                }`}
                        >
                            <span
                                className={`text-[11px] ${darkMode
                                        ? "text-slate-500"
                                        : "text-slate-500"
                                    }`}
                            >
                                No payment is required for this milestone.
                            </span>
                        </div>
                    )}

                    {/* CANCELLED */}
                    {paymentState.type === "cancelled" && (
                        <div
                            className={`mt-4 rounded-xl border px-3 py-2.5 ${darkMode
                                    ? "border-red-500/20 bg-red-500/[0.06]"
                                    : "border-red-100 bg-red-50"
                                }`}
                        >
                            <span
                                className={`text-[11px] font-black ${darkMode
                                        ? "text-red-300"
                                        : "text-red-600"
                                    }`}
                            >
                                This milestone has been cancelled
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}


/* ============================================================
   PAYMENT MINI STAT
============================================================ */

function PaymentMiniStat({ label, value, tone = "default", darkMode }) {
    const tones = {
        default: darkMode
            ? "border-white/[0.06] bg-white/[0.02] text-slate-200"
            : "border-slate-100 bg-slate-50 text-slate-800",
        positive: darkMode
            ? "border-emerald-500/20 bg-emerald-500/[0.06] text-emerald-300"
            : "border-emerald-100 bg-emerald-50 text-emerald-700",
        emphasis: darkMode
            ? "border-cyan-500/20 bg-cyan-500/[0.06] text-cyan-300"
            : "border-cyan-100 bg-cyan-50 text-cyan-700",
    };

    return (
        <div
            className={`min-w-0 rounded-xl border px-3 py-2.5 ${tones[tone] || tones.default}`}
        >
            <p
                className={`text-[9px] font-black uppercase tracking-wider ${darkMode ? "text-slate-500" : "text-slate-400"
                    }`}
            >
                {label}
            </p>
            <p className="mt-1 truncate text-xs font-black">{value}</p>
        </div>
    );
}


/* ============================================================
   PAYMENT STATUS BADGE
============================================================ */

function PaymentStatusBadge({ type, label, darkMode }) {
    const classes = {
        paid: darkMode
            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
            : "border-emerald-200 bg-emerald-50 text-emerald-700",
        payable: darkMode
            ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-300"
            : "border-cyan-200 bg-cyan-50 text-cyan-700",
        locked: darkMode
            ? "border-slate-700 bg-slate-800/60 text-slate-400"
            : "border-slate-200 bg-slate-100 text-slate-500",
        cancelled: darkMode
            ? "border-red-500/30 bg-red-500/10 text-red-300"
            : "border-red-200 bg-red-50 text-red-700",
        not_required: darkMode
            ? "border-slate-700 bg-slate-800/60 text-slate-400"
            : "border-slate-200 bg-slate-50 text-slate-500",
    };

    return (
        <span
            className={`shrink-0 rounded-md border px-2 py-0.5 text-[9px] font-black uppercase tracking-wider ${classes[type] || classes.not_required
                }`}
        >
            {label}
        </span>
    );
}


/* ============================================================
   TRACKING TIMELINE ROW
============================================================ */

function TrackingTimelineRow({
    update,
    trackingReference,
    isLatest,
    isLast,
    darkMode,
}) {
    const label = getTrackingLabel(update.status, update.status_label);
    const theme = trackingTheme(update.status, darkMode);

    return (
        <li className="relative flex gap-4">
            {!isLast && (
                <span
                    className={`absolute left-[7px] top-5 h-full w-px ${darkMode ? "bg-white/[0.06]" : "bg-slate-200"
                        }`}
                    aria-hidden="true"
                />
            )}

            <span
                className={`relative z-10 mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full ring-4 ${theme.dot} ${darkMode ? "ring-[#020611]" : "ring-white"
                    }`}
                aria-hidden="true"
            />

            <div className="min-w-0 flex-1 pb-1">
                <div className="flex flex-wrap items-center gap-2">
                    <span
                        className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${theme.chip}`}
                    >
                        <span className={`h-1.5 w-1.5 rounded-full ${theme.dot}`} />
                        {label}
                    </span>

                    {isLatest && (
                        <span
                            className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-black uppercase tracking-wider ${darkMode
                                    ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-300"
                                    : "border-cyan-200 bg-cyan-50 text-cyan-700"
                                }`}
                        >
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-500" />
                            </span>
                            Latest
                        </span>
                    )}
                </div>

                {update.title && (
                    <h3
                        className={`mt-2 text-sm font-black ${darkMode ? "text-white" : "text-slate-900"
                            }`}
                    >
                        {update.title}
                    </h3>
                )}

                {update.description && (
                    <p
                        className={`mt-1 whitespace-pre-line text-sm leading-6 ${darkMode ? "text-slate-400" : "text-slate-600"
                            }`}
                    >
                        {update.description}
                    </p>
                )}

                <div
                    className={`mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-bold ${darkMode ? "text-slate-500" : "text-slate-400"
                        }`}
                >
                    <span className="inline-flex items-center gap-1">
                        <Clock3 size={10} />
                        {formatDateTime(update.created_at)}
                    </span>

                    {update.location && (
                        <span className="inline-flex items-center gap-1">
                            <MapPin size={10} />
                            {update.location}
                        </span>
                    )}

                    {trackingReference && (
                        <span className="inline-flex items-center gap-1 font-mono">
                            <Hash size={10} />
                            {trackingReference}
                        </span>
                    )}

                    {update.updated_by && (
                        <span className="inline-flex items-center gap-1">
                            <Users size={10} />
                            {update.updated_by}
                        </span>
                    )}
                </div>
            </div>
        </li>
    );
}


/* ============================================================
   PROCUREMENT ITEM
============================================================ */

function ProcurementItem({ item, currency, darkMode }) {
    const specifications = getItemSpecifications(item.specifications);
    const included = item.included !== false && Number(item.quantity) > 0;

    return (
        <div
            className={`p-5 sm:p-6 ${included ? "" : "opacity-60"}`}
        >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                        {item.category && (
                            <span
                                className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[9px] font-black uppercase tracking-wider ${darkMode
                                        ? "border-white/[0.08] bg-white/[0.04] text-slate-400"
                                        : "border-slate-200 bg-slate-50 text-slate-500"
                                    }`}
                            >
                                <Tag size={9} />
                                {item.category}
                            </span>
                        )}

                        {!included && (
                            <span
                                className={`rounded-md border px-2 py-0.5 text-[9px] font-black uppercase tracking-wider ${darkMode
                                        ? "border-red-500/20 bg-red-500/10 text-red-300"
                                        : "border-red-200 bg-red-50 text-red-600"
                                    }`}
                            >
                                Excluded
                            </span>
                        )}
                    </div>

                    <h3
                        className={`mt-2 text-base font-black ${darkMode ? "text-white" : "text-slate-900"
                            }`}
                    >
                        {item.name || "Unnamed item"}
                    </h3>

                    {(item.brand || item.model) && (
                        <p
                            className={`mt-1 text-sm font-bold ${darkMode ? "text-slate-500" : "text-slate-500"
                                }`}
                        >
                            {[item.brand, item.model].filter(Boolean).join(" • ")}
                        </p>
                    )}

                    {item.description && (
                        <p
                            className={`mt-3 text-sm leading-6 ${darkMode ? "text-slate-400" : "text-slate-600"
                                }`}
                        >
                            {item.description}
                        </p>
                    )}
                </div>

                <div className="shrink-0 sm:text-right">
                    <p
                        className={`text-[10px] font-black uppercase tracking-wider ${darkMode ? "text-slate-500" : "text-slate-400"
                            }`}
                    >
                        Item total
                    </p>
                    <p
                        className={`mt-1 text-lg font-black ${darkMode ? "text-white" : "text-slate-900"
                            }`}
                    >
                        {formatCurrency(item.total_price, currency)}
                    </p>
                </div>
            </div>

            {/* QUANTITY / PRICE GRID */}
            <div
                className={`mt-5 grid gap-3 rounded-xl border p-4 sm:grid-cols-3 ${darkMode
                        ? "border-white/[0.06] bg-white/[0.02]"
                        : "border-slate-100 bg-slate-50"
                    }`}
            >
                <InfoBlock
                    label="Quantity"
                    value={item.quantity ?? "—"}
                    darkMode={darkMode}
                />
                <InfoBlock
                    label="Unit price"
                    value={formatCurrency(item.unit_price, currency)}
                    darkMode={darkMode}
                />
                <InfoBlock
                    label="Total"
                    value={formatCurrency(item.total_price, currency)}
                    darkMode={darkMode}
                    emphasis
                />
            </div>

            {/* SPECIFICATIONS */}
            {specifications.length > 0 && (
                <div className="mt-5">
                    <p
                        className={`mb-3 text-[10px] font-black uppercase tracking-wider ${darkMode ? "text-slate-500" : "text-slate-400"
                            }`}
                    >
                        Specifications
                    </p>

                    <div className="grid gap-2 sm:grid-cols-2">
                        {specifications.map((specification, index) => {
                            if (Array.isArray(specification)) {
                                return (
                                    <div
                                        key={index}
                                        className={`rounded-lg border px-3 py-2 ${darkMode
                                                ? "border-white/[0.06] bg-white/[0.02]"
                                                : "border-slate-100 bg-white"
                                            }`}
                                    >
                                        <span
                                            className={`text-[10px] font-black uppercase tracking-wider ${darkMode
                                                    ? "text-slate-500"
                                                    : "text-slate-400"
                                                }`}
                                        >
                                            {specification[0]}
                                        </span>
                                        <p
                                            className={`mt-0.5 text-sm font-bold ${darkMode
                                                    ? "text-slate-300"
                                                    : "text-slate-700"
                                                }`}
                                        >
                                            {typeof specification[1] === "object"
                                                ? JSON.stringify(specification[1])
                                                : String(specification[1])}
                                        </p>
                                    </div>
                                );
                            }

                            return (
                                <div
                                    key={index}
                                    className={`rounded-lg border px-3 py-2 text-sm ${darkMode
                                            ? "border-white/[0.06] bg-white/[0.02] text-slate-300"
                                            : "border-slate-100 bg-white text-slate-700"
                                        }`}
                                >
                                    {specification}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}


/* ============================================================
   CHIPS
============================================================ */

function StatusChip({ status, darkMode }) {
    const theme = statusTheme(status, darkMode);
    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${theme.chip}`}
        >
            <span className={`h-1.5 w-1.5 rounded-full ${theme.dot}`} />
            {getStatusLabel(status)}
        </span>
    );
}

function TrackingChip({ status, label, darkMode }) {
    const theme = trackingTheme(status, darkMode);
    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${theme.chip}`}
        >
            <span className={`h-1.5 w-1.5 rounded-full ${theme.dot}`} />
            {label}
        </span>
    );
}


/* ============================================================
   INFO BLOCKS
============================================================ */

function InfoTile({ icon: Icon, label, value, darkMode }) {
    return (
        <div
            className={`rounded-xl border p-3.5 ${darkMode
                    ? "border-white/[0.06] bg-white/[0.02]"
                    : "border-slate-100 bg-white/70"
                }`}
        >
            <div className="flex items-center gap-1.5">
                <Icon
                    size={11}
                    className={darkMode ? "text-cyan-400" : "text-cyan-600"}
                />
                <p
                    className={`text-[9px] font-black uppercase tracking-wider ${darkMode ? "text-slate-500" : "text-slate-400"
                        }`}
                >
                    {label}
                </p>
            </div>
            <p
                className={`mt-1.5 truncate text-sm font-black ${darkMode ? "text-white" : "text-slate-900"
                    }`}
            >
                {value}
            </p>
        </div>
    );
}

function InfoBlock({ label, value, darkMode, emphasis = false }) {
    return (
        <div>
            <p
                className={`text-[10px] font-black uppercase tracking-wider ${darkMode ? "text-slate-500" : "text-slate-400"
                    }`}
            >
                {label}
            </p>
            <p
                className={`mt-1 text-sm font-black ${emphasis
                        ? "text-cyan-400"
                        : darkMode
                            ? "text-slate-200"
                            : "text-slate-700"
                    }`}
            >
                {value}
            </p>
        </div>
    );
}

function InfoSection({ label, value, darkMode }) {
    return (
        <div>
            <p
                className={`text-[10px] font-black uppercase tracking-wider ${darkMode ? "text-slate-500" : "text-slate-400"
                    }`}
            >
                {label}
            </p>
            <p
                className={`mt-2 whitespace-pre-line text-sm leading-7 ${darkMode ? "text-slate-400" : "text-slate-600"
                    }`}
            >
                {value}
            </p>
        </div>
    );
}

function PriceRow({ label, value, darkMode }) {
    return (
        <div className="flex items-center justify-between gap-4">
            <span
                className={`text-xs font-bold uppercase tracking-wider ${darkMode ? "text-slate-500" : "text-slate-400"
                    }`}
            >
                {label}
            </span>
            <span
                className={`text-sm font-bold ${darkMode ? "text-slate-200" : "text-slate-700"
                    }`}
            >
                {value}
            </span>
        </div>
    );
}


/* ============================================================
   TIMELINE
============================================================ */

function TimelineItem({ label, date, active, isLast, darkMode }) {
    return (
        <div className="relative flex gap-3">
            <div className="relative flex flex-col items-center">
                <span
                    className={`mt-0.5 h-3 w-3 shrink-0 rounded-full ring-4 ${active
                            ? "bg-gradient-to-br from-cyan-400 to-indigo-500"
                            : darkMode
                                ? "bg-slate-700"
                                : "bg-slate-200"
                        } ${darkMode ? "ring-[#020611]" : "ring-white"}`}
                />
                {!isLast && (
                    <span
                        className={`mt-1 w-px flex-1 ${active
                                ? "bg-gradient-to-b from-cyan-500/50 to-indigo-500/20"
                                : darkMode
                                    ? "bg-white/[0.06]"
                                    : "bg-slate-200"
                            }`}
                        style={{ minHeight: "24px" }}
                    />
                )}
            </div>

            <div className="min-w-0 flex-1 pb-3">
                <p
                    className={`text-xs font-black ${active
                            ? darkMode
                                ? "text-white"
                                : "text-slate-800"
                            : darkMode
                                ? "text-slate-500"
                                : "text-slate-400"
                        }`}
                >
                    {label}
                </p>
                <p
                    className={`mt-0.5 text-[10px] font-bold ${darkMode ? "text-slate-500" : "text-slate-400"
                        }`}
                >
                    {active ? formatDateTime(date) : "Not yet"}
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
            <div className="flex items-center justify-between">
                {block("h-8 w-24")}
                {block("h-8 w-24")}
            </div>

            {block("h-64")}

            <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
                <div className="space-y-6">
                    {block("h-96")}
                    {block("h-64")}
                    {block("h-72")}
                </div>
                <div className="space-y-6">
                    {block("h-96")}
                    {block("h-64")}
                    {block("h-56")}
                </div>
            </div>
        </div>
    );
}