import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarAdmin } from './side-bar-admin';

describe('SideBarAdmin', () => {
  let component: SideBarAdmin;
  let fixture: ComponentFixture<SideBarAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideBarAdmin],
    }).compileComponents();

    fixture = TestBed.createComponent(SideBarAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
