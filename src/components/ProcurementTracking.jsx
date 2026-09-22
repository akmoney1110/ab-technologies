import {
    useState,
} from "react";

import {
    useNavigate,
} from "react-router-dom";


const API_URL =
    import.meta.env.VITE_API_URL ||
    "http://127.0.0.1:8000";


/* ============================================================
   HELPERS
============================================================ */

function formatDateTime(value) {
    if (!value) {
        return "—";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "—";
    }

    return new Intl.DateTimeFormat(
        undefined,
        {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
        }
    ).format(date);
}


function formatCurrency(
    value,
    currency = "NGN"
) {
    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {
        return "—";
    }

    const amount = Number(value);

    if (Number.isNaN(amount)) {
        return `${currency} ${value}`;
    }

    try {
        return new Intl.NumberFormat(
            undefined,
            {
                style: "currency",
                currency:
                    currency || "NGN",
                maximumFractionDigits: 2,
            }
        ).format(amount);
    } catch {
        return `${currency} ${amount.toLocaleString()}`;
    }
}


function getStatusLabel(status) {
    const value =
        String(status || "")
            .toLowerCase()
            .trim();

    const labels = {
        draft: "Draft",
        priced: "Priced",
        sent: "Sent",
        negotiation: "Negotiation",
        accepted: "Accepted",
        rejected: "Rejected",
        expired: "Expired",
    };

    return (
        labels[value] ||
        status ||
        "Unknown"
    );
}


function getTrackingLabel(
    status,
    fallback
) {
    const value =
        String(status || "")
            .toLowerCase()
            .trim();

    const labels = {
        order_confirmed:
            "Order Confirmed",

        supplier_confirmed:
            "Supplier Confirmed",

        order_placed:
            "Order Placed",

        processing:
            "Processing",

        ready_for_dispatch:
            "Ready for Dispatch",

        dispatched:
            "Dispatched",

        in_transit:
            "In Transit",

        arrived:
            "Arrived",

        delivered:
            "Delivered",

        completed:
            "Completed",

        on_hold:
            "On Hold",

        delayed:
            "Delayed",

        cancelled:
            "Cancelled",
    };

    return (
        labels[value] ||
        fallback ||
        value
            .replace(/_/g, " ")
            .replace(
                /\b\w/g,
                (letter) =>
                    letter.toUpperCase()
            ) ||
        "Update"
    );
}


function getTrackingColor(status) {
    const value =
        String(status || "")
            .toLowerCase()
            .trim();

    if (
        value === "completed" ||
        value === "delivered"
    ) {
        return "bg-emerald-500";
    }

    if (
        value === "cancelled" ||
        value === "delayed"
    ) {
        return "bg-red-500";
    }

    if (
        value === "on_hold"
    ) {
        return "bg-amber-500";
    }

    if (
        value === "dispatched" ||
        value === "in_transit" ||
        value === "ready_for_dispatch"
    ) {
        return "bg-sky-500";
    }

    return "bg-blue-500";
}


/* ============================================================
   PAGE
============================================================ */

