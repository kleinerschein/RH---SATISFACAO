import { Component, ViewChild } from '@angular/core';
import { BancoService } from '../../../services/Banco/banco.service';
import { ModalLoadingComponent } from '../modal-loading/modal-loading.component';
import { Excel } from '../../../services/exell/excel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  @ViewChild(ModalLoadingComponent)
  modalLoading!: ModalLoadingComponent;
  
  chartData: any;
  chartOptions: any;

  chartAreaData: any;
  chartSexoData: any;
  chartGeneroData: any;
  chartNotaPergunta: any;
  chartFaixaEtariaData: any;
  chartAreaCategoria: any;

  constructor(private bancoService: BancoService) {}

  async ngOnInit(): Promise<void> {
    this.modalLoading?.startLoading();

    try {
      const [
        dados,
        dadosArea,
        dadosSexo,
        dadosGenero,
        dadosNotaPergunta,
        dadosFaixaEtaria,
        dadosAreaCategoria,
      ] = await Promise.all([
        this.bancoService.getMediaNotasPorCategoria(),
        this.bancoService.getMediaNotasPorArea(),
        this.bancoService.getMediaNotasPorSexo(),
        this.bancoService.getMediaNotasPorGenero(),
        this.bancoService.notasPorPergunta(),
        this.bancoService.faixaEtaria(),
        this.bancoService.categoriaEArea(),
      ]);

      const generoColors: Record<string, { bg: string; border: string }> = {
        H: { bg: 'rgba(33,150,243,0.2)', border: '#2196F3' },
        HO: { bg: 'rgba(156,39,176,0.2)', border: '#9C27B0' },
        B: { bg: 'rgba(255,193,7,0.2)', border: '#FFC107' },
        A: { bg: 'rgba(76,175,80,0.2)', border: '#4CAF50' },
      };

      const sexoColors: Record<string, { bg: string; border: string }> = {
        M: { bg: 'rgba(33,150,243,0.2)', border: '#2196F3' },
        F: { bg: 'rgba(255,64,129,0.2)', border: '#FF4081' },
        O: { bg: 'rgb(220, 176, 99, 0.2)', border: 'rgb(241, 178, 99, 0.9)' },
      };

      this.chartData = {
        labels: dados?.map((d: any) => d.categoria) ?? [],
        datasets: [
          {
            label: 'Média das Notas por Categoria',
            data: dados?.map((d: any) => d.media) ?? [],
            backgroundColor: '#42A5F5',
          },
        ],
      };

      this.chartAreaData = {
        labels: dadosArea?.map((area: any) => area.area) ?? [],
        datasets: [
          {
            label: 'Média das Notas por Área',
            data: dadosArea?.map((area: any) => Number(area.media)) ?? [],
            backgroundColor: 'rgba(102,187,106,0.2)',
            borderColor: '#66BB6A',
            fill: true,
            tension: 0.4,
          },
        ],
      };

      this.chartSexoData = {
        labels:
          dadosSexo?.map((d: any) => d.sexo === 'M' ? 'Masculino' : d.sexo === 'F' ? 'Feminino' : d.sexo === 'O' ? 'Outros' : d.sexo) ?? [],
        datasets: [
          {
            label: 'Média das Notas por Sexo',
            data: dadosSexo?.map((d: any) => d.media) ?? [],
            backgroundColor: dadosSexo?.map((d: any) => sexoColors[d.sexo]?.bg ?? 'rgba(233,30,99,0.2)') ?? [],
            borderColor: dadosSexo?.map((d: any) => sexoColors[d.sexo]?.border ?? '#E91E63') ?? [],
            fill: true,
            tension: 0.4,
          },
        ],
      };

      this.chartGeneroData = {
        labels:
          dadosGenero?.map((d: any) => {
            switch (d.genero) {
              case 'H': return 'Heterossexual';
              case 'HO': return 'Homossexual';
              case 'B': return 'Bissexual';
              case 'A': return 'Assexual';
              default: return d.genero;
            }
          }) ?? [],
        datasets: [
          {
            label: 'Média das Notas por Gênero',
            data: dadosGenero?.map((d: any) => d.media) ?? [],
            backgroundColor: dadosGenero?.map((d: any) => generoColors[d.genero]?.bg ?? 'rgba(233,30,99,0.2)') ?? [],
            borderColor: dadosGenero?.map((d: any) => generoColors[d.genero]?.border ?? '#E91E63') ?? [],
            fill: true,
            tension: 0.4,
          },
        ],
      };

      this.chartNotaPergunta = {
        labels: dadosNotaPergunta?.map((d: any) => d.pergunta.slice(0, 50) + '...') ?? [],
        datasets: [
          {
            label: 'Média das Notas por Pergunta',
            data: dadosNotaPergunta?.map((d: any) => Number(d.nota)) ?? [],
            backgroundColor: dadosNotaPergunta?.map(() => this.getRandomColor()) ?? [],
          },
        ],
      };

      this.chartFaixaEtariaData = {
        labels: dadosFaixaEtaria?.map((d: any) => d.faixa_etaria) ?? [],
        datasets: [
          {
            label: 'Média das Notas por Faixa Etária',
            data: dadosFaixaEtaria?.map((d: any) => Number(d.media)) ?? [],
            backgroundColor: dadosFaixaEtaria?.map(() => this.getRandomColor()) ?? [],
            borderColor: dadosFaixaEtaria?.map(() => this.getRandomColor()) ?? [],
            fill: true,
            tension: 0.4,
          },
        ],
      };

      const categorias = Array.from(new Set(dadosAreaCategoria?.map((d: any) => d.categoria) ?? []));
      const areasUnicas = Array.from(new Set(dadosAreaCategoria?.map((d: any) => d.area) ?? [])) as string[];

      this.chartAreaCategoria = {
        labels: categorias,
        datasets: areasUnicas.map((area: string, index: number) => ({
          label: area,
          data: categorias.map((cat) => {
            const item = dadosAreaCategoria.find((d: any) => d.area === area && d.categoria === cat);
            return item ? Number(item.media) : 0;
          }),
          backgroundColor: this.getColor(index),
          borderColor: this.getColor(index),
          fill: false,
          tension: 0.4,
        })),
      };

      this.chartOptions = {
        responsive: true,
        plugins: {
          legend: {
            display: true,
          },
        },
        scales: {
          x: {
            ticks: {
              maxRotation: 30,
              minRotation: 30,
              autoSkip: true,
            },
          },
          y: {
            beginAtZero: true,
          },
        },
      };
    } catch (error) {
      // Handle error if needed
      console.error(error);
    } finally {
      this.modalLoading?.stopLoading();
    }
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  getColor(index: number): string {
    const colors = [
      '#42A5F5',
      '#66BB6A',
      '#FFA726',
      '#AB47BC',
      '#EC407A',
      '#FF7043',
    ];
    return colors[index % colors.length];
  }

  async downloadExcell() {
    this.modalLoading?.startLoading();
    const dados = await this.bancoService.dowloadPesquisa()
    Excel.exportToExcel(dados, 'pesquisa');
    this.modalLoading?.stopLoading();
  }
}
 