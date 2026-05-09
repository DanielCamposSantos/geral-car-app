import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Galery } from './galery';

describe('Galery', () => {
  let component: Galery;
  let fixture: ComponentFixture<Galery>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Galery],
    }).compileComponents();

    fixture = TestBed.createComponent(Galery);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
