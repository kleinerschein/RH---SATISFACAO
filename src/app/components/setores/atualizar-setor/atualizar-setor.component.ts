import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BancoService } from '../../../../services/Banco/banco.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Area } from '../../../../types/area';

@Component({
  selector: 'app-atualizar-setor',
  templateUrl: './atualizar-setor.component.html',
  styleUrl: './atualizar-setor.component.css',
})
export class AtualizarSetorComponent implements OnInit {
  id: string = '';
  area: Area = {
    id: 0,
    nome: '',
    descricao: ''
  };

  constructor(
    private bancoService: BancoService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.carregarArea();
    console.log('ID recebido na rota:', this.id);
  }

  validateInputs(): boolean {
    if (!this.area.nome || !this.area.descricao) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'Por favor, preencha todos os campos.',
      });
      return false;
    }
    return true;
  }

  async editarSetor() {
    if (!this.validateInputs()) {
      return;
    }

    try {
      await this.bancoService.editarArea(this.area);
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Área editada com sucesso!',
      });

      this.router.navigate(['/areas/listar']);
    } catch (error: any) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: error.message,
      });
    }
  }

  async carregarArea() {
    this.area = await this.bancoService.consultarAreaPorId(Number(this.id)) as Area;
  }
}
