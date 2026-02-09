import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PopupService {
  visible = signal(false);
  title = signal('');
  message = signal('');
  confirmFn?: () => void;

  show(title: string, message: string, fn?: () => void) {
    this.title.set(title);
    this.message.set(message);
    this.confirmFn = fn;
    this.visible.set(true);
  }

  close() {
    this.visible.set(false);

    if (this.confirmFn) {
      this.confirmFn();
      this.confirmFn = undefined;
    }
  }
}
