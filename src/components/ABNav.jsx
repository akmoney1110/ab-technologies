import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { queueSupportRequest } from "./AI";

import {
    Menu,
    X,
    ChevronDown,
    ArrowRight,
    Headphones,
    Mail,
    ShieldCheck,
    Cpu,
    Package,
    Code2,
    GraduationCap,
    Building2,
    BookOpen,
    Workflow,
    Users,
    Server,
    Globe,
    Settings,
    Sparkles,
    Lightbulb,
    FileText,
    HelpCircle,
    Newspaper,
    MessageCircle,
    UsersRound,
    Target,
    Handshake,
    Sun,
    Moon,
} from "lucide-react";

export default function Navbar() {
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileExpanded, setMobileExpanded] = useState(null);

    const startSupportChat = (message, metadata = {}) => {
        queueSupportRequest({
            message:
                message ||
                "I'd like to discuss a technology requirement with AB TECHNOLOGIES.",
            metadata: {
                Source: "Navbar",
                ...metadata,
            },
        });

        setMobileMenuOpen(false);
        setMobileExpanded(null);
        navigate("/support/ai");
    };

    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window === "undefined") return true;

        const savedTheme = localStorage.getItem("ab-theme");

        if (savedTheme === "light") return false;
        if (savedTheme === "dark") return true;

        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    /* -------------------------------------------------------
       THEME
    ------------------------------------------------------- */

    useEffect(() => {
        const root = document.documentElement;

        if (darkMode) {
            root.classList.add("dark");
            localStorage.setItem("ab-theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("ab-theme", "light");
        }
    }, [darkMode]);

    const toggleTheme = () => {
        setDarkMode((previous) => !previous);
    };

    /* -------------------------------------------------------
       MOBILE MENU
    ------------------------------------------------------- */

    const closeMobile = () => {
        setMobileMenuOpen(false);
        setMobileExpanded(null);
    };

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape") {
                setMobileMenuOpen(false);
                setMobileExpanded(null);
            }
        };

        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileMenuOpen]);

    const toggleMobileSection = (section) => {
        setMobileExpanded((previous) => (previous === section ? null : section));
    };

    /* -------------------------------------------------------
       MOBILE NAV DATA
    ------------------------------------------------------- */

    const mobileNavSections = [
        {
            id: "services",
            title: "Services",
            route: "/services",
            color: "text-sky-500",
            items: [
                { icon: Cpu, title: "Hardware & Device Procurement", desc: "Laptops, desktops, workstations, servers, Apple, HP, Dell, Lenovo, printers, monitors, accessories and more.", href: "/services/hardware-procurement" },
                { icon: Package, title: "Corporate & Bulk Procurement", desc: "Large-scale technology sourcing for companies, institutions, schools, NGOs and organizations.", href: "/services/corporate-procurement" },
                { icon: Globe, title: "Networking & IT Infrastructure", desc: "Networks, Wi-Fi, cabling, routers, switches, servers, VPNs, firewalls and infrastructure.", href: "/services/networking" },
                { icon: Server, title: "Cloud, Hosting & Managed IT", desc: "VPS, cloud, hosting, domains, business email, backups, Microsoft 365 and ongoing IT support.", href: "/services/cloud-managed-it" },
                { icon: Code2, title: "Software & Digital Solutions", desc: "Websites, web applications, mobile apps, SaaS, ERP, CRM, dashboards, APIs and custom systems.", href: "/services/software-solutions" },
                { icon: Sparkles, title: "AI, Automation & Digital Transformation", desc: "AI applications, chatbots, workflow automation, RPA, intelligent data systems and AI integration.", href: "/services/ai-automation" },
                { icon: ShieldCheck, title: "Security & Communications", desc: "CCTV, access control, biometrics, cybersecurity, VoIP, video conferencing and communications.", href: "/services/security-communications" },
                { icon: Settings, title: "Complete IT Deployment & Support", desc: "Consulting, installation, configuration, training, maintenance and complete IT setup.", href: "/services/it-deployment-support" },
            ],
        },
        {
            id: "procurement",
            title: "Procurement",
            route: "/procurement",
            color: "text-blue-500",
            items: [
                { icon: Package, title: "Bulk & Corporate Procurement", desc: "Large-volume procurement for companies, institutions, schools, NGOs and government organizations.", href: "services/corporate-procurement/" },
                { icon: Cpu, title: "Hardware Sourcing", desc: "Laptops, desktops, servers, workstations, monitors, printers, networking equipment and accessories.", href: "/procurement/hardware" },
                { icon: Building2, title: "Institutional Procurement", desc: "Technology supply for schools, universities, healthcare organizations, NGOs and public institutions.", href: "/procurement/institutional" },
                { icon: Globe, title: "International Sourcing", desc: "Source technology through appropriate international channels when local availability is limited.", href: "/procurement/international" },
                { icon: Users, title: "Supplier & Vendor Sourcing", desc: "Identify suitable suppliers and procurement channels for your specific requirements.", href: "/procurement/suppliers" },
                { icon: BookOpen, title: "Competitive Quotations", desc: "Compare available options and build procurement proposals around your requirements and budget.", href: "/procurement/quotations" },
                { icon: ShieldCheck, title: "Product Verification", desc: "Verify specifications, product details, serial information and applicable warranty arrangements.", href: "/procurement/verification" },
                { icon: Package, title: "Logistics & Delivery", desc: "Coordinate procurement logistics and delivery according to the project requirements.", href: "/procurement/logistics" },
            ],
        },
        {
            id: "solutions",
            title: "Solutions",
            route: "/solutions",
            color: "text-purple-500",
            items: [
                { icon: Code2, title: "Software & Applications", desc: "Custom websites, web applications, mobile apps, SaaS platforms and business systems.", href: "/solutions/software" },
                { icon: Workflow, title: "Business Management Systems", desc: "ERP, CRM, accounting, inventory, HR, workforce, dashboards and operational systems.", href: "/solutions/business-systems" },
                { icon: Server, title: "Cloud & Digital Infrastructure", desc: "Cloud infrastructure, VPS, hosting, email, backups, servers and scalable digital environments.", href: "/solutions/cloud-infrastructure" },
                { icon: Settings, title: "Automation & Integration", desc: "Connect systems, automate workflows and eliminate repetitive manual processes.", href: "/solutions/automation" },
                { icon: Sparkles, title: "AI & Intelligent Solutions", desc: "AI applications, chatbots, intelligent data processing, predictive systems and AI integrations.", href: "/solutions/ai" },
                { icon: ShieldCheck, title: "Security Solutions", desc: "Cybersecurity, CCTV, access control, biometrics, firewalls and security monitoring.", href: "/solutions/security" },
                { icon: Mail, title: "Business Communications", desc: "Business email, VoIP, video conferencing, Teams, collaboration and communication systems.", href: "/solutions/communications" },
                { icon: Headphones, title: "Managed IT & Support", desc: "Continuous monitoring, maintenance, technical support, upgrades and ongoing IT management.", href: "/solutions/managed-it" },
            ],
        },
        {
            id: "industries",
            title: "Industries",
            route: "/industries",
            color: "text-cyan-500",
            items: [
                { icon: Building2, title: "Businesses & Corporations", desc: "Business hardware, software, networking, cloud infrastructure, security and managed IT.", href: "/industries/business" },
                { icon: GraduationCap, title: "Schools & Universities", desc: "Computer labs, devices, campus networks, educational software, security and support.", href: "/industries/education" },
                { icon: ShieldCheck, title: "Healthcare", desc: "IT infrastructure, secure systems, devices, connectivity and digital solutions.", href: "/industries/healthcare" },
                { icon: Settings, title: "Manufacturing & Industrial", desc: "Infrastructure, automation, connectivity, security and operational technology.", href: "/industries/manufacturing" },
                { icon: Building2, title: "Government & Public Sector", desc: "Institutional procurement, infrastructure, software, security and technology deployment.", href: "/industries/government" },
                { icon: Globe, title: "NGOs & Development Organizations", desc: "Technology procurement, digital platforms, communications and field infrastructure.", href: "/industries/ngos" },
                { icon: Package, title: "Retail & Hospitality", desc: "POS infrastructure, networking, security, business systems and operational technology.", href: "/industries/retail" },
                { icon: Sparkles, title: "Startups & Growing Businesses", desc: "Build your technology environment from scratch and scale it as your business grows.", href: "/industries/startups" },
            ],
        },
        {
            id: "how-we-work",
            title: "How We Work",
            route: "/how-we-work",
            color: "text-emerald-500",
            items: [
                { number: "01", icon: MessageCircle, title: "Tell Us What You Need", desc: "Start with your goal, challenge or requirement. You don't need to know the exact technology.", href: "/how-we-work/requirements" },
                { number: "02", icon: Target, title: "We Assess & Recommend", desc: "We understand your objectives, budget, environment and timeline before recommending an approach.", href: "/how-we-work/assessment" },
                { number: "03", icon: Code2, title: "We Source or Build", desc: "We procure the right technology, build your software, configure infrastructure or combine multiple solutions.", href: "/how-we-work/source-build" },
                { number: "04", icon: Settings, title: "We Deploy", desc: "Installation, configuration, integration, testing and implementation are handled as required.", href: "/how-we-work/deployment" },
                { number: "05", icon: GraduationCap, title: "Handover & Training", desc: "We help your team understand the solution and provide the necessary documentation and guidance.", href: "/how-we-work/training" },
                { number: "06", icon: Headphones, title: "Support & Improve", desc: "Ongoing support, maintenance, upgrades and improvements can continue long after implementation.", href: "/how-we-work/support" },
            ],
        },
        {
            id: "about",
            title: "About",
            route: "/about",
            color: "text-orange-500",
            items: [
                { icon: UsersRound, title: "Who We Are", desc: "Learn about our company.", href: "/about/who-we-are" },
                { icon: Target, title: "Why Choose Us", desc: "What makes our approach different.", href: "/about/why-choose-us" },
                { icon: Settings, title: "Our Capabilities", desc: "Explore what we can deliver.", href: "/about/capabilities" },
                { icon: Workflow, title: "Our Approach", desc: "How we work with clients.", href: "/about/approach" },
                { icon: Handshake, title: "Partners & Technology", desc: "The ecosystem behind our solutions.", href: "/about/partners" },
            ],
        },
        {
            id: "resources",
            title: "Resources",
            route: "/resources",
            color: "text-indigo-500",
            items: [
                { icon: BookOpen, title: "Technology Buying Guides", desc: "Understand what to consider before buying technology.", href: "/resources/buying-guides" },
                { icon: Package, title: "Procurement Guides", desc: "Tips for bulk and corporate technology procurement.", href: "/resources/procurement-guides" },
                { icon: HelpCircle, title: "FAQs", desc: "Answers to common questions.", href: "/resources/faqs" },
                { icon: FileText, title: "Case Studies", desc: "See how we've approached real-world challenges.", href: "/resources/case-studies" },
                { icon: Lightbulb, title: "Technology Insights", desc: "Practical ideas about technology and business.", href: "/resources/technology-insights" },
                { icon: Newspaper, title: "Blog", desc: "News, guides and technology perspectives.", href: "/resources/blog" },
                { icon: Headphones, title: "Support", desc: "Get help with an existing solution or service.", href: "/support" },
            ],
        },
    ];

    return (
        <header
            className={`
                fixed
                inset-x-0
                top-0
                z-50
                border-b
                backdrop-blur-2xl
                transition-colors
                duration-300
                ${darkMode
                    ? "border-white/[0.06] bg-[#030712]/80"
                    : "border-slate-200/60 bg-white/90"
                }
            `}
        >
            {/* =====================================================
                TOP UTILITY BAR
            ====================================================== */}

            <div
                className={`
                    hidden
                    border-b
                    lg:block
                    ${darkMode
                        ? "border-white/[0.05]"
                        : "border-slate-200/50"
                    }
                `}
            >
                <div
                    className="
                        mx-auto
                        flex
                        h-9
                        max-w-[1280px]
                        items-center
                        justify-between
                        px-6
                        lg:px-8
                    "
                >
                    {/* Utility tagline */}

                    <div
                        className={`
                            flex
                            items-center
                            gap-3
                            text-[9px]
                            font-semibold
                            uppercase
                            tracking-[0.2em]
                            ${darkMode
                                ? "text-slate-500"
                                : "text-slate-600"
                            }
                        `}
                    >
                        <span
                            className="
                                h-1.5
                                w-1.5
                                rounded-full
                                bg-sky-500
                                shadow-[0_0_10px_rgba(14,165,233,.8)]
                            "
                        />

                        <span>Technology. Simplified.</span>
                    </div>

                    {/* Utility links */}

                    <div
                        className={`
                            flex
                            items-center
                            gap-6
                            text-[11px]
                            font-medium
                            ${darkMode
                                ? "text-slate-500"
                                : "text-slate-600"
                            }
                        `}
                    >
                        <Link
                            to="/support"
                            className={`
                                flex
                                items-center
                                gap-1.5
                                transition-colors
                                duration-200
                                ${darkMode
                                    ? "hover:text-sky-400"
                                    : "hover:text-sky-600"
                                }
                            `}
                        >
                            <Headphones size={12} />
                            <span>Support</span>
                        </Link>

                        <Link
                            to="/contact"
                            className={`
                                flex
                                items-center
                                gap-1.5
                                transition-colors
                                duration-200
                                ${darkMode
                                    ? "hover:text-sky-400"
                                    : "hover:text-sky-600"
                                }
                            `}
                        >
                            <Mail size={12} />
                            <span>Contact</span>
                        </Link>

                        <Link
                            to="/portal"
                            className={`
                                flex
                                items-center
                                gap-1.5
                                transition-colors
                                duration-200
                                ${darkMode
                                    ? "hover:text-sky-400"
                                    : "hover:text-sky-600"
                                }
                            `}
                        >
                            <span>Client Portal</span>
                            <ArrowRight size={11} />
                        </Link>
                    </div>
                </div>
            </div>

            {/* =====================================================
                MAIN NAVIGATION
            ====================================================== */}

            <div
                className="
                    mx-auto
                    flex
                    min-h-[76px]
                    max-w-[1280px]
                    items-center
                    justify-between
                    px-5
                    sm:px-6
                    lg:px-8
                "
            >
                {/* =================================================
                    LOGO
                ================================================== */}

                <Link
                    to="/"
                    onClick={closeMobile}
                    className="
                        group
                        flex
                        shrink-0
                        items-center
                        gap-3
                    "
                    aria-label="AB Technologies Home"
                >
                    <div
                        className={`
                            flex
                            h-11
                            w-14
                            
                            items-center
                            justify-center
                            overflow-hidden
                            rounded-xl
                            transition-all
                            duration-300
                            ${darkMode
                                ? "bg-white/[0.03] ring-1 ring-white/10 shadow-[0_0_25px_rgba(14,165,233,.08)] group-hover:ring-sky-500/30 group-hover:shadow-[0_0_30px_rgba(14,165,233,.15)]"
                                : "bg-slate-100 ring-1 ring-slate-200 shadow-sm group-hover:ring-sky-400/30 group-hover:shadow-[0_0_30px_rgba(14,165,233,.1)]"
                            }
                        `}
                    >
                        <img
                            src="/images/ab-logo.svg"
                            alt="AB Technologies"
                            className="h-full w-full object-contain"
                        />
                    </div>

                    <div className="">
                        <div
                            className={`
                                text-[11px]
                                lg-text-[15px]
                                font-black
                                tracking-[0.06em]
                                ${darkMode
                                    ? "text-white"
                                    : "text-slate-900"
                                }
                            `}
                        >
                            AB TECHNOLOGIES
                        </div>

                        <div
                            className="
                                mt-0.5
                                text-[8px]
                                font-medium
                                uppercase
                                tracking-[0.22em]
                                text-slate-500
                            "
                        >
                            Technology Solutions
                        </div>
                    </div>
                </Link>

                {/* =================================================
                    DESKTOP NAVIGATION
                ================================================== */}

                <nav
                    className="
                        hidden
                        items-center
                        gap-1
                        lg:flex
                    "
                    aria-label="Main navigation"
                >
                    {/* =================================================
                        SERVICES
                    ================================================== */}

                    <MegaMenu
                        title="Services"
                        onSupportAction={() =>
                            startSupportChat(
                                "I'd like to discuss the technology services AB TECHNOLOGIES can provide for our organization.",
                                { Intent: "Service enquiry" }
                            )
                        }
                        width="w-[900px] xl:w-[950px]"
                        introLabel="What We Do"
                        position="-translate-x-[42%]"
                        introTitle={
                            <>
                                Technology solutions
                                <span
                                    className={
                                        darkMode
                                            ? "text-slate-600"
                                            : "text-slate-400"
                                    }
                                >
                                    {" "}
                                    from the ground up.
                                </span>
                            </>
                        }
                        introText="From your first computer to a complete technology environment, we help you plan, source, build, deploy, secure and manage the technology your organization needs."
                        introColor="text-sky-500"
                        footerText="From planning to deployment — we can help you build it from scratch."
                        footerAction="Start a Conversation"
                        footerRoute="/contact"
                        darkMode={darkMode}
                        items={[
                            {
                                icon: Cpu,
                                title: "Hardware & Device Procurement",
                                desc: "Laptops, desktops, workstations, servers, Apple, HP, Dell, Lenovo, printers, monitors, accessories and more.",
                                href: "/services/hardware-procurement",
                            },
                            {
                                icon: Package,
                                title: "Corporate & Bulk Procurement",
                                desc: "Large-scale technology sourcing for companies, institutions, schools, NGOs and organizations.",
                                href: "/services/corporate-procurement",
                            },
                            {
                                icon: Globe,
                                title: "Networking & IT Infrastructure",
                                desc: "Networks, Wi-Fi, cabling, routers, switches, servers, VPNs, firewalls and infrastructure.",
                                href: "/services/networking",
                            },
                            {
                                icon: Server,
                                title: "Cloud, Hosting & Managed IT",
                                desc: "VPS, cloud, hosting, domains, business email, backups, Microsoft 365 and ongoing IT support.",
                                href: "/services/cloud-managed-it",
                            },
                            {
                                icon: Code2,
                                title: "Software & Digital Solutions",
                                desc: "Websites, web applications, mobile apps, SaaS, ERP, CRM, dashboards, APIs and custom systems.",
                                href: "/services/software-solutions",
                            },
                            {
                                icon: Sparkles,
                                title: "AI, Automation & Digital Transformation",
                                desc: "AI applications, chatbots, workflow automation, RPA, intelligent data systems and AI integration.",
                                href: "/services/ai-automation",
                            },
                            {
                                icon: ShieldCheck,
                                title: "Security & Communications",
                                desc: "CCTV, access control, biometrics, cybersecurity, VoIP, video conferencing and communications.",
                                href: "/services/security-communications",
                            },
                            {
                                icon: Settings,
                                title: "Complete IT Deployment & Support",
                                desc: "Consulting, installation, configuration, training, maintenance and complete IT setup.",
                                href: "/services/it-deployment-support",
                            },
                        ]}
                    />

                    {/* =================================================
                        PROCUREMENT
                    ================================================== */}

                    <MegaMenu
                        title="Procurement"
                        onSupportAction={() =>
                            startSupportChat(
                                "I'd like to discuss a technology procurement requirement and get suitable options.",
                                { Intent: "Procurement" }
                            )
                        }
                        width="w-[900px] xl:w-[950px]"
                        introLabel="Technology Procurement"
                        introTitle={
                            <>
                                Source the right technology.
                                <span
                                    className={
                                        darkMode
                                            ? "text-slate-600"
                                            : "text-slate-400"
                                    }
                                >
                                    {" "}
                                    Without the procurement headache.
                                </span>
                            </>
                        }
                        introText="Whether you need one laptop, hundreds of devices or a complete technology deployment, we help you identify, source, verify and coordinate the technology you need."
                        introColor="text-blue-500"
                        footerText="Need 10, 50, 200 or 1,000+ devices? We can help coordinate the procurement."
                        footerAction="Request Procurement Quote"
                        footerRoute="/procurement"
                        darkMode={darkMode}
                        items={[
                            {
                                icon: Package,
                                title: "Bulk & Corporate Procurement",
                                desc: "Large-volume procurement for companies, institutions, schools, NGOs and government organizations.",
                                href: "services/corporate-procurement/",
                            },
                            {
                                icon: Cpu,
                                title: "Hardware Sourcing",
                                desc: "Laptops, desktops, servers, workstations, monitors, printers, networking equipment and accessories.",
                                href: "/procurement/hardware",
                            },
                            {
                                icon: Building2,
                                title: "Institutional Procurement",
                                desc: "Technology supply for schools, universities, healthcare organizations, NGOs and public institutions.",
                                href: "/procurement/institutional",
                            },
                            {
                                icon: Globe,
                                title: "International Sourcing",
                                desc: "Source technology through appropriate international channels when local availability is limited.",
                                href: "/procurement/international",
                            },
                            {
                                icon: Users,
                                title: "Supplier & Vendor Sourcing",
                                desc: "Identify suitable suppliers and procurement channels for your specific requirements.",
                                href: "/procurement/suppliers",
                            },
                            {
                                icon: BookOpen,
                                title: "Competitive Quotations",
                                desc: "Compare available options and build procurement proposals around your requirements and budget.",
                                href: "/procurement/quotations",
                            },
                            {
                                icon: ShieldCheck,
                                title: "Product Verification",
                                desc: "Verify specifications, product details, serial information and applicable warranty arrangements.",
                                href: "/procurement/verification",
                            },
                            {
                                icon: Package,
                                title: "Logistics & Delivery",
                                desc: "Coordinate procurement logistics and delivery according to the project requirements.",
                                href: "/procurement/logistics",
                            },
                        ]}
                    />

                    {/* =================================================
                        SOLUTIONS
                    ================================================== */}

                    <MegaMenu
                        title="Solutions"
                        onSupportAction={() =>
                            startSupportChat(
                                "I'd like to discuss a business challenge and the technology solution that could address it.",
                                { Intent: "Solution enquiry" }
                            )
                        }
                        width="w-[900px] xl:w-[950px]"
                        introLabel="Technology Solutions"
                        introTitle={
                            <>
                                Solve business problems
                                <span
                                    className={
                                        darkMode
                                            ? "text-slate-600"
                                            : "text-slate-400"
                                    }
                                >
                                    {" "}
                                    with technology.
                                </span>
                            </>
                        }
                        introText="We combine software, infrastructure, cloud, AI, automation, security and technology expertise to solve real organizational challenges."
                        introColor="text-purple-500"
                        footerText="Have a unique challenge? We can design a solution around your organization."
                        footerAction="Discuss Your Challenge"
                        footerRoute="/contact"
                        darkMode={darkMode}
                        items={[
                            {
                                icon: Code2,
                                title: "Software & Applications",
                                desc: "Custom websites, web applications, mobile apps, SaaS platforms and business systems.",
                                href: "/solutions/software",
                            },
                            {
                                icon: Workflow,
                                title: "Business Management Systems",
                                desc: "ERP, CRM, accounting, inventory, HR, workforce, dashboards and operational systems.",
                                href: "/solutions/business-systems",
                            },
                            {
                                icon: Server,
                                title: "Cloud & Digital Infrastructure",
                                desc: "Cloud infrastructure, VPS, hosting, email, backups, servers and scalable digital environments.",
                                href: "/solutions/cloud-infrastructure",
                            },
                            {
                                icon: Settings,
                                title: "Automation & Integration",
                                desc: "Connect systems, automate workflows and eliminate repetitive manual processes.",
                                href: "/solutions/automation",
                            },
                            {
                                icon: Sparkles,
                                title: "AI & Intelligent Solutions",
                                desc: "AI applications, chatbots, intelligent data processing, predictive systems and AI integrations.",
                                href: "/solutions/ai",
                            },
                            {
                                icon: ShieldCheck,
                                title: "Security Solutions",
                                desc: "Cybersecurity, CCTV, access control, biometrics, firewalls and security monitoring.",
                                href: "/solutions/security",
                            },
                            {
                                icon: Mail,
                                title: "Business Communications",
                                desc: "Business email, VoIP, video conferencing, Teams, collaboration and communication systems.",
                                href: "/solutions/communications",
                            },
                            {
                                icon: Headphones,
                                title: "Managed IT & Support",
                                desc: "Continuous monitoring, maintenance, technical support, upgrades and ongoing IT management.",
                                href: "/solutions/managed-it",
                            },
                        ]}
                    />

                    {/* =================================================
                        INDUSTRIES
                    ================================================== */}

                    <MegaMenu
                        title="Industries"
                        onSupportAction={() =>
                            startSupportChat(
                                "I'd like to discuss technology requirements for our organization and industry.",
                                { Intent: "Industry enquiry" }
                            )
                        }
                        width="w-[900px] xl:w-[950px]"
                        introLabel="Industries"
                        introTitle={
                            <>
                                Technology built around
                                <span
                                    className={
                                        darkMode
                                            ? "text-slate-600"
                                            : "text-slate-400"
                                    }
                                >
                                    {" "}
                                    your industry.
                                </span>
                            </>
                        }
                        introText="Different industries have different technology requirements. We help organizations choose, build, deploy and manage solutions around their actual operational needs."
                        introColor="text-cyan-500"
                        footerText="Every organization is different. We tailor our approach to your needs."
                        footerAction="Discuss Your Organization"
                        footerRoute="/contact"
                        darkMode={darkMode}
                        items={[
                            {
                                icon: Building2,
                                title: "Businesses & Corporations",
                                desc: "Business hardware, software, networking, cloud infrastructure, security and managed IT.",
                                href: "/industries/business",
                            },
                            {
                                icon: GraduationCap,
                                title: "Schools & Universities",
                                desc: "Computer labs, devices, campus networks, educational software, security and support.",
                                href: "/industries/education",
                            },
                            {
                                icon: ShieldCheck,
                                title: "Healthcare",
                                desc: "IT infrastructure, secure systems, devices, connectivity and digital solutions.",
                                href: "/industries/healthcare",
                            },
                            {
                                icon: Settings,
                                title: "Manufacturing & Industrial",
                                desc: "Infrastructure, automation, connectivity, security and operational technology.",
                                href: "/industries/manufacturing",
                            },
                            {
                                icon: Building2,
                                title: "Government & Public Sector",
                                desc: "Institutional procurement, infrastructure, software, security and technology deployment.",
                                href: "/industries/government",
                            },
                            {
                                icon: Globe,
                                title: "NGOs & Development Organizations",
                                desc: "Technology procurement, digital platforms, communications and field infrastructure.",
                                href: "/industries/ngos",
                            },
                            {
                                icon: Package,
                                title: "Retail & Hospitality",
                                desc: "POS infrastructure, networking, security, business systems and operational technology.",
                                href: "/industries/retail",
                            },
                            {
                                icon: Sparkles,
                                title: "Startups & Growing Businesses",
                                desc: "Build your technology environment from scratch and scale it as your business grows.",
                                href: "/industries/startups",
                            },
                        ]}
                    />

                    {/* =================================================
                        HOW WE WORK
                    ================================================== */}

                    <HowWeWorkMenu
                        darkMode={darkMode}
                        onSupportAction={() =>
                            startSupportChat(
                                "I'd like to tell you what we need and work through the right technology approach.",
                                { Intent: "Start conversation", Context: "How We Work" }
                            )
                        }
                    />

                    {/* =================================================
                        ABOUT
                    ================================================== */}

                    <AboutMenu
                        darkMode={darkMode}
                        onSupportAction={() =>
                            startSupportChat(
                                "I'd like to discuss a requirement with AB TECHNOLOGIES.",
                                { Intent: "Talk to team", Context: "About" }
                            )
                        }
                    />

                    {/* =================================================
                        RESOURCES
                    ================================================== */}

                    <ResourcesMenu
                        darkMode={darkMode}
                        onSupportAction={() =>
                            startSupportChat(
                                "I'm looking for something specific and would like help from the AB TECHNOLOGIES team.",
                                { Intent: "Resource enquiry", Context: "Resources" }
                            )
                        }
                    />
                </nav>

                {/* =================================================
                    RIGHT ACTIONS
                ================================================== */}

                <div className="flex items-center gap-2.5">
                    {/* THEME TOGGLE */}

                    <button
                        type="button"
                        onClick={toggleTheme}
                        className={`
                            group/theme
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-xl
                            border
                            transition-all
                            duration-300
                            ${darkMode
                                ? "border-white/10 bg-white/[0.03] text-slate-300 hover:border-sky-500/30 hover:bg-sky-500/10 hover:text-sky-400"
                                : "border-slate-200 bg-white text-slate-700 shadow-sm hover:border-sky-400 hover:bg-sky-50 hover:text-sky-600"
                            }
                        `}
                        aria-label={
                            darkMode
                                ? "Switch to light mode"
                                : "Switch to dark mode"
                        }
                        title={
                            darkMode
                                ? "Switch to light mode"
                                : "Switch to dark mode"
                        }
                    >
                        <span className="transition-transform duration-300 group-hover/theme:rotate-12">
                            {darkMode ? (
                                <Sun size={17} />
                            ) : (
                                <Moon size={17} />
                            )}
                        </span>
                    </button>

                    {/* DESKTOP QUOTE BUTTON */}

                    <button
                        type="button"
                        onClick={() =>
                            startSupportChat(
                                "I'd like to request a quote for a technology requirement.",
                                { Intent: "Request quote" }
                            )
                        }
                        className="
                            hidden
                            items-center
                            gap-2
                            rounded-xl
                            bg-sky-500
                            px-5
                            py-2.5
                            text-[12px]
                            font-bold
                            text-white
                            shadow-[0_0_25px_rgba(14,165,233,.18)]
                            transition-all
                            duration-300
                            hover:bg-sky-400
                            hover:shadow-[0_0_35px_rgba(14,165,233,.3)]
                            sm:inline-flex
                        "
                    >
                        Request a Quote
                        <ArrowRight size={14} />
                    </button>

                    {/* MOBILE MENU BUTTON */}

                    <button
                        type="button"
                        onClick={() =>
                            setMobileMenuOpen((previous) => !previous)
                        }
                        className={`
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-xl
                            border
                            transition-all
                            duration-200
                            lg:hidden
                            ${darkMode
                                ? "border-white/10 bg-white/[0.03] text-slate-300 hover:border-sky-500/30 hover:bg-sky-500/10 hover:text-sky-400"
                                : "border-slate-200 bg-white text-slate-700 shadow-sm hover:border-sky-400 hover:bg-sky-50 hover:text-sky-600"
                            }
                        `}
                        aria-label={
                            mobileMenuOpen
                                ? "Close navigation"
                                : "Open navigation"
                        }
                        aria-expanded={mobileMenuOpen}
                    >
                        {mobileMenuOpen ? (
                            <X size={21} />
                        ) : (
                            <Menu size={21} />
                        )}
                    </button>
                </div>
            </div>

            {/* =====================================================
                MOBILE MENU
            ====================================================== */}

            <div
                className={`
                    absolute
                    left-0
                    right-0
                    top-full
                    overflow-hidden
                    border-t
                    shadow-[0_25px_70px_rgba(0,0,0,.5)]
                    backdrop-blur-2xl
                    transition-all
                    duration-500
                    ease-[cubic-bezier(0.16,1,0.3,1)]
                    lg:hidden
                    ${darkMode
                        ? "border-white/[0.06] bg-[#030712]/98"
                        : "border-slate-200/50 bg-white/98"
                    }
                    ${mobileMenuOpen
                        ? "visible max-h-[calc(100vh-76px)] opacity-100"
                        : "invisible max-h-0 opacity-0"
                    }
                `}
            >
                <div className="max-h-[calc(100vh-76px)] overflow-y-auto overscroll-contain px-4 py-5">
                    {/* Mobile header */}

                    <div
                        className={`
                            mb-4
                            flex
                            items-center
                            justify-between
                            rounded-2xl
                            border
                            px-4
                            py-3
                            ${darkMode
                                ? "border-white/[0.06] bg-white/[0.02]"
                                : "border-slate-200 bg-slate-50"
                            }
                        `}
                    >
                        <div className="flex items-center gap-2.5">
                            <span
                                className="
                                    h-2
                                    w-2
                                    rounded-full
                                    bg-sky-500
                                    shadow-[0_0_10px_rgba(14,165,233,.8)]
                                "
                            />
                            <span
                                className={`
                                    text-[10px]
                                    font-bold
                                    uppercase
                                    tracking-[0.2em]
                                    ${darkMode
                                        ? "text-slate-400"
                                        : "text-slate-600"
                                    }
                                `}
                            >
                                Navigation
                            </span>
                        </div>

                        <span
                            className={`
                                text-[10px]
                                font-semibold
                                uppercase
                                tracking-[0.15em]
                                ${darkMode
                                    ? "text-slate-600"
                                    : "text-slate-400"
                                }
                            `}
                        >
                            Technology. Simplified.
                        </span>
                    </div>

                    {/* Accordion sections */}

                    <div className="space-y-2">
                        {mobileNavSections.map((section) => {
                            const isExpanded = mobileExpanded === section.id;

                            return (
                                <div
                                    key={section.id}
                                    className={`
                                        overflow-hidden
                                        rounded-2xl
                                        border
                                        transition-all
                                        duration-300
                                        ${darkMode
                                            ? "border-white/[0.06] bg-white/[0.015]"
                                            : "border-slate-200 bg-white"
                                        }
                                        ${isExpanded
                                            ? darkMode
                                                ? "border-sky-500/20 bg-sky-500/[0.03]"
                                                : "border-sky-200 bg-sky-50/50"
                                            : ""
                                        }
                                    `}
                                >
                                    {/* Section header */}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            toggleMobileSection(section.id)
                                        }
                                        className={`
                                            flex
                                            w-full
                                            items-center
                                            justify-between
                                            px-4
                                            py-3.5
                                            transition-colors
                                            duration-200
                                            ${darkMode
                                                ? "hover:bg-white/[0.03]"
                                                : "hover:bg-slate-50"
                                            }
                                        `}
                                        aria-expanded={isExpanded}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span
                                                className={`
                                                    text-[13px]
                                                    font-bold
                                                    tracking-wide
                                                    ${darkMode
                                                        ? "text-slate-200"
                                                        : "text-slate-800"
                                                    }
                                                `}
                                            >
                                                {section.title}
                                            </span>

                                            <span
                                                className={`
                                                    rounded-full
                                                    px-2
                                                    py-0.5
                                                    text-[9px]
                                                    font-bold
                                                    ${darkMode
                                                        ? "bg-white/[0.06] text-slate-500"
                                                        : "bg-slate-100 text-slate-500"
                                                    }
                                                `}
                                            >
                                                {section.items.length}
                                            </span>
                                        </div>

                                        <ChevronDown
                                            size={16}
                                            className={`
                                                shrink-0
                                                transition-transform
                                                duration-300
                                                ${section.color}
                                                ${isExpanded ? "rotate-180" : ""}
                                            `}
                                        />
                                    </button>

                                    {/* Section items */}

                                    <div
                                        className={`
                                            grid
                                            transition-all
                                            duration-400
                                            ease-[cubic-bezier(0.16,1,0.3,1)]
                                            ${isExpanded
                                                ? "grid-rows-[1fr] opacity-100"
                                                : "grid-rows-[0fr] opacity-0"
                                            }
                                        `}
                                    >
                                        <div className="overflow-hidden">
                                            <div
                                                className={`
                                                    space-y-1
                                                    border-t
                                                    px-3
                                                    pt-2
                                                    pb-3
                                                    ${darkMode
                                                        ? "border-white/[0.06]"
                                                        : "border-slate-200"
                                                    }
                                                `}
                                            >
                                                {section.items.map((item) => {
                                                    const Icon = item.icon;

                                                    return (
                                                        <Link
                                                            key={item.title}
                                                            to={item.href}
                                                            onClick={closeMobile}
                                                            className={`
                                                                group/mobitem
                                                                flex
                                                                gap-3
                                                                rounded-xl
                                                                p-3
                                                                transition-all
                                                                duration-200
                                                                ${darkMode
                                                                    ? "hover:bg-white/[0.04]"
                                                                    : "hover:bg-slate-50"
                                                                }
                                                            `}
                                                        >
                                                            <div
                                                                className={`
                                                                    flex
                                                                    h-8
                                                                    w-8
                                                                    shrink-0
                                                                    items-center
                                                                    justify-center
                                                                    rounded-lg
                                                                    ${darkMode
                                                                        ? "bg-sky-500/10 text-sky-400"
                                                                        : "bg-sky-100 text-sky-600"
                                                                    }
                                                                `}
                                                            >
                                                                {item.number ? (
                                                                    <span className="text-[10px] font-black">
                                                                        {item.number}
                                                                    </span>
                                                                ) : (
                                                                    <Icon size={14} />
                                                                )}
                                                            </div>

                                                            <div className="min-w-0 flex-1">
                                                                <div
                                                                    className={`
                                                                        text-[12px]
                                                                        font-semibold
                                                                        leading-4
                                                                        transition-colors
                                                                        ${darkMode
                                                                            ? "text-slate-300 group-hover/mobitem:text-white"
                                                                            : "text-slate-700 group-hover/mobitem:text-slate-900"
                                                                        }
                                                                    `}
                                                                >
                                                                    {item.title}
                                                                </div>

                                                                <div
                                                                    className={`
                                                                        mt-1
                                                                        text-[10px]
                                                                        leading-4
                                                                        ${darkMode
                                                                            ? "text-slate-500"
                                                                            : "text-slate-500"
                                                                        }
                                                                    `}
                                                                >
                                                                    {item.desc}
                                                                </div>
                                                            </div>

                                                            <ArrowRight
                                                                size={12}
                                                                className={`
                                                                    mt-1
                                                                    shrink-0
                                                                    -translate-x-1
                                                                    opacity-0
                                                                    transition-all
                                                                    duration-200
                                                                    group-hover/mobitem:translate-x-0
                                                                    group-hover/mobitem:opacity-100
                                                                    ${section.color}
                                                                `}
                                                            />
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Divider */}

                    <div
                        className={`
                            my-4
                            h-px
                            ${darkMode
                                ? "bg-white/[0.06]"
                                : "bg-slate-200"
                            }
                        `}
                    />

                    {/* Quick links */}

                    <div className="space-y-2">
                        <Link
                            to="/support"
                            onClick={closeMobile}
                            className={`
                                flex
                                items-center
                                gap-3
                                rounded-2xl
                                border
                                px-4
                                py-3.5
                                text-sm
                                font-medium
                                transition-all
                                duration-200
                                ${darkMode
                                    ? "border-white/[0.05] bg-white/[0.02] text-slate-300 hover:border-sky-500/15 hover:bg-sky-500/[0.05] hover:text-sky-400"
                                    : "border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-600"
                                }
                            `}
                        >
                            <div
                                className={`
                                    flex
                                    h-8
                                    w-8
                                    items-center
                                    justify-center
                                    rounded-lg
                                    ${darkMode
                                        ? "bg-sky-500/10 text-sky-400"
                                        : "bg-sky-100 text-sky-600"
                                    }
                                `}
                            >
                                <Headphones size={15} />
                            </div>

                            <span>Support</span>
                        </Link>

                        <Link
                            to="/contact"
                            onClick={closeMobile}
                            className={`
                                flex
                                items-center
                                gap-3
                                rounded-2xl
                                border
                                px-4
                                py-3.5
                                text-sm
                                font-medium
                                transition-all
                                duration-200
                                ${darkMode
                                    ? "border-white/[0.05] bg-white/[0.02] text-slate-300 hover:border-sky-500/15 hover:bg-sky-500/[0.05] hover:text-sky-400"
                                    : "border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-600"
                                }
                            `}
                        >
                            <div
                                className={`
                                    flex
                                    h-8
                                    w-8
                                    items-center
                                    justify-center
                                    rounded-lg
                                    ${darkMode
                                        ? "bg-sky-500/10 text-sky-400"
                                        : "bg-sky-100 text-sky-600"
                                    }
                                `}
                            >
                                <Mail size={15} />
                            </div>

                            <span>Contact Us</span>
                        </Link>

                        <Link
                            to="/portal"
                            onClick={closeMobile}
                            className={`
                                flex
                                items-center
                                justify-between
                                rounded-2xl
                                border
                                px-4
                                py-3.5
                                text-sm
                                font-semibold
                                transition-all
                                duration-200
                                ${darkMode
                                    ? "border-white/10 bg-white/[0.03] text-slate-200 hover:border-sky-500/20 hover:bg-sky-500/[0.05]"
                                    : "border-slate-200 bg-slate-50 text-slate-800 hover:border-sky-400 hover:bg-sky-50"
                                }
                            `}
                        >
                            <span>Client Portal</span>

                            <ArrowRight
                                size={15}
                                className="text-sky-500"
                            />
                        </Link>
                    </div>

                    {/* Quote button */}

                    <button
                        type="button"
                        onClick={() =>
                            startSupportChat(
                                "I'd like to request a quote for a technology requirement.",
                                { Intent: "Request quote", View: "Mobile navigation" }
                            )
                        }
                        className="
                            mt-4
                            flex
                            items-center
                            justify-center
                            gap-2
                            rounded-2xl
                            bg-sky-500
                            px-4
                            py-4
                            text-sm
                            font-bold
                            text-white
                            shadow-[0_0_30px_rgba(14,165,233,.25)]
                            transition-all
                            duration-300
                            hover:bg-sky-400
                            hover:shadow-[0_0_40px_rgba(14,165,233,.35)]
                            active:scale-[0.98]
                        "
                    >
                        Request a Quote
                        <ArrowRight size={15} />
                    </button>

                    {/* Tagline */}

                    <div
                        className={`
                            mt-5
                            mb-2
                            text-center
                            text-[9px]
                            font-semibold
                            uppercase
                            tracking-[0.2em]
                            ${darkMode
                                ? "text-slate-600"
                                : "text-slate-400"
                            }
                        `}
                    >
                        Technology. Simplified.
                    </div>
                </div>
            </div>
        </header>
    );
}

/* =================================================================
   MEGA MENU
================================================================= */

function MegaMenu({
    title,
    width,
    introLabel,
    position = "-translate-x-1/2",
    introTitle,
    introText,
    introColor,
    items,
    footerText,
    footerAction,
    footerRoute = "/contact",
    darkMode = true,
    onSupportAction,
}) {
    return (
        <div className="group relative">
            {/* Trigger */}

            <button
                type="button"
                className={`
                    flex
                    items-center
                    gap-1.5
                    rounded-lg
                    px-3
                    py-7
                    text-[12px]
                    font-medium
                    transition-colors
                    duration-200
                    ${darkMode
                        ? "text-slate-400 hover:text-white"
                        : "text-slate-600 hover:text-slate-900"
                    }
                `}
                aria-haspopup="true"
            >
                <span>{title}</span>

                <ChevronDown
                    size={13}
                    className={`
                        transition-transform
                        duration-200
                        group-hover:rotate-180
                        ${darkMode
                            ? "text-slate-400"
                            : "text-slate-400"
                        }
                    `}
                />
            </button>

            {/* Dropdown */}

            <div
                className={`
                    pointer-events-none
                    invisible
                    absolute
                    left-1/2
                    top-full
                    z-[100]
                    ${position}
                    -translate-y-2
                    mt-0
                    overflow-hidden
                    rounded-2xl
                    border
                    opacity-0
                    shadow-[0_30px_80px_rgba(0,0,0,.55)]
                    backdrop-blur-2xl
                    transition-all
                    duration-200
                    group-hover:pointer-events-auto
                    group-hover:visible
                    group-hover:translate-y-0
                    group-hover:opacity-100
                    ${width}
                    max-w-[calc(100vw-32px)]
                    max-h-[calc(100vh-125px)]
                    ${darkMode
                        ? "border-white/10 bg-[#080d18]/98"
                        : "border-slate-200 bg-white/98"
                    }
                `}
            >
                <div className="max-h-[calc(100vh-125px)] overflow-y-auto overscroll-contain">
                    <div className="grid grid-cols-3">
                        {/* Intro panel */}

                        <div
                            className={`
                                bg-gradient-to-br
                                p-7
                                ${darkMode
                                    ? "from-slate-950 to-[#07101e]"
                                    : "from-slate-50 to-white"
                                }
                            `}
                        >
                            <div
                                className={`
                                    text-[9px]
                                    font-bold
                                    uppercase
                                    tracking-[0.2em]
                                    ${introColor}
                                `}
                            >
                                {introLabel}
                            </div>

                            <h3
                                className={`
                                    mt-3
                                    text-xl
                                    font-black
                                    leading-tight
                                    ${darkMode
                                        ? "text-white"
                                        : "text-slate-900"
                                    }
                                `}
                            >
                                {introTitle}
                            </h3>

                            <p
                                className={`
                                    mt-3
                                    text-xs
                                    leading-6
                                    ${darkMode
                                        ? "text-slate-500"
                                        : "text-slate-600"
                                    }
                                `}
                            >
                                {introText}
                            </p>

                            <div
                                className={`
                                    mt-6
                                    border-t
                                    pt-5
                                    ${darkMode
                                        ? "border-white/10"
                                        : "border-slate-200"
                                    }
                                `}
                            >
                                <div
                                    className={`
                                        text-[9px]
                                        uppercase
                                        tracking-[0.16em]
                                        ${darkMode
                                            ? "text-slate-600"
                                            : "text-slate-500"
                                        }
                                    `}
                                >
                                    Need help?
                                </div>

                                <div
                                    className={`
                                        mt-1.5
                                        text-xs
                                        font-semibold
                                        ${darkMode
                                            ? "text-slate-300"
                                            : "text-slate-700"
                                        }
                                    `}
                                >
                                    Tell us what you're trying to achieve.
                                </div>

                                <button
                                    type="button"
                                    onClick={onSupportAction}

                                    className={`
                                        mt-3
                                        inline-flex
                                        items-center
                                        gap-1.5
                                        text-[11px]
                                        font-bold
                                        transition
                                        hover:brightness-125
                                        ${introColor}
                                    `}
                                >
                                    Start a conversation

                                    <ArrowRight size={12} />
                                </button>
                            </div>
                        </div>

                        {/* Menu items */}

                        <div className="col-span-2 grid grid-cols-2 p-4">
                            {items.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <Link
                                        key={item.title}
                                        to={item.href}
                                        className={`
                                            group/item
                                            rounded-xl
                                            p-3
                                            transition-all
                                            duration-200
                                            ${darkMode
                                                ? "hover:bg-white/[0.04]"
                                                : "hover:bg-slate-50"
                                            }
                                        `}
                                    >
                                        <div className="flex gap-3">
                                            <div
                                                className={`
                                                    flex
                                                    h-9
                                                    w-9
                                                    shrink-0
                                                    items-center
                                                    justify-center
                                                    rounded-lg
                                                    border
                                                    transition-all
                                                    duration-200
                                                    ${darkMode
                                                        ? "border-sky-500/10 bg-sky-500/10 text-sky-400 group-hover/item:border-sky-500/25 group-hover/item:bg-sky-500/15"
                                                        : "border-sky-200 bg-sky-50 text-sky-600 group-hover/item:border-sky-300 group-hover/item:bg-sky-100"
                                                    }
                                                `}
                                            >
                                                <Icon size={16} />
                                            </div>

                                            <div className="min-w-0">
                                                <div
                                                    className={`
                                                        flex
                                                        items-start
                                                        gap-1
                                                        text-[11px]
                                                        font-bold
                                                        leading-4
                                                        transition-colors
                                                        ${darkMode
                                                            ? "text-slate-200 group-hover/item:text-white"
                                                            : "text-slate-800 group-hover/item:text-slate-900"
                                                        }
                                                    `}
                                                >
                                                    <span>{item.title}</span>

                                                    <ArrowRight
                                                        size={11}
                                                        className="
                                                            mt-0.5
                                                            shrink-0
                                                            -translate-x-1
                                                            text-sky-500
                                                            opacity-0
                                                            transition-all
                                                            duration-200
                                                            group-hover/item:translate-x-0
                                                            group-hover/item:opacity-100
                                                        "
                                                    />
                                                </div>

                                                <p
                                                    className={`
                                                        mt-1
                                                        text-[10px]
                                                        leading-4
                                                        ${darkMode
                                                            ? "text-slate-500"
                                                            : "text-slate-600"
                                                        }
                                                    `}
                                                >
                                                    {item.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Footer */}

                    <div
                        className={`
                            flex
                            items-center
                            justify-between
                            border-t
                            px-6
                            py-3.5
                            ${darkMode
                                ? "border-white/[0.06] bg-white/[0.02]"
                                : "border-slate-200 bg-slate-50/50"
                            }
                        `}
                    >
                        <span
                            className={`
                                text-[10px]
                                ${darkMode
                                    ? "text-slate-500"
                                    : "text-slate-600"
                                }
                            `}
                        >
                            {footerText}
                        </span>

                        <button
                            type="button"
                            onClick={onSupportAction}

                            className={`
                                flex
                                shrink-0
                                items-center
                                gap-1.5
                                text-[10px]
                                font-bold
                                transition-colors
                                ${darkMode
                                    ? "text-sky-400 hover:text-sky-300"
                                    : "text-sky-600 hover:text-sky-700"
                                }
                            `}
                        >
                            {footerAction}

                            <ArrowRight size={11} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* =================================================================
   HOW WE WORK MENU
================================================================= */

function HowWeWorkMenu({ darkMode = true, onSupportAction }) {
    const steps = [
        {
            number: "01",
            title: "Tell Us What You Need",
            desc: "Start with your goal, challenge or requirement. You don't need to know the exact technology.",
            icon: MessageCircle,
            color: "text-sky-500",
            href: "/how-we-work/requirements",
            hover: darkMode
                ? "hover:border-sky-500/20 hover:bg-sky-500/[0.05]"
                : "hover:border-sky-300 hover:bg-sky-50",
        },
        {
            number: "02",
            title: "We Assess & Recommend",
            desc: "We understand your objectives, budget, environment and timeline before recommending an approach.",
            icon: Target,
            color: "text-purple-500",
            href: "/how-we-work/assessment",
            hover: darkMode
                ? "hover:border-purple-500/20 hover:bg-purple-500/[0.05]"
                : "hover:border-purple-300 hover:bg-purple-50",
        },
        {
            number: "03",
            title: "We Source or Build",
            desc: "We procure the right technology, build your software, configure infrastructure or combine multiple solutions.",
            icon: Code2,
            color: "text-cyan-500",
            href: "/how-we-work/source-build",
            hover: darkMode
                ? "hover:border-cyan-500/20 hover:bg-cyan-500/[0.05]"
                : "hover:border-cyan-300 hover:bg-cyan-50",
        },
        {
            number: "04",
            title: "We Deploy",
            desc: "Installation, configuration, integration, testing and implementation are handled as required.",
            icon: Settings,
            color: "text-emerald-500",
            href: "/how-we-work/deployment",
            hover: darkMode
                ? "hover:border-emerald-500/20 hover:bg-emerald-500/[0.05]"
                : "hover:border-emerald-300 hover:bg-emerald-50",
        },
        {
            number: "05",
            title: "Handover & Training",
            desc: "We help your team understand the solution and provide the necessary documentation and guidance.",
            icon: GraduationCap,
            color: "text-orange-500",
            href: "/how-we-work/training",
            hover: darkMode
                ? "hover:border-orange-500/20 hover:bg-orange-500/[0.05]"
                : "hover:border-orange-300 hover:bg-orange-50",
        },
        {
            number: "06",
            title: "Support & Improve",
            desc: "Ongoing support, maintenance, upgrades and improvements can continue long after implementation.",
            icon: Headphones,
            color: "text-indigo-500",
            href: "/how-we-work/support",
            hover: darkMode
                ? "hover:border-indigo-500/20 hover:bg-indigo-500/[0.05]"
                : "hover:border-indigo-300 hover:bg-indigo-50",
        },
    ];

    return (
        <div className="group relative">
            <button
                type="button"
                className={`
                    flex
                    items-center
                    gap-1.5
                    rounded-lg
                    px-3
                    py-7
                    text-[12px]
                    font-medium
                    transition-colors
                    duration-200
                    ${darkMode
                        ? "text-slate-400 hover:text-white"
                        : "text-slate-600 hover:text-slate-900"
                    }
                `}
                aria-haspopup="true"
            >
                <span>How We Work</span>

                <ChevronDown
                    size={13}
                    className="
                        transition-transform
                        duration-200
                        group-hover:rotate-180
                    "
                />
            </button>

            <div
                className={`
                    pointer-events-none
                    invisible
                    absolute
                    right-0
                    top-full
                    z-[100]
                    w-[850px]
                    max-w-[calc(100vw-32px)]
                    -translate-y-2
                    overflow-hidden
                    rounded-2xl
                    border
                    opacity-0
                    shadow-[0_30px_80px_rgba(0,0,0,.55)]
                    backdrop-blur-2xl
                    transition-all
                    duration-200
                    group-hover:pointer-events-auto
                    group-hover:visible
                    group-hover:translate-y-0
                    group-hover:opacity-100
                    ${darkMode
                        ? "border-white/10 bg-[#080d18]/98"
                        : "border-slate-200 bg-white/98"
                    }
                `}
            >
                <div className="max-h-[calc(100vh-125px)] overflow-y-auto overscroll-contain">
                    <div className="p-7">
                        <div className="mb-6">
                            <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-sky-500">
                                Our Process
                            </div>

                            <h3
                                className={`
                                    mt-2
                                    text-xl
                                    font-black
                                    ${darkMode
                                        ? "text-white"
                                        : "text-slate-900"
                                    }
                                `}
                            >
                                From idea to implementation.
                            </h3>

                            <p
                                className={`
                                    mt-2
                                    max-w-2xl
                                    text-xs
                                    leading-6
                                    ${darkMode
                                        ? "text-slate-500"
                                        : "text-slate-600"
                                    }
                                `}
                            >
                                You don't need to have everything figured out.
                                We work with you from the initial requirement
                                through sourcing, development, deployment and
                                ongoing support.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            {steps.map((step) => {
                                const Icon = step.icon;

                                return (
                                    <Link
                                        key={step.number}
                                        to={step.href}
                                        className={`
                                            group/step
                                            rounded-xl
                                            border
                                            p-4
                                            transition-all
                                            duration-200
                                            ${darkMode
                                                ? "border-white/[0.06] bg-white/[0.015]"
                                                : "border-slate-200 bg-white"
                                            }
                                            ${step.hover}
                                        `}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div
                                                className={`
                                                    text-xl
                                                    font-black
                                                    ${step.color}
                                                `}
                                            >
                                                {step.number}
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center gap-2">
                                                    <Icon
                                                        size={15}
                                                        className={step.color}
                                                    />

                                                    <h4
                                                        className={`
                                                            text-[11px]
                                                            font-bold
                                                            leading-4
                                                            transition-colors
                                                            ${darkMode
                                                                ? "text-slate-200 group-hover/step:text-white"
                                                                : "text-slate-800 group-hover/step:text-slate-900"
                                                            }
                                                        `}
                                                    >
                                                        {step.title}
                                                    </h4>
                                                </div>

                                                <p
                                                    className={`
                                                        mt-2
                                                        text-[10px]
                                                        leading-4
                                                        ${darkMode
                                                            ? "text-slate-500"
                                                            : "text-slate-600"
                                                        }
                                                    `}
                                                >
                                                    {step.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Footer */}

                    <div
                        className={`
                            flex
                            items-center
                            justify-between
                            border-t
                            px-7
                            py-4
                            ${darkMode
                                ? "border-white/[0.06] bg-slate-950"
                                : "border-slate-200 bg-slate-50"
                            }
                        `}
                    >
                        <div>
                            <div
                                className={`
                                    text-sm
                                    font-bold
                                    ${darkMode
                                        ? "text-white"
                                        : "text-slate-900"
                                    }
                                `}
                            >
                                Starting from scratch?
                            </div>

                            <div
                                className={`
                                    mt-1
                                    text-[10px]
                                    ${darkMode
                                        ? "text-slate-500"
                                        : "text-slate-600"
                                    }
                                `}
                            >
                                That's exactly what we're here to help with.
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={onSupportAction}
                            className={`
                                inline-flex
                                items-center
                                gap-2
                                rounded-xl
                                px-4
                                py-2.5
                                text-[10px]
                                font-bold
                                transition
                                ${darkMode
                                    ? "bg-white text-slate-950 hover:bg-slate-100"
                                    : "bg-slate-900 text-white hover:bg-slate-800"
                                }
                            `}
                        >
                            Start a Conversation

                            <ArrowRight size={12} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* =================================================================
   ABOUT MENU
================================================================= */

function AboutMenu({ darkMode = true, onSupportAction }) {
    const items = [
        {
            icon: UsersRound,
            title: "Who We Are",
            desc: "Learn about our company.",
            href: "/about/who-we-are",
        },
        {
            icon: Target,
            title: "Why Choose Us",
            desc: "What makes our approach different.",
            href: "/about/why-choose-us",
        },
        {
            icon: Settings,
            title: "Our Capabilities",
            desc: "Explore what we can deliver.",
            href: "/about/capabilities",
        },
        {
            icon: Workflow,
            title: "Our Approach",
            desc: "How we work with clients.",
            href: "/about/approach",
        },
        {
            icon: Handshake,
            title: "Partners & Technology",
            desc: "The ecosystem behind our solutions.",
            href: "/about/partners",
        },
    ];

    return (
        <div className="group relative">
            <button
                type="button"
                className={`
                    flex
                    items-center
                    gap-1.5
                    rounded-lg
                    px-3
                    py-7
                    text-[12px]
                    font-medium
                    transition-colors
                    duration-200
                    ${darkMode
                        ? "text-slate-400 hover:text-white"
                        : "text-slate-600 hover:text-slate-900"
                    }
                `}
                aria-haspopup="true"
            >
                <span>About</span>

                <ChevronDown
                    size={13}
                    className="
                        transition-transform
                        duration-200
                        group-hover:rotate-180
                    "
                />
            </button>

            <div
                className={`
                    pointer-events-none
                    invisible
                    absolute
                    right-0
                    top-full
                    z-[100]
                    w-[520px]
                    max-w-[calc(100vw-32px)]
                    -translate-y-2
                    overflow-hidden
                    rounded-2xl
                    border
                    opacity-0
                    shadow-[0_30px_80px_rgba(0,0,0,.55)]
                    backdrop-blur-2xl
                    transition-all
                    duration-200
                    group-hover:pointer-events-auto
                    group-hover:visible
                    group-hover:translate-y-0
                    group-hover:opacity-100
                    ${darkMode
                        ? "border-white/10 bg-[#080d18]/98"
                        : "border-slate-200 bg-white/98"
                    }
                `}
            >
                <div className="max-h-[calc(100vh-125px)] overflow-y-auto">
                    <div className="p-6">
                        <div className="mb-5">
                            <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-sky-500">
                                About Us
                            </div>

                            <h3
                                className={`
                                    mt-2
                                    text-xl
                                    font-black
                                    ${darkMode
                                        ? "text-white"
                                        : "text-slate-900"
                                    }
                                `}
                            >
                                Technology with purpose.
                            </h3>

                            <p
                                className={`
                                    mt-2
                                    text-xs
                                    leading-6
                                    ${darkMode
                                        ? "text-slate-500"
                                        : "text-slate-600"
                                    }
                                `}
                            >
                                We help organizations make better use of
                                technology through reliable procurement,
                                practical solutions and long-term technical
                                support.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            {items.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <Link
                                        key={item.title}
                                        to={item.href}
                                        className={`
                                            group/about
                                            rounded-xl
                                            border
                                            p-4
                                            transition-all
                                            duration-200
                                            ${darkMode
                                                ? "border-white/[0.05] bg-white/[0.02] hover:border-sky-500/15 hover:bg-sky-500/[0.05]"
                                                : "border-slate-200 bg-white hover:border-sky-300 hover:bg-sky-50"
                                            }
                                        `}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div
                                                className={`
                                                    flex
                                                    h-8
                                                    w-8
                                                    shrink-0
                                                    items-center
                                                    justify-center
                                                    rounded-lg
                                                    ${darkMode
                                                        ? "bg-sky-500/10 text-sky-400"
                                                        : "bg-sky-100 text-sky-600"
                                                    }
                                                `}
                                            >
                                                <Icon size={14} />
                                            </div>

                                            <div>
                                                <div
                                                    className={`
                                                        text-[11px]
                                                        font-bold
                                                        transition
                                                        ${darkMode
                                                            ? "text-slate-200 group-hover/about:text-white"
                                                            : "text-slate-800 group-hover/about:text-slate-900"
                                                        }
                                                    `}
                                                >
                                                    {item.title}
                                                </div>

                                                <div
                                                    className={`
                                                        mt-1
                                                        text-[9px]
                                                        leading-4
                                                        ${darkMode
                                                            ? "text-slate-600"
                                                            : "text-slate-500"
                                                        }
                                                    `}
                                                >
                                                    {item.desc}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}

                            {/* Contact CTA */}

                            <button
                                type="button"
                                onClick={onSupportAction}
                                className={`
                                    rounded-xl
                                    border
                                    p-4
                                    transition-all
                                    duration-200
                                    ${darkMode
                                        ? "border-sky-500/10 bg-sky-500/[0.08] hover:border-sky-500/25 hover:bg-sky-500/[0.12]"
                                        : "border-sky-200 bg-sky-50 hover:border-sky-300 hover:bg-sky-100"
                                    }
                                `}
                            >
                                <div className="flex items-start gap-3">
                                    <div
                                        className={`
                                            flex
                                            h-8
                                            w-8
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-lg
                                            ${darkMode
                                                ? "bg-sky-500/15 text-sky-400"
                                                : "bg-sky-200 text-sky-600"
                                            }
                                        `}
                                    >
                                        <Mail size={14} />
                                    </div>

                                    <div>
                                        <div
                                            className={`
                                                text-[11px]
                                                font-bold
                                                ${darkMode
                                                    ? "text-sky-300"
                                                    : "text-sky-600"
                                                }
                                            `}
                                        >
                                            Contact Us →
                                        </div>

                                        <div
                                            className={`
                                                mt-1
                                                text-[9px]
                                                leading-4
                                                ${darkMode
                                                    ? "text-sky-400/70"
                                                    : "text-sky-500"
                                                }
                                            `}
                                        >
                                            Let's discuss your requirement.
                                        </div>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* =================================================================
   RESOURCES MENU
================================================================= */

function ResourcesMenu({ darkMode = true, onSupportAction }) {
    const learnItems = [
        {
            icon: BookOpen,
            title: "Technology Buying Guides",
            desc: "Understand what to consider before buying technology.",
            href: "/resources/buying-guides",
        },
        {
            icon: Package,
            title: "Procurement Guides",
            desc: "Tips for bulk and corporate technology procurement.",
            href: "/resources/procurement-guides",
        },
        {
            icon: HelpCircle,
            title: "FAQs",
            desc: "Answers to common questions.",
            href: "/resources/faqs",
        },
    ];

    const insightItems = [
        {
            icon: FileText,
            title: "Case Studies",
            desc: "See how we've approached real-world challenges.",
            href: "/resources/case-studies",
        },
        {
            icon: Lightbulb,
            title: "Technology Insights",
            desc: "Practical ideas about technology and business.",
            href: "/resources/technology-insights",
        },
        {
            icon: Newspaper,
            title: "Blog",
            desc: "News, guides and technology perspectives.",
            href: "/resources/blog",
        },
        {
            icon: Headphones,
            title: "Support",
            desc: "Get help with an existing solution or service.",
            href: "/support",
        },
    ];

    return (
        <div className="group relative">
            <button
                type="button"
                className={`
                    flex
                    items-center
                    gap-1.5
                    rounded-lg
                    px-3
                    py-7
                    text-[12px]
                    font-medium
                    transition-colors
                    duration-200
                    ${darkMode
                        ? "text-slate-400 hover:text-white"
                        : "text-slate-600 hover:text-slate-900"
                    }
                `}
                aria-haspopup="true"
            >
                <span>Resources</span>

                <ChevronDown
                    size={13}
                    className="
                        transition-transform
                        duration-200
                        group-hover:rotate-180
                    "
                />
            </button>

            <div
                className={`
                    pointer-events-none
                    invisible
                    absolute
                    right-0
                    top-full
                    z-[100]
                    w-[600px]
                    max-w-[calc(100vw-32px)]
                    -translate-y-2
                    overflow-hidden
                    rounded-2xl
                    border
                    opacity-0
                    shadow-[0_30px_80px_rgba(0,0,0,.55)]
                    backdrop-blur-2xl
                    transition-all
                    duration-200
                    group-hover:pointer-events-auto
                    group-hover:visible
                    group-hover:translate-y-0
                    group-hover:opacity-100
                    ${darkMode
                        ? "border-white/10 bg-[#080d18]/98"
                        : "border-slate-200 bg-white/98"
                    }
                `}
            >
                <div className="max-h-[calc(100vh-125px)] overflow-y-auto">
                    <div className="grid grid-cols-2">
                        {/* Learn */}

                        <div
                            className={`
                                border-r
                                p-6
                                ${darkMode
                                    ? "border-white/[0.06]"
                                    : "border-slate-200"
                                }
                            `}
                        >
                            <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-sky-500">
                                Learn
                            </div>

                            <h3
                                className={`
                                    mt-2
                                    text-xl
                                    font-black
                                    ${darkMode
                                        ? "text-white"
                                        : "text-slate-900"
                                    }
                                `}
                            >
                                Technology Resources
                            </h3>

                            <p
                                className={`
                                    mt-2
                                    text-xs
                                    leading-6
                                    ${darkMode
                                        ? "text-slate-500"
                                        : "text-slate-600"
                                    }
                                `}
                            >
                                Practical information to help you make better
                                technology and procurement decisions.
                            </p>

                            <div className="mt-5 space-y-1">
                                {learnItems.map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <Link
                                            key={item.title}
                                            to={item.href}
                                            className={`
                                                group/resource
                                                block
                                                rounded-xl
                                                p-3
                                                transition-all
                                                duration-200
                                                ${darkMode
                                                    ? "hover:bg-sky-500/[0.05]"
                                                    : "hover:bg-sky-50"
                                                }
                                            `}
                                        >
                                            <div className="flex gap-3">
                                                <div
                                                    className={`
                                                        flex
                                                        h-8
                                                        w-8
                                                        shrink-0
                                                        items-center
                                                        justify-center
                                                        rounded-lg
                                                        ${darkMode
                                                            ? "bg-sky-500/10 text-sky-400"
                                                            : "bg-sky-100 text-sky-600"
                                                        }
                                                    `}
                                                >
                                                    <Icon size={14} />
                                                </div>

                                                <div>
                                                    <div
                                                        className={`
                                                            text-[11px]
                                                            font-bold
                                                            ${darkMode
                                                                ? "text-slate-200 group-hover/resource:text-white"
                                                                : "text-slate-800 group-hover/resource:text-slate-900"
                                                            }
                                                        `}
                                                    >
                                                        {item.title}
                                                    </div>

                                                    <div
                                                        className={`
                                                            mt-1
                                                            text-[9px]
                                                            leading-4
                                                            ${darkMode
                                                                ? "text-slate-600"
                                                                : "text-slate-500"
                                                            }
                                                        `}
                                                    >
                                                        {item.desc}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Insights */}

                        <div className="p-6">
                            <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-purple-500">
                                Insights
                            </div>

                            <h3
                                className={`
                                    mt-2
                                    text-xl
                                    font-black
                                    ${darkMode
                                        ? "text-white"
                                        : "text-slate-900"
                                    }
                                `}
                            >
                                Explore & Discover
                            </h3>

                            <div className="mt-5 space-y-1">
                                {insightItems.map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <Link
                                            key={item.title}
                                            to={item.href}
                                            className={`
                                                group/insight
                                                block
                                                rounded-xl
                                                p-3
                                                transition-all
                                                duration-200
                                                ${darkMode
                                                    ? "hover:bg-purple-500/[0.05]"
                                                    : "hover:bg-purple-50"
                                                }
                                            `}
                                        >
                                            <div className="flex gap-3">
                                                <div
                                                    className={`
                                                        flex
                                                        h-8
                                                        w-8
                                                        shrink-0
                                                        items-center
                                                        justify-center
                                                        rounded-lg
                                                        ${darkMode
                                                            ? "bg-purple-500/10 text-purple-400"
                                                            : "bg-purple-100 text-purple-600"
                                                        }
                                                    `}
                                                >
                                                    <Icon size={14} />
                                                </div>

                                                <div>
                                                    <div
                                                        className={`
                                                            text-[11px]
                                                            font-bold
                                                            ${darkMode
                                                                ? "text-slate-200 group-hover/insight:text-white"
                                                                : "text-slate-800 group-hover/insight:text-slate-900"
                                                            }
                                                        `}
                                                    >
                                                        {item.title}
                                                    </div>

                                                    <div
                                                        className={`
                                                            mt-1
                                                            text-[9px]
                                                            leading-4
                                                            ${darkMode
                                                                ? "text-slate-600"
                                                                : "text-slate-500"
                                                            }
                                                        `}
                                                    >
                                                        {item.desc}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Footer */}

                    <div
                        className={`
                            flex
                            items-center
                            justify-between
                            border-t
                            px-6
                            py-3.5
                            ${darkMode
                                ? "border-white/[0.06] bg-white/[0.02]"
                                : "border-slate-200 bg-slate-50/50"
                            }
                        `}
                    >
                        <span
                            className={`
                                text-[10px]
                                ${darkMode
                                    ? "text-slate-500"
                                    : "text-slate-600"
                                }
                            `}
                        >
                            Looking for something specific?
                        </span>

                        <button
                            type="button"
                            onClick={onSupportAction}
                            className={`
                                flex
                                items-center
                                gap-1.5
                                text-[10px]
                                font-bold
                                transition
                                ${darkMode
                                    ? "text-sky-400 hover:text-sky-300"
                                    : "text-sky-600 hover:text-sky-700"
                                }
                            `}
                        >
                            Ask Our Team

                            <ArrowRight size={11} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}