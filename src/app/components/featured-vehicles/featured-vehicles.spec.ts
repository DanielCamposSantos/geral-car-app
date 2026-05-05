import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedVehicles } from './featured-vehicles';

describe('FeaturedVehicles', () => {
  let component: FeaturedVehicles;
  let fixture: ComponentFixture<FeaturedVehicles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedVehicles],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturedVehicles);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
