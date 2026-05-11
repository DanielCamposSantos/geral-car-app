import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogPageContent } from './catalog-page-content';

describe('CatalogPageContent', () => {
  let component: CatalogPageContent;
  let fixture: ComponentFixture<CatalogPageContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogPageContent],
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogPageContent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
