import * as ExcelJS from 'exceljs';
import * as FileSaver from 'file-saver';

export class Excel {
  static exportToExcel(data: any[], filename: string): void {
    const workbook = new ExcelJS.Workbook();

    /** ========================
     *  ABA 1: Respostas Brutas
     =========================== */
    const worksheet1 = workbook.addWorksheet('Respostas GPTW');

    const columns = Object.keys(data[0] || {}).map(key => ({
      header: key.toUpperCase(),
      key,
      width: 20,
    }));
    worksheet1.columns = columns;

    data.forEach(item => {
      const row = worksheet1.addRow(item);

      if ('media' in item) {
        const media = Number(item.media);
        const cell = row.getCell('media');

        cell.fill = this.getMediaFill(media);
        cell.font = { bold: true };
      }
    });

    /** ========================
     *  ABA 2: Resumo por Área
     =========================== */
    const worksheet2 = workbook.addWorksheet('Resumo por Área');

    // Agrupamento: categoria > pergunta > área = média
    const grouped: Record<string, Record<string, Record<string, number>>> = {};

    data.forEach((item) => {
      const { categoria, pergunta, area, media } = item;

      if (!grouped[categoria]) grouped[categoria] = {};
      if (!grouped[categoria][pergunta]) grouped[categoria][pergunta] = {};
      grouped[categoria][pergunta][area] = Number(media);
    });

    const areas = Array.from(new Set(data.map(d => d.area)));

    // Cabeçalho
    worksheet2.addRow(['Categoria', 'Pergunta', ...areas]);

    // Dados
    Object.entries(grouped).forEach(([categoria, perguntas]) => {
      Object.entries(perguntas).forEach(([pergunta, areaMedias]) => {
        const rowData = [categoria, pergunta];

        areas.forEach(area => {
          rowData.push(areaMedias[area] !== undefined ? areaMedias[area].toString() : '');
        });

        const row = worksheet2.addRow(rowData);

        // Estilo condicional nas células das áreas
        areas.forEach((area, idx) => {
          const media = areaMedias[area];
          if (media !== undefined) {
            const cell = row.getCell(idx + 3); // +3 por causa de Categoria e Pergunta
            cell.fill = this.getMediaFill(media);
            cell.font = { bold: true };
          }
        });
      });
    });

    /** ========================
     *  Salvar Excel
     =========================== */
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      FileSaver.saveAs(blob, `${filename}.xlsx`);
    });
  }

  /** Cor de preenchimento conforme média */
  private static getMediaFill(media: number): ExcelJS.Fill {
    let color = 'FFFFFF'; // Branco padrão

    if (media <= 50) color = 'FF0000';       // Vermelho
    else if (media <= 75) color = 'FFFF00';  // Amarelo
    else if (media <= 85) color = 'A8E6A2';  // Verde claro
    else color = '1D8348';                   // Verde escuro

    return {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: color },
    };
  }
}
