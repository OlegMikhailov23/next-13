import { PostType } from "@/types/common";
import axios from "axios";
import { create } from "zustand";

export const useMainStore = create<{
  posts: PostType[];
  date: string;
  loadPost: () => Promise<void>;
}>((set) => ({
  posts: [],
  date: '',
  loadPost: async() => {
        try {
          const res = await(
            await axios.get("http://localhost:4000/posts")
          ).data;
          set({posts: res});
        } catch (e) {
          console.error("Error loading posts", e);
        }
  }
}));
