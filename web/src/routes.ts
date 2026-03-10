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
import { CitizenPortal } from "./pages/CitizenPortal";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LoginPage,
  },
  {
    path: "/citizen",
    Component: CitizenPortal,
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
]);
