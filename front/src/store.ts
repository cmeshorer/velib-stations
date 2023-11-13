import create from 'zustand';

export const useAuthStore = create(set => ({
  token: null,
  // @ts-ignore
  // Issue typing the set() function via suggested implementation
  // source: https://docs.pmnd.rs/zustand/guides/typescript
  storeToken: (token: string | null) => set({token}),
}));
