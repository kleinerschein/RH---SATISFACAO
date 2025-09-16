import { Component } from '@angular/core';
import { BancoService } from '../../../../services/Banco/banco.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cadastrar-setor',
  templateUrl: './cadastrar-setor.component.html',
  styleUrl: './cadastrar-setor.component.css',
})
export class CadastrarSetorComponent {
  nome: string = '';
  descricao: string = '';

  constructor(
    private bancoService: BancoService,
    private messageService: MessageService
  ) {}

  validateInputs(): boolean {
    if (!this.nome || !this.descricao) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'Por favor, preencha todos os campos.'
      });
      return false;
    }
    return true;
  }

  async cadastrarSetor() {
    if (!this.validateInputs()) {
      return;
    }
    this.messageService.clear(); // Clear previous messages

    // Call the service to insert the area
    try {
      const result = await this.bancoService.insertArea(
        this.nome,
        this.descricao
      );

      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Área cadastrada com sucesso!',
      });
    } catch (error: any) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: error.message,
      });
    }
    this.nome = '';
    this.descricao = '';
  }
}
