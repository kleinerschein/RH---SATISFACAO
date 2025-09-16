export class CSVHandler {
  /**
   * Converte um array de objetos para uma string no formato CSV.
   * @param data Array de objetos
   * @returns Conteúdo CSV como string
   */
  static toCSV(data: any[]): string {
    if (!data || data.length === 0) return '';

    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row =>
      Object.values(row).map(value => `"${String(value).replace(/"/g, '""')}"`).join(',')
    );

    return [headers, ...rows].join('\r\n');
  }

  /**
   * Gera um arquivo CSV e inicia o download.
   * @param data Array de dados (objetos)
   * @param filename Nome do arquivo (com .csv no final)
   */
  static downloadCSV(data: any[], filename: string): void {
    const csv = CSVHandler.toCSV(data);

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
