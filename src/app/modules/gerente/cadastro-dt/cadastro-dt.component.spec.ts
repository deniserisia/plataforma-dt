import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroDtComponent } from './cadastro-dt.component';

describe('CadastroDtComponent', () => {
  let component: CadastroDtComponent;
  let fixture: ComponentFixture<CadastroDtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroDtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroDtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
