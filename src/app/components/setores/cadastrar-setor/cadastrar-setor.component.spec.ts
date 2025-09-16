import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarSetorComponent } from './cadastrar-setor.component';

describe('CadastrarSetorComponent', () => {
  let component: CadastrarSetorComponent;
  let fixture: ComponentFixture<CadastrarSetorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CadastrarSetorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarSetorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
