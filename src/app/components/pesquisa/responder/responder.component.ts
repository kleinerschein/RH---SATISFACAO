import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { BancoService } from '../../../../services/Banco/banco.service';
import { Area } from '../../../../types/area';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ModalBoasVindasComponent } from '../../modal-boas-vindas/modal-boas-vindas.component';

@Component({
  selector: 'app-responder',
  templateUrl: './responder.component.html',
  styleUrl: './responder.component.css',
})

export class ResponderComponent implements OnInit {
  @ViewChild(ModalBoasVindasComponent) modalBoasVindas!: ModalBoasVindasComponent;

  form!: FormGroup;
  idade!: number;
  areas: Area[] = [];
  selectedArea: any;
  loading: boolean = true;
  escala = [
    { label: 'Insatisfeito', value: 25 },
    { label: 'Pouco Satisfeito', value: 50 },
    { label: 'Satisfeito', value: 75 },
    { label: 'Muito Satisfeito', value: 100 },
  ];

  activeTabs: number[] = [];

  categorias: any[] = [];
  sexoOptions = [
    { label: 'Masculino', value: 'M' },
    { label: 'Feminino', value: 'F' },
    { label: 'Outro', value: 'O' },
  ];

  generoOptions = [
    {
      label: 'Heterossexual',
      value: 'H',
      tooltip: 'Atração por pessoas do sexo oposto',
    },
    {
      label: 'Homossexual',
      value: 'HO',
      tooltip: 'Atração por pessoas do mesmo sexo',
    },
    {
      label: 'Bissexual',
      value: 'B',
      tooltip: 'Atração por pessoas de ambos os sexos',
    },
    {
      label: 'Assexual',
      value: 'A',
      tooltip: 'Não sente atração sexual por ninguém',
    },
  ];

  constructor(
    private fb: FormBuilder,
    private bancoService: BancoService,
    private messageService: MessageService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.modalBoasVindas?.show();
    const response = await this.bancoService.consultarCategoriasEPerguntas();
    this.categorias = response;

    this.areas = await this.bancoService.consultarAreas();

    this.areas = this.areas.map((area) => ({
      ...area,
      nome: area.nome + " | " + area.descricao,
    }));

    this.form = this.fb.group({
      respostas: this.fb.array(
        this.categorias.flatMap((cat) =>
          cat.perguntas.map(() => this.fb.control(null, Validators.required))
        )
      ),
      idade: this.fb.control(null, Validators.required),
      sexo: this.fb.control(null, Validators.required),
      genero: this.fb.control(null, Validators.required),
      area: this.fb.control(null, Validators.required),
      texto: this.fb.control(null),
    });

    this.loading = false;
  }

  get respostas(): FormArray {
    return this.form.get('respostas') as FormArray;
  }

  onSubmit() {
    if (this.form.valid) {
      const respostasForm = this.respostas.value;

      // Índice para acompanhar o controle correto
      let index = 0;
      const respostasComIds = [];

      for (let cat of this.categorias) {
        for (let pergunta of cat.perguntas) {
          respostasComIds.push({
            perguntaId: pergunta.id, // supondo que o ID da pergunta seja 'id'
            resposta: respostasForm[index],
          });
          index++;
        }
      }

      respostasComIds.forEach((resposta) => {
        const valorResposta = Number(resposta.resposta);
        const nota = isNaN(valorResposta) ? 0 : valorResposta;

        this.bancoService.insertResposta({
          pergunta_id: resposta.perguntaId,
          area_id: this.form.get('area')?.value.id,
          nota: nota,
          sexo: this.form.get('sexo')?.value,
          genero: this.form.get('genero')?.value,
          idade: this.form.get('idade')?.value,
          texto: resposta.resposta ?? '',
        });
      });

      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Respostas enviadas com sucesso!',
      });

      setTimeout(() => {
        this.router.navigate(['/pesquisa/responder/finalizar']);
      }, 1000);
    } else {
      this.form.markAllAsTouched();
    }
  }

  getFormControl(index: number): FormControl {
    return this.respostas.at(index) as FormControl;
  }

  getIndex(i: number, j: number): number {
    // Calcula o índice com base nas categorias e perguntas anteriores
    let index = 0;
    for (let x = 0; x < i; x++) {
      index += this.categorias[x].perguntas.length;
    }
    return index + j;
  }
}
