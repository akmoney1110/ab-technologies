import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
    AlertCircle,
    ArrowLeft,
    CheckCircle2,
    CircleDollarSign,
    Clock3,
    Loader2,
    RefreshCw,
    ShieldCheck,
} from "lucide-react";

const API_URL =
    import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const VERIFY_DELAY = 900;

export default function PaymentCallback() {
    const [params] = useSearchParams();
    const navigate = useNavigate();

    const [state, setState] = useState("verifying");
    const [message, setMessage] = useState("");
    const [payment, setPayment] = useState(null);
    const [retrying, setRetrying] = useState(false);

    const reference = useMemo(
        () =>
            params.get("reference") ||
            params.get("trxref") ||
            sessionStorage.getItem("payment_reference"),
        [params]
    );

    const publicToken = useMemo(
        () =>
            params.get("public_token") ||
            sessionStorage.getItem("payment_proposal_token"),
        [params]
    );

    const returnTo =
        sessionStorage.getItem("payment_return_to") ||
        "/portal/projects";

    const token = localStorage.getItem("access_token");

    useEffect(() => {
        let cancelled = false;

        async function verifyPayment() {
            if (!reference || !token || !publicToken) {
                if (!cancelled) {
                    setState("failed");
                    setMessage(
                        !reference
                            ? "We couldn't find the payment reference."
                            : !token
                                ? "Your session has expired. Please sign in again."
                                : "We couldn't identify the proposal connected to this payment."
                    );
                }
                return;
            }

            try {
                setState("verifying");
                setMessage("");

                console.log("[Callback] payment verification:", {
                    reference,
                    publicToken,
                    returnTo,
                });

                const url =
                    `${API_URL}/api/payments/client/` +
                    `${publicToken}/payments/verify/` +
                    `?reference=${encodeURIComponent(reference)}`;

                console.log("[Callback] verifying at:", url);

                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                });

                const data = await response.json().catch(() => ({}));

                console.log(
                    "[Callback] verify response:",
                    response.status,
                    data
                );

                if (cancelled) return;

                if (!response.ok) {
                    throw new Error(
                        data?.error ||
                        data?.detail ||
                        "We couldn't confirm your payment."
                    );
                }

                setPayment(data?.payment || null);

                if (
                    data?.success === true &&
                    data?.status === "successful"
                ) {
                    setState("success");
                    setMessage(
                        "Your payment has been confirmed successfully."
                    );

                    sessionStorage.removeItem(
                        "payment_proposal_token"
                    );
                    sessionStorage.removeItem("payment_return_to");
                    sessionStorage.removeItem("payment_reference");

                    window.setTimeout(() => {
                        if (!cancelled) {
                            navigate(returnTo, {
                                replace: true,
                                state: {
                                    paymentSuccess: true,
                                    paymentReference: reference,
                                },
                            });
                        }
                    }, 1800);

                    return;
                }

                if (
                    data?.status === "pending" ||
                    data?.status === "processing"
                ) {
                    setState("pending");
                    setMessage(
                        "Your payment is still being processed. If your account was charged, you don't need to pay again."
                    );
                    return;
                }

                setState("failed");
                setMessage(
                    data?.error ||
                    `Payment status: ${data?.status || "not confirmed"
                    }.`
                );
            } catch (error) {
                if (cancelled) return;

                console.error("[Callback] verification error:", error);

                setState("failed");
                setMessage(
                    error?.message ||
                    "We couldn't reach the payment server."
                );
            }
        }

        const timer = window.setTimeout(
            verifyPayment,
            VERIFY_DELAY
        );

        return () => {
            cancelled = true;
            window.clearTimeout(timer);
        };
    }, [reference, publicToken, token, navigate, returnTo]);

    const handleRetry = () => {
        if (retrying) return;

        setRetrying(true);

        window.setTimeout(() => {
            window.location.reload();
        }, 300);
    };

    const handleBackToProject = () => {
        navigate(returnTo, {
            replace: true,
        });
    };

    return (
        <div className="min-h-screen bg-[#020611] text-white">
            <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
                {/* Ambient background */}
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute left-1/2 top-1/4 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
                    <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl" />
                </div>

                <div className="relative w-full max-w-lg">
                    {/* Brand / security header */}
                    <div className="mb-6 flex items-center justify-center gap-2 text-xs font-medium text-slate-500">
                        <ShieldCheck
                            size={15}
                            className="text-cyan-400"
                        />
                        <span>Secure payment verification</span>
                    </div>

                    <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 shadow-2xl shadow-black/30 backdrop-blur-xl">
                        {/* Top status area */}
                        <div className="px-6 pb-7 pt-8 text-center sm:px-10">
                            {state === "verifying" && (
                                <VerifyingState />
                            )}

                            {state === "success" && (
                                <SuccessState
                                    message={message}
                                    reference={reference}
                                />
                            )}

                            {state === "pending" && (
                                <PendingState
                                    message={message}
                                    reference={reference}
                                    onRefresh={handleRetry}
                                    retrying={retrying}
                                />
                            )}

                            {state === "failed" && (
                                <FailedState
                                    message={message}
                                    reference={reference}
                                    onRetry={handleRetry}
                                    retrying={retrying}
                                    onBack={handleBackToProject}
                                />
                            )}
                        </div>

                        {/* Payment details */}
                        {reference && (
                            <div className="border-t border-white/10 bg-white/[0.02] px-6 py-5 sm:px-10">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex min-w-0 items-center gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                                            <CircleDollarSign
                                                size={19}
                                                className="text-cyan-400"
                                            />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="text-xs text-slate-500">
                                                Payment reference
                                            </p>

                                            <p className="mt-1 truncate font-mono text-xs font-medium text-slate-300">
                                                {reference}
                                            </p>
                                        </div>
                                    </div>

                                    {payment?.amount && (
                                        <div className="shrink-0 text-right">
                                            <p className="text-xs text-slate-500">
                                                Amount
                                            </p>

                                            <p className="mt-1 text-sm font-semibold text-white">
                                                {payment.currency ||
                                                    "NGN"}{" "}
                                                {formatAmount(
                                                    payment.amount
                                                )}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Bottom actions */}
                        {(state === "success" ||
                            state === "pending") && (
                                <div className="border-t border-white/10 px-6 py-5 sm:px-10">
                                    <button
                                        type="button"
                                        onClick={handleBackToProject}
                                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/[0.08]"
                                    >
                                        <ArrowLeft size={16} />
                                        Back to project
                                    </button>
                                </div>
                            )}
                    </div>

                    <p className="mt-5 text-center text-xs leading-5 text-slate-600">
                        Payment confirmation is handled securely by
                        the AB Technologies payment server.
                    </p>
                </div>
            </div>
        </div>
    );
}

/* ============================================================
   VERIFYING
============================================================ */

function VerifyingState() {
    return (
        <>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/10">
                <Loader2
                    size={36}
                    className="animate-spin text-cyan-400"
                />
            </div>

            <h1 className="mt-6 text-2xl font-bold tracking-tight">
                Confirming your payment
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-400">
                We are securely checking the transaction with the
                payment provider. Please don't close this page.
            </p>

            <div className="mx-auto mt-6 flex max-w-xs items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-1/2 animate-pulse rounded-full bg-cyan-400" />
                </div>
            </div>
        </>
    );
}

/* ============================================================
   SUCCESS
============================================================ */

function SuccessState({ message, reference }) {
    return (
        <>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10">
                <CheckCircle2
                    size={42}
                    className="text-emerald-400"
                />
            </div>

            <div className="mt-6 inline-flex items-center rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                Payment confirmed
            </div>

            <h1 className="mt-4 text-2xl font-bold tracking-tight">
                Payment successful
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-400">
                {message}
            </p>

            <div className="mt-6 rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.04] px-4 py-3 text-left">
                <div className="flex gap-3">
                    <CheckCircle2
                        size={18}
                        className="mt-0.5 shrink-0 text-emerald-400"
                    />

                    <div>
                        <p className="text-sm font-semibold text-slate-200">
                            Your milestone has been updated
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                            Reference{" "}
                            <span className="font-mono text-slate-400">
                                {reference}
                            </span>{" "}
                            has been verified by the server.
                        </p>
                    </div>
                </div>
            </div>

            <p className="mt-5 text-xs text-slate-600">
                Returning to your project shortly…
            </p>
        </>
    );
}

/* ============================================================
   PENDING
============================================================ */

function PendingState({
    message,
    reference,
    onRefresh,
    retrying,
}) {
    return (
        <>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-amber-400/20 bg-amber-400/10">
                <Clock3
                    size={40}
                    className="text-amber-400"
                />
            </div>

            <div className="mt-6 inline-flex items-center rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-300">
                Processing
            </div>

            <h1 className="mt-4 text-2xl font-bold tracking-tight">
                Payment is being processed
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-400">
                {message}
            </p>

            {reference && (
                <p className="mt-4 text-xs text-slate-600">
                    Reference:{" "}
                    <span className="font-mono text-slate-500">
                        {reference}
                    </span>
                </p>
            )}

            <button
                type="button"
                onClick={onRefresh}
                disabled={retrying}
                className="mx-auto mt-6 flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
                <RefreshCw
                    size={16}
                    className={
                        retrying ? "animate-spin" : ""
                    }
                />
                {retrying
                    ? "Checking…"
                    : "Check payment again"}
            </button>
        </>
    );
}

/* ============================================================
   FAILED
============================================================ */

function FailedState({
    message,
    reference,
    onRetry,
    retrying,
    onBack,
}) {
    return (
        <>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-amber-400/20 bg-amber-400/10">
                <AlertCircle
                    size={42}
                    className="text-amber-400"
                />
            </div>

            <div className="mt-6 inline-flex items-center rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-300">
                Verification required
            </div>

            <h1 className="mt-4 text-2xl font-bold tracking-tight">
                Payment not confirmed
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-400">
                {message}
            </p>

            {reference && (
                <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                    <p className="text-[11px] uppercase tracking-wider text-slate-600">
                        Transaction reference
                    </p>

                    <p className="mt-1 break-all font-mono text-xs text-slate-400">
                        {reference}
                    </p>
                </div>
            )}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                    type="button"
                    onClick={onRetry}
                    disabled={retrying}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    <RefreshCw
                        size={16}
                        className={
                            retrying ? "animate-spin" : ""
                        }
                    />
                    {retrying
                        ? "Checking…"
                        : "Try again"}
                </button>

                <button
                    type="button"
                    onClick={onBack}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/[0.08]"
                >
                    <ArrowLeft size={16} />
                    Back to project
                </button>
            </div>
        </>
    );
}

/* ============================================================
   HELPERS
============================================================ */

function formatAmount(value) {
    const numeric = Number(value);

    if (!Number.isFinite(numeric)) {
        return String(value ?? "0");
    }

    return numeric.toLocaleString("en-NG", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}