import axios, { AxiosResponse } from "axios";
import { makeAutoObservable } from "mobx";
import { MainStore } from ".";
import { MessageType } from "@/components/Toast/Toast";
import { PostType } from "@/types/common";

export class Editor {
  root: MainStore;

  title: string = "";

  content: string = "";

  constructor(_root: MainStore) {
    this.root = _root;
    makeAutoObservable(this);
  }

  setTitle(title: string) {
    this.title = title;
  }

  setContent(content: string) {
    this.content = content;
  }

  async sendPost(id?: string): Promise<void> {
    if (id) {
      try {
        await axios.put(`//localhost:4000/posts/${id}`, {
          title: this.title,
          content: this.content,
        });
        this.root.ui.setShowToast(
          MessageType.success,
          "Post successfully edited!"
        );
        await this.root.loadPosts();
      } catch (e) {
        console.error("Edit post method has felt!", e);
        this.root.ui.setShowToast(
          MessageType.error,
          `Something goes wrong. Error: ${e}`
        );
      }
    } else {
      try {
        await axios.post("//localhost:4000/posts", {
          title: this.title,
          content: this.content,
        });
        this.root.ui.setShowToast(
          MessageType.success,
          "Post successfully send!"
        );
        await this.root.loadPosts();
      } catch (e) {
        console.error("Send post method has felt!", e);
        this.root.ui.setShowToast(
          MessageType.error,
          `Something goes wrong. Error: ${e}`
        );
      }
    }
  }

  async deletePost(id: string): Promise<void> {
    try {
      await axios.delete(`//localhost:4000/posts/${id}`);
      this.root.ui.setShowToast(
        MessageType.success,
        "Post successfully deleted!"
      );
      await this.root.loadPosts();
    } catch (e) {
      console.error(`Error while delete post id ${id}`, e);
      this.root.ui.setShowToast(
        MessageType.error,
        `Something goes wrong. Error: ${e}`
      );
    }
  }

  async loadPost(id: string) {
    try {
      const res: AxiosResponse<PostType, any> = await axios.get(
        `//localhost:4000/posts/${id}`
      );
      this.content = res.data.content;
      this.title = res.data.title;
    } catch (error) {
      console.error("Load post method has felt in editor!", error);
      this.root.ui.setShowToast(
        MessageType.error,
        `Something goes wrong. Error: ${error}`
      );
    }
  }

  clear() {
    this.setContent("");
    this.setTitle("");
  }
}
