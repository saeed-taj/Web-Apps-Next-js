"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  id: string;
  name: string;
  email: string;
  role: "client" | "lawyer";
};

type AuthState = {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: {
    name: string;
    email: string;
    password: string;
    role: "client" | "lawyer";
  }) => Promise<void>;
  logout: () => void;
};

const handleApiError = async (response: Response) => {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || "Request failed");
  }
  return data;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      loading: false,
      error: null,
      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });

          const data = await handleApiError(response);
          set({
            user: data.user,
            token: data.token ?? null,
            loading: false,
            error: null,
          });
        } catch (error: any) {
          set({ error: error.message, loading: false });
          throw error;
        }
      },
      register: async ({ name, email, password, role }) => {
        set({ loading: true, error: null });
        try {
          const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password, role }),
          });

          const data = await handleApiError(response);
          set({
            user: data.user,
            token: null,
            loading: false,
            error: null,
          });
        } catch (error: any) {
          set({ error: error.message, loading: false });
          throw error;
        }
      },
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: "lawmate-auth",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
    }
  )
);

