import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVeiculos } from './admin-veiculos';

describe('AdminVeiculos', () => {
  let component: AdminVeiculos;
  let fixture: ComponentFixture<AdminVeiculos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminVeiculos],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminVeiculos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
