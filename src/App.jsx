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
// APP CONTENT
// ============================================================

function AppContent() {

  // ==========================================================
  // THEME
  // ==========================================================
  //
  // IMPORTANT:
  // The website starts in DARK MODE.
  //
  // This matches the default appearance of the rest of
  // AB Technologies.
  //
  // The user can still switch the theme through ABNav.
  // ==========================================================

  const [theme, setTheme] = useState("dark");

  const location = useLocation();


  // ==========================================================
  // APPLY THEME TO HTML ELEMENT
  // ==========================================================

  useEffect(() => {

    document.documentElement.classList.toggle(
      "dark",
      theme === "dark"
    );

    // Optional browser color-scheme hint.
    // This helps browser-native controls use the correct
    // dark/light appearance as well.
    document.documentElement.style.colorScheme =
      theme === "dark"
        ? "dark"
        : "light";

  }, [theme]);


  // ==========================================================
  // NAVIGATION VISIBILITY
  // ==========================================================
  //
  // ABNav is the PUBLIC WEBSITE navigation.
  //
  // We do NOT want the public navigation appearing inside:
  //
  // - Client portal
  // - Staff portal
  // - Procurement tracking
  // - Client proposal pages
  // - Client procurement proposal pages
  // - Procurement details
  // - Payment pages
  // - Payment callbacks
  //
  // These pages are transactional/workspace pages and should
  // use their own layout/navigation.
  // ==========================================================

  const pathname = location.pathname.toLowerCase();


  // ----------------------------------------------------------
  // ROUTE GROUPS THAT MUST NOT DISPLAY ABNav
  // ----------------------------------------------------------

  const hiddenNavPrefixes = [

    // Client portal
    "/portal",

    // Staff portal
    "/staff",

    // Public procurement tracking
    "/track-procurement",

    // Public client proposal
    "/proposals",

    // Procurement details / client quotation
    "/procurement/",

    // Payment callback/pages
    "/payment",

    // Future payment route support
    "/payments",

  ];


  // ----------------------------------------------------------
  // DETERMINE WHETHER NAV SHOULD BE HIDDEN
  // ----------------------------------------------------------

  const shouldHidePublicNav = hiddenNavPrefixes.some(
    (prefix) => {

      // Exact match
      if (pathname === prefix) {
        return true;
      }

      // Example:
      //
      // /portal/dashboard
      // /portal/projects
      // /portal/payments
      //
      if (
        pathname.startsWith(
          `${prefix}/`
        )
      ) {
        return true;
      }

      // Prefixes already ending with /
      //
      // Example:
      //
      // /procurement/abc123
      //
      if (
        prefix.endsWith("/") &&
        pathname.startsWith(prefix)
      ) {
        return true;
      }

      return false;
    }
  );


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

          Only display ABNav on normal public website pages.
      ====================================================== */}

      {!shouldHidePublicNav && (

        <ABNav
          theme={theme}
          setTheme={setTheme}
        />

      )}


      {/* =====================================================
          ROUTES
      ====================================================== */}
      <RouteSEO />
      <Routes>


        {/* ===================================================
            PUBLIC WEBSITE
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


        {/* ===================================================
            PROCUREMENT TRACKING

            ABNav hidden
        ==================================================== */}

        <Route
          path="/track-procurement"
          element={
            <ProcurementTracking />
          }
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
          path="/contact"
          element={<Contact />}
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
            PROCUREMENT PUBLIC PAGES
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


        {/* ===================================================
            CLIENT PROPOSAL

            ABNav hidden
        ==================================================== */}

        <Route
          path="/proposals/:publicToken"
          element={<ClientProposal />}
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
            SUPPORT
        ==================================================== */}

        <Route
          path="/support"
          element={<Support />}
        />


        {/* ===================================================
            CLIENT PORTAL

            ABNav hidden from ALL /portal routes
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


        {/* ===================================================
            STAFF PROJECTS
        ==================================================== */}

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

            NOTE:
            This path is preserved exactly from your
            existing App.js.

            You currently have "proects" here rather than
            "projects". I have not silently changed the URL
            because another part of your application may
            already depend on it.
        ==================================================== */}

        <Route
          path="/portal/proects/:projectId"
          element={<ClientProcurementProposal />}
        />


        {/* ===================================================
            PORTAL PROCUREMENT LIST
        ==================================================== */}

        <Route
          path="/portal/procurement"
          element={<ProcurementList />}
        />


        {/* ===================================================
            PUBLIC PROCUREMENT DETAILS / QUOTATION

            ABNav hidden
        ==================================================== */}

        <Route
          path="/procurement/:publicToken"
          element={
            <ProcurementDetails />
          }
        />


        {/* ===================================================
            STAFF PROCUREMENT

            ABNav hidden
        ==================================================== */}

        <Route
          path="/staff/procurement"
          element={
            <StaffProcurement />
          }
        />


        {/* ===================================================
            PAYMENT CALLBACK

            ABNav hidden
        ==================================================== */}

        <Route
          path="payment/callback"
          element={<PaymentCallback />}
        />


        {/* ===================================================
            PAYMENT HISTORY

            ABNav hidden because this is under /portal
        ==================================================== */}

        <Route
          path="/portal/payments"
          element={<PaymentHistory />}
        />


        {/* ===================================================
            PAYMENT DETAILS

            ABNav hidden because this is under /portal
        ==================================================== */}

        <Route
          path="/portal/projects/:projectId/payments/:paymentId"
          element={<PaymentDetail />}
        />


        {/* ===================================================
            AI SUPPORT
        ==================================================== */}

        <Route
          path="/support/ai"
          element={<AI />}
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