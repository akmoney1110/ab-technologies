import { useEffect, useState } from "react";
import "./App.css";

import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import ABNav from "./components/ABNav";
import Home from "./components/Home";
import ProcurementTracking from "./components/ProcurementTracking";


// ============================================================
// SERVICES
// ============================================================

import HardwareProcurement from "./components/services/HardwareProcurement";
import Networking from "./components/services/Networking";
import SoftwareSolutions from "./components/services/SoftwareSolutions";
import SecurityCommunications from "./components/services/SecurityCommunications";
import CorporateProcurement from "./components/services/CorporateProcurement";
import CloudManaged from "./components/services/CloudManaged";
import AiAutomation from "./components/services/AiAutomation";
import ITDeploymentSupport from "./components/services/ITDeploymentSupport";


// ============================================================
// PROCUREMENT
// ============================================================

import Institutional from "./components/services/Institutional";
import Suppliers from "./components/procurement/Suppliers";
import Verification from "./components/procurement/Verification";
import Hardware from "./components/procurement/Hardware";
import International from "./components/procurement/InternationalSourcing";
import Quotations from "./components/procurement/Quotations";
import Logistic from "./components/procurement/Logistic";


// ============================================================
// SOLUTIONS
// ============================================================

import Software from "./components/solutions/Software";
import Cloud from "./components/solutions/Cloud";
import Communications from "./components/solutions/Communications";
import Ai from "./components/solutions/Ai";
import BusinessSystems from "./components/solutions/BusinessSystems";
import Automation from "./components/solutions/Automation";
import Security from "./components/solutions/Security";
import ManagedIt from "./components/solutions/ManagedIt";


// ============================================================
// INDUSTRIES
// ============================================================

import Healthcare from "./components/industries/Healthcare";
import Government from "./components/industries/Government";
import Retail from "./components/industries/Retail";
import Education from "./components/industries/Education";
import Manufacturing from "./components/industries/Manufacturing";
import Ngos from "./components/industries/Ngos";
import Startups from "./components/industries/Startups";
import Business from "./components/industries/Business";


// ============================================================
// ABOUT
// ============================================================

import Who from "./components/about/Who";
import Why from "./components/about/Why";
import Capabilities from "./components/about/Capabilities";
import Partners from "./components/about/Partners";
import Approach from "./components/about/Approach";


// ============================================================
// RESOURCES
// ============================================================

import BuyingGuides from "./components/resource/BuyingGuides";
import ProcurementGuides from "./components/resource/ProcurementGuides";
import CaseStudies from "./components/resource/CaseStudies";
import TechnologyInsights from "./components/resource/TechnologyInsights";
import Faqs from "./components/resource/Faqs";
import Blog from "./components/resource/Blog";
import Learning from "./components/resource/Learning";


// ============================================================
// SUPPORT / CONTACT
// ============================================================

import Support from "./components/Support";
import Contact from "./components/Contact";
import AI from "./components/AI";


// ============================================================
// PORTAL / PAYMENT
// ============================================================

import PaymentDetail from "./pages/portal/PaymentDetail";
import PaymentHistory from "./pages/portal/PaymentHistory";
import PortalLogin from "./components/PortalLogin";
import ClientDashboard from "./pages/portal/ClientDashboard";
import StaffProjects from "./pages/portal/StaffProjects";
import StaffProcurement from "./pages/portal/StaffProcurement";

import ProjectWorkspace from "./pages/portal/ProjectWorkspace";
import PaymentCallback from "./pages/portal/PaymentCallback";

import Project from "./pages/portal/Project";
import ProcurementList from "./pages/portal/ProcurementList";
import ProcurementDetails from "./pages/portal/ProcurementDetails";

import ClientProposal from "./components/ClientProposal";
import ClientProcurementProposal from "./components/ClientProcurementProposal";
import RouteSEO from "./components/RouteSEO";


