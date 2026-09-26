import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/* ============================================================
   GLOBAL SEO CONFIGURATION
   ============================================================ */

const SITE_URL = "https://abtechbridge.com";
const SITE_NAME = "AB Technologies";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

const DEFAULT_SEO = {
    title:
        "AB Technologies Nigeria | IT Procurement, Software, AI & Managed IT",
    description:
        "AB Technologies is a Nigeria-based technology company providing IT hardware procurement, custom software development, networking, cloud infrastructure, cybersecurity, AI automation and managed IT services for businesses and organizations.",
};

/* ============================================================
   PUBLIC SEO ROUTES
   ============================================================ */

const SEO_ROUTES = {
    "/": DEFAULT_SEO,

    // ============================================================
    // SERVICES
    // ============================================================

    "/services/hardware-procurement": {
        title:
            "IT Hardware Procurement in Nigeria | AB Technologies",
        description:
            "AB Technologies provides IT hardware procurement in Nigeria, helping businesses and institutions source computers, servers, networking equipment and enterprise technology.",
    },

    "/services/networking": {
        title:
            "Networking & IT Infrastructure in Nigeria | AB Technologies",
        description:
            "AB Technologies designs, deploys and supports secure business networks, connectivity infrastructure and enterprise networking solutions for organizations in Nigeria.",
    },

    "/services/software-solutions": {
        title:
            "Custom Software Development in Nigeria | AB Technologies",
        description:
            "AB Technologies develops custom web applications, business software, digital platforms and technology systems for businesses and organizations in Nigeria.",
    },

    "/services/security-communications": {
        title:
            "Security & Communication Solutions Nigeria | AB Technologies",
        description:
            "AB Technologies provides surveillance, security and business communication technology solutions for companies, institutions and organizations in Nigeria.",
    },

    "/services/corporate-procurement": {
        title:
            "Corporate IT Procurement in Nigeria | AB Technologies",
        description:
            "AB Technologies provides structured corporate IT procurement, technology sourcing and supplier coordination for businesses, institutions and organizations in Nigeria.",
    },

    "/services/cloud-managed-it": {
        title:
            "Cloud & Managed IT Services Nigeria | AB Technologies",
        description:
            "AB Technologies provides cloud infrastructure, hosting, managed IT and technology support services for businesses and organizations in Nigeria.",
    },

    "/services/ai-automation": {
        title:
            "AI Automation Solutions in Nigeria | AB Technologies",
        description:
            "AB Technologies delivers AI automation, intelligent workflows and practical artificial intelligence solutions that help businesses streamline operations and improve productivity.",
    },

    "/services/it-deployment-support": {
        title:
            "IT Deployment & Technical Support Nigeria | AB Technologies",
        description:
            "Professional IT deployment, installation, configuration and technical support services for businesses, institutions and organizations in Nigeria.",
    },

    // ============================================================
    // PROCUREMENT
    // ============================================================

    "/procurement/institutional": {
        title:
            "Institutional Technology Procurement Nigeria | AB Technologies",
        description:
            "AB Technologies provides structured technology procurement services for institutions, organizations and large-scale IT deployments across Nigeria.",
    },

    "/procurement/suppliers": {
        title:
            "Technology Supplier Sourcing Nigeria | AB Technologies",
        description:
            "AB Technologies helps organizations identify, evaluate and coordinate reliable technology suppliers for hardware, infrastructure and business IT procurement.",
    },

    "/procurement/verification": {
        title:
            "IT Procurement Verification Services | AB Technologies",
        description:
            "Improve procurement confidence with technology specification checks, supplier verification and equipment verification services from AB Technologies.",
    },

    "/procurement/hardware": {
        title:
            "Business IT Hardware Sourcing Nigeria | AB Technologies",
        description:
            "Source computers, laptops, servers, networking equipment and enterprise technology hardware for your organization through AB Technologies.",
    },

    "/procurement/international": {
        title:
            "International Technology Sourcing Nigeria | AB Technologies",
        description:
            "AB Technologies supports international sourcing and procurement of technology equipment for Nigerian businesses, institutions and organizations.",
    },

    "/procurement/quotations": {
        title:
            "IT Procurement Quotations Nigeria | AB Technologies",
        description:
            "Request structured technology procurement quotations for computers, servers, networking equipment, infrastructure and other business IT requirements.",
    },

    "/procurement/logistics": {
        title:
            "Technology Procurement & Logistics Nigeria | AB Technologies",
        description:
            "AB Technologies coordinates technology sourcing, procurement and logistics for business and institutional IT deployments.",
    },

    // ============================================================
    // SOLUTIONS
    // ============================================================

    "/solutions/software": {
        title:
            "Business Software Solutions Nigeria | AB Technologies",
        description:
            "AB Technologies builds custom business software, web platforms and digital systems designed to improve operations, productivity and organizational growth.",
    },

    "/solutions/cloud-infrastructure": {
        title:
            "Cloud Infrastructure Solutions Nigeria | AB Technologies",
        description:
            "Build scalable cloud infrastructure, hosting environments and modern IT systems with AB Technologies.",
    },

    "/solutions/ai": {
        title:
            "Artificial Intelligence Solutions Nigeria | AB Technologies",
        description:
            "AB Technologies delivers practical AI solutions including intelligent automation, digital assistants, workflow automation and AI-powered business systems.",
    },

    "/solutions/communications": {
        title:
            "Business Communication Solutions Nigeria | AB Technologies",
        description:
            "Modern business communication technology and connectivity infrastructure for companies, institutions and distributed teams.",
    },

    "/solutions/business-systems": {
        title:
            "Business Systems & Digital Platforms | AB Technologies",
        description:
            "AB Technologies develops integrated business systems and digital platforms that simplify operations, connect workflows and improve productivity.",
    },

    "/solutions/automation": {
        title:
            "Business Process Automation Nigeria | AB Technologies",
        description:
            "Automate repetitive business processes, connect workflows and improve operational efficiency with intelligent automation solutions from AB Technologies.",
    },

    "/solutions/security": {
        title:
            "Cybersecurity Solutions in Nigeria | AB Technologies",
        description:
            "Protect business systems, networks, infrastructure and digital operations with practical cybersecurity and technology security solutions.",
    },

    "/solutions/managed-it": {
        title:
            "Managed IT Services in Nigeria | AB Technologies",
        description:
            "AB Technologies provides managed IT services, technology administration, infrastructure management and technical support for growing organizations.",
    },

    // ============================================================
    // INDUSTRIES
    // ============================================================

    "/industries/business": {
        title:
            "Business Technology Solutions Nigeria | AB Technologies",
        description:
            "Software, IT infrastructure, procurement, cloud and managed technology solutions designed for businesses operating in Nigeria.",
    },

    "/industries/healthcare": {
        title:
            "Healthcare Technology Solutions Nigeria | AB Technologies",
        description:
            "Technology infrastructure, software, procurement and IT solutions designed to support healthcare organizations and modern healthcare operations.",
    },

    "/industries/government": {
        title:
            "Government Technology Solutions Nigeria | AB Technologies",
        description:
            "Technology procurement, infrastructure and digital solutions designed for government agencies and public-sector organizations.",
    },

    "/industries/retail": {
        title:
            "Retail Technology Solutions Nigeria | AB Technologies",
        description:
            "Digital systems, infrastructure, business software and technology solutions that help retail organizations operate efficiently and scale.",
    },

    "/industries/education": {
        title:
            "Education Technology Solutions Nigeria | AB Technologies",
        description:
            "Software, IT infrastructure, hardware procurement and digital technology solutions for schools, universities and educational institutions.",
    },

    "/industries/manufacturing": {
        title:
            "Manufacturing Technology Solutions | AB Technologies",
        description:
            "Technology infrastructure, automation, software and digital systems designed for modern manufacturing businesses and industrial operations.",
    },

    "/industries/ngos": {
        title:
            "Technology Solutions for NGOs Nigeria | AB Technologies",
        description:
            "Practical software, procurement, cloud infrastructure and IT solutions designed for NGOs, nonprofits and development organizations.",
    },

    "/industries/startups": {
        title:
            "Technology Solutions for Startups Nigeria | AB Technologies",
        description:
            "Scalable software, cloud infrastructure, IT procurement and technology services designed for startups and growing companies.",
    },

    // ============================================================
    // ABOUT
    // ============================================================

    "/about/who-we-are": {
        title:
            "About AB Technologies Nigeria | Who We Are",
        description:
            "Learn about AB Technologies, a Nigeria-based technology company providing IT procurement, software development, infrastructure, cloud, security, AI and managed technology services.",
    },

    "/about/why-choose-us": {
        title:
            "Why Choose AB Technologies Nigeria",
        description:
            "Discover how AB Technologies combines technology expertise, procurement capabilities, software development and practical digital solutions for organizations.",
    },

    "/about/capabilities": {
        title:
            "Technology Capabilities | AB Technologies Nigeria",
        description:
            "Explore AB Technologies capabilities across software development, IT hardware procurement, networking, cloud, cybersecurity, AI automation and managed IT.",
    },

    "/about/partners": {
        title:
            "Technology Partners & Suppliers | AB Technologies",
        description:
            "Learn about AB Technologies' technology ecosystem, supplier relationships and approach to sourcing and delivering reliable technology solutions.",
    },

    "/about/approach": {
        title:
            "Our Technology Approach | AB Technologies Nigeria",
        description:
            "See how AB Technologies plans, sources, develops, deploys and supports technology solutions for businesses and organizations.",
    },

    // ============================================================
    // RESOURCES
    // ============================================================

    "/resources/buying-guides": {
        title:
            "Technology Buying Guides Nigeria | AB Technologies",
        description:
            "Practical technology buying guides for evaluating computers, hardware, networking equipment, infrastructure and business technology solutions.",
    },

    "/resources/procurement-guides": {
        title:
            "IT Procurement Guides Nigeria | AB Technologies",
        description:
            "Learn how to plan technology procurement, evaluate suppliers, compare equipment and make informed IT purchasing decisions.",
    },

    "/resources/case-studies": {
        title:
            "Technology Case Studies | AB Technologies",
        description:
            "Explore technology projects, implementation approaches, procurement solutions and digital systems delivered by AB Technologies.",
    },

    "/resources/technology-insights": {
        title:
            "Technology Insights Nigeria | AB Technologies",
        description:
            "Insights from AB Technologies covering software, IT procurement, infrastructure, cloud computing, cybersecurity, AI and business technology.",
    },

    "/resources/faqs": {
        title:
            "Technology & IT Services FAQs | AB Technologies",
        description:
            "Answers to common questions about AB Technologies, IT procurement, software development, cloud infrastructure, networking, AI and managed IT services.",
    },

    "/resources/blog": {
        title:
            "Technology Blog Nigeria | AB Technologies",
        description:
            "Articles and insights covering business technology, software development, IT procurement, cloud computing, cybersecurity, automation and artificial intelligence.",
    },

    "/resources/learning": {
        title:
            "Technology Learning Resources | AB Technologies",
        description:
            "Practical learning resources covering software development, IT infrastructure, cloud computing, artificial intelligence and modern digital skills.",
    },

    // ============================================================
    // CONTACT / SUPPORT
    // ============================================================

    "/contact": {
        title:
            "Contact AB Technologies Nigeria | Technology Solutions",
        description:
            "Contact AB Technologies to discuss IT procurement, software development, networking, cloud infrastructure, cybersecurity, AI automation and other technology requirements.",
    },

    "/support": {
        title:
            "Technology Support Nigeria | AB Technologies",
        description:
            "Get technical assistance and technology support from AB Technologies for your IT systems, infrastructure, software and technology services.",
    },

    "/support/ai": {
        title:
            "AB AI Technology Assistant | AB Technologies",
        description:
            "Talk with AB AI to explore AB Technologies services, technology requirements, procurement options, software projects and business technology solutions.",
    },
};

