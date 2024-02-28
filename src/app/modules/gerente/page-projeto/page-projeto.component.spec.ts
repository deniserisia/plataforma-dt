import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageProjetoComponent } from './page-projeto.component';

describe('PageProjetoComponent', () => {
  let component: PageProjetoComponent;
  let fixture: ComponentFixture<PageProjetoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageProjetoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageProjetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
