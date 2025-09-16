import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarSetoresComponent } from './listar-setores.component';

describe('ListarSetoresComponent', () => {
  let component: ListarSetoresComponent;
  let fixture: ComponentFixture<ListarSetoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarSetoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarSetoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
