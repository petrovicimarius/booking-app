import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageHeaderAdminComponent } from './page-header-admin.component';

describe('PageHeaderAdminComponent', () => {
  let component: PageHeaderAdminComponent;
  let fixture: ComponentFixture<PageHeaderAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PageHeaderAdminComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageHeaderAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
