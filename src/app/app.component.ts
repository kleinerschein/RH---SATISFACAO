import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CookiesService } from './helpers/cookies/cookies.service';
import { ModalLoadingComponent } from './components/modal-loading/modal-loading.component';
import { CadastrarCategoriaComponent } from './components/perguntas/cadastrar-categoria/cadastrar-categoria.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class AppComponent implements OnInit {
  @ViewChild(ModalLoadingComponent) modalLoading!: ModalLoadingComponent;
  @ViewChild(CadastrarCategoriaComponent)
  cadastrarCategoria!: CadastrarCategoriaComponent;

  items: MenuItem[] = [];

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    if (!this.isLoggedIn()) {
      this.router.navigate(['']);
      return;
    }

    this.items = [
      {
        label: 'Início',
        icon: 'pi pi-home',
        command: () => this.pushHome(),
      },
      {
        label: 'Áreas',
        icon: 'pi pi-sitemap',
        items: [
          {
            label: 'Listar Áreas',
            icon: 'pi pi-list',
            routerLink: ['/areas/listar'],
          },
          {
            label: 'Cadastrar Área',
            icon: 'pi pi-plus',
            routerLink: ['/areas/cadastrar'],
          },
        ],
      },
      {
        label: 'Perguntas',
        icon: 'pi pi-question',
        items: [
          {
            label: 'Cadastrar Pergunta',
            icon: 'pi pi-plus',
            routerLink: ['/perguntas/cadastrar'],
          },
          {
            label: 'Listar Perguntas',
            icon: 'pi pi-list',
            routerLink: ['/perguntas/listar'],
          },

          {
            label: 'Cadastrar Categoria',
            icon: 'pi pi-plus',
            command: () => this.cadastrarCategoria.showDialog(),
          },
        ],
      },
      {
        label: 'Responder',
        icon: 'pi pi-pencil',
        routerLink: ['/pesquisa/responder'],
      },
    ];

    this.router.events.subscribe(() => {
      const url = this.router.url;
      console.log('URL atual:', url);
    });
  }

  //----------------------//
  // ROTAS DE NAVEGAÇÃO   //
  //----------------------//
  pushHome() {
    this.router.navigate(['/home']);
  }

  //----------------------//
  // AUTENTICAÇÃO E PERMISSÃO //
  //----------------------//

  isLoggedIn(): boolean {
    const cookie = new CookiesService();

    return (
      cookie.getCookie('logado') === 'true' ||
      !this.router.url.includes('pesquisa/responder')
    );
  }

  //----------------------//
  // SAIR DO SISTEMA      //
  //----------------------//

  logout(): void {
    this.confirmationService.confirm({
      header: 'Sair do sistema',
      message: 'Você realmente deseja sair do sistema?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        const cookies = new CookiesService();
        cookies.deleteCookie('usuario');
        cookies.deleteCookie('logado');
        this.router.navigate(['/home']);
        window.location.reload();
      },
    });
  }

  async responderPesquisa() {
    const estaRespondendo = await this.router.url.includes(
      'pesquisa/responder'
    );
    return estaRespondendo;
  }
}
