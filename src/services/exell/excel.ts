import * as ExcelJS from 'exceljs';
import * as FileSaver from 'file-saver';

export class Excel {
  /**
   * Exporta múltiplos datasets (cada um vira uma aba)
   * @param datasets - objeto { nomeAba: dados[] }
   * @param filename - nome do arquivo Excel
   */
  static exportMultipleToExcel(datasets: Record<string, any[]>, filename: string): void {
    const workbook = new ExcelJS.Workbook();

    // 🔹 Cria uma aba para cada conjunto de dados
    Object.entries(datasets).forEach(([sheetName, data], index) => {
      const worksheet = workbook.addWorksheet(this.formatSheetName(sheetName, index));

      if (!data || data.length === 0) {
        worksheet.addRow(['Sem dados disponíveis']);
        return;
      }

      // Define colunas com base nas chaves do primeiro objeto
      const columns = Object.keys(data[0]).map(key => ({
        header: key.toUpperCase(),
        key,
        width: 22,
      }));
      worksheet.columns = columns;

      // Adiciona linhas
      data.forEach(item => {
        const row = worksheet.addRow(item);

        // Se existir campo "media", aplica destaque visual
        if ('media' in item) {
          const media = Number(item.media);
          const cell = row.getCell('media');
          cell.fill = this.getMediaFill(media);
          cell.font = { bold: true };
        }
      });
    });

    // 🔹 Salva o arquivo Excel
    workbook.xlsx.writeBuffer().then(buffer => {
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      FileSaver.saveAs(blob, `${filename}.xlsx`);
    });
  }

  /** 🔹 Mantido: método para gerar a cor conforme média */
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

  /** 🔹 Formata nomes de abas (máx 31 caracteres e sem caracteres inválidos) */
  private static formatSheetName(name: string, index: number): string {
    const clean = name.replace(/[^a-zA-Z0-9 ]/g, ' ').substring(0, 28);
    return `${index + 1} - ${clean}`;
  }
}
