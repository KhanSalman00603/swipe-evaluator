import SwipeNavigator from "@/components/SwipeNavigator";
import { AppProvider } from "@/context/AppContext";
import LandingPage from "@/pages/LandingPage";
import UploadPage from "@/pages/UploadPage";
import VivaPage from "@/pages/VivaPage";
import ProcessingPage from "@/pages/ProcessingPage";
import DashboardPage from "@/pages/DashboardPage";
import ReportPage from "@/pages/ReportPage";

const Index = () => {
  return (
    <AppProvider>
      <SwipeNavigator>
        <LandingPage />
        <UploadPage />
        <VivaPage />
        <ProcessingPage />
        <DashboardPage />
        <ReportPage />
      </SwipeNavigator>
    </AppProvider>
  );
};

export default Index;
