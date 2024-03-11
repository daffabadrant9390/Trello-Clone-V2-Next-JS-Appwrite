import { create } from 'zustand';

type ModalStoreState = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalStoreState>()((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
