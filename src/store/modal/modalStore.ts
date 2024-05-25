import { create } from 'zustand'
import { IModalState } from './types'

const addPostModalStore = create<IModalState>((set) => ({
  isOpen: false,
  onOpen: () => { },
  onOpenChange: (open) => { },
  init: (isOpen, onOpen, onOpenChange) => set((state) => ({ ...state, isOpen, onOpen, onOpenChange })),
}))


export { addPostModalStore }