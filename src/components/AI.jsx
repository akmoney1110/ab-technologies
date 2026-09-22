import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import {
    AlertCircle,
    ArrowRight,
    ArrowUp,
    Bot,
    Check,
    CheckCircle2,
    ChevronDown,
    Clock3,
    Copy,
    Headphones,
    HelpCircle,
    Laptop,
    Loader2,
    MessageCircle,
    Network,
    Plus,
    RefreshCw,
    RotateCcw,
    Send,
    ShieldCheck,
    Sparkles,
    UserRound,
    WifiOff,
    X,
} from "lucide-react";


/* =========================================================
   CONFIGURATION
========================================================= */

const API_URL =
    import.meta.env.VITE_API_URL ||
    "http://127.0.0.1:8000";

const AI_ENDPOINT = `${API_URL}/api/ai/chat/`;

const REQUEST_TIMEOUT = 30000;


/* =========================================================
   SHARED REQUEST STORE
   ---------------------------------------------------------
   This module-level store lets any page (procurement,
   services, contact, etc.) hand off a request to the
   support page. The support page reads it on mount,
   auto-sends the message, and clears it.

   Usage from another page:
     import { queueSupportRequest } from "./AI";
     queueSupportRequest({ message: "...", metadata: {...} });
     navigate("/support/ai");
========================================================= */

const SUPPORT_REQUEST_KEY = "ab:pending_support_request";

export const queueSupportRequest = (payload) => {
    if (typeof window === "undefined") return;

    try {
        const request = {
            message:
                typeof payload === "string"
                    ? payload
                    : payload?.message || "",
            metadata:
                typeof payload === "object" &&
                    payload !== null
                    ? payload.metadata || null
                    : null,
            createdAt: new Date().toISOString(),
        };

        if (!request.message.trim()) {
            return;
        }

        window.sessionStorage.setItem(
            SUPPORT_REQUEST_KEY,
            JSON.stringify(request)
        );

        // Also fire a custom event in case the support page
        // is already mounted in the same tab.
        window.dispatchEvent(
            new CustomEvent("ab:support-request", {
                detail: request,
            })
        );
    } catch (error) {
        console.error(
            "Failed to queue support request:",
            error
        );
    }
};

export const consumeSupportRequest = () => {
    if (typeof window === "undefined") return null;

    try {
        const raw =
            window.sessionStorage.getItem(
                SUPPORT_REQUEST_KEY
            );

        if (!raw) return null;

        window.sessionStorage.removeItem(
            SUPPORT_REQUEST_KEY
        );

        return JSON.parse(raw);
    } catch (error) {
        console.error(
            "Failed to consume support request:",
            error
        );

        return null;
    }
};


/* =========================================================
   STARTER SUGGESTIONS
========================================================= */

const STARTER_SUGGESTIONS = [
    {
        id: "software",
        icon: Laptop,
        title: "Software & Apps",
        description:
            "Websites, business software, mobile apps and custom systems.",
        text:
            "I need custom software or an application for my business.",
    },

    {
        id: "procurement",
        icon: Network,
        title: "Hardware & Procurement",
        description:
            "Computers, networking equipment and technology procurement.",
        text:
            "I need computers, networking equipment or other technology hardware.",
    },

    {
        id: "cloud",
        icon: ShieldCheck,
        title: "Cloud & IT",
        description:
            "Cloud infrastructure, hosting, DevOps and managed IT.",
        text:
            "I need help with cloud infrastructure, hosting or DevOps.",
    },

    {
        id: "specialist",
        icon: UserRound,
        title: "Talk to AB Technologies",
        description:
            "I have a project or request I would like to discuss.",
        text:
            "I would like to speak with someone from AB Technologies.",
    },
];


/* =========================================================
   SUPPORT AREAS
========================================================= */

const SUPPORT_AREAS = [
    "Software & Digital Solutions",
    "Hardware Procurement",
    "Networking & Infrastructure",
    "Cloud & Hosting",
    "AI & Automation",
    "Cybersecurity",
    "Training & Learning",
    "Project Support",
];


/* =========================================================
   HELPERS
========================================================= */

const generateId = () => {
    return `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 10)}`;
};


const formatTime = (date = new Date()) => {
    try {
        return new Intl.DateTimeFormat("en-US", {
            hour: "numeric",
            minute: "2-digit",
        }).format(new Date(date));
    } catch {
        return "";
    }
};


const createWelcomeMessage = () => ({
    id: generateId(),
    role: "assistant",
    content:
        "Welcome to AB Technologies Support. I'm AB AI, your first point of contact. I can help you explore our services, software solutions, technology procurement, cloud & IT services, training, or help you get your request to the right team. What can I help you with today?",
    createdAt: new Date(),
    options: [],
    selectionMode: "none",
    allowText: true,
});


/* =========================================================
   ERROR HELPERS
========================================================= */

const createError = ({
    type = "unknown",
    title = "Something went wrong",
    message = "AB AI could not complete your request.",
    retryAfter = null,
} = {}) => ({
    type,
    title,
    message,
    retryAfter,
});


