import React from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { Library } from './components/Library';
import { ReadingPage } from './components/ReadingPage';
import { ChallengeView } from './components/ChallengeView';
import { GardenView } from './components/GardenView';
import { SavedBooksView } from './components/SavedBooksView';
import { ForumView } from './components/ForumView';
import { ProfileView } from './components/ProfileView';
import { AdminView } from './components/AdminView';
import { SearchModal } from './components/SearchModal';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { GatewayScreen } from './components/GatewayScreen';
import { Sparkles } from 'lucide-react';

export function AppContent() {
  const { currentUser, activeTab, toastMessage } = useApp();

  // If user is not logged in, display the literary garden gateway screen
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#FEF9C3]">
        <GatewayScreen />
        <AuthModal />
        {toastMessage && (
          <div
            id="app-toast-notification"
            className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-amber-950 text-amber-50 text-xs sm:text-sm font-medium shadow-xl flex items-center gap-2.5 border border-amber-800"
          >
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF7] dark:bg-[#1A130E] text-[#422F1E] dark:text-[#F3E7D3] transition-colors duration-300 font-sans selection:bg-[#FDE047] selection:text-[#382414]">
      {/* Header is shown on all pages except reading view for focused immersion */}
      {activeTab !== 'reading' && <Header />}

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && <Home />}
        {activeTab === 'library' && <Library />}
        {activeTab === 'reading' && <ReadingPage />}
        {activeTab === 'challenge' && <ChallengeView />}
        {activeTab === 'garden' && <GardenView />}
        {activeTab === 'saved' && <SavedBooksView />}
        {activeTab === 'forum' && <ForumView />}
        {activeTab === 'profile' && <ProfileView />}
        {activeTab === 'admin' && <AdminView />}
      </main>

      {/* Footer */}
      {activeTab !== 'reading' && <Footer />}

      {/* Global Modals */}
      <SearchModal />
      <AuthModal />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div
          id="app-toast-notification"
          className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-[#3D2919] text-[#FFF6EB] dark:bg-[#FFF6EB] dark:text-[#3D2919] text-xs sm:text-sm font-medium shadow-xl flex items-center gap-2.5 animate-bounce-slow border border-[#5C4028] dark:border-[#E8DEC8]"
        >
          <Sparkles className="w-4 h-4 text-[#E59728] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return <AppContent />;
}
