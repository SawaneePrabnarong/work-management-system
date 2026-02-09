import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Popup } from '../../shared/components/popup/popup';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet, Popup],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.scss',
})
export class AuthLayout {
  constructor(public popup: PopupService) {}
}