export default function ProcurementTracking() {
    const navigate =
        useNavigate();

    const [
        trackingReference,
        setTrackingReference,
    ] = useState("");

    const [
        procurement,
        setProcurement,
    ] = useState(null);

    const [
        loading,
        setLoading,
    ] = useState(false);

    const [
        error,
        setError,
    ] = useState("");


    /* ========================================================
       SEARCH
    ======================================================== */

    async function handleSearch(
        event
    ) {
        event.preventDefault();

        const reference =
            trackingReference
                .trim()
                .toUpperCase();

        if (!reference) {
            setError(
                "Enter your procurement tracking reference."
            );

            return;
        }

        setLoading(true);
        setError("");
        setProcurement(null);

        try {
            const response =
                await fetch(
                    `${API_URL}/api/procurement/track/${encodeURIComponent(
                        reference
                    )}/`,
                    {
                        method: "GET",
                        headers: {
                            Accept:
                                "application/json",
                        },
                    }
                );

            const text =
                await response.text();

            let data = {};

            try {
                data = text
                    ? JSON.parse(text)
                    : {};
            } catch {
                throw new Error(
                    "The server returned an invalid response."
                );
            }

            if (!response.ok) {
                throw new Error(
                    data?.error ||
                    data?.detail ||
                    "Procurement tracking reference not found."
                );
            }

            if (
                data.success === false
            ) {
                throw new Error(
                    data.error ||
                    "Procurement tracking reference not found."
                );
            }

            setProcurement(
                data.procurement ||
                null
            );

        } catch (err) {
            console.error(
                "Procurement tracking error:",
                err
            );

            setError(
                err?.message ||
                "Unable to find this procurement."
            );
        } finally {
            setLoading(false);
        }
    }


    /* ========================================================
       EMPTY / SEARCH SCREEN
    ======================================================== */

    if (!procurement) {
        return (
            <div className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">

                <div className="mx-auto max-w-2xl">

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/")
                        }
                        className="text-sm font-medium text-slate-500 hover:text-slate-900"
                    >
                        ← Back to Home
                    </button>


                    <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10">

                        <div className="mx-auto max-w-xl text-center">

                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">

                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className="h-8 w-8"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                >
                                    <path d="M3 7h18" />
                                    <path d="M5 7v12h14V7" />
                                    <path d="M8 7V4h8v3" />
                                    <path d="M8 12h8" />
                                    <path d="M8 16h5" />
                                </svg>

                            </div>


                            <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900">
                                Track your procurement
                            </h1>


                            <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
                                Enter the tracking reference provided
                                by AB Technologies to view the current
                                status and procurement history.
                            </p>


                            <form
                                onSubmit={
                                    handleSearch
                                }
                                className="mt-8"
                            >

                                <label
                                    htmlFor="tracking-reference"
                                    className="block text-left text-sm font-semibold text-slate-700"
                                >
                                    Tracking reference
                                </label>


                                <div className="mt-2 flex flex-col gap-3 sm:flex-row">

                                    <input
                                        id="tracking-reference"
                                        type="text"
                                        value={
                                            trackingReference
                                        }
                                        onChange={(
                                            event
                                        ) =>
                                            setTrackingReference(
                                                event
                                                    .target
                                                    .value
                                                    .toUpperCase()
                                            )
                                        }
                                        placeholder="AB-TRK-7F3A91C2D8"
                                        autoComplete="off"
                                        spellCheck="false"
                                        className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium tracking-wide text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                                    />


                                    <button
                                        type="submit"
                                        disabled={
                                            loading
                                        }
                                        className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {loading
                                            ? "Searching..."
                                            : "Track Procurement"}
                                    </button>

                                </div>


                                {error && (
                                    <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-left text-sm text-red-700">
                                        {error}
                                    </div>
                                )}

                            </form>


                            <div className="mt-8 rounded-2xl bg-slate-50 p-5 text-left">

                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                    Where to find your reference
                                </p>

                                <p className="mt-2 text-sm leading-6 text-slate-600">
                                    Your tracking reference is provided
                                    with your procurement quotation.
                                    It looks like:
                                </p>

                                <code className="mt-3 block rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold tracking-wider text-slate-700">
                                    AB-TRK-7F3A91C2D8
                                </code>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        );
    }


    /* ========================================================
       DERIVED
    ======================================================== */

    const tracking =
        procurement.tracking || [];

    const latestTracking =
        procurement.latest_tracking ||
        tracking[0] ||
        null;

    const currentStatus =
        procurement.current_tracking_status ||
        latestTracking?.status ||
        null;

    const currentStatusLabel =
        procurement.current_tracking_status_label ||
        latestTracking?.status_label ||
        getStatusLabel(
            procurement.status
        );


    /* ========================================================
       RESULT
    ======================================================== */

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">

            <div className="mx-auto max-w-6xl">

                <div className="flex flex-wrap items-center justify-between gap-4">

                    <button
                        type="button"
                        onClick={() => {
                            setProcurement(
                                null
                            );
                            setError("");
                        }}
                        className="text-sm font-medium text-slate-500 hover:text-slate-900"
                    >
                        ← Track another procurement
                    </button>

                </div>


                {/* HEADER */}

                <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

                        <div>

                            <div className="flex flex-wrap items-center gap-2">

                                <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                                    Procurement Tracking
                                </span>

                                {currentStatus && (
                                    <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                                        {currentStatusLabel}
                                    </span>
                                )}

                            </div>


                            <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                                {procurement.title}
                            </h1>


                            <div className="mt-4">

                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                    Tracking Reference
                                </p>

                                <p className="mt-1 font-mono text-lg font-bold tracking-wider text-slate-800">
                                    {
                                        procurement.tracking_reference
                                    }
                                </p>

                            </div>

                        </div>


                        <div className="lg:text-right">

                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                Procurement Value
                            </p>

                            <p className="mt-1 text-2xl font-bold text-slate-900">
                                {formatCurrency(
                                    procurement.total,
                                    procurement.currency
                                )}
                            </p>

                        </div>

                    </div>


                    <div className="mt-7 grid gap-5 border-t border-slate-100 pt-6 sm:grid-cols-2 lg:grid-cols-4">

                        <Info
                            label="Status"
                            value={
                                currentStatusLabel
                            }
                        />

                        <Info
                            label="Items"
                            value={
                                procurement.item_count
                            }
                        />

                        <Info
                            label="Quantity"
                            value={
                                procurement.total_quantity
                            }
                        />

                        <Info
                            label="Last Updated"
                            value={
                                formatDateTime(
                                    procurement.updated_at
                                )
                            }
                        />

                    </div>

                </section>


                {/* CURRENT STATUS */}

                <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

                    <div className="flex items-start gap-4">

                        <span
                            className={`mt-1.5 h-4 w-4 shrink-0 rounded-full ${getTrackingColor(
                                currentStatus
                            )}`}
                        />

                        <div>

                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                Current status
                            </p>

                            <h2 className="mt-1 text-xl font-bold text-slate-900">
                                {currentStatusLabel}
                            </h2>

                            {latestTracking && (
                                <>
                                    {latestTracking.title && (
                                        <p className="mt-2 text-sm font-semibold text-slate-700">
                                            {
                                                latestTracking.title
                                            }
                                        </p>
                                    )}

                                    {latestTracking.description && (
                                        <p className="mt-1 text-sm leading-6 text-slate-500">
                                            {
                                                latestTracking.description
                                            }
                                        </p>
                                    )}

                                    <p className="mt-3 text-xs text-slate-400">
                                        {formatDateTime(
                                            latestTracking.created_at
                                        )}

                                        {latestTracking.location
                                            ? ` • ${latestTracking.location}`
                                            : ""}
                                    </p>
                                </>
                            )}

                        </div>

                    </div>

                </section>


                {/* TRACKING HISTORY */}

                <section className="mt-6 rounded-3xl border border-slate-200 bg-white shadow-sm">

                    <div className="border-b border-slate-100 p-6 sm:p-8">

                        <h2 className="text-xl font-bold text-slate-900">
                            Procurement tracking
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Complete history of updates for this procurement.
                        </p>

                    </div>


                    {tracking.length === 0 ? (
                        <div className="p-10 text-center">

                            <p className="font-medium text-slate-700">
                                No tracking updates yet
                            </p>

                            <p className="mt-1 text-sm text-slate-500">
                                Updates will appear here as the procurement progresses.
                            </p>

                        </div>
                    ) : (
                        <div className="p-6 sm:p-8">

                            <ol className="relative">

                                {tracking.map(
                                    (
                                        update,
                                        index
                                    ) => (
                                        <TrackingRow
                                            key={
                                                update.id ||
                                                index
                                            }
                                            update={
                                                update
                                            }
                                            isLatest={
                                                index ===
                                                0
                                            }
                                            isLast={
                                                index ===
                                                tracking.length -
                                                1
                                            }
                                        />
                                    )
                                )}

                            </ol>

                        </div>
                    )}

                </section>


                {/* ITEMS */}

                <section className="mt-6 rounded-3xl border border-slate-200 bg-white shadow-sm">

                    <div className="border-b border-slate-100 p-6 sm:p-8">

                        <h2 className="text-xl font-bold text-slate-900">
                            Procurement items
                        </h2>

                    </div>


                    <div className="divide-y divide-slate-100">

                        {procurement.items.map(
                            (item) => (
                                <div
                                    key={
                                        item.id
                                    }
                                    className="p-6 sm:p-8"
                                >

                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                                        <div>

                                            <p className="text-base font-semibold text-slate-900">
                                                {item.name ||
                                                    "Unnamed item"}
                                            </p>

                                            {(item.brand ||
                                                item.model) && (
                                                    <p className="mt-1 text-sm text-slate-500">
                                                        {[
                                                            item.brand,
                                                            item.model,
                                                        ]
                                                            .filter(
                                                                Boolean
                                                            )
                                                            .join(
                                                                " • "
                                                            )}
                                                    </p>
                                                )}

                                        </div>


                                        <div className="sm:text-right">

                                            <p className="text-xs uppercase tracking-wide text-slate-400">
                                                Quantity
                                            </p>

                                            <p className="mt-1 font-semibold text-slate-800">
                                                {
                                                    item.quantity
                                                }
                                            </p>

                                        </div>

                                    </div>

                                </div>
                            )
                        )}

                    </div>

                </section>

            </div>

        </div>
    );
}


