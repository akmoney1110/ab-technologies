import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

import { useParams } from "react-router-dom";


const API_URL =
    import.meta.env.VITE_API_URL ||
    "http://127.0.0.1:8000";


/* =============================================================
   MAIN COMPONENT
============================================================= */

export default function ClientProposal() {
    const { publicToken } = useParams();

    const [proposal, setProposal] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [updatingFeature, setUpdatingFeature] =
        useState(null);

    const [processingDecision, setProcessingDecision] =
        useState(false);

    const [comment, setComment] = useState("");

    const [decisionError, setDecisionError] =
        useState("");

    const [decisionMessage, setDecisionMessage] =
        useState("");

    const [
        showAcceptConfirmation,
        setShowAcceptConfirmation,
    ] = useState(false);

    const [
        showAcceptanceSuccess,
        setShowAcceptanceSuccess,
    ] = useState(false);

    const [acceptanceResult, setAcceptanceResult] =
        useState(null);


    /*
     * Procurement quotations have their own local editable state.
     *
     * This is intentionally separate from `proposal`.
     *
     * `proposal` = data received from Django.
     *
     * `editableQuotation` = what the client is currently
     * changing before acceptance.
     */
    const [
        editableQuotation,
        setEditableQuotation,
    ] = useState(null);

    const [
        quotationUpdating,
        setQuotationUpdating,
    ] = useState(false);

    const [
        quotationError,
        setQuotationError,
    ] = useState("");

    const [
        quotationMessage,
        setQuotationMessage,
    ] = useState("");


    /* =========================================================
       LOAD PROPOSAL
    ========================================================= */

    const loadProposal = useCallback(async () => {
        if (!publicToken) {
            setError("Invalid proposal link.");
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                `${API_URL}/api/proposals/client/${publicToken}/`,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                    },
                }
            );

            const responseText =
                await response.text();

            let data = {};

            try {
                data = responseText
                    ? JSON.parse(responseText)
                    : {};
            } catch {
                throw new Error(
                    `Server returned an invalid response (${response.status}).`
                );
            }

            if (!response.ok) {
                throw new Error(
                    data.error ||
                    data.detail ||
                    "Unable to load proposal."
                );
            }

            if (!data.success) {
                throw new Error(
                    data.error ||
                    "Unable to load proposal."
                );
            }

            const loadedProposal =
                data.proposal;

            setProposal(
                loadedProposal
            );


            /*
             * Initialize procurement quotation state.
             *
             * Every item starts as included.
             *
             * We add `included` locally because Django's original
             * quotation item does not need to know whether the
             * client currently wants it.
             */
            if (loadedProposal?.quotation) {
                const quotation =
                    loadedProposal.quotation;

                setEditableQuotation({
                    ...quotation,

                    items: (
                        quotation.items || []
                    ).map((item) => ({
                        ...item,

                        quantity:
                            Number(item.quantity) || 1,

                        included:
                            item.included !== false,
                    })),
                });
            } else {
                setEditableQuotation(null);
            }

        } catch (error) {
            console.error(
                "Load proposal error:",
                error
            );

            setError(
                error.message ||
                "Unable to load proposal."
            );

        } finally {
            setLoading(false);
        }
    }, [publicToken]);


    useEffect(() => {
        loadProposal();
    }, [loadProposal]);


    /* =========================================================
       PROPOSAL TYPE
    ========================================================= */

    const isQuotation =
        Boolean(proposal?.quotation);


    /*
     * Original quotation returned by Django.
     */
    const quotation =
        proposal?.quotation || null;


    /*
     * Current client-editable quotation.
     *
     * For normal software proposals this is null.
     */
    const currentQuotation =
        isQuotation
            ? editableQuotation || quotation
            : null;


    /* =========================================================
       FEATURE LISTS
    ========================================================= */

    const requiredFeatures =
        proposal?.required_features || [];

    const recommendedFeatures =
        proposal?.recommended_features || [];

    const optionalFeatures =
        proposal?.optional_features || [];


    const includedFeatureCount =
        useMemo(() => {
            return (
                requiredFeatures.length +
                recommendedFeatures.length
            );
        }, [
            requiredFeatures,
            recommendedFeatures,
        ]);


    /* =========================================================
       PROPOSAL STATE
    ========================================================= */

    const isAccepted =
        proposal?.status === "accepted";

    const isRejected =
        proposal?.status === "rejected";

    const isExpired =
        proposal?.status === "expired";

    const isCancelled =
        proposal?.status === "cancelled";


    /*
     * Feature editing is only for normal software proposals.
     */
    const canEditFeatures =
        Boolean(
            proposal?.client_editable &&
            !isAccepted &&
            !isRejected &&
            !isExpired &&
            !isCancelled &&
            !isQuotation
        );


    /*
     * Procurement quotations have their own editing workflow.
     */
    const canEditQuotation =
        Boolean(
            proposal?.client_editable &&
            !isAccepted &&
            !isRejected &&
            !isExpired &&
            !isCancelled &&
            isQuotation &&
            currentQuotation
        );


    /*
     * Anything editable by the client.
     */
    const canEdit =
        canEditFeatures ||
        canEditQuotation;


    /* =========================================================
       CURRENT QUOTATION TOTAL
    ========================================================= */

    function getProposalTotal(
        proposalData,
        quotationData = null
    ) {
        const activeQuotation =
            quotationData ||
            proposalData?.quotation;

        if (
            activeQuotation &&
            activeQuotation.total !== null &&
            activeQuotation.total !== undefined
        ) {
            return formatCurrency(
                activeQuotation.total,
                activeQuotation.currency ||
                proposalData.currency ||
                "NGN"
            );
        }

        if (proposalData?.formatted_total) {
            return proposalData.formatted_total;
        }

        if (
            proposalData?.total_price !== null &&
            proposalData?.total_price !== undefined
        ) {
            return formatCurrency(
                proposalData.total_price,
                proposalData.currency ||
                "NGN"
            );
        }

        return "—";
    }


    /* =========================================================
       QUOTATION CHANGES
    ========================================================= */

    /*
     * Converts the editable quotation into the exact payload
     * Django expects.
     *
     * IMPORTANT:
     *
     * We deliberately do NOT send:
     *
     * - unit_price
     * - total_price
     * - brand
     * - model
     * - specifications
     *
     * Those values are controlled by Django.
     */
    const buildQuotationChanges =
        useCallback(() => {
            if (!currentQuotation?.items) {
                return {
                    items: [],
                };
            }

            return {
                items:
                    currentQuotation.items.map(
                        (item) => ({
                            id: String(item.id),

                            quantity:
                                Number(item.quantity) ||
                                1,

                            included:
                                item.included !== false,
                        })
                    ),
            };
        }, [currentQuotation]);


    /* =========================================================
       UPDATE QUOTATION FROM DJANGO (PREVIEW ONLY)
    ========================================================= */

    const refreshQuotationFromServer =
        useCallback(
            async ({
                showMessage = true,
                throwErrors = false,
            } = {}) => {
                if (!canEditQuotation) {
                    return null;
                }

                const quotationChanges =
                    buildQuotationChanges();

                if (
                    !quotationChanges.items.some(
                        (item) =>
                            item.included
                    )
                ) {
                    const message =
                        "At least one product must remain selected.";

                    setQuotationError(
                        message
                    );

                    if (throwErrors) {
                        throw new Error(
                            message
                        );
                    }

                    return null;
                }

                try {
                    setQuotationUpdating(true);
                    setQuotationError("");

                    if (showMessage) {
                        setQuotationMessage("");
                    }

                    const response =
                        await fetch(
                            `${API_URL}/api/proposals/client/${publicToken}/quotation/preview/`,
                            {
                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json",

                                    Accept:
                                        "application/json",
                                },

                                body: JSON.stringify(
                                    quotationChanges
                                ),
                            }
                        );

                    const responseText =
                        await response.text();

                    let data = {};

                    try {
                        data = responseText
                            ? JSON.parse(
                                responseText
                            )
                            : {};
                    } catch {
                        throw new Error(
                            `Server returned an invalid response (${response.status}).`
                        );
                    }

                    if (!response.ok) {
                        throw new Error(
                            data.error ||
                            data.detail ||
                            "Unable to update quotation."
                        );
                    }

                    if (!data.success) {
                        throw new Error(
                            data.error ||
                            "Unable to update quotation."
                        );
                    }

                    const serverQuotation =
                        data.quotation;

                    /*
                     * IMPORTANT:
                     *
                     * The backend preview may return only
                     * selected items.
                     *
                     * We merge it with our local items so that
                     * removed products remain available through
                     * the Restore button.
                     */
                    const localItems =
                        currentQuotation?.items ||
                        [];

                    const serverItems =
                        serverQuotation?.items ||
                        [];

                    const serverItemMap =
                        new Map(
                            serverItems.map(
                                (item) => [
                                    String(
                                        item.id
                                    ),
                                    item,
                                ]
                            )
                        );


                    const mergedItems =
                        localItems.map(
                            (localItem) => {
                                const serverItem =
                                    serverItemMap.get(
                                        String(
                                            localItem.id
                                        )
                                    );

                                if (
                                    !serverItem
                                ) {
                                    /*
                                     * Item was removed.
                                     *
                                     * Keep its local data so
                                     * the client can restore it.
                                     */
                                    return {
                                        ...localItem,

                                        included:
                                            false,
                                    };
                                }

                                return {
                                    ...localItem,

                                    ...serverItem,

                                    quantity:
                                        Number(
                                            serverItem.quantity
                                        ) ||
                                        Number(
                                            localItem.quantity
                                        ) ||
                                        1,

                                    included:
                                        true,
                                };
                            }
                        );


                    const mergedQuotation = {
                        ...serverQuotation,

                        items:
                            mergedItems,
                    };


                    setEditableQuotation(
                        mergedQuotation
                    );


                    if (showMessage) {
                        setQuotationMessage(
                            "Quotation updated successfully."
                        );
                    }


                    return mergedQuotation;

                } catch (error) {
                    console.error(
                        "Quotation update error:",
                        error
                    );

                    setQuotationError(
                        error.message ||
                        "Unable to update quotation."
                    );

                    if (throwErrors) {
                        throw error;
                    }

                    return null;

                } finally {
                    setQuotationUpdating(
                        false
                    );
                }
            },
            [
                API_URL,
                publicToken,
                canEditQuotation,
                buildQuotationChanges,
                currentQuotation,
            ]
        );


    /* =========================================================
       UPDATE QUOTATION ITEM LOCALLY
    ========================================================= */

    function updateQuotationQuantity(
        itemId,
        value
    ) {
        if (!canEditQuotation) {
            return;
        }

        let quantity =
            Number(value);

        if (!Number.isFinite(quantity)) {
            quantity = 1;
        }

        quantity =
            Math.floor(quantity);

        if (quantity < 1) {
            quantity = 1;
        }

        if (quantity > 100000) {
            quantity = 100000;
        }

        setEditableQuotation(
            (current) => {
                if (!current) {
                    return current;
                }

                return {
                    ...current,

                    items:
                        (current.items || [])
                            .map(
                                (item) =>
                                    String(
                                        item.id
                                    ) ===
                                        String(
                                            itemId
                                        )
                                        ? {
                                            ...item,
                                            quantity,
                                        }
                                        : item
                            ),
                };
            }
        );

        setQuotationError("");
        setQuotationMessage("");
    }


    /* =========================================================
       REMOVE QUOTATION ITEM
    ========================================================= */

    function removeQuotationItem(
        itemId
    ) {
        if (!canEditQuotation) {
            return;
        }

        const selectedCount =
            (
                currentQuotation?.items ||
                []
            ).filter(
                (item) =>
                    item.included !== false
            ).length;


        if (selectedCount <= 1) {
            setQuotationError(
                "At least one product must remain in the quotation."
            );

            return;
        }


        setEditableQuotation(
            (current) => {
                if (!current) {
                    return current;
                }

                return {
                    ...current,

                    items:
                        (current.items || [])
                            .map(
                                (item) =>
                                    String(
                                        item.id
                                    ) ===
                                        String(
                                            itemId
                                        )
                                        ? {
                                            ...item,
                                            included:
                                                false,
                                        }
                                        : item
                            ),
                };
            }
        );

        setQuotationError("");
        setQuotationMessage("");
    }


    /* =========================================================
       RESTORE QUOTATION ITEM
    ========================================================= */

    function restoreQuotationItem(
        itemId
    ) {
        if (!canEditQuotation) {
            return;
        }

        setEditableQuotation(
            (current) => {
                if (!current) {
                    return current;
                }

                return {
                    ...current,

                    items:
                        (current.items || [])
                            .map(
                                (item) =>
                                    String(
                                        item.id
                                    ) ===
                                        String(
                                            itemId
                                        )
                                        ? {
                                            ...item,

                                            included:
                                                true,

                                            /*
                                             * If Django zeroed the
                                             * quantity when it was
                                             * removed, restoring it
                                             * must give it a valid
                                             * quantity again.
                                             */
                                            quantity:
                                                Number(
                                                    item.quantity
                                                ) > 0
                                                    ? Number(
                                                        item.quantity
                                                    )
                                                    : 1,
                                        }
                                        : item
                            ),
                };
            }
        );

        setQuotationError("");
        setQuotationMessage("");
    }


    /* =========================================================
       UPDATE QUOTATION FROM BACKEND (PERSIST)
    ========================================================= */

    const updateQuotationFromBackend = async ({
        showMessage = true,
        throwErrors = false,
    } = {}) => {
        if (!currentQuotation?.items?.length) {
            const message =
                "There are no quotation items to update.";

            setQuotationError(message);

            if (throwErrors) {
                throw new Error(message);
            }

            return null;
        }

        setQuotationUpdating(true);
        setQuotationError("");

        if (showMessage) {
            setQuotationMessage("");
        }

        try {
            /*
             * IMPORTANT:
             *
             * Send `included: false` for removed items even if
             * they still carry a positive quantity locally.
             * Django is the source of truth for prices, but
             * `included` and `quantity` are the two values
             * the client is allowed to change.
             */
            const itemsPayload = currentQuotation.items.map(
                (item) => ({
                    id: String(item.id),

                    quantity:
                        Number(item.quantity) || 0,

                    included:
                        item.included !== false,
                })
            );

            console.table(
                currentQuotation.items.map((item) => ({
                    id: item.id,
                    name: item.name,
                    quantity: item.quantity,
                    included: item.included,
                    unit_price: item.unit_price,
                }))
            );

            console.log(
                "FINAL QUOTATION PAYLOAD:",
                JSON.stringify(
                    {
                        items: itemsPayload,
                    },
                    null,
                    2
                )
            );

            const response = await fetch(
                `${API_URL}/api/proposals/client/${publicToken}/quotation/update/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify({
                        items: itemsPayload,
                    }),
                }
            );

            const responseText =
                await response.text();

            let data = {};

            try {
                data = responseText
                    ? JSON.parse(responseText)
                    : {};
            } catch {
                throw new Error(
                    `Server returned an invalid response (${response.status}).`
                );
            }

            console.log(
                "UPDATED QUOTATION FROM DJANGO:",
                data
            );

            if (!response.ok) {
                throw new Error(
                    data?.detail ||
                    data?.error ||
                    "Unable to update quotation."
                );
            }

            if (data?.success === false) {
                throw new Error(
                    data?.detail ||
                    data?.error ||
                    "Unable to update quotation."
                );
            }

            const savedQuotation =
                data.quotation;

            /*
             * Django returns the full quotation, but removed
             * items come back with quantity = 0.
             *
             * We merge with our local items so that:
             *
             * - Saved items get Django's authoritative prices.
             * - Removed items keep their local data so the
             *   Restore button still works.
             */
            const localItems =
                currentQuotation?.items || [];

            const savedItems =
                savedQuotation?.items || [];

            const savedItemMap =
                new Map(
                    savedItems.map(
                        (item) => [
                            String(item.id),
                            item,
                        ]
                    )
                );

            const mergedItems =
                localItems.map(
                    (localItem) => {
                        const savedItem =
                            savedItemMap.get(
                                String(
                                    localItem.id
                                )
                            );

                        if (!savedItem) {
                            /*
                             * Django did not return this item.
                             * Mark it removed locally.
                             */
                            return {
                                ...localItem,
                                included: false,
                            };
                        }

                        const savedQuantity =
                            Number(
                                savedItem.quantity
                            ) || 0;

                        const isIncluded =
                            savedQuantity > 0 &&
                            localItem.included !== false;

                        return {
                            ...localItem,
                            ...savedItem,

                            quantity:
                                isIncluded
                                    ? savedQuantity
                                    : Number(
                                        localItem.quantity
                                    ) || savedQuantity,

                            included: isIncluded,
                        };
                    }
                );

            const normalizedQuotation = {
                ...savedQuotation,

                items: mergedItems,
            };

            /*
             * Replace the local editable quotation with what
             * Django actually saved.
             */
            setEditableQuotation(
                normalizedQuotation
            );

            /*
             * Also update the main proposal so the totals
             * shown outside the QuotationSection stay in
             * sync.
             */
            setProposal((previous) => {
                if (!previous) return previous;

                return {
                    ...previous,

                    quotation:
                        normalizedQuotation,

                    total_price:
                        data.total_price,

                    formatted_total:
                        data.formatted_total,
                };
            });

            if (showMessage) {
                setQuotationMessage(
                    data?.message ||
                    "Quotation saved successfully."
                );
            }

            return normalizedQuotation;

        } catch (error) {
            console.error(
                "UPDATE QUOTATION ERROR:",
                error
            );

            setQuotationError(
                error?.message ||
                "Unable to update quotation."
            );

            if (throwErrors) {
                throw error;
            }

            return null;

        } finally {
            setQuotationUpdating(false);
        }
    };


    /* =========================================================
       QUOTATION SELECTED ITEMS
    ========================================================= */

    const selectedQuotationItems =
        useMemo(() => {
            if (!currentQuotation?.items) {
                return [];
            }

            return currentQuotation.items.filter(
                (item) =>
                    item.included !== false
            );
        }, [currentQuotation]);


    const removedQuotationItems =
        useMemo(() => {
            if (!currentQuotation?.items) {
                return [];
            }

            return currentQuotation.items.filter(
                (item) =>
                    item.included === false
            );
        }, [currentQuotation]);


    /* =========================================================
       TOGGLE FEATURE
    ========================================================= */

    async function toggleFeature(
        feature
    ) {
        if (!canEditFeatures) {
            return;
        }

        if (
            updatingFeature ===
            feature.id
        ) {
            return;
        }

        setUpdatingFeature(
            feature.id
        );

        setError("");
        setDecisionError("");
        setDecisionMessage("");

        const url =
            `${API_URL}/api/proposals/client/${publicToken}/features/${feature.id}/toggle/`;

        try {
            const response =
                await fetch(
                    url,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",

                            Accept:
                                "application/json",
                        },
                    }
                );

            const responseText =
                await response.text();

            let data = {};

            try {
                data = responseText
                    ? JSON.parse(
                        responseText
                    )
                    : {};
            } catch {
                throw new Error(
                    `Server returned an invalid response (${response.status}).`
                );
            }

            if (!response.ok) {
                throw new Error(
                    data.error ||
                    data.detail ||
                    `Failed to update feature (${response.status}).`
                );
            }

            if (!data.success) {
                throw new Error(
                    data.error ||
                    "The feature could not be updated."
                );
            }

            await loadProposal();

        } catch (error) {
            console.error(
                "Feature toggle error:",
                error
            );

            setError(
                error.message ||
                "Unable to update feature."
            );

        } finally {
            setUpdatingFeature(
                null
            );
        }
    }


    /* =========================================================
       ACCEPTANCE
    ========================================================= */

    function openAcceptConfirmation() {
        if (
            !canEdit ||
            processingDecision
        ) {
            return;
        }

        setDecisionError("");
        setDecisionMessage("");

        setShowAcceptConfirmation(
            true
        );
    }


    async function acceptProposal() {
        if (
            !canEdit ||
            processingDecision
        ) {
            return;
        }

        setDecisionError("");
        setDecisionMessage("");

        try {
            setProcessingDecision(true);

            /*
             * Capture the client's current quotation
             * selections BEFORE making the acceptance request.
             *
             * Do not refresh from the server here because
             * that could replace the locally edited quantities
             * and removed items with the original quotation.
             */
            const quotationChanges =
                isQuotation
                    ? buildQuotationChanges()
                    : null;

            const requestBody = {
                comment: comment.trim(),
            };

            if (isQuotation) {
                requestBody.quotation_changes =
                    quotationChanges;
            }

            console.log(
                "ACCEPT REQUEST:",
                requestBody
            );

            const response =
                await fetch(
                    `${API_URL}/api/proposals/client/${publicToken}/accept/`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",

                            Accept:
                                "application/json",
                        },

                        body: JSON.stringify(
                            requestBody
                        ),
                    }
                );

            const responseText =
                await response.text();

            let data = {};

            try {
                data = responseText
                    ? JSON.parse(
                        responseText
                    )
                    : {};
            } catch {
                throw new Error(
                    `Server returned an invalid response (${response.status}).`
                );
            }

            if (!response.ok) {
                throw new Error(
                    data.error ||
                    data.detail ||
                    "Unable to accept proposal."
                );
            }

            if (!data.success) {
                throw new Error(
                    data.error ||
                    "Unable to accept proposal."
                );
            }

            setAcceptanceResult(data);

            setShowAcceptConfirmation(false);

            setComment("");

            setShowAcceptanceSuccess(true);

            /*
             * Reload the authoritative proposal AFTER
             * Django has accepted and saved it.
             */
            await loadProposal();

        } catch (error) {
            console.error(
                "Accept proposal error:",
                error
            );

            setDecisionError(
                error.message ||
                "Unable to accept proposal."
            );

            setShowAcceptConfirmation(false);

        } finally {
            setProcessingDecision(false);
        }
    }

    /* =========================================================
       DECLINE
    ========================================================= */

    async function declineProposal() {
        if (
            !canEdit ||
            processingDecision
        ) {
            return;
        }

        const trimmedComment =
            comment.trim();

        setDecisionError("");
        setDecisionMessage("");

        if (
            trimmedComment.length < 5
        ) {
            setDecisionError(
                "Please provide a brief reason for declining the proposal."
            );

            return;
        }

        if (
            trimmedComment.length > 5000
        ) {
            setDecisionError(
                "Your comment is too long. Please keep it under 5000 characters."
            );

            return;
        }

        const confirmed =
            window.confirm(
                "Are you sure you want to decline this proposal?\n\n" +
                "Your reason will be sent to AB Technologies so our team can follow up with you."
            );

        if (!confirmed) {
            return;
        }

        try {
            setProcessingDecision(
                true
            );

            const response =
                await fetch(
                    `${API_URL}/api/proposals/client/${publicToken}/decline/`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",

                            Accept:
                                "application/json",
                        },

                        body: JSON.stringify({
                            comment:
                                trimmedComment,
                        }),
                    }
                );

            const responseText =
                await response.text();

            let data = {};

            try {
                data = responseText
                    ? JSON.parse(
                        responseText
                    )
                    : {};
            } catch {
                throw new Error(
                    `Server returned an invalid response (${response.status}).`
                );
            }

            if (!response.ok) {
                throw new Error(
                    data.error ||
                    data.detail ||
                    data.message ||
                    `Unable to decline proposal (${response.status}).`
                );
            }

            if (!data.success) {
                throw new Error(
                    data.error ||
                    data.detail ||
                    data.message ||
                    "Unable to decline proposal."
                );
            }

            setComment("");

            setDecisionMessage(
                data.message ||
                "Your proposal has been declined successfully."
            );

            const redirectUrl =
                data.redirect_url ||
                "/support";

            window.setTimeout(
                () => {
                    window.location.href =
                        redirectUrl;
                },
                2000
            );

        } catch (error) {
            console.error(
                "Decline proposal error:",
                error
            );

            setDecisionError(
                error?.message ||
                "Unable to decline proposal. Please try again."
            );

        } finally {
            setProcessingDecision(
                false
            );
        }
    }


    /* =========================================================
       LOADING
    ========================================================= */

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">

                <div className="text-center">

                    <div className="mx-auto w-10 h-10 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin" />

                    <p className="mt-4 text-gray-600">
                        Loading proposal...
                    </p>

                </div>

            </div>
        );
    }


    /* =========================================================
       ERROR
    ========================================================= */

    if (
        error &&
        !proposal
    ) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">

                <div className="max-w-md w-full bg-white rounded-2xl border shadow-sm p-8 text-center">

                    <div className="mx-auto w-14 h-14 rounded-full bg-red-50 flex items-center justify-center text-red-600 text-2xl">
                        !
                    </div>

                    <h1 className="mt-5 text-xl font-semibold text-gray-900">
                        Unable to load proposal
                    </h1>

                    <p className="mt-3 text-gray-600">
                        {error}
                    </p>

                    <button
                        type="button"
                        onClick={
                            loadProposal
                        }
                        className="mt-6 px-5 py-3 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-800 transition"
                    >
                        Try Again
                    </button>

                </div>

            </div>
        );
    }


    if (!proposal) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">

                <div className="text-gray-600">
                    Proposal not found.
                </div>

            </div>
        );
    }


    /* =========================================================
       MAIN
    ========================================================= */

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">

            {/* =================================================
                HEADER
            ================================================= */}

            <header className="bg-white border-b sticky top-0 z-20">

                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5">

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                        <div>

                            <p className="text-sm font-bold tracking-wide text-blue-600">
                                AB TECHNOLOGIES
                            </p>

                            <h1 className="text-xl sm:text-2xl font-bold mt-1">
                                {proposal.title}
                            </h1>

                        </div>

                        <div className="sm:text-right">

                            <p className="text-xs uppercase tracking-wider text-gray-500">
                                {isQuotation
                                    ? "Quotation"
                                    : "Proposal"}
                            </p>

                            <p className="text-sm font-medium mt-1">
                                Version{" "}
                                {proposal.version}
                            </p>

                        </div>

                    </div>

                </div>

            </header>


            <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">

                {/* =================================================
                    GLOBAL ERROR
                ================================================= */}

                {error &&
                    proposal && (
                        <div className="mb-6 rounded-xl bg-red-50 border border-red-200 text-red-700 px-4 py-3">

                            <div className="flex gap-3">

                                <span className="font-bold">
                                    !
                                </span>

                                <p className="text-sm">
                                    {error}
                                </p>

                            </div>

                        </div>
                    )}


                {/* =================================================
                    ACCEPTED BANNER
                ================================================= */}

                {isAccepted && (
                    <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 p-5">

                        <div className="flex gap-4">

                            <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold shrink-0">
                                ✓
                            </div>

                            <div>

                                <h2 className="font-semibold text-green-900">
                                    {isQuotation
                                        ? "Quotation Accepted"
                                        : "Proposal Accepted"}
                                </h2>

                                <p className="mt-1 text-sm text-green-800">
                                    Your selected scope and investment
                                    have been confirmed and locked.
                                </p>

                            </div>

                        </div>

                    </div>
                )}


                {/* =================================================
                    DECLINED BANNER
                ================================================= */}

                {isRejected && (
                    <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-5">

                        <div className="flex gap-4">

                            <div className="w-10 h-10 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold shrink-0">
                                !
                            </div>

                            <div>

                                <h2 className="font-semibold text-red-900">
                                    {isQuotation
                                        ? "Quotation Declined"
                                        : "Proposal Declined"}
                                </h2>

                                <p className="mt-1 text-sm text-red-800">
                                    This{" "}
                                    {isQuotation
                                        ? "quotation"
                                        : "proposal"}{" "}
                                    has been declined.
                                    Our team will review your feedback
                                    and follow up if necessary.
                                </p>

                            </div>

                        </div>

                    </div>
                )}


                {/* =================================================
                    EXPIRED BANNER
                ================================================= */}

                {isExpired && (
                    <div className="mb-6 rounded-2xl border border-orange-200 bg-orange-50 p-5">

                        <div className="flex gap-4">

                            <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold shrink-0">
                                !
                            </div>

                            <div>

                                <h2 className="font-semibold text-orange-900">
                                    {isQuotation
                                        ? "Quotation Expired"
                                        : "Proposal Expired"}
                                </h2>

                                <p className="mt-1 text-sm text-orange-800">
                                    This{" "}
                                    {isQuotation
                                        ? "quotation"
                                        : "proposal"}{" "}
                                    is no longer available
                                    for acceptance or modification.
                                </p>

                            </div>

                        </div>

                    </div>
                )}


                {/* =================================================
                    HERO
                ================================================= */}

                <section className="bg-white rounded-2xl shadow-sm border p-6 sm:p-8">

                    <div className="max-w-4xl">

                        <div className="flex flex-wrap items-center gap-2">

                            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                                {isQuotation
                                    ? "Procurement Quotation"
                                    : "Software Proposal"}
                            </span>

                            {isQuotation && (
                                <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
                                    Procurement
                                </span>
                            )}

                        </div>

                        <h2 className="text-2xl sm:text-3xl font-bold mt-3">
                            {proposal.title}
                        </h2>

                        {proposal.client_summary && (
                            <p className="mt-5 text-gray-600 leading-7 text-base sm:text-lg">
                                {proposal.client_summary}
                            </p>
                        )}

                    </div>

                </section>


                {/* =================================================
                    PROCUREMENT QUOTATION
                ================================================= */}

                {isQuotation &&
                    currentQuotation && (

                        <QuotationSection
                            quotation={
                                currentQuotation
                            }

                            editable={
                                canEditQuotation
                            }

                            quotationUpdating={
                                quotationUpdating
                            }

                            quotationError={
                                quotationError
                            }

                            quotationMessage={
                                quotationMessage
                            }

                            selectedItems={
                                selectedQuotationItems
                            }

                            removedItems={
                                removedQuotationItems
                            }

                            onQuantityChange={
                                updateQuotationQuantity
                            }

                            onRemoveItem={
                                removeQuotationItem
                            }

                            onRestoreItem={
                                restoreQuotationItem
                            }

                            updateQuotationFromBackend={() =>
                                updateQuotationFromBackend(
                                    {
                                        showMessage:
                                            true,
                                        throwErrors:
                                            false,
                                    }
                                )
                            }
                        />

                    )}


                {/* =================================================
                    PROJECT INVESTMENT
                ================================================= */}

                <section className="mt-8 bg-white rounded-2xl shadow-sm border p-6 sm:p-8">

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-7">

                        <div>

                            <p className="text-sm text-gray-500">
                                {isQuotation
                                    ? "Current Quotation Total"
                                    : "Current Project Investment"}
                            </p>

                            <p className="text-3xl sm:text-4xl font-bold mt-2">
                                {getProposalTotal(
                                    proposal,
                                    currentQuotation
                                )}
                            </p>

                            <p className="text-sm text-gray-500 mt-2 max-w-2xl">
                                {isQuotation
                                    ? "The total reflects the products and quantities currently selected above."
                                    : "This is the current total for the selected project scope. You can add or remove requirements before accepting the proposal."}
                            </p>

                        </div>

                        <div>
                            <StatusBadge
                                status={
                                    proposal.status
                                }
                            />
                        </div>

                    </div>


                    {!isQuotation && (

                        <div className="mt-8 grid sm:grid-cols-2 gap-4">

                            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">

                                <p className="text-xs uppercase tracking-wide text-gray-500">
                                    Included Requirements
                                </p>

                                <p className="mt-2 text-2xl font-bold text-gray-900">
                                    {includedFeatureCount}
                                </p>

                                <p className="mt-1 text-sm text-gray-500">
                                    Currently included in your project scope
                                </p>

                            </div>


                            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">

                                <p className="text-xs uppercase tracking-wide text-gray-500">
                                    Optional Requirements
                                </p>

                                <p className="mt-2 text-2xl font-bold text-gray-900">
                                    {optionalFeatures.length}
                                </p>

                                <p className="mt-1 text-sm text-gray-500">
                                    Available to add before acceptance
                                </p>

                            </div>

                        </div>

                    )}

                </section>


                {/* =================================================
                    BUSINESS OBJECTIVES
                ================================================= */}

                {proposal.business_objectives?.length >
                    0 && (

                        <section className="mt-8 bg-white rounded-2xl border p-6 sm:p-8">

                            <h2 className="text-2xl font-bold">
                                Business Objectives
                            </h2>

                            <div className="mt-6 space-y-4">

                                {proposal.business_objectives.map(
                                    (
                                        objective,
                                        index
                                    ) => (

                                        <div
                                            key={index}
                                            className="flex gap-4"
                                        >

                                            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-semibold shrink-0">
                                                {index +
                                                    1}
                                            </div>

                                            <p className="text-gray-700 leading-6">
                                                {typeof objective ===
                                                    "string"
                                                    ? objective
                                                    : objective.title ||
                                                    objective.description ||
                                                    JSON.stringify(
                                                        objective
                                                    )}
                                            </p>

                                        </div>

                                    )
                                )}

                            </div>

                        </section>

                    )}


                {/* =================================================
                    SOFTWARE REQUIREMENTS
                ================================================= */}

                {!isQuotation && (
                    <>
                        <FeatureSection
                            title="Confirmed Requirements"
                            description="These requirements are currently included in your project scope. You can remove any requirement if you change your mind or no longer need it."
                            features={
                                requiredFeatures
                            }
                            editable={
                                canEditFeatures
                            }
                            updatingFeature={
                                updatingFeature
                            }
                            onToggle={
                                toggleFeature
                            }
                        />


                        <FeatureSection
                            title="Recommended Features"
                            description="These features are currently included in your project. You can remove any feature you do not want."
                            features={
                                recommendedFeatures
                            }
                            editable={
                                canEditFeatures
                            }
                            updatingFeature={
                                updatingFeature
                            }
                            onToggle={
                                toggleFeature
                            }
                        />


                        <FeatureSection
                            title="Optional / Future Features"
                            description="These features are currently outside the selected scope. Add any feature you would like included before accepting the proposal."
                            features={
                                optionalFeatures
                            }
                            editable={
                                canEditFeatures
                            }
                            updatingFeature={
                                updatingFeature
                            }
                            onToggle={
                                toggleFeature
                            }
                        />
                    </>
                )}


                {/* =================================================
                    PAGES & SCREENS
                ================================================= */}

                {proposal.screens?.length >
                    0 && (

                        <section className="mt-8 bg-white rounded-2xl border p-6 sm:p-8">

                            <h2 className="text-2xl font-bold">
                                Pages & Screens
                            </h2>

                            <p className="mt-2 text-gray-600">
                                These screens describe the project scope
                                and user experience. They are not priced
                                individually.
                            </p>

                            <div className="mt-6 grid md:grid-cols-2 gap-5">

                                {proposal.screens.map(
                                    (
                                        screen,
                                        index
                                    ) => (

                                        <div
                                            key={
                                                screen.id ||
                                                screen.name ||
                                                index
                                            }
                                            className="border rounded-xl p-5"
                                        >

                                            <h3 className="font-semibold text-lg">
                                                {
                                                    screen.name
                                                }
                                            </h3>

                                            {screen.screen_type && (
                                                <p className="text-sm text-blue-600 mt-1">
                                                    {
                                                        screen.screen_type
                                                    }
                                                </p>
                                            )}

                                            {screen.purpose && (
                                                <p className="text-gray-600 mt-3">
                                                    {
                                                        screen.purpose
                                                    }
                                                </p>
                                            )}

                                            {screen.actions?.length >
                                                0 && (

                                                    <div className="mt-4">

                                                        <p className="text-sm font-semibold">
                                                            Key Actions
                                                        </p>

                                                        <ul className="mt-2 list-disc list-inside text-sm text-gray-600 space-y-1">

                                                            {screen.actions.map(
                                                                (
                                                                    action,
                                                                    actionIndex
                                                                ) => (

                                                                    <li
                                                                        key={
                                                                            actionIndex
                                                                        }
                                                                    >
                                                                        {typeof action ===
                                                                            "string"
                                                                            ? action
                                                                            : JSON.stringify(
                                                                                action
                                                                            )}
                                                                    </li>

                                                                )
                                                            )}

                                                        </ul>

                                                    </div>

                                                )}

                                        </div>

                                    )
                                )}

                            </div>

                        </section>

                    )}


                {/* =================================================
                    SECURITY
                ================================================= */}

                {proposal.security &&
                    Object.keys(
                        proposal.security
                    ).length > 0 && (

                        <DataSection
                            title="Security"
                            data={
                                proposal.security
                            }
                        />

                    )}


                {/* =================================================
                    TECHNICAL SCOPE
                ================================================= */}

                {proposal.technical_scope &&
                    Object.keys(
                        proposal.technical_scope
                    ).length > 0 && (

                        <DataSection
                            title="Technical Scope"
                            data={
                                proposal.technical_scope
                            }
                        />

                    )}


                {/* =================================================
                    DELIVERABLES
                ================================================= */}

                {proposal.deliverables?.length >
                    0 && (

                        <section className="mt-8 bg-white rounded-2xl border p-6 sm:p-8">

                            <h2 className="text-2xl font-bold">
                                Deliverables
                            </h2>

                            <ul className="mt-6 space-y-3">

                                {proposal.deliverables.map(
                                    (
                                        item,
                                        index
                                    ) => (

                                        <li
                                            key={
                                                index
                                            }
                                            className="flex gap-3 text-gray-700"
                                        >

                                            <span className="text-green-600 font-semibold">
                                                ✓
                                            </span>

                                            <span>
                                                {typeof item ===
                                                    "string"
                                                    ? item
                                                    : JSON.stringify(
                                                        item
                                                    )}
                                            </span>

                                        </li>

                                    )
                                )}

                            </ul>

                        </section>

                    )}


                {/* =================================================
                    MILESTONES
                ================================================= */}

                {proposal.milestones?.length >
                    0 && (

                        <section className="mt-8 bg-white rounded-2xl border p-6 sm:p-8">

                            <h2 className="text-2xl font-bold">
                                Project Milestones
                            </h2>

                            <div className="mt-6 space-y-4">

                                {proposal.milestones.map(
                                    (
                                        milestone,
                                        index
                                    ) => (

                                        <div
                                            key={
                                                index
                                            }
                                            className="border-l-4 border-blue-500 pl-5"
                                        >

                                            <h3 className="font-semibold">
                                                {typeof milestone ===
                                                    "string"
                                                    ? milestone
                                                    : milestone.title ||
                                                    `Milestone ${index + 1}`}
                                            </h3>

                                            {typeof milestone !==
                                                "string" &&
                                                milestone.description && (

                                                    <p className="text-gray-600 mt-1">
                                                        {
                                                            milestone.description
                                                        }
                                                    </p>

                                                )}

                                        </div>

                                    )
                                )}

                            </div>

                        </section>

                    )}


                {/* =================================================
                    ASSUMPTIONS
                ================================================= */}

                <ListSection
                    title="Assumptions"
                    items={
                        proposal.assumptions
                    }
                />


                {/* =================================================
                    EXCLUSIONS
                ================================================= */}

                <ListSection
                    title="Exclusions"
                    items={
                        proposal.exclusions
                    }
                />


                {/* =================================================
                    RECURRING COSTS
                ================================================= */}

                {proposal.recurring_costs?.length >
                    0 && (

                        <ListSection
                            title="External / Recurring Costs"
                            description="These costs are paid to external providers and are separate from AB Technologies' development fee."
                            items={
                                proposal.recurring_costs
                            }
                        />

                    )}


                {/* =================================================
                    CLIENT DECISION
                ================================================= */}

                {canEdit && (

                    <section className="mt-10 bg-gray-900 text-white rounded-2xl p-6 sm:p-8">

                        <div className="max-w-3xl">

                            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
                                Final Review
                            </p>

                            <h2 className="text-2xl sm:text-3xl font-bold mt-2">
                                Ready to proceed?
                            </h2>

                            <p className="mt-3 text-gray-300 leading-6">
                                {isQuotation
                                    ? "Review the products and quantities above. You can change quantities or remove products before accepting the quotation."
                                    : "Review your selected requirements above. You can add or remove requirements before accepting the proposal."}
                            </p>


                            {isQuotation && (
                                <div className="mt-5 rounded-xl border border-gray-700 bg-gray-800 p-4">

                                    <div className="flex items-center justify-between gap-4">

                                        <span className="text-sm text-gray-400">
                                            Selected products
                                        </span>

                                        <span className="font-semibold">
                                            {
                                                selectedQuotationItems.length
                                            }
                                        </span>

                                    </div>

                                </div>
                            )}


                            <div className="mt-6">

                                <p className="text-sm text-gray-400">
                                    {isQuotation
                                        ? "Current quotation total"
                                        : "Current project investment"}
                                </p>

                                <p className="text-3xl font-bold mt-1">
                                    {getProposalTotal(
                                        proposal,
                                        currentQuotation
                                    )}
                                </p>

                            </div>


                            <div className="mt-7">

                                <label
                                    htmlFor="proposal-comment"
                                    className="block text-sm font-medium text-gray-200"
                                >
                                    Comment or feedback
                                </label>

                                <textarea
                                    id="proposal-comment"
                                    value={
                                        comment
                                    }
                                    onChange={(
                                        event
                                    ) => {
                                        setComment(
                                            event.target.value
                                        );

                                        setDecisionError(
                                            ""
                                        );

                                        setDecisionMessage(
                                            ""
                                        );
                                    }}
                                    rows={5}
                                    maxLength={
                                        5000
                                    }
                                    disabled={
                                        processingDecision
                                    }
                                    placeholder={
                                        isQuotation
                                            ? "Add a comment, question, or feedback about the quotation..."
                                            : "Add a comment, question, or feedback..."
                                    }
                                    className="mt-2 w-full rounded-xl border border-gray-700 bg-gray-800 text-white placeholder-gray-500 px-4 py-3 outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-700 disabled:opacity-50"
                                />

                                <div className="mt-1 text-right text-xs text-gray-500">
                                    {
                                        comment.length
                                    }
                                    /5000
                                </div>

                            </div>


                            {decisionError && (

                                <div className="mt-4 rounded-xl border border-red-800 bg-red-950/50 px-4 py-3 text-sm text-red-300">
                                    {
                                        decisionError
                                    }
                                </div>

                            )}


                            {decisionMessage && (

                                <div className="mt-4 rounded-xl border border-green-800 bg-green-950/50 px-4 py-3 text-sm text-green-300">
                                    {
                                        decisionMessage
                                    }
                                </div>

                            )}


                            <div className="mt-6 flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">

                                <button
                                    type="button"
                                    onClick={
                                        declineProposal
                                    }
                                    disabled={
                                        processingDecision
                                    }
                                    className="px-6 py-3 rounded-xl border border-red-700 text-red-300 font-semibold hover:bg-red-950/50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {
                                        processingDecision
                                            ? "Processing..."
                                            : "Decline Proposal"
                                    }
                                </button>


                                <button
                                    type="button"
                                    onClick={
                                        openAcceptConfirmation
                                    }
                                    disabled={
                                        processingDecision ||
                                        quotationUpdating
                                    }
                                    className="px-7 py-3 rounded-xl bg-white text-gray-900 font-semibold hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isQuotation
                                        ? "Accept Quotation"
                                        : "Accept Proposal"}
                                </button>

                            </div>

                        </div>

                    </section>

                )}


                {/* =================================================
                    LOCKED STATE
                ================================================= */}

                {!canEdit &&
                    (isAccepted ||
                        isRejected) && (

                        <section className="mt-10 bg-white rounded-2xl border p-8">

                            <div className="text-center max-w-2xl mx-auto">

                                <div
                                    className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold ${isAccepted
                                        ? "bg-green-50 text-green-600"
                                        : "bg-red-50 text-red-600"
                                        }`}
                                >
                                    {isAccepted
                                        ? "✓"
                                        : "!"}
                                </div>


                                <h2 className="mt-5 text-2xl font-bold">
                                    {isAccepted
                                        ? isQuotation
                                            ? "Quotation Accepted"
                                            : "Proposal Accepted"
                                        : isQuotation
                                            ? "Quotation Declined"
                                            : "Proposal Declined"}
                                </h2>


                                <p className="mt-3 text-gray-600 leading-6">

                                    {isAccepted
                                        ? "Your selected scope and investment have been confirmed."
                                        : "Thank you for your feedback. Our team will review the response and follow up if necessary."}

                                </p>


                                {isAccepted && (
                                    <p className="mt-5 text-sm text-gray-500">
                                        Final investment:{" "}
                                        <strong>
                                            {getProposalTotal(
                                                proposal,
                                                currentQuotation
                                            )}
                                        </strong>
                                    </p>
                                )}

                            </div>

                        </section>

                    )}


                {/* =================================================
                    FOOTER
                ================================================= */}

                <footer className="mt-12 pb-8 text-center">

                    <p className="text-sm text-gray-500">
                        AB TECHNOLOGIES
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                        Technology. Simplified.
                    </p>

                </footer>

            </main>


            {/* =====================================================
                ACCEPTANCE CONFIRMATION MODAL
            ===================================================== */}

            {showAcceptConfirmation && (

                <ModalOverlay>

                    <div className="relative w-full max-w-lg rounded-3xl bg-white shadow-2xl">

                        <div className="p-6 sm:p-8">

                            <div className="flex items-start gap-4">

                                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">

                                    <svg
                                        className="w-6 h-6"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 12l2 2 4-4"
                                        />

                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>

                                </div>

                                <div>

                                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                                        Confirm{" "}
                                        {
                                            isQuotation
                                                ? "Quotation"
                                                : "Proposal"
                                        }{" "}
                                        Acceptance
                                    </h2>

                                    <p className="mt-2 text-gray-600 leading-6">
                                        You are about to accept the current
                                        {
                                            isQuotation
                                                ? " products, quantities and quotation total."
                                                : " scope and investment."
                                        }
                                    </p>

                                </div>

                            </div>


                            {isQuotation && (
                                <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4">

                                    <p className="text-sm font-semibold text-blue-900">
                                        Quotation summary
                                    </p>

                                    <div className="mt-3 space-y-2 text-sm">

                                        <div className="flex justify-between gap-4">

                                            <span className="text-blue-700">
                                                Selected products
                                            </span>

                                            <span className="font-semibold text-blue-900">
                                                {
                                                    selectedQuotationItems.length
                                                }
                                            </span>

                                        </div>

                                        <div className="flex justify-between gap-4">

                                            <span className="text-blue-700">
                                                Removed products
                                            </span>

                                            <span className="font-semibold text-blue-900">
                                                {
                                                    removedQuotationItems.length
                                                }
                                            </span>

                                        </div>

                                    </div>

                                </div>
                            )}


                            <div className="mt-6 rounded-2xl bg-gray-50 border border-gray-200 p-5">

                                <p className="text-sm text-gray-500">
                                    Final Investment
                                </p>

                                <p className="mt-1 text-2xl font-bold text-gray-900">
                                    {getProposalTotal(
                                        proposal,
                                        currentQuotation
                                    )}
                                </p>

                            </div>


                            <div className="mt-5 space-y-3">

                                <div className="flex gap-3">

                                    <span className="text-green-600 font-bold">
                                        ✓
                                    </span>

                                    <p className="text-sm text-gray-600">
                                        Your current selected{" "}
                                        {
                                            isQuotation
                                                ? "products and quantities"
                                                : "scope"
                                        }{" "}
                                        will become the confirmed{" "}
                                        {
                                            isQuotation
                                                ? "quotation"
                                                : "scope"
                                        }.
                                    </p>

                                </div>

                                <div className="flex gap-3">

                                    <span className="text-green-600 font-bold">
                                        ✓
                                    </span>

                                    <p className="text-sm text-gray-600">
                                        The{" "}
                                        {
                                            isQuotation
                                                ? "quotation"
                                                : "proposal"
                                        }{" "}
                                        will no longer be editable
                                        after acceptance.
                                    </p>

                                </div>

                            </div>


                            <div className="mt-8 flex flex-col-reverse sm:flex-row gap-3">

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowAcceptConfirmation(
                                            false
                                        )
                                    }
                                    disabled={
                                        processingDecision
                                    }
                                    className="flex-1 rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
                                >
                                    Go Back
                                </button>


                                <button
                                    type="button"
                                    onClick={
                                        acceptProposal
                                    }
                                    disabled={
                                        processingDecision ||
                                        quotationUpdating
                                    }
                                    className="flex-1 rounded-xl bg-gray-900 px-5 py-3 font-semibold text-white hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processingDecision
                                        ? "Accepting..."
                                        : "Confirm & Accept"}
                                </button>

                            </div>

                        </div>

                    </div>

                </ModalOverlay>

            )}


            {/* =====================================================
                ACCEPTANCE SUCCESS MODAL
            ===================================================== */}

            {showAcceptanceSuccess && (

                <ModalOverlay>

                    <div className="relative w-full max-w-lg rounded-3xl bg-white shadow-2xl overflow-hidden">

                        <div className="bg-gray-900 px-6 sm:px-8 py-8 text-center text-white">

                            <div className="mx-auto w-16 h-16 rounded-full bg-green-500/20 border border-green-400/30 flex items-center justify-center">

                                <svg
                                    className="w-9 h-9 text-green-400"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>

                            </div>

                            <h2 className="mt-5 text-2xl sm:text-3xl font-bold">
                                {isQuotation
                                    ? "Quotation Accepted"
                                    : "Proposal Accepted"}
                            </h2>

                            <p className="mt-2 text-gray-300">
                                Your request is now confirmed.
                            </p>

                        </div>


                        <div className="p-6 sm:p-8">

                            <p className="text-gray-700 leading-7">
                                Thank you for choosing AB Technologies.
                                Your selected scope and investment
                                have been successfully confirmed.
                            </p>


                            <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-5">

                                <div className="flex gap-4">

                                    <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                                        ✓
                                    </div>

                                    <div>

                                        <h3 className="font-semibold text-blue-900">
                                            Your Client Portal is ready
                                        </h3>

                                        <p className="mt-1 text-sm text-blue-800 leading-6">
                                            You can now log in to your
                                            client account to follow
                                            your request, receive updates,
                                            communicate with our team and
                                            monitor your project progress.
                                        </p>

                                    </div>

                                </div>

                            </div>


                            <div className="mt-5 space-y-3">

                                <div className="flex items-start gap-3">

                                    <div className="w-7 h-7 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0 font-bold text-sm">
                                        ✓
                                    </div>

                                    <div>

                                        <p className="font-medium text-gray-900">
                                            Login details emailed
                                        </p>

                                        <p className="text-sm text-gray-500 mt-0.5">
                                            Your client portal login details
                                            have been sent to your email
                                            address.
                                        </p>

                                    </div>

                                </div>


                                <div className="flex items-start gap-3">

                                    <div className="w-7 h-7 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0 font-bold text-sm">
                                        ✓
                                    </div>

                                    <div>

                                        <p className="font-medium text-gray-900">
                                            Accepted document emailed
                                        </p>

                                        <p className="text-sm text-gray-500 mt-0.5">
                                            A copy of your accepted{" "}
                                            {
                                                isQuotation
                                                    ? "quotation"
                                                    : "proposal"
                                            }{" "}
                                            has also been sent to your email.
                                        </p>

                                    </div>

                                </div>

                            </div>


                            <div className="mt-6 rounded-xl bg-gray-50 px-4 py-3">

                                <p className="text-xs text-gray-500 leading-5">
                                    Please check your inbox, including your
                                    spam or junk folder if you do not see the
                                    email shortly.
                                </p>

                            </div>


                            <button
                                type="button"
                                onClick={() => {
                                    window.location.href =
                                        acceptanceResult?.redirect_url ||
                                        "/portal";
                                }}
                                className="mt-7 w-full rounded-xl bg-gray-900 px-6 py-4 font-semibold text-white hover:bg-gray-800 transition"
                            >
                                Go to Client Portal
                            </button>


                            <p className="mt-4 text-center text-xs text-gray-400">
                                Your accepted scope is now locked.
                            </p>

                        </div>

                    </div>

                </ModalOverlay>

            )}

        </div>
    );
}


