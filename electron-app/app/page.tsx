'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/store';
import EmailAuthScreen from '@/components/EmailAuthScreen';
import ChatDashboard from '@/components/ChatDashboard';

export default function Home() {
  const { isAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize app
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

  // Show main chat dashboard
  return <ChatDashboard />;
}
