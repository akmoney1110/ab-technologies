// src/pages/portal/ProjectWorkspace.jsx

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
    CalendarDays,
    Check,
    CheckCircle2,
    ChevronDown,
    ChevronRight,
    Clock3,
    CreditCard,
    DollarSign,
    Download,
    ExternalLink,
    File,
    FilePlus2,
    FileText,
    Flag,
    FolderOpen,
    Gauge,
    Image as ImageIcon,
    Info,
    Layers,
    Loader2,
    LockKeyhole,
    MessageCircle,
    Milestone,
    Palette,
    Paperclip,
    Play,
    Receipt,
    RefreshCw,
    Rocket,
    Save,
    Send,
    ShieldCheck,
    Sparkles,
    Target,
    Trash2,
    TrendingUp,
    Upload,
    Users,
    Video,
    Wallet,
    X,
    Zap,
} from "lucide-react";

import { Link, useNavigate, useParams } from "react-router-dom";

const API_URL =
    import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";


/* =========================================================
   HELPERS
========================================================= */

function getToken() {
    return localStorage.getItem("access_token");
}

function normalizeArray(value) {
    if (Array.isArray(value)) return value;
    if (Array.isArray(value?.results)) return value.results;
    if (Array.isArray(value?.data)) return value.data;
    return [];
}

function formatDate(value) {
    if (!value) return "Not set";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Not set";
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

function formatTime(value) {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
    });
}

function timeAgo(value) {
    if (!value) return "";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return "";
    const diff = Math.floor((Date.now() - d.getTime()) / 1000);
    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
    return formatDate(value);
}

function normalizeStatus(status) {
    const value = String(status || "").toLowerCase().replace(/_/g, " ").trim();
    if (["accepted", "active", "in progress"].includes(value)) return "ACTIVE";
    if (["completed", "complete", "done"].includes(value)) return "COMPLETED";
    if (["cancelled", "canceled"].includes(value)) return "CANCELLED";
    if (["on hold", "paused"].includes(value)) return "ON_HOLD";
    return "PLANNING";
}

function getStatusLabel(status) {
    const n = normalizeStatus(status);
    if (n === "ON_HOLD") return "On Hold";
    return n.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase());
}

function statusTheme(status, darkMode) {
    const n = normalizeStatus(status);
    if (n === "COMPLETED") {
        return {
            chip: darkMode
                ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/25"
                : "bg-emerald-50 text-emerald-700 border-emerald-200",
            dot: "bg-emerald-500",
            bar: "bg-gradient-to-r from-emerald-500 to-teal-500",
        };
    }
    if (n === "CANCELLED") {
        return {
            chip: darkMode
                ? "bg-red-500/10 text-red-300 border-red-500/25"
                : "bg-red-50 text-red-700 border-red-200",
            dot: "bg-red-500",
            bar: "bg-red-500",
        };
    }
    if (n === "ON_HOLD") {
        return {
            chip: darkMode
                ? "bg-amber-500/10 text-amber-300 border-amber-500/25"
                : "bg-amber-50 text-amber-700 border-amber-200",
            dot: "bg-amber-500",
            bar: "bg-amber-500",
        };
    }
    if (n === "ACTIVE") {
        return {
            chip: darkMode
                ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/25"
                : "bg-cyan-50 text-cyan-700 border-cyan-200",
            dot: "bg-cyan-500",
            bar: "bg-gradient-to-r from-cyan-500 to-indigo-500",
        };
    }
    return {
        chip: darkMode
            ? "bg-white/[0.05] text-slate-400 border-white/[0.08]"
            : "bg-slate-100 text-slate-500 border-slate-200",
        dot: "bg-slate-400",
        bar: "bg-gradient-to-r from-sky-500 to-indigo-500",
    };
}

function getMilestones(project) {
    return normalizeArray(project?.milestones).map((milestone, index) => ({
        ...milestone,
        id: milestone?.id || index + 1,
    }));
}

function getMilestoneStatus(milestone) {
    return String(milestone?.status || "pending").toLowerCase().replace(/_/g, " ");
}

function isCompleted(milestone) {
    return ["completed", "complete", "done"].includes(
        String(milestone?.status || "").toLowerCase()
    );
}

function isInProgress(milestone) {
    return ["in_progress", "in progress", "active", "working"].includes(
        String(milestone?.status || "").toLowerCase()
    );
}

function getProgress(project) {
    if (normalizeStatus(project?.status) === "COMPLETED") return 100;
    if (project?.progress !== undefined && project?.progress !== null) {
        return Math.min(100, Math.max(0, Number(project.progress) || 0));
    }
    const milestones = getMilestones(project);
    if (!milestones.length) return 0;
    const completed = milestones.filter(isCompleted).length;
    return Math.round((completed / milestones.length) * 100);
}

function getProjectCode(project) {
    return (
        project?.code ||
        project?.project_code ||
        (project?.id ? String(project.id).slice(0, 8).toUpperCase() : "PROJECT")
    );
}

function getFileUrl(file) {
    if (!file) return "";
    const rawValue =
        file.url || file.file_url || file.download_url ||
        file.file || file.attachment || file.path || "";
    const value = typeof rawValue === "string"
        ? rawValue
        : rawValue?.url || rawValue?.file || rawValue?.path || "";
    if (!value) return "";
    if (value.startsWith("http://") || value.startsWith("https://") || value.startsWith("blob:")) {
        return value;
    }
    return `${API_URL}${value.startsWith("/") ? "" : "/"}${value}`;
}

function getFileName(file) {
    const rawFile = typeof file?.file === "string" ? file.file : "";
    return (
        file?.original_name ||
        file?.original_filename ||
        file?.name ||
        file?.filename ||
        file?.title ||
        rawFile.split("/").pop() ||
        "File"
    );
}

function getFileExtension(file) {
    const name = getFileName(file).toLowerCase();
    return name.includes(".") ? name.split(".").pop() : "";
}

function getMimeType(file) {
    return String(
        file?.content_type || file?.mime_type || file?.file_type || file?.type || ""
    ).toLowerCase();
}

function isImage(file) {
    const type = getMimeType(file);
    const ext = getFileExtension(file);
    return (
        type.startsWith("image/") ||
        ["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp", "avif"].includes(ext)
    );
}

function isVideo(file) {
    const type = getMimeType(file);
    const ext = getFileExtension(file);
    return (
        type.startsWith("video/") ||
        ["mp4", "webm", "mov", "m4v", "avi", "mkv"].includes(ext)
    );
}

function isPdf(file) {
    return getMimeType(file).includes("pdf") || getFileExtension(file) === "pdf";
}

function getUpdateFiles(update) {
    return normalizeArray(update?.files || update?.attachments || update?.media);
}

function getClientContent(project) {
    return project?.client_content || project?.clientContent || null;
}

function getClientContentFiles(content) {
    return normalizeArray(content?.files || content?.uploads || content?.attachments);
}

function getContentFileType(file) {
    return String(
        file?.file_type || file?.content_type || file?.mime_type || file?.type || "other"
    ).toLowerCase();
}

function getContentFileLabel(file) {
    const labels = {
        logo: "Logo",
        image: "Image",
        document: "Document",
        video: "Video",
        brand_guideline: "Brand guideline",
        content: "Content",
        other: "Other",
    };
    const type = getContentFileType(file);
    return labels[type] || type.replace(/_/g, " ");
}

function isContentImage(file) {
    const type = getContentFileType(file);
    const ext = getFileExtension(file);
    return (
        type.startsWith("image/") ||
        ["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp", "avif", "heic", "heif"].includes(ext)
    );
}

function getUpdateType(update) {
    return String(update?.update_type || update?.type || "note").toLowerCase();
}

function sortNewestFirst(items) {
    return [...items].sort(
        (a, b) =>
            new Date(b?.created_at || b?.updated_at || 0) -
            new Date(a?.created_at || a?.updated_at || 0)
    );
}


/* =========================================================
   PAYMENT HELPERS
========================================================= */

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

