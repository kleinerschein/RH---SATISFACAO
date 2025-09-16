import { Component, OnInit } from '@angular/core';
import { BancoService } from '../../../../services/Banco/banco.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cadastrar-pergunta',
  templateUrl: './cadastrar-pergunta.component.html',
  styleUrl: './cadastrar-pergunta.component.css',
})
export class CadastrarPerguntaComponent implements OnInit {
  pergunta: string = '';

  categorias: any[] = [];

  categoria: any;

  opcoes = [
    { name: 'Sim', value: 1 },
    { name: 'Não', value: 0 },
  ];

  perguntaAberta: boolean = false;

  constructor(private banco: BancoService, private messageService: MessageService) {}

  async ngOnInit() {
    this.categorias = await this.banco.consultarCategorias();
  }

  cadastrarPergunta() {
    if (this.pergunta && this.categoria) {
      this.banco
        .insertPergunta(
          this.pergunta,
          this.categoria,
          this.perguntaAberta ? 1 : 0
        )
        .then((response) => {
          if (response) {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Pergunta cadastrada com sucesso.',
            });
            this.pergunta = '';
            this.categoria = null;
            this.perguntaAberta = false;
          }
        })
        .catch((error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Não foi possível cadastrar a pergunta.',
          });
          console.error('Erro ao cadastrar pergunta:', error);
        });
    }
  }
}