const normalizeApiError = (response, data) => {
    const status = response?.status;

    const backendCode =
        data?.error_code ||
        data?.code ||
        data?.errorCode ||
        null;

    const backendMessage =
        data?.error ||
        data?.message ||
        data?.detail ||
        null;

    const retryAfter =
        data?.retry_after_seconds ??
        data?.retry_after ??
        null;


    if (
        backendCode === "AI_QUOTA_EXHAUSTED" ||
        (status === 429 &&
            /quota|free.?tier|resource.?exhausted|requests.?per.?day|generativelanguage/i.test(
                backendMessage || ""
            ))
    ) {
        return createError({
            type: "quota",
            title: "AB AI Daily Limit Reached",
            message:
                backendMessage ||
                "AB AI has reached today's available AI request limit. Please try again later.",
            retryAfter,
        });
    }


    if (
        backendCode === "AI_RATE_LIMITED" ||
        status === 429
    ) {
        return createError({
            type: "rate_limit",
            title: "AB AI Is Busy",
            message:
                backendMessage ||
                "AB AI is receiving several requests right now. Please wait a moment and try again.",
            retryAfter,
        });
    }


    if (
        status >= 500 ||
        backendCode === "AI_SERVICE_UNAVAILABLE"
    ) {
        return createError({
            type: "server",
            title: "Support Service Temporarily Unavailable",
            message:
                backendMessage ||
                "Our AI support service is temporarily unavailable. Please try again shortly.",
        });
    }


    if (status === 400) {
        return createError({
            type: "validation",
            title: "Request Could Not Be Sent",
            message:
                backendMessage ||
                "Please check your message and try again.",
        });
    }


    if (status === 404) {
        return createError({
            type: "server",
            title: "Support Service Not Found",
            message:
                "The support service endpoint could not be reached. Please check the backend configuration.",
        });
    }


    return createError({
        type: "unknown",
        title: "Something Went Wrong",
        message:
            backendMessage ||
            "AB AI could not complete your request. Please try again.",
    });
};


const getConnectionError = () => {
    return createError({
        type: "connection",
        title: "Connection Problem",
        message:
            "We couldn't reach AB Technologies Support. Please check your internet connection and try again.",
    });
};


/* =========================================================
   OPTION NORMALIZER
========================================================= */

const normalizeOptions = (options) => {
    if (!Array.isArray(options)) {
        return [];
    }

    return options
        .map((option) => {
            if (typeof option === "string") {
                return {
                    label: option,
                    value: option,
                };
            }

            if (!option || typeof option !== "object") {
                return null;
            }

            const label =
                option.label ||
                option.name ||
                option.title ||
                option.value;

            const value =
                option.value ||
                option.label ||
                option.name ||
                option.title;

            if (!label || !value) {
                return null;
            }

            return {
                label: String(label),
                value: String(value),
            };
        })
        .filter(Boolean);
};


/* =========================================================
   MESSAGE CONTENT
========================================================= */

const MessageContent = ({ content }) => {
    if (!content) return null;

    const lines = String(content).split("\n");

    return (
        <div className="space-y-2 leading-7">
            {lines.map((line, index) => {
                if (!line.trim()) {
                    return (
                        <div
                            key={index}
                            className="h-1"
                        />
                    );
                }

                const isBullet =
                    line.trim().startsWith("- ") ||
                    line.trim().startsWith("• ");

                const cleanedLine = line
                    .replace(/^-\s+/, "")
                    .replace(/^•\s+/, "");

                if (isBullet) {
                    return (
                        <div
                            key={index}
                            className="flex gap-2.5"
                        >
                            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-50" />

                            <span>
                                {cleanedLine}
                            </span>
                        </div>
                    );
                }

                return (
                    <p key={index}>
                        {line}
                    </p>
                );
            })}
        </div>
    );
};


/* =========================================================
   SUPPORT REPRESENTATIVE
========================================================= */

