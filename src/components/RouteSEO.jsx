import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://abtechbridge.com";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

const DEFAULT_SEO = {
    title:
        "AB Technologies | IT Procurement, Software, Cloud, AI & Technology Solutions",
    description:
        "AB Technologies provides IT hardware procurement, custom software development, networking, cloud infrastructure, cybersecurity, AI automation and managed technology services for businesses and organizations.",
};

const SEO_ROUTES = {
    "/": DEFAULT_SEO,

    // ============================================================
    // SERVICES
    // ============================================================

    "/services/hardware-procurement": {
        title: "IT Hardware Procurement Services | AB Technologies",
        description:
            "Source reliable computers, servers, networking equipment and enterprise IT hardware with AB Technologies' professional technology procurement services.",
    },

    "/services/networking": {
        title: "Networking & IT Infrastructure Services | AB Technologies",
        description:
            "AB Technologies designs, deploys and supports secure business networks, connectivity infrastructure and enterprise networking solutions.",
    },

    "/services/software-solutions": {
        title: "Custom Software Development | AB Technologies",
        description:
            "AB Technologies develops custom web applications, business software and digital platforms designed around your organization's requirements.",
    },

    "/services/security-communications": {
        title: "Security & Communication Solutions | AB Technologies",
        description:
            "Deploy modern security, surveillance and communication technology with AB Technologies for businesses, institutions and organizations.",
    },

    "/services/corporate-procurement": {
        title: "Corporate IT Procurement Services | AB Technologies",
        description:
            "AB Technologies helps businesses and institutions source technology equipment through structured corporate IT procurement and supplier coordination.",
    },

    "/services/cloud-managed-it": {
        title: "Cloud & Managed IT Services | AB Technologies",
        description:
            "Cloud infrastructure, managed IT, hosting and technology support services designed to keep modern organizations secure, reliable and productive.",
    },

    "/services/ai-automation": {
        title: "AI & Business Automation Solutions | AB Technologies",
        description:
            "Use AI and intelligent automation to streamline operations, improve workflows and build smarter digital processes with AB Technologies.",
    },

    "/services/it-deployment-support": {
        title: "IT Deployment & Technical Support | AB Technologies",
        description:
            "Professional technology deployment, installation, configuration and ongoing IT support for businesses and organizations.",
    },

    // ============================================================
    // PROCUREMENT
    // ============================================================

    "/procurement/institutional": {
        title: "Institutional Technology Procurement | AB Technologies",
        description:
            "Technology procurement services for institutions, organizations and large-scale technology deployments.",
    },

    "/procurement/suppliers": {
        title: "Technology Supplier Sourcing | AB Technologies",
        description:
            "AB Technologies helps organizations identify and coordinate reliable suppliers for hardware, infrastructure and technology procurement.",
    },

    "/procurement/verification": {
        title: "Technology Procurement Verification | AB Technologies",
        description:
            "Improve procurement confidence with technology specification, supplier and equipment verification from AB Technologies.",
    },

    "/procurement/hardware": {
        title: "Business IT Hardware Sourcing | AB Technologies",
        description:
            "Source computers, networking equipment, servers and other business technology hardware through AB Technologies.",
    },

    "/procurement/international": {
        title: "International Technology Sourcing | AB Technologies",
        description:
            "AB Technologies supports international sourcing and procurement of technology equipment for businesses and institutions.",
    },

    "/procurement/quotations": {
        title: "Technology Procurement Quotations | AB Technologies",
        description:
            "Request structured technology procurement quotations for hardware, infrastructure and business IT requirements.",
    },

    "/procurement/logistics": {
        title: "Technology Procurement Logistics | AB Technologies",
        description:
            "Coordinate technology sourcing, procurement and logistics with AB Technologies for business and institutional deployments.",
    },

    // ============================================================
    // SOLUTIONS
    // ============================================================

    "/solutions/software": {
        title: "Business Software Solutions | AB Technologies",
        description:
            "Custom business software, web platforms and digital systems built to improve operations and support organizational growth.",
    },

    "/solutions/cloud-infrastructure": {
        title: "Cloud Infrastructure Solutions | AB Technologies",
        description:
            "Build scalable cloud infrastructure, hosting environments and modern IT systems with AB Technologies.",
    },

    "/solutions/ai": {
        title: "Artificial Intelligence Solutions | AB Technologies",
        description:
            "Practical AI solutions for business automation, intelligent workflows, digital assistants and modern technology operations.",
    },

    "/solutions/communications": {
        title: "Business Communication Solutions | AB Technologies",
        description:
            "Modern communication technology and infrastructure solutions for businesses, institutions and distributed teams.",
    },

    "/solutions/business-systems": {
        title: "Business Systems & Digital Platforms | AB Technologies",
        description:
            "AB Technologies develops integrated business systems and digital platforms that simplify operations and improve productivity.",
    },

    "/solutions/automation": {
        title: "Business Process Automation | AB Technologies",
        description:
            "Automate repetitive workflows and connect business processes with intelligent technology solutions from AB Technologies.",
    },

    "/solutions/security": {
        title: "Cybersecurity & Technology Security | AB Technologies",
        description:
            "Protect business systems, infrastructure and digital operations with practical cybersecurity and technology security solutions.",
    },

    "/solutions/managed-it": {
        title: "Managed IT Services | AB Technologies",
        description:
            "Reliable managed IT services, technology administration and technical support for growing businesses and organizations.",
    },

    // ============================================================
    // INDUSTRIES
    // ============================================================

    "/industries/business": {
        title: "Technology Solutions for Businesses | AB Technologies",
        description:
            "Software, infrastructure, procurement, cloud and managed technology solutions designed for modern businesses.",
    },

    "/industries/healthcare": {
        title: "Healthcare Technology Solutions | AB Technologies",
        description:
            "Technology infrastructure, software and IT solutions designed to support healthcare organizations and operations.",
    },

    "/industries/government": {
        title: "Government Technology Solutions | AB Technologies",
        description:
            "Technology procurement, infrastructure and digital solutions for government agencies and public-sector organizations.",
    },

    "/industries/retail": {
        title: "Retail Technology Solutions | AB Technologies",
        description:
            "Digital systems, infrastructure and technology solutions that help retail businesses operate efficiently and scale.",
    },

    "/industries/education": {
        title: "Education Technology Solutions | AB Technologies",
        description:
            "Software, IT infrastructure, procurement and digital technology solutions for schools and educational institutions.",
    },

    "/industries/manufacturing": {
        title: "Manufacturing Technology Solutions | AB Technologies",
        description:
            "Technology infrastructure, automation and digital systems for modern manufacturing businesses and operations.",
    },

    "/industries/ngos": {
        title: "Technology Solutions for NGOs | AB Technologies",
        description:
            "Practical software, procurement, cloud and IT solutions for NGOs and nonprofit organizations.",
    },

    "/industries/startups": {
        title: "Technology Solutions for Startups | AB Technologies",
        description:
            "Scalable software, cloud, infrastructure and technology services designed for startups and growing companies.",
    },

    // ============================================================
    // ABOUT
    // ============================================================

    "/about/who-we-are": {
        title: "About AB Technologies | Who We Are",
        description:
            "Learn about AB Technologies and our approach to IT procurement, software, infrastructure, cloud, AI and technology services.",
    },

    "/about/why-choose-us": {
        title: "Why Choose AB Technologies",
        description:
            "Discover how AB Technologies combines technology expertise, procurement capabilities and practical digital solutions for organizations.",
    },

    "/about/capabilities": {
        title: "Our Technology Capabilities | AB Technologies",
        description:
            "Explore AB Technologies' capabilities across software, hardware procurement, networking, cloud, security, AI and managed IT.",
    },

    "/about/partners": {
        title: "Technology Partners | AB Technologies",
        description:
            "Learn about AB Technologies' technology ecosystem, supplier relationships and approach to delivering reliable solutions.",
    },

    "/about/approach": {
        title: "Our Approach | AB Technologies",
        description:
            "See how AB Technologies plans, sources, builds, deploys and supports technology solutions for businesses and organizations.",
    },

    // ============================================================
    // RESOURCES
    // ============================================================

    "/resources/buying-guides": {
        title: "Technology Buying Guides | AB Technologies",
        description:
            "Practical guides for evaluating and purchasing business hardware, infrastructure and technology solutions.",
    },

    "/resources/procurement-guides": {
        title: "IT Procurement Guides | AB Technologies",
        description:
            "Learn how to plan technology procurement, evaluate suppliers and make informed IT purchasing decisions.",
    },

    "/resources/case-studies": {
        title: "Technology Case Studies | AB Technologies",
        description:
            "Explore technology projects, implementation approaches and business solutions from AB Technologies.",
    },

    "/resources/technology-insights": {
        title: "Technology Insights | AB Technologies",
        description:
            "Insights on software, IT procurement, infrastructure, cloud computing, cybersecurity, AI and business technology.",
    },

    "/resources/faqs": {
        title: "Technology FAQs | AB Technologies",
        description:
            "Answers to common questions about AB Technologies, IT procurement, software development, cloud, infrastructure and technology services.",
    },

    "/resources/blog": {
        title: "Technology Blog | AB Technologies",
        description:
            "Articles and insights covering business technology, software, IT procurement, cloud, cybersecurity and artificial intelligence.",
    },

    "/resources/learning": {
        title: "Technology Learning Resources | AB Technologies",
        description:
            "Practical technology learning resources covering software, infrastructure, cloud, AI and modern digital skills.",
    },

    // ============================================================
    // CONTACT / SUPPORT
    // ============================================================

    "/contact": {
        title: "Contact AB Technologies | Discuss Your Technology Needs",
        description:
            "Contact AB Technologies to discuss IT procurement, software development, networking, cloud, AI automation and other technology requirements.",
    },

    "/support": {
        title: "Technology Support | AB Technologies",
        description:
            "Get technology support and assistance from AB Technologies for your systems, services and technology solutions.",
    },

    "/support/ai": {
        title: "AB AI Technology Assistant | AB Technologies",
        description:
            "Talk with AB AI to explore AB Technologies services, technology requirements, procurement and project solutions.",
    },
};

