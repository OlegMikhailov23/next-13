import { PostType } from "@/types/common";
import { makeAutoObservable } from "mobx";
import { Ui } from "./ui";
import { Editor } from "./editor";
import axios from "axios";

export type MainStoreHidration = { posts: PostType[], date: string }


export class MainStore {
  posts: PostType[] = [];

  date!: string;

  _ui!: Ui;

  _editor!: Editor;

  constructor() {
    makeAutoObservable(this);
    this._ui = new Ui(this);
    this._editor = new Editor(this);
  }

  get ui() {
    return this._ui;
  }

  get editor() {
    return this._editor;
  }

  async loadPosts(): Promise<void> {
    try {
      this.posts = await (await axios.get("http://localhost:4000/posts")).data;
    } catch (e) {
      console.error("Error loading posts", e);
    }
  }

  hydrate(data: MainStoreHidration) {
    if (data) {
      this.posts = data.posts;
      this.date = data.date;
    }
  }
}