/* ============================================================
   PRIVATE / NON-INDEXABLE ROUTES
   ============================================================ */

const PRIVATE_PREFIXES = [
    "/portal",
    "/staff",
    "/payment",
    "/payments",
    "/proposals",
    "/track-procurement",
];

/* ============================================================
   META HELPERS
   ============================================================ */

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
    let canonical = document.head.querySelector(
        'link[rel="canonical"]'
    );

    if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
    }

    canonical.setAttribute("href", url);
}

/* ============================================================
   STRUCTURED DATA
   ============================================================ */

function setStructuredData(id, data) {
    let script = document.head.querySelector(`#${id}`);

    if (!script) {
        script = document.createElement("script");
        script.id = id;
        script.type = "application/ld+json";
        document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(data);
}

function removeStructuredData(id) {
    const script = document.head.querySelector(`#${id}`);

    if (script) {
        script.remove();
    }
}

/* ============================================================
   ORGANIZATION SCHEMA
   ============================================================ */

const ORGANIZATION_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "Organization",

    name: "AB Technologies",

    url: SITE_URL,

    logo: `${SITE_URL}/favicon-192x192.png`,

    image: DEFAULT_IMAGE,

    description:
        "AB Technologies is a Nigeria-based technology company providing IT procurement, software development, networking, cloud infrastructure, cybersecurity, AI automation and managed technology services.",

    areaServed: {
        "@type": "Country",
        name: "Nigeria",
    },

    knowsAbout: [
        "Information Technology",
        "IT Hardware Procurement",
        "Software Development",
        "Artificial Intelligence",
        "Business Automation",
        "Cloud Computing",
        "Cybersecurity",
        "Computer Networking",
        "Managed IT Services",
        "Technology Procurement",
    ],
};

