import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTableCell } from './vehicle-table-cell';

describe('VehicleTableCell', () => {
  let component: VehicleTableCell;
  let fixture: ComponentFixture<VehicleTableCell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleTableCell],
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleTableCell);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
