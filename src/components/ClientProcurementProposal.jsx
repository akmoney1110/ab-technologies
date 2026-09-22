import React, {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    AlertCircle,
    ArrowLeft,
    BadgeCheck,
    Building2,
    Calculator,
    Check,
    ChevronDown,
    ChevronUp,
    Clock3,
    FileText,
    Info,
    Loader2,
    Minus,
    Package,
    Pencil,
    Plus,
    RefreshCw,
    RotateCcw,
    Send,
    ShoppingCart,
    Trash2,
    Truck,
    WalletCards,
    X,
} from "lucide-react";


// ============================================================
// CONFIG
// ============================================================

const API_URL =
    import.meta.env.VITE_API_URL ||
    "http://127.0.0.1:8000";


// ============================================================
// HELPERS
// ============================================================

function getToken() {
    return (
        localStorage.getItem("access_token") ||
        localStorage.getItem("token") ||
        localStorage.getItem("access") ||
        ""
    );
}


function formatMoney(
    value,
    currency = "NGN"
) {
    const number = Number(value || 0);

    return `${currency} ${number.toLocaleString(
        undefined,
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }
    )}`;
}


function formatNumber(value) {
    return Number(value || 0).toLocaleString();
}


function formatDate(value) {
    if (!value) return "—";

    try {
        return new Date(value).toLocaleDateString(
            undefined,
            {
                year: "numeric",
                month: "long",
                day: "numeric",
            }
        );
    } catch {
        return "—";
    }
}


function getStatusLabel(status) {
    const labels = {
        draft: "Draft",
        submitted: "Submitted",
        reviewed: "Reviewed",
        countered: "Counter Offer",
        accepted: "Accepted",
        rejected: "Rejected",
    };

    return labels[status] || status || "Unknown";
}


function getStatusClasses(status) {
    switch (status) {
        case "accepted":
            return "bg-emerald-50 text-emerald-700 ring-emerald-200";

        case "submitted":
            return "bg-blue-50 text-blue-700 ring-blue-200";

        case "reviewed":
            return "bg-violet-50 text-violet-700 ring-violet-200";

        case "countered":
            return "bg-amber-50 text-amber-700 ring-amber-200";

        case "rejected":
            return "bg-red-50 text-red-700 ring-red-200";

        default:
            return "bg-slate-100 text-slate-700 ring-slate-200";
    }
}


function isEditableStatus(status) {
    return status === "draft";
}


function getEffectivePrice(item) {
    if (
        item?.approved_unit_price !== null &&
        item?.approved_unit_price !== undefined
    ) {
        return Number(item.approved_unit_price);
    }

    if (
        item?.proposed_unit_price !== null &&
        item?.proposed_unit_price !== undefined
    ) {
        return Number(item.proposed_unit_price);
    }

    return Number(item?.quoted_unit_price || 0);
}


function getDisplayPrice(item) {
    if (
        item?.proposed_unit_price !== null &&
        item?.proposed_unit_price !== undefined
    ) {
        return Number(item.proposed_unit_price);
    }

    if (
        item?.approved_unit_price !== null &&
        item?.approved_unit_price !== undefined
    ) {
        return Number(item.approved_unit_price);
    }

    return Number(item?.quoted_unit_price || 0);
}


function hasPriceChange(item) {
    if (
        item?.proposed_unit_price === null ||
        item?.proposed_unit_price === undefined
    ) {
        return false;
    }

    return (
        Number(item.proposed_unit_price) !==
        Number(item.quoted_unit_price)
    );
}


// ============================================================
// API
// ============================================================

async function apiRequest(
    endpoint,
    options = {}
) {
    const token = getToken();

    const response = await fetch(
        `${API_URL.replace(/\/$/, "")}${endpoint}`,
        {
            ...options,
            headers: {
                ...(options.body
                    ? {
                        "Content-Type":
                            "application/json",
                    }
                    : {}),
                ...(token
                    ? {
                        Authorization:
                            `Bearer ${token}`,
                    }
                    : {}),
                ...(options.headers || {}),
            },
        }
    );

    let data = null;

    try {
        data = await response.json();
    } catch {
        data = null;
    }

    if (!response.ok) {
        const message =
            data?.detail ||
            data?.message ||
            data?.error ||
            "Something went wrong.";

        throw new Error(message);
    }

    return data;
}


// ============================================================
// SMALL UI COMPONENTS
// ============================================================

function StatusBadge({ status }) {
    return (
        <span
            className={`
                inline-flex items-center gap-1.5
                rounded-full px-3 py-1.5
                text-xs font-semibold
                ring-1 ring-inset
                ${getStatusClasses(status)}
            `}
        >
            {status === "accepted" ? (
                <BadgeCheck size={14} />
            ) : status === "submitted" ? (
                <Send size={13} />
            ) : status === "countered" ? (
                <RefreshCw size={13} />
            ) : (
                <Clock3 size={13} />
            )}

            {getStatusLabel(status)}
        </span>
    );
}


