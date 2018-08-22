import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageHeaderCompanyComponent } from './page-header-company.component';

describe('PageHeaderCompanyComponent', () => {
  let component: PageHeaderCompanyComponent;
  let fixture: ComponentFixture<PageHeaderCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageHeaderCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageHeaderCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
