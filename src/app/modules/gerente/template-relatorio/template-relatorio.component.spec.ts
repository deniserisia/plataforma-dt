import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateRelatorioComponent } from './template-relatorio.component';

describe('TemplateRelatorioComponent', () => {
  let component: TemplateRelatorioComponent;
  let fixture: ComponentFixture<TemplateRelatorioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateRelatorioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateRelatorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
