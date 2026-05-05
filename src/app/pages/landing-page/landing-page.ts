import { Component } from '@angular/core';
import { PrimaryPageLayout } from '../../components/primary-page-layout/primary-page-layout';
import { LandingPageContent } from "../../components/landing-page-content/landing-page-content";

@Component({
  selector: 'app-landing-page',
  imports: [PrimaryPageLayout, LandingPageContent],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage {}
