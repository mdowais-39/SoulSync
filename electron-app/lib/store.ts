import { create } from 'zustand';
import { User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isSetupComplete: boolean;
  setUser: (user: User | null) => void;
  setSetupComplete: (complete: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isSetupComplete: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setSetupComplete: (complete) => set({ isSetupComplete: complete }),
  logout: () => set({ user: null, isAuthenticated: false, isSetupComplete: false }),
}));
