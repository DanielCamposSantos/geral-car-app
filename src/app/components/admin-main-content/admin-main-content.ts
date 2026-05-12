import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-main-content',
  imports: [CommonModule],
  templateUrl: './admin-main-content.html',
  styleUrl: './admin-main-content.scss',
})
export class AdminMainContent {
  title = input.required<string>();
  subtext = input.required<string>();
  btnContent = input.required<string>();
  openModal = output<void>();
}
