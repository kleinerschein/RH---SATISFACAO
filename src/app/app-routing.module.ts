//--------------------------------------//
// Importa o módulo de rotas do Angular //
//--------------------------------------//
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CadastrarSetorComponent } from './components/setores/cadastrar-setor/cadastrar-setor.component';
import { ListarSetoresComponent } from './components/setores/listar-setores/listar-setores.component';
import { AtualizarSetorComponent } from './components/setores/atualizar-setor/atualizar-setor.component';
import { ListarPerguntasComponent } from './components/perguntas/listar-perguntas/listar-perguntas.component';
import { CadastrarPerguntaComponent } from './components/perguntas/cadastrar-pergunta/cadastrar-pergunta.component';
import { ResponderComponent } from './components/pesquisa/responder/responder.component';
import { FinalizadoComponent } from './components/pesquisa/finalizado/finalizado.component';
import { ModalEditarComponent } from './components/perguntas/modal-editar/modal-editar.component';
import { LinksComponent } from './components/pesquisa/links/links.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';


//------------------------------//
// Define as rotas da aplicação //
//------------------------------//
const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'areas/cadastrar', component: CadastrarSetorComponent, canActivate: [authGuard] },
  { path: 'areas/listar', component: ListarSetoresComponent, canActivate: [authGuard] },
  { path: 'areas/atualizar/:id', component: AtualizarSetorComponent, canActivate: [authGuard] },
  { path: 'perguntas/cadastrar', component: CadastrarPerguntaComponent, canActivate: [authGuard] },
  { path: 'perguntas/listar', component: ListarPerguntasComponent, canActivate: [authGuard] },
  { path: 'perguntas/editar/:id', component: ModalEditarComponent, canActivate: [authGuard] },
  { path: 'pesquisa/responder/:id', component: ResponderComponent },
  { path: 'pesquisa/responder/:id/finalizar', component: FinalizadoComponent },
  { path: 'pesquisa/link', component: LinksComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/login' }
];

//---------------------------//
// Exporta o módulo de rotas //
//---------------------------//
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

// Exporta a classe de rotas //
export class AppRoutingModule {}