/* ============================================================
   WEBSITE SCHEMA
   ============================================================ */

const WEBSITE_SCHEMA = {
    "@context": "https://schema.org",

    "@type": "WebSite",

    name: SITE_NAME,

    alternateName: [
        "AB Technologies Nigeria",
        "AB Technology",
    ],

    url: `${SITE_URL}/`,

    publisher: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
    },
};

/* ============================================================
   ROUTE SEO COMPONENT
   ============================================================ */

export default function RouteSEO() {
    const location = useLocation();

    useEffect(() => {
        /* ------------------------------------------------------------
           NORMALIZE PATH
           ------------------------------------------------------------ */

        const pathname =
            location.pathname === "/"
                ? "/"
                : location.pathname.replace(/\/+$/, "");

        /* ------------------------------------------------------------
           DETERMINE ROUTE TYPE
           ------------------------------------------------------------ */

        const seo = SEO_ROUTES[pathname];

        const isPrivatePrefix = PRIVATE_PREFIXES.some(
            (prefix) =>
                pathname === prefix ||
                pathname.startsWith(`${prefix}/`)
        );

        /*
         * Public procurement pages exist inside SEO_ROUTES.
         *
         * Any /procurement/... route that IS NOT explicitly defined
         * inside SEO_ROUTES is treated as a dynamic/private procurement
         * page.
         *
         * Examples:
         *
         * /procurement/hardware
         *      => PUBLIC
         *
         * /procurement/international
         *      => PUBLIC
         *
         * /procurement/ABC123PRIVATE-TOKEN
         *      => PRIVATE
         */

        const isDynamicProcurement =
            pathname.startsWith("/procurement/") &&
            !SEO_ROUTES[pathname];

        const isPrivate =
            isPrivatePrefix || isDynamicProcurement;

        /* ------------------------------------------------------------
           PRIVATE / TRANSACTIONAL ROUTES
           ------------------------------------------------------------ */

        if (isPrivate) {
            document.title = SITE_NAME;

            setMeta(
                'meta[name="robots"]',
                "content",
                "noindex, nofollow, noarchive"
            );

            setMeta(
                'meta[name="googlebot"]',
                "content",
                "noindex, nofollow, noarchive"
            );

            /*
             * Remove public-page structured data from private pages
             * when navigating inside the SPA.
             */

            removeStructuredData("ab-organization-schema");
            removeStructuredData("ab-website-schema");
            removeStructuredData("ab-webpage-schema");

            return;
        }

        /* ------------------------------------------------------------
           PUBLIC ROUTE
           ------------------------------------------------------------ */

        const data = seo || DEFAULT_SEO;

        const canonical =
            pathname === "/"
                ? `${SITE_URL}/`
                : `${SITE_URL}${pathname}`;

        /* ------------------------------------------------------------
           TITLE
           ------------------------------------------------------------ */

        document.title = data.title;

        /* ------------------------------------------------------------
           STANDARD META
           ------------------------------------------------------------ */

        setMeta(
            'meta[name="description"]',
            "content",
            data.description
        );

        setMeta(
            'meta[name="robots"]',
            "content",
            "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        );

        setMeta(
            'meta[name="googlebot"]',
            "content",
            "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        );

        /* ------------------------------------------------------------
           CANONICAL
           ------------------------------------------------------------ */

        setCanonical(canonical);

        /* ------------------------------------------------------------
           OPEN GRAPH
           ------------------------------------------------------------ */

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
            'meta[property="og:site_name"]',
            "content",
            SITE_NAME
        );

        setMeta(
            'meta[property="og:image"]',
            "content",
            DEFAULT_IMAGE
        );

        setMeta(
            'meta[property="og:image:alt"]',
            "content",
            "AB Technologies - Technology Solutions"
        );

        setMeta(
            'meta[property="og:locale"]',
            "content",
            "en_NG"
        );

        /* ------------------------------------------------------------
           TWITTER / X
           ------------------------------------------------------------ */

        setMeta(
            'meta[name="twitter:card"]',
            "content",
            "summary_large_image"
        );

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

        setMeta(
            'meta[name="twitter:image:alt"]',
            "content",
            "AB Technologies - Technology Solutions"
        );

        /* ------------------------------------------------------------
           ORGANIZATION STRUCTURED DATA
           ------------------------------------------------------------ */

        setStructuredData(
            "ab-organization-schema",
            ORGANIZATION_SCHEMA
        );

        /* ------------------------------------------------------------
           WEBSITE STRUCTURED DATA
           ------------------------------------------------------------ */

        setStructuredData(
            "ab-website-schema",
            WEBSITE_SCHEMA
        );

        /* ------------------------------------------------------------
           PAGE-SPECIFIC STRUCTURED DATA
           ------------------------------------------------------------ */

        const webpageSchema = {
            "@context": "https://schema.org",

            "@type":
                pathname === "/"
                    ? "WebPage"
                    : "WebPage",

            name: data.title,

            description: data.description,

            url: canonical,

            isPartOf: {
                "@type": "WebSite",
                name: SITE_NAME,
                url: `${SITE_URL}/`,
            },

            about: {
                "@type": "Organization",
                name: SITE_NAME,
                url: SITE_URL,
            },

            inLanguage: "en-NG",
        };

        setStructuredData(
            "ab-webpage-schema",
            webpageSchema
        );

    }, [location.pathname]);

    return null;
}