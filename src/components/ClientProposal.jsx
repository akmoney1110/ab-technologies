import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
    ArrowRight, BriefcaseBusiness, CalendarDays, Check, CheckCircle2,
    ChevronDown, ChevronUp, CircleDollarSign, Clock3, Cpu, FileCheck2,
    FileText, Globe2, Layers3, Loader2, Mail, Minus, PackageCheck, Plus,
    RefreshCw, Save, ShieldCheck, Sparkles, Trash2, UserRound, X, XCircle
} from "lucide-react";

const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

const endpoint = (path) => `${API_URL}${path}`;

const money = (value, currency = "NGN") => {
    if (value === null || value === undefined || value === "") return "—";
    const n = Number(value);
    if (!Number.isFinite(n)) return String(value);
    try {
        return new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: currency || "NGN",
            maximumFractionDigits: 2,
        }).format(n);
    } catch {
        return `${currency || "NGN"} ${n.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}`;
    }
};

const dateText = (value) => {
    if (!value) return "—";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return String(value);
    return d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
};

const titleize = (value = "") =>
    String(value).replace(/[_-]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const hasValue = (value) => {
    if (value === null || value === undefined || value === "") return false;
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === "object") return Object.keys(value).length > 0;
    return true;
};

const apiError = (data, fallback) =>
    data?.error || data?.detail || data?.message || fallback;

