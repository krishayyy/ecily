import { create } from 'zustand';
import { type User } from './types';

interface AppState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  updateOnboarding: (data: Partial<User>) => void;
  addXP: (amount: number) => void;
  addCoins: (amount: number) => void;
  completeLesson: (lessonId: string, xp: number, coins: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  isLoading: false,
  isAuthenticated: false,
  setUser: (user: User) => set({ user, isAuthenticated: true }),
  updateOnboarding: (data: Partial<User>) => set((state: AppState) => ({
    user: state.user ? { ...state.user, ...data, isOnboardingComplete: true } : null
  })),
  addXP: (amount: number) => set((state: AppState) => {
    if (!state.user) return state;
    const newXP = state.user.xp + amount;
    const newLevel = Math.floor(newXP / 500) + 1;
    return { user: { ...state.user, xp: newXP, level: newLevel } };
  }),
  addCoins: (amount: number) => set((state: AppState) => ({
    user: state.user ? { ...state.user, ecilyCoins: state.user.ecilyCoins + amount } : null
  })),
  completeLesson: (lessonId: string, xp: number, coins: number) => set((state: AppState) => {
    if (!state.user) return state;
    if (state.user.completedLessons.includes(lessonId)) return state;
    const newXP = state.user.xp + xp;
    const newLevel = Math.floor(newXP / 500) + 1;
    return {
      user: {
        ...state.user,
        xp: newXP,
        level: newLevel,
        ecilyCoins: state.user.ecilyCoins + coins,
        completedLessons: [...state.user.completedLessons, lessonId]
      }
    };
  }),
}));
