import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicOfficesComponent } from './public-offices.component';

describe('PublicOfficesComponent', () => {
  let component: PublicOfficesComponent;
  let fixture: ComponentFixture<PublicOfficesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicOfficesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicOfficesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
