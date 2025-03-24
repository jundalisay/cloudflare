// src/lib/stores/authStore.ts
import { writable } from 'svelte/store';

type User = {
  id: string;
  username: string;
} | null;

function createAuthStore() {
  const { subscribe, set, update } = writable<User>(null);
  
  return {
    subscribe,
    login: (user: { id: string; username: string }) => set(user),
    logout: () => set(null),
    init: (user: User) => set(user)
  };
}

export const authStore = createAuthStore();