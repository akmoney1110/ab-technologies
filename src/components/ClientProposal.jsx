import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
    AlertCircle, ArrowRight, BadgeCheck, Boxes, BriefcaseBusiness, Building2,
    CalendarDays, Check, CheckCircle2, ChevronDown, ChevronRight, CircleDollarSign,
    Clock3, Code2, Database, FileCheck2, FileText, Globe2, Layers3, Loader2,
    LockKeyhole, Mail, MapPin, Minus, MonitorSmartphone, Network, PackageCheck,
    Phone, Plus, RefreshCw, Rocket, Save, ServerCog, ShieldCheck, Sparkles,
    Target, UserRound, X, XCircle, Zap
} from "lucide-react";

const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

const cx = (...classes) => classes.filter(Boolean).join(" ");
const isObject = (value) => value && typeof value === "object" && !Array.isArray(value);
const hasValue = (value) => {
    if (value === null || value === undefined || value === "") return false;
    if (Array.isArray(value)) return value.length > 0;
    if (isObject(value)) return Object.keys(value).length > 0;
    return true;
};
const humanize = (value = "") => String(value)
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

const money = (value, currency = "NGN") => {
    const amount = Number(value || 0);
    try {
        return new Intl.NumberFormat("en-NG", {
            style: "currency", currency: currency || "NGN", maximumFractionDigits: 2,
        }).format(Number.isFinite(amount) ? amount : 0);
    } catch {
        return `${currency || "NGN"} ${(Number.isFinite(amount) ? amount : 0).toLocaleString()}`;
    }
};

const dateLabel = (value) => {
    if (!value) return "—";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);
    return new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric" }).format(date);
};

async function apiFetch(path, options = {}) {
    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: { Accept: "application/json", ...(options.body ? { "Content-Type": "application/json" } : {}), ...(options.headers || {}) },
    });
    let data = null;
    try { data = await response.json(); } catch { data = null; }
    if (!response.ok) {
        const error = new Error(data?.error || data?.detail || "Unable to complete this request.");
        error.status = response.status;
        error.data = data;
        throw error;
    }
    return data;
}

function StatusBadge({ status }) {
    const styles = {
        accepted: "border-emerald-400/25 bg-emerald-400/10 text-emerald-300",
        viewed: "border-blue-400/25 bg-blue-400/10 text-blue-300",
        sent: "border-cyan-400/25 bg-cyan-400/10 text-cyan-300",
        ready: "border-violet-400/25 bg-violet-400/10 text-violet-300",
        rejected: "border-rose-400/25 bg-rose-400/10 text-rose-300",
        expired: "border-amber-400/25 bg-amber-400/10 text-amber-300",
    };
    return <span className={cx("inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold", styles[status] || "border-white/10 bg-white/5 text-slate-300")}>
        <span className="h-1.5 w-1.5 rounded-full bg-current" />{humanize(status || "proposal")}
    </span>;
}

