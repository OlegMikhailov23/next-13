import { makeAutoObservable } from "mobx";
import { MainStore } from ".";
import { MessageType } from "@/components/Toast/Toast";

export class Ui {
  shouldToastShow = false;

  message = '';

  type!: MessageType;

  DELAY = 3000;

  constructor  (_root: MainStore) {
    makeAutoObservable(this);
  }

  setMessage(message: string) {
    this.message = message;
  }

  setType(type: MessageType) {
    this.type = type;
  }

  reset() {
    this.type = 0;
    this.message = '';
    this.shouldToastShow = false;
  }

  setShowToast(type: MessageType, message: string): void {
    this.shouldToastShow = true;
    this.type = type;
    this.message = message;
    setTimeout(() => {
      this.reset();
    }, this.DELAY);
  }
}
