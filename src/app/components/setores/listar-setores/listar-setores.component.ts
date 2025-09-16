import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { BancoService } from '../../../../services/Banco/banco.service';
import { Router } from '@angular/router';
import { Area } from '../../../../types/area';

@Component({
  selector: 'app-listar-setores',
  templateUrl: './listar-setores.component.html',
  styleUrl: './listar-setores.component.css',
})
export class ListarSetoresComponent implements OnInit {
  @ViewChild('dt2') dt2!: Table;
  areas: Area[] = [];
  areaSelecionada!: Area;

  columns: any[] = [
    { field: 'id', header: 'ID' },
    { field: 'nome', header: 'Nome' },
    { field: 'descricao', header: 'Descrição' },
    { field: 'acoes', header: 'Ações' },
  ];

  items = [
    {
      label: 'Editar',
      icon: 'pi pi-pencil',
      command: () => this.editarArea(this.areaSelecionada),
    },
    {
      label: 'Excluir',
      icon: 'pi pi-trash',
      command: () => this.excluirArea(this.areaSelecionada),
    },
  ];

  constructor(
    private bancoService: BancoService,
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) {}

  async ngOnInit() {
    await this.consultarAreas();
  }

  async consultarAreas() {
    try {
      const response = await this.bancoService.consultarAreas();
      if (response) {
        this.areas = response;
      }
    } catch (error) {
      console.error('Erro ao consultar áreas:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Não foi possível carregar as áreas.',
      });
    }
  }

  onRowSelect(event: any) {
    this.areaSelecionada = event.data;
  }

  applyFilter(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      this.dt2.filterGlobal(inputElement.value, 'contains');
    }
  }

  cadastrarArea() {
    this.router.navigate(['/areas/cadastrar']);
  }

  // Atualiza a seleção quando clicar no botão
  onRowSelectArea(area: any) {
    this.areaSelecionada = area;
  }

  editarArea(area: any) {
    this.router.navigate(['/areas/atualizar', area.id]);
  }

  async excluirArea(area: any) {
    this.confirmationService.confirm({
      message: `Você tem certeza que deseja excluir a área "${area.nome}"?`,
      header: 'Confirmação',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger p-button-outlined',
      rejectButtonStyleClass: 'p-button-secondary p-button-outlined',
      accept: async () => {
        // Chama o serviço para excluir a área
        const response = await this.bancoService.excluirArea(area.id);
        if (response) {
          this.successMessage('Área excluída com sucesso!');
          this.areas = this.areas.filter((a) => a.id != area.id);
          this.dt2.reset();
          return;
        }

        this.errorMessage('Erro ao excluir área. Tente novamente.');
      },
    });
  }

  errorMessage(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: message,
    });
  }

  successMessage(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: message,
    });
  }
}
