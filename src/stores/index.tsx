import { Post } from "@/types/common";
import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";

export type MainStoreHidration = { posts: Post[], date: string }


export class MainStore {
  posts: Post[] = [];

  date!: string;

  constructor() {
    makeAutoObservable(this);
  }

  hydrate(data: MainStoreHidration) {
    if (data) {
      this.posts = data.posts;
      this.date = data.date;
    }
  }
}