const SupportRepresentative = ({
    compact = false,
}) => {
    return (
        <div
            className={[
                "flex items-center",
                compact
                    ? "gap-3"
                    : "gap-3.5",
            ].join(" ")}
        >
            <div className="relative shrink-0">
                <div
                    className={[
                        "flex items-center justify-center rounded-2xl",
                        compact
                            ? "h-11 w-11"
                            : "h-12 w-12",
                        "bg-slate-950 text-white",
                        "shadow-lg shadow-slate-950/10",
                        "dark:bg-white dark:text-slate-950",
                    ].join(" ")}
                >
                    <Headphones
                        size={
                            compact
                                ? 18
                                : 20
                        }
                        strokeWidth={2}
                    />
                </div>

                <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500 dark:border-[#101722]" />
            </div>

            <div className="min-w-0">
                <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-bold text-slate-900 dark:text-white">
                        AB Technologies
                    </p>

                    <CheckCircle2
                        size={14}
                        className="shrink-0 text-emerald-500"
                    />
                </div>

                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    {compact
                        ? "Support Desk"
                        : "Technology Support & Solutions"}
                </p>
            </div>
        </div>
    );
};


/* =========================================================
   ERROR CARD
========================================================= */

const ErrorCard = ({
    error,
    onRetry,
    onDismiss,
}) => {
    if (!error) return null;

    const isQuota =
        error.type === "quota";

    const isConnection =
        error.type === "connection";

    const isRateLimit =
        error.type === "rate_limit";

    const isServer =
        error.type === "server";

    let Icon = AlertCircle;

    if (isQuota) {
        Icon = Sparkles;
    } else if (isConnection) {
        Icon = WifiOff;
    } else if (isServer) {
        Icon = RefreshCw;
    }


    return (
        <div className="px-0 py-2">
            <div className="overflow-hidden rounded-2xl border border-red-200/80 bg-white shadow-sm dark:border-red-500/20 dark:bg-white/[0.035]">
                <div className="p-4 sm:p-5">
                    <div className="flex gap-3.5">
                        <div
                            className={[
                                "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                                isQuota
                                    ? "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                                    : "bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400",
                            ].join(" ")}
                        >
                            <Icon size={18} />
                        </div>

                        <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                                        {error.title}
                                    </h4>

                                    <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                        {error.message}
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={
                                        onDismiss
                                    }
                                    className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-white/10 dark:hover:text-white"
                                >
                                    <X size={16} />
                                </button>
                            </div>

                            {isQuota && (
                                <div className="mt-4 rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-800 dark:bg-amber-500/5 dark:text-amber-300">
                                    AB AI's current AI request quota has been
                                    reached. Your conversation remains available.
                                </div>
                            )}

                            {isRateLimit && (
                                <div className="mt-4 rounded-xl bg-slate-100 p-3 text-xs leading-5 text-slate-600 dark:bg-white/5 dark:text-slate-400">
                                    Please wait a moment and try again.
                                </div>
                            )}

                            <div className="mt-4 flex flex-wrap gap-2">
                                {!isQuota && (
                                    <button
                                        type="button"
                                        onClick={
                                            onRetry
                                        }
                                        className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                                    >
                                        <RotateCcw
                                            size={14}
                                        />
                                        Try again
                                    </button>
                                )}

                                {isQuota && (
                                    <span className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-600 dark:border-white/10 dark:text-slate-400">
                                        <CheckCircle2
                                            size={14}
                                        />
                                        Conversation saved
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


/* =========================================================
   OPTION CHOICES
========================================================= */

const OptionChoices = ({
    message,
    selectedOptions,
    onOptionClick,
    onContinue,
}) => {
    const options = message.options || [];

    if (!options.length) {
        return null;
    }

    const mode =
        message.selectionMode === "multiple"
            ? "multiple"
            : "single";


    return (
        <div className="mt-4 grid gap-2">
            {options.map((option, index) => {
                const selected =
                    selectedOptions?.includes(
                        option.value
                    );

                const isOther =
                    option.label.toLowerCase() ===
                    "other" ||
                    option.value.toLowerCase() ===
                    "other";

                return (
                    <button
                        key={`${option.value}-${index}`}
                        type="button"
                        onClick={() =>
                            onOptionClick(
                                message.id,
                                option,
                                mode
                            )
                        }
                        className={[
                            "group flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all",
                            selected
                                ? "border-slate-950 bg-slate-950 text-white shadow-sm dark:border-white dark:bg-white dark:text-slate-950"
                                : "border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm dark:border-white/10 dark:bg-white/[0.025] dark:text-slate-300 dark:hover:border-white/20 dark:hover:bg-white/[0.05]",
                        ].join(" ")}
                    >
                        <span className="flex items-center gap-3">
                            {mode === "multiple" ? (
                                <span
                                    className={[
                                        "flex h-5 w-5 items-center justify-center rounded-md border",
                                        selected
                                            ? "border-white bg-white text-slate-950 dark:border-slate-950 dark:bg-slate-950 dark:text-white"
                                            : "border-slate-300 dark:border-white/20",
                                    ].join(" ")}
                                >
                                    {selected && (
                                        <Check size={13} />
                                    )}
                                </span>
                            ) : (
                                <span
                                    className={[
                                        "flex h-5 w-5 items-center justify-center rounded-full border",
                                        selected
                                            ? "border-white dark:border-slate-950"
                                            : "border-slate-300 dark:border-white/20",
                                    ].join(" ")}
                                >
                                    {selected && (
                                        <span className="h-2 w-2 rounded-full bg-current" />
                                    )}
                                </span>
                            )}

                            <span>
                                {option.label}
                            </span>
                        </span>

                        {isOther && (
                            <ChevronDown
                                size={15}
                                className="-rotate-90 opacity-50"
                            />
                        )}
                    </button>
                );
            })}

            {mode === "multiple" &&
                selectedOptions?.length > 0 && (
                    <button
                        type="button"
                        onClick={onContinue}
                        className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-xs font-bold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                    >
                        Continue
                        <ArrowRight size={14} />
                    </button>
                )}
        </div>
    );
};


/* =========================================================
   MESSAGE BUBBLE
========================================================= */

const MessageBubble = ({
    message,
    onCopy,
    copiedId,
    selectedOptions,
    onOptionClick,
    onContinue,
}) => {
    const isUser =
        message.role === "user";

    return (
        <div
            className={[
                "group flex w-full",
                isUser
                    ? "justify-end"
                    : "justify-start",
            ].join(" ")}
        >
            <div
                className={[
                    "flex max-w-[92%] flex-col sm:max-w-[78%]",
                    isUser
                        ? "items-end"
                        : "items-start",
                ].join(" ")}
            >
                {!isUser && (
                    <div className="mb-2.5 flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-950 text-white shadow-sm dark:bg-white dark:text-slate-950">
                            <Bot size={15} />
                        </div>

                        <div>
                            <div className="flex items-center gap-1.5">
                                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                                    AB AI
                                </span>

                                <span className="h-1 w-1 rounded-full bg-emerald-500" />
                            </div>

                            <span className="text-[10px] text-slate-400">
                                AB Technologies Support
                            </span>
                        </div>
                    </div>
                )}

                <div
                    className={[
                        "relative px-4 py-3.5 text-sm shadow-sm",
                        isUser
                            ? "rounded-2xl rounded-br-md bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                            : "rounded-2xl rounded-bl-md border border-slate-200/80 bg-white text-slate-700 dark:border-white/10 dark:bg-white/[0.045] dark:text-slate-200",
                    ].join(" ")}
                >
                    <MessageContent
                        content={
                            message.content
                        }
                    />
                </div>


                {!isUser &&
                    message.options?.length >
                    0 && (
                        <OptionChoices
                            message={message}
                            selectedOptions={
                                selectedOptions ||
                                []
                            }
                            onOptionClick={
                                onOptionClick
                            }
                            onContinue={onContinue}
                        />
                    )}


                <div
                    className={[
                        "mt-1.5 flex items-center gap-2 text-[10px] text-slate-400",
                        isUser
                            ? "justify-end"
                            : "justify-start",
                    ].join(" ")}
                >
                    <span>
                        {formatTime(
                            message.createdAt
                        )}
                    </span>

                    {!isUser && (
                        <button
                            type="button"
                            onClick={() =>
                                onCopy(message)
                            }
                            className="inline-flex items-center gap-1 opacity-0 transition group-hover:opacity-100 hover:text-slate-700 dark:hover:text-slate-200"
                        >
                            {copiedId ===
                                message.id ? (
                                <>
                                    <Check
                                        size={11}
                                    />
                                    Copied
                                </>
                            ) : (
                                <>
                                    <Copy
                                        size={11}
                                    />
                                    Copy
                                </>
                            )}
                        </button>
                    )}

                    {isUser && (
                        <Check
                            size={11}
                            className="text-emerald-500"
                        />
                    )}
                </div>
            </div>
        </div>
    );
};


/* =========================================================
   TYPING INDICATOR
========================================================= */

const TypingIndicator = () => {
    return (
        <div className="flex items-start gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                <Bot size={15} />
            </div>

            <div>
                <div className="mb-2 flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        AB AI
                    </span>

                    <span className="text-[10px] text-slate-400">
                        replying
                    </span>
                </div>

                <div className="rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-3.5 dark:border-white/10 dark:bg-white/[0.045]">
                    <div className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" />
                    </div>
                </div>
            </div>
        </div>
    );
};


/* =========================================================
   INHERITED REQUEST CARD
   ---------------------------------------------------------
   Shows a small card at the top of the conversation when
   the user arrived here from another page (e.g. the
   procurement page) with a pre-built request.
========================================================= */

const InheritedRequestCard = ({ metadata }) => {
    if (!metadata) return null;

    const entries = Object.entries(metadata).filter(
        ([, value]) =>
            value !== null &&
            value !== undefined &&
            String(value).trim() !== ""
    );

    if (!entries.length) return null;

    return (
        <div className="mb-2 w-full max-w-full rounded-2xl border border-blue-100 bg-blue-50/60 p-3.5 dark:border-cyan-400/15 dark:bg-cyan-400/[0.05]">
            <div className="flex items-center gap-2">
                <Sparkles
                    size={13}
                    className="text-blue-600 dark:text-cyan-300"
                />

                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-blue-700 dark:text-cyan-300">
                    Request context
                </span>
            </div>

            <div className="mt-2.5 grid gap-1.5 sm:grid-cols-2">
                {entries.map(([key, value]) => (
                    <div
                        key={key}
                        className="flex items-start gap-2 text-[11px] leading-5"
                    >
                        <span className="font-semibold capitalize text-slate-500 dark:text-slate-400">
                            {key
                                .replace(/([A-Z])/g, " $1")
                                .trim()}
                            :
                        </span>

                        <span className="min-w-0 flex-1 break-words text-slate-700 dark:text-slate-300">
                            {String(value)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};


/* =========================================================
   MAIN PAGE
========================================================= */

export default function AI() {
    const [messages, setMessages] =
        useState([
            createWelcomeMessage(),
        ]);

    const [input, setInput] =
        useState("");

    const [isLoading, setIsLoading] =
        useState(false);

    const [isOnline, setIsOnline] =
        useState(true);

    const [copiedId, setCopiedId] =
        useState(null);

    const [error, setError] =
        useState(null);

    const [conversationId, setConversationId] =
        useState(null);

    const [selectedOptions, setSelectedOptions] =
        useState({});

    const [inheritedContext, setInheritedContext] =
        useState(null);

    const textareaRef = useRef(null);

    const messagesEndRef = useRef(null);

    const abortControllerRef =
        useRef(null);

    const lastSubmittedMessageRef =
        useRef(null);

    const hasAutoSentRef =
        useRef(false);


    /* =====================================================
       AUTO SCROLL
    ===================================================== */

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });
    }, [
        messages,
        isLoading,
        error,
    ]);


    /* =====================================================
       INITIAL FOCUS
    ===================================================== */

    useEffect(() => {
        const timer = setTimeout(() => {
            textareaRef.current?.focus();
        }, 250);

        return () => clearTimeout(timer);
    }, []);


    /* =====================================================
       CLEANUP
    ===================================================== */

    useEffect(() => {
        return () => {
            abortControllerRef.current?.abort();
        };
    }, []);


    /* =====================================================
       TEXTAREA RESIZE
    ===================================================== */

    const resizeTextarea =
        useCallback(() => {
            const textarea =
                textareaRef.current;

            if (!textarea) return;

            textarea.style.height =
                "auto";

            textarea.style.height = `${Math.min(
                textarea.scrollHeight,
                170
            )}px`;
        }, []);


    useEffect(() => {
        resizeTextarea();
    }, [
        input,
        resizeTextarea,
    ]);


    /* =====================================================
       SEND MESSAGE
    ===================================================== */

    const sendMessage = useCallback(
        async (messageOverride = null) => {
            const text =
                typeof messageOverride ===
                    "string"
                    ? messageOverride.trim()
                    : input.trim();

            if (
                !text ||
                isLoading
            ) {
                return;
            }


            lastSubmittedMessageRef.current =
                text;

            setInput("");
            setError(null);
            setIsLoading(true);


            setMessages(
                (previous) => [
                    ...previous,
                    {
                        id: generateId(),
                        role: "user",
                        content: text,
                        createdAt:
                            new Date(),
                    },
                ]
            );


            abortControllerRef.current?.abort();

            const controller =
                new AbortController();

            abortControllerRef.current =
                controller;


            const timeout =
                setTimeout(() => {
                    controller.abort();
                }, REQUEST_TIMEOUT);


            try {
                const response =
                    await fetch(
                        AI_ENDPOINT,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json",

                                Accept:
                                    "application/json",
                            },

                            body: JSON.stringify(
                                {
                                    message:
                                        text,

                                    conversation_id:
                                        conversationId,

                                    context:
                                        inheritedContext ||
                                        undefined,
                                }
                            ),

                            signal:
                                controller.signal,
                        }
                    );


                clearTimeout(timeout);


                let data = null;

                try {
                    data =
                        await response.json();
                } catch {
                    data = null;
                }


                if (!response.ok) {
                    throw normalizeApiError(
                        response,
                        data
                    );
                }


                const reply =
                    data?.reply ||
                    data?.message?.content;


                if (!reply) {
                    throw createError({
                        type: "server",
                        title:
                            "Incomplete Response",
                        message:
                            "AB AI responded, but the response was incomplete. Please try again.",
                    });
                }


                if (
                    data?.conversation_id
                ) {
                    setConversationId(
                        data.conversation_id
                    );
                }


                const options =
                    normalizeOptions(
                        data?.options
                    );


                const selectionMode =
                    data?.selection_mode ===
                        "multiple"
                        ? "multiple"
                        : options.length > 0 &&
                            data?.selection_mode ===
                            "single"
                            ? "single"
                            : "none";


                const allowText =
                    data?.allow_text !==
                    false;


                setMessages(
                    (previous) => [
                        ...previous,
                        {
                            id:
                                data
                                    ?.message
                                    ?.id ||
                                generateId(),

                            role: "assistant",

                            content: reply,

                            createdAt:
                                data
                                    ?.message
                                    ?.created_at
                                    ? new Date(
                                        data
                                            .message
                                            .created_at
                                    )
                                    : new Date(),

                            options,

                            selectionMode,

                            allowText,
                        },
                    ]
                );


                setIsOnline(true);
            } catch (err) {
                clearTimeout(timeout);

                console.error(
                    "AB AI ERROR:",
                    err
                );


                if (
                    err?.name ===
                    "AbortError"
                ) {
                    setError(
                        createError({
                            type: "connection",
                            title:
                                "Request Timed Out",
                            message:
                                "AB AI took too long to respond. Please check your connection and try again.",
                        })
                    );

                    setIsOnline(false);

                    return;
                }


                if (
                    err?.type &&
                    err?.title &&
                    err?.message
                ) {
                    setError(err);

                    if (
                        err.type ===
                        "connection" ||
                        err.type ===
                        "server"
                    ) {
                        setIsOnline(false);
                    }

                    return;
                }


                if (
                    err instanceof
                    TypeError ||
                    /failed to fetch|network/i.test(
                        err?.message ||
                        ""
                    )
                ) {
                    setError(
                        getConnectionError()
                    );

                    setIsOnline(false);

                    return;
                }


                setError(
                    createError({
                        type: "unknown",
                        title:
                            "Something Went Wrong",
                        message:
                            err?.message ||
                            "AB AI could not complete your request.",
                    })
                );

                setIsOnline(false);
            } finally {
                clearTimeout(timeout);

                setIsLoading(false);

                setTimeout(() => {
                    textareaRef.current?.focus();
                }, 100);
            }
        },
        [
            input,
            isLoading,
            conversationId,
            inheritedContext,
        ]
    );


    /* =====================================================
       PROCESS INCOMING REQUEST
       -----------------------------------------------------
       Handles a request handed off from another page.
       Only processes once per navigation.
    ===================================================== */

    const processIncomingRequest =
        useCallback(
            (request) => {
                if (!request?.message) return;

                if (
                    hasAutoSentRef.current
                ) {
                    return;
                }

                hasAutoSentRef.current =
                    true;

                if (request.metadata) {
                    setInheritedContext(
                        request.metadata
                    );
                }

                setTimeout(() => {
                    sendMessage(
                        request.message
                    );
                }, 300);
            },
            [sendMessage]
        );


    /* =====================================================
       CONSUME PENDING REQUEST ON MOUNT
    ===================================================== */

    useEffect(() => {
        const pending =
            consumeSupportRequest();

        if (pending) {
            processIncomingRequest(
                pending
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    /* =====================================================
       LISTEN FOR LIVE REQUESTS
       -----------------------------------------------------
       If the user is already on this page and another page
       queues a request (rare, but possible in SPA routing),
       catch it via the custom event.
    ===================================================== */

    useEffect(() => {
        const handler = (event) => {
            const detail =
                event?.detail;

            if (detail?.message) {
                hasAutoSentRef.current =
                    false;

                processIncomingRequest(
                    detail
                );
            }
        };

        window.addEventListener(
            "ab:support-request",
            handler
        );

        return () => {
            window.removeEventListener(
                "ab:support-request",
                handler
            );
        };
    }, [processIncomingRequest]);


    /* =====================================================
       ENTER KEY
    ===================================================== */

    const handleKeyDown = (
        event
    ) => {
        if (
            event.key ===
            "Enter"
        ) {
            if (
                event.shiftKey
            ) {
                return;
            }

            event.preventDefault();

            sendMessage();
        }
    };


    /* =====================================================
       OPTION CLICK
    ===================================================== */

    const handleOptionClick = (
        messageId,
        option,
        mode
    ) => {
        const isOther =
            option.label.toLowerCase() ===
            "other" ||
            option.value.toLowerCase() ===
            "other";


        if (isOther) {
            textareaRef.current?.focus();

            if (mode === "single") {
                return;
            }
        }


        if (
            mode ===
            "multiple"
        ) {
            setSelectedOptions(
                (previous) => {
                    const current =
                        previous[
                        messageId
                        ] || [];

                    const exists =
                        current.includes(
                            option.value
                        );

                    return {
                        ...previous,

                        [messageId]:
                            exists
                                ? current.filter(
                                    (
                                        item
                                    ) =>
                                        item !==
                                        option.value
                                )
                                : [
                                    ...current,
                                    option.value,
                                ],
                    };
                }
            );

            return;
        }


        setSelectedOptions(
            (previous) => ({
                ...previous,
                [messageId]: [
                    option.value,
                ],
            })
        );

        sendMessage(
            option.value
        );
    };


    /* =====================================================
       CONTINUE MULTIPLE
    ===================================================== */

    const continueWithOptions =
        (messageId) => {
            const selected =
                selectedOptions[
                messageId
                ] || [];

            if (
                !selected.length
            ) {
                return;
            }

            sendMessage(
                `I'm interested in: ${selected.join(
                    ", "
                )}`
            );

            setSelectedOptions(
                (previous) => ({
                    ...previous,
                    [messageId]: [],
                })
            );
        };


    /* =====================================================
       COPY
    ===================================================== */

    const copyMessage =
        async (message) => {
            try {
                await navigator.clipboard.writeText(
                    message.content
                );

                setCopiedId(
                    message.id
                );

                setTimeout(() => {
                    setCopiedId(
                        null
                    );
                }, 1500);
            } catch (err) {
                console.error(
                    "Copy failed:",
                    err
                );
            }
        };


    /* =====================================================
       RETRY
    ===================================================== */

    const retryLastMessage =
        () => {
            if (isLoading) {
                return;
            }

            const lastUserMessage =
                [...messages]
                    .reverse()
                    .find(
                        (message) =>
                            message.role ===
                            "user"
                    );

            const text =
                lastUserMessage?.content ||
                lastSubmittedMessageRef.current;

            if (!text) {
                return;
            }


            setMessages(
                (previous) => {
                    const index =
                        [...previous]
                            .map(
                                (
                                    message
                                ) =>
                                    message.role
                            )
                            .lastIndexOf(
                                "user"
                            );

                    if (
                        index === -1
                    ) {
                        return previous;
                    }

                    return previous.slice(
                        0,
                        index
                    );
                }
            );


            setError(null);
            setIsOnline(true);

            setTimeout(() => {
                sendMessage(text);
            }, 100);
        };


    /* =====================================================
       NEW CHAT
    ===================================================== */

    const startNewChat =
        () => {
            abortControllerRef.current?.abort();

            setMessages([
                createWelcomeMessage(),
            ]);

            setConversationId(
                null
            );

            setSelectedOptions(
                {}
            );

            setInput("");

            setError(null);

            setIsLoading(false);

            setIsOnline(true);

            setInheritedContext(null);

            hasAutoSentRef.current = false;

            setTimeout(() => {
                textareaRef.current?.focus();
            }, 150);
        };


    /* =====================================================
       SUGGESTIONS
    ===================================================== */

    const suggestions =
        useMemo(
            () =>
                STARTER_SUGGESTIONS,
            []
        );


    /* =====================================================
       RENDER
    ===================================================== */

    return (
        <main className="relative min-h-screen overflow-hidden bg-[#f7f8fa] text-slate-950 transition-colors dark:bg-[#070b12] dark:text-white">

            {/* =====================================================
                BACKGROUND
            ===================================================== */}

            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-blue-500/[0.055] blur-3xl dark:bg-blue-500/[0.07]" />

                <div className="absolute -right-40 top-1/4 h-[32rem] w-[32rem] rounded-full bg-violet-500/[0.045] blur-3xl dark:bg-violet-500/[0.055]" />

                <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-cyan-500/[0.04] blur-3xl dark:bg-cyan-500/[0.04]" />

                <div
                    className="absolute inset-0 opacity-[0.018] dark:opacity-[0.035]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(100,116,139,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(100,116,139,.8) 1px, transparent 1px)",
                        backgroundSize:
                            "44px 44px",
                    }}
                />
            </div>


            {/* =====================================================
                PAGE
            ===================================================== */}

            <div className="relative mx-auto flex min-h-screen w-full max-w-[1440px] flex-col px-3 sm:px-5 lg:px-8">

                {/* =================================================
                    HEADER
                ================================================= */}

                <header className="sticky top-3 z-30 mt-3">
                    <div className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white/85 px-4 py-3 shadow-sm shadow-slate-900/[0.025] backdrop-blur-2xl dark:border-white/[0.08] dark:bg-[#0b111b]/85 sm:px-5">

                        <SupportRepresentative
                            compact
                        />


                        <div className="flex items-center gap-2">

                            <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-[11px] font-semibold text-slate-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-400 sm:flex">
                                <span
                                    className={[
                                        "h-1.5 w-1.5 rounded-full",
                                        isOnline
                                            ? "bg-emerald-500"
                                            : "bg-red-500",
                                    ].join(
                                        " "
                                    )}
                                />

                                {isOnline
                                    ? "Support online"
                                    : "Connection issue"}
                            </div>


                            <button
                                type="button"
                                onClick={
                                    startNewChat
                                }
                                className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 dark:hover:bg-white/[0.08]"
                            >
                                <Plus
                                    size={
                                        15
                                    }
                                />

                                <span className="hidden sm:inline">
                                    New conversation
                                </span>
                            </button>
                        </div>
                    </div>
                </header>


                {/* =================================================
                    CONTENT
                ================================================= */}

                <section className="flex flex-1 py-4 sm:py-5">

                    <div className="grid min-h-[calc(100vh-120px)] w-full gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">


                        {/* =================================================
                            DESKTOP SUPPORT SIDEBAR
                        ================================================= */}

                        <aside className="hidden lg:flex lg:flex-col lg:gap-4">

                            {/* Representative card */}

                            <div className="rounded-3xl border border-slate-200/80 bg-white/80 p-5 shadow-sm backdrop-blur-xl dark:border-white/[0.08] dark:bg-white/[0.025]">

                                <SupportRepresentative />

                                <div className="mt-5 border-t border-slate-100 pt-5 dark:border-white/[0.07]">

                                    <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                                        <MessageCircle
                                            size={15}
                                        />

                                        Support Desk
                                    </div>

                                    <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
                                        Start with AB AI and
                                        we'll help guide your
                                        request to the right
                                        service or team.
                                    </p>

                                </div>


                                <div className="mt-5 space-y-2">

                                    <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-2.5 dark:bg-white/[0.035]">
                                        <Clock3
                                            size={14}
                                            className="text-slate-400"
                                        />

                                        <div>
                                            <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                                                Support assistance
                                            </p>

                                            <p className="text-[10px] text-slate-400">
                                                Available through this desk
                                            </p>
                                        </div>
                                    </div>


                                    <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-2.5 dark:bg-white/[0.035]">
                                        <ShieldCheck
                                            size={14}
                                            className="text-emerald-500"
                                        />

                                        <div>
                                            <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                                                Secure support
                                            </p>

                                            <p className="text-[10px] text-slate-400">
                                                Your conversation stays here
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </div>


                            {/* What we help with */}

                            <div className="rounded-3xl border border-slate-200/80 bg-white/80 p-5 shadow-sm backdrop-blur-xl dark:border-white/[0.08] dark:bg-white/[0.025]">

                                <div className="mb-4 flex items-center gap-2">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                                        <HelpCircle
                                            size={15}
                                        />
                                    </div>

                                    <div>
                                        <p className="text-xs font-bold text-slate-900 dark:text-white">
                                            How can we help?
                                        </p>

                                        <p className="text-[10px] text-slate-400">
                                            Common support areas
                                        </p>
                                    </div>
                                </div>


                                <div className="space-y-1">
                                    {SUPPORT_AREAS.map(
                                        (
                                            area
                                        ) => (
                                            <button
                                                key={
                                                    area
                                                }
                                                type="button"
                                                onClick={() =>
                                                    sendMessage(
                                                        `I need help with ${area}.`
                                                    )
                                                }
                                                className="group flex w-full items-center justify-between rounded-xl px-2.5 py-2 text-left text-[11px] font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-white/[0.04] dark:hover:text-white"
                                            >
                                                <span>
                                                    {
                                                        area
                                                    }
                                                </span>

                                                <ArrowRight
                                                    size={
                                                        12
                                                    }
                                                    className="opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100"
                                                />
                                            </button>
                                        )
                                    )}
                                </div>

                            </div>

                        </aside>


                        {/* =================================================
                            CHAT PANEL
                        ================================================= */}

                        <section className="flex min-h-[calc(100vh-120px)] min-w-0 flex-col overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/75 shadow-xl shadow-slate-900/[0.035] backdrop-blur-2xl dark:border-white/[0.08] dark:bg-[#0b111b]/75 dark:shadow-black/20">


                            {/* =================================================
                                CHAT HEADER
                            ================================================= */}

                            <div className="border-b border-slate-200/70 bg-white/60 px-4 py-4 dark:border-white/[0.07] dark:bg-white/[0.015] sm:px-6">

                                <div className="flex items-center justify-between gap-4">

                                    <div className="flex min-w-0 items-center gap-3">

                                        <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-md dark:bg-white dark:text-slate-950">
                                            <Sparkles
                                                size={
                                                    18
                                                }
                                            />

                                            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500 dark:border-[#0b111b]" />
                                        </div>

                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2">
                                                <h1 className="truncate text-sm font-bold tracking-tight text-slate-950 dark:text-white sm:text-base">
                                                    AB Technologies Support
                                                </h1>

                                                <CheckCircle2
                                                    size={
                                                        14
                                                    }
                                                    className="shrink-0 text-emerald-500"
                                                />
                                            </div>

                                            <p className="mt-0.5 truncate text-[11px] text-slate-500 dark:text-slate-400 sm:text-xs">
                                                AI-assisted support for technology, software & procurement
                                            </p>
                                        </div>

                                    </div>


                                    <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-semibold text-slate-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-400 sm:flex">
                                        <Bot
                                            size={
                                                13
                                            }
                                        />

                                        AB AI
                                    </div>

                                </div>

                            </div>


                            {/* =================================================
                                MESSAGES
                            ================================================= */}

                            <div className="flex-1 overflow-y-auto px-4 py-7 sm:px-6 lg:px-10">

                                <div className="mx-auto flex max-w-4xl flex-col gap-7">

                                    {inheritedContext && (
                                        <InheritedRequestCard
                                            metadata={
                                                inheritedContext
                                            }
                                        />
                                    )}


                                    {messages.map(
                                        (
                                            message
                                        ) => (
                                            <MessageBubble
                                                key={
                                                    message.id
                                                }
                                                message={
                                                    message
                                                }
                                                onCopy={
                                                    copyMessage
                                                }
                                                copiedId={
                                                    copiedId
                                                }
                                                selectedOptions={
                                                    selectedOptions[
                                                    message
                                                        .id
                                                    ]
                                                }
                                                onOptionClick={
                                                    handleOptionClick
                                                }
                                                onContinue={() =>
                                                    continueWithOptions(
                                                        message.id
                                                    )
                                                }
                                            />
                                        )
                                    )}


                                    {isLoading && (
                                        <TypingIndicator />
                                    )}


                                    {error && (
                                        <ErrorCard
                                            error={
                                                error
                                            }
                                            onRetry={
                                                retryLastMessage
                                            }
                                            onDismiss={() =>
                                                setError(
                                                    null
                                                )
                                            }
                                        />
                                    )}


                                    <div
                                        ref={
                                            messagesEndRef
                                        }
                                    />

                                </div>

                            </div>


                            {/* =================================================
                                STARTER SUGGESTIONS
                            ================================================= */}

                            {messages.length <=
                                1 &&
                                !isLoading &&
                                !inheritedContext && (
                                    <div className="border-t border-slate-200/70 bg-slate-50/50 px-4 py-5 dark:border-white/[0.07] dark:bg-white/[0.012] sm:px-6 lg:px-10">

                                        <div className="mx-auto max-w-4xl">

                                            <div className="mb-3 flex items-center justify-between">
                                                <div>
                                                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                                                        How can we help?
                                                    </p>

                                                    <p className="mt-0.5 text-[10px] text-slate-400">
                                                        Choose a starting point or simply type your request below.
                                                    </p>
                                                </div>

                                                <Sparkles
                                                    size={
                                                        15
                                                    }
                                                    className="text-slate-300 dark:text-slate-600"
                                                />
                                            </div>


                                            <div className="grid gap-2 sm:grid-cols-2">

                                                {suggestions.map(
                                                    (
                                                        suggestion
                                                    ) => {
                                                        const Icon =
                                                            suggestion.icon;

                                                        return (
                                                            <button
                                                                key={
                                                                    suggestion.id
                                                                }
                                                                type="button"
                                                                onClick={() =>
                                                                    sendMessage(
                                                                        suggestion.text
                                                                    )
                                                                }
                                                                className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 text-left transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md hover:shadow-slate-900/[0.04] dark:border-white/[0.08] dark:bg-white/[0.025] dark:hover:border-white/[0.16] dark:hover:bg-white/[0.045]"
                                                            >

                                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition group-hover:bg-slate-950 group-hover:text-white dark:bg-white/[0.06] dark:text-slate-300 dark:group-hover:bg-white dark:group-hover:text-slate-950">
                                                                    <Icon
                                                                        size={
                                                                            17
                                                                        }
                                                                    />
                                                                </div>


                                                                <div className="min-w-0 flex-1">
                                                                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                                                                        {
                                                                            suggestion.title
                                                                        }
                                                                    </p>

                                                                    <p className="mt-1 line-clamp-2 text-[10px] leading-4 text-slate-400 dark:text-slate-500">
                                                                        {
                                                                            suggestion.description
                                                                        }
                                                                    </p>
                                                                </div>


                                                                <ArrowRight
                                                                    size={
                                                                        14
                                                                    }
                                                                    className="shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-slate-700 dark:text-slate-600 dark:group-hover:text-white"
                                                                />

                                                            </button>
                                                        );
                                                    }
                                                )}

                                            </div>

                                        </div>

                                    </div>
                                )}


                            {/* =================================================
                                COMPOSER
                            ================================================= */}

                            <div className="border-t border-slate-200/70 bg-white/80 p-3 dark:border-white/[0.07] dark:bg-[#090e17]/80 sm:p-4 lg:p-5">

                                <div className="mx-auto max-w-4xl">

                                    <div
                                        className={[
                                            "relative overflow-hidden rounded-2xl border bg-white shadow-sm transition-all dark:bg-white/[0.035]",
                                            error
                                                ? "border-red-300/70 dark:border-red-500/20"
                                                : "border-slate-200 dark:border-white/[0.10]",
                                            "focus-within:border-slate-400 focus-within:shadow-md focus-within:shadow-slate-900/[0.04] dark:focus-within:border-white/[0.22]",
                                        ].join(
                                            " "
                                        )}
                                    >

                                        <textarea
                                            ref={
                                                textareaRef
                                            }
                                            value={
                                                input
                                            }
                                            onChange={(
                                                event
                                            ) =>
                                                setInput(
                                                    event
                                                        .target
                                                        .value
                                                )
                                            }
                                            onKeyDown={
                                                handleKeyDown
                                            }
                                            rows={
                                                1
                                            }
                                            maxLength={
                                                10000
                                            }
                                            disabled={
                                                isLoading
                                            }
                                            placeholder="Tell us what you need help with..."
                                            className="block max-h-40 min-h-[58px] w-full resize-none bg-transparent px-4 pb-12 pt-4 pr-16 text-sm leading-6 text-slate-900 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-60 dark:text-white dark:placeholder:text-slate-500"
                                        />


                                        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">

                                            <div className="flex items-center gap-2">

                                                <span className="hidden text-[10px] text-slate-400 sm:block">
                                                    {input.length.toLocaleString()}
                                                    /10,000
                                                </span>

                                            </div>


                                            <button
                                                type="button"
                                                onClick={() =>
                                                    sendMessage()
                                                }
                                                disabled={
                                                    !input.trim() ||
                                                    isLoading
                                                }
                                                className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-30 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                                                aria-label="Send message"
                                            >
                                                {isLoading ? (
                                                    <Loader2
                                                        size={
                                                            16
                                                        }
                                                        className="animate-spin"
                                                    />
                                                ) : (
                                                    <Send
                                                        size={
                                                            16
                                                        }
                                                    />
                                                )}
                                            </button>

                                        </div>

                                    </div>


                                    <div className="mt-2.5 flex items-center justify-between px-1">

                                        <p className="flex items-center gap-1.5 text-[10px] text-slate-400 dark:text-slate-600">
                                            <ShieldCheck
                                                size={
                                                    11
                                                }
                                            />

                                            Your support conversation is handled through AB Technologies.
                                        </p>

                                        <p className="hidden text-[10px] text-slate-400 dark:text-slate-600 sm:block">
                                            Enter to send · Shift + Enter for a new line
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </section>

                    </div>

                </section>


                {/* =================================================
                    MOBILE SUPPORT FOOTER
                ================================================= */}

                <div className="pb-5 lg:hidden">

                    <div className="rounded-2xl border border-slate-200/80 bg-white/75 p-4 backdrop-blur-xl dark:border-white/[0.08] dark:bg-white/[0.025]">

                        <div className="flex items-center justify-between gap-4">

                            <SupportRepresentative
                                compact
                            />

                            <div className="text-right">
                                <p className="text-[10px] font-bold text-slate-700 dark:text-slate-300">
                                    Support Desk
                                </p>

                                <p className="mt-0.5 text-[10px] text-slate-400">
                                    Technology & solutions
                                </p>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </main>
    );
}