/* ============================================================
   TRACKING ROW
============================================================ */

function TrackingRow({
    update,
    isLatest,
    isLast,
}) {
    const label =
        getTrackingLabel(
            update.status,
            update.status_label
        );

    return (
        <li className="relative flex gap-4 pb-8 last:pb-0">

            {!isLast && (
                <span
                    className="absolute left-[7px] top-5 h-full w-px bg-slate-200"
                    aria-hidden="true"
                />
            )}

            <span
                className={`relative z-10 mt-1 h-4 w-4 shrink-0 rounded-full ring-4 ring-white ${getTrackingColor(
                    update.status
                )}`}
            />

            <div className="min-w-0 flex-1">

                <div className="flex flex-wrap items-center gap-2">

                    <span className="text-sm font-bold text-slate-900">
                        {label}
                    </span>

                    {isLatest && (
                        <span className="rounded-md bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700">
                            Current
                        </span>
                    )}

                </div>


                {update.title && (
                    <h3 className="mt-2 text-sm font-semibold text-slate-800">
                        {update.title}
                    </h3>
                )}


                {update.description && (
                    <p className="mt-1 text-sm leading-6 text-slate-500">
                        {update.description}
                    </p>
                )}


                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">

                    <span>
                        {formatDateTime(
                            update.created_at
                        )}
                    </span>

                    {update.location && (
                        <span>
                            {update.location}
                        </span>
                    )}

                </div>

            </div>

        </li>
    );
}


/* ============================================================
   INFO
============================================================ */

function Info({
    label,
    value,
}) {
    return (
        <div>

            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                {label}
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-700">
                {value || "—"}
            </p>

        </div>
    );
}