/* =============================================================
   PROCUREMENT QUOTATION SECTION
============================================================= */

function QuotationSection({
    quotation,
    editable = false,
    quotationUpdating = false,
    quotationError = "",
    quotationMessage = "",
    selectedItems = [],
    removedItems = [],
    onQuantityChange,
    onRemoveItem,
    onRestoreItem,
    updateQuotationFromBackend,
}) {
    const allItems =
        quotation?.items || [];

    const currency =
        quotation?.currency || "NGN";


    return (
        <section className="mt-8 bg-white rounded-2xl border shadow-sm overflow-hidden">

            {/* HEADER */}

            <div className="bg-gray-900 text-white px-6 sm:px-8 py-7">

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                    <div>

                        <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
                            AB Technologies
                        </p>

                        <h2 className="mt-2 text-2xl sm:text-3xl font-bold">
                            Procurement Quotation
                        </h2>

                        <p className="mt-2 text-gray-300">
                            {editable
                                ? "Review the products, change quantities or remove products before accepting."
                                : "Itemized pricing for your requested products."}
                        </p>

                    </div>


                    <div className="lg:text-right">

                        <p className="text-xs uppercase tracking-wide text-gray-400">
                            Quotation Status
                        </p>

                        <div className="mt-2">
                            <QuotationStatusBadge
                                status={
                                    quotation.status
                                }
                            />
                        </div>

                    </div>

                </div>

            </div>


            {/* EDITING NOTICE */}

            {editable && (

                <div className="px-6 sm:px-8 py-5 border-b bg-blue-50">

                    <div className="flex gap-3">

                        <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 font-bold">
                            i
                        </div>

                        <div>

                            <p className="font-semibold text-blue-900">
                                Review your quotation
                            </p>

                            <p className="mt-1 text-sm text-blue-800 leading-6">
                                You can change the quantity of any product
                                or remove products you do not need. Unit
                                prices, brands, models and specifications
                                are fixed by AB Technologies.
                            </p>

                        </div>

                    </div>

                </div>

            )}


            {/* ERROR */}

            {quotationError && (

                <div className="mx-6 sm:mx-8 mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">

                    {quotationError}

                </div>

            )}


            {/* SUCCESS */}

            {quotationMessage && (

                <div className="mx-6 sm:mx-8 mt-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">

                    {quotationMessage}

                </div>

            )}


            {/* REQUEST INFORMATION */}

            <div className="px-6 sm:px-8 py-6 border-b bg-gray-50">

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">

                    <QuotationMeta
                        label="Currency"
                        value={
                            currency
                        }
                    />

                    <QuotationMeta
                        label="Selected Products"
                        value={`${selectedItems.length}`}
                    />

                    {quotation.deadline && (
                        <QuotationMeta
                            label="Requested Deadline"
                            value={formatDate(
                                quotation.deadline
                            )}
                        />
                    )}

                    {quotation.budget && (
                        <QuotationMeta
                            label="Client Budget"
                            value={formatCurrency(
                                quotation.budget,
                                currency
                            )}
                        />
                    )}

                </div>

            </div>


            {/* DESCRIPTION */}

            {(quotation.description ||
                quotation.purpose) && (

                    <div className="px-6 sm:px-8 py-6 border-b">

                        {quotation.description && (
                            <div>

                                <p className="text-xs uppercase tracking-wide font-semibold text-gray-500">
                                    Request
                                </p>

                                <p className="mt-2 text-gray-700 leading-6">
                                    {
                                        quotation.description
                                    }
                                </p>

                            </div>
                        )}


                        {quotation.purpose && (
                            <div className="mt-5">

                                <p className="text-xs uppercase tracking-wide font-semibold text-gray-500">
                                    Purpose
                                </p>

                                <p className="mt-2 text-gray-700 leading-6">
                                    {
                                        quotation.purpose
                                    }
                                </p>

                            </div>
                        )}

                    </div>

                )}


            {/* ITEM TABLE */}

            <div className="px-4 sm:px-8 py-6">

                <div className="flex items-center justify-between gap-4 mb-5">

                    <div>

                        <h3 className="text-lg font-bold text-gray-900">
                            Quoted Items
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                            {editable
                                ? "Adjust quantities or remove products as needed."
                                : "Pricing confirmed by AB Technologies."}
                        </p>

                    </div>

                    <span className="hidden sm:inline-flex px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold">
                        {selectedItems.length}{" "}
                        {selectedItems.length === 1
                            ? "item"
                            : "items"}
                    </span>

                </div>


                {selectedItems.length === 0 ? (

                    <div className="rounded-xl border border-dashed border-red-300 bg-red-50 p-8 text-center">

                        <p className="text-sm text-red-600">
                            At least one product must remain selected.
                        </p>

                    </div>

                ) : (

                    <>
                        {/* DESKTOP */}

                        <div className="hidden sm:block overflow-x-auto rounded-xl border border-gray-200">

                            <table className="w-full min-w-[900px]">

                                <thead className="bg-gray-50 border-b">

                                    <tr>

                                        <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            Item
                                        </th>

                                        <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            Brand / Model
                                        </th>

                                        <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            Quantity
                                        </th>

                                        <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            Unit Price
                                        </th>

                                        <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            Total
                                        </th>

                                        {editable && (
                                            <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                Action
                                            </th>
                                        )}

                                    </tr>

                                </thead>


                                <tbody className="divide-y divide-gray-100">

                                    {selectedItems.map(
                                        (
                                            item,
                                            index
                                        ) => (

                                            <EditableQuotationItemRow
                                                key={
                                                    item.id ||
                                                    index
                                                }
                                                item={
                                                    item
                                                }
                                                currency={
                                                    currency
                                                }
                                                editable={
                                                    editable
                                                }
                                                onQuantityChange={
                                                    onQuantityChange
                                                }
                                                onRemove={
                                                    onRemoveItem
                                                }
                                            />

                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>


                        {/* MOBILE */}

                        <div className="sm:hidden space-y-3">

                            {selectedItems.map(
                                (
                                    item,
                                    index
                                ) => (

                                    <EditableQuotationMobileItem
                                        key={
                                            item.id ||
                                            index
                                        }
                                        item={
                                            item
                                        }
                                        currency={
                                            currency
                                        }
                                        editable={
                                            editable
                                        }
                                        onQuantityChange={
                                            onQuantityChange
                                        }
                                        onRemove={
                                            onRemoveItem
                                        }
                                    />

                                )
                            )}

                        </div>
                    </>

                )}

            </div>


            {/* REMOVED ITEMS */}

            {editable &&
                removedItems.length >
                0 && (

                    <div className="px-6 sm:px-8 pb-7">

                        <div className="rounded-xl border border-orange-200 bg-orange-50 p-5">

                            <div className="flex items-center justify-between gap-4">

                                <div>

                                    <h3 className="font-semibold text-orange-900">
                                        Removed Products
                                    </h3>

                                    <p className="text-sm text-orange-700 mt-1">
                                        These products will not be included
                                        if you accept the quotation.
                                    </p>

                                </div>

                                <span className="px-2.5 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold">
                                    {
                                        removedItems.length
                                    }
                                </span>

                            </div>


                            <div className="mt-4 space-y-2">

                                {removedItems.map(
                                    (
                                        item
                                    ) => (

                                        <div
                                            key={
                                                item.id
                                            }
                                            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-lg border border-orange-200 bg-white p-3"
                                        >

                                            <div>

                                                <p className="font-medium text-gray-900">
                                                    {
                                                        item.name
                                                    }
                                                </p>

                                                <p className="text-xs text-gray-500 mt-1">
                                                    Original quantity:{" "}
                                                    {
                                                        item.quantity
                                                    }
                                                </p>

                                            </div>


                                            <button
                                                type="button"
                                                onClick={() =>
                                                    onRestoreItem(
                                                        item.id
                                                    )
                                                }
                                                className="rounded-lg border border-green-200 px-3 py-2 text-sm font-semibold text-green-700 hover:bg-green-50"
                                            >
                                                Restore
                                            </button>

                                        </div>

                                    )
                                )}

                            </div>

                        </div>

                    </div>

                )}


            {/* UPDATE BUTTON */}

            {editable && (

                <div className="px-6 sm:px-8 pb-7">

                    <button
                        type="button"
                        onClick={
                            updateQuotationFromBackend}
                        disabled={
                            quotationUpdating
                        }
                        className="w-full sm:w-auto rounded-xl bg-gray-900 px-6 py-3 font-semibold text-white hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {quotationUpdating
                            ? "Saving quotation..."
                            : "Update Quotation Total"}
                    </button>

                    <p className="mt-2 text-xs text-gray-500">
                        Django will save your selected quantities and
                        recalculate the quotation using the original
                        approved prices.
                    </p>

                </div>

            )}


            {/* FINANCIAL SUMMARY */}

            <div className="px-6 sm:px-8 py-7 border-t bg-gray-50">

                <div className="ml-auto max-w-md space-y-3">

                    <MoneyRow
                        label="Subtotal"
                        value={
                            quotation.subtotal
                        }
                        currency={
                            currency
                        }
                    />


                    {Number(
                        quotation.discount ||
                        0
                    ) !== 0 && (

                            <MoneyRow
                                label="Discount"
                                value={
                                    quotation.discount
                                }
                                currency={
                                    currency
                                }
                                negative
                            />

                        )}


                    {Number(
                        quotation.tax ||
                        0
                    ) !== 0 && (

                            <MoneyRow
                                label="Tax"
                                value={
                                    quotation.tax
                                }
                                currency={
                                    currency
                                }
                            />

                        )}


                    {Number(
                        quotation.delivery_fee ||
                        0
                    ) !== 0 && (

                            <MoneyRow
                                label="Delivery"
                                value={
                                    quotation.delivery_fee
                                }
                                currency={
                                    currency
                                }
                            />

                        )}


                    <div className="pt-4 mt-4 border-t border-gray-300">

                        <div className="flex items-end justify-between gap-5">

                            <div>

                                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                                    Grand Total
                                </p>

                                <p className="text-xs text-gray-400 mt-1">
                                    Final quotation amount
                                </p>

                            </div>

                            <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                                {
                                    formatCurrency(
                                        quotation.total,
                                        currency
                                    )
                                }
                            </p>

                        </div>

                    </div>

                </div>

            </div>


            {/* NOTES */}

            {quotation.notes && (

                <div className="px-6 sm:px-8 py-6 border-t">

                    <p className="text-xs uppercase tracking-wide font-semibold text-gray-500">
                        Quotation Notes
                    </p>

                    <p className="mt-2 text-sm text-gray-600 leading-6 whitespace-pre-line">
                        {
                            quotation.notes
                        }
                    </p>

                </div>

            )}

        </section>
    );
}


/* =============================================================
   EDITABLE DESKTOP QUOTATION ITEM
============================================================= */

function EditableQuotationItemRow({
    item,
    currency,
    editable,
    onQuantityChange,
    onRemove,
}) {
    const lineTotal =
        Number(item.unit_price || 0) *
        Number(item.quantity || 1);


    return (
        <tr className="hover:bg-gray-50/70 transition">

            <td className="px-5 py-5 align-top">

                <p className="font-semibold text-gray-900">
                    {item.name}
                </p>

                {item.category && (
                    <p className="mt-1 text-xs text-blue-600 font-medium">
                        {
                            item.category
                        }
                    </p>
                )}

                {item.description && (
                    <p className="mt-2 text-sm text-gray-500 max-w-sm leading-5">
                        {
                            item.description
                        }
                    </p>
                )}

                {item.specifications &&
                    Object.keys(
                        item.specifications
                    ).length > 0 && (

                        <div className="mt-3 space-y-1">

                            {Object.entries(
                                item.specifications
                            ).map(
                                (
                                    [
                                        key,
                                        value,
                                    ]
                                ) => (

                                    <p
                                        key={
                                            key
                                        }
                                        className="text-xs text-gray-500"
                                    >
                                        <span className="font-medium text-gray-700">
                                            {
                                                formatLabel(
                                                    key
                                                )
                                            }:
                                        </span>{" "}
                                        {
                                            renderValue(
                                                value
                                            )
                                        }
                                    </p>

                                )
                            )}

                        </div>

                    )}

            </td>


            <td className="px-5 py-5 align-top">

                {item.brand && (
                    <p className="font-medium text-gray-800">
                        {
                            item.brand
                        }
                    </p>
                )}

                {item.model && (
                    <p className="text-sm text-gray-500 mt-1">
                        {
                            item.model
                        }
                    </p>
                )}

                {!item.brand &&
                    !item.model && (
                        <span className="text-sm text-gray-400">
                            Not specified
                        </span>
                    )}

            </td>


            <td className="px-5 py-5 text-center align-top">

                {editable ? (

                    <input
                        type="number"
                        min="1"
                        max="100000"
                        value={
                            item.quantity
                        }
                        onChange={(
                            event
                        ) =>
                            onQuantityChange(
                                item.id,
                                event.target.value
                            )
                        }
                        className="w-24 rounded-lg border border-gray-300 px-3 py-2 text-center font-semibold text-gray-900 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-200"
                    />

                ) : (

                    <span className="inline-flex min-w-10 justify-center px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 font-semibold text-sm">
                        {
                            item.quantity
                        }
                    </span>

                )}

            </td>


            <td className="px-5 py-5 text-right align-top whitespace-nowrap">

                <span className="font-medium text-gray-800">
                    {
                        formatCurrency(
                            item.unit_price,
                            currency
                        )
                    }
                </span>

                <p className="mt-1 text-xs text-gray-400">
                    Fixed
                </p>

            </td>


            <td className="px-5 py-5 text-right align-top whitespace-nowrap">

                <span className="font-bold text-gray-900">
                    {
                        formatCurrency(
                            lineTotal,
                            currency
                        )
                    }
                </span>

            </td>


            {editable && (

                <td className="px-5 py-5 text-center align-top">

                    <button
                        type="button"
                        onClick={() =>
                            onRemove(
                                item.id
                            )
                        }
                        className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                    >
                        Remove
                    </button>

                </td>

            )}

        </tr>
    );
}


/* =============================================================
   EDITABLE MOBILE QUOTATION ITEM
============================================================= */

function EditableQuotationMobileItem({
    item,
    currency,
    editable,
    onQuantityChange,
    onRemove,
}) {
    const lineTotal =
        Number(item.unit_price || 0) *
        Number(item.quantity || 1);


    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

            <div className="flex items-start justify-between gap-4">

                <div>

                    <h4 className="font-semibold text-gray-900">
                        {
                            item.name
                        }
                    </h4>

                    {item.category && (
                        <p className="mt-1 text-xs text-blue-600">
                            {
                                item.category
                            }
                        </p>
                    )}

                </div>


                {editable && (

                    <button
                        type="button"
                        onClick={() =>
                            onRemove(
                                item.id
                            )
                        }
                        className="shrink-0 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600"
                    >
                        Remove
                    </button>

                )}

            </div>


            {(item.brand ||
                item.model) && (

                    <div className="mt-4 rounded-lg bg-gray-50 p-3">

                        {item.brand && (
                            <p className="text-sm">
                                <span className="text-gray-500">
                                    Brand:
                                </span>{" "}
                                <strong>
                                    {
                                        item.brand
                                    }
                                </strong>
                            </p>
                        )}

                        {item.model && (
                            <p className="text-sm mt-1">
                                <span className="text-gray-500">
                                    Model:
                                </span>{" "}
                                <strong>
                                    {
                                        item.model
                                    }
                                </strong>
                            </p>
                        )}

                    </div>

                )}


            {item.description && (
                <p className="mt-4 text-sm text-gray-500 leading-5">
                    {
                        item.description
                    }
                </p>
            )}


            <div className="mt-5 grid grid-cols-2 gap-3">

                <div>

                    <p className="text-xs font-medium text-gray-500">
                        Quantity
                    </p>

                    {editable ? (

                        <input
                            type="number"
                            min="1"
                            max="100000"
                            value={
                                item.quantity
                            }
                            onChange={(
                                event
                            ) =>
                                onQuantityChange(
                                    item.id,
                                    event.target.value
                                )
                            }
                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 font-semibold outline-none focus:border-gray-900"
                        />

                    ) : (

                        <p className="mt-2 font-semibold">
                            ×{" "}
                            {
                                item.quantity
                            }
                        </p>

                    )}

                </div>


                <div>

                    <p className="text-xs font-medium text-gray-500">
                        Unit Price
                    </p>

                    <p className="mt-2 font-medium text-gray-800">
                        {
                            formatCurrency(
                                item.unit_price,
                                currency
                            )
                        }
                    </p>

                </div>

            </div>


            <div className="mt-5 pt-4 border-t">

                <div className="flex justify-between gap-4">

                    <span className="font-semibold text-gray-700">
                        Item Total
                    </span>

                    <span className="font-bold text-gray-900">
                        {
                            formatCurrency(
                                lineTotal,
                                currency
                            )
                        }
                    </span>

                </div>

            </div>

        </div>
    );
}


/* =============================================================
   QUOTATION META
============================================================= */

function QuotationMeta({
    label,
    value,
}) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-4">

            <p className="text-xs uppercase tracking-wide text-gray-500">
                {label}
            </p>

            <p className="mt-1 font-semibold text-gray-900">
                {value}
            </p>

        </div>
    );
}


