//--------------------------------------------------//
// Importar os módulos necessários para a aplicação //
//--------------------------------------------------//
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { FieldsetModule } from 'primeng/fieldset';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { TooltipModule } from 'primeng/tooltip';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { DividerComponent } from './components/divider/divider.component';
import { ModalLoadingComponent } from './components/modal-loading/modal-loading.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoginComponent } from './components/login/login.component';
import { CardModule } from 'primeng/card';
import { CadastrarSetorComponent } from './components/setores/cadastrar-setor/cadastrar-setor.component';
import { ListarSetoresComponent } from './components/setores/listar-setores/listar-setores.component';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { AtualizarSetorComponent } from './components/setores/atualizar-setor/atualizar-setor.component';
import { CadastrarPerguntaComponent } from './components/perguntas/cadastrar-pergunta/cadastrar-pergunta.component';
import { ListarPerguntasComponent } from './components/perguntas/listar-perguntas/listar-perguntas.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CadastrarCategoriaComponent } from './components/perguntas/cadastrar-categoria/cadastrar-categoria.component';
import { ListboxModule } from 'primeng/listbox';
import { ResponderComponent } from './components/pesquisa/responder/responder.component';
import { DropdownModule } from 'primeng/dropdown';
import { FinalizadoComponent } from './components/pesquisa/finalizado/finalizado.component';
import { ChartModule } from 'primeng/chart';
import { SkeletonModule } from 'primeng/skeleton';
import { ModalBoasVindasComponent } from './components/pesquisa/modal-boas-vindas/modal-boas-vindas.component';
import { ModalEditarComponent } from './components/perguntas/modal-editar/modal-editar.component';
import { LinksComponent } from './components/pesquisa/links/links.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
//-----------------------------------------------//
// Configuração do módulo principal da aplicação //
//-----------------------------------------------//
@NgModule({
  declarations: [
    // Declaração dos componentes
    AppComponent,
    HomeComponent,
    DividerComponent,
    ModalLoadingComponent,
    LoginComponent,
    CadastrarSetorComponent,
    ListarSetoresComponent,
    AtualizarSetorComponent,
    CadastrarPerguntaComponent,
    ListarPerguntasComponent,
    CadastrarCategoriaComponent,
    ResponderComponent,
    FinalizadoComponent,
    ModalBoasVindasComponent,
    ModalEditarComponent,
    LinksComponent,
  ],
  imports: [
    // Importação dos módulos
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    InputTextModule,
    ButtonModule,
    ToolbarModule,
    PanelMenuModule,
    MenubarModule,
    SidebarModule,
    MenuModule,
    PanelModule,
    FieldsetModule,
    ToastModule,
    ConfirmDialogModule,
    DialogModule,
    FormsModule,
    MessagesModule,
    HttpClientModule,
    TooltipModule,
    TieredMenuModule,
    InputGroupModule,
    InputGroupAddonModule,
    ProgressSpinnerModule,
    CardModule,
    FloatLabelModule,
    InputTextareaModule,
    DividerModule,
    TableModule,
    IconFieldModule,
    InputIconModule,
    ReactiveFormsModule,
    AccordionModule,
    RadioButtonModule,
    ListboxModule,
    DropdownModule,
    ChartModule,
    SkeletonModule,
    ClipboardModule
  ],
  providers: [], // Provedores de serviços
  bootstrap: [AppComponent], // Componente inicial
})

// Exporta a classe do módulo principal
export class AppModule {}
