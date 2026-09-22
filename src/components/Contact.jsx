import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowRight, ArrowUpRight, BadgeCheck, Building2, CheckCircle2,
    ChevronDown, Clock3, Code2, Globe2, Headphones, Mail, MapPin,
    MessageSquareText, Network, Phone, Send, ShieldCheck, ShoppingCart,
    Sparkles, Users, Workflow, Wrench, Zap
} from "lucide-react";
import { queueSupportRequest } from "./AI";

const contactReasons = [
    ["Start a Technology Project", "Planning software, infrastructure, automation, AI, security or a broader digital initiative?", Sparkles, "Start project"],
    ["Technology Procurement", "Hardware, devices, networking equipment, software licensing and enterprise technology sourcing.", ShoppingCart, "Procurement"],
    ["Software & Applications", "Websites, portals, internal systems, mobile apps, APIs, integrations and custom software.", Code2, "Software enquiry"],
    ["Infrastructure & Networking", "Networks, Wi-Fi, servers, cloud environments, connectivity and IT infrastructure.", Network, "Infrastructure enquiry"],
    ["Security & Protection", "CCTV, access control, cybersecurity, endpoint protection and physical or digital security.", ShieldCheck, "Security enquiry"],
    ["AI & Automation", "Automate workflows, connect systems, deploy AI assistants and intelligent solutions.", Workflow, "AI and automation enquiry"],
];

const processSteps = [
    ["01", "Tell us what you need", "Share the problem, requirement, project idea or technology you are considering. You do not need a perfect specification."],
    ["02", "We clarify the requirement", "We ask about users, goals, environment, timeline, priorities, constraints and budget."],
    ["03", "We define the right path", "We recommend a solution, discovery session, assessment, procurement route or implementation plan."],
    ["04", "We move into delivery", "Once scope is clear, we proceed with quotation, sourcing, development, deployment or support."],
];

const faqs = [
    ["Do I need a complete technical specification before contacting you?", "No. Start with the problem, desired outcome or even an early idea. We can help turn it into a clearer technical requirement."],
    ["Can AB TECHNOLOGIES help us choose what technology to buy?", "Yes. We can help with requirements, specifications, vendor evaluation, procurement planning, sourcing and implementation."],
    ["Can we discuss a project before requesting a formal quote?", "Yes. For projects that still need clarification, discussing the requirement first usually produces a more accurate quotation."],
    ["Do you work with businesses only?", "No. We can support businesses, startups, schools, healthcare organizations, NGOs, institutions, retail and manufacturing environments."],
    ["Can you support an existing system or infrastructure?", "Yes. We can assess existing software, networks, cloud environments, devices and security systems, then recommend improvements or ongoing support."],
    ["What if we are not sure about our budget yet?", "That is fine. We can clarify the requirement first and ask whether you have a target budget or budget range, then structure realistic options."],
];

const inputClass = "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white";

function Field({ label, required = false, children }) {
    return <label className="block">
        <span className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">{label}{required && <span className="ml-1 text-blue-600">*</span>}</span>
        {children}
    </label>;
}

