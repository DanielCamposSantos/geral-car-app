import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMainContent } from './admin-main-content';

describe('AdminMainContent', () => {
  let component: AdminMainContent;
  let fixture: ComponentFixture<AdminMainContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminMainContent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminMainContent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
