import { Post } from "@/types/common";
import { makeAutoObservable } from "mobx";
import { Ui } from "./ui";
import { Editor } from "./editor";

export type MainStoreHidration = { posts: Post[], date: string }


export class MainStore {
  posts: Post[] = [];

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

  hydrate(data: MainStoreHidration) {
    if (data) {
      this.posts = data.posts;
      this.date = data.date;
    }
  }
}
