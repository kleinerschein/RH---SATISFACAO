import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SeniorService } from '../../../services/senior/senior.service';
import { Base64Helper } from '../../helpers/base64';
import { CookiesService } from '../../helpers/cookies/cookies.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  nodes!: any[];

  username: string = '';
  password: string = '';
  seniorService!: SeniorService;
  cookies = new CookiesService();

  tipo: any;

  ngOnInit(): void {
    this.isLoggedIn();
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private router: Router
  ) {
    this.seniorService = new SeniorService(this.http);
  }

  isLoggedIn(): boolean {
    const cookie = new CookiesService();
    const logado = cookie.getCookie('logado');

    if (logado) {
      this.router.navigate(['/home']);
      return false;
    }

    return true;
  }

  validaForm() {
    if (this.username == '' || this.password == '') {
      this.messageService.add({
        severity: 'warn',
        summary: 'Login',
        detail: 'Preencha todos os campos!',
      });
      return false;
    }
    return true;
  }

  definePapeis() {
    if (
      this.username in
      { 'luiz.preis': 'admin', junior: 'admin', 'rodrigo.barros': 'admin' }
    ) {
      this.cookies.setCookie('papel', 'admin', 1);
    }
  }

  async validateUser() {
    try {
      const groups64 = await this.seniorService.getUserGroup(this.username);
      const decoded = Base64Helper.decode(groups64);

      this.cookies.setCookie('grupos', decoded.replace(/;/g, ','), 24);
      
      
      return true

      this.messageService.add({
        severity: 'warn',
        summary: 'Login',
        detail: 'Usuário não possui permissão!',
      });

      return false;
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Login',
        detail: 'Erro ao validar o usuário!',
      });
      console.error('Validation error:', error);
      return false;
    }
  }

  async login() {
    if (!this.validaForm()) return;

    try {
      const response = await this.seniorService.AuthenticateSapiens(
        this.username,
        this.password
      );

      if (response == 0) {
        const isUserValid = await this.validateUser();

        if (!isUserValid) return;

        this.messageService.add({
          severity: 'success',
          summary: 'Login',
          detail: 'Login realizado com sucesso!',
        });

        this.cookies.setCookie('usuario', this.username, 24);
        this.cookies.setCookie('logado', 'true', 24);

        this.definePapeis();

        setTimeout(() => {
          window.location.href = '/home';
        }, 500);
        
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Login',
          detail: 'Erro ao realizar login!',
        });
      }
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Login',
        detail: 'Ocorreu um erro ao tentar realizar o login!',
      });
      console.error('Login error:', error);
    }
  }
}
