import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryPageLayout } from './primary-page-layout';

describe('PrimaryPageLayout', () => {
  let component: PrimaryPageLayout;
  let fixture: ComponentFixture<PrimaryPageLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimaryPageLayout],
    }).compileComponents();

    fixture = TestBed.createComponent(PrimaryPageLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
