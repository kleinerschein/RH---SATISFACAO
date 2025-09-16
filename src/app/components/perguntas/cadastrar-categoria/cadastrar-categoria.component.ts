import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BancoService } from '../../../../services/Banco/banco.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cadastrar-categoria',
  templateUrl: './cadastrar-categoria.component.html',
  styleUrls: ['./cadastrar-categoria.component.css'],
})
export class CadastrarCategoriaComponent implements OnInit {
  display = false;
  formCategoria!: FormGroup;
  categorias: any[] = []; // Array para armazenar as categorias cadastradas
  cols = [
    { field: 'id', header: 'ID' },
    { field: 'nome', header: 'Nome' },
    { field: 'excluir', header: 'Excluir' },
  ];
  constructor(
    private fb: FormBuilder,
    private banco: BancoService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.formCategoria = this.fb.group({
      nome: ['', Validators.required],
    });
  }

  async showDialog() {
    this.display = true;
    this.formCategoria.reset();
    try {
      this.categorias = [];
      this.categorias = await this.banco.consultarCategorias();
      console.log('Categorias consultadas:', this.categorias);
    } catch (error) {
      console.error('Erro ao consultar categorias:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Não foi possível carregar as categorias.',
      });
    }
  }

  async cadastrarCategoria() {
    try {
      if (this.formCategoria.valid) {
        const categoria = this.formCategoria.value;

        const response = await this.banco.insertCategoria(categoria.nome);

        if (!response) {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Não foi possível cadastrar a categoria.',
          });
          return;
        }

        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Categoria cadastrada com sucesso.',
        });

        this.categorias = await this.banco.consultarCategorias();
      } else {
        this.formCategoria.markAllAsTouched();
      }
    } catch (error) {
      console.error('Erro ao cadastrar categoria:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Não foi possível cadastrar a categoria.',
      });
    }
  }

  async removerCategoria(categoria: any) {
    try {
      const response = await this.banco.excluirCategoria(categoria);

      if (!response) {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível excluir a categoria.',
        });
        return;
      }

      this.categorias = this.categorias.filter((c) => c.id != categoria);
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Categoria excluída com sucesso.',
      });
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Não foi possível excluir a categoria.',
      });
      console.error('Erro ao excluir categoria:', error);
    }
  }
}
