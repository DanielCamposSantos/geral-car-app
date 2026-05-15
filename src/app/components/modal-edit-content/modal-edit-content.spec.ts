import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditContent } from './modal-edit-content';

describe('ModalEditContent', () => {
  let component: ModalEditContent;
  let fixture: ComponentFixture<ModalEditContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEditContent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalEditContent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