function SectionHeading({ eyebrow, title, description, icon: Icon }) {
    return <div className="mb-7 flex items-start gap-4">
        {Icon && <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20"><Icon size={19} /></div>}
        <div>
            {eyebrow && <p className="text-[11px] font-black uppercase tracking-[0.22em] text-blue-600">{eyebrow}</p>}
            <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl dark:text-white">{title}</h2>
            {description && <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-500 dark:text-slate-400">{description}</p>}
        </div>
    </div>;
}

function Card({ children, className = "" }) {
    return <div className={cx("rounded-[26px] border border-slate-200/80 bg-white shadow-[0_18px_55px_-36px_rgba(15,23,42,.35)] dark:border-white/[0.08] dark:bg-[#0c1422]", className)}>{children}</div>;
}

function EmptyState({ children = "No information has been added to this section." }) {
    return <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-sm text-slate-500 dark:border-white/10 dark:text-slate-400">{children}</div>;
}

function PrimitiveValue({ value }) {
    if (typeof value === "boolean") return <span className={cx("inline-flex rounded-full px-2.5 py-1 text-xs font-bold", value ? "bg-emerald-500/10 text-emerald-600" : "bg-slate-500/10 text-slate-500")}>{value ? "Included" : "Not included"}</span>;
    return <span>{String(value)}</span>;
}

function SmartValue({ value, depth = 0 }) {
    if (!hasValue(value)) return <span className="text-slate-400">Not specified</span>;
    if (["string", "number", "boolean"].includes(typeof value)) return <PrimitiveValue value={value} />;
    if (Array.isArray(value)) {
        return <div className="space-y-2">{value.map((item, index) => (
            <div key={item?.id || item?.name || item?.title || index} className="flex gap-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-blue-500" />
                <div className="min-w-0 flex-1">{isObject(item) || Array.isArray(item) ? <SmartValue value={item} depth={depth + 1} /> : <PrimitiveValue value={item} />}</div>
            </div>
        ))}</div>;
    }
    return <div className={cx("grid gap-3", depth === 0 && "sm:grid-cols-2")}>{Object.entries(value).filter(([, v]) => hasValue(v)).map(([key, item]) => (
        <div key={key} className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-white/[0.07] dark:bg-white/[0.025]">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">{humanize(key)}</p>
            <div className="mt-2 text-sm font-medium leading-6 text-slate-700 dark:text-slate-200"><SmartValue value={item} depth={depth + 1} /></div>
        </div>
    ))}</div>;
}

function InfoSection({ title, eyebrow, description, icon, value }) {
    if (!hasValue(value)) return null;
    return <section className="scroll-mt-24"><SectionHeading eyebrow={eyebrow} title={title} description={description} icon={icon} /><Card className="p-5 sm:p-7"><SmartValue value={value} /></Card></section>;
}

function FeatureCard({ feature, tone, editable, busy, onToggle }) {
    const included = feature.scope_status !== "optional";
    const styles = {
        required: { icon: "bg-emerald-500/10 text-emerald-600", badge: "bg-emerald-500/10 text-emerald-600", label: "Required" },
        recommended: { icon: "bg-blue-500/10 text-blue-600", badge: "bg-blue-500/10 text-blue-600", label: "Recommended" },
        optional: { icon: "bg-violet-500/10 text-violet-600", badge: "bg-violet-500/10 text-violet-600", label: "Optional" },
    }[tone];
    return <Card className="group relative overflow-hidden p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
            <div className={cx("flex h-11 w-11 items-center justify-center rounded-2xl", styles.icon)}>{included ? <Check size={18} /> : <Plus size={18} />}</div>
            <span className={cx("rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider", styles.badge)}>{styles.label}</span>
        </div>
        <h3 className="mt-5 text-base font-black text-slate-950 dark:text-white">{feature.name}</h3>
        {feature.description && <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{feature.description}</p>}
        <div className="mt-5 flex flex-wrap gap-2 text-xs text-slate-500">
            {feature.category && <span className="rounded-full bg-slate-100 px-2.5 py-1 dark:bg-white/5">{feature.category}</span>}
            {feature.complexity && <span className="rounded-full bg-slate-100 px-2.5 py-1 dark:bg-white/5">{humanize(feature.complexity)} complexity</span>}
            {Number(feature.total_price) > 0 && <span className="rounded-full bg-slate-100 px-2.5 py-1 font-bold dark:bg-white/5">{money(feature.total_price)}</span>}
        </div>
        {tone !== "required" && editable && <button disabled={busy} onClick={() => onToggle(feature)} className={cx("mt-5 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-black transition disabled:opacity-50", included ? "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-white/5 dark:text-slate-200" : "bg-blue-600 text-white hover:bg-blue-700")}>
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : included ? <Minus size={14} /> : <Plus size={14} />}{included ? "Move to optional" : "Add to proposal"}
        </button>}
    </Card>;
}

function FeatureSection({ proposal, onToggle, busyId }) {
    const groups = [
        ["Required & included", "Core scope included in this proposal.", "required", proposal.required_features || []],
        ["Recommended enhancements", "Recommended additions that strengthen the solution.", "recommended", proposal.recommended_features || []],
        ["Optional add-ons", "Useful additions you can include before acceptance.", "optional", proposal.optional_features || []],
    ];
    if (!groups.some(([, , , items]) => items.length)) return null;
    return <section id="scope" className="scroll-mt-24"><SectionHeading eyebrow="Solution scope" title="What is included in your proposal" description="Review the agreed core scope and adjust recommended or optional items before accepting." icon={Layers3} />
        <div className="space-y-8">{groups.map(([title, desc, tone, items]) => items.length > 0 && <div key={tone}>
            <div className="mb-4"><h3 className="font-black text-slate-900 dark:text-white">{title}</h3><p className="mt-1 text-sm text-slate-500">{desc}</p></div>
            <div className="grid gap-4 md:grid-cols-2">{items.map((feature) => <FeatureCard key={feature.id} feature={feature} tone={tone} editable={proposal.client_editable && !["accepted", "rejected", "expired", "cancelled"].includes(proposal.status)} busy={busyId === feature.id} onToggle={onToggle} />)}</div>
        </div>)}</div>
    </section>;
}

function QuotationEditor({ proposal, quotation, onSaved }) {
    const editable = proposal.client_editable && !["accepted", "rejected", "expired", "cancelled"].includes(proposal.status);
    const [items, setItems] = useState([]);
    const [preview, setPreview] = useState(null);
    const [busy, setBusy] = useState("");
    const [error, setError] = useState("");
    const token = proposal.public_token;

    useEffect(() => {
        setItems((quotation?.items || []).map((item) => ({ ...item, quantity: Number(item.quantity || 0), included: item.included !== false && Number(item.quantity || 0) > 0 })));
        setPreview(null);
    }, [quotation]);

    const payload = useMemo(() => ({ items: items.map((item) => ({ id: item.id, quantity: item.included ? Math.max(1, Number(item.quantity || 1)) : 0, included: Boolean(item.included) })) }), [items]);
    const updateItem = (id, patch) => setItems((current) => current.map((item) => item.id === id ? { ...item, ...patch } : item));

    const previewChanges = async () => {
        setBusy("preview"); setError("");
        try {
            const data = await apiFetch(`/api/proposals/client/${token}/quotation/preview/`, { method: "POST", body: JSON.stringify(payload) });
            setPreview(data.quotation || data);
        } catch (err) { setError(err.message); }
        finally { setBusy(""); }
    };
    const saveChanges = async () => {
        setBusy("save"); setError("");
        try {
            const data = await apiFetch(`/api/proposals/client/${token}/quotation/update/`, { method: "POST", body: JSON.stringify(payload) });
            setPreview(data.quotation || data);
            await onSaved();
        } catch (err) { setError(err.message); }
        finally { setBusy(""); }
    };

    if (!quotation) return null;
    const shown = preview || quotation;
    return <section id="quotation" className="scroll-mt-24"><SectionHeading eyebrow="Commercial quotation" title={quotation.title || "Investment & procurement"} description={quotation.description || quotation.purpose || "Review quantities, specifications and the commercial total."} icon={PackageCheck} />
        <div className="space-y-4">{items.map((item) => <Card key={item.id} className={cx("overflow-hidden transition", !item.included && "opacity-60")}>
            <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[1fr_auto]">
                <div>
                    <div className="flex flex-wrap items-center gap-2"><span className="rounded-full bg-blue-500/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-blue-600">{item.category || "Item"}</span>{item.brand && <span className="text-xs font-bold text-slate-400">{item.brand}{item.model ? ` • ${item.model}` : ""}</span>}</div>
                    <h3 className="mt-3 text-lg font-black text-slate-950 dark:text-white">{item.name}</h3>
                    {item.description && <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500 dark:text-slate-400">{item.description}</p>}
                    {hasValue(item.specifications) && <div className="mt-4"><SmartValue value={item.specifications} /></div>}
                </div>
                <div className="min-w-[210px] rounded-2xl bg-slate-50 p-4 dark:bg-white/[0.035]">
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Unit price</p><p className="mt-1 font-black text-slate-900 dark:text-white">{money(item.unit_price, quotation.currency || proposal.currency)}</p>
                    <div className="mt-4 flex items-center justify-between gap-3"><span className="text-xs font-bold text-slate-500">Quantity</span><div className="flex items-center rounded-xl border border-slate-200 bg-white dark:border-white/10 dark:bg-slate-900">
                        <button disabled={!editable || !item.included} onClick={() => updateItem(item.id, { quantity: Math.max(1, item.quantity - 1) })} className="p-2 disabled:opacity-30"><Minus size={14} /></button>
                        <input disabled={!editable || !item.included} value={item.quantity} onChange={(e) => updateItem(item.id, { quantity: Math.max(1, Number(e.target.value || 1)) })} className="w-12 bg-transparent text-center text-sm font-black outline-none" type="number" min="1" />
                        <button disabled={!editable || !item.included} onClick={() => updateItem(item.id, { quantity: item.quantity + 1 })} className="p-2 disabled:opacity-30"><Plus size={14} /></button>
                    </div></div>
                    {editable && <button onClick={() => updateItem(item.id, { included: !item.included })} className={cx("mt-3 w-full rounded-xl px-3 py-2 text-xs font-black", item.included ? "bg-rose-500/10 text-rose-600" : "bg-emerald-500/10 text-emerald-600")}>{item.included ? "Remove item" : "Restore item"}</button>}
                </div>
            </div>
        </Card>)}</div>
        <Card className="mt-5 overflow-hidden"><div className="grid gap-6 p-6 lg:grid-cols-[1fr_360px] lg:p-8"><div>
            <h3 className="text-lg font-black text-slate-950 dark:text-white">Quotation summary</h3><p className="mt-2 text-sm leading-6 text-slate-500">All prices are calculated by the server. Changing a quantity never changes the authoritative unit price, product brand, model or specification.</p>
            {error && <div className="mt-4 flex gap-2 rounded-xl bg-rose-500/10 p-3 text-sm text-rose-600"><AlertCircle size={17} className="mt-0.5 shrink-0" />{error}</div>}
            {editable && <div className="mt-5 flex flex-wrap gap-3"><button disabled={!!busy} onClick={previewChanges} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-black text-slate-700 hover:bg-slate-50 disabled:opacity-50 dark:border-white/10 dark:text-white dark:hover:bg-white/5">{busy === "preview" ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw size={16} />}Preview changes</button><button disabled={!!busy} onClick={saveChanges} className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-black text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 disabled:opacity-50">{busy === "save" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save size={16} />}Save quotation</button></div>}
        </div><div className="rounded-2xl bg-slate-950 p-5 text-white"><PriceRow label="Subtotal" value={shown.formatted_subtotal || money(shown.subtotal, shown.currency || proposal.currency)} /><PriceRow label="Discount" value={shown.formatted_discount || money(shown.discount, shown.currency || proposal.currency)} /><PriceRow label="Tax" value={shown.formatted_tax || money(shown.tax, shown.currency || proposal.currency)} /><PriceRow label="Delivery" value={shown.formatted_delivery_fee || money(shown.delivery_fee, shown.currency || proposal.currency)} /><div className="my-4 h-px bg-white/10" /><div className="flex items-end justify-between gap-4"><span className="text-sm font-bold text-slate-400">Total investment</span><span className="text-xl font-black">{shown.formatted_total || money(shown.total, shown.currency || proposal.currency)}</span></div></div></div></Card>
    </section>;
}

function PriceRow({ label, value }) { return <div className="mb-3 flex items-center justify-between gap-4 text-sm"><span className="text-slate-400">{label}</span><span className="font-bold">{value}</span></div>; }

function ScreensSection({ screens }) {
    if (!screens?.length) return null;
    return <section className="scroll-mt-24"><SectionHeading eyebrow="User experience" title="Screens & experiences" description="The key interfaces and workflows planned for the solution." icon={MonitorSmartphone} /><div className="grid gap-4 md:grid-cols-2">{screens.map((screen) => <Card key={screen.id || screen.name} className="p-5 sm:p-6"><div className="flex items-start justify-between gap-4"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600"><MonitorSmartphone size={18} /></div>{screen.complexity && <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-black uppercase text-slate-500 dark:bg-white/5">{screen.complexity}</span>}</div><h3 className="mt-4 font-black text-slate-950 dark:text-white">{screen.name}</h3>{screen.purpose && <p className="mt-2 text-sm leading-6 text-slate-500">{screen.purpose}</p>}<div className="mt-4"><SmartValue value={{ key_functionality: screen.key_functionality, major_components: screen.major_components, user_roles: screen.user_roles }} /></div></Card>)}</div></section>;
}

function TimelineSection({ timeline, milestones }) {
    const items = Array.isArray(milestones) && milestones.length ? milestones : (isObject(timeline) ? Object.entries(timeline).map(([key, value]) => ({ title: humanize(key), detail: value })) : []);
    if (!items.length && !hasValue(timeline)) return null;
    return <section id="timeline" className="scroll-mt-24"><SectionHeading eyebrow="Delivery plan" title="Project roadmap" description="A clear view of how the engagement moves from agreement to delivery." icon={Rocket} /><Card className="p-5 sm:p-8"><div className="space-y-0">{items.length ? items.map((item, index) => <div key={item.id || item.title || index} className="relative flex gap-5 pb-7 last:pb-0"><div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-black text-white">{String(index + 1).padStart(2, "0")}</div>{index < items.length - 1 && <div className="absolute left-5 top-10 h-[calc(100%-40px)] w-px bg-slate-200 dark:bg-white/10" />}<div className="pt-1"><h3 className="font-black text-slate-950 dark:text-white">{item.title || item.name || item.milestone || `Phase ${index + 1}`}</h3><div className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400"><SmartValue value={item.detail ?? item.description ?? item} /></div></div></div>) : <SmartValue value={timeline} />}</div></Card></section>;
}

function Modal({ open, onClose, title, children }) {
    if (!open) return null;
    return <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"><button aria-label="Close" className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={onClose} /><div className="relative w-full max-w-lg rounded-[28px] border border-white/10 bg-white p-6 shadow-2xl dark:bg-[#0b1220] sm:p-8"><div className="flex items-start justify-between gap-4"><h2 className="text-xl font-black text-slate-950 dark:text-white">{title}</h2><button onClick={onClose} className="rounded-xl bg-slate-100 p-2 dark:bg-white/5"><X size={18} /></button></div>{children}</div></div>;
}

function ActionModal({ type, proposal, open, onClose, onComplete }) {
    const [comment, setComment] = useState(""); const [busy, setBusy] = useState(false); const [error, setError] = useState("");
    useEffect(() => { if (open) { setComment(""); setError(""); } }, [open]);
    const accept = type === "accept";
    const submit = async () => {
        if (!accept && comment.trim().length < 5) { setError("Please provide a brief reason for declining the proposal."); return; }
        setBusy(true); setError("");
        try {
            const data = await apiFetch(`/api/proposals/client/${proposal.public_token}/${accept ? "accept" : "decline"}/`, { method: "POST", body: JSON.stringify({ comment: comment.trim() }) });
            await onComplete(data); onClose();
        } catch (err) { setError(err.message); } finally { setBusy(false); }
    };
    return <Modal open={open} onClose={busy ? undefined : onClose} title={accept ? "Accept this proposal" : "Decline proposal"}><div className="mt-5">
        <div className={cx("rounded-2xl p-4 text-sm leading-6", accept ? "bg-emerald-500/10 text-emerald-800 dark:text-emerald-300" : "bg-rose-500/10 text-rose-700 dark:text-rose-300")}>{accept ? <>You are accepting <strong>version {proposal.version}</strong> with a current investment of <strong>{proposal.formatted_total || money(proposal.total_price, proposal.currency)}</strong>. Your accepted scope and quotation will be frozen by the server.</> : <>Declining will close this proposal for further client editing. Please tell us briefly why so the team can respond appropriately.</>}</div>
        <label className="mt-5 block text-xs font-black uppercase tracking-wider text-slate-500">{accept ? "Comment (optional)" : "Reason for declining"}</label><textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={4} maxLength={5000} placeholder={accept ? "Anything you would like us to note before we proceed?" : "Please share the reason for declining..."} className="mt-2 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none focus:border-blue-500 dark:border-white/10 dark:bg-white/[0.035] dark:text-white" />
        {error && <p className="mt-3 flex gap-2 text-sm text-rose-600"><AlertCircle size={16} className="mt-0.5" />{error}</p>}
        <div className="mt-6 flex gap-3"><button disabled={busy} onClick={onClose} className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-black dark:border-white/10 dark:text-white">Cancel</button><button disabled={busy} onClick={submit} className={cx("flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-black text-white disabled:opacity-50", accept ? "bg-emerald-600 hover:bg-emerald-700" : "bg-rose-600 hover:bg-rose-700")}>{busy && <Loader2 className="h-4 w-4 animate-spin" />}{accept ? "Confirm acceptance" : "Decline proposal"}</button></div>
    </div></Modal>;
}

function ProposalSidebar({ proposal, onAccept, onDecline }) {
    const locked = ["accepted", "rejected", "expired", "cancelled"].includes(proposal.status);
    return <aside className="lg:sticky lg:top-24 lg:self-start"><Card className="overflow-hidden"><div className="bg-slate-950 p-6 text-white"><p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-300">Current investment</p><p className="mt-3 text-3xl font-black tracking-tight">{proposal.formatted_total || money(proposal.total_price, proposal.currency)}</p><div className="mt-4 flex items-center gap-2 text-xs text-slate-400"><FileCheck2 size={14} />Proposal v{proposal.version}</div></div><div className="p-5">
        <div className="space-y-3 text-sm"><SideMeta icon={UserRound} label="Prepared for" value={proposal.client?.name || proposal.client?.company || "Client"} /><SideMeta icon={CalendarDays} label="Prepared" value={dateLabel(proposal.created_at)} /><SideMeta icon={Clock3} label="Valid until" value={dateLabel(proposal.expires_at)} /><SideMeta icon={Globe2} label="Currency" value={proposal.currency || "NGN"} /></div>
        {!locked && proposal.client_editable && <div className="mt-6 space-y-3"><button onClick={onAccept} className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-black text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700">Review & accept <ArrowRight size={16} /></button><button onClick={onDecline} className="w-full rounded-xl px-4 py-3 text-sm font-bold text-slate-500 transition hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10">Decline proposal</button></div>}
        {proposal.status === "accepted" && <div className="mt-6 rounded-2xl bg-emerald-500/10 p-4 text-emerald-700 dark:text-emerald-300"><div className="flex items-center gap-2 font-black"><BadgeCheck size={18} />Proposal accepted</div><p className="mt-2 text-xs leading-5">Accepted {dateLabel(proposal.accepted_at)}{proposal.accepted_version ? ` • Version ${proposal.accepted_version}` : ""}</p></div>}
        {proposal.status === "rejected" && <div className="mt-6 rounded-2xl bg-rose-500/10 p-4 text-sm font-bold text-rose-600">This proposal has been declined.</div>}
    </div></Card></aside>;
}

function SideMeta({ icon: Icon, label, value }) { return <div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500 dark:bg-white/5"><Icon size={15} /></div><div><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</p><p className="mt-0.5 font-bold text-slate-800 dark:text-slate-200">{value || "—"}</p></div></div>; }

function LoadingScreen() { return <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-[#070b14]"><div className="text-center"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-600/20"><Loader2 className="h-6 w-6 animate-spin" /></div><p className="mt-5 text-sm font-bold text-slate-500">Preparing your proposal…</p></div></div>; }
function ErrorScreen({ error, retry }) { return <div className="flex min-h-screen items-center justify-center bg-slate-50 p-5 dark:bg-[#070b14]"><Card className="w-full max-w-lg p-8 text-center"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-600"><AlertCircle size={24} /></div><h1 className="mt-5 text-2xl font-black dark:text-white">Proposal unavailable</h1><p className="mt-3 text-sm leading-6 text-slate-500">{error}</p><button onClick={retry} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white dark:bg-white dark:text-slate-950"><RefreshCw size={16} />Try again</button></Card></div>; }

export default function ClientProposal() {
    const { publicToken } = useParams();
    const [proposal, setProposal] = useState(null); const [loading, setLoading] = useState(true); const [error, setError] = useState(""); const [featureBusy, setFeatureBusy] = useState(null); const [modal, setModal] = useState(null); const [toast, setToast] = useState("");

    const loadProposal = useCallback(async (silent = false) => {
        if (!publicToken) { setError("The proposal link is incomplete."); setLoading(false); return; }
        if (!silent) setLoading(true); setError("");
        try { const data = await apiFetch(`/api/proposals/client/${publicToken}/`); setProposal(data.proposal); }
        catch (err) { setError(err.message); }
        finally { if (!silent) setLoading(false); }
    }, [publicToken]);
    useEffect(() => { loadProposal(); }, [loadProposal]);
    useEffect(() => { if (!toast) return; const timer = setTimeout(() => setToast(""), 3500); return () => clearTimeout(timer); }, [toast]);

    const toggleFeature = async (feature) => {
        setFeatureBusy(feature.id);
        try { const data = await apiFetch(`/api/proposals/client/${publicToken}/features/${feature.id}/toggle/`, { method: "POST", body: JSON.stringify({}) }); await loadProposal(true); setToast(`${data.feature?.name || feature.name} updated.`); }
        catch (err) { setToast(err.message); }
        finally { setFeatureBusy(null); }
    };

    if (loading) return <LoadingScreen />;
    if (error || !proposal) return <ErrorScreen error={error || "This proposal could not be loaded."} retry={() => loadProposal()} />;

    const clientName = proposal.client?.name || proposal.client?.company || "Client";
    return <div className="min-h-screen bg-[#f7f9fc] text-slate-900 dark:bg-[#070b14] dark:text-white">
        <header className="relative overflow-hidden bg-[#07101f] text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(37,99,235,.22),transparent_32%),radial-gradient(circle_at_85%_20%,rgba(124,58,237,.16),transparent_28%)]" />
            <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:44px_44px]" />
            <div className="relative mx-auto max-w-7xl px-5 py-6 sm:px-6 lg:px-8"><div className="flex items-center justify-between gap-4"><a href="/" className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-black">AB</div><div><p className="text-sm font-black tracking-tight">AB Technologies</p><p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Client Proposal</p></div></a><StatusBadge status={proposal.status} /></div></div>
            <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-12 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24 lg:pt-16"><div className="max-w-4xl"><div className="flex flex-wrap items-center gap-2 text-xs font-bold text-blue-300"><span>Prepared for {clientName}</span><span className="text-white/20">•</span><span>Proposal v{proposal.version}</span></div><h1 className="mt-5 text-4xl font-black tracking-[-0.04em] sm:text-5xl lg:text-6xl">{proposal.title}</h1>{proposal.client_summary && <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">{proposal.client_summary}</p>}
                <div className="mt-8 flex flex-wrap gap-3"><a href="#scope" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-black text-slate-950 hover:bg-blue-50">Explore proposal <ChevronDown size={16} /></a>{proposal.client?.company && <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-slate-300"><Building2 size={16} />{proposal.client.company}</span>}</div>
            </div></div>
        </header>

        <main className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8 lg:py-16"><div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_350px]"><div className="space-y-16">
            {(hasValue(proposal.business_objectives) || hasValue(proposal.confirmed_requirements)) && <section><SectionHeading eyebrow="Executive overview" title="Understanding your objectives" description="The business goals and confirmed needs shaping this engagement." icon={Target} /><div className="grid gap-4 md:grid-cols-2">{hasValue(proposal.business_objectives) && <Card className="p-6"><h3 className="mb-4 flex items-center gap-2 font-black dark:text-white"><Target size={17} className="text-blue-600" />Business objectives</h3><SmartValue value={proposal.business_objectives} /></Card>}{hasValue(proposal.confirmed_requirements) && <Card className="p-6"><h3 className="mb-4 flex items-center gap-2 font-black dark:text-white"><CheckCircle2 size={17} className="text-emerald-600" />Confirmed requirements</h3><SmartValue value={proposal.confirmed_requirements} /></Card>}</div></section>}

            <FeatureSection proposal={proposal} onToggle={toggleFeature} busyId={featureBusy} />
            <QuotationEditor proposal={proposal} quotation={proposal.quotation} onSaved={() => loadProposal(true)} />
            <InfoSection eyebrow="Complete scope" title="Solution scope" description="The agreed functional and operational boundaries of the engagement." icon={BriefcaseBusiness} value={proposal.scope} />
            <InfoSection eyebrow="Requirements" title="Project requirements" icon={FileCheck2} value={proposal.requirements} />
            <ScreensSection screens={proposal.screens} />
            <InfoSection eyebrow="Experience" title="Pages & application areas" icon={Layers3} value={proposal.pages} />
            <InfoSection eyebrow="Capabilities" title="Features & functionality" icon={Zap} value={proposal.features} />
            <div className="grid gap-8 xl:grid-cols-2"><InfoSection eyebrow="Access" title="Authentication & identity" icon={LockKeyhole} value={proposal.authentication} /><InfoSection eyebrow="Connectivity" title="Integrations" icon={Network} value={proposal.integrations} /></div>
            <div className="grid gap-8 xl:grid-cols-3"><InfoSection eyebrow="Platform" title="Mobile" icon={MonitorSmartphone} value={proposal.mobile} /><InfoSection eyebrow="Application" title="Backend" icon={Database} value={proposal.backend} /><InfoSection eyebrow="Infrastructure" title="DevOps" icon={ServerCog} value={proposal.devops} /></div>
            <InfoSection eyebrow="Engineering" title="Technical scope" description="The technical architecture, platforms and implementation considerations behind the solution." icon={Code2} value={proposal.technical_scope} />
            <InfoSection eyebrow="Security" title="Security & protection" icon={ShieldCheck} value={proposal.security} />
            <InfoSection eyebrow="Handover" title="Deliverables" icon={PackageCheck} value={proposal.deliverables} />
            <TimelineSection timeline={proposal.timeline} milestones={proposal.milestones} />
            <InfoSection eyebrow="Planning" title="Recommended requirements" icon={Sparkles} value={proposal.recommended_requirements} />
            <InfoSection eyebrow="Future roadmap" title="Optional future opportunities" icon={Rocket} value={proposal.optional_future_features} />
            <InfoSection eyebrow="Commercial notes" title="Recurring costs" icon={CircleDollarSign} value={proposal.recurring_costs} />
            {(hasValue(proposal.assumptions) || hasValue(proposal.exclusions)) && <section><SectionHeading eyebrow="Project boundaries" title="Assumptions & exclusions" description="Important context for understanding what the proposal assumes and what sits outside the current scope." icon={FileText} /><div className="grid gap-4 md:grid-cols-2"><Card className="p-6"><h3 className="mb-4 font-black dark:text-white">Assumptions</h3>{hasValue(proposal.assumptions) ? <SmartValue value={proposal.assumptions} /> : <EmptyState />}</Card><Card className="p-6"><h3 className="mb-4 font-black dark:text-white">Exclusions</h3>{hasValue(proposal.exclusions) ? <SmartValue value={proposal.exclusions} /> : <EmptyState />}</Card></div></section>}

            <section className="overflow-hidden rounded-[30px] bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-950 p-7 text-white shadow-2xl shadow-blue-900/10 sm:p-10"><div className="max-w-3xl"><p className="text-[11px] font-black uppercase tracking-[0.22em] text-blue-200">Ready when you are</p><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">A clear scope. A clear investment. A practical path forward.</h2><p className="mt-4 text-sm leading-7 text-blue-100">Review the details above, make any available scope or quotation edits, then accept the proposal when everything reflects what you want AB Technologies to deliver.</p>{proposal.client_editable && !["accepted", "rejected", "expired", "cancelled"].includes(proposal.status) && <button onClick={() => setModal("accept")} className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-black text-blue-700">Accept proposal <ArrowRight size={16} /></button>}</div></section>
        </div><ProposalSidebar proposal={proposal} onAccept={() => setModal("accept")} onDecline={() => setModal("decline")} /></div></main>

        <footer className="border-t border-slate-200 bg-white py-8 dark:border-white/[0.07] dark:bg-[#070b14]"><div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 text-xs text-slate-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8"><p>© {new Date().getFullYear()} AB Technologies. Proposal information is confidential and intended for the named client.</p><div className="flex flex-wrap gap-4">{proposal.client?.email && <span className="flex items-center gap-1.5"><Mail size={13} />{proposal.client.email}</span>}{proposal.client?.country && <span className="flex items-center gap-1.5"><MapPin size={13} />{proposal.client.country}</span>}</div></div></footer>

        <ActionModal type="accept" proposal={proposal} open={modal === "accept"} onClose={() => setModal(null)} onComplete={async (data) => { await loadProposal(true); setToast(data?.message || "Proposal accepted successfully."); }} />
        <ActionModal type="decline" proposal={proposal} open={modal === "decline"} onClose={() => setModal(null)} onComplete={async (data) => { await loadProposal(true); setToast(data?.message || "Proposal declined."); }} />
        {toast && <div className="fixed bottom-5 left-1/2 z-[120] -translate-x-1/2 rounded-2xl border border-white/10 bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-2xl">{toast}</div>}
    </div>;
}
