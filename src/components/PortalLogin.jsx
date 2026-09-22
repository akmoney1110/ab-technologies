import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    ArrowRight,
    Eye,
    EyeOff,
    Lock,
    Mail,
    ShieldCheck,
} from "lucide-react";

const API_URL =
    import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export default function PortalLogin({ darkMode }) {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await fetch(
                `${API_URL}/api/auth/login/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(form),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data?.detail ||
                    data?.non_field_errors?.[0] ||
                    data?.message ||
                    "Invalid email or password."
                );
            }

            localStorage.setItem("access_token", data.access);
            localStorage.setItem("refresh_token", data.refresh);
            localStorage.setItem(
                "ab_user",
                JSON.stringify(data.user)
            );

            navigate("/portal/dashboard");
        } catch (err) {
            setError(
                err.message || "Unable to sign in. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className={`
                min-h-screen
                relative
                overflow-hidden
                flex
                items-center
                justify-center
                px-4
                py-16
                ${darkMode
                    ? "bg-slate-950 text-white"
                    : "bg-slate-50 text-slate-900"
                }
            `}
        >
            {/* Background effects */}
            <div
                className={`
                    absolute
                    -top-40
                    -right-40
                    w-96
                    h-96
                    rounded-full
                    blur-3xl
                    ${darkMode
                        ? "bg-sky-500/10"
                        : "bg-sky-400/20"
                    }
                `}
            />

            <div
                className={`
                    absolute
                    -bottom-40
                    -left-40
                    w-96
                    h-96
                    rounded-full
                    blur-3xl
                    ${darkMode
                        ? "bg-blue-500/10"
                        : "bg-blue-400/20"
                    }
                `}
            />

            <div className="relative z-10 w-full max-w-md">

                {/* Back */}
                <Link
                    to="/"
                    className={`
                        inline-flex
                        items-center
                        gap-2
                        mb-8
                        text-sm
                        transition-colors
                        ${darkMode
                            ? "text-slate-400 hover:text-sky-400"
                            : "text-slate-500 hover:text-sky-600"
                        }
                    `}
                >
                    <ArrowLeft size={15} />
                    Back to website
                </Link>

                {/* Card */}
                <div
                    className={`
                        rounded-2xl
                        border
                        p-7
                        sm:p-9
                        shadow-2xl
                        ${darkMode
                            ? "bg-slate-900/80 border-slate-800 shadow-black/30"
                            : "bg-white/90 border-slate-200 shadow-slate-200/60"
                        }
                    `}
                >

                    {/* Logo / Icon */}
                    <div className="flex justify-center mb-6">
                        <div
                            className={`
                                w-14
                                h-14
                                rounded-2xl
                                flex
                                items-center
                                justify-center
                                ${darkMode
                                    ? "bg-sky-500/10 text-sky-400"
                                    : "bg-sky-50 text-sky-600"
                                }
                            `}
                        >
                            <ShieldCheck size={28} />
                        </div>
                    </div>

                    {/* Heading */}
                    <div className="text-center mb-8">
                        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                            Client Portal
                        </h1>

                        <p
                            className={`
                                mt-2
                                text-sm
                                ${darkMode
                                    ? "text-slate-400"
                                    : "text-slate-500"
                                }
                            `}
                        >
                            Sign in to access your AB Technologies
                            account.
                        </p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div
                            className="
                                mb-5
                                rounded-lg
                                border
                                border-red-500/20
                                bg-red-500/10
                                px-4
                                py-3
                                text-sm
                                text-red-500
                            "
                        >
                            {error}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className={`
                                    block
                                    mb-2
                                    text-sm
                                    font-medium
                                    ${darkMode
                                        ? "text-slate-300"
                                        : "text-slate-700"
                                    }
                                `}
                            >
                                Email address
                            </label>

                            <div className="relative">
                                <Mail
                                    size={18}
                                    className={`
                                        absolute
                                        left-3.5
                                        top-1/2
                                        -translate-y-1/2
                                        ${darkMode
                                            ? "text-slate-500"
                                            : "text-slate-400"
                                        }
                                    `}
                                />

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="you@company.com"
                                    autoComplete="email"
                                    required
                                    className={`
                                        w-full
                                        rounded-xl
                                        border
                                        py-3
                                        pl-11
                                        pr-4
                                        text-sm
                                        outline-none
                                        transition
                                        ${darkMode
                                            ? "bg-slate-950 border-slate-700 text-white placeholder:text-slate-600 focus:border-sky-500"
                                            : "bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-sky-500"
                                        }
                                    `}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label
                                    htmlFor="password"
                                    className={`
                                        text-sm
                                        font-medium
                                        ${darkMode
                                            ? "text-slate-300"
                                            : "text-slate-700"
                                        }
                                    `}
                                >
                                    Password
                                </label>

                                <button
                                    type="button"
                                    className="text-xs text-sky-500 hover:text-sky-400"
                                    onClick={() => {
                                        // We'll implement this later.
                                    }}
                                >
                                    Forgot password?
                                </button>
                            </div>

                            <div className="relative">
                                <Lock
                                    size={18}
                                    className={`
                                        absolute
                                        left-3.5
                                        top-1/2
                                        -translate-y-1/2
                                        ${darkMode
                                            ? "text-slate-500"
                                            : "text-slate-400"
                                        }
                                    `}
                                />

                                <input
                                    id="password"
                                    name="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    required
                                    className={`
                                        w-full
                                        rounded-xl
                                        border
                                        py-3
                                        pl-11
                                        pr-12
                                        text-sm
                                        outline-none
                                        transition
                                        ${darkMode
                                            ? "bg-slate-950 border-slate-700 text-white placeholder:text-slate-600 focus:border-sky-500"
                                            : "bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-sky-500"
                                        }
                                    `}
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className={`
                                        absolute
                                        right-3.5
                                        top-1/2
                                        -translate-y-1/2
                                        ${darkMode
                                            ? "text-slate-500 hover:text-slate-300"
                                            : "text-slate-400 hover:text-slate-600"
                                        }
                                    `}
                                >
                                    {showPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="
                                w-full
                                flex
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                bg-sky-500
                                hover:bg-sky-400
                                disabled:opacity-60
                                disabled:cursor-not-allowed
                                px-4
                                py-3
                                text-sm
                                font-semibold
                                text-white
                                transition
                            "
                        >
                            {loading
                                ? "Signing in..."
                                : "Sign in"}

                            {!loading && (
                                <ArrowRight size={16} />
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div
                        className={`
                            mt-8
                            pt-6
                            border-t
                            text-center
                            text-xs
                            ${darkMode
                                ? "border-slate-800 text-slate-500"
                                : "border-slate-200 text-slate-500"
                            }
                        `}
                    >
                        <p>
                            Client accounts are created by
                            AB Technologies.
                        </p>
                    </div>
                </div>

                {/* Security note */}
                <div
                    className={`
                        flex
                        items-center
                        justify-center
                        gap-2
                        mt-5
                        text-xs
                        ${darkMode
                            ? "text-slate-600"
                            : "text-slate-400"
                        }
                    `}
                >
                    <Lock size={12} />
                    Secure access to your client portal
                </div>
            </div>
        </div>
    );
}