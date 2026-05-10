import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecsTable } from './specs-table';

describe('SpecsTable', () => {
  let component: SpecsTable;
  let fixture: ComponentFixture<SpecsTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecsTable],
    }).compileComponents();

    fixture = TestBed.createComponent(SpecsTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
