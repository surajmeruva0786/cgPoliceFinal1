import { createBrowserRouter } from "react-router";
import { LoginPage } from "./pages/LoginPage";
import { DashboardLayout } from "./components/DashboardLayout";
import { Overview } from "./pages/Overview";
import { CitizenMonitoring } from "./pages/CitizenMonitoring";
import { LiveAlerts } from "./pages/LiveAlerts";
import { DeepfakeMonitoring } from "./pages/DeepfakeMonitoring";
import { IdentityVerification } from "./pages/IdentityVerification";
import { CriminalIntelligence } from "./pages/CriminalIntelligence";
import { AIChatbot } from "./pages/AIChatbot";
import { NewspaperIntelligence } from "./pages/NewspaperIntelligence";
import { DocumentSummarizer } from "./pages/DocumentSummarizer";
import { FraudURLDetection } from "./pages/FraudURLDetection";
import { CitizenLoginPage } from "./pages/citizen/CitizenLoginPage";

// Citizen Portal
import { CitizenPortalLayout } from "./components/CitizenPortalLayout";
import { CitizenDashboard } from "./pages/citizen/CitizenDashboard";
import { CitizenURLChecker } from "./pages/citizen/CitizenURLChecker";
import { CitizenDeepfakeDetector } from "./pages/citizen/CitizenDeepfakeDetector";
import { CitizenIdentityVerifier } from "./pages/citizen/CitizenIdentityVerifier";
import { CitizenReportFraud } from "./pages/citizen/CitizenReportFraud";
import { CitizenProtectionTips } from "./pages/citizen/CitizenProtectionTips";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LoginPage,
  },
  // Admin Dashboard Routes
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      { index: true, Component: Overview },
      { path: "citizen-monitoring", Component: CitizenMonitoring },
      { path: "alerts", Component: LiveAlerts },
      { path: "fraud-detection", Component: FraudURLDetection },
      { path: "deepfake", Component: DeepfakeMonitoring },
      { path: "identity", Component: IdentityVerification },
      { path: "intelligence", Component: CriminalIntelligence },
      { path: "chatbot", Component: AIChatbot },
      { path: "newspaper", Component: NewspaperIntelligence },
      { path: "documents", Component: DocumentSummarizer },
    ],
  },
  {
    path: "/citizen/login",
    Component: CitizenLoginPage,
  },
  // Citizen Portal Routes
  {
    path: "/citizen",
    Component: CitizenPortalLayout,
    children: [
      { index: true, Component: CitizenDashboard },
      { path: "url-checker", Component: CitizenURLChecker },
      { path: "deepfake-detector", Component: CitizenDeepfakeDetector },
      { path: "verify-official", Component: CitizenIdentityVerifier },
      { path: "report-fraud", Component: CitizenReportFraud },
      { path: "protection-tips", Component: CitizenProtectionTips },
    ],
  },
]);
