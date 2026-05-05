import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageContent } from './landing-page-content';

describe('LandingPageContent', () => {
  let component: LandingPageContent;
  let fixture: ComponentFixture<LandingPageContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingPageContent],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingPageContent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