/* =============================================================
   MONEY ROW
============================================================= */

function MoneyRow({
    label,
    value,
    currency,
    negative = false,
}) {
    return (
        <div className="flex items-center justify-between gap-5 text-sm">

            <span className="text-gray-600">
                {label}
            </span>

            <span
                className={
                    negative
                        ? "font-medium text-red-600"
                        : "font-medium text-gray-900"
                }
            >
                {negative
                    ? "- "
                    : ""}

                {
                    formatCurrency(
                        Math.abs(
                            Number(
                                value || 0
                            )
                        ),
                        currency
                    )
                }
            </span>

        </div>
    );
}


/* =============================================================
   QUOTATION STATUS
============================================================= */

function QuotationStatusBadge({
    status,
}) {
    const styles = {
        draft:
            "bg-gray-700 text-gray-200",

        priced:
            "bg-green-500/20 text-green-300 border border-green-400/20",

        sent:
            "bg-blue-500/20 text-blue-300 border border-blue-400/20",

        negotiation:
            "bg-yellow-500/20 text-yellow-300 border border-yellow-400/20",

        accepted:
            "bg-green-500/20 text-green-300 border border-green-400/20",

        rejected:
            "bg-red-500/20 text-red-300 border border-red-400/20",

        expired:
            "bg-orange-500/20 text-orange-300 border border-orange-400/20",
    };


    const label =
        status
            ?.replaceAll(
                "_",
                " "
            )
            ?.replace(
                /\b\w/g,
                (letter) =>
                    letter.toUpperCase()
            ) ||
        "Unknown";


    return (
        <span
            className={`inline-flex px-3 py-1.5 rounded-full text-xs font-semibold ${styles[
                status
            ] ||
                "bg-gray-700 text-gray-200"
                }`}
        >
            {label}
        </span>
    );
}


