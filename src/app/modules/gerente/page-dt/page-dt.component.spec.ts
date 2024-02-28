import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDtComponent } from './page-dt.component';

describe('PageDtComponent', () => {
  let component: PageDtComponent;
  let fixture: ComponentFixture<PageDtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageDtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageDtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
