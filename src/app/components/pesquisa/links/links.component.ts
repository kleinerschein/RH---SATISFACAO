import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { BancoService } from '../../../../services/Banco/banco.service';
import { v4 as uuidv4 } from 'uuid';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ModalLoadingComponent } from '../../modal-loading/modal-loading.component';
import { WhatsappService } from '../../../../services/whatsapp/whatsapp.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { EncurtadorUrlService } from '../../../../services/encurtadorUrl/encurtador-url.service';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrl: './links.component.css',
})
export class LinksComponent implements OnInit {
  @ViewChild('dt2') dt2!: Table;
  @ViewChild(ModalLoadingComponent) modalLoading!: ModalLoadingComponent;
  links: any = [];
  linkSelecionado: any = null;

  items: any = [
    {
      label: 'Ativar',
      icon: 'pi pi-check',
      command: () => this.atualizaStatusLink('0'),
    },
    {
      label: 'Inativar',
      icon: 'pi pi-trash',
      command: () => this.atualizaStatusLink('1'),
    },
    {
      label: 'Novo',
      icon: 'pi pi-plus',
      command: () => this.cadastrarLink(),
    },
    {
      label: 'Copiar Link',
      icon: 'pi pi-copy',
      command: () => {
        if (!this.linkSelecionado.uuid || this.linkSelecionado.status == 1) {
          this.messageService.add({
            severity: 'warn',
            summary: 'Nenhum link válido',
            detail: 'O link selecionado é inválido.',
          });

          return;
        }
        const texto = `http://92.113.34.132:4280/pesquisa/responder/${this.linkSelecionado.uuid}`;
        this.clipboard.copy(texto);

        this.messageService.add({
          severity: 'success',
          summary: 'Link Copiado',
          detail: 'O link foi copiado para a área de transferência!',
        });
      },
    },
  ];

  ngOnInit() {
    this.consultaLinks();
  }

  columns = [
    { field: 'nome', header: 'Nome' },
    { field: 'numero', header: 'Número' },
    { field: 'uuid', header: 'Código' },
    { field: 'status', header: 'Status' },
    { field: 'acoes', header: 'Ações' },
  ];

  constructor(
    private bancoService: BancoService,
    private whatsappService: WhatsappService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private clipboard: Clipboard,
    private encurtadorUrlService: EncurtadorUrlService
  ) {}

  onRowSelect(event: any) {
    this.linkSelecionado = event;
  }

  applyFilter(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      this.dt2.filterGlobal(inputElement.value, 'contains');
    }
  }

  cadastrarLink() {
    this.confirmationService.confirm({
      header: 'Gerar Link',
      message: `Você deseja gerar um novo link para o número ${this.linkSelecionado.numero}? O antigo será invalidado, e o novo será enviado via WhatsApp.`,
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.gerarLink();
      },
    });
  }

  async gerarLink() {
    this.modalLoading.startLoading();
    const uuid = uuidv4();
    this.bancoService
      .atualizaUuidLink(this.linkSelecionado.numero, uuid)
      .then(() => {
        this.consultaLinks();
      })
      .then(async () => {
        const link = await this.encurtadorUrlService.encurtarUrl(
          `http://92.113.34.132:4280/pesquisa/responder/${uuid}`
        );
        console.log(link);
        this.whatsappService.sendMessage(
          link.encurtada,
          this.linkSelecionado.numero
        );

        this.messageService.add({
          severity: 'success',
          summary: 'Link Gerado',
          detail: 'O link foi gerado com sucesso!',
        });

        this.modalLoading.stopLoading();
      });
  }

  async consultaLinks() {
    this.bancoService.getLinks().then((links) => {
      this.links = links;
    });
  }

  async gerarLinkGeral() {
    this.confirmationService.confirm({
      header: 'Gerar Links',
      message: `Você deseja gerar links para todos os números que ainda não possuem um link? Novos Links serão enviados via WhatsApp.`,
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.gerarLinksParaTodos();
      },
    });
  }
  async gerarLinksParaTodos() {
    this.modalLoading.startLoading();

    const linksPendentes = this.links.filter((link: any) => !link.uuid);
    const RATE_LIMIT = 20; // 30 requisições por minuto
    const INTERVAL = 60 * 1000; // 1 minuto em ms

    for (let i = 0; i < linksPendentes.length; i += RATE_LIMIT) {
      const lote = linksPendentes.slice(i, i + RATE_LIMIT);

      await Promise.all(
        lote.map(async (link: any) => {
          const uuid = uuidv4();

          console.log(`Gerando link para ${link.numero} com UUID ${uuid}`);

          await this.bancoService.atualizaUuidLink(link.numero, uuid);

          const linkEncurtado = await this.encurtadorUrlService.encurtarUrl(
            `http://92.113.34.132:4280/pesquisa/responder/${uuid}`
          );

          return this.whatsappService.sendMessage(
            linkEncurtado.encurtada,
            link.numero
          );
        })
      );

      if (i + RATE_LIMIT < linksPendentes.length) {
        console.log(`Aguardando 1 minuto para continuar o próximo lote...`);
        await new Promise((resolve) => setTimeout(resolve, INTERVAL));
      }
    }

    await this.consultaLinks();

    this.messageService.add({
      severity: 'success',
      summary: 'Links Gerados',
      detail: 'Todos os links foram gerados com sucesso!',
    });

    this.modalLoading.stopLoading();
  }

  async atualizaStatusLink(status: string) {
    if (!this.linkSelecionado) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Nenhum link selecionado',
        detail: 'Por favor, selecione um link para atualizar o status.',
      });
      return;
    }

    await this.bancoService.atualizaStatusLink(
      this.linkSelecionado.numero,
      status
    );

    await this.consultaLinks();
    this.messageService.add({
      severity: 'success',
      summary: 'Status Atualizado',
      detail: `Status atualizado com sucesso.`,
    });
  }
}
