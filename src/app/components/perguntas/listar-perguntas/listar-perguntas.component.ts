import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BancoService } from '../../../../services/Banco/banco.service';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-perguntas',
  templateUrl: './listar-perguntas.component.html',
  styleUrl: './listar-perguntas.component.css',
})
export class ListarPerguntasComponent implements OnInit {
  @ViewChild('dt2') dt2!: Table;
  perguntas: any[] = []; // Array para armazenar as perguntas cadastradas
  perguntaSelecionada: any; // Pergunta selecionada para exclusão
  columns = [
    { field: 'id', header: 'ID' },
    { field: 'pergunta', header: 'Pergunta' },
    { field: 'categoria', header: 'Categoria' },
    { field: 'descritiva', header: 'Descritiva' },
    { field: 'excluir', header: 'Excluir' },
  ];

  constructor(
    private banco: BancoService,
    private messageService: MessageService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.perguntas = await this.banco.getPerguntas();
  }

  applyFilter(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      this.dt2.filterGlobal(inputElement.value, 'contains');
    }
  }

  onRowSelect(event: any) {
    this.perguntaSelecionada = event.data;
  }

  cadastrarPergunta() {
    this.router.navigate(['/perguntas/cadastrar']);
  }

  excluirPergunta(pergunta: any) {
    this.banco
      .excluirPergunta(pergunta.id)
      .then(() => {
        this.perguntas = this.perguntas.filter(p => p.id !== pergunta.id);
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Pergunta excluída com sucesso',
        });

        this.perguntas.filter(p => p.id != pergunta.id);
      })
      .catch(err => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao excluir pergunta: ' + err.message,
        });
      });
  }
}
