import { Component } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-primary-page-layout',
  imports: [Header, Footer],
  templateUrl: './primary-page-layout.html',
  styleUrl: './primary-page-layout.scss',
})
export class PrimaryPageLayout {}