export default function Contact() {
    const navigate = useNavigate();
    const [openFaq, setOpenFaq] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({ name: "", organization: "", email: "", phone: "", interest: "General technology enquiry", budget: "", timeline: "", message: "" });

    const interests = useMemo(() => [
        "General technology enquiry", "Software & application development", "Technology procurement",
        "Networking & IT infrastructure", "Cloud & digital infrastructure", "Security & CCTV",
        "AI & automation", "Managed IT & technical support", "Training & learning", "Partnership opportunity", "Other"
    ], []);

    const startSupportChat = (message, metadata = {}) => {
        queueSupportRequest({ message: message || "I'd like to discuss a technology requirement with AB TECHNOLOGIES.", metadata: { Source: "Contact", ...metadata } });
        navigate("/support/ai");
    };

    const updateField = (field, value) => setForm(v => ({ ...v, [field]: value }));

    const handleSubmit = (e) => {
        e.preventDefault();

        const fullMessage = `
    NEW CONTACT / TECHNOLOGY REQUIREMENT
    
    Name: ${form.name || "Not provided"}
    Organization: ${form.organization || "Not provided"}
    Email: ${form.email || "Not provided"}
    Phone / WhatsApp: ${form.phone || "Not provided"}
    
    What they need:
    ${form.interest || "Not provided"}
    
    Target timeline:
    ${form.timeline || "Not provided"}
    
    Target budget / budget range:
    ${form.budget || "Not provided"}
    
    Full requirement:
    ${form.message || "Not provided"}
    
    Please use all of the information above to continue the conversation and help define the appropriate next step.
        `.trim();

        queueSupportRequest({
            message: fullMessage,

            metadata: {
                Source: "Contact Form",
                Intent: form.interest || "General technology enquiry",

                Name: form.name || "Not provided",
                Organization: form.organization || "Not provided",
                Email: form.email || "Not provided",
                Phone: form.phone || "Not provided",

                Interest: form.interest || "Not provided",
                Budget: form.budget || "Not provided",
                Timeline: form.timeline || "Not provided",

                Requirement: form.message || "Not provided",
            },
        });

        setSubmitted(true);
        navigate("/support/ai");
    };

    return <main className="min-h-screen overflow-hidden bg-slate-50 text-slate-950 dark:bg-[#050816] dark:text-white">
        {/* HERO */}
        <section className="relative isolate overflow-hidden">
            <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_12%_15%,rgba(37,99,235,.16),transparent_28%),radial-gradient(circle_at_85%_18%,rgba(124,58,237,.14),transparent_28%),radial-gradient(circle_at_55%_90%,rgba(6,182,212,.10),transparent_32%)]" />
            <div className="mx-auto grid max-w-7xl gap-14 px-5 pb-20 pt-20 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-8 lg:pb-28 lg:pt-28">
                <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-2 text-xs font-black uppercase tracking-[.18em] text-blue-600 dark:text-blue-300"><MessageSquareText className="h-4 w-4" /> Contact AB TECHNOLOGIES</div>
                    <h1 className="mt-7 text-4xl font-black tracking-tight sm:text-5xl lg:text-7xl">Start with the <span className="block bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-500 bg-clip-text text-transparent">requirement.</span></h1>
                    <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">Whether you are planning a project, sourcing technology, improving infrastructure or simply trying to understand what comes next, tell us what you are working on.</p>
                    <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                        <button onClick={() => startSupportChat("I'd like to discuss a technology requirement with AB TECHNOLOGIES.", { Intent: "Start conversation" })} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 py-4 text-sm font-black text-white shadow-xl hover:bg-blue-700 dark:bg-white dark:text-slate-950">Start a Conversation <ArrowRight className="h-4 w-4" /></button>
                        <a href="#contact-form" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white/80 px-6 py-4 text-sm font-black dark:border-white/10 dark:bg-white/[.05]">Send Your Requirement <Send className="h-4 w-4" /></a>
                    </div>
                    <div className="mt-10 grid gap-3 sm:grid-cols-3">
                        {[[BadgeCheck, "Requirement-first", "No perfect brief needed"], [Users, "Human + AI support", "A faster way to start"], [Globe2, "Flexible delivery", "Local & remote projects"]].map(([Icon, t, d]) => <div key={t} className="rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-white/10 dark:bg-white/[.04]"><Icon className="h-5 w-5 text-blue-600" /><div className="mt-3 text-sm font-black">{t}</div><div className="mt-1 text-xs text-slate-500">{d}</div></div>)}
                    </div>
                </div>
                <div className="rounded-[2.25rem] border border-slate-200 bg-white p-7 shadow-2xl dark:border-white/10 dark:bg-white/[.05] sm:p-8">
                    <div className="flex items-center justify-between"><div><div className="text-xs font-black uppercase tracking-[.18em] text-blue-600">Fastest way to begin</div><h2 className="mt-2 text-2xl font-black">Tell our support assistant.</h2></div><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white"><Zap className="h-5 w-5" /></div></div>
                    <div className="mt-7 space-y-3">{["What are you trying to achieve?", "What technology or service do you need?", "When would you like to start?", "Do you have a target budget or budget range?"].map((x, i) => <div key={x} className="flex gap-3 rounded-2xl bg-slate-50 p-4 dark:bg-white/[.04]"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-xs font-black text-blue-600">{i + 1}</span><span className="pt-1 text-sm font-semibold">{x}</span></div>)}</div>
                    <button onClick={() => startSupportChat("I'd like help defining my technology requirement.", { Intent: "Requirements discovery" })} className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 text-sm font-black text-white hover:bg-blue-700">Let’s Define My Requirement <ArrowRight className="h-4 w-4" /></button>
                </div>
            </div>
        </section>

        {/* CONTACT STRIP */}
        <section className="border-y border-slate-200 bg-white py-8 dark:border-white/10 dark:bg-[#070b1a]">
            <div className="mx-auto grid max-w-7xl gap-4 px-5 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
                {[[Mail, "Email", "support@workforceprox.com", "For written enquiries"], [Phone, "Phone", "Available by arrangement", "For scheduled discussions"], [Clock3, "Response", "Business enquiries", "Handled as quickly as possible"], [MapPin, "Delivery", "On-site + remote", "Based on project requirements"]].map(([Icon, l, v, n]) => <div key={l} className="flex gap-4 p-4"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600"><Icon className="h-5 w-5" /></div><div><div className="text-xs font-black uppercase tracking-wider text-slate-400">{l}</div><div className="mt-1 text-sm font-black">{v}</div><div className="mt-1 text-xs text-slate-500">{n}</div></div></div>)}
            </div>
        </section>

        {/* HELP AREAS */}
        <section className="py-20 lg:py-28"><div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="max-w-3xl"><div className="text-sm font-black uppercase tracking-[.2em] text-blue-600">What can we help with?</div><h2 className="mt-3 text-3xl font-black sm:text-4xl">One conversation can start in many places.</h2><p className="mt-5 leading-8 text-slate-600 dark:text-slate-400">Choose the area closest to your requirement. You can explain the details once the support conversation opens.</p></div>
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{contactReasons.map(([title, desc, Icon, intent]) => <button key={title} onClick={() => startSupportChat(`I'd like to discuss ${title.toLowerCase()} for our organization.`, { Intent: intent, Area: title })} className="group rounded-[2rem] border border-slate-200 bg-white p-7 text-left shadow-sm transition hover:-translate-y-1 hover:border-blue-400 hover:shadow-xl dark:border-white/10 dark:bg-white/[.04]"><div className="flex justify-between"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600"><Icon className="h-6 w-6" /></div><ArrowUpRight className="h-5 w-5 text-slate-300 group-hover:text-blue-500" /></div><h3 className="mt-6 text-lg font-black">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-500">{desc}</p><div className="mt-6 flex items-center gap-2 text-xs font-black text-blue-600">Discuss requirement <ArrowRight className="h-3.5 w-3.5" /></div></button>)}</div>
        </div></section>

        {/* FORM */}
        <section id="contact-form" className="bg-slate-100 py-20 dark:bg-[#070b1a] lg:py-28"><div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[.8fr_1.2fr] lg:px-8">
            <div><div className="sticky top-28"><div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-2 text-xs font-black uppercase tracking-wider text-blue-600"><Send className="h-4 w-4" /> Send a requirement</div><h2 className="mt-6 text-3xl font-black sm:text-4xl">Give us enough context to start intelligently.</h2><p className="mt-5 leading-8 text-slate-600 dark:text-slate-400">You do not need to know the exact technology, architecture or product. Tell us what you are trying to solve and we will work from there.</p><div className="mt-8 space-y-4">{["Project and procurement enquiries", "Software, infrastructure and security", "AI, automation and digital transformation", "Support, training and partnerships"].map(x => <div key={x} className="flex items-center gap-3 text-sm font-semibold"><CheckCircle2 className="h-5 w-5 text-emerald-500" />{x}</div>)}</div><div className="mt-10 rounded-3xl border border-blue-500/20 bg-blue-500/[.06] p-6"><div className="flex items-center gap-3 font-black"><Headphones className="h-5 w-5 text-blue-600" />Not sure what to select?</div><p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">Choose “General technology enquiry” and describe the problem in your own words.</p></div></div></div>
            <form onSubmit={handleSubmit} className="rounded-[2.25rem] border border-slate-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#050816] sm:p-8 lg:p-10">
                <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Your name" required><input required value={form.name} onChange={e => updateField("name", e.target.value)} placeholder="Full name" className={inputClass} /></Field>
                    <Field label="Organization"><input value={form.organization} onChange={e => updateField("organization", e.target.value)} placeholder="Company or organization" className={inputClass} /></Field>
                    <Field label="Email address" required><input required type="email" value={form.email} onChange={e => updateField("email", e.target.value)} placeholder="you@company.com" className={inputClass} /></Field>
                    <Field label="Phone / WhatsApp"><input value={form.phone} onChange={e => updateField("phone", e.target.value)} placeholder="+234..." className={inputClass} /></Field>
                    <Field label="What do you need?" required><select value={form.interest} onChange={e => updateField("interest", e.target.value)} className={inputClass}>{interests.map(x => <option key={x}>{x}</option>)}</select></Field>
                    <Field label="Target timeline"><select value={form.timeline} onChange={e => updateField("timeline", e.target.value)} className={inputClass}><option value="">Select timeline</option><option>As soon as possible</option><option>Within 1 month</option><option>1–3 months</option><option>3–6 months</option><option>6+ months</option><option>Still planning</option></select></Field>
                </div>
                <div className="mt-5"><Field label="Target budget or budget range"><input value={form.budget} onChange={e => updateField("budget", e.target.value)} placeholder="e.g. ₦2m–₦5m, $5k–$10k, or Not sure yet" className={inputClass} /></Field><p className="mt-2 text-xs text-slate-400">If you are not certain yet, write “Not sure yet.” We can help define realistic options around the requirement.</p></div>
                <div className="mt-5"><Field label="Tell us about the requirement" required><textarea required rows={7} value={form.message} onChange={e => updateField("message", e.target.value)} placeholder="What are you trying to achieve? Include known users, quantities, locations, systems, products or constraints." className={`${inputClass} resize-none`} /></Field></div>
                <div className="mt-6 flex flex-col gap-4 rounded-2xl bg-slate-50 p-4 dark:bg-white/[.04] sm:flex-row sm:items-center sm:justify-between"><p className="max-w-lg text-xs leading-5 text-slate-500">Your requirement is passed into the support flow so the conversation can continue with the context you provided.</p><button type="submit" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-3.5 text-sm font-black text-white hover:bg-blue-700">Send Requirement <ArrowRight className="h-4 w-4" /></button></div>
            </form>
        </div></section>

        {/* PROCESS */}
        <section className="py-20 lg:py-28"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="mx-auto max-w-3xl text-center"><div className="text-sm font-black uppercase tracking-[.2em] text-blue-600">What happens next</div><h2 className="mt-3 text-3xl font-black sm:text-4xl">From first conversation to a clear next step.</h2></div><div className="mt-14 grid gap-5 lg:grid-cols-4">{processSteps.map(([n, t, d]) => <div key={n} className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm dark:border-white/10 dark:bg-white/[.04]"><div className="text-4xl font-black text-blue-600/20">{n}</div><h3 className="mt-5 text-lg font-black">{t}</h3><p className="mt-3 text-sm leading-7 text-slate-500">{d}</p></div>)}</div></div></section>

        {/* FLEXIBLE ENGAGEMENT */}
        <section className="bg-slate-950 py-20 text-white dark:bg-black lg:py-28"><div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:px-8"><div><div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-black uppercase tracking-wider text-blue-300"><Wrench className="h-4 w-4" /> Flexible engagement</div><h2 className="mt-6 text-3xl font-black sm:text-4xl lg:text-5xl">Contact us at the stage you are actually in.</h2><p className="mt-5 leading-8 text-slate-400">Some organizations have a finished specification. Others only know that something is not working. Both are valid starting points.</p><button onClick={() => startSupportChat("We are not completely sure what technology we need yet. I'd like help working through the requirement.", { Intent: "Early-stage discovery" })} className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-black text-slate-950">Help Me Figure It Out <ArrowRight className="h-4 w-4" /></button></div><div className="grid gap-4 sm:grid-cols-2">{[["I have an idea", "Turn an early idea into a practical technology direction."], ["I have a requirement", "Review scope, architecture, products, delivery and cost."], ["I need a quote", "Provide enough detail for a structured commercial response."], ["I need support", "Discuss an existing system, infrastructure or technology issue."]].map(([t, d]) => <div key={t} className="rounded-3xl border border-white/10 bg-white/[.05] p-6"><CheckCircle2 className="h-5 w-5 text-emerald-400" /><h3 className="mt-5 font-black">{t}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{d}</p></div>)}</div></div></section>

        {/* FAQ */}
        <section className="py-20 lg:py-28"><div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[.75fr_1.25fr] lg:px-8"><div><div className="text-sm font-black uppercase tracking-[.2em] text-blue-600">Before you contact us</div><h2 className="mt-3 text-3xl font-black sm:text-4xl">Common questions.</h2><p className="mt-5 leading-8 text-slate-600 dark:text-slate-400">If your question is specific to your organization, start a support conversation and provide the context.</p></div><div className="space-y-3">{faqs.map(([q, a], i) => { const open = openFaq === i; return <div key={q} className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-white/[.04]"><button onClick={() => setOpenFaq(open ? null : i)} className="flex w-full items-center justify-between gap-6 p-5 text-left sm:p-6"><span className="font-black">{q}</span><ChevronDown className={`h-5 w-5 shrink-0 transition ${open ? "rotate-180" : ""}`} /></button>{open && <div className="border-t border-slate-200 px-5 py-5 text-sm leading-7 text-slate-600 dark:border-white/10 dark:text-slate-400 sm:px-6">{a}</div>}</div> })}</div></div></section>

        {/* FINAL CTA */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-violet-700 py-20 text-white lg:py-28"><div className="mx-auto max-w-5xl px-5 text-center"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10"><Building2 className="h-7 w-7" /></div><h2 className="mt-7 text-3xl font-black sm:text-4xl lg:text-5xl">Your technology requirement can start as a conversation.</h2><p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-blue-100">Tell us what you need, what you are trying to improve, or what decision you are trying to make. We will help define the next practical step.</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><button onClick={() => startSupportChat("I'd like to start a conversation about our technology requirements.", { Intent: "Start conversation" })} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-7 py-4 text-sm font-black text-slate-950">Talk to AB TECHNOLOGIES <ArrowRight className="h-4 w-4" /></button><a href="#contact-form" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-7 py-4 text-sm font-black">Send a Detailed Requirement <Send className="h-4 w-4" /></a></div></div></section>
    </main>;
}
