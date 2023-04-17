import { MessageType } from "@/components/Toast/Toast";
import { create } from "zustand";

export const useUiStore = create<{
  shouldToastShow: boolean;
  message: string;
  type: MessageType;
  DELAY: number;
  setMessage: (message: string) => void;
  setType: (type: MessageType) => void;
  reset: () => void;
  setShowToast: (type: MessageType, message: string) => void;
}>((set, get) => ({
  shouldToastShow: false,
  message: "",
  type: MessageType.unknown,
  DELAY: 3000,
  setMessage: (message) => {
    set({ message });
  },
  setType: (type) => {
    set({ type });
  },
  reset: () => {
    set({
      type: MessageType.unknown,
      message: "",
      shouldToastShow: false,
    });
  },
  setShowToast: (type, message) => {
    set({
      shouldToastShow: true,
      type,
      message,
    })
    setTimeout(() => {
      get().reset();
    }, get().DELAY);
  }
}));