function SectionHeader({
    icon: Icon,
    title,
    description,
}) {
    return (
        <div className="mb-6 flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                <Icon size={19} />
            </div>

            <div>
                <h2 className="text-base font-bold text-slate-950">
                    {title}
                </h2>

                {description && (
                    <p className="mt-1 text-sm leading-6 text-slate-500">
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
}


function InfoRow({
    label,
    value,
}) {
    return (
        <div className="flex items-start justify-between gap-5 border-b border-slate-100 py-3 last:border-0">
            <span className="text-sm text-slate-500">
                {label}
            </span>

            <span className="text-right text-sm font-semibold text-slate-900">
                {value || "—"}
            </span>
        </div>
    );
}


function PriceChangeBadge({ item }) {
    if (!hasPriceChange(item)) {
        return null;
    }

    const original = Number(
        item.quoted_unit_price || 0
    );

    const proposed = Number(
        item.proposed_unit_price || 0
    );

    const difference = proposed - original;

    return (
        <span
            className={`
                inline-flex items-center rounded-full
                px-2 py-1 text-[11px] font-semibold
                ${difference < 0
                    ? "bg-emerald-50 text-emerald-700"
                    : difference > 0
                        ? "bg-amber-50 text-amber-700"
                        : "bg-slate-100 text-slate-600"
                }
            `}
        >
            {difference < 0
                ? "Below quoted price"
                : difference > 0
                    ? "Above quoted price"
                    : "Same price"}
        </span>
    );
}


// ============================================================
// MAIN COMPONENT
// ============================================================

export default function ClientProcurementProposal({
    quoteId,
    onBack,
}) {
    const [revision, setRevision] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [submitting, setSubmitting] =
        useState(false);

    const [accepting, setAccepting] =
        useState(false);

    const [error, setError] =
        useState("");

    const [successMessage, setSuccessMessage] =
        useState("");

    const [editing, setEditing] =
        useState(false);

    const [expandedItems, setExpandedItems] =
        useState({});

    const [confirmAction, setConfirmAction] =
        useState(null);

    const [draftItems, setDraftItems] =
        useState([]);

    const [clientNotes, setClientNotes] =
        useState("");

    const [financials, setFinancials] =
        useState({
            discount: "0.00",
            tax: "0.00",
            delivery_fee: "0.00",
        });


    // ========================================================
    // LOAD
    // ========================================================

    const loadRevision = useCallback(
        async () => {
            if (!quoteId) {
                setError(
                    "No procurement quotation was provided."
                );
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError("");

                const data =
                    await apiRequest(
                        `/api/crm/procurement/${quoteId}/`
                    );

                setRevision(data);

                setDraftItems(
                    (data?.items || []).map(
                        (item) => ({
                            ...item,
                            quantity:
                                Number(
                                    item.quantity || 1
                                ),
                            proposed_unit_price:
                                item.proposed_unit_price ??
                                null,
                            removed:
                                Boolean(
                                    item.removed
                                ),
                            client_notes:
                                item.client_notes ||
                                "",
                        })
                    )
                );

                setClientNotes(
                    data?.client_notes || ""
                );

                setFinancials({
                    discount:
                        data?.discount ??
                        "0.00",
                    tax:
                        data?.tax ??
                        "0.00",
                    delivery_fee:
                        data?.delivery_fee ??
                        "0.00",
                });
            } catch (err) {
                console.error(
                    "CLIENT PROCUREMENT LOAD ERROR:",
                    err
                );

                setError(
                    err.message ||
                    "Unable to load procurement quotation."
                );
            } finally {
                setLoading(false);
            }
        },
        [quoteId]
    );


    useEffect(() => {
        loadRevision();
    }, [loadRevision]);


    // ========================================================
    // EDIT STATE
    // ========================================================

    const startEditing = () => {
        if (
            !revision ||
            !isEditableStatus(revision.status)
        ) {
            return;
        }

        setSuccessMessage("");
        setError("");
        setEditing(true);
    };


    const cancelEditing = () => {
        setDraftItems(
            (revision?.items || []).map(
                (item) => ({
                    ...item,
                    quantity:
                        Number(
                            item.quantity || 1
                        ),
                    proposed_unit_price:
                        item.proposed_unit_price ??
                        null,
                    removed:
                        Boolean(item.removed),
                    client_notes:
                        item.client_notes ||
                        "",
                })
            )
        );

        setClientNotes(
            revision?.client_notes || ""
        );

        setFinancials({
            discount:
                revision?.discount ??
                "0.00",
            tax:
                revision?.tax ??
                "0.00",
            delivery_fee:
                revision?.delivery_fee ??
                "0.00",
        });

        setEditing(false);
    };


    // ========================================================
    // ITEM EDITING
    // ========================================================

    const updateItem = (
        itemId,
        changes
    ) => {
        setDraftItems((current) =>
            current.map((item) =>
                String(item.id) ===
                    String(itemId)
                    ? {
                        ...item,
                        ...changes,
                    }
                    : item
            )
        );
    };


    const increaseQuantity = (
        item
    ) => {
        updateItem(item.id, {
            quantity:
                Number(item.quantity || 1) +
                1,
        });
    };


    const decreaseQuantity = (
        item
    ) => {
        const current =
            Number(item.quantity || 1);

        if (current <= 1) {
            return;
        }

        updateItem(item.id, {
            quantity: current - 1,
        });
    };


    const toggleRemoveItem = (
        item
    ) => {
        updateItem(item.id, {
            removed: !item.removed,
        });
    };


    const toggleExpanded = (
        itemId
    ) => {
        setExpandedItems((current) => ({
            ...current,
            [itemId]:
                !current[itemId],
        }));
    };


    // ========================================================
    // PREVIEW CALCULATIONS
    // ========================================================

    const calculatedSubtotal =
        useMemo(() => {
            return draftItems.reduce(
                (sum, item) => {
                    if (item.removed) {
                        return sum;
                    }

                    const quantity =
                        Number(
                            item.quantity || 0
                        );

                    const price =
                        getEffectivePrice(
                            item
                        );

                    return (
                        sum +
                        quantity * price
                    );
                },
                0
            );
        }, [draftItems]);


    const calculatedTotal =
        useMemo(() => {
            const discount =
                Number(
                    financials.discount || 0
                );

            const tax =
                Number(
                    financials.tax || 0
                );

            const delivery =
                Number(
                    financials.delivery_fee ||
                    0
                );

            return (
                calculatedSubtotal -
                discount +
                tax +
                delivery
            );
        }, [
            calculatedSubtotal,
            financials,
        ]);


    const activeItems =
        useMemo(
            () =>
                draftItems.filter(
                    (item) =>
                        !item.removed
                ),
            [draftItems]
        );


    const removedItems =
        useMemo(
            () =>
                draftItems.filter(
                    (item) =>
                        item.removed
                ),
            [draftItems]
        );


    // ========================================================
    // SAVE
    // ========================================================

    const saveChanges = async () => {
        if (!revision) return;

        if (!activeItems.length) {
            setError(
                "At least one item must remain in the order."
            );
            return;
        }

        try {
            setSaving(true);
            setError("");
            setSuccessMessage("");

            const payload = {
                items: draftItems.map(
                    (item) => ({
                        id: item.id,
                        quantity:
                            Number(
                                item.quantity || 1
                            ),
                        proposed_unit_price:
                            item.proposed_unit_price ===
                                "" ||
                                item.proposed_unit_price ===
                                null
                                ? null
                                : String(
                                    item.proposed_unit_price
                                ),
                        removed:
                            Boolean(
                                item.removed
                            ),
                        client_notes:
                            item.client_notes ||
                            "",
                    })
                ),

                discount:
                    String(
                        financials.discount ||
                        "0"
                    ),

                tax:
                    String(
                        financials.tax ||
                        "0"
                    ),

                delivery_fee:
                    String(
                        financials.delivery_fee ||
                        "0"
                    ),

                client_notes:
                    clientNotes || "",
            };


            const data =
                await apiRequest(
                    `/api/crm/procurement/revisions/${revision.id}/`,
                    {
                        method: "PATCH",
                        body: JSON.stringify(
                            payload
                        ),
                    }
                );

            setRevision(data);

            setDraftItems(
                (data?.items || []).map(
                    (item) => ({
                        ...item,
                        quantity:
                            Number(
                                item.quantity ||
                                1
                            ),
                        removed:
                            Boolean(
                                item.removed
                            ),
                        client_notes:
                            item.client_notes ||
                            "",
                    })
                )
            );

            setFinancials({
                discount:
                    data?.discount ??
                    "0.00",
                tax:
                    data?.tax ??
                    "0.00",
                delivery_fee:
                    data?.delivery_fee ??
                    "0.00",
            });

            setClientNotes(
                data?.client_notes || ""
            );

            setEditing(false);

            setSuccessMessage(
                "Your procurement changes have been saved."
            );
        } catch (err) {
            console.error(
                "PROCUREMENT SAVE ERROR:",
                err
            );

            setError(
                err.message ||
                "Unable to save your changes."
            );
        } finally {
            setSaving(false);
        }
    };


    // ========================================================
    // SUBMIT
    // ========================================================

    const submitChanges = async () => {
        if (!revision) return;

        try {
            setSubmitting(true);
            setError("");
            setSuccessMessage("");

            // Save first if currently editing.
            if (editing) {
                const payload = {
                    items: draftItems.map(
                        (item) => ({
                            id: item.id,
                            quantity:
                                Number(
                                    item.quantity ||
                                    1
                                ),
                            proposed_unit_price:
                                item.proposed_unit_price ===
                                    "" ||
                                    item.proposed_unit_price ===
                                    null
                                    ? null
                                    : String(
                                        item.proposed_unit_price
                                    ),
                            removed:
                                Boolean(
                                    item.removed
                                ),
                            client_notes:
                                item.client_notes ||
                                "",
                        })
                    ),

                    discount:
                        String(
                            financials.discount ||
                            "0"
                        ),

                    tax:
                        String(
                            financials.tax ||
                            "0"
                        ),

                    delivery_fee:
                        String(
                            financials.delivery_fee ||
                            "0"
                        ),

                    client_notes:
                        clientNotes || "",
                };

                const saved =
                    await apiRequest(
                        `/api/crm/procurement/revisions/${revision.id}/`,
                        {
                            method: "PATCH",
                            body: JSON.stringify(
                                payload
                            ),
                        }
                    );

                setRevision(saved);
            }


            const submitted =
                await apiRequest(
                    `/api/crm/procurement/revisions/${revision.id}/submit/`,
                    {
                        method: "POST",
                    }
                );

            setRevision(submitted);
            setEditing(false);

            setSuccessMessage(
                "Your procurement request has been submitted for review."
            );
        } catch (err) {
            console.error(
                "PROCUREMENT SUBMIT ERROR:",
                err
            );

            setError(
                err.message ||
                "Unable to submit the procurement request."
            );
        } finally {
            setSubmitting(false);
            setConfirmAction(null);
        }
    };


    // ========================================================
    // ACCEPT
    // ========================================================

    const acceptQuotation = async () => {
        if (!revision) return;

        try {
            setAccepting(true);
            setError("");
            setSuccessMessage("");

            /*
             * IMPORTANT:
             *
             * This endpoint should be created on the backend
             * specifically for procurement acceptance.
             *
             * Do NOT use the software project proposal
             * acceptance endpoint here.
             */

            const data =
                await apiRequest(
                    `/api/crm/procurement/revisions/${revision.id}/accept/`,
                    {
                        method: "POST",
                    }
                );

            setRevision(data);

            setSuccessMessage(
                "Procurement quotation accepted successfully."
            );
        } catch (err) {
            console.error(
                "PROCUREMENT ACCEPT ERROR:",
                err
            );

            setError(
                err.message ||
                "Unable to accept this quotation."
            );
        } finally {
            setAccepting(false);
            setConfirmAction(null);
        }
    };


    // ========================================================
    // LOADING
    // ========================================================

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50">
                <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6">
                    <div className="text-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg">
                            <Loader2
                                size={25}
                                className="animate-spin"
                            />
                        </div>

                        <h2 className="mt-5 text-lg font-bold text-slate-900">
                            Loading quotation
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Preparing your procurement details...
                        </p>
                    </div>
                </div>
            </div>
        );
    }


    // ========================================================
    // ERROR
    // ========================================================

    if (error && !revision) {
        return (
            <div className="min-h-screen bg-slate-50">
                <div className="mx-auto flex min-h-screen max-w-2xl items-center justify-center px-6">
                    <div className="w-full rounded-3xl border border-red-100 bg-white p-8 shadow-sm">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                            <AlertCircle
                                size={24}
                            />
                        </div>

                        <h1 className="mt-5 text-xl font-bold text-slate-950">
                            Unable to load quotation
                        </h1>

                        <p className="mt-2 text-sm leading-6 text-slate-600">
                            {error}
                        </p>

                        <div className="mt-6 flex gap-3">
                            <button
                                type="button"
                                onClick={
                                    loadRevision
                                }
                                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                            >
                                <RefreshCw
                                    size={16}
                                />
                                Try again
                            </button>

                            {onBack && (
                                <button
                                    type="button"
                                    onClick={
                                        onBack
                                    }
                                    className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                                >
                                    Go back
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    if (!revision) {
        return null;
    }


    const currency =
        revision.currency ||
        revision.quote?.currency ||
        "NGN";

    const canEdit =
        isEditableStatus(
            revision.status
        );

    const canAccept =
        revision.status ===
        "reviewed" ||
        revision.status ===
        "countered";

    const quote =
        revision.quote || {};


    // ========================================================
    // RENDER
    // ========================================================

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* =================================================
                TOP NAV
            ================================================= */}

            <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex min-w-0 items-center gap-3">
                        {onBack && (
                            <button
                                type="button"
                                onClick={
                                    onBack
                                }
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
                                title="Back"
                            >
                                <ArrowLeft
                                    size={18}
                                />
                            </button>
                        )}

                        <div className="min-w-0">
                            <div className="flex items-center gap-2">
                                <ShoppingCart
                                    size={18}
                                    className="text-slate-900"
                                />

                                <span className="truncate text-sm font-bold text-slate-950">
                                    Procurement
                                </span>
                            </div>

                            <p className="truncate text-xs text-slate-500">
                                Client quotation
                            </p>
                        </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-3">
                        <StatusBadge
                            status={
                                revision.status
                            }
                        />

                        {canEdit &&
                            !editing && (
                                <button
                                    type="button"
                                    onClick={
                                        startEditing
                                    }
                                    className="hidden items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 sm:inline-flex"
                                >
                                    <Pencil
                                        size={15}
                                    />
                                    Edit Order
                                </button>
                            )}
                    </div>
                </div>
            </header>


            <main className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
                {/* =================================================
                    ERROR / SUCCESS BANNERS
                ================================================= */}

                {error && (
                    <div className="mb-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-800">
                        <AlertCircle
                            size={18}
                            className="mt-0.5 shrink-0"
                        />

                        <div className="min-w-0 flex-1">
                            <p className="font-semibold">
                                Something needs attention
                            </p>

                            <p className="mt-1 leading-6">
                                {error}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                setError("")
                            }
                            className="text-red-500 hover:text-red-700"
                        >
                            <X
                                size={17}
                            />
                        </button>
                    </div>
                )}

                {successMessage && (
                    <div className="mb-5 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-800">
                        <Check
                            size={18}
                            className="mt-0.5 shrink-0"
                        />

                        <div>
                            <p className="font-semibold">
                                {successMessage}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                setSuccessMessage(
                                    ""
                                )
                            }
                            className="ml-auto text-emerald-500 hover:text-emerald-700"
                        >
                            <X
                                size={17}
                            />
                        </button>
                    </div>
                )}


                {/* =================================================
                    HERO
                ================================================= */}

                <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-100 px-5 py-7 sm:px-8 sm:py-9">
                        <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-start">
                            <div className="max-w-3xl">
                                <div className="mb-4 flex flex-wrap items-center gap-2">
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">
                                        <FileText
                                            size={13}
                                        />
                                        Procurement Quotation
                                    </span>

                                    <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                                        Revision{" "}
                                        {
                                            revision.revision_number
                                        }
                                    </span>
                                </div>

                                <h1 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                                    {quote.title ||
                                        revision.title ||
                                        "Procurement Quotation"}
                                </h1>

                                {(quote.description ||
                                    revision.description) && (
                                        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                                            {quote.description ||
                                                revision.description}
                                        </p>
                                    )}
                            </div>


                            <div className="rounded-2xl bg-slate-950 px-5 py-4 text-white sm:min-w-[250px]">
                                <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-400">
                                    Current Total
                                </p>

                                <p className="mt-2 text-2xl font-black tracking-tight">
                                    {formatMoney(
                                        revision.total,
                                        currency
                                    )}
                                </p>

                                <p className="mt-1 text-xs text-slate-400">
                                    Revision{" "}
                                    {
                                        revision.revision_number
                                    }
                                </p>
                            </div>
                        </div>
                    </div>


                    {/* META */}
                    <div className="grid gap-px bg-slate-100 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="bg-white px-5 py-5 sm:px-7">
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                Quotation
                            </p>

                            <p className="mt-2 break-all text-sm font-bold text-slate-900">
                                {quote.id ||
                                    "—"}
                            </p>
                        </div>

                        <div className="bg-white px-5 py-5 sm:px-7">
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                Revision
                            </p>

                            <p className="mt-2 text-sm font-bold text-slate-900">
                                #{revision.revision_number}
                            </p>
                        </div>

                        <div className="bg-white px-5 py-5 sm:px-7">
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                Created
                            </p>

                            <p className="mt-2 text-sm font-bold text-slate-900">
                                {formatDate(
                                    revision.created_at
                                )}
                            </p>
                        </div>

                        <div className="bg-white px-5 py-5 sm:px-7">
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                Currency
                            </p>

                            <p className="mt-2 text-sm font-bold text-slate-900">
                                {currency}
                            </p>
                        </div>
                    </div>
                </section>


                {/* =================================================
                    MOBILE EDIT BUTTON
                ================================================= */}

                {canEdit &&
                    !editing && (
                        <button
                            type="button"
                            onClick={
                                startEditing
                            }
                            className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3.5 text-sm font-bold text-white shadow-sm sm:hidden"
                        >
                            <Pencil
                                size={16}
                            />
                            Edit Order
                        </button>
                    )}


                {/* =================================================
                    CLIENT / PURPOSE
                ================================================= */}

                <div className="mt-6 grid gap-6 lg:grid-cols-3">
                    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
                        <SectionHeader
                            icon={Building2}
                            title="Procurement Overview"
                            description="Review the purpose and commercial details of this quotation."
                        />

                        <div className="grid gap-5 sm:grid-cols-2">
                            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                                    Purpose
                                </p>

                                <p className="mt-2 text-sm leading-6 text-slate-700">
                                    {quote.purpose ||
                                        "No specific purpose provided."}
                                </p>
                            </div>

                            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                                    Deadline
                                </p>

                                <p className="mt-2 text-sm font-semibold text-slate-900">
                                    {quote.deadline
                                        ? formatDate(
                                            quote.deadline
                                        )
                                        : "No deadline specified"}
                                </p>
                            </div>
                        </div>
                    </section>


                    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <SectionHeader
                            icon={WalletCards}
                            title="Quotation Details"
                        />

                        <InfoRow
                            label="Items"
                            value={`${activeItems.length} active`}
                        />

                        <InfoRow
                            label="Removed"
                            value={`${removedItems.length}`}
                        />

                        <InfoRow
                            label="Revision"
                            value={`#${revision.revision_number}`}
                        />

                        <InfoRow
                            label="Status"
                            value={getStatusLabel(
                                revision.status
                            )}
                        />
                    </section>
                </div>


                {/* =================================================
                    EDIT MODE NOTICE
                ================================================= */}

                {editing && (
                    <section className="mt-6 rounded-3xl border border-blue-200 bg-blue-50 p-5">
                        <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-700 shadow-sm">
                                <Pencil
                                    size={18}
                                />
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-blue-950">
                                    You are editing this order
                                </h3>

                                <p className="mt-1 text-sm leading-6 text-blue-800">
                                    You can change quantities,
                                    request different unit prices,
                                    remove items, and leave
                                    notes. Your original quotation
                                    remains unchanged while your
                                    requested changes are submitted
                                    for review.
                                </p>
                            </div>
                        </div>
                    </section>
                )}


                {/* =================================================
                    ITEMS
                ================================================= */}

                <section className="mt-6 rounded-3xl border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-100 px-5 py-6 sm:px-7">
                        <SectionHeader
                            icon={Package}
                            title="Procurement Items"
                            description={
                                editing
                                    ? "Review each product and make the changes you want to request."
                                    : "Review the products, quantities and quoted unit prices."
                            }
                        />
                    </div>


                    <div className="divide-y divide-slate-100">
                        {draftItems.length ===
                            0 && (
                                <div className="px-6 py-14 text-center">
                                    <Package
                                        size={32}
                                        className="mx-auto text-slate-300"
                                    />

                                    <p className="mt-4 text-sm font-semibold text-slate-700">
                                        No procurement items
                                    </p>
                                </div>
                            )}


                        {draftItems.map(
                            (item, index) => {
                                const expanded =
                                    Boolean(
                                        expandedItems[
                                        item.id
                                        ]
                                    );

                                const effectivePrice =
                                    getEffectivePrice(
                                        item
                                    );

                                const lineTotal =
                                    item.removed
                                        ? 0
                                        : Number(
                                            item.quantity ||
                                            0
                                        ) *
                                        effectivePrice;

                                const quotedTotal =
                                    Number(
                                        item.quantity ||
                                        0
                                    ) *
                                    Number(
                                        item.quoted_unit_price ||
                                        0
                                    );

                                return (
                                    <div
                                        key={
                                            item.id ||
                                            index
                                        }
                                        className={`
                                            px-5 py-6 transition
                                            sm:px-7
                                            ${item.removed
                                                ? "bg-slate-50 opacity-75"
                                                : ""
                                            }
                                        `}
                                    >
                                        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                                            {/* PRODUCT */}
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-start gap-4">
                                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                                                        <Package
                                                            size={19}
                                                        />
                                                    </div>

                                                    <div className="min-w-0">
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            <h3
                                                                className={`
                                                                    text-base font-bold
                                                                    ${item.removed
                                                                        ? "text-slate-500 line-through"
                                                                        : "text-slate-950"
                                                                    }
                                                                `}
                                                            >
                                                                {
                                                                    item.name
                                                                }
                                                            </h3>

                                                            {item.category && (
                                                                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
                                                                    {
                                                                        item.category
                                                                    }
                                                                </span>
                                                            )}

                                                            {item.removed && (
                                                                <span className="rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-bold text-red-600">
                                                                    Removed
                                                                </span>
                                                            )}
                                                        </div>

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

                                                        {item.description && (
                                                            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                                                                {
                                                                    item.description
                                                                }
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>


                                            {/* PRICE / TOTAL */}
                                            <div className="lg:min-w-[310px]">
                                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3">
                                                    <div>
                                                        <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
                                                            Unit Price
                                                        </p>

                                                        <p className="mt-1 text-sm font-bold text-slate-950">
                                                            {formatMoney(
                                                                getDisplayPrice(
                                                                    item
                                                                ),
                                                                currency
                                                            )}
                                                        </p>

                                                        {item.proposed_unit_price !==
                                                            null &&
                                                            item.proposed_unit_price !==
                                                            undefined &&
                                                            Number(
                                                                item.proposed_unit_price
                                                            ) !==
                                                            Number(
                                                                item.quoted_unit_price
                                                            ) && (
                                                                <p className="mt-1 text-[11px] text-slate-400 line-through">
                                                                    {
                                                                        formatMoney(
                                                                            item.quoted_unit_price,
                                                                            currency
                                                                        )
                                                                    }
                                                                </p>
                                                            )}
                                                    </div>

                                                    <div>
                                                        <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
                                                            Quantity
                                                        </p>

                                                        {editing &&
                                                            !item.removed ? (
                                                            <div className="mt-1 inline-flex items-center rounded-xl border border-slate-200 bg-white">
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        decreaseQuantity(
                                                                            item
                                                                        )
                                                                    }
                                                                    disabled={
                                                                        Number(
                                                                            item.quantity
                                                                        ) <=
                                                                        1
                                                                    }
                                                                    className="flex h-9 w-9 items-center justify-center text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-30"
                                                                >
                                                                    <Minus
                                                                        size={
                                                                            15
                                                                        }
                                                                    />
                                                                </button>

                                                                <span className="min-w-[38px] text-center text-sm font-bold text-slate-900">
                                                                    {
                                                                        item.quantity
                                                                    }
                                                                </span>

                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        increaseQuantity(
                                                                            item
                                                                        )
                                                                    }
                                                                    className="flex h-9 w-9 items-center justify-center text-slate-500 hover:bg-slate-50"
                                                                >
                                                                    <Plus
                                                                        size={
                                                                            15
                                                                        }
                                                                    />
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <p className="mt-1 text-sm font-bold text-slate-950">
                                                                {
                                                                    item.quantity
                                                                }
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div>
                                                        <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
                                                            Total
                                                        </p>

                                                        <p className="mt-1 text-sm font-black text-slate-950">
                                                            {formatMoney(
                                                                lineTotal,
                                                                currency
                                                            )}
                                                        </p>

                                                        {item.proposed_unit_price !==
                                                            null &&
                                                            item.proposed_unit_price !==
                                                            undefined &&
                                                            quotedTotal !==
                                                            lineTotal && (
                                                                <p className="mt-1 text-[11px] text-slate-400 line-through">
                                                                    {formatMoney(
                                                                        quotedTotal,
                                                                        currency
                                                                    )}
                                                                </p>
                                                            )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        {/* PROPOSED PRICE */}
                                        {editing &&
                                            !item.removed && (
                                                <div className="mt-6 grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2">
                                                    <div>
                                                        <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
                                                            Your proposed unit price
                                                        </label>

                                                        <div className="relative mt-2">
                                                            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
                                                                {
                                                                    currency
                                                                }
                                                            </span>

                                                            <input
                                                                type="number"
                                                                min="0"
                                                                step="0.01"
                                                                value={
                                                                    item.proposed_unit_price ??
                                                                    ""
                                                                }
                                                                onChange={(
                                                                    event
                                                                ) =>
                                                                    updateItem(
                                                                        item.id,
                                                                        {
                                                                            proposed_unit_price:
                                                                                event
                                                                                    .target
                                                                                    .value,
                                                                        }
                                                                    )
                                                                }
                                                                placeholder={
                                                                    item.quoted_unit_price
                                                                }
                                                                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-14 pr-3 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                                                            />
                                                        </div>

                                                        <div className="mt-2 flex flex-wrap items-center gap-2">
                                                            <p className="text-xs text-slate-500">
                                                                Original quoted price:
                                                                {" "}
                                                                <strong>
                                                                    {formatMoney(
                                                                        item.quoted_unit_price,
                                                                        currency
                                                                    )}
                                                                </strong>
                                                            </p>

                                                            <PriceChangeBadge
                                                                item={
                                                                    item
                                                                }
                                                            />
                                                        </div>
                                                    </div>


                                                    <div>
                                                        <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
                                                            Item note
                                                        </label>

                                                        <input
                                                            type="text"
                                                            value={
                                                                item.client_notes ||
                                                                ""
                                                            }
                                                            onChange={(
                                                                event
                                                            ) =>
                                                                updateItem(
                                                                    item.id,
                                                                    {
                                                                        client_notes:
                                                                            event
                                                                                .target
                                                                                .value,
                                                                    }
                                                                )
                                                            }
                                                            placeholder="Optional note for this item"
                                                            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                                                        />
                                                    </div>
                                                </div>
                                            )}


                                        {/* DETAILS */}
                                        <div className="mt-5 flex flex-wrap items-center gap-3">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    toggleExpanded(
                                                        item.id
                                                    )
                                                }
                                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900"
                                            >
                                                {expanded ? (
                                                    <ChevronUp
                                                        size={
                                                            15
                                                        }
                                                    />
                                                ) : (
                                                    <ChevronDown
                                                        size={
                                                            15
                                                        }
                                                    />
                                                )}

                                                {expanded
                                                    ? "Hide details"
                                                    : "View specifications"}
                                            </button>


                                            {editing && (
                                                <>
                                                    <span className="h-4 w-px bg-slate-200" />

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            toggleRemoveItem(
                                                                item
                                                            )
                                                        }
                                                        className={`
                                                            inline-flex items-center gap-1.5 text-xs font-semibold
                                                            ${item.removed
                                                                ? "text-emerald-600 hover:text-emerald-700"
                                                                : "text-red-500 hover:text-red-700"
                                                            }
                                                        `}
                                                    >
                                                        {item.removed ? (
                                                            <>
                                                                <RotateCcw
                                                                    size={
                                                                        14
                                                                    }
                                                                />
                                                                Restore item
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Trash2
                                                                    size={
                                                                        14
                                                                    }
                                                                />
                                                                Remove item
                                                            </>
                                                        )}
                                                    </button>
                                                </>
                                            )}
                                        </div>


                                        {expanded && (
                                            <div className="mt-4 grid gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-5 sm:grid-cols-2">
                                                {item.specifications &&
                                                    Object.keys(
                                                        item.specifications
                                                    ).length >
                                                    0 ? (
                                                    Object.entries(
                                                        item.specifications
                                                    ).map(
                                                        ([
                                                            key,
                                                            value,
                                                        ]) => (
                                                            <div
                                                                key={
                                                                    key
                                                                }
                                                                className="rounded-xl bg-white p-4"
                                                            >
                                                                <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
                                                                    {key.replace(
                                                                        /_/g,
                                                                        " "
                                                                    )}
                                                                </p>

                                                                <p className="mt-1 text-sm font-semibold text-slate-800">
                                                                    {typeof value ===
                                                                        "object"
                                                                        ? JSON.stringify(
                                                                            value
                                                                        )
                                                                        : String(
                                                                            value
                                                                        )}
                                                                </p>
                                                            </div>
                                                        )
                                                    )
                                                ) : (
                                                    <p className="text-sm text-slate-500 sm:col-span-2">
                                                        No specifications were provided for this item.
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            }
                        )}
                    </div>
                </section>


                {/* =================================================
                    FINANCIAL SUMMARY
                ================================================= */}

                <div className="mt-6 grid gap-6 lg:grid-cols-5">
                    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-3">
                        <SectionHeader
                            icon={Truck}
                            title="Commercial Summary"
                            description="The final quotation amount is calculated from the procurement items and applicable charges."
                        />

                        <div className="space-y-1">
                            <div className="flex items-center justify-between gap-5 py-3">
                                <span className="text-sm text-slate-500">
                                    Subtotal
                                </span>

                                <span className="text-sm font-bold text-slate-900">
                                    {formatMoney(
                                        editing
                                            ? calculatedSubtotal
                                            : revision.subtotal,
                                        currency
                                    )}
                                </span>
                            </div>


                            <div className="flex items-center justify-between gap-5 py-3">
                                <span className="text-sm text-slate-500">
                                    Discount
                                </span>

                                {editing ? (
                                    <div className="w-40">
                                        <input
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            value={
                                                financials.discount
                                            }
                                            onChange={(
                                                event
                                            ) =>
                                                setFinancials(
                                                    (
                                                        current
                                                    ) => ({
                                                        ...current,
                                                        discount:
                                                            event
                                                                .target
                                                                .value,
                                                    })
                                                )
                                            }
                                            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-right text-sm font-semibold outline-none focus:border-slate-400"
                                        />
                                    </div>
                                ) : (
                                    <span className="text-sm font-semibold text-slate-700">
                                        {formatMoney(
                                            revision.discount,
                                            currency
                                        )}
                                    </span>
                                )}
                            </div>


                            <div className="flex items-center justify-between gap-5 py-3">
                                <span className="text-sm text-slate-500">
                                    Tax
                                </span>

                                {editing ? (
                                    <div className="w-40">
                                        <input
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            value={
                                                financials.tax
                                            }
                                            onChange={(
                                                event
                                            ) =>
                                                setFinancials(
                                                    (
                                                        current
                                                    ) => ({
                                                        ...current,
                                                        tax: event
                                                            .target
                                                            .value,
                                                    })
                                                )
                                            }
                                            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-right text-sm font-semibold outline-none focus:border-slate-400"
                                        />
                                    </div>
                                ) : (
                                    <span className="text-sm font-semibold text-slate-700">
                                        {formatMoney(
                                            revision.tax,
                                            currency
                                        )}
                                    </span>
                                )}
                            </div>


                            <div className="flex items-center justify-between gap-5 py-3">
                                <span className="text-sm text-slate-500">
                                    Delivery
                                </span>

                                {editing ? (
                                    <div className="w-40">
                                        <input
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            value={
                                                financials.delivery_fee
                                            }
                                            onChange={(
                                                event
                                            ) =>
                                                setFinancials(
                                                    (
                                                        current
                                                    ) => ({
                                                        ...current,
                                                        delivery_fee:
                                                            event
                                                                .target
                                                                .value,
                                                    })
                                                )
                                            }
                                            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-right text-sm font-semibold outline-none focus:border-slate-400"
                                        />
                                    </div>
                                ) : (
                                    <span className="text-sm font-semibold text-slate-700">
                                        {formatMoney(
                                            revision.delivery_fee,
                                            currency
                                        )}
                                    </span>
                                )}
                            </div>
                        </div>


                        <div className="mt-5 border-t border-slate-200 pt-5">
                            <div className="flex items-end justify-between gap-5">
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
                                        Grand Total
                                    </p>

                                    <p className="mt-1 text-sm text-slate-500">
                                        {editing
                                            ? "Estimated based on your current requested changes"
                                            : "Current quotation total"}
                                    </p>
                                </div>

                                <p className="text-2xl font-black tracking-tight text-slate-950">
                                    {formatMoney(
                                        editing
                                            ? calculatedTotal
                                            : revision.total,
                                        currency
                                    )}
                                </p>
                            </div>
                        </div>


                        {editing && (
                            <div className="mt-5 flex items-start gap-3 rounded-2xl bg-amber-50 p-4 text-amber-800">
                                <Info
                                    size={17}
                                    className="mt-0.5 shrink-0"
                                />

                                <p className="text-xs leading-5">
                                    This is a preview of your requested
                                    changes. The official quotation total
                                    is recalculated and confirmed by
                                    AB Technologies when your revision
                                    is reviewed.
                                </p>
                            </div>
                        )}
                    </section>


                    {/* SIDE SUMMARY */}
                    <section className="rounded-3xl bg-slate-950 p-6 text-white shadow-sm lg:col-span-2">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                                <Calculator
                                    size={19}
                                />
                            </div>

                            <div>
                                <h2 className="text-base font-bold">
                                    Order Summary
                                </h2>

                                <p className="text-xs text-slate-400">
                                    Revision{" "}
                                    {
                                        revision.revision_number
                                    }
                                </p>
                            </div>
                        </div>

                        <div className="mt-7 space-y-4">
                            <div className="flex justify-between gap-4">
                                <span className="text-sm text-slate-400">
                                    Active items
                                </span>

                                <span className="text-sm font-bold">
                                    {
                                        activeItems.length
                                    }
                                </span>
                            </div>

                            <div className="flex justify-between gap-4">
                                <span className="text-sm text-slate-400">
                                    Removed items
                                </span>

                                <span className="text-sm font-bold">
                                    {
                                        removedItems.length
                                    }
                                </span>
                            </div>

                            <div className="flex justify-between gap-4">
                                <span className="text-sm text-slate-400">
                                    Quantity
                                </span>

                                <span className="text-sm font-bold">
                                    {formatNumber(
                                        activeItems.reduce(
                                            (
                                                sum,
                                                item
                                            ) =>
                                                sum +
                                                Number(
                                                    item.quantity ||
                                                    0
                                                ),
                                            0
                                        )
                                    )}
                                </span>
                            </div>
                        </div>

                        <div className="mt-7 border-t border-white/10 pt-6">
                            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                                Total
                            </p>

                            <p className="mt-2 text-3xl font-black tracking-tight">
                                {formatMoney(
                                    editing
                                        ? calculatedTotal
                                        : revision.total,
                                    currency
                                )}
                            </p>
                        </div>
                    </section>
                </div>


                {/* =================================================
                    CLIENT NOTES
                ================================================= */}

                <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
                    <SectionHeader
                        icon={FileText}
                        title="Client Notes"
                        description="Add any instructions, questions or commercial comments for AB Technologies."
                    />

                    {editing ? (
                        <textarea
                            value={
                                clientNotes
                            }
                            onChange={(event) =>
                                setClientNotes(
                                    event.target
                                        .value
                                )
                            }
                            rows={5}
                            placeholder="For example: Please confirm delivery time, availability, preferred alternatives, or any special requirements."
                            className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-100"
                        />
                    ) : (
                        <div className="rounded-2xl bg-slate-50 p-5">
                            <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
                                {revision.client_notes ||
                                    "No client notes have been added."}
                            </p>
                        </div>
                    )}
                </section>


                {/* =================================================
                    WORKFLOW NOTICE
                ================================================= */}

                {revision.status ===
                    "submitted" && (
                        <section className="mt-6 rounded-3xl border border-blue-200 bg-blue-50 p-6">
                            <div className="flex items-start gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-blue-700 shadow-sm">
                                    <Clock3
                                        size={20}
                                    />
                                </div>

                                <div>
                                    <h3 className="text-sm font-bold text-blue-950">
                                        Your changes are under review
                                    </h3>

                                    <p className="mt-1 max-w-3xl text-sm leading-6 text-blue-800">
                                        AB Technologies has received your
                                        requested changes. Our team will
                                        review quantities, pricing and
                                        availability and may approve the
                                        request or send you a counter offer.
                                    </p>
                                </div>
                            </div>
                        </section>
                    )}


                {revision.status ===
                    "countered" && (
                        <section className="mt-6 rounded-3xl border border-amber-200 bg-amber-50 p-6">
                            <div className="flex items-start gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-amber-700 shadow-sm">
                                    <RefreshCw
                                        size={20}
                                    />
                                </div>

                                <div>
                                    <h3 className="text-sm font-bold text-amber-950">
                                        AB Technologies has sent a counter offer
                                    </h3>

                                    <p className="mt-1 max-w-3xl text-sm leading-6 text-amber-800">
                                        Review the updated unit prices,
                                        quantities and commercial terms
                                        above. You can accept the revised
                                        quotation or continue the negotiation
                                        if another change is required.
                                    </p>
                                </div>
                            </div>
                        </section>
                    )}


                {revision.status ===
                    "accepted" && (
                        <section className="mt-6 rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
                            <div className="flex items-start gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm">
                                    <BadgeCheck
                                        size={21}
                                    />
                                </div>

                                <div>
                                    <h3 className="text-sm font-bold text-emerald-950">
                                        Procurement quotation accepted
                                    </h3>

                                    <p className="mt-1 max-w-3xl text-sm leading-6 text-emerald-800">
                                        This procurement revision has been
                                        accepted. The agreed quantities and
                                        prices should now be treated as the
                                        final commercial scope for fulfillment.
                                    </p>
                                </div>
                            </div>
                        </section>
                    )}


                {/* =================================================
                    ACTION BAR
                ================================================= */}

                <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                    {editing ? (
                        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                            <div>
                                <p className="text-sm font-bold text-slate-950">
                                    Finished making changes?
                                </p>

                                <p className="mt-1 text-xs leading-5 text-slate-500">
                                    Save your changes first, or submit
                                    them directly for review.
                                </p>
                            </div>

                            <div className="flex flex-col gap-2 sm:flex-row">
                                <button
                                    type="button"
                                    onClick={
                                        cancelEditing
                                    }
                                    disabled={
                                        saving ||
                                        submitting
                                    }
                                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                                >
                                    <X
                                        size={16}
                                    />
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    onClick={
                                        saveChanges
                                    }
                                    disabled={
                                        saving ||
                                        submitting
                                    }
                                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-50 disabled:opacity-50"
                                >
                                    {saving ? (
                                        <Loader2
                                            size={16}
                                            className="animate-spin"
                                        />
                                    ) : (
                                        <Check
                                            size={16}
                                        />
                                    )}

                                    Save Changes
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setConfirmAction(
                                            "submit"
                                        )
                                    }
                                    disabled={
                                        saving ||
                                        submitting
                                    }
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800 disabled:opacity-50"
                                >
                                    {submitting ? (
                                        <Loader2
                                            size={16}
                                            className="animate-spin"
                                        />
                                    ) : (
                                        <Send
                                            size={16}
                                        />
                                    )}

                                    Submit for Review
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                            <div>
                                <p className="text-sm font-bold text-slate-950">
                                    {canAccept
                                        ? "Ready to proceed?"
                                        : revision.status ===
                                            "accepted"
                                            ? "Quotation accepted"
                                            : "Need to make changes?"}
                                </p>

                                <p className="mt-1 max-w-xl text-xs leading-5 text-slate-500">
                                    {canAccept
                                        ? "Review the final quantities and prices before accepting this procurement quotation."
                                        : revision.status ===
                                            "accepted"
                                            ? "This procurement order has been accepted."
                                            : canEdit
                                                ? "You can modify quantities or request different unit prices before submitting."
                                                : "This revision is currently locked while it is being processed."}
                                </p>
                            </div>

                            <div className="flex flex-col gap-2 sm:flex-row">
                                {canEdit && (
                                    <button
                                        type="button"
                                        onClick={
                                            startEditing
                                        }
                                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-800 transition hover:bg-slate-50"
                                    >
                                        <Pencil
                                            size={16}
                                        />
                                        Edit Order
                                    </button>
                                )}

                                {canAccept && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setConfirmAction(
                                                "accept"
                                            )
                                        }
                                        disabled={
                                            accepting
                                        }
                                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 disabled:opacity-50"
                                    >
                                        {accepting ? (
                                            <Loader2
                                                size={
                                                    16
                                                }
                                                className="animate-spin"
                                            />
                                        ) : (
                                            <BadgeCheck
                                                size={
                                                    17
                                                }
                                            />
                                        )}

                                        Accept Quotation
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </section>


                {/* =================================================
                    FOOTER
                ================================================= */}

                <footer className="mt-8 px-2 text-center">
                    <p className="text-xs leading-5 text-slate-400">
                        This procurement quotation is provided by
                        AB Technologies. Prices and availability are
                        subject to confirmation until the quotation
                        is formally accepted.
                    </p>
                </footer>
            </main>


            {/* =====================================================
                CONFIRMATION MODAL
            ===================================================== */}

            {confirmAction && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
                        <div className="p-6">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-800">
                                {confirmAction ===
                                    "accept" ? (
                                    <BadgeCheck
                                        size={23}
                                    />
                                ) : (
                                    <Send
                                        size={21}
                                    />
                                )}
                            </div>

                            <h2 className="mt-5 text-lg font-black text-slate-950">
                                {confirmAction ===
                                    "accept"
                                    ? "Accept procurement quotation?"
                                    : "Submit your changes?"}
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                {confirmAction ===
                                    "accept"
                                    ? "By accepting this quotation, you confirm that you want to proceed with the quantities and prices currently shown."
                                    : "Your requested quantities, prices and notes will be sent to AB Technologies for review. You may receive an approval or counter offer."}
                            </p>

                            {confirmAction ===
                                "accept" && (
                                    <div className="mt-5 rounded-2xl bg-slate-50 p-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-slate-500">
                                                Final total
                                            </span>

                                            <strong className="text-base text-slate-950">
                                                {formatMoney(
                                                    revision.total,
                                                    currency
                                                )}
                                            </strong>
                                        </div>
                                    </div>
                                )}
                        </div>

                        <div className="flex gap-3 border-t border-slate-100 bg-slate-50 p-5">
                            <button
                                type="button"
                                onClick={() =>
                                    setConfirmAction(
                                        null
                                    )
                                }
                                className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={
                                    confirmAction ===
                                        "accept"
                                        ? acceptQuotation
                                        : submitChanges
                                }
                                disabled={
                                    accepting ||
                                    submitting
                                }
                                className={`
                                    flex-1 rounded-xl px-4 py-3 text-sm font-bold text-white
                                    ${confirmAction ===
                                        "accept"
                                        ? "bg-emerald-600 hover:bg-emerald-700"
                                        : "bg-slate-950 hover:bg-slate-800"
                                    }
                                    disabled:opacity-50
                                `}
                            >
                                {accepting ||
                                    submitting ? (
                                    <Loader2
                                        size={17}
                                        className="mx-auto animate-spin"
                                    />
                                ) : confirmAction ===
                                    "accept" ? (
                                    "Accept"
                                ) : (
                                    "Submit"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}