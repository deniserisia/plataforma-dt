import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalProjetoComponent } from './modal-projeto.component';

describe('ModalProjetoComponent', () => {
  let component: ModalProjetoComponent;
  let fixture: ComponentFixture<ModalProjetoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalProjetoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalProjetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