function SmartValue({ value, depth = 0 }) {
    if (!hasValue(value)) return null;

    if (["string", "number", "boolean"].includes(typeof value)) {
        return (
            <div className="text-sm leading-7 text-slate-600">
                {typeof value === "boolean" ? (value ? "Yes" : "No") : String(value)}
            </div>
        );
    }

    if (Array.isArray(value)) {
        return (
            <div className="grid gap-2.5">
                {value.map((item, i) => (
                    <div key={i} className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                        <div className="min-w-0 flex-1">
                            <SmartValue value={item} depth={depth + 1} />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className={depth ? "grid gap-2" : "grid gap-3 sm:grid-cols-2"}>
            {Object.entries(value).filter(([, v]) => hasValue(v)).map(([key, v]) => (
                <div key={key} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                    <div className="mb-1.5 text-[11px] font-black uppercase tracking-[0.14em] text-slate-400">
                        {titleize(key)}
                    </div>
                    <SmartValue value={v} depth={depth + 1} />
                </div>
            ))}
        </div>
    );
}

function Section({ id, icon: Icon = FileText, eyebrow, title, description, children, className = "" }) {
    return (
        <section id={id} className={`overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_18px_70px_rgba(15,23,42,0.06)] ${className}`}>
            <div className="border-b border-slate-100 px-5 py-5 sm:px-7 sm:py-6">
                <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white">
                        <Icon size={19} />
                    </div>
                    <div>
                        {eyebrow && <div className="mb-1 text-[10px] font-black uppercase tracking-[0.22em] text-blue-600">{eyebrow}</div>}
                        <h2 className="text-xl font-black tracking-tight text-slate-950 sm:text-2xl">{title}</h2>
                        {description && <p className="mt-1.5 max-w-3xl text-sm leading-6 text-slate-500">{description}</p>}
                    </div>
                </div>
            </div>
            <div className="p-5 sm:p-7">{children}</div>
        </section>
    );
}

function Badge({ children, tone = "slate" }) {
    const tones = {
        green: "border-emerald-200 bg-emerald-50 text-emerald-700",
        blue: "border-blue-200 bg-blue-50 text-blue-700",
        amber: "border-amber-200 bg-amber-50 text-amber-700",
        red: "border-red-200 bg-red-50 text-red-700",
        slate: "border-slate-200 bg-slate-50 text-slate-600",
    };
    return <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${tones[tone]}`}>{children}</span>;
}

function FeatureCard({ feature, kind, editable, busy, onToggle, currency }) {
    const included = kind !== "optional";
    return (
        <div className="group rounded-3xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50">
            <div className="flex flex-col justify-between gap-4 sm:flex-row">
                <div className="min-w-0">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                        <Badge tone={kind === "required" ? "green" : kind === "recommended" ? "blue" : "slate"}>
                            {kind === "required" ? "Required · Included" : kind === "recommended" ? "Recommended · Included" : "Optional · Not Included"}
                        </Badge>
                        {feature.category && <Badge>{titleize(feature.category)}</Badge>}
                    </div>
                    <h3 className="text-base font-black text-slate-950 sm:text-lg">{feature.name}</h3>
                    {feature.description && <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">{feature.description}</p>}
                </div>
                {feature.total_price !== null && feature.total_price !== undefined && (
                    <div className="shrink-0 text-left sm:text-right">
                        <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">{included ? "Included value" : "Add-on value"}</div>
                        <div className="mt-1 font-black text-slate-950">{money(feature.total_price, currency)}</div>
                    </div>
                )}
            </div>

            {editable && (
                <button
                    type="button"
                    disabled={busy}
                    onClick={() => onToggle(feature)}
                    className={`mt-4 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-black transition disabled:cursor-not-allowed disabled:opacity-50 ${kind === "optional"
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-slate-950 text-white hover:bg-slate-800"
                        }`}
                >
                    {busy ? <Loader2 size={16} className="animate-spin" /> : kind === "optional" ? <Plus size={16} /> : <Minus size={16} />}
                    {kind === "optional" ? "Add to Proposal" : kind === "required" ? "Remove from Required" : "Move to Optional"}
                </button>
            )}
        </div>
    );
}

function Modal({ open, title, description, children, onClose }) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/65 p-4 backdrop-blur-sm">
            <div className="w-full max-w-lg overflow-hidden rounded-[28px] bg-white shadow-2xl">
                <div className="flex items-start justify-between gap-4 border-b border-slate-100 p-6">
                    <div>
                        <h3 className="text-xl font-black text-slate-950">{title}</h3>
                        {description && <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>}
                    </div>
                    <button onClick={onClose} className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"><X size={20} /></button>
                </div>
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
}

export default function ClientProposal() {
    const { publicToken } = useParams();

    const [proposal, setProposal] = useState(null);
    const [quoteDraft, setQuoteDraft] = useState([]);
    const [quotePreview, setQuotePreview] = useState(null);
    const [quoteDirty, setQuoteDirty] = useState(false);

    const [loading, setLoading] = useState(true);
    const [action, setAction] = useState("");
    const [error, setError] = useState("");
    const [notice, setNotice] = useState("");

    const [acceptOpen, setAcceptOpen] = useState(false);
    const [declineOpen, setDeclineOpen] = useState(false);
    const [acceptComment, setAcceptComment] = useState("");
    const [declineComment, setDeclineComment] = useState("");

    const currency = proposal?.currency || proposal?.quotation?.currency || "NGN";

    const fetchProposal = useCallback(async ({ quiet = false } = {}) => {
        if (!publicToken) return;
        if (!quiet) setLoading(true);
        setError("");

        try {
            const response = await fetch(endpoint(`/api/proposals/client/${publicToken}/`), {
                method: "GET",
                headers: { Accept: "application/json" },
                credentials: "same-origin",
            });
            const data = await response.json().catch(() => null);
            if (!response.ok || !data?.success || !data?.proposal) {
                throw new Error(apiError(data, "Unable to load this proposal."));
            }

            const p = data.proposal;
            setProposal(p);

            const items = Array.isArray(p?.quotation?.items) ? p.quotation.items : [];
            setQuoteDraft(items.map((item) => ({
                ...item,
                quantity: Number(item.quantity || 0),
                included: Number(item.quantity || 0) > 0,
            })));
            setQuotePreview(p.quotation || null);
            setQuoteDirty(false);
        } catch (e) {
            setError(e.message || "Unable to load this proposal.");
        } finally {
            if (!quiet) setLoading(false);
        }
    }, [publicToken]);

    useEffect(() => {
        fetchProposal();
    }, [fetchProposal]);

    // Current Investment should follow the live quotation while the client
    // is editing a procurement proposal. After Save Quotation, the backend
    // remains the source of truth and proposal.total_price is synchronized.
    const currentInvestment = useMemo(() => {
        if (proposal?.quotation) {
            if (quotePreview?.formatted_total) return quotePreview.formatted_total;
            if (quotePreview?.total !== null && quotePreview?.total !== undefined) {
                return money(quotePreview.total, currency);
            }

            if (proposal.quotation?.formatted_total) {
                return proposal.quotation.formatted_total;
            }
            if (
                proposal.quotation?.total !== null &&
                proposal.quotation?.total !== undefined
            ) {
                return money(proposal.quotation.total, currency);
            }
        }

        if (proposal?.formatted_total) return proposal.formatted_total;
        if (proposal?.total_price !== null && proposal?.total_price !== undefined) {
            return money(proposal.total_price, currency);
        }

        return "—";
    }, [proposal, quotePreview, currency]);

    const canEdit = Boolean(proposal?.client_editable) &&
        !["accepted", "rejected", "expired", "cancelled", "completed"].includes(proposal?.status);

    const updateDraft = (id, patch) => {
        setQuoteDraft((items) => items.map((item) => item.id === id ? { ...item, ...patch } : item));
        setQuoteDirty(true);
        setNotice("");
    };

    const quotationPayload = () => ({
        items: quoteDraft.map((item) => ({
            id: item.id,
            quantity: item.included ? Math.max(1, Number(item.quantity || 1)) : 0,
            included: Boolean(item.included),
        })),
    });

    const previewQuotation = async (draft = quoteDraft) => {
        if (!proposal?.quotation) return;
        setAction("preview");
        setError("");
        try {
            const response = await fetch(endpoint(`/api/proposals/client/${publicToken}/quotation/preview/`), {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                credentials: "same-origin",
                body: JSON.stringify({
                    items: draft.map((item) => ({
                        id: item.id,
                        quantity: item.included ? Math.max(1, Number(item.quantity || 1)) : 0,
                        included: Boolean(item.included),
                    })),
                }),
            });
            const data = await response.json().catch(() => null);
            if (!response.ok || !data?.success) throw new Error(apiError(data, "Unable to recalculate quotation."));
            setQuotePreview(data.quotation);
        } catch (e) {
            setError(e.message || "Unable to recalculate quotation.");
        } finally {
            setAction("");
        }
    };

    const changeQuantity = (item, delta) => {
        const next = Math.max(1, Number(item.quantity || 1) + delta);
        const nextDraft = quoteDraft.map((x) => x.id === item.id ? { ...x, quantity: next, included: true } : x);
        setQuoteDraft(nextDraft);
        setQuoteDirty(true);
        setNotice("");
        previewQuotation(nextDraft);
    };

    const toggleQuoteItem = (item) => {
        const nextDraft = quoteDraft.map((x) =>
            x.id === item.id ? { ...x, included: !x.included, quantity: !x.included ? Math.max(1, Number(x.quantity || 1)) : x.quantity } : x
        );
        if (!nextDraft.some((x) => x.included)) {
            setError("At least one quotation item must remain included.");
            return;
        }
        setQuoteDraft(nextDraft);
        setQuoteDirty(true);
        setNotice("");
        previewQuotation(nextDraft);
    };

    const saveQuotation = async () => {
        setAction("save-quote");
        setError("");
        setNotice("");
        try {
            const response = await fetch(endpoint(`/api/proposals/client/${publicToken}/quotation/update/`), {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                credentials: "same-origin",
                body: JSON.stringify(quotationPayload()),
            });
            const data = await response.json().catch(() => null);
            if (!response.ok || !data?.success) throw new Error(apiError(data, "Unable to save quotation."));

            setProposal((p) => ({
                ...p,
                quotation: data.quotation || p.quotation,
                total_price: data.total_price ?? p.total_price,
                formatted_total: data.formatted_total || p.formatted_total,
            }));

            if (data.quotation) {
                setQuotePreview(data.quotation);
                setQuoteDraft((data.quotation.items || []).map((item) => ({
                    ...item,
                    quantity: Number(item.quantity || 0),
                    included: Number(item.quantity || 0) > 0,
                })));
            }

            setQuoteDirty(false);
            setNotice(data.message || "Quotation saved successfully.");
            await fetchProposal({ quiet: true });
        } catch (e) {
            setError(e.message || "Unable to save quotation.");
        } finally {
            setAction("");
        }
    };

    const toggleFeature = async (feature) => {
        setAction(`feature-${feature.id}`);
        setError("");
        setNotice("");
        try {
            const response = await fetch(endpoint(`/api/proposals/client/${publicToken}/features/${feature.id}/toggle/`), {
                method: "POST",
                headers: { Accept: "application/json" },
                credentials: "same-origin",
            });
            const data = await response.json().catch(() => null);
            if (!response.ok || !data?.success) throw new Error(apiError(data, "Unable to update this feature."));

            setProposal((p) => ({
                ...p,
                total_price: data.proposal_total ?? p.total_price,
                formatted_total: data.formatted_total || p.formatted_total,
            }));

            setNotice("Proposal scope updated.");
            await fetchProposal({ quiet: true });
        } catch (e) {
            setError(e.message || "Unable to update this feature.");
        } finally {
            setAction("");
        }
    };

    const acceptProposal = async () => {
        setAction("accept");
        setError("");
        try {
            const payload = { comment: acceptComment.trim() };
            if (proposal?.quotation) payload.items = quotationPayload().items;

            const response = await fetch(endpoint(`/api/proposals/client/${publicToken}/accept/`), {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                credentials: "same-origin",
                body: JSON.stringify(payload),
            });
            const data = await response.json().catch(() => null);
            if (!response.ok || !data?.success) throw new Error(apiError(data, "Unable to accept this proposal."));

            setAcceptOpen(false);
            setNotice(data.message || "Proposal accepted successfully.");
            await fetchProposal({ quiet: true });
        } catch (e) {
            setError(e.message || "Unable to accept this proposal.");
        } finally {
            setAction("");
        }
    };

    const declineProposal = async () => {
        if (declineComment.trim().length < 5) {
            setError("Please provide a short reason for declining the proposal.");
            return;
        }
        setAction("decline");
        setError("");
        try {
            const response = await fetch(endpoint(`/api/proposals/client/${publicToken}/decline/`), {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                credentials: "same-origin",
                body: JSON.stringify({ comment: declineComment.trim() }),
            });
            const data = await response.json().catch(() => null);
            if (!response.ok || !data?.success) throw new Error(apiError(data, "Unable to decline this proposal."));
            setDeclineOpen(false);
            setNotice(data.message || "Proposal declined.");
            await fetchProposal({ quiet: true });
        } catch (e) {
            setError(e.message || "Unable to decline this proposal.");
        } finally {
            setAction("");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f4f7fb]">
                <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-5">
                    <div className="text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-950 text-white shadow-xl">
                            <Loader2 className="animate-spin" />
                        </div>
                        <div className="mt-5 text-sm font-black uppercase tracking-[0.2em] text-slate-400">Preparing your proposal</div>
                    </div>
                </div>
            </div>
        );
    }

    if (!proposal) {
        return (
            <div className="min-h-screen bg-[#f4f7fb] px-5 py-20">
                <div className="mx-auto max-w-xl rounded-[30px] border border-red-200 bg-white p-8 text-center shadow-xl">
                    <XCircle className="mx-auto text-red-500" size={42} />
                    <h1 className="mt-4 text-2xl font-black text-slate-950">Proposal unavailable</h1>
                    <p className="mt-2 text-slate-500">{error || "We could not load this proposal."}</p>
                    <button onClick={() => fetchProposal()} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 font-black text-white">
                        <RefreshCw size={17} /> Try again
                    </button>
                </div>
            </div>
        );
    }

    const client = proposal.client || {};
    const clientName = client.name || proposal.client_name || "Valued Client";
    const clientEmail = client.email || proposal.client_email;
    const required = proposal.required_features || [];
    const recommended = proposal.recommended_features || [];
    const optional = proposal.optional_features || [];
    const quotation = quotePreview || proposal.quotation;

    return (
        <div className="min-h-screen bg-[#f4f7fb] text-slate-900">
            <div className="pointer-events-none fixed inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_20%_10%,rgba(37,99,235,0.11),transparent_34%),radial-gradient(circle_at_80%_10%,rgba(124,58,237,0.09),transparent_30%)]" />

            <main className="relative mx-auto max-w-7xl px-4 pb-36 pt-5 sm:px-6 sm:pt-8 lg:px-8">
                {proposal.status === "accepted" && (
                    <div className="mb-5 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
                        <CheckCircle2 className="mt-0.5 shrink-0" size={20} />
                        <div>
                            <div className="font-black">Proposal accepted</div>
                            <div className="mt-0.5 text-sm">The agreed scope and commercial terms are now being processed by AB Technologies.</div>
                        </div>
                    </div>
                )}

                {notice && (
                    <div className="mb-5 flex items-start justify-between gap-3 rounded-2xl border border-emerald-200 bg-white p-4 shadow-sm">
                        <div className="flex gap-3 text-emerald-700"><CheckCircle2 size={20} /><span className="text-sm font-bold">{notice}</span></div>
                        <button onClick={() => setNotice("")}><X size={18} className="text-slate-400" /></button>
                    </div>
                )}

                {error && (
                    <div className="mb-5 flex items-start justify-between gap-3 rounded-2xl border border-red-200 bg-white p-4 shadow-sm">
                        <div className="flex gap-3 text-red-700"><XCircle size={20} /><span className="text-sm font-bold">{error}</span></div>
                        <button onClick={() => setError("")}><X size={18} className="text-slate-400" /></button>
                    </div>
                )}

                <header className="relative overflow-hidden rounded-[34px] bg-slate-950 px-5 py-7 text-white shadow-2xl shadow-slate-300/50 sm:px-9 sm:py-10 lg:px-12 lg:py-12">
                    <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
                    <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-violet-600/15 blur-3xl" />
                    <div className="relative">
                        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-start">
                            <div className="max-w-4xl">
                                <div className="mb-8 flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-lg font-black text-slate-950">AB</div>
                                    <div>
                                        <div className="font-black tracking-[0.15em]">AB TECHNOLOGIES</div>
                                        <div className="text-xs text-slate-400">Innovate. Build. Solve.</div>
                                    </div>
                                </div>

                                <div className="mb-4 flex flex-wrap gap-2">
                                    <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-bold">Status · {titleize(proposal.status)}</span>
                                    <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-bold">Proposal v{proposal.version}</span>
                                    <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-bold">{currency}</span>
                                </div>

                                <div className="text-xs font-black uppercase tracking-[0.22em] text-blue-300">Prepared for {clientName}</div>
                                <h1 className="mt-3 max-w-4xl text-3xl font-black leading-[1.08] tracking-[-0.04em] sm:text-5xl lg:text-6xl">{proposal.title}</h1>
                                {proposal.client_summary && <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">{proposal.client_summary}</p>}
                            </div>

                            <div className="w-full rounded-[26px] border border-white/10 bg-white/[0.07] p-5 backdrop-blur-sm lg:w-[310px]">
                                <div className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-400">Current investment</div>
                                <div className="mt-2 break-words text-3xl font-black tracking-tight sm:text-4xl">{currentInvestment}</div>
                                <div className="mt-4 border-t border-white/10 pt-4 text-sm leading-6 text-slate-400">
                                    {quoteDirty && proposal.quotation
                                        ? "Live preview — save the quotation to make this investment permanent."
                                        : "This reflects the current saved scope and commercial selection."}
                                </div>
                                {canEdit && (
                                    <button onClick={() => setAcceptOpen(true)} className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3.5 font-black text-slate-950 transition hover:bg-blue-50">
                                        Review & Accept <ArrowRight size={17} />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_310px]">
                    <div className="space-y-6">
                        <Section icon={UserRound} eyebrow="Proposal details" title="Prepared specifically for you" description="Key information associated with this engagement.">
                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                                {[
                                    ["Client", clientName, UserRound],
                                    ["Email", clientEmail, Mail],
                                    ["Version", `v${proposal.version}`, FileCheck2],
                                    ["Valid until", dateText(proposal.expires_at), CalendarDays],
                                ].filter(([, v]) => v && v !== "—").map(([label, value, Icon]) => (
                                    <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                                        <Icon size={17} className="mb-3 text-blue-600" />
                                        <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">{label}</div>
                                        <div className="mt-1 break-words text-sm font-black text-slate-900">{value}</div>
                                    </div>
                                ))}
                            </div>
                        </Section>

                        {hasValue(proposal.business_objectives) && (
                            <Section icon={BriefcaseBusiness} eyebrow="Why this project" title="Business Objectives" description="The outcomes this engagement is designed to achieve.">
                                <SmartValue value={proposal.business_objectives} />
                            </Section>
                        )}

                        {proposal.quotation && (
                            <Section icon={PackageCheck} eyebrow="Commercial quotation" title="Quotation & Procurement" description="Review quantities, specifications and pricing. Changes are recalculated by the server before they are saved.">
                                <div className="mb-6 flex flex-col justify-between gap-4 rounded-2xl bg-slate-950 p-5 text-white sm:flex-row sm:items-center">
                                    <div>
                                        <div className="text-lg font-black">{proposal.quotation.title || "Project Quotation"}</div>
                                        {proposal.quotation.description && <div className="mt-1 max-w-2xl text-sm leading-6 text-slate-400">{proposal.quotation.description}</div>}
                                    </div>
                                    <Badge tone="blue">{titleize(proposal.quotation.status || "priced")}</Badge>
                                </div>

                                {proposal.quotation.purpose && (
                                    <div className="mb-5 rounded-2xl border border-blue-100 bg-blue-50/60 p-4 text-sm leading-6 text-slate-600">
                                        <strong className="text-slate-900">Purpose:</strong> {proposal.quotation.purpose}
                                    </div>
                                )}

                                <div className="space-y-4">
                                    {quoteDraft.map((item) => {
                                        const previewItem = quotation?.items?.find((x) => String(x.id) === String(item.id)) || item;
                                        return (
                                            <div key={item.id} className={`rounded-3xl border p-5 transition ${item.included ? "border-slate-200 bg-white" : "border-slate-200 bg-slate-50 opacity-70"}`}>
                                                <div className="flex flex-col justify-between gap-4 sm:flex-row">
                                                    <div>
                                                        {item.category && <div className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-600">{titleize(item.category)}</div>}
                                                        <h3 className="mt-1 text-lg font-black text-slate-950">{item.name}</h3>
                                                        {item.description && <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">{item.description}</p>}
                                                    </div>
                                                    <div className="shrink-0 sm:text-right">
                                                        <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">Line total</div>
                                                        <div className="mt-1 text-lg font-black text-slate-950">{money(previewItem.total_price, currency)}</div>
                                                    </div>
                                                </div>

                                                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                                                    {item.brand && <div className="rounded-xl bg-slate-50 p-3"><div className="text-[10px] font-black uppercase text-slate-400">Brand</div><div className="mt-1 text-sm font-bold">{item.brand}</div></div>}
                                                    {item.model && <div className="rounded-xl bg-slate-50 p-3"><div className="text-[10px] font-black uppercase text-slate-400">Model</div><div className="mt-1 text-sm font-bold">{item.model}</div></div>}
                                                    <div className="rounded-xl bg-slate-50 p-3"><div className="text-[10px] font-black uppercase text-slate-400">Unit price</div><div className="mt-1 text-sm font-bold">{money(item.unit_price, currency)}</div></div>
                                                    <div className="rounded-xl bg-slate-50 p-3">
                                                        <div className="text-[10px] font-black uppercase text-slate-400">Quantity</div>
                                                        {canEdit && item.included ? (
                                                            <div className="mt-1 flex items-center gap-2">
                                                                <button onClick={() => changeQuantity(item, -1)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white hover:bg-slate-100"><Minus size={14} /></button>
                                                                <span className="min-w-8 text-center text-sm font-black">{item.quantity}</span>
                                                                <button onClick={() => changeQuantity(item, 1)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white hover:bg-slate-100"><Plus size={14} /></button>
                                                            </div>
                                                        ) : <div className="mt-1 text-sm font-bold">{item.quantity}</div>}
                                                    </div>
                                                </div>

                                                {hasValue(item.specifications) && (
                                                    <div className="mt-4 border-t border-slate-100 pt-4">
                                                        <div className="mb-3 text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">Specifications</div>
                                                        <SmartValue value={item.specifications} />
                                                    </div>
                                                )}

                                                {canEdit && (
                                                    <button onClick={() => toggleQuoteItem(item)} className={`mt-4 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-black ${item.included ? "bg-red-50 text-red-700 hover:bg-red-100" : "bg-blue-600 text-white hover:bg-blue-700"}`}>
                                                        {item.included ? <Trash2 size={15} /> : <Plus size={15} />}
                                                        {item.included ? "Remove item" : "Restore item"}
                                                    </button>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="mt-6 ml-auto max-w-lg rounded-3xl bg-slate-50 p-5">
                                    {[
                                        ["Subtotal", quotation?.subtotal],
                                        ["Discount", quotation?.discount, true],
                                        ["Tax", quotation?.tax],
                                        ["Delivery", quotation?.delivery_fee],
                                    ].filter(([, v]) => v !== null && v !== undefined && Number(v) !== 0).map(([label, value, negative]) => (
                                        <div key={label} className="flex justify-between gap-5 py-2 text-sm text-slate-500">
                                            <span>{label}</span><strong className="text-slate-900">{negative ? "- " : ""}{money(value, currency)}</strong>
                                        </div>
                                    ))}
                                    <div className="mt-2 flex justify-between gap-5 border-t border-slate-200 pt-4">
                                        <span className="font-black text-slate-950">Quotation Total</span>
                                        <span className="text-xl font-black text-slate-950">{quotation?.formatted_total || money(quotation?.total, currency)}</span>
                                    </div>
                                </div>

                                {canEdit && (
                                    <div className="mt-5 flex flex-col items-stretch justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center">
                                        <div>
                                            <div className="text-sm font-black text-slate-950">{quoteDirty ? "You have unsaved quotation changes" : "Quotation is saved"}</div>
                                            <div className="mt-1 text-xs text-slate-500">Only quantity and inclusion can be changed. Prices remain controlled by AB Technologies.</div>
                                        </div>
                                        <button
                                            disabled={!quoteDirty || action === "save-quote"}
                                            onClick={saveQuotation}
                                            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
                                        >
                                            {action === "save-quote" ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                                            Save Quotation
                                        </button>
                                    </div>
                                )}
                            </Section>
                        )}

                        {(required.length > 0 || recommended.length > 0 || optional.length > 0) && (
                            <Section icon={Layers3} eyebrow="Project scope" title="Features & Scope" description="Required, recommended and optional items can be adjusted before acceptance where editing is enabled.">
                                {required.length > 0 && <div className="mb-7"><h3 className="mb-3 text-sm font-black uppercase tracking-wider text-slate-500">Required</h3><div className="grid gap-3">{required.map((f) => <FeatureCard key={f.id} feature={f} kind="required" editable={canEdit} busy={action === `feature-${f.id}`} onToggle={toggleFeature} currency={currency} />)}</div></div>}
                                {recommended.length > 0 && <div className="mb-7"><h3 className="mb-3 text-sm font-black uppercase tracking-wider text-slate-500">Recommended & Included</h3><div className="grid gap-3">{recommended.map((f) => <FeatureCard key={f.id} feature={f} kind="recommended" editable={canEdit} busy={action === `feature-${f.id}`} onToggle={toggleFeature} currency={currency} />)}</div></div>}
                                {optional.length > 0 && <div><h3 className="mb-3 text-sm font-black uppercase tracking-wider text-slate-500">Optional / Future</h3><div className="grid gap-3">{optional.map((f) => <FeatureCard key={f.id} feature={f} kind="optional" editable={canEdit} busy={action === `feature-${f.id}`} onToggle={toggleFeature} currency={currency} />)}</div></div>}
                            </Section>
                        )}

                        {Array.isArray(proposal.screens) && proposal.screens.length > 0 && (
                            <Section icon={Globe2} eyebrow="User experience" title="Pages & Screens" description="Expected interfaces and experiences included in the project scope.">
                                <div className="grid gap-3 sm:grid-cols-2">
                                    {proposal.screens.map((screen) => (
                                        <div key={screen.id || screen.name} className="rounded-2xl border border-slate-200 p-4">
                                            <div className="flex flex-wrap items-center gap-2"><h3 className="font-black text-slate-950">{screen.name}</h3>{screen.screen_type && <Badge>{titleize(screen.screen_type)}</Badge>}</div>
                                            {screen.purpose && <p className="mt-2 text-sm leading-6 text-slate-500">{screen.purpose}</p>}
                                            {hasValue(screen.key_functionality) && <div className="mt-3"><SmartValue value={screen.key_functionality} /></div>}
                                        </div>
                                    ))}
                                </div>
                            </Section>
                        )}

                        {Array.isArray(proposal.requirements) && proposal.requirements.length > 0 && (
                            <Section icon={CheckCircle2} eyebrow="Requirements" title="Project Requirements" description="Functional and delivery requirements identified for this engagement.">
                                <div className="grid gap-3">
                                    {proposal.requirements.map((r) => (
                                        <div key={r.id || r.title} className="rounded-2xl border border-slate-200 p-4">
                                            <div className="flex flex-wrap items-center gap-2"><h3 className="font-black">{r.title}</h3>{r.requirement_type && <Badge tone="blue">{titleize(r.requirement_type)}</Badge>}</div>
                                            {r.description && <p className="mt-2 text-sm leading-6 text-slate-500">{r.description}</p>}
                                        </div>
                                    ))}
                                </div>
                            </Section>
                        )}

                        {hasValue(proposal.deliverables) && <Section icon={FileCheck2} eyebrow="What you receive" title="Deliverables"><SmartValue value={proposal.deliverables} /></Section>}
                        {hasValue(proposal.timeline) && <Section icon={Clock3} eyebrow="Delivery plan" title="Project Timeline"><SmartValue value={proposal.timeline} /></Section>}
                        {hasValue(proposal.milestones) && <Section icon={CalendarDays} eyebrow="Execution" title="Milestones"><SmartValue value={proposal.milestones} /></Section>}
                        {hasValue(proposal.integrations) && <Section icon={Cpu} eyebrow="Connected systems" title="Integrations"><SmartValue value={proposal.integrations} /></Section>}
                        {hasValue(proposal.technical_scope) && <Section icon={Cpu} eyebrow="Implementation" title="Technical Scope"><SmartValue value={proposal.technical_scope} /></Section>}
                        {hasValue(proposal.scope) && !proposal.quotation && <Section icon={Layers3} eyebrow="Engagement" title="Scope of Work"><SmartValue value={proposal.scope} /></Section>}
                        {hasValue(proposal.security) && <Section icon={ShieldCheck} eyebrow="Protection" title="Security"><SmartValue value={proposal.security} /></Section>}
                        {hasValue(proposal.recurring_costs) && <Section icon={CircleDollarSign} eyebrow="Ongoing costs" title="Recurring Costs"><SmartValue value={proposal.recurring_costs} /></Section>}

                        {(hasValue(proposal.assumptions) || hasValue(proposal.exclusions)) && (
                            <Section icon={FileText} eyebrow="Commercial clarity" title="Assumptions & Exclusions">
                                <div className="grid gap-5 lg:grid-cols-2">
                                    {hasValue(proposal.assumptions) && <div><h3 className="mb-3 font-black text-slate-950">Assumptions</h3><SmartValue value={proposal.assumptions} /></div>}
                                    {hasValue(proposal.exclusions) && <div><h3 className="mb-3 font-black text-slate-950">Exclusions</h3><SmartValue value={proposal.exclusions} /></div>}
                                </div>
                            </Section>
                        )}
                    </div>

                    <aside className="hidden lg:block">
                        <div className="sticky top-6 rounded-[28px] bg-slate-950 p-5 text-white shadow-2xl">
                            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-blue-300"><Sparkles size={14} /> Proposal summary</div>
                            <div className="mt-5 text-[10px] font-black uppercase tracking-wider text-slate-500">Current investment</div>
                            <div className="mt-1 break-words text-3xl font-black">{currentInvestment}</div>
                            <div className="mt-5 space-y-3 border-t border-white/10 pt-5 text-sm">
                                <div className="flex justify-between gap-4"><span className="text-slate-400">Status</span><strong>{titleize(proposal.status)}</strong></div>
                                <div className="flex justify-between gap-4"><span className="text-slate-400">Version</span><strong>v{proposal.version}</strong></div>
                                {proposal.expires_at && <div className="flex justify-between gap-4"><span className="text-slate-400">Valid until</span><strong className="text-right">{dateText(proposal.expires_at)}</strong></div>}
                            </div>

                            {quoteDirty && <div className="mt-5 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-3 text-xs leading-5 text-amber-200">Save your quotation changes before accepting if you want them stored immediately.</div>}

                            {canEdit && (
                                <div className="mt-5 grid gap-2">
                                    <button onClick={() => setAcceptOpen(true)} className="flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 font-black text-slate-950 hover:bg-blue-50"><Check size={17} /> Accept Proposal</button>
                                    <button onClick={() => setDeclineOpen(true)} className="rounded-xl border border-white/10 px-4 py-3 text-sm font-bold text-slate-300 hover:bg-white/5">Decline / Request changes</button>
                                </div>
                            )}
                        </div>
                    </aside>
                </div>

                <footer className="py-10 text-center text-xs leading-6 text-slate-400">
                    <strong className="text-slate-600">AB Technologies</strong><br />
                    Innovate. Build. Solve.<br /><br />
                    This proposal reflects the scope and pricing available at the time it was issued. Changes to scope, specifications, quantities or commercial terms may require an updated proposal.
                </footer>
            </main>

            <div className="fixed inset-x-3 bottom-3 z-40 rounded-[22px] bg-slate-950 p-3 text-white shadow-2xl lg:hidden">
                <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                        <div className="text-[9px] font-black uppercase tracking-wider text-slate-500">Current investment</div>
                        <div className="truncate text-lg font-black">{currentInvestment}</div>
                    </div>
                    {canEdit && <button onClick={() => setAcceptOpen(true)} className="shrink-0 rounded-xl bg-white px-4 py-3 text-sm font-black text-slate-950">Review & Accept</button>}
                </div>
            </div>

            <Modal open={acceptOpen} onClose={() => setAcceptOpen(false)} title="Accept this proposal?" description={quoteDirty && proposal.quotation
                ? "You have quotation changes that are not saved yet. Save them before acceptance so the proposal total and quotation remain synchronized."
                : "You are confirming the current scope, saved quotation selections and commercial terms."}>
                <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">Current investment</div>
                    <div className="mt-1 text-2xl font-black text-slate-950">{currentInvestment}</div>
                </div>
                {quoteDirty && (
                    <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-800">
                        Your quotation has unsaved changes. Acceptance will submit the current item selections, but use <strong>Save Quotation</strong> first if you want the quotation itself updated before acceptance.
                    </div>
                )}
                <label className="mt-5 block text-sm font-black text-slate-800">Comment <span className="font-normal text-slate-400">(optional)</span></label>
                <textarea value={acceptComment} onChange={(e) => setAcceptComment(e.target.value)} rows={4} maxLength={5000} placeholder="Any final note for AB Technologies..." className="mt-2 w-full rounded-2xl border border-slate-200 p-4 text-sm outline-none focus:border-blue-500" />
                <div className="mt-5 flex gap-3">
                    <button onClick={() => setAcceptOpen(false)} className="flex-1 rounded-xl border border-slate-200 px-4 py-3 font-black text-slate-600">Cancel</button>
                    <button disabled={action === "accept"} onClick={acceptProposal} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 font-black text-white disabled:opacity-50">
                        {action === "accept" ? <Loader2 size={17} className="animate-spin" /> : <CheckCircle2 size={17} />} Confirm Acceptance
                    </button>
                </div>
            </Modal>

            <Modal open={declineOpen} onClose={() => setDeclineOpen(false)} title="Decline or request changes" description="Tell AB Technologies what needs to change. A short reason is required.">
                <label className="block text-sm font-black text-slate-800">Reason</label>
                <textarea value={declineComment} onChange={(e) => setDeclineComment(e.target.value)} rows={5} placeholder="Please explain what you would like changed..." className="mt-2 w-full rounded-2xl border border-slate-200 p-4 text-sm outline-none focus:border-red-400" />
                <div className="mt-5 flex gap-3">
                    <button onClick={() => setDeclineOpen(false)} className="flex-1 rounded-xl border border-slate-200 px-4 py-3 font-black text-slate-600">Cancel</button>
                    <button disabled={action === "decline" || declineComment.trim().length < 5} onClick={declineProposal} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 font-black text-white disabled:opacity-40">
                        {action === "decline" ? <Loader2 size={17} className="animate-spin" /> : <XCircle size={17} />} Send Response
                    </button>
                </div>
            </Modal>
        </div>
    );
}