// ============================================================
// PUBLIC PROCUREMENT ROUTES
// ============================================================
//
// These are normal public website pages.
//
// They MUST:
// - display ABNav
// - behave like the rest of the public website
//
// They must NOT be confused with:
//
// /procurement/:publicToken
//
// which is a transactional/client procurement page.
// ============================================================

const PUBLIC_PROCUREMENT_ROUTES = [
  "/procurement/institutional",
  "/procurement/suppliers",
  "/procurement/verification",
  "/procurement/hardware",
  "/procurement/international",
  "/procurement/quotations",
  "/procurement/logistics",
];


// ============================================================
// APP CONTENT
// ============================================================

function AppContent() {

  // ==========================================================
  // THEME
  // ==========================================================
  //
  // DARK MODE IS THE DEFAULT.
  //
  // We initialize directly from localStorage when available.
  //
  // If the user has never selected a theme before,
  // the website starts in dark mode.
  // ==========================================================

  const [theme, setTheme] = useState(() => {

    try {

      const savedTheme = localStorage.getItem("ab-theme");

      if (
        savedTheme === "dark" ||
        savedTheme === "light"
      ) {
        return savedTheme;
      }

    } catch (error) {

      console.warn(
        "Unable to read saved theme:",
        error
      );

    }

    return "dark";

  });


  const location = useLocation();


  // ==========================================================
  // APPLY THEME
  // ==========================================================

  useEffect(() => {

    const root = document.documentElement;

    if (theme === "dark") {

      root.classList.add("dark");
      root.style.colorScheme = "dark";

    } else {

      root.classList.remove("dark");
      root.style.colorScheme = "light";

    }


    // Save user's choice.
    try {

      localStorage.setItem(
        "ab-theme",
        theme
      );

    } catch (error) {

      console.warn(
        "Unable to save theme:",
        error
      );

    }

  }, [theme]);


  // ==========================================================
  // CURRENT PATH
  // ==========================================================

  const pathname =
    location.pathname.toLowerCase();


  // ==========================================================
  // NAVIGATION VISIBILITY
  // ==========================================================
  //
  // ABNav SHOULD appear on:
  //
  // /
  // /services/*
  // /procurement/institutional
  // /procurement/suppliers
  // /procurement/verification
  // /procurement/hardware
  // /procurement/international
  // /procurement/quotations
  // /procurement/logistics
  // /solutions/*
  // /industries/*
  // /about/*
  // /resources/*
  // /contact
  // /support
  //
  //
  // ABNav SHOULD NOT appear on:
  //
  // /portal/*
  // /staff/*
  // /track-procurement
  // /proposals/:publicToken
  // /procurement/:publicToken
  // /payment/*
  // /payments/*
  // ==========================================================


  // ----------------------------------------------------------
  // PRIVATE / TRANSACTIONAL PREFIXES
  // ----------------------------------------------------------

  const hiddenNavPrefixes = [
    "/portal",
    "/staff",
    "/track-procurement",
    "/proposals",
    "/payment",
    "/payments",
  ];


  // ----------------------------------------------------------
  // CHECK PRIVATE PREFIXES
  // ----------------------------------------------------------

  const isHiddenPrefix =
    hiddenNavPrefixes.some(
      (prefix) =>
        pathname === prefix ||
        pathname.startsWith(
          `${prefix}/`
        )
    );


  // ----------------------------------------------------------
  // CHECK PUBLIC PROCUREMENT ROUTES
  // ----------------------------------------------------------

  const isPublicProcurementRoute =
    PUBLIC_PROCUREMENT_ROUTES.includes(
      pathname
    );


  // ----------------------------------------------------------
  // DYNAMIC PROCUREMENT PAGE
  // ----------------------------------------------------------
  //
  // Examples:
  //
  // /procurement/abc123
  // /procurement/2da74c...
  //
  // These should NOT display ABNav.
  //
  // But:
  //
  // /procurement/hardware
  // /procurement/international
  //
  // etc. SHOULD display it.
  // ----------------------------------------------------------

  const isDynamicProcurement =
    pathname.startsWith("/procurement/") &&
    !isPublicProcurementRoute;


  // ----------------------------------------------------------
  // FINAL NAV VISIBILITY
  // ----------------------------------------------------------

  const shouldHidePublicNav =
    isHiddenPrefix ||
    isDynamicProcurement;


  // ==========================================================
  // APP
  // ==========================================================

  return (

    <div
      className="
        min-h-screen
        bg-white
        text-slate-900
        dark:bg-[#020611]
        dark:text-white
      "
    >

      {/* =====================================================
          PUBLIC NAVIGATION
      ====================================================== */}

      {!shouldHidePublicNav && (

        <ABNav
          theme={theme}
          setTheme={setTheme}
        />

      )}


      {/* =====================================================
          SEO
      ====================================================== */}

      <RouteSEO />


      {/* =====================================================
          ROUTES
      ====================================================== */}

      <Routes>


        {/* ===================================================
            HOME
        ==================================================== */}

        <Route
          path="/"
          element={<Home />}
        />


        {/* ===================================================
            SERVICES
        ==================================================== */}

        <Route
          path="/services/hardware-procurement"
          element={<HardwareProcurement />}
        />

        <Route
          path="/services/networking"
          element={<Networking />}
        />

        <Route
          path="/services/software-solutions"
          element={<SoftwareSolutions />}
        />

        <Route
          path="/services/security-communications"
          element={<SecurityCommunications />}
        />

        <Route
          path="/services/corporate-procurement"
          element={<CorporateProcurement />}
        />

        <Route
          path="/services/cloud-managed-it"
          element={<CloudManaged />}
        />

        <Route
          path="/services/ai-automation"
          element={<AiAutomation />}
        />

        <Route
          path="/services/it-deployment-support"
          element={<ITDeploymentSupport />}
        />


        {/* ===================================================
            PROCUREMENT TRACKING
        ==================================================== */}

        <Route
          path="/track-procurement"
          element={<ProcurementTracking />}
        />


        {/* ===================================================
            PUBLIC PROCUREMENT / SOURCING
        ==================================================== */}

        <Route
          path="/procurement/institutional"
          element={<Institutional />}
        />

        <Route
          path="/procurement/suppliers"
          element={<Suppliers />}
        />

        <Route
          path="/procurement/verification"
          element={<Verification />}
        />

        <Route
          path="/procurement/hardware"
          element={<Hardware />}
        />

        <Route
          path="/procurement/international"
          element={<International />}
        />

        <Route
          path="/procurement/quotations"
          element={<Quotations />}
        />

        <Route
          path="/procurement/logistics"
          element={<Logistic />}
        />


        {/* ===================================================
            SOLUTIONS
        ==================================================== */}

        <Route
          path="/solutions/software"
          element={<Software />}
        />

        <Route
          path="/solutions/cloud-infrastructure"
          element={<Cloud />}
        />

        <Route
          path="/solutions/ai"
          element={<Ai />}
        />

        <Route
          path="/solutions/communications"
          element={<Communications />}
        />

        <Route
          path="/solutions/business-systems"
          element={<BusinessSystems />}
        />

        <Route
          path="/solutions/automation"
          element={<Automation />}
        />

        <Route
          path="/solutions/security"
          element={<Security />}
        />

        <Route
          path="/solutions/managed-it"
          element={<ManagedIt />}
        />


        {/* ===================================================
            INDUSTRIES
        ==================================================== */}

        <Route
          path="/industries/business"
          element={<Business />}
        />

        <Route
          path="/industries/healthcare"
          element={<Healthcare />}
        />

        <Route
          path="/industries/government"
          element={<Government />}
        />

        <Route
          path="/industries/retail"
          element={<Retail />}
        />

        <Route
          path="/industries/education"
          element={<Education />}
        />

        <Route
          path="/industries/manufacturing"
          element={<Manufacturing />}
        />

        <Route
          path="/industries/ngos"
          element={<Ngos />}
        />

        <Route
          path="/industries/startups"
          element={<Startups />}
        />


        {/* ===================================================
            ABOUT
        ==================================================== */}

        <Route
          path="/about/who-we-are"
          element={<Who />}
        />

        <Route
          path="/about/why-choose-us"
          element={<Why />}
        />

        <Route
          path="/about/capabilities"
          element={<Capabilities />}
        />

        <Route
          path="/about/partners"
          element={<Partners />}
        />

        <Route
          path="/about/approach"
          element={<Approach />}
        />


        {/* ===================================================
            RESOURCES
        ==================================================== */}

        <Route
          path="/resources/buying-guides"
          element={<BuyingGuides />}
        />

        <Route
          path="/resources/procurement-guides"
          element={<ProcurementGuides />}
        />

        <Route
          path="/resources/case-studies"
          element={<CaseStudies />}
        />

        <Route
          path="/resources/technology-insights"
          element={<TechnologyInsights />}
        />

        <Route
          path="/resources/faqs"
          element={<Faqs />}
        />

        <Route
          path="/resources/blog"
          element={<Blog />}
        />

        <Route
          path="/resources/learning"
          element={<Learning />}
        />


        {/* ===================================================
            CONTACT / SUPPORT
        ==================================================== */}

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/support"
          element={<Support />}
        />

        <Route
          path="/support/ai"
          element={<AI />}
        />


        {/* ===================================================
            CLIENT PROPOSAL
        ==================================================== */}

        <Route
          path="/proposals/:publicToken"
          element={<ClientProposal />}
        />


        {/* ===================================================
            CLIENT PORTAL
        ==================================================== */}

        <Route
          path="/portal"
          element={<PortalLogin />}
        />

        <Route
          path="/portal/dashboard"
          element={<ClientDashboard />}
        />

        <Route
          path="/portal/projects"
          element={<Project />}
        />

        <Route
          path="/portal/staffprojects"
          element={<StaffProjects />}
        />


        {/* ===================================================
            PROJECT WORKSPACE
        ==================================================== */}

        <Route
          path="/portal/projects/:projectId"
          element={<ProjectWorkspace />}
        />


        {/* ===================================================
            CLIENT PROCUREMENT PROPOSAL

            Keeping "proects" exactly as it exists in your
            current application so existing links do not break.
        ==================================================== */}

        <Route
          path="/portal/proects/:projectId"
          element={<ClientProcurementProposal />}
        />


        {/* ===================================================
            PORTAL PROCUREMENT
        ==================================================== */}

        <Route
          path="/portal/procurement"
          element={<ProcurementList />}
        />


        {/* ===================================================
            DYNAMIC PUBLIC PROCUREMENT DETAILS

            ABNav is hidden on this route.
        ==================================================== */}

        <Route
          path="/procurement/:publicToken"
          element={<ProcurementDetails />}
        />


        {/* ===================================================
            STAFF PROCUREMENT
        ==================================================== */}

        <Route
          path="/staff/procurement"
          element={<StaffProcurement />}
        />


        {/* ===================================================
            PAYMENT CALLBACK
        ==================================================== */}

        <Route
          path="/payment/callback"
          element={<PaymentCallback />}
        />


        {/* ===================================================
            PAYMENT HISTORY
        ==================================================== */}

        <Route
          path="/portal/payments"
          element={<PaymentHistory />}
        />


        {/* ===================================================
            PAYMENT DETAILS
        ==================================================== */}

        <Route
          path="/portal/projects/:projectId/payments/:paymentId"
          element={<PaymentDetail />}
        />


      </Routes>

    </div>

  );

}


// ============================================================
// APP
// ============================================================

function App() {

  return <AppContent />;

}


export default App;