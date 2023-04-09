import axios from "axios";
import { makeAutoObservable } from "mobx";
import { MainStore } from ".";
import { MessageType } from "@/components/Toast/Toast";

export class Editor {
  root: MainStore;

  title: string = '';

  content: string = '';

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

  async sendPost(): Promise<void> {
    try {
      await axios.post('//localhost:4000/posts/ergrg', {title: this.title, content: this.content});
      this.root.ui.setShowToast(MessageType.success, 'Post successfully send!');
    } catch(e) {
      console.error('Send post method has felt!', e)
      this.root.ui.setShowToast(MessageType.error, `Something goes wrong. Error: ${e}`)
    }
  }

  clear() {
    this.setContent('');
    this.setTitle('');
  }
}
