import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-popup.html',
  styleUrls: ['./notification-popup.scss']
})
export class NotificationPopup {
  @Input() message = '';
  @Input() type: 'success' | 'error' | 'info' = 'success';
  @Input() visible = false;
  @Output() close = new EventEmitter<void>();
}
