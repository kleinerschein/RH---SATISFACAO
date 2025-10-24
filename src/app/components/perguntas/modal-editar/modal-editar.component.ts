import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BancoService } from '../../../../services/Banco/banco.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modal-editar',
  templateUrl: './modal-editar.component.html',
  styleUrl: './modal-editar.component.css',
})
export class ModalEditarComponent {
   id: string = '';
  pergunta: string = '';

  categorias: any[] = [];

  categoria: any;

  opcoes = [
    { name: 'Sim', value: 1 },
    { name: 'Não', value: 0 },
  ];

  perguntaAberta: number = 0;

  constructor(
    private banco: BancoService,
    private messageService: MessageService,
    private route: ActivatedRoute, 
    private router: Router
  ) {}

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.categorias = await this.banco.consultarCategorias();
    this.carregarPergunta();
  }

  carregarPergunta() {
    this.banco.getPerguntaById(this.id).then((data) => {
      this.pergunta = data.pergunta;
      this.categoria = this.categorias.find(c => c.id === data.categoria_id).id;
      this.perguntaAberta = data.descritiva
    });
  }

  editarPergunta() {
    if (this.pergunta && this.categoria) {
      this.banco
        .editarPergunta(
          this.id,
          this.pergunta,
          this.categoria,
          this.perguntaAberta
        )
        .then((response) => {
          if (response) {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Pergunta editada com sucesso.',
            });
            this.pergunta = '';
            this.categoria = null;
            this.perguntaAberta = 0;

            this.router.navigate(['/perguntas/listar']);
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
