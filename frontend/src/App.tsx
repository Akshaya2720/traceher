import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import { PublicNavbar } from './layouts/PublicNavbar';
import { PublicFooter } from './layouts/PublicFooter';
import { AppSidebar } from './layouts/AppSidebar';
import { AppTopBar } from './layouts/AppTopBar';
import { SafetyChatbotWidget } from './components/SafetyChatbotWidget';

// Public pages
import { LandingPage } from './pages/LandingPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { FeaturesPage } from './pages/FeaturesPage';
import { AboutPage } from './pages/AboutPage';
import { PrivacySecurityPage } from './pages/PrivacySecurityPage';
import { HelpSupportPage } from './pages/HelpSupportPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';

// Authenticated pages
import { OnboardingPage } from './pages/OnboardingPage';
import { DashboardPage } from './pages/DashboardPage';
import { EvidenceCenterPage } from './pages/EvidenceCenterPage';
import { EvidenceDetailsPage } from './pages/EvidenceDetailsPage';
import { AIAnalysisPage } from './pages/AIAnalysisPage';
import { IncidentManagementPage } from './pages/IncidentManagementPage';
import { IncidentDetailsPage } from './pages/IncidentDetailsPage';
import { IncidentTimelinePage } from './pages/IncidentTimelinePage';
import { RelationshipIntelligencePage } from './pages/RelationshipIntelligencePage';
import { PrivacyGuardianPage } from './pages/PrivacyGuardianPage';
import { ResponseNavigatorPage } from './pages/ResponseNavigatorPage';
import { ReportCenterPage } from './pages/ReportCenterPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { DemoWorkspacePage } from './pages/DemoWorkspacePage';
import { SystemStatusPage } from './pages/SystemStatusPage';

export function AppContent() {
  const { currentPage, isAuthenticated, settings } = useApp();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const isPublicPage = [
    'landing',
    'how-it-works',
    'features',
    'about',
    'privacy-security',
    'help-support',
    'login',
    'register',
    'forgot-password'
  ].includes(currentPage);

  // Render individual page component
  const renderCurrentPage = () => {
    switch (currentPage) {
      // Public
      case 'landing': return <LandingPage />;
      case 'how-it-works': return <HowItWorksPage />;
      case 'features': return <FeaturesPage />;
      case 'about': return <AboutPage />;
      case 'privacy-security': return <PrivacySecurityPage />;
      case 'help-support': return <HelpSupportPage />;
      case 'login': return <LoginPage />;
      case 'register': return <RegisterPage />;
      case 'forgot-password': return <ForgotPasswordPage />;

      // Authenticated
      case 'onboarding': return <OnboardingPage />;
      case 'dashboard': return <DashboardPage />;
      case 'evidence': return <EvidenceCenterPage />;
      case 'evidence-details': return <EvidenceDetailsPage />;
      case 'ai-analysis': return <AIAnalysisPage />;
      case 'incidents': return <IncidentManagementPage />;
      case 'incident-details': return <IncidentDetailsPage />;
      case 'timeline': return <IncidentTimelinePage />;
      case 'relationships': return <RelationshipIntelligencePage />;
      case 'privacy-guardian': return <PrivacyGuardianPage />;
      case 'response-navigator': return <ResponseNavigatorPage />;
      case 'report-center': return <ReportCenterPage />;
      case 'notifications': return <NotificationsPage />;
      case 'profile': return <ProfilePage />;
      case 'settings': return <SettingsPage />;
      case 'help-center': return <HelpSupportPage />;
      case 'demo-workspace': return <DemoWorkspacePage />;
      case 'system-status': return <SystemStatusPage />;

      default: return <LandingPage />;
    }
  };

  // 1. If on public pages, render Public Navbar + Content + Footer
  if (isPublicPage) {
    return (
      <div className={`min-h-screen flex flex-col bg-[#F7F8FC] ${settings.reducedMotion ? 'motion-reduce' : ''}`}>
        <PublicNavbar />
        <main className="flex-1">
          {renderCurrentPage()}
        </main>
        <PublicFooter />
        <SafetyChatbotWidget />
      </div>
    );
  }

  // 2. If on authenticated or onboarding pages, render Application Shell
  return (
    <div className={`min-h-screen bg-[#F7F8FC] flex ${settings.reducedMotion ? 'motion-reduce' : ''}`}>
      {/* Sidebar navigation */}
      <AppSidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        mobileOpen={mobileDrawerOpen}
        setMobileOpen={setMobileDrawerOpen}
      />

      {/* Main content view */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'
        }`}
      >
        <AppTopBar
          sidebarCollapsed={sidebarCollapsed}
          setMobileOpen={setMobileDrawerOpen}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {renderCurrentPage()}
        </main>
      </div>

      {/* Global Bottom-Right Safety Chatbot & Avatar Widget */}
      <SafetyChatbotWidget />
    </div>
  );
}

export default function App() {
  return <AppContent />;
}