// ============================================================
// META HELPERS
// ============================================================

function setMeta(selector, attribute, value) {
    let element = document.head.querySelector(selector);

    if (!element) {
        element = document.createElement("meta");

        if (selector.includes("property=")) {
            const match = selector.match(/property="([^"]+)"/);
            if (match) {
                element.setAttribute("property", match[1]);
            }
        } else {
            const match = selector.match(/name="([^"]+)"/);
            if (match) {
                element.setAttribute("name", match[1]);
            }
        }

        document.head.appendChild(element);
    }

    element.setAttribute(attribute, value);
}

function setCanonical(url) {
    let canonical = document.head.querySelector('link[rel="canonical"]');

    if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
    }

    canonical.setAttribute("href", url);
}

// ============================================================
// COMPONENT
// ============================================================

export default function RouteSEO() {
    const location = useLocation();

    useEffect(() => {
        const pathname =
            location.pathname === "/"
                ? "/"
                : location.pathname.replace(/\/+$/, "");

        const seo = SEO_ROUTES[pathname];

        // ----------------------------------------------------------
        // PRIVATE / TRANSACTIONAL ROUTES
        // ----------------------------------------------------------

        const privatePrefixes = [
            "/portal",
            "/staff",
            "/payment",
            "/payments",
            "/proposals",
            "/track-procurement",
        ];

        const isPrivate =
            privatePrefixes.some(
                (prefix) =>
                    pathname === prefix ||
                    pathname.startsWith(`${prefix}/`)
            ) ||
            /^\/procurement\/[^/]+$/.test(pathname);

        if (isPrivate) {
            document.title = "AB Technologies";

            setMeta(
                'meta[name="robots"]',
                "content",
                "noindex, nofollow"
            );

            return;
        }

        // ----------------------------------------------------------
        // PUBLIC ROUTE
        // ----------------------------------------------------------

        const data = seo || DEFAULT_SEO;

        const canonical =
            pathname === "/"
                ? `${SITE_URL}/`
                : `${SITE_URL}${pathname}`;

        document.title = data.title;

        setMeta(
            'meta[name="description"]',
            "content",
            data.description
        );

        setMeta(
            'meta[name="robots"]',
            "content",
            "index, follow, max-image-preview:large"
        );

        setCanonical(canonical);

        // Open Graph
        setMeta(
            'meta[property="og:title"]',
            "content",
            data.title
        );

        setMeta(
            'meta[property="og:description"]',
            "content",
            data.description
        );

        setMeta(
            'meta[property="og:url"]',
            "content",
            canonical
        );

        setMeta(
            'meta[property="og:type"]',
            "content",
            "website"
        );

        setMeta(
            'meta[property="og:image"]',
            "content",
            DEFAULT_IMAGE
        );

        // Twitter / X
        setMeta(
            'meta[name="twitter:title"]',
            "content",
            data.title
        );

        setMeta(
            'meta[name="twitter:description"]',
            "content",
            data.description
        );

        setMeta(
            'meta[name="twitter:image"]',
            "content",
            DEFAULT_IMAGE
        );
    }, [location.pathname]);

    return null;
}