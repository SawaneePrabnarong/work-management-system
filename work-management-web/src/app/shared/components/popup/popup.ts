import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [],
  templateUrl: './popup.html',
  styleUrl: './popup.scss',
})
export class Popup {
  @Input() title = '';
  @Input() message = '';
  @Input() onConfirm?: () => void;

  close() {
    if (this.onConfirm) {
      this.onConfirm();
    }
  }
}
