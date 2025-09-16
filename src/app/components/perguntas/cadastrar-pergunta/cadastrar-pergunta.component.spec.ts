import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarPerguntaComponent } from './cadastrar-pergunta.component';

describe('CadastrarPerguntaComponent', () => {
  let component: CadastrarPerguntaComponent;
  let fixture: ComponentFixture<CadastrarPerguntaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CadastrarPerguntaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarPerguntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
