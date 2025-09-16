import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizarSetorComponent } from './atualizar-setor.component';

describe('AtualizarSetorComponent', () => {
  let component: AtualizarSetorComponent;
  let fixture: ComponentFixture<AtualizarSetorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AtualizarSetorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtualizarSetorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
