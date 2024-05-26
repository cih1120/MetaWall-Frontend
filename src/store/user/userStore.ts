import { create } from 'zustand'
import { IUserStore } from './types'
import { IUserProfile } from "@/types";

const useUserStore = create<IUserStore>((set) => ({
  id: "",
  name: "",
  avatar: "",
  gender: undefined,
  email: "",
  createdAt: null,
  followers: [],
  following: [],
  init: (userProfile: Partial<IUserProfile>) => set((state) => ({ ...state, ...userProfile })),
}))


export { useUserStore }