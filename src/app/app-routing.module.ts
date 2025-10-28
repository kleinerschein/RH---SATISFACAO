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


//------------------------------//
// Define as rotas da aplicação //
//------------------------------//
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'areas/cadastrar', component: CadastrarSetorComponent },
  { path: 'areas/listar', component: ListarSetoresComponent },
  { path: 'areas/atualizar/:id', component: AtualizarSetorComponent },
  { path: 'perguntas/cadastrar', component: CadastrarPerguntaComponent },
  { path: 'perguntas/listar', component: ListarPerguntasComponent },
  { path: 'perguntas/editar/:id', component: ModalEditarComponent },
  { path: 'pesquisa/responder/:id', component: ResponderComponent },
  { path: 'pesquisa/responder/:id/finalizar', component: FinalizadoComponent },
  { path: 'pesquisa/link', component: LinksComponent}
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
