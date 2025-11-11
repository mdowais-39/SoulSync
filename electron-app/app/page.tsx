'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/store';
import EmailAuthScreen from '@/components/EmailAuthScreen';
import MoodDashboard from '@/components/MoodDashboard';
import ChatDashboard from '@/components/ChatDashboard';

export default function Home() {
  const { isAuthenticated, moodDashboardCompleted, setMoodDashboardCompleted } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize app and reset mood dashboard on app open
    setMoodDashboardCompleted(false);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading SoulSync...</p>
        </div>
      </div>
    );
  }

  // Show login/register screen if not authenticated
  if (!isAuthenticated) {
    return <EmailAuthScreen />;
  }

  // Show mood dashboard if not completed
  if (!moodDashboardCompleted) {
    return <MoodDashboard />;
  }

  // Show main chat dashboard
  return <ChatDashboard />;
}