/* =============================================================
   MODAL OVERLAY
============================================================= */

function ModalOverlay({
    children,
}) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6 overflow-y-auto"
            role="presentation"
        >
            <div className="w-full flex items-center justify-center min-h-full">
                {children}
            </div>
        </div>
    );
}


/* =============================================================
   FEATURE SECTION
============================================================= */

function FeatureSection({
    title,
    description,
    features = [],
    editable = false,
    updatingFeature,
    onToggle,
}) {
    return (
        <section className="mt-8 bg-white rounded-2xl border p-6 sm:p-8">

            <div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                    <h2 className="text-2xl font-bold">
                        {title}
                    </h2>

                    {features.length >
                        0 && (
                            <span className="text-sm text-gray-500">
                                {
                                    features.length
                                }{" "}
                                {
                                    features.length ===
                                        1
                                        ? "requirement"
                                        : "requirements"
                                }
                            </span>
                        )}

                </div>

                {description && (
                    <p className="mt-2 text-gray-600 leading-6">
                        {
                            description
                        }
                    </p>
                )}

            </div>


            {features.length ===
                0 ? (

                <div className="mt-6 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center">

                    <p className="text-sm text-gray-500">
                        No requirements in this section.
                    </p>

                </div>

            ) : (

                <div className="mt-6 space-y-4">

                    {features.map(
                        (
                            feature
                        ) => (

                            <FeatureCard
                                key={
                                    feature.id
                                }
                                feature={
                                    feature
                                }
                                editable={
                                    editable
                                }
                                updating={
                                    updatingFeature ===
                                    feature.id
                                }
                                onToggle={
                                    onToggle
                                }
                            />

                        )
                    )}

                </div>

            )}

        </section>
    );
}


