import { MessageType } from "@/components/Toast/Toast";
import { PostType } from "@/types/common";
import axios, { AxiosResponse } from "axios";
import { create } from "zustand";
import { useMainStore } from ".";
import { useUiStore } from "./ui";

export const useEditorStore = create<{
  title: string;
  content: string;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  sendPost: (id?: string) => Promise<void>;
  deletePost: (id?: string) => Promise<void>;
  loadPost: (id?: string) => Promise<void>;
  clear: () => void;
}>((set, get) => ({
  title: "",
  content: "",
  setTitle: (title: string) => {
    set({ title: title });
  },
  setContent: (content: string) => {
    set({ content: content });
  },
  sendPost: async (id?: string) => {
    if (id) {
      try {
        await axios.put(`//localhost:4000/posts/${id}`, {
          title: get().title,
          content: get().content,
        });
        useUiStore
          .getState()
          .setShowToast(MessageType.success, "Post successfully edited!");
        await useMainStore.getState().loadPost();
      } catch (e) {
        console.error("Edit post method has felt!", e);
        useUiStore
          .getState()
          .setShowToast(MessageType.error, `Something goes wrong. Error: ${e}`);
      }
    } else {
      try {
        await axios.post("//localhost:4000/posts", {
          title: get().title,
          content: get().content,
        });
        useUiStore
          .getState()
          .setShowToast(MessageType.success, "Post successfully send!");
        await useMainStore.getState().loadPost();
      } catch (e) {
        console.error("Send post method has felt!", e);
        useUiStore
          .getState()
          .setShowToast(MessageType.error, `Something goes wrong. Error: ${e}`);
      }
    }
  },
  deletePost: async (id) => {
    try {
      await axios.delete(`//localhost:4000/posts/${id}`);
      useUiStore
        .getState()
        .setShowToast(MessageType.success, "Post successfully deleted!");
      await useMainStore.getState().loadPost();
    } catch (e) {
      console.error(`Error while delete post id ${id}`, e);
      useUiStore
        .getState()
        .setShowToast(MessageType.error, `Something goes wrong. Error: ${e}`);
    }
  },
  loadPost: async (id) => {
    try {
      const res: AxiosResponse<PostType, any> = await axios.get(
        `//localhost:4000/posts/${id}`
      );
      set({ title: res.data.title });
      set({ content: res.data.content });
    } catch (error) {
      console.error("Load post method has felt in editor!", error);
      useUiStore
        .getState()
        .setShowToast(
          MessageType.error,
          `Something goes wrong. Error: ${error}`
        );
    }
  },
  clear: () => {
    set({ title: "" });
    set({ content: "" });
  },
}));