function getPaymentMilestones(data) {
    if (!data) return [];
    const source =
        data?.milestones ||
        data?.payment_milestones ||
        data?.proposal?.milestones ||
        [];

    return normalizeArray(source).map((milestone, index) => {
        const amount = Number(milestone?.amount || 0);
        const totalPaid = Number(milestone?.total_paid ?? milestone?.paid ?? 0);
        const outstanding = Number(
            milestone?.outstanding_balance ?? Math.max(0, amount - totalPaid)
        );

        return {
            ...milestone,
            id: milestone?.milestone_id ?? milestone?.id ?? `m-${index}`,
            order: Number(milestone?.order ?? milestone?.sequence ?? index + 1),
            title: milestone?.title || milestone?.name || `Milestone ${index + 1}`,
            description: milestone?.description || "",
            amount,
            total_paid: totalPaid,
            outstanding_balance: outstanding,
            payment_status: String(milestone?.payment_status || "unpaid").toLowerCase(),
            status: String(milestone?.status || "pending").toLowerCase(),
            payment_required: milestone?.payment_required !== false,
        };
    });
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

function paymentStatusLabel(status) {
    return String(status || "unpaid")
        .replace(/_/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());
}

function evaluateMilestonePayability(milestone, orderedMilestones) {
    if (!milestone?.payment_required) {
        return { payable: false, reason: "No payment required" };
    }
    if (milestone.payment_status === "paid") {
        return { payable: false, reason: null };
    }
    if (milestone.status === "cancelled") {
        return { payable: false, reason: "Cancelled" };
    }
    if (milestone.status === "locked") {
        return { payable: false, reason: "Not available yet" };
    }

    const previous = orderedMilestones
        .filter((item) => item.payment_required !== false)
        .sort((a, b) => a.order - b.order)
        .find((item) => item.order < milestone.order);

    if (previous && previous.payment_status !== "paid") {
        return {
            payable: false,
            reason: `Pay "${previous.title}" first`,
        };
    }

    const outstanding = Number(milestone.outstanding_balance || milestone.amount || 0);
    if (outstanding <= 0) {
        return { payable: false, reason: null };
    }
    return { payable: true, reason: null };
}


/* =========================================================
   MAIN
========================================================= */

export default function ProjectWorkspace({ darkMode = true }) {
    const { projectId } = useParams();
    const navigate = useNavigate();

    const [project, setProject] = useState(null);
    const [comments, setComments] = useState([]);
    const [updates, setUpdates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState("overview");
    const [comment, setComment] = useState("");
    const [selectedMilestone, setSelectedMilestone] = useState(null);
    const [sendingComment, setSendingComment] = useState(false);
    const [expandedMilestones, setExpandedMilestones] = useState({});
    const [previewFile, setPreviewFile] = useState(null);

    const [clientContent, setClientContent] = useState(null);
    const [contentForm, setContentForm] = useState({
        brand_name: "",
        tagline: "",
        primary_color: "",
        secondary_color: "",
        accent_color: "",
        background_color: "",
        text_color: "",
        font_family: "",
        company_description: "",
        about_content: "",
        mission: "",
        vision: "",
        contact_information: "",
        address: "",
        phone: "",
        email: "",
        website: "",
        additional_content: {},
        notes: "",
    });
    const [savingContent, setSavingContent] = useState(false);
    const [uploadingContent, setUploadingContent] = useState(false);
    const [contentMessage, setContentMessage] = useState("");
    const [contentError, setContentError] = useState("");

    const [paymentData, setPaymentData] = useState(null);
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [paymentError, setPaymentError] = useState("");
    const [payingMilestoneId, setPayingMilestoneId] = useState(null);
    const [payingFullBalance, setPayingFullBalance] = useState(false);
    const [paymentActionMessage, setPaymentActionMessage] = useState("");

    const logout = useCallback(() => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("ab_user");
        window.location.href = "/portal";
    }, []);

    /* =====================================================
       LOAD PROJECT
    ===================================================== */
    const loadProject = useCallback(
        async ({ silent = false } = {}) => {
            const token = getToken();
            if (!token) {
                logout();
                return;
            }

            if (silent) setRefreshing(true);
            else setLoading(true);

            setPaymentLoading(true);
            setError("");
            setPaymentError("");

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
                    throw new Error(projectData?.detail || "Project not found.");
                }

                const proposalPublicToken = getProposalPublicToken(projectData);

                const [commentsResponse, updatesResponse, paymentsResponse] =
                    await Promise.all([
                        fetch(`${API_URL}/api/projects/${projectId}/comments/`, { headers }),
                        fetch(`${API_URL}/api/projects/${projectId}/updates/`, { headers }),
                        proposalPublicToken
                            ? fetch(
                                `${API_URL}/api/payments/client/${proposalPublicToken}/payments/`,
                                { headers }
                            )
                            : Promise.resolve(null),
                    ]);

                let commentsData = [];
                if (commentsResponse.status === 401) {
                    logout();
                    return;
                }
                if (commentsResponse.ok) {
                    commentsData = await commentsResponse.json();
                }

                let updatesData = [];
                if (updatesResponse.status === 401) {
                    logout();
                    return;
                }
                if (updatesResponse.ok) {
                    updatesData = await updatesResponse.json();
                }

                let paymentsData = null;
                let paymentsError = "";

                if (!proposalPublicToken) {
                    paymentsError =
                        "This project is not linked to a proposal yet. Payments will appear once your proposal is approved.";
                } else if (paymentsResponse) {
                    if (paymentsResponse.status === 401) {
                        logout();
                        return;
                    }

                    if (paymentsResponse.ok) {
                        paymentsData = await paymentsResponse.json();
                    } else if (paymentsResponse.status === 404) {
                        paymentsError =
                            "This proposal is not yet available for payment. It may still be pending acceptance.";
                    } else {
                        try {
                            const paymentErrorData = await paymentsResponse.json();
                            paymentsError =
                                paymentErrorData?.error ||
                                paymentErrorData?.detail ||
                                `Unable to load payments (${paymentsResponse.status}).`;
                        } catch {
                            paymentsError = `Unable to load payments (${paymentsResponse.status}).`;
                        }
                    }
                }

                setPaymentLoading(false);
                setPaymentData(paymentsData);
                setPaymentError(paymentsError);
                setProject(projectData);

                const loadedContent = getClientContent(projectData);
                setClientContent(loadedContent);

                if (loadedContent) {
                    setContentForm({
                        brand_name: loadedContent.brand_name || "",
                        tagline: loadedContent.tagline || "",
                        primary_color: loadedContent.primary_color || "",
                        secondary_color: loadedContent.secondary_color || "",
                        accent_color: loadedContent.accent_color || "",
                        background_color: loadedContent.background_color || "",
                        text_color: loadedContent.text_color || "",
                        font_family: loadedContent.font_family || "",
                        company_description: loadedContent.company_description || "",
                        about_content: loadedContent.about_content || "",
                        mission: loadedContent.mission || "",
                        vision: loadedContent.vision || "",
                        contact_information: loadedContent.contact_information || "",
                        address: loadedContent.address || "",
                        phone: loadedContent.phone || "",
                        email: loadedContent.email || "",
                        website: loadedContent.website || "",
                        additional_content: loadedContent.additional_content || {},
                        notes: loadedContent.notes || "",
                    });
                }

                setComments(sortNewestFirst(normalizeArray(commentsData)));
                setUpdates(sortNewestFirst(normalizeArray(updatesData)));
            } catch (err) {
                console.error("Project workspace error:", err);
                setError(err?.message || "Unable to load this project.");
            } finally {
                setLoading(false);
                setRefreshing(false);
                setPaymentLoading(false);
            }
        },
        [projectId, logout]
    );

    useEffect(() => {
        loadProject();
    }, [loadProject]);

    /* =====================================================
       DERIVED DATA
    ===================================================== */
    const milestones = useMemo(() => getMilestones(project), [project]);
    const paymentMilestones = useMemo(
        () => getPaymentMilestones(paymentData),
        [paymentData]
    );

    const paymentSummary =
        paymentData?.summary || paymentData?.payment_summary || {};

    const paymentCurrency =
        paymentSummary?.currency ||
        paymentData?.proposal?.currency ||
        project?.currency ||
        "NGN";

    const progress = getProgress(project);
    const completedMilestones = milestones.filter(isCompleted).length;
    const activeMilestones = milestones.filter(isInProgress).length;
    const upcomingMilestones = milestones.filter(
        (m) => !isCompleted(m) && !isInProgress(m)
    ).length;

    const generalComments = useMemo(
        () => comments.filter((item) => !item?.milestone_id),
        [comments]
    );

    const milestoneComments = useCallback(
        (milestoneId) =>
            comments.filter(
                (item) => String(item?.milestone_id) === String(milestoneId)
            ),
        [comments]
    );

    const allFiles = useMemo(
        () =>
            updates.flatMap((update) =>
                getUpdateFiles(update).map((file) => ({ ...file, update }))
            ),
        [updates]
    );

    const imageFiles = allFiles.filter(isImage);
    const videoFiles = allFiles.filter(isVideo);
    const documentFiles = allFiles.filter(
        (file) => !isImage(file) && !isVideo(file)
    );

    /* =====================================================
       COMMENT
    ===================================================== */
    const submitComment = async () => {
        const message = comment.trim();
        if (!message) return;

        const token = getToken();
        if (!token) {
            logout();
            return;
        }

        setSendingComment(true);

        try {
            const response = await fetch(
                `${API_URL}/api/projects/${projectId}/comments/`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        message,
                        action: "comment",
                        milestone_id: selectedMilestone || null,
                    }),
                }
            );

            if (response.status === 401) {
                logout();
                return;
            }

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data?.detail || "Unable to send comment.");
            }

            setComments((current) => sortNewestFirst([...current, data]));
            setComment("");
            if (!selectedMilestone) {
                setActiveTab("discussion");
            }
        } catch (err) {
            console.error("Comment error:", err);
            window.alert(err?.message || "Unable to send comment.");
        } finally {
            setSendingComment(false);
        }
    };

    /* =====================================================
       CLIENT CONTENT
    ===================================================== */
    const updateContentField = (field, value) => {
        setContentForm((current) => ({ ...current, [field]: value }));
    };

    const saveClientContent = async () => {
        const token = getToken();
        if (!token) {
            logout();
            return;
        }

        setSavingContent(true);
        setContentMessage("");
        setContentError("");

        try {
            const response = await fetch(
                `${API_URL}/api/projects/${projectId}/content/`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(contentForm),
                }
            );

            if (response.status === 401) {
                logout();
                return;
            }

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data?.detail || "Unable to save project content.");
            }

            const saved = data?.client_content || data?.content || data;
            setClientContent(saved);
            setProject((current) => ({ ...current, client_content: saved }));
            setContentMessage("Your project content has been saved.");
        } catch (err) {
            console.error("Client content save error:", err);
            setContentError(err?.message || "Unable to save project content.");
        } finally {
            setSavingContent(false);
        }
    };

    const uploadClientContentFiles = async (event) => {
        const selectedFiles = Array.from(event.target.files || []);
        event.target.value = "";
        if (!selectedFiles.length) return;

        const token = getToken();
        if (!token) {
            logout();
            return;
        }

        setUploadingContent(true);
        setContentMessage("");
        setContentError("");

        try {
            if (!clientContent?.id) {
                throw new Error(
                    "Project content has not been created yet. Save the content form first."
                );
            }

            for (const selectedFile of selectedFiles) {
                const formData = new FormData();
                formData.append("file", selectedFile);

                const response = await fetch(
                    `${API_URL}/api/projects/${projectId}/content/files/`,
                    {
                        method: "POST",
                        headers: { Authorization: `Bearer ${token}` },
                        body: formData,
                    }
                );

                if (response.status === 401) {
                    logout();
                    return;
                }

                const data = await response.json();
                if (!response.ok) {
                    throw new Error(
                        data?.detail || `Unable to upload ${selectedFile.name}.`
                    );
                }

                const uploadedFile = data?.file || data;
                setClientContent((current) => ({
                    ...current,
                    files: [...getClientContentFiles(current), uploadedFile],
                }));
            }

            setContentMessage(
                selectedFiles.length === 1
                    ? "File uploaded successfully."
                    : `${selectedFiles.length} files uploaded successfully.`
            );
        } catch (err) {
            console.error("Client content upload error:", err);
            setContentError(err?.message || "Unable to upload file.");
        } finally {
            setUploadingContent(false);
        }
    };

    const deleteClientContentFile = async (file) => {
        const token = getToken();
        if (!token || !file?.id) return;

        const confirmed = window.confirm(
            `Remove ${getFileName(file)} from your project content?`
        );
        if (!confirmed) return;

        setContentError("");
        setContentMessage("");

        try {
            const response = await fetch(
                `${API_URL}/api/projects/${projectId}/content/files/${file.id}/`,
                {
                    method: "DELETE",
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (response.status === 401) {
                logout();
                return;
            }

            if (!response.ok) {
                let data = {};
                try {
                    data = await response.json();
                } catch { }
                throw new Error(data?.detail || "Unable to remove file.");
            }

            setClientContent((current) => ({
                ...current,
                files: getClientContentFiles(current).filter(
                    (item) => String(item.id) !== String(file.id)
                ),
            }));
            setContentMessage("File removed.");
        } catch (err) {
            console.error("Client content file delete error:", err);
            setContentError(err?.message || "Unable to remove file.");
        }
    };

    /* =====================================================
       PAYMENTS
    ===================================================== */
    const initiateMilestonePayment = async (milestone) => {
        const token = getToken();
        const publicToken = getProposalPublicToken(project);

        setPaymentActionMessage("");

        if (!token) {
            logout();
            return;
        }
        if (!publicToken) {
            setPaymentError("This project is not linked to a proposal yet.");
            return;
        }
        if (!milestone?.id) {
            setPaymentError("Missing milestone id.");
            return;
        }

        const amount = Number(
            milestone.outstanding_balance ?? milestone.amount ?? 0
        );
        if (amount <= 0) {
            setPaymentError("There is no outstanding amount for this milestone.");
            return;
        }

        setPayingMilestoneId(milestone.id);
        setPaymentError("");

        try {
            const response = await fetch(
                `${API_URL}/api/payments/client/${publicToken}/payments/initiate/`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        milestone_id: milestone.milestone_id ?? milestone.id,
                    }),
                }
            );

            if (response.status === 401) {
                logout();
                return;
            }

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(
                    data?.error ||
                    data?.detail ||
                    data?.message ||
                    `Unable to start this payment (${response.status}).`
                );
            }

            const checkoutUrl =
                data?.checkout_url ||
                data?.authorization_url ||
                data?.data?.authorization_url;

            if (!checkoutUrl) {
                throw new Error(
                    "Payment was created, but no checkout URL was returned."
                );
            }

            window.location.href = checkoutUrl;
        } catch (err) {
            console.error("Milestone payment error:", err);
            setPaymentError(err?.message || "Unable to start this payment.");
        } finally {
            setPayingMilestoneId(null);
        }
    };

    const initiateFullBalancePayment = async () => {
        const token = getToken();
        const publicToken = getProposalPublicToken(project);

        setPaymentActionMessage("");
        setPaymentError("");

        if (!token) {
            logout();
            return;
        }
        if (!publicToken) {
            setPaymentError("This project is not linked to a proposal yet.");
            return;
        }

        const outstanding = Number(
            paymentSummary?.outstanding_balance ??
            paymentSummary?.outstanding ??
            0
        );

        if (outstanding <= 0) {
            setPaymentError(
                "There is no outstanding balance on this proposal."
            );
            return;
        }

        setPayingFullBalance(true);

        try {
            const response = await fetch(
                `${API_URL}/api/payments/client/${publicToken}/payments/pay-full/`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 401) {
                logout();
                return;
            }

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(
                    data?.error ||
                    data?.detail ||
                    data?.message ||
                    `Unable to start full balance payment (${response.status}).`
                );
            }

            const checkoutUrl =
                data?.paystack?.authorization_url ||
                data?.checkout_url ||
                data?.authorization_url ||
                data?.data?.authorization_url;

            if (!checkoutUrl) {
                throw new Error(
                    "Payment was created, but no checkout URL was returned."
                );
            }

            window.location.href = checkoutUrl;
        } catch (err) {
            console.error("Full balance payment error:", err);
            setPaymentError(
                err?.message || "Unable to start full balance payment."
            );
        } finally {
            setPayingFullBalance(false);
        }
    };

    const refreshPayments = useCallback(async () => {
        const token = getToken();
        const publicToken = getProposalPublicToken(project);

        if (!token || !publicToken) return;

        setPaymentLoading(true);
        setPaymentError("");

        try {
            const response = await fetch(
                `${API_URL}/api/payments/client/${publicToken}/payments/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 401) {
                logout();
                return;
            }

            if (!response.ok) {
                throw new Error(
                    `Unable to refresh payments (${response.status}).`
                );
            }

            const data = await response.json();
            setPaymentData(data);
            setPaymentActionMessage("Payment information updated.");
        } catch (err) {
            setPaymentError(err?.message || "Unable to refresh payments.");
        } finally {
            setPaymentLoading(false);
        }
    }, [project, logout]);

    /* =====================================================
       MILESTONE
    ===================================================== */
    const toggleMilestone = (id) => {
        setExpandedMilestones((current) => ({
            ...current,
            [id]: !current[id],
        }));
    };

    const openMilestoneDiscussion = (id) => {
        setSelectedMilestone(id);
        setActiveTab("discussion");
    };

    /* =====================================================
       TABS
    ===================================================== */
    const tabs = useMemo(
        () => [
            { value: "overview", label: "Overview", icon: Info },
            { value: "milestones", label: "Milestones", icon: Milestone, badge: milestones.length },
            { value: "payments", label: "Payments", icon: CreditCard },
            { value: "updates", label: "Updates", icon: Clock3, badge: updates.length },
            { value: "files", label: "Files & media", icon: Paperclip, badge: allFiles.length },
            { value: "content", label: "Project Content", icon: FilePlus2 },
            { value: "discussion", label: "Discussion", icon: MessageCircle, badge: comments.length },
        ],
        [milestones.length, updates.length, allFiles.length, comments.length]
    );

    /* =====================================================
       LOADING
    ===================================================== */
    if (loading) {
        return (
            <PageShell darkMode={darkMode}>
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <WorkspaceSkeleton darkMode={darkMode} />
                </div>
            </PageShell>
        );
    }

    /* =====================================================
       ERROR
    ===================================================== */
    if (error || !project) {
        return (
            <PageShell darkMode={darkMode}>
                <div className="mx-auto max-w-3xl px-4 py-16">
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
                            <FolderOpen size={28} />
                        </div>
                        <h2
                            className={`relative mt-5 text-xl font-black ${darkMode ? "text-white" : "text-slate-900"
                                }`}
                        >
                            Project unavailable
                        </h2>
                        <p
                            className={`relative mt-2 text-sm leading-6 ${darkMode ? "text-slate-400" : "text-slate-500"
                                }`}
                        >
                            {error || "This project could not be loaded."}
                        </p>
                        <div className="relative mt-6 flex flex-wrap justify-center gap-3">
                            <button
                                type="button"
                                onClick={() => loadProject()}
                                className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-bold transition-all ${darkMode
                                        ? "border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10"
                                        : "border-cyan-200 text-cyan-700 hover:bg-cyan-50"
                                    }`}
                            >
                                <RefreshCw size={15} />
                                Try again
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate("/portal/projects")}
                                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/30 transition-all hover:-translate-y-0.5 hover:shadow-cyan-500/50"
                            >
                                Back to projects
                                <ArrowRight size={15} />
                            </button>
                        </div>
                    </div>
                </div>
            </PageShell>
        );
    }

    /* =====================================================
       MAIN
    ===================================================== */
    const isFullyPaid =
        Number(paymentSummary?.outstanding_balance ?? 0) <= 0 &&
        Number(paymentSummary?.proposal_total || paymentSummary?.total || 0) > 0;

    return (
        <PageShell darkMode={darkMode}>
            <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                {/* =================== TOP NAV =================== */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <Link
                        to="/portal/projects"
                        className={`group inline-flex items-center gap-2 text-sm font-bold transition-colors ${darkMode
                                ? "text-slate-400 hover:text-white"
                                : "text-slate-500 hover:text-slate-900"
                            }`}
                    >
                        <ArrowLeft
                            size={16}
                            className="transition-transform group-hover:-translate-x-0.5"
                        />
                        All projects
                    </Link>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => loadProject({ silent: true })}
                            disabled={refreshing}
                            className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-bold transition-colors ${darkMode
                                    ? "border-white/[0.08] text-slate-400 hover:bg-white/[0.04] hover:text-white"
                                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                                }`}
                        >
                            <RefreshCw
                                size={14}
                                className={refreshing ? "animate-spin text-cyan-500" : ""}
                            />
                            Refresh
                        </button>
                        <Link
                            to={`/portal/projects/${projectId}/payments`}
                            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-cyan-500/30 transition-all hover:-translate-y-0.5 hover:shadow-cyan-500/50"
                        >
                            <Receipt size={14} />
                            <span className="hidden sm:inline">Full payment history</span>
                            <span className="sm:hidden">Payments</span>
                            <ChevronRight size={14} />
                        </Link>
                    </div>
                </div>

                {/* =================== HERO =================== */}
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
                                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ring-1 transition-transform hover:scale-105 ${darkMode
                                                ? "bg-cyan-400/10 text-cyan-300 ring-cyan-400/20"
                                                : "bg-cyan-50 text-cyan-600 ring-cyan-100"
                                            }`}
                                    >
                                        <FolderOpen size={26} />
                                    </div>

                                    <div className="min-w-0">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span
                                                className={`font-mono text-[10px] font-black uppercase tracking-[0.18em] ${darkMode
                                                        ? "text-slate-500"
                                                        : "text-slate-400"
                                                    }`}
                                            >
                                                {getProjectCode(project)}
                                            </span>
                                            <StatusBadge
                                                status={project.status}
                                                darkMode={darkMode}
                                            />
                                            {isFullyPaid && (
                                                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-400">
                                                    <Check size={11} />
                                                    Fully paid
                                                </span>
                                            )}
                                        </div>

                                        <h1
                                            className={`mt-2 break-words text-2xl font-black tracking-tight sm:text-3xl ${darkMode
                                                    ? "text-white"
                                                    : "text-slate-900"
                                                }`}
                                        >
                                            {project.name || project.title || "Project"}
                                        </h1>

                                        {project.accepted_at && (
                                            <p
                                                className={`mt-2 inline-flex items-center gap-1.5 text-xs font-medium ${darkMode
                                                        ? "text-slate-500"
                                                        : "text-slate-500"
                                                    }`}
                                            >
                                                <CalendarDays size={12} />
                                                Started {formatDate(project.accepted_at)}
                                                <span className="mx-1">·</span>
                                                <Clock3 size={12} />
                                                Updated {timeAgo(project.updated_at)}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Progress block */}
                            <div className="w-full lg:max-w-sm">
                                <div
                                    className={`rounded-2xl border p-4 ${darkMode
                                            ? "border-white/[0.06] bg-white/[0.02]"
                                            : "border-slate-200 bg-white/70 backdrop-blur"
                                        }`}
                                >
                                    <div className="flex items-end justify-between">
                                        <div>
                                            <p
                                                className={`text-[10px] font-black uppercase tracking-wider ${darkMode
                                                        ? "text-slate-500"
                                                        : "text-slate-400"
                                                    }`}
                                            >
                                                Overall progress
                                            </p>
                                            <p
                                                className={`mt-1 text-[11px] ${darkMode
                                                        ? "text-slate-500"
                                                        : "text-slate-500"
                                                    }`}
                                            >
                                                {completedMilestones} completed
                                                {activeMilestones > 0 &&
                                                    ` · ${activeMilestones} in progress`}
                                            </p>
                                        </div>
                                        <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-3xl font-black text-transparent">
                                            {progress}%
                                        </span>
                                    </div>

                                    <div
                                        className={`mt-3 h-2.5 overflow-hidden rounded-full ${darkMode
                                                ? "bg-white/[0.07]"
                                                : "bg-slate-100"
                                            }`}
                                    >
                                        <div
                                            className={`h-full rounded-full transition-all duration-1000 ${progress === 100
                                                    ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                                                    : "bg-gradient-to-r from-cyan-500 to-indigo-500"
                                                }`}
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>

                                    <div className="mt-3 flex items-center justify-between">
                                        <span
                                            className={`text-[10px] ${darkMode
                                                    ? "text-slate-600"
                                                    : "text-slate-400"
                                                }`}
                                        >
                                            {milestones.length} total milestones
                                        </span>
                                        {activeMilestones > 0 && (
                                            <span className="inline-flex items-center gap-1 rounded-full bg-cyan-500/10 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-cyan-400">
                                                <span className="relative flex h-1.5 w-1.5">
                                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                                                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400" />
                                                </span>
                                                Live
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p
                            className={`mt-7 max-w-4xl text-sm leading-7 ${darkMode
                                    ? "text-slate-400"
                                    : "text-slate-600"
                                }`}
                        >
                            {project.client_summary ||
                                project.description ||
                                "Your project is being managed by the AB Technologies team."}
                        </p>

                        {/* Hero stats */}
                        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
                            <HeroStat
                                icon={CheckCircle2}
                                label="Milestones"
                                value={milestones.length}
                                sublabel={`${completedMilestones} done`}
                                darkMode={darkMode}
                            />
                            <HeroStat
                                icon={MessageCircle}
                                label="Discussion"
                                value={comments.length}
                                sublabel="messages"
                                darkMode={darkMode}
                            />
                            <HeroStat
                                icon={Paperclip}
                                label="Files & media"
                                value={allFiles.length}
                                sublabel="assets"
                                darkMode={darkMode}
                            />
                            <HeroStat
                                icon={Clock3}
                                label="Updates"
                                value={updates.length}
                                sublabel="posted"
                                darkMode={darkMode}
                            />
                        </div>
                    </div>

                    {/* ============ STICKY TABS ============ */}
                    <div
                        className={`sticky top-[76px] z-20 overflow-x-auto border-t backdrop-blur-xl ${darkMode
                                ? "border-white/[0.07] bg-[#020611]/85"
                                : "border-slate-100 bg-white/90"
                            }`}
                    >
                        <div className="flex min-w-max px-3 sm:px-5">
                            {tabs.map(({ value, label, icon: Icon, badge }) => {
                                const active = activeTab === value;
                                return (
                                    <button
                                        key={value}
                                        type="button"
                                        onClick={() => setActiveTab(value)}
                                        className={`group relative flex items-center gap-2 border-b-2 px-3.5 py-4 text-xs font-bold transition-all sm:text-sm ${active
                                                ? darkMode
                                                    ? "border-cyan-400 text-cyan-300"
                                                    : "border-cyan-500 text-cyan-600"
                                                : darkMode
                                                    ? "border-transparent text-slate-500 hover:text-slate-300"
                                                    : "border-transparent text-slate-400 hover:text-slate-700"
                                            }`}
                                    >
                                        <Icon
                                            size={15}
                                            className={`transition-transform group-hover:scale-110 ${active ? "text-cyan-400" : ""
                                                }`}
                                        />
                                        <span>{label}</span>
                                        {typeof badge === "number" && badge > 0 && (
                                            <span
                                                className={`rounded-full px-1.5 py-0.5 text-[9px] font-black ${active
                                                        ? "bg-cyan-500 text-white"
                                                        : darkMode
                                                            ? "bg-white/[0.06] text-slate-400"
                                                            : "bg-slate-100 text-slate-500"
                                                    }`}
                                            >
                                                {badge}
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* =================== OVERVIEW =================== */}
                {activeTab === "overview" && (
                    <div className="mt-6 grid gap-6 lg:grid-cols-3">
                        <div className="space-y-6 lg:col-span-2">
                            <SectionCard
                                title="Project overview"
                                icon={Info}
                                darkMode={darkMode}
                            >
                                <p
                                    className={`text-sm leading-7 ${darkMode
                                            ? "text-slate-400"
                                            : "text-slate-600"
                                        }`}
                                >
                                    {project.client_summary ||
                                        project.description ||
                                        "No additional project summary has been provided."}
                                </p>
                            </SectionCard>

                            <ProjectInformation
                                project={project}
                                darkMode={darkMode}
                            />

                            <SectionCard
                                title="Latest project updates"
                                icon={Clock3}
                                darkMode={darkMode}
                                action={
                                    updates.length > 0 ? (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setActiveTab("updates")
                                            }
                                            className={`inline-flex items-center gap-1 text-xs font-bold ${darkMode
                                                    ? "text-cyan-300 hover:text-cyan-200"
                                                    : "text-cyan-600 hover:text-cyan-700"
                                                }`}
                                        >
                                            View all
                                            <ChevronRight size={12} />
                                        </button>
                                    ) : null
                                }
                            >
                                {updates.length === 0 ? (
                                    <EmptyInline
                                        icon={Clock3}
                                        title="No updates yet"
                                        text="Project updates from the AB Technologies team will appear here."
                                        darkMode={darkMode}
                                    />
                                ) : (
                                    <div className="space-y-8">
                                        {updates.slice(0, 3).map((update) => (
                                            <UpdateItem
                                                key={
                                                    update.id ||
                                                    `${update.created_at}-${update.title}`
                                                }
                                                update={update}
                                                darkMode={darkMode}
                                                onPreview={setPreviewFile}
                                            />
                                        ))}
                                    </div>
                                )}
                            </SectionCard>
                        </div>

                        <div className="space-y-6">
                            <SectionCard
                                title="Project details"
                                icon={CalendarDays}
                                darkMode={darkMode}
                            >
                                <div className="space-y-4">
                                    <DetailRow
                                        label="Status"
                                        value={getStatusLabel(project.status)}
                                        darkMode={darkMode}
                                    />
                                    <DetailRow
                                        label="Start date"
                                        value={formatDate(
                                            project.accepted_at ||
                                            project.created_at
                                        )}
                                        darkMode={darkMode}
                                    />
                                    <DetailRow
                                        label="Last updated"
                                        value={formatDate(project.updated_at)}
                                        darkMode={darkMode}
                                    />
                                    <DetailRow
                                        label="Milestones"
                                        value={milestones.length}
                                        darkMode={darkMode}
                                    />
                                    {project.total_price !== undefined &&
                                        project.total_price !== null && (
                                            <DetailRow
                                                label="Project value"
                                                value={`${project.currency || ""} ${project.total_price}`}
                                                darkMode={darkMode}
                                            />
                                        )}
                                </div>
                            </SectionCard>

                            <SectionCard
                                title="Milestone progress"
                                icon={Target}
                                darkMode={darkMode}
                            >
                                <div className="space-y-3">
                                    <ProgressRow
                                        label="Completed"
                                        value={completedMilestones}
                                        total={milestones.length}
                                        tone="emerald"
                                        darkMode={darkMode}
                                    />
                                    <ProgressRow
                                        label="In progress"
                                        value={activeMilestones}
                                        total={milestones.length}
                                        tone="cyan"
                                        darkMode={darkMode}
                                    />
                                    <ProgressRow
                                        label="Upcoming"
                                        value={upcomingMilestones}
                                        total={milestones.length}
                                        tone="slate"
                                        darkMode={darkMode}
                                    />
                                </div>
                            </SectionCard>

                            <SectionCard
                                title="Need to discuss something?"
                                icon={MessageCircle}
                                darkMode={darkMode}
                            >
                                <p
                                    className={`text-sm leading-6 ${darkMode
                                            ? "text-slate-400"
                                            : "text-slate-500"
                                        }`}
                                >
                                    Leave a message for the AB Technologies
                                    team. You can also comment directly on any
                                    milestone.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab("discussion")}
                                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/30 transition-all hover:-translate-y-0.5 hover:shadow-cyan-500/50"
                                >
                                    Open discussion
                                    <ChevronRight size={15} />
                                </button>
                            </SectionCard>
                        </div>
                    </div>
                )}

                {/* =================== MILESTONES =================== */}
                {activeTab === "milestones" && (
                    <div className="mt-6">
                        <SectionCard
                            title="Project milestones"
                            icon={Milestone}
                            darkMode={darkMode}
                            action={
                                milestones.length > 0 ? (
                                    <span
                                        className={`text-[10px] font-black uppercase tracking-wider ${darkMode
                                                ? "text-slate-500"
                                                : "text-slate-400"
                                            }`}
                                    >
                                        {completedMilestones}/{milestones.length} completed
                                    </span>
                                ) : null
                            }
                        >
                            {milestones.length === 0 ? (
                                <EmptyInline
                                    icon={Milestone}
                                    title="Milestones are not available yet"
                                    text="The project team will add milestones as the project is planned."
                                    darkMode={darkMode}
                                />
                            ) : (
                                <div className="space-y-3">
                                    {milestones.map((milestone, index) => {
                                        const id = milestone.id || index + 1;
                                        const done = isCompleted(milestone);
                                        const active = isInProgress(milestone);
                                        const milestoneCommentsList =
                                            milestoneComments(id);
                                        const expanded = Boolean(
                                            expandedMilestones[id]
                                        );

                                        return (
                                            <div
                                                key={id}
                                                className={`group overflow-hidden rounded-2xl border transition-all ${darkMode
                                                        ? "border-white/[0.07] bg-white/[0.02] hover:border-white/[0.12]"
                                                        : "border-slate-200 bg-white hover:border-slate-300"
                                                    }`}
                                            >
                                                {/* Connector line for timeline feel */}
                                                <div className="flex items-center gap-4 p-4 sm:p-5">
                                                    <div
                                                        className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-transform group-hover:scale-105 ${done
                                                                ? "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30"
                                                                : active
                                                                    ? "bg-cyan-500/15 text-cyan-400 ring-1 ring-cyan-500/30"
                                                                    : darkMode
                                                                        ? "bg-white/[0.06] text-slate-500 ring-1 ring-white/[0.06]"
                                                                        : "bg-slate-100 text-slate-500 ring-1 ring-slate-200"
                                                            }`}
                                                    >
                                                        {done ? (
                                                            <Check size={18} />
                                                        ) : active ? (
                                                            <span className="relative flex h-2 w-2">
                                                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                                                                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
                                                            </span>
                                                        ) : (
                                                            <span className="text-sm font-black">
                                                                {index + 1}
                                                            </span>
                                                        )}
                                                    </div>

                                                    <div className="min-w-0 flex-1">
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            <h3
                                                                className={`text-sm font-bold ${darkMode
                                                                        ? "text-white"
                                                                        : "text-slate-900"
                                                                    }`}
                                                            >
                                                                {milestone.title ||
                                                                    milestone.name ||
                                                                    `Milestone ${index + 1}`}
                                                            </h3>
                                                            <span
                                                                className={`rounded-full border px-2 py-0.5 text-[9px] font-black uppercase tracking-wider ${done
                                                                        ? darkMode
                                                                            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                                                                            : "border-emerald-200 bg-emerald-50 text-emerald-700"
                                                                        : active
                                                                            ? darkMode
                                                                                ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-300"
                                                                                : "border-cyan-200 bg-cyan-50 text-cyan-700"
                                                                            : darkMode
                                                                                ? "border-white/[0.08] bg-white/[0.03] text-slate-500"
                                                                                : "border-slate-200 bg-slate-100 text-slate-500"
                                                                    }`}
                                                            >
                                                                {getMilestoneStatus(
                                                                    milestone
                                                                )}
                                                            </span>
                                                        </div>

                                                        {milestone.due_date && (
                                                            <p
                                                                className={`mt-1 inline-flex items-center gap-1 text-[11px] ${darkMode
                                                                        ? "text-slate-500"
                                                                        : "text-slate-400"
                                                                    }`}
                                                            >
                                                                <CalendarDays size={10} />
                                                                Due{" "}
                                                                {formatDate(
                                                                    milestone.due_date
                                                                )}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            toggleMilestone(id)
                                                        }
                                                        className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold transition-colors ${darkMode
                                                                ? "text-slate-400 hover:bg-white/[0.05] hover:text-white"
                                                                : "text-slate-500 hover:bg-slate-100"
                                                            }`}
                                                    >
                                                        <MessageCircle size={13} />
                                                        {milestoneCommentsList.length}
                                                        <ChevronDown
                                                            size={14}
                                                            className={`transition-transform ${expanded
                                                                    ? "rotate-180"
                                                                    : ""
                                                                }`}
                                                        />
                                                    </button>
                                                </div>

                                                {expanded && (
                                                    <div
                                                        className={`border-t px-4 py-4 sm:px-5 ${darkMode
                                                                ? "border-white/[0.06] bg-white/[0.01]"
                                                                : "border-slate-100 bg-slate-50/50"
                                                            }`}
                                                    >
                                                        {milestone.description && (
                                                            <p
                                                                className={`mb-4 text-sm leading-6 ${darkMode
                                                                        ? "text-slate-400"
                                                                        : "text-slate-600"
                                                                    }`}
                                                            >
                                                                {milestone.description}
                                                            </p>
                                                        )}

                                                        {milestoneCommentsList.length ===
                                                            0 ? (
                                                            <p
                                                                className={`text-xs ${darkMode
                                                                        ? "text-slate-500"
                                                                        : "text-slate-400"
                                                                    }`}
                                                            >
                                                                No comments on
                                                                this milestone
                                                                yet.
                                                            </p>
                                                        ) : (
                                                            <div className="space-y-4">
                                                                {milestoneCommentsList.map(
                                                                    (item) => (
                                                                        <CommentItem
                                                                            key={
                                                                                item.id ||
                                                                                `${item.created_at}-${item.message}`
                                                                            }
                                                                            comment={item}
                                                                            darkMode={darkMode}
                                                                        />
                                                                    )
                                                                )}
                                                            </div>
                                                        )}

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                openMilestoneDiscussion(
                                                                    id
                                                                )
                                                            }
                                                            className={`mt-5 inline-flex items-center gap-2 rounded-lg px-2 py-1 text-xs font-bold transition-colors ${darkMode
                                                                    ? "text-cyan-300 hover:bg-cyan-500/10"
                                                                    : "text-cyan-600 hover:bg-cyan-50"
                                                                }`}
                                                        >
                                                            <MessageCircle size={14} />
                                                            Comment on this milestone
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </SectionCard>
                    </div>
                )}

                {/* =================== PAYMENTS =================== */}
                {activeTab === "payments" && (
                    <div className="mt-6">
                        <PaymentPanel
                            darkMode={darkMode}
                            summary={paymentSummary}
                            milestones={paymentMilestones}
                            currency={paymentCurrency}
                            loading={paymentLoading}
                            error={paymentError}
                            actionMessage={paymentActionMessage}
                            payingMilestoneId={payingMilestoneId}
                            payingFullBalance={payingFullBalance}
                            proposalLinked={Boolean(
                                getProposalPublicToken(project)
                            )}
                            onPay={initiateMilestonePayment}
                            onPayFullBalance={initiateFullBalancePayment}
                            onRefresh={refreshPayments}
                        />
                    </div>
                )}

                {/* =================== UPDATES =================== */}
                {activeTab === "updates" && (
                    <div className="mt-6">
                        <SectionCard
                            title="Project updates"
                            icon={Clock3}
                            darkMode={darkMode}
                        >
                            {updates.length === 0 ? (
                                <EmptyInline
                                    icon={Clock3}
                                    title="No project updates yet"
                                    text="The AB Technologies team will post progress updates, screenshots, videos and files here."
                                    darkMode={darkMode}
                                />
                            ) : (
                                <div className="space-y-8">
                                    {updates.map((update, index) => (
                                        <UpdateItem
                                            key={
                                                update.id ||
                                                `${update.created_at}-${index}`
                                            }
                                            update={update}
                                            darkMode={darkMode}
                                            onPreview={setPreviewFile}
                                        />
                                    ))}
                                </div>
                            )}
                        </SectionCard>
                    </div>
                )}

                {/* =================== FILES =================== */}
                {activeTab === "files" && (
                    <div className="mt-6 space-y-6">
                        {imageFiles.length > 0 && (
                            <SectionCard
                                title="Screenshots & images"
                                icon={ImageIcon}
                                darkMode={darkMode}
                                action={
                                    <span
                                        className={`text-[10px] font-black uppercase tracking-wider ${darkMode
                                                ? "text-slate-500"
                                                : "text-slate-400"
                                            }`}
                                    >
                                        {imageFiles.length} files
                                    </span>
                                }
                            >
                                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    {imageFiles.map((file, index) => (
                                        <FileCard
                                            key={
                                                file.id ||
                                                `${getFileName(file)}-${index}`
                                            }
                                            file={file}
                                            darkMode={darkMode}
                                            onPreview={setPreviewFile}
                                        />
                                    ))}
                                </div>
                            </SectionCard>
                        )}

                        {videoFiles.length > 0 && (
                            <SectionCard
                                title="Project videos"
                                icon={Video}
                                darkMode={darkMode}
                                action={
                                    <span
                                        className={`text-[10px] font-black uppercase tracking-wider ${darkMode
                                                ? "text-slate-500"
                                                : "text-slate-400"
                                            }`}
                                    >
                                        {videoFiles.length} files
                                    </span>
                                }
                            >
                                <div className="grid gap-4 sm:grid-cols-2">
                                    {videoFiles.map((file, index) => (
                                        <FileCard
                                            key={
                                                file.id ||
                                                `${getFileName(file)}-${index}`
                                            }
                                            file={file}
                                            darkMode={darkMode}
                                            onPreview={setPreviewFile}
                                        />
                                    ))}
                                </div>
                            </SectionCard>
                        )}

                        {documentFiles.length > 0 && (
                            <SectionCard
                                title="Documents & files"
                                icon={Paperclip}
                                darkMode={darkMode}
                                action={
                                    <span
                                        className={`text-[10px] font-black uppercase tracking-wider ${darkMode
                                                ? "text-slate-500"
                                                : "text-slate-400"
                                            }`}
                                    >
                                        {documentFiles.length} files
                                    </span>
                                }
                            >
                                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    {documentFiles.map((file, index) => (
                                        <FileCard
                                            key={
                                                file.id ||
                                                `${getFileName(file)}-${index}`
                                            }
                                            file={file}
                                            darkMode={darkMode}
                                            onPreview={setPreviewFile}
                                        />
                                    ))}
                                </div>
                            </SectionCard>
                        )}

                        {allFiles.length === 0 && (
                            <SectionCard
                                title="Project files & media"
                                icon={Paperclip}
                                darkMode={darkMode}
                            >
                                <EmptyInline
                                    icon={Paperclip}
                                    title="No files yet"
                                    text="Screenshots, videos, documents and other project files will appear here."
                                    darkMode={darkMode}
                                />
                            </SectionCard>
                        )}
                    </div>
                )}

                {/* =================== CONTENT =================== */}
                {activeTab === "content" && (
                    <div className="mt-6 space-y-6">
                        <ClientProjectContentPanel
                            content={clientContent}
                            form={contentForm}
                            darkMode={darkMode}
                            saving={savingContent}
                            uploading={uploadingContent}
                            message={contentMessage}
                            error={contentError}
                            onFieldChange={updateContentField}
                            onSave={saveClientContent}
                            onUpload={uploadClientContentFiles}
                            onDeleteFile={deleteClientContentFile}
                            onPreview={setPreviewFile}
                        />
                    </div>
                )}

                {/* =================== DISCUSSION =================== */}
                {activeTab === "discussion" && (
                    <div className="mt-6 grid gap-6 lg:grid-cols-3">
                        <div className="lg:col-span-2">
                            <SectionCard
                                title="Project discussion"
                                icon={MessageCircle}
                                darkMode={darkMode}
                                action={
                                    comments.length > 0 ? (
                                        <span
                                            className={`text-[10px] font-black uppercase tracking-wider ${darkMode
                                                    ? "text-slate-500"
                                                    : "text-slate-400"
                                                }`}
                                        >
                                            {comments.length} total
                                        </span>
                                    ) : null
                                }
                            >
                                {selectedMilestone && (
                                    <div
                                        className={`mb-5 flex items-center justify-between rounded-xl border px-4 py-3 ${darkMode
                                                ? "border-cyan-500/20 bg-cyan-500/[0.06]"
                                                : "border-cyan-200 bg-cyan-50"
                                            }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <Milestone
                                                size={14}
                                                className={
                                                    darkMode
                                                        ? "text-cyan-300"
                                                        : "text-cyan-600"
                                                }
                                            />
                                            <p
                                                className={`text-xs font-bold ${darkMode
                                                        ? "text-cyan-300"
                                                        : "text-cyan-700"
                                                    }`}
                                            >
                                                Discussion for milestone #
                                                {selectedMilestone}
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setSelectedMilestone(null)
                                            }
                                            className={`rounded-md p-1 transition-colors ${darkMode
                                                    ? "text-cyan-300 hover:bg-cyan-500/10"
                                                    : "text-cyan-600 hover:bg-cyan-100"
                                                }`}
                                        >
                                            <X size={13} />
                                        </button>
                                    </div>
                                )}

                                {selectedMilestone ? (
                                    <MilestoneDiscussionPreview
                                        milestoneId={selectedMilestone}
                                        milestone={milestones.find(
                                            (item) =>
                                                String(item.id) ===
                                                String(selectedMilestone)
                                        )}
                                        comments={milestoneComments(
                                            selectedMilestone
                                        )}
                                        darkMode={darkMode}
                                    />
                                ) : generalComments.length === 0 ? (
                                    <EmptyInline
                                        icon={MessageCircle}
                                        title="No project comments yet"
                                        text="Start the conversation using the message box."
                                        darkMode={darkMode}
                                    />
                                ) : (
                                    <div className="space-y-6">
                                        {generalComments.map((item) => (
                                            <CommentItem
                                                key={
                                                    item.id ||
                                                    `${item.created_at}-${item.message}`
                                                }
                                                comment={item}
                                                darkMode={darkMode}
                                            />
                                        ))}
                                    </div>
                                )}
                            </SectionCard>
                        </div>

                        <div>
                            <SectionCard
                                title={
                                    selectedMilestone
                                        ? `Comment on milestone ${selectedMilestone}`
                                        : "Send a message"
                                }
                                icon={Send}
                                darkMode={darkMode}
                            >
                                {selectedMilestone && (
                                    <div
                                        className={`mb-3 flex items-center justify-between rounded-xl px-3 py-2 ${darkMode
                                                ? "bg-cyan-400/10 text-cyan-300"
                                                : "bg-cyan-50 text-cyan-700"
                                            }`}
                                    >
                                        <span className="text-xs font-bold">
                                            Milestone #{selectedMilestone}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setSelectedMilestone(null)
                                            }
                                            className="rounded-md p-1 hover:bg-black/10"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                )}

                                <textarea
                                    value={comment}
                                    onChange={(event) =>
                                        setComment(event.target.value)
                                    }
                                    placeholder={
                                        selectedMilestone
                                            ? "Write a comment about this milestone..."
                                            : "Write a message to the project team..."
                                    }
                                    rows={7}
                                    className={`w-full resize-none rounded-xl border p-3 text-sm leading-6 outline-none transition ${darkMode
                                            ? "border-white/[0.08] bg-white/[0.025] text-white placeholder:text-slate-600 focus:border-cyan-400/40 focus:bg-white/[0.04]"
                                            : "border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-cyan-400 focus:bg-white"
                                        }`}
                                />

                                <div className="mt-3 flex items-center justify-between">
                                    <span
                                        className={`text-[10px] ${darkMode
                                                ? "text-slate-600"
                                                : "text-slate-400"
                                            }`}
                                    >
                                        Your message will be visible to the AB
                                        Technologies team.
                                    </span>
                                    <span
                                        className={`text-[10px] font-mono ${darkMode
                                                ? "text-slate-600"
                                                : "text-slate-400"
                                            }`}
                                    >
                                        {comment.length}
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    disabled={sendingComment || !comment.trim()}
                                    onClick={submitComment}
                                    className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/30 transition-all hover:-translate-y-0.5 hover:shadow-cyan-500/50 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {sendingComment ? (
                                        <>
                                            <Loader2
                                                size={15}
                                                className="animate-spin"
                                            />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send size={15} />
                                            Send comment
                                        </>
                                    )}
                                </button>
                            </SectionCard>
                        </div>
                    </div>
                )}
            </main>

            {previewFile && (
                <FilePreviewModal
                    file={previewFile}
                    darkMode={darkMode}
                    onClose={() => setPreviewFile(null)}
                />
            )}
        </PageShell>
    );
}


/* =========================================================
   PAYMENT PANEL
========================================================= */

function PaymentPanel({
    darkMode,
    summary,
    milestones,
    currency,
    loading,
    error,
    actionMessage,
    payingMilestoneId,
    payingFullBalance,
    proposalLinked,
    onPay,
    onPayFullBalance,
    onRefresh,
}) {
    const total = Number(summary?.proposal_total || summary?.total || 0);
    const paid = Number(summary?.total_paid || summary?.paid || 0);
    const outstanding = Number(
        summary?.outstanding_balance ?? Math.max(0, total - paid)
    );
    const percentage =
        total > 0
            ? Math.min(100, Math.max(0, Math.round((paid / total) * 100)))
            : 0;

    const ordered = [...milestones].sort(
        (a, b) => Number(a.order || 0) - Number(b.order || 0)
    );

    const [confirmFullBalance, setConfirmFullBalance] = useState(false);

    const fullyPaid = outstanding <= 0 && total > 0;
    const canPayFullBalance =
        proposalLinked && !fullyPaid && outstanding > 0 && !payingFullBalance;

    return (
        <div className="space-y-6">
            <SectionCard
                title="Project payments"
                icon={CreditCard}
                darkMode={darkMode}
                action={
                    proposalLinked ? (
                        <button
                            type="button"
                            onClick={onRefresh}
                            disabled={loading}
                            className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[11px] font-bold transition-colors ${darkMode
                                    ? "border-white/[0.08] text-slate-400 hover:bg-white/[0.04] hover:text-white"
                                    : "border-slate-200 text-slate-500 hover:bg-slate-50"
                                } disabled:opacity-50`}
                        >
                            <RefreshCw
                                size={12}
                                className={loading ? "animate-spin" : ""}
                            />
                            Refresh
                        </button>
                    ) : null
                }
            >
                <div className="grid gap-3 sm:grid-cols-3">
                    <PaymentStat
                        label="Project total"
                        value={formatMoney(total, currency)}
                        icon={Receipt}
                        darkMode={darkMode}
                    />
                    <PaymentStat
                        label="Paid"
                        value={formatMoney(paid, currency)}
                        icon={CheckCircle2}
                        darkMode={darkMode}
                        positive
                    />
                    <PaymentStat
                        label="Outstanding"
                        value={formatMoney(outstanding, currency)}
                        icon={DollarSign}
                        darkMode={darkMode}
                        emphasis
                    />
                </div>

                <div className="mt-6">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p
                                className={
                                    darkMode
                                        ? "text-sm font-bold text-white"
                                        : "text-sm font-bold text-slate-900"
                                }
                            >
                                Payment progress
                            </p>
                            <p
                                className={
                                    darkMode
                                        ? "mt-1 text-xs text-slate-500"
                                        : "mt-1 text-xs text-slate-400"
                                }
                            >
                                Pay milestone by milestone, or clear the entire
                                outstanding balance at once.
                            </p>
                        </div>
                        <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-2xl font-black text-transparent">
                            {percentage}%
                        </span>
                    </div>
                    <div
                        className={
                            darkMode
                                ? "mt-3 h-2.5 overflow-hidden rounded-full bg-white/[0.07]"
                                : "mt-3 h-2.5 overflow-hidden rounded-full bg-slate-100"
                        }
                    >
                        <div
                            className={`h-full rounded-full transition-all duration-1000 ${percentage === 100
                                    ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                                    : "bg-gradient-to-r from-cyan-500 to-indigo-500"
                                }`}
                            style={{ width: `${percentage}%` }}
                        />
                    </div>
                </div>

                {actionMessage && (
                    <div
                        className={
                            darkMode
                                ? "mt-5 flex items-start gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] p-3 text-sm text-emerald-300"
                                : "mt-5 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700"
                        }
                    >
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
                        <span>{actionMessage}</span>
                    </div>
                )}

                {error && (
                    <div
                        className={
                            darkMode
                                ? "mt-5 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/[0.06] p-3 text-sm text-red-300"
                                : "mt-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
                        }
                    >
                        <AlertCircle size={16} className="mt-0.5 shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                {!proposalLinked && (
                    <div
                        className={
                            darkMode
                                ? "mt-5 flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/[0.06] p-3 text-sm text-amber-300"
                                : "mt-5 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700"
                        }
                    >
                        <AlertCircle size={16} className="mt-0.5 shrink-0" />
                        <span>
                            Payments are not yet linked to a proposal for this
                            project. Once your proposal is accepted, milestones
                            and payment options will appear here.
                        </span>
                    </div>
                )}
            </SectionCard>

            {proposalLinked && (
                <SectionCard
                    title="Pay full balance"
                    icon={Wallet}
                    darkMode={darkMode}
                >
                    <div
                        className={
                            darkMode
                                ? "relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/[0.08] to-indigo-500/[0.04] p-4 sm:p-5"
                                : "relative overflow-hidden rounded-2xl border border-cyan-200 bg-gradient-to-br from-cyan-50 to-indigo-50 p-4 sm:p-5"
                        }
                    >
                        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-400/20 blur-3xl" />

                        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                    <Rocket
                                        size={15}
                                        className="text-cyan-400"
                                    />
                                    <p
                                        className={
                                            darkMode
                                                ? "text-sm font-bold text-white"
                                                : "text-sm font-bold text-slate-900"
                                        }
                                    >
                                        Settle the entire outstanding balance
                                    </p>
                                </div>
                                <p
                                    className={
                                        darkMode
                                            ? "mt-1.5 text-xs leading-5 text-slate-400"
                                            : "mt-1.5 text-xs leading-5 text-slate-500"
                                    }
                                >
                                    Pay everything that is still owed in a
                                    single transaction. This clears all
                                    remaining milestones and unlocks the
                                    project for delivery.
                                </p>

                                <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                                    <span
                                        className={
                                            darkMode
                                                ? "text-[10px] font-bold uppercase tracking-wider text-slate-500"
                                                : "text-[10px] font-bold uppercase tracking-wider text-slate-400"
                                        }
                                    >
                                        Amount due now
                                    </span>
                                    <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-xl font-black text-transparent">
                                        {formatMoney(outstanding, currency)}
                                    </span>
                                    {fullyPaid && (
                                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-emerald-400">
                                            <Check size={11} />
                                            Fully paid
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="shrink-0">
                                <button
                                    type="button"
                                    onClick={() => setConfirmFullBalance(true)}
                                    disabled={!canPayFullBalance}
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/30 transition-all hover:-translate-y-0.5 hover:shadow-cyan-500/50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 sm:w-auto"
                                >
                                    {payingFullBalance ? (
                                        <>
                                            <Loader2
                                                size={15}
                                                className="animate-spin"
                                            />
                                            Opening checkout...
                                        </>
                                    ) : (
                                        <>
                                            <CreditCard size={15} />
                                            {fullyPaid
                                                ? "Nothing to pay"
                                                : `Pay ${formatMoney(
                                                    outstanding,
                                                    currency
                                                )}`}
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </SectionCard>
            )}

            <SectionCard
                title="Payment milestones"
                icon={DollarSign}
                darkMode={darkMode}
                action={
                    ordered.length > 0 ? (
                        <span
                            className={`text-[10px] font-black uppercase tracking-wider ${darkMode
                                    ? "text-slate-500"
                                    : "text-slate-400"
                                }`}
                        >
                            {ordered.length} total
                        </span>
                    ) : null
                }
            >
                {loading && !ordered.length ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader2
                            size={24}
                            className="animate-spin text-cyan-400"
                        />
                    </div>
                ) : ordered.length === 0 ? (
                    <EmptyInline
                        icon={Receipt}
                        title={
                            proposalLinked
                                ? "No payment milestones yet"
                                : "Payments not available yet"
                        }
                        text={
                            proposalLinked
                                ? "Payment milestones will appear here once the AB Technologies team finalises the payment plan for your proposal."
                                : "Once your proposal is accepted and the payment plan is finalised, your milestones will appear here."
                        }
                        darkMode={darkMode}
                    />
                ) : (
                    <div className="space-y-3">
                        {ordered.map((milestone, index) => {
                            const { payable, reason } =
                                evaluateMilestonePayability(
                                    milestone,
                                    ordered
                                );

                            const paidMilestone =
                                milestone.payment_status === "paid";
                            const partiallyPaid =
                                milestone.payment_status === "partially_paid";
                            const locked = !payable && !paidMilestone;

                            const amount = Number(milestone.amount || 0);
                            const milestonePaid = Number(
                                milestone.total_paid || 0
                            );
                            const milestoneOutstanding = Number(
                                milestone.outstanding_balance ??
                                Math.max(0, amount - milestonePaid)
                            );

                            return (
                                <div
                                    key={milestone.id || index}
                                    className={`group overflow-hidden rounded-2xl border transition-all ${darkMode
                                            ? "border-white/[0.07] bg-white/[0.02] hover:border-white/[0.12]"
                                            : "border-slate-200 bg-white hover:border-slate-300"
                                        }`}
                                >
                                    <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-5">
                                        <div
                                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-transform group-hover:scale-105 ${paidMilestone
                                                    ? "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30"
                                                    : locked
                                                        ? darkMode
                                                            ? "bg-white/[0.05] text-slate-500 ring-1 ring-white/[0.06]"
                                                            : "bg-slate-100 text-slate-500 ring-1 ring-slate-200"
                                                        : "bg-cyan-500/15 text-cyan-400 ring-1 ring-cyan-500/30"
                                                }`}
                                        >
                                            {paidMilestone ? (
                                                <Check size={18} />
                                            ) : locked ? (
                                                <LockKeyhole size={16} />
                                            ) : (
                                                <span className="text-sm font-black">
                                                    {index + 1}
                                                </span>
                                            )}
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h3
                                                    className={
                                                        darkMode
                                                            ? "text-sm font-bold text-white"
                                                            : "text-sm font-bold text-slate-900"
                                                    }
                                                >
                                                    {milestone.title}
                                                </h3>
                                                <span
                                                    className={`rounded-full border px-2 py-0.5 text-[9px] font-black uppercase tracking-wider ${paidMilestone
                                                            ? darkMode
                                                                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                                                                : "border-emerald-200 bg-emerald-50 text-emerald-700"
                                                            : partiallyPaid
                                                                ? darkMode
                                                                    ? "border-amber-500/30 bg-amber-500/10 text-amber-300"
                                                                    : "border-amber-200 bg-amber-50 text-amber-700"
                                                                : locked
                                                                    ? darkMode
                                                                        ? "border-white/[0.08] bg-white/[0.03] text-slate-500"
                                                                        : "border-slate-200 bg-slate-100 text-slate-500"
                                                                    : darkMode
                                                                        ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-300"
                                                                        : "border-cyan-200 bg-cyan-50 text-cyan-700"
                                                        }`}
                                                >
                                                    {paidMilestone
                                                        ? "Paid"
                                                        : partiallyPaid
                                                            ? "Partial"
                                                            : locked
                                                                ? "Locked"
                                                                : paymentStatusLabel(
                                                                    milestone.payment_status
                                                                )}
                                                </span>
                                            </div>

                                            {milestone.description && (
                                                <p
                                                    className={
                                                        darkMode
                                                            ? "mt-1 text-xs leading-5 text-slate-500"
                                                            : "mt-1 text-xs leading-5 text-slate-500"
                                                    }
                                                >
                                                    {milestone.description}
                                                </p>
                                            )}

                                            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                                                <span
                                                    className={
                                                        darkMode
                                                            ? "text-xs text-slate-400"
                                                            : "text-xs text-slate-500"
                                                    }
                                                >
                                                    Milestone:{" "}
                                                    <strong
                                                        className={
                                                            darkMode
                                                                ? "text-slate-200"
                                                                : "text-slate-700"
                                                        }
                                                    >
                                                        {formatMoney(
                                                            amount,
                                                            currency
                                                        )}
                                                    </strong>
                                                </span>
                                                <span
                                                    className={
                                                        darkMode
                                                            ? "text-xs text-slate-400"
                                                            : "text-xs text-slate-500"
                                                    }
                                                >
                                                    Paid:{" "}
                                                    <strong
                                                        className={
                                                            darkMode
                                                                ? "text-slate-200"
                                                                : "text-slate-700"
                                                        }
                                                    >
                                                        {formatMoney(
                                                            milestonePaid,
                                                            currency
                                                        )}
                                                    </strong>
                                                </span>
                                                {milestone.due_date && (
                                                    <span
                                                        className={
                                                            darkMode
                                                                ? "text-xs text-slate-500"
                                                                : "text-xs text-slate-400"
                                                        }
                                                    >
                                                        Due{" "}
                                                        {formatDate(
                                                            milestone.due_date
                                                        )}
                                                    </span>
                                                )}
                                            </div>

                                            {locked && reason && (
                                                <p
                                                    className={
                                                        darkMode
                                                            ? "mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-amber-400"
                                                            : "mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-amber-600"
                                                    }
                                                >
                                                    <LockKeyhole size={10} />
                                                    {reason}
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex shrink-0 items-center justify-between gap-4 sm:flex-col sm:items-end">
                                            <div className="text-right">
                                                <p
                                                    className={
                                                        darkMode
                                                            ? "text-[10px] font-black uppercase tracking-wider text-slate-500"
                                                            : "text-[10px] font-black uppercase tracking-wider text-slate-400"
                                                    }
                                                >
                                                    Outstanding
                                                </p>
                                                <p
                                                    className={
                                                        darkMode
                                                            ? "mt-1 text-sm font-black text-white"
                                                            : "mt-1 text-sm font-black text-slate-900"
                                                    }
                                                >
                                                    {formatMoney(
                                                        milestoneOutstanding,
                                                        currency
                                                    )}
                                                </p>
                                            </div>

                                            {payable && (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        onPay(milestone)
                                                    }
                                                    disabled={
                                                        payingMilestoneId ===
                                                        milestone.id
                                                    }
                                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-cyan-500/30 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-500/50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                                                >
                                                    {payingMilestoneId ===
                                                        milestone.id ? (
                                                        <>
                                                            <Loader2
                                                                size={14}
                                                                className="animate-spin"
                                                            />
                                                            Opening checkout...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <CreditCard
                                                                size={14}
                                                            />
                                                            Pay{" "}
                                                            {formatMoney(
                                                                milestoneOutstanding,
                                                                currency
                                                            )}
                                                        </>
                                                    )}
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {milestone.payment_required === false && (
                                        <div
                                            className={
                                                darkMode
                                                    ? "border-t border-white/[0.06] bg-white/[0.015] px-4 py-3 text-xs text-slate-500"
                                                    : "border-t border-slate-100 bg-slate-50 px-4 py-3 text-xs text-slate-500"
                                            }
                                        >
                                            No payment is required for this
                                            milestone.
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </SectionCard>

            <div
                className={
                    darkMode
                        ? "flex items-start gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 text-xs leading-6 text-slate-500"
                        : "flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs leading-6 text-slate-500"
                }
            >
                <ShieldCheck
                    size={15}
                    className="mt-0.5 shrink-0 text-cyan-400"
                />
                <p>
                    Each payment is linked to a specific project milestone. When
                    you click Pay, you will be taken to the secure payment
                    checkout. Your project workspace is updated after the
                    payment provider confirms the transaction.
                </p>
            </div>

            {confirmFullBalance && (
                <ConfirmFullBalanceModal
                    darkMode={darkMode}
                    amount={outstanding}
                    currency={currency}
                    loading={payingFullBalance}
                    onCancel={() => setConfirmFullBalance(false)}
                    onConfirm={() => {
                        setConfirmFullBalance(false);
                        onPayFullBalance();
                    }}
                />
            )}
        </div>
    );
}

function PaymentStat({
    label,
    value,
    icon: Icon,
    darkMode,
    positive = false,
    emphasis = false,
}) {
    return (
        <div
            className={`group relative overflow-hidden rounded-2xl border p-4 transition-all hover:-translate-y-0.5 ${darkMode
                    ? "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12]"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md"
                }`}
        >
            {positive && (
                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-emerald-400/10 blur-2xl" />
            )}
            {emphasis && (
                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-cyan-400/10 blur-2xl" />
            )}

            <div className="relative flex items-center justify-between gap-3">
                <span
                    className={`text-[10px] font-black uppercase tracking-wider ${darkMode ? "text-slate-500" : "text-slate-400"
                        }`}
                >
                    {label}
                </span>
                <div
                    className={`flex h-7 w-7 items-center justify-center rounded-lg ${positive
                            ? darkMode
                                ? "bg-emerald-400/10 text-emerald-400"
                                : "bg-emerald-50 text-emerald-600"
                            : emphasis
                                ? darkMode
                                    ? "bg-cyan-400/10 text-cyan-400"
                                    : "bg-cyan-50 text-cyan-600"
                                : darkMode
                                    ? "bg-white/[0.04] text-slate-400"
                                    : "bg-slate-100 text-slate-500"
                        }`}
                >
                    <Icon size={13} />
                </div>
            </div>
            <p
                className={`relative mt-2 text-lg font-black tracking-tight ${positive
                        ? "text-emerald-500"
                        : emphasis
                            ? darkMode
                                ? "text-cyan-300"
                                : "text-cyan-600"
                            : darkMode
                                ? "text-white"
                                : "text-slate-900"
                    }`}
            >
                {value}
            </p>
        </div>
    );
}


/* =========================================================
   CONFIRM FULL BALANCE MODAL
========================================================= */

function ConfirmFullBalanceModal({
    darkMode,
    amount,
    currency,
    loading,
    onCancel,
    onConfirm,
}) {
    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <button
                type="button"
                onClick={loading ? undefined : onCancel}
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                aria-label="Close confirmation"
            />

            <div
                className={`relative z-10 w-full max-w-md overflow-hidden rounded-2xl border shadow-2xl ${darkMode
                        ? "border-white/[0.08] bg-[#07101f] shadow-black/60"
                        : "border-slate-200 bg-white shadow-slate-900/20"
                    }`}
                style={{ animation: "modalIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)" }}
            >
                <div className="p-6">
                    <div className="flex items-start gap-4">
                        <div
                            className={
                                darkMode
                                    ? "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/10 text-cyan-300 ring-1 ring-cyan-500/20"
                                    : "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-50 to-indigo-50 text-cyan-600 ring-1 ring-cyan-100"
                            }
                        >
                            <CreditCard size={20} />
                        </div>
                        <div className="min-w-0">
                            <h3
                                className={
                                    darkMode
                                        ? "text-base font-black text-white"
                                        : "text-base font-black text-slate-900"
                                }
                            >
                                Pay full outstanding balance?
                            </h3>
                            <p
                                className={
                                    darkMode
                                        ? "mt-2 text-sm leading-6 text-slate-400"
                                        : "mt-2 text-sm leading-6 text-slate-500"
                                }
                            >
                                You are about to pay the entire remaining
                                balance on this proposal in a single
                                transaction.
                            </p>

                            <div
                                className={
                                    darkMode
                                        ? "mt-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3"
                                        : "mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3"
                                }
                            >
                                <p
                                    className={
                                        darkMode
                                            ? "text-[10px] font-black uppercase tracking-wider text-slate-500"
                                            : "text-[10px] font-black uppercase tracking-wider text-slate-400"
                                    }
                                >
                                    Amount due now
                                </p>
                                <p className="mt-1 bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-2xl font-black text-transparent">
                                    {formatMoney(amount, currency)}
                                </p>
                            </div>

                            <p
                                className={
                                    darkMode
                                        ? "mt-3 text-xs leading-5 text-slate-500"
                                        : "mt-3 text-xs leading-5 text-slate-500"
                                }
                            >
                                You will be redirected to the secure payment
                                checkout. All remaining milestones will be
                                cleared once payment is confirmed.
                            </p>
                        </div>
                    </div>
                </div>

                <div
                    className={`flex flex-col-reverse gap-3 border-t p-4 sm:flex-row sm:justify-end ${darkMode ? "border-white/[0.06]" : "border-slate-100"
                        }`}
                >
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                        className={`inline-flex items-center justify-center rounded-xl border px-4 py-2.5 text-sm font-bold transition-colors ${darkMode
                                ? "border-white/[0.08] text-slate-300 hover:bg-white/[0.05]"
                                : "border-slate-200 text-slate-600 hover:bg-slate-50"
                            } disabled:opacity-50`}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={loading}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/30 transition-all hover:-translate-y-0.5 hover:shadow-cyan-500/50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                    >
                        {loading ? (
                            <>
                                <Loader2 size={15} className="animate-spin" />
                                Opening checkout...
                            </>
                        ) : (
                            <>
                                <CreditCard size={15} />
                                Continue to payment
                            </>
                        )}
                    </button>
                </div>
            </div>

            <style>{`
                @keyframes modalIn {
                    from { opacity: 0; transform: translateY(-8px) scale(0.98); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
            `}</style>
        </div>
    );
}


/* =========================================================
   CLIENT PROJECT CONTENT PANEL
========================================================= */

function ClientProjectContentPanel({
    content,
    form,
    darkMode,
    saving,
    uploading,
    message,
    error,
    onFieldChange,
    onSave,
    onUpload,
    onDeleteFile,
    onPreview,
}) {
    const files = getClientContentFiles(content);
    const logoFiles = files.filter(
        (file) => getContentFileType(file) === "logo"
    );
    const imageFiles = files.filter(
        (file) => getContentFileType(file) === "image" || isContentImage(file)
    );

    return (
        <>
            <div
                className={`relative overflow-hidden rounded-2xl border p-5 sm:p-6 ${darkMode
                        ? "border-cyan-500/20 bg-gradient-to-br from-cyan-500/[0.06] to-indigo-500/[0.03]"
                        : "border-cyan-200 bg-gradient-to-br from-cyan-50 to-indigo-50/50"
                    }`}
            >
                <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl" />

                <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <div className="flex items-center gap-2.5">
                            <div
                                className={`flex h-10 w-10 items-center justify-center rounded-xl ${darkMode
                                        ? "bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-400/20"
                                        : "bg-white text-cyan-600 shadow-sm ring-1 ring-cyan-100"
                                    }`}
                            >
                                <FilePlus2 size={18} />
                            </div>
                            <h2
                                className={`text-base font-black ${darkMode ? "text-white" : "text-slate-900"
                                    }`}
                            >
                                Project Content
                            </h2>
                        </div>
                        <p
                            className={`mt-3 max-w-3xl text-sm leading-6 ${darkMode
                                    ? "text-slate-400"
                                    : "text-slate-600"
                                }`}
                        >
                            Provide the brand assets, company information,
                            content and reference files the AB Technologies team
                            needs to build your project. Everything submitted
                            here is attached to this project.
                        </p>
                    </div>

                    <span
                        className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${darkMode
                                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                                : "border-emerald-200 bg-white text-emerald-700"
                            }`}
                    >
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        {content?.status || "Draft"}
                    </span>
                </div>
            </div>

            {message && (
                <div
                    className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold ${darkMode
                            ? "border-emerald-500/20 bg-emerald-500/[0.06] text-emerald-300"
                            : "border-emerald-200 bg-emerald-50 text-emerald-700"
                        }`}
                >
                    <CheckCircle2 size={16} />
                    {message}
                </div>
            )}

            {error && (
                <div
                    className={`flex items-start gap-2 rounded-xl border px-4 py-3 text-sm font-semibold ${darkMode
                            ? "border-red-500/20 bg-red-500/[0.06] text-red-300"
                            : "border-red-200 bg-red-50 text-red-700"
                        }`}
                >
                    <AlertCircle size={16} className="mt-0.5 shrink-0" />
                    {error}
                </div>
            )}

            <div className="grid gap-6 lg:grid-cols-2">
                <SectionCard
                    title="Brand identity"
                    icon={Palette}
                    darkMode={darkMode}
                >
                    <div className="grid gap-4 sm:grid-cols-2">
                        <ContentInput
                            label="Brand / company name"
                            value={form.brand_name}
                            onChange={(value) =>
                                onFieldChange("brand_name", value)
                            }
                            darkMode={darkMode}
                            placeholder="Your company or brand name"
                        />
                        <ContentInput
                            label="Tagline"
                            value={form.tagline}
                            onChange={(value) =>
                                onFieldChange("tagline", value)
                            }
                            darkMode={darkMode}
                            placeholder="Your tagline"
                        />
                    </div>

                    <div className="mt-5">
                        <p
                            className={`mb-3 text-xs font-black uppercase tracking-wider ${darkMode ? "text-slate-400" : "text-slate-500"
                                }`}
                        >
                            Brand colours
                        </p>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <ColorInput
                                label="Primary"
                                value={form.primary_color}
                                onChange={(value) =>
                                    onFieldChange("primary_color", value)
                                }
                                darkMode={darkMode}
                            />
                            <ColorInput
                                label="Secondary"
                                value={form.secondary_color}
                                onChange={(value) =>
                                    onFieldChange("secondary_color", value)
                                }
                                darkMode={darkMode}
                            />
                            <ColorInput
                                label="Accent"
                                value={form.accent_color}
                                onChange={(value) =>
                                    onFieldChange("accent_color", value)
                                }
                                darkMode={darkMode}
                            />
                            <ColorInput
                                label="Background"
                                value={form.background_color}
                                onChange={(value) =>
                                    onFieldChange("background_color", value)
                                }
                                darkMode={darkMode}
                            />
                        </div>
                    </div>

                    <div className="mt-5">
                        <ContentInput
                            label="Font preference"
                            value={form.font_family}
                            onChange={(value) =>
                                onFieldChange("font_family", value)
                            }
                            darkMode={darkMode}
                            placeholder="e.g. Inter, Poppins, Roboto"
                        />
                    </div>
                </SectionCard>

                <SectionCard
                    title="Company information"
                    icon={FolderOpen}
                    darkMode={darkMode}
                >
                    <ContentTextarea
                        label="Company description"
                        value={form.company_description}
                        onChange={(value) =>
                            onFieldChange("company_description", value)
                        }
                        darkMode={darkMode}
                        placeholder="Tell us what the company does..."
                    />

                    <div className="mt-4">
                        <ContentTextarea
                            label="About us"
                            value={form.about_content}
                            onChange={(value) =>
                                onFieldChange("about_content", value)
                            }
                            darkMode={darkMode}
                            placeholder="The content you want on the About section..."
                        />
                    </div>

                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        <ContentTextarea label="Mission"
                            value={form.mission}
                            onChange={(value) =>
                                onFieldChange("mission", value)
                            }
                            darkMode={darkMode}
                        />
                        <ContentTextarea
                            label="Vision"
                            value={form.vision}
                            onChange={(value) =>
                                onFieldChange("vision", value)
                            }
                            darkMode={darkMode}
                        />
                    </div>
                </SectionCard>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <SectionCard
                    title="Contact information"
                    icon={MessageCircle}
                    darkMode={darkMode}
                >
                    <div className="grid gap-4 sm:grid-cols-2">
                        <ContentInput
                            label="Email"
                            value={form.email}
                            onChange={(value) =>
                                onFieldChange("email", value)
                            }
                            darkMode={darkMode}
                            type="email"
                        />
                        <ContentInput
                            label="Phone"
                            value={form.phone}
                            onChange={(value) =>
                                onFieldChange("phone", value)
                            }
                            darkMode={darkMode}
                        />
                    </div>

                    <div className="mt-4">
                        <ContentInput
                            label="Website"
                            value={form.website}
                            onChange={(value) =>
                                onFieldChange("website", value)
                            }
                            darkMode={darkMode}
                            placeholder="https://example.com"
                        />
                    </div>

                    <div className="mt-4">
                        <ContentTextarea
                            label="Address"
                            value={form.address}
                            onChange={(value) =>
                                onFieldChange("address", value)
                            }
                            darkMode={darkMode}
                            rows={3}
                        />
                    </div>

                    <div className="mt-4">
                        <ContentTextarea
                            label="Additional contact information"
                            value={form.contact_information}
                            onChange={(value) =>
                                onFieldChange("contact_information", value)
                            }
                            darkMode={darkMode}
                            placeholder="Social links, opening hours, other contact details..."
                            rows={4}
                        />
                    </div>
                </SectionCard>

                <SectionCard
                    title="Additional project information"
                    icon={FileText}
                    darkMode={darkMode}
                >
                    <ContentTextarea
                        label="Notes for the project team"
                        value={form.notes}
                        onChange={(value) => onFieldChange("notes", value)}
                        darkMode={darkMode}
                        placeholder="Anything else the AB Technologies team should know..."
                        rows={8}
                    />

                    <div
                        className={`mt-4 rounded-xl border p-4 ${darkMode
                                ? "border-white/[0.06] bg-white/[0.02]"
                                : "border-slate-200 bg-slate-50"
                            }`}
                    >
                        <div className="flex items-center gap-2">
                            <Info
                                size={13}
                                className={
                                    darkMode
                                        ? "text-cyan-400"
                                        : "text-cyan-600"
                                }
                            />
                            <p
                                className={`text-xs font-black ${darkMode
                                        ? "text-slate-300"
                                        : "text-slate-700"
                                    }`}
                            >
                                What you can provide
                            </p>
                        </div>
                        <p
                            className={`mt-1.5 text-xs leading-5 ${darkMode
                                    ? "text-slate-500"
                                    : "text-slate-500"
                                }`}
                        >
                            Logos, product images, team photos, catalogues,
                            documents, videos, brand guidelines, copy,
                            reference designs and any other material needed for
                            your project.
                        </p>
                    </div>
                </SectionCard>
            </div>

            <SectionCard
                title="Brand assets & project files"
                icon={Paperclip}
                darkMode={darkMode}
                action={
                    <label
                        className={`inline-flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-3.5 py-2 text-xs font-bold text-white shadow-md shadow-cyan-500/30 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-500/50 ${uploading ? "pointer-events-none opacity-60" : ""
                            }`}
                    >
                        {uploading ? (
                            <Loader2 size={14} className="animate-spin" />
                        ) : (
                            <Upload size={14} />
                        )}
                        {uploading ? "Uploading..." : "Upload files"}
                        <input
                            type="file"
                            multiple
                            className="hidden"
                            onChange={onUpload}
                        />
                    </label>
                }
            >
                <div
                    className={`mb-5 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition-colors ${darkMode
                            ? "border-white/[0.10] bg-white/[0.015] hover:border-cyan-500/30 hover:bg-cyan-500/[0.02]"
                            : "border-slate-300 bg-slate-50 hover:border-cyan-400/60 hover:bg-cyan-50/30"
                        }`}
                >
                    <div
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl ${darkMode
                                ? "bg-cyan-400/10 text-cyan-300"
                                : "bg-cyan-100 text-cyan-600"
                            }`}
                    >
                        <Upload size={22} />
                    </div>
                    <p
                        className={`mt-3 text-sm font-black ${darkMode ? "text-white" : "text-slate-900"
                            }`}
                    >
                        Upload everything needed to build your project
                    </p>
                    <p
                        className={`mx-auto mt-1 max-w-xl text-xs leading-5 ${darkMode
                                ? "text-slate-500"
                                : "text-slate-400"
                            }`}
                    >
                        Select multiple files at once. Add your logo, images,
                        documents, videos, brand guidelines and other reference
                        materials.
                    </p>
                </div>

                {files.length === 0 ? (
                    <EmptyInline
                        icon={Paperclip}
                        title="No project content files yet"
                        text="Upload your brand assets and project materials here."
                        darkMode={darkMode}
                    />
                ) : (
                    <div className="space-y-3">
                        {files.map((file, index) => (
                            <ClientContentFileRow
                                key={
                                    file.id ||
                                    `${getFileName(file)}-${index}`
                                }
                                file={file}
                                darkMode={darkMode}
                                onPreview={onPreview}
                                onDelete={onDeleteFile}
                            />
                        ))}
                    </div>
                )}

                {logoFiles.length > 0 && (
                    <div className="mt-6">
                        <p
                            className={`mb-3 text-xs font-black uppercase tracking-wider ${darkMode ? "text-slate-400" : "text-slate-500"
                                }`}
                        >
                            Logo assets
                        </p>
                        <div className="grid gap-3 sm:grid-cols-2">
                            {logoFiles.map((file, index) => (
                                <ClientContentPreviewCard
                                    key={
                                        file.id ||
                                        `${getFileName(file)}-${index}`
                                    }
                                    file={file}
                                    darkMode={darkMode}
                                    onPreview={onPreview}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {imageFiles.length > 0 && (
                    <div className="mt-6">
                        <p
                            className={`mb-3 text-xs font-black uppercase tracking-wider ${darkMode ? "text-slate-400" : "text-slate-500"
                                }`}
                        >
                            Image assets
                        </p>
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {imageFiles.map((file, index) => (
                                <ClientContentPreviewCard
                                    key={
                                        file.id ||
                                        `${getFileName(file)}-${index}`
                                    }
                                    file={file}
                                    darkMode={darkMode}
                                    onPreview={onPreview}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </SectionCard>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
                <span
                    className={`mr-auto text-xs ${darkMode ? "text-slate-600" : "text-slate-400"
                        }`}
                >
                    Save your information as you go. You can return and update
                    it later.
                </span>

                <button
                    type="button"
                    onClick={onSave}
                    disabled={saving}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/30 transition-all hover:-translate-y-0.5 hover:shadow-cyan-500/50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                >
                    {saving ? (
                        <Loader2 size={16} className="animate-spin" />
                    ) : (
                        <Save size={16} />
                    )}
                    {saving ? "Saving..." : "Save project content"}
                </button>
            </div>
        </>
    );
}

function ContentInput({
    label,
    value,
    onChange,
    darkMode,
    type = "text",
    placeholder = "",
}) {
    return (
        <label className="block">
            <span
                className={`mb-1.5 block text-xs font-black uppercase tracking-wider ${darkMode ? "text-slate-400" : "text-slate-500"
                    }`}
            >
                {label}
            </span>
            <input
                type={type}
                value={value || ""}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
                className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none transition ${darkMode
                        ? "border-white/[0.08] bg-white/[0.025] text-white placeholder:text-slate-600 focus:border-cyan-400/40 focus:bg-white/[0.04]"
                        : "border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-cyan-400 focus:bg-white"
                    }`}
            />
        </label>
    );
}

function ContentTextarea({
    label,
    value,
    onChange,
    darkMode,
    placeholder = "",
    rows = 5,
}) {
    return (
        <label className="block">
            <span
                className={`mb-1.5 block text-xs font-black uppercase tracking-wider ${darkMode ? "text-slate-400" : "text-slate-500"
                    }`}
            >
                {label}
            </span>
            <textarea
                value={value || ""}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
                rows={rows}
                className={`w-full resize-y rounded-xl border px-3 py-2.5 text-sm leading-6 outline-none transition ${darkMode
                        ? "border-white/[0.08] bg-white/[0.025] text-white placeholder:text-slate-600 focus:border-cyan-400/40 focus:bg-white/[0.04]"
                        : "border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-cyan-400 focus:bg-white"
                    }`}
            />
        </label>
    );
}

function ColorInput({ label, value, onChange, darkMode }) {
    const color = /^#[0-9a-fA-F]{6}$/.test(value || "") ? value : "#000000";

    return (
        <label className="block">
            <span
                className={`mb-1.5 block text-xs font-black uppercase tracking-wider ${darkMode ? "text-slate-400" : "text-slate-500"
                    }`}
            >
                {label}
            </span>
            <div className="flex gap-2">
                <input
                    type="color"
                    value={color}
                    onChange={(event) =>
                        onChange(event.target.value.toUpperCase())
                    }
                    className={`h-10 w-12 cursor-pointer rounded-lg border p-0.5 ${darkMode
                            ? "border-white/[0.08] bg-white/[0.025]"
                            : "border-slate-200 bg-white"
                        }`}
                />
                <input
                    type="text"
                    value={value || ""}
                    onChange={(event) => onChange(event.target.value)}
                    placeholder="#FFFFFF"
                    className={`min-w-0 flex-1 rounded-xl border px-3 py-2.5 font-mono text-xs uppercase outline-none transition ${darkMode
                            ? "border-white/[0.08] bg-white/[0.025] text-white placeholder:text-slate-600 focus:border-cyan-400/40"
                            : "border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-cyan-400"
                        }`}
                />
            </div>
        </label>
    );
}

function ClientContentFileRow({ file, darkMode, onPreview, onDelete }) {
    const url = getFileUrl(file);
    const image = isContentImage(file);

    return (
        <div
            className={`group flex flex-col gap-3 rounded-xl border p-3 transition-all hover:-translate-y-0.5 sm:flex-row sm:items-center ${darkMode
                    ? "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12]"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                }`}
        >
            {image && url ? (
                <button
                    type="button"
                    onClick={() => onPreview(file)}
                    className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-900 ring-1 ring-white/[0.06] transition-transform group-hover:scale-105"
                >
                    <img
                        src={url}
                        alt={getFileName(file)}
                        className="h-full w-full object-cover"
                    />
                </button>
            ) : (
                <div
                    className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-lg ${darkMode ? "bg-white/[0.04]" : "bg-slate-100"
                        }`}
                >
                    {getContentFileType(file).includes("pdf") ? (
                        <FileText size={25} className="text-red-400" />
                    ) : (
                        <File size={25} className="text-slate-400" />
                    )}
                </div>
            )}

            <div className="min-w-0 flex-1">
                <p
                    className={`truncate text-sm font-bold ${darkMode ? "text-white" : "text-slate-900"
                        }`}
                >
                    {getFileName(file)}
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                    <span
                        className={`rounded-full border px-2 py-0.5 text-[9px] font-black uppercase tracking-wider ${darkMode
                                ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-300"
                                : "border-cyan-200 bg-cyan-50 text-cyan-700"
                            }`}
                    >
                        {getContentFileLabel(file)}
                    </span>
                    {file?.uploaded_at && (
                        <span
                            className={`text-[10px] ${darkMode
                                    ? "text-slate-600"
                                    : "text-slate-400"
                                }`}
                        >
                            {formatDate(file.uploaded_at)}
                        </span>
                    )}
                </div>
            </div>

            <div className="flex shrink-0 items-center gap-1">
                {url && (
                    <a
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        download
                        className={`rounded-lg p-2 transition-colors ${darkMode
                                ? "text-slate-400 hover:bg-white/[0.05] hover:text-white"
                                : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                            }`}
                        title="Download"
                    >
                        <Download size={14} />
                    </a>
                )}
                <button
                    type="button"
                    onClick={() => onDelete(file)}
                    className={`rounded-lg p-2 transition-colors ${darkMode
                            ? "text-red-400 hover:bg-red-500/10"
                            : "text-red-500 hover:bg-red-50"
                        }`}
                    title="Remove file"
                >
                    <Trash2 size={14} />
                </button>
            </div>
        </div>
    );
}

function ClientContentPreviewCard({ file, darkMode, onPreview }) {
    const url = getFileUrl(file);
    if (!url) return null;

    return (
        <button
            type="button"
            onClick={() => onPreview(file)}
            className={`group overflow-hidden rounded-xl border text-left transition-all hover:-translate-y-0.5 ${darkMode
                    ? "border-white/[0.07] bg-white/[0.025] hover:border-white/[0.14]"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md"
                }`}
        >
            {isContentImage(file) ? (
                <div className="aspect-video overflow-hidden bg-slate-900">
                    <img
                        src={url}
                        alt={getFileName(file)}
                        className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                </div>
            ) : (
                <div className="flex aspect-video items-center justify-center bg-slate-900">
                    <FileText size={34} className="text-slate-400" />
                </div>
            )}
            <div className="p-3">
                <p
                    className={`truncate text-xs font-bold ${darkMode ? "text-white" : "text-slate-900"
                        }`}
                >
                    {getFileName(file)}
                </p>
            </div>
        </button>
    );
}


/* =========================================================
   SHARED UI
========================================================= */

function PageShell({ children, darkMode }) {
    return (
        <div
            className={`min-h-screen ${darkMode ? "bg-[#020611] text-white" : "bg-slate-50 text-slate-900"
                }`}
        >
            {children}
        </div>
    );
}

function StatusBadge({ status, darkMode }) {
    const theme = statusTheme(status, darkMode);
    const n = normalizeStatus(status);
    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${theme.chip}`}
        >
            {n === "COMPLETED" ? (
                <CheckCircle2 size={11} />
            ) : (
                <span className={`h-1.5 w-1.5 rounded-full ${theme.dot}`} />
            )}
            {getStatusLabel(status)}
        </span>
    );
}

function HeroStat({ icon: Icon, label, value, sublabel, darkMode }) {
    return (
        <div
            className={`group relative overflow-hidden rounded-xl border px-4 py-3 transition-all hover:-translate-y-0.5 ${darkMode
                    ? "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12]"
                    : "border-slate-200 bg-white/70 backdrop-blur hover:border-slate-300 hover:shadow-sm"
                }`}
        >
            <div
                className={`pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full opacity-0 blur-2xl transition-opacity group-hover:opacity-100 ${darkMode ? "bg-cyan-400/20" : "bg-cyan-200"
                    }`}
            />
            <div className="relative flex items-center gap-2">
                <Icon
                    size={13}
                    className={darkMode ? "text-cyan-400" : "text-cyan-600"}
                />
                <span
                    className={`text-[10px] font-black uppercase tracking-wider ${darkMode ? "text-slate-500" : "text-slate-400"
                        }`}
                >
                    {label}
                </span>
            </div>
            <div className="relative mt-1.5 flex items-baseline gap-1.5">
                <p
                    className={`text-xl font-black ${darkMode ? "text-white" : "text-slate-900"
                        }`}
                >
                    {value}
                </p>
                {sublabel && (
                    <span
                        className={`text-[10px] font-bold ${darkMode ? "text-slate-600" : "text-slate-400"
                            }`}
                    >
                        {sublabel}
                    </span>
                )}
            </div>
        </div>
    );
}

function SectionCard({
    title,
    icon: Icon,
    action,
    children,
    darkMode,
    className = "",
}) {
    return (
        <section
            className={`rounded-2xl border p-5 sm:p-6 ${darkMode
                    ? "border-white/[0.07] bg-white/[0.025]"
                    : "border-slate-200 bg-white shadow-sm"
                } ${className}`}
        >
            <div className="mb-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
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
                {action}
            </div>
            {children}
        </section>
    );
}

function ProjectInformation({ project, darkMode }) {
    const sections = [
        { title: "Scope", items: normalizeArray(project?.scope), icon: Target },
        {
            title: "Deliverables",
            items: normalizeArray(project?.deliverables),
            icon: Layers,
        },
        {
            title: "Features",
            items: normalizeArray(project?.features),
            icon: Sparkles,
        },
        {
            title: "Integrations",
            items: normalizeArray(project?.integrations),
            icon: Zap,
        },
    ];

    const visible = sections.filter((section) => section.items.length > 0);
    if (!visible.length) return null;

    return (
        <div className="grid gap-6 sm:grid-cols-2">
            {visible.map((section) => (
                <SectionCard
                    key={section.title}
                    title={section.title}
                    icon={section.icon}
                    darkMode={darkMode}
                >
                    <ul className="space-y-3">
                        {section.items.map((item, index) => (
                            <li
                                key={index}
                                className="flex items-start gap-2.5"
                            >
                                <span className="mt-1.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-cyan-500/15">
                                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                                </span>
                                <span
                                    className={`text-sm leading-6 ${darkMode
                                            ? "text-slate-400"
                                            : "text-slate-600"
                                        }`}
                                >
                                    {typeof item === "string"
                                        ? item
                                        : item?.name ||
                                        item?.title ||
                                        item?.description ||
                                        JSON.stringify(item)}
                                </span>
                            </li>
                        ))}
                    </ul>
                </SectionCard>
            ))}
        </div>
    );
}

function DetailRow({ label, value, darkMode }) {
    return (
        <div className="flex items-center justify-between gap-4">
            <span
                className={`text-xs font-bold uppercase tracking-wider ${darkMode ? "text-slate-500" : "text-slate-400"
                    }`}
            >
                {label}
            </span>
            <span
                className={`text-right text-sm font-bold ${darkMode ? "text-slate-200" : "text-slate-700"
                    }`}
            >
                {value}
            </span>
        </div>
    );
}

function ProgressRow({ label, value, total, tone = "cyan", darkMode }) {
    const pct = total > 0 ? Math.round((value / total) * 100) : 0;

    const tones = {
        emerald: {
            bar: "bg-gradient-to-r from-emerald-500 to-teal-500",
            text: "text-emerald-500",
        },
        cyan: {
            bar: "bg-gradient-to-r from-cyan-500 to-indigo-500",
            text: "text-cyan-500",
        },
        slate: {
            bar: darkMode ? "bg-slate-600" : "bg-slate-300",
            text: darkMode ? "text-slate-400" : "text-slate-500",
        },
    };

    const t = tones[tone] || tones.cyan;

    return (
        <div>
            <div className="mb-1.5 flex items-center justify-between">
                <span
                    className={`text-[11px] font-bold uppercase tracking-wider ${darkMode ? "text-slate-500" : "text-slate-400"
                        }`}
                >
                    {label}
                </span>
                <span className={`text-xs font-black ${t.text}`}>
                    {value}
                    {total > 0 && (
                        <span
                            className={
                                darkMode ? "text-slate-600" : "text-slate-400"
                            }
                        >
                            /{total}
                        </span>
                    )}
                </span>
            </div>
            <div
                className={`h-1.5 overflow-hidden rounded-full ${darkMode ? "bg-white/[0.06]" : "bg-slate-100"
                    }`}
            >
                <div
                    className={`h-full rounded-full transition-all duration-700 ${t.bar}`}
                    style={{ width: `${pct}%` }}
                />
            </div>
        </div>
    );
}

function EmptyInline({ icon: Icon, title, text, darkMode }) {
    return (
        <div className="py-10 text-center">
            {Icon && (
                <div
                    className={`mx-auto flex h-12 w-12 items-center justify-center rounded-2xl ${darkMode
                            ? "bg-white/[0.04] text-slate-500"
                            : "bg-slate-100 text-slate-400"
                        }`}
                >
                    <Icon size={22} />
                </div>
            )}
            <p
                className={`mt-3 text-sm font-black ${darkMode ? "text-slate-300" : "text-slate-700"
                    }`}
            >
                {title}
            </p>
            <p
                className={`mx-auto mt-1 max-w-md text-xs leading-5 ${darkMode ? "text-slate-500" : "text-slate-400"
                    }`}
            >
                {text}
            </p>
        </div>
    );
}

function CommentItem({ comment, darkMode }) {
    const isAdmin = String(comment?.author_type).toLowerCase() === "admin";
    const authorName = isAdmin
        ? "AB Technologies"
        : comment?.author_name || "You";

    return (
        <div className="flex items-start gap-3">
            <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[10px] font-black ${isAdmin
                        ? darkMode
                            ? "bg-gradient-to-br from-cyan-500/20 to-indigo-500/10 text-cyan-300 ring-1 ring-cyan-500/20"
                            : "bg-gradient-to-br from-cyan-100 to-indigo-100 text-cyan-700 ring-1 ring-cyan-200"
                        : darkMode
                            ? "bg-white/[0.06] text-slate-300 ring-1 ring-white/[0.06]"
                            : "bg-slate-100 text-slate-600 ring-1 ring-slate-200"
                    }`}
            >
                {isAdmin ? "AB" : "YOU"}
            </div>

            <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                    <span
                        className={`text-xs font-black ${darkMode ? "text-slate-200" : "text-slate-700"
                            }`}
                    >
                        {authorName}
                    </span>
                    {isAdmin && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-cyan-400">
                            <ShieldCheck size={9} />
                            Team
                        </span>
                    )}
                    <span
                        className={`text-[10px] ${darkMode ? "text-slate-600" : "text-slate-400"
                            }`}
                    >
                        {timeAgo(comment?.created_at)}
                    </span>
                </div>

                <div
                    className={`mt-2 rounded-2xl rounded-tl-md px-4 py-3 ${darkMode
                            ? "bg-white/[0.04] text-slate-300"
                            : "bg-slate-50 text-slate-700"
                        }`}
                >
                    <p className="whitespace-pre-wrap text-sm leading-6">
                        {comment?.message || ""}
                    </p>
                </div>
            </div>
        </div>
    );
}

function MilestoneDiscussionPreview({
    milestoneId,
    milestone,
    comments,
    darkMode,
}) {
    return (
        <div>
            <div
                className={`mb-5 rounded-xl border p-4 ${darkMode
                        ? "border-white/[0.06] bg-white/[0.02]"
                        : "border-slate-200 bg-slate-50"
                    }`}
            >
                <p
                    className={`text-[10px] font-black uppercase tracking-wider ${darkMode ? "text-slate-600" : "text-slate-400"
                        }`}
                >
                    Milestone
                </p>
                <p
                    className={`mt-1 text-sm font-bold ${darkMode ? "text-white" : "text-slate-900"
                        }`}
                >
                    {milestone?.title ||
                        milestone?.name ||
                        `Milestone ${milestoneId}`}
                </p>
                {milestone?.description && (
                    <p
                        className={`mt-2 text-xs leading-5 ${darkMode ? "text-slate-500" : "text-slate-500"
                            }`}
                    >
                        {milestone.description}
                    </p>
                )}
            </div>

            {comments.length === 0 ? (
                <EmptyInline
                    icon={MessageCircle}
                    title="No comments on this milestone yet"
                    text="Use the message box to start the discussion."
                    darkMode={darkMode}
                />
            ) : (
                <div className="space-y-6">
                    {comments.map((item) => (
                        <CommentItem
                            key={
                                item.id || `${item.created_at}-${item.message}`
                            }
                            comment={item}
                            darkMode={darkMode}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

function UpdateItem({ update, darkMode, onPreview }) {
    const files = getUpdateFiles(update);
    const updateType = getUpdateType(update);
    const Icon =
        updateType === "screenshot"
            ? ImageIcon
            : updateType === "video"
                ? Video
                : updateType === "file"
                    ? Paperclip
                    : Clock3;

    return (
        <article className="relative">
            <div className="flex items-start gap-3">
                <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1 ${darkMode
                            ? "bg-cyan-500/10 text-cyan-300 ring-cyan-500/20"
                            : "bg-cyan-50 text-cyan-600 ring-cyan-100"
                        }`}
                >
                    <Icon size={17} />
                </div>

                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                        <h3
                            className={`text-sm font-black ${darkMode ? "text-white" : "text-slate-900"
                                }`}
                        >
                            {update?.title || "Project update"}
                        </h3>

                        {updateType !== "note" && (
                            <span
                                className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-black uppercase tracking-wider ${darkMode
                                        ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-300"
                                        : "border-cyan-200 bg-cyan-50 text-cyan-700"
                                    }`}
                            >
                                {updateType}
                            </span>
                        )}

                        <span
                            className={`text-[10px] ${darkMode ? "text-slate-600" : "text-slate-400"
                                }`}
                        >
                            {timeAgo(update?.created_at)}
                        </span>
                    </div>

                    {update?.description && (
                        <p
                            className={`mt-2 text-sm leading-6 ${darkMode
                                    ? "text-slate-400"
                                    : "text-slate-600"
                                }`}
                        >
                            {update.description}
                        </p>
                    )}

                    {update?.milestone_id && (
                        <span
                            className={`mt-3 inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-bold ${darkMode
                                    ? "border-white/[0.06] bg-white/[0.04] text-slate-500"
                                    : "border-slate-200 bg-slate-100 text-slate-500"
                                }`}
                        >
                            <Milestone size={10} />
                            Milestone #{update.milestone_id}
                        </span>
                    )}

                    {files.length > 0 && (
                        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {files.map((file, index) => (
                                <FileCard
                                    key={
                                        file.id ||
                                        `${getFileName(file)}-${index}`
                                    }
                                    file={file}
                                    darkMode={darkMode}
                                    onPreview={onPreview}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
}

function FileCard({ file, darkMode, onPreview }) {
    const image = isImage(file);
    const video = isVideo(file);
    const pdf = isPdf(file);
    const url = getFileUrl(file);

    return (
        <div
            className={`group overflow-hidden rounded-xl border transition-all hover:-translate-y-0.5 ${darkMode
                    ? "border-white/[0.07] bg-white/[0.025] hover:border-white/[0.14]"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md"
                }`}
        >
            {image && url ? (
                <button
                    type="button"
                    onClick={() => onPreview(file)}
                    className="block w-full"
                >
                    <div className="aspect-video overflow-hidden bg-slate-900">
                        <img
                            src={url}
                            alt={getFileName(file)}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                </button>
            ) : video && url ? (
                <button
                    type="button"
                    onClick={() => onPreview(file)}
                    className={`flex aspect-video w-full items-center justify-center ${darkMode ? "bg-white/[0.03]" : "bg-slate-50"
                        }`}
                >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/30 transition-transform group-hover:scale-110">
                        <Play size={19} fill="currentColor" />
                    </div>
                </button>
            ) : (
                <div
                    className={`flex aspect-video items-center justify-center ${darkMode ? "bg-white/[0.02]" : "bg-slate-50"
                        }`}
                >
                    {pdf ? (
                        <FileText size={34} className="text-red-400" />
                    ) : (
                        <File size={34} className="text-slate-400" />
                    )}
                </div>
            )}

            <div className="p-3">
                <div className="flex items-center gap-2">
                    {image ? (
                        <ImageIcon size={13} className="shrink-0 text-cyan-400" />
                    ) : video ? (
                        <Video size={13} className="shrink-0 text-purple-400" />
                    ) : pdf ? (
                        <FileText size={13} className="shrink-0 text-red-400" />
                    ) : (
                        <File size={13} className="shrink-0 text-slate-400" />
                    )}
                    <p
                        className={`min-w-0 flex-1 truncate text-xs font-bold ${darkMode ? "text-slate-200" : "text-slate-700"
                            }`}
                    >
                        {getFileName(file)}
                    </p>
                </div>

                {url && (
                    <div className="mt-3 flex items-center justify-between gap-3">
                        {image || video ? (
                            <button
                                type="button"
                                onClick={() => onPreview(file)}
                                className={`inline-flex items-center gap-1 text-[11px] font-black ${darkMode
                                        ? "text-cyan-300 hover:text-cyan-200"
                                        : "text-cyan-600 hover:text-cyan-700"
                                    }`}
                            >
                                <ExternalLink size={11} />
                                Preview
                            </button>
                        ) : (
                            <span
                                className={`text-[10px] font-black uppercase tracking-wider ${darkMode
                                        ? "text-slate-600"
                                        : "text-slate-400"
                                    }`}
                            >
                                {getFileExtension(file).toUpperCase() ||
                                    "FILE"}
                            </span>
                        )}
                        <a
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                            download
                            className={`inline-flex items-center gap-1 text-[11px] font-black ${darkMode
                                    ? "text-slate-400 hover:text-white"
                                    : "text-slate-500 hover:text-slate-900"
                                }`}
                        >
                            <Download size={12} />
                            Download
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}

function FilePreviewModal({ file, darkMode, onClose }) {
    const url = getFileUrl(file);
    if (!url) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <button
                type="button"
                onClick={onClose}
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                aria-label="Close preview"
            />

            <div
                className={`relative z-10 max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-2xl border shadow-2xl ${darkMode
                        ? "border-white/[0.08] bg-[#07101f] shadow-black/60"
                        : "border-slate-200 bg-white shadow-slate-900/20"
                    }`}
                style={{
                    animation: "modalIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
            >
                <div
                    className={`flex items-center justify-between gap-4 border-b px-5 py-4 ${darkMode ? "border-white/[0.07]" : "border-slate-100"
                        }`}
                >
                    <p
                        className={`truncate text-sm font-bold ${darkMode ? "text-white" : "text-slate-900"
                            }`}
                    >
                        {getFileName(file)}
                    </p>

                    <div className="flex shrink-0 items-center gap-2">
                        <a
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                            download
                            className={`rounded-lg p-2 transition-colors ${darkMode
                                    ? "text-slate-400 hover:bg-white/10 hover:text-white"
                                    : "text-slate-500 hover:bg-slate-100"
                                }`}
                        >
                            <Download size={17} />
                        </a>
                        <button
                            type="button"
                            onClick={onClose}
                            className={`rounded-lg p-2 transition-colors ${darkMode
                                    ? "text-slate-400 hover:bg-white/10 hover:text-white"
                                    : "text-slate-500 hover:bg-slate-100"
                                }`}
                        >
                            <X size={18} />
                        </button>
                    </div>
                </div>

                <div className="max-h-[calc(92vh-70px)] overflow-auto p-4 sm:p-6">
                    {isImage(file) && (
                        <img
                            src={url}
                            alt={getFileName(file)}
                            className="mx-auto max-h-[78vh] max-w-full rounded-xl object-contain"
                        />
                    )}

                    {isVideo(file) && (
                        <video
                            src={url}
                            controls
                            autoPlay
                            className="mx-auto max-h-[78vh] max-w-full rounded-xl bg-black"
                        />
                    )}

                    {!isImage(file) && !isVideo(file) && (
                        <div className="py-16 text-center">
                            {isPdf(file) ? (
                                <FileText
                                    size={48}
                                    className="mx-auto text-red-400"
                                />
                            ) : (
                                <File
                                    size={48}
                                    className="mx-auto text-slate-400"
                                />
                            )}
                            <p
                                className={`mt-4 text-sm font-bold ${darkMode ? "text-white" : "text-slate-900"
                                    }`}
                            >
                                Preview is not available for this file type.
                            </p>
                            <a
                                href={url}
                                target="_blank"
                                rel="noreferrer"
                                download
                                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/30 transition-all hover:-translate-y-0.5 hover:shadow-cyan-500/50"
                            >
                                <Download size={15} />
                                Download file
                            </a>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                @keyframes modalIn {
                    from { opacity: 0; transform: translateY(-8px) scale(0.98); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
            `}</style>
        </div>
    );
}

function WorkspaceSkeleton({ darkMode }) {
    const block = (h) => (
        <div
            className={`animate-pulse rounded-2xl ${darkMode ? "bg-white/[0.03]" : "bg-slate-200/70"
                } ${h}`}
        />
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                {block("h-8 w-40")}
                {block("h-9 w-40")}
            </div>
            {block("h-64")}
            <div className="grid gap-6 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
                    {block("h-40")}
                    {block("h-56")}
                </div>
                <div className="space-y-6">
                    {block("h-56")}
                    {block("h-40")}
                </div>
            </div>
        </div>
    );
}