/* =============================================================
   FEATURE CARD
============================================================= */

function FeatureCard({
    feature,
    editable,
    updating,
    onToggle,
}) {
    const isRequired =
        feature.scope_status ===
        "required";

    const isRecommended =
        feature.scope_status ===
        "recommended";

    const isOptional =
        feature.scope_status ===
        "optional";


    const canToggle =
        editable &&
        (
            isRequired ||
            isRecommended ||
            isOptional
        );


    return (
        <div
            className={`rounded-xl border p-5 transition ${isRequired
                ? "border-green-200 bg-green-50/20"
                : isRecommended
                    ? "border-blue-200 bg-blue-50/30"
                    : "border-gray-200 bg-gray-50/50"
                }`}
        >

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">

                <div className="flex-1 min-w-0">

                    <div className="flex flex-wrap items-center gap-2">

                        <h3 className="font-semibold text-lg text-gray-900">
                            {
                                feature.name
                            }
                        </h3>

                        <ScopeBadge
                            scopeStatus={
                                feature.scope_status
                            }
                        />

                        {feature.category && (
                            <span className="px-2 py-1 rounded-md bg-gray-100 text-gray-600 text-xs">
                                {
                                    feature.category
                                }
                            </span>
                        )}

                    </div>


                    {feature.description && (
                        <p className="mt-2 text-gray-600 leading-6">
                            {
                                feature.description
                            }
                        </p>
                    )}

                </div>


                <div className="lg:text-right shrink-0">

                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                        {isOptional
                            ? "Not Included"
                            : "Included"}
                    </p>


                    {canToggle && (

                        <button
                            type="button"
                            onClick={() =>
                                onToggle(
                                    feature
                                )
                            }
                            disabled={
                                updating
                            }
                            className={`mt-3 min-w-[110px] px-4 py-2.5 rounded-lg text-sm font-semibold border transition ${isOptional
                                ? "border-green-200 text-green-600 hover:bg-green-50"
                                : "border-red-200 text-red-600 hover:bg-red-50"
                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >

                            {updating
                                ? "Updating..."
                                : isOptional
                                    ? "Add"
                                    : "Remove"}

                        </button>

                    )}


                    {!editable &&
                        !isOptional && (
                            <div className="mt-3 text-xs text-gray-400">
                                Scope locked
                            </div>
                        )}

                </div>

            </div>

        </div>
    );
}


/* =============================================================
   SCOPE BADGE
============================================================= */

function ScopeBadge({
    scopeStatus,
}) {
    if (
        scopeStatus ===
        "required"
    ) {
        return (
            <span className="px-2 py-1 rounded-md bg-green-50 text-green-700 text-xs font-medium">
                Confirmed
            </span>
        );
    }

    if (
        scopeStatus ===
        "recommended"
    ) {
        return (
            <span className="px-2 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-medium">
                Included
            </span>
        );
    }

    return (
        <span className="px-2 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-medium">
            Optional
        </span>
    );
}


/* =============================================================
   STATUS BADGE
============================================================= */

function StatusBadge({
    status,
}) {
    const styles = {
        draft:
            "bg-gray-100 text-gray-700",

        ready:
            "bg-blue-50 text-blue-700",

        sent:
            "bg-purple-50 text-purple-700",

        viewed:
            "bg-indigo-50 text-indigo-700",

        revision_requested:
            "bg-yellow-50 text-yellow-700",

        accepted:
            "bg-green-50 text-green-700",

        rejected:
            "bg-red-50 text-red-700",

        expired:
            "bg-orange-50 text-orange-700",

        cancelled:
            "bg-gray-100 text-gray-600",

        completed:
            "bg-green-50 text-green-700",
    };


    const label =
        status
            ?.replaceAll(
                "_",
                " "
            )
            ?.replace(
                /\b\w/g,
                (letter) =>
                    letter.toUpperCase()
            ) ||
        "Unknown";


    return (
        <span
            className={`inline-flex px-4 py-2 rounded-full text-sm font-medium ${styles[
                status
            ] ||
                "bg-gray-100 text-gray-700"
                }`}
        >
            {label}
        </span>
    );
}


/* =============================================================
   DATA SECTION
============================================================= */

function DataSection({
    title,
    data,
}) {
    return (
        <section className="mt-8 bg-white rounded-2xl border p-6 sm:p-8">

            <h2 className="text-2xl font-bold">
                {title}
            </h2>

            <div className="mt-6 space-y-3">

                {Object.entries(
                    data
                ).map(
                    ([
                        key,
                        value,
                    ]) => (

                        <div
                            key={key}
                            className="border-b pb-3 last:border-b-0"
                        >

                            <p className="text-sm font-semibold capitalize">
                                {
                                    formatLabel(
                                        key
                                    )
                                }
                            </p>

                            <p className="text-gray-600 mt-1">
                                {
                                    renderValue(
                                        value
                                    )
                                }
                            </p>

                        </div>

                    )
                )}

            </div>

        </section>
    );
}


/* =============================================================
   LIST SECTION
============================================================= */

function ListSection({
    title,
    description,
    items = [],
}) {
    if (!items?.length) {
        return null;
    }


    return (
        <section className="mt-8 bg-white rounded-2xl border p-6 sm:p-8">

            <h2 className="text-2xl font-bold">
                {title}
            </h2>


            {description && (
                <p className="mt-2 text-gray-600">
                    {
                        description
                    }
                </p>
            )}


            <ul className="mt-6 space-y-3">

                {items.map(
                    (
                        item,
                        index
                    ) => (

                        <li
                            key={index}
                            className="flex gap-3 text-gray-700"
                        >

                            <span className="text-blue-600">
                                •
                            </span>

                            <span>
                                {typeof item ===
                                    "string"
                                    ? item
                                    : renderValue(
                                        item
                                    )}
                            </span>

                        </li>

                    )
                )}

            </ul>

        </section>
    );
}


/* =============================================================
   HELPERS
============================================================= */

function renderValue(
    value
) {
    if (
        value === null ||
        value === undefined
    ) {
        return "";
    }


    if (
        typeof value ===
        "string" ||
        typeof value ===
        "number"
    ) {
        return String(
            value
        );
    }


    if (
        Array.isArray(
            value
        )
    ) {
        return value
            .map(
                (item) =>
                    typeof item ===
                        "string"
                        ? item
                        : JSON.stringify(
                            item
                        )
            )
            .join(", ");
    }


    return JSON.stringify(
        value
    );
}


function formatLabel(
    value
) {
    return String(
        value || ""
    )
        .replaceAll(
            "_",
            " "
        )
        .replace(
            /\b\w/g,
            (letter) =>
                letter.toUpperCase()
        );
}


/* =============================================================
   CURRENCY
============================================================= */

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


    const number =
        Number(value);


    if (
        !Number.isFinite(
            number
        )
    ) {
        return "—";
    }


    try {
        return new Intl.NumberFormat(
            "en-NG",
            {
                style: "currency",
                currency,
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
            }
        ).format(number);
    } catch {
        return `${currency} ${number.toLocaleString(
            "en-NG",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }
        )}`;
    }
}


/* =============================================================
   DATE
============================================================= */

function formatDate(
    value
) {
    if (!value) {
        return "—";
    }


    const date =
        new Date(value);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {
        return String(
            value
        );
    }


    return new Intl.DateTimeFormat(
        "en-NG",
        {
            year: "numeric",
            month: "short",
            day: "numeric",
        }
    ).format(date);
}