import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { Area } from '../../types/area';
import { Resposta } from '../../types/resposta';
import { Excel } from '../exell/excel';

@Injectable({
  providedIn: 'root',
})
export class BancoService {
  private apiUrl = 'http://92.113.34.132:3000';

  constructor(private http: HttpClient) {}

  /*
   * Método para consultar o banco de dados
   * @param query A consulta SQL a ser executada
   * @returns Um Observable com o resultado da consulta
   */
  async consultarBanco(query: string) {
    const ENDPOINT = `${this.apiUrl}?query=${encodeURIComponent(query)}`;

    return await firstValueFrom(this.http.get<any>(ENDPOINT));
  }

  /*
   * Método para inserir uma nova área no banco de dados
   * @param nome Nome da área
   * @param descricao Descrição da área
   * @returns Um Observable com o resultado da inserção
   */
  async insertArea(nome: string, descricao: string) {
    try {
      const query = `INSERT INTO areas(\`nome\`, \`descricao\`) VALUES ('${nome}','${descricao}')`;

      const response = await this.consultarBanco(query);

      if (response && response.success) {
        return response.data;
      } else {
        throw new Error('Erro ao inserir área: ' + (response?.message || ''));
      }
    } catch (err) {
      console.error(err);
    }
  }

  /*
   * método para consultar as áreas cadastradas
   * @returns Um Observable com o resultado da consulta
   */
  async consultarAreas(): Promise<Area[]> {
    const query = 'SELECT * FROM areas';
    return await this.consultarBanco(query);
  }

  /*  * Método para consultar uma área específica pelo ID
   * @param id ID da área a ser consultada
   * @returns Um Observable com o resultado da consulta
   * */
  async consultarAreaPorId(id: number): Promise<Area | null> {
    const query = `SELECT * FROM areas WHERE id = ${id}`;
    const response = await this.consultarBanco(query);
    return response.length > 0 ? response[0] : null;
  }

  /*
   * Método para excluir uma área do banco de dados
   * @param id ID da área a ser excluída
   * @returns Um Observable com o resultado da exclusão
   * */
  async excluirArea(id: number) {
    const query = `DELETE FROM areas WHERE id = ${id}`;
    const response = await this.consultarBanco(query);

    if (!response || !response.affectedRows) {
      throw new Error('Erro ao excluir área: ' + (response?.message || ''));
    }
    return response;
  }

  /*  * Método para editar uma área no banco de dados
   * @param area Área a ser editada
   * @returns Um Observable com o resultado da edição
   * */
  async editarArea(area: Area) {
    const query = `UPDATE areas SET nome = '${area.nome}', descricao = '${area.descricao}' WHERE id = ${area.id}`;
    const response = await this.consultarBanco(query);
    if (!response || !response.affectedRows) {
      throw new Error('Erro ao editar área: ' + (response?.message || ''));
    }
    return response;
  }

  /*
   * Método para Cadastrar Categoria
   * @param nome Nome da categoria
   * @returns Um Observable com o resultado da inserção
   */
  async insertCategoria(nome: string) {
    try {
      const query = `INSERT INTO categoria(\`nome\`) VALUES ('${nome}')`;
      console.log('Consulta SQL para inserir categoria:', query);
      const response = await this.consultarBanco(query);
      console.log('Resposta do banco:', response);
      if (response && response.affectedRows) {
        return response;
      }
      throw new Error(
        'Erro ao inserir categoria: ' + (response?.message || '')
      );
    } catch (err) {
      console.error(err);
    }
  }

  /*
   * Método para consultar as categorias cadastradas
   * @returns Um Observable com o resultado da consulta
   */
  async consultarCategorias(): Promise<any[]> {
    const query = 'SELECT * FROM categoria';
    return await this.consultarBanco(query);
  }

  /*
   * Método para excluir uma categoria do banco de dados
   * @param id ID da categoria a ser excluída
   * @returns Um Observable com o resultado da exclusão
   * */
  async excluirCategoria(id: number) {
    const query = `DELETE FROM categoria WHERE id = ${id}`;
    const response = await this.consultarBanco(query);
    if (!response || !response.affectedRows) {
      throw new Error(
        'Erro ao excluir categoria: ' + (response?.message || '')
      );
    }
    return response;
  }

  /*
   * Método para inserir uma nova pergunta no banco de dados
   * @param pergunta Pergunta a ser inserida
   * @param categoriaId ID da categoria associada à pergunta
   */
  async insertPergunta(
    pergunta: string,
    categoriaId: number,
    descritiva: number = 0
  ) {
    try {
      const query = `INSERT INTO pergunta(\`pergunta\`, \`categoria_id\`, \`descritiva\`) VALUES ('${pergunta}', ${categoriaId}, ${descritiva})`;

      const response = await this.consultarBanco(query);
      if (response && response.affectedRows) {
        return response;
      } else {
        throw new Error(
          'Erro ao inserir pergunta: ' + (response?.message || '')
        );
      }
    } catch (err) {
      console.error(err);
    }
  }

  /*
   * Método para consultar as perguntas cadastradas
   * @returns Um Observable com o resultado da consulta
   */
  async getPerguntas(): Promise<any[]> {
    const query =
      'SELECT pergunta.id, pergunta,pergunta,pergunta.descritiva,categoria.nome as categoria FROM pergunta LEFT outer join categoria on pergunta.categoria_id = categoria.id';
    const perguntas = await this.consultarBanco(query);
    return perguntas;
  }

  /*
   * Método para consultar uma pergunta específica pelo ID
   * @param id ID da pergunta a ser consultada
   * @returns Um Observable com o resultado da consulta
   **/
  async getPerguntaById(id: string): Promise<any> {
    const query = `SELECT pergunta.id, pergunta.pergunta, pergunta.descritiva, categoria.id as categoria_id, categoria.nome as categoria FROM pergunta LEFT outer join categoria on pergunta.categoria_id = categoria.id WHERE pergunta.id = ${id}`;
    return this.consultarBanco(query).then((data) => data[0]);
  }

  /*  * Método para editar uma pergunta no banco de dados
   * @param id ID da pergunta a ser editada
   * @param pergunta Novo texto da pergunta
   *  @param categoriaId Novo ID da categoria associada à pergunta
   * @param descritiva Indica se a pergunta é descritiva (1) ou não (0)
   * @returns Um Observable com o resultado da edição
   * */
  async editarPergunta(
    id: string,
    pergunta: string,
    categoriaId: number,
    descritiva: number
  ) {
    const query = `UPDATE pergunta SET pergunta = '${pergunta}', categoria_id = ${categoriaId}, descritiva = ${descritiva} WHERE id = ${id}`;
    const response = await this.consultarBanco(query);
    if (!response || !response.affectedRows) {
      throw new Error('Erro ao editar pergunta: ' + (response?.message || ''));
    }
    return response;
  }

  /*   * Método para excluir uma pergunta do banco de dados
   * @param id ID da pergunta a ser excluída
   * @returns Um Observable com o resultado da exclusão
   * */
  async excluirPergunta(id: number) {
    const query = `DELETE FROM pergunta WHERE id = ${id}`;
    const response = await this.consultarBanco(query);
    if (!response || !response.affectedRows) {
      throw new Error('Erro ao excluir pergunta: ' + (response?.message || ''));
    }
    return response;
  }

  /*
   * Método para consultar categorias e perguntas
   * @returns Um array de objetos { nome: string, perguntas: string[] }
   */
  async consultarCategoriasEPerguntas(): Promise<
    { nome: string; perguntas: string[] }[]
  > {
    const query = `SELECT c.id AS categoria_id, c.nome AS categoria_nome, p.id AS pergunta_id, p.pergunta, p.descritiva FROM categoria c LEFT JOIN pergunta p ON c.id = p.categoria_id ORDER BY c.id, p.id`;
    const rows = await this.consultarBanco(query);

    // Agrupa as perguntas por categoria
    const categoriasMap = new Map<number, { nome: string; perguntas: any }>();

    for (const row of rows) {
      if (!categoriasMap.has(row.categoria_id)) {
        categoriasMap.set(row.categoria_id, {
          nome: row.categoria_nome,
          perguntas: [],
        });
      }
      if (row.pergunta) {
        categoriasMap.get(row.categoria_id)!.perguntas.push({
          pergunta: row.pergunta,
          descritiva: row.descritiva,
          id: row.pergunta_id,
        });
      }
    }

    return Array.from(categoriasMap.values());
  }

  async insertResposta(resposta: Resposta) {
    const query = `INSERT INTO respostas(pergunta_id, area_id, nota, sexo, genero, idade, texto) VALUES (${resposta.pergunta_id}, ${resposta.area_id}, ${resposta.nota}, '${resposta.sexo}', '${resposta.genero}', ${resposta.idade}, '${resposta.texto}')`;
    return this.consultarBanco(query);
  }

  //------------------------------//
  //  METODOS DOS IDENTIFICADORES //
  //------------------------------//
  async getMediaNotasPorCategoria() {
    const query = `SELECT c.nome AS categoria, ROUND(AVG(r.nota), 2) AS media FROM respostas r JOIN pergunta p ON r.pergunta_id = p.id JOIN categoria c ON p.categoria_id = c.id where p.descritiva = 0 and r.nota <> 0 GROUP BY c.nome;`;
    return this.consultarBanco(query);
  }

  async getMediaNotasPorArea() {
    const query = `SELECT a.nome AS area, ROUND(AVG(r.nota), 2) AS media, a.descricao FROM respostas r JOIN pergunta p ON r.pergunta_id = p.id JOIN areas a ON r.area_id = a.id where p.descritiva = 0 and r.nota <> 0 GROUP BY a.nome, a.descricao;`;
    return this.consultarBanco(query);
  }

  async getMediaNotasPorSexo() {
    const query = `SELECT sexo, ROUND(AVG(nota), 2) AS media FROM respostas GROUP BY sexo;`;
    return this.consultarBanco(query);
  }

  async getMediaNotasPorGenero() {
    const query = `SELECT genero, ROUND(AVG(nota), 2) AS media FROM respostas GROUP BY genero;`;
    return this.consultarBanco(query);
  }

  async notasPorPergunta() {
    const query =
      'SELECT p.pergunta, AVG(r.nota) as nota FROM respostas r JOIN pergunta p ON r.pergunta_id = p.id where p.descritiva = 0 GROUP BY p.pergunta';
    return this.consultarBanco(query);
  }

  async faixaEtaria() {
    const query = `SELECT
  CASE
    WHEN idade < 25 THEN 'Até 24'
    WHEN idade BETWEEN 25 AND 34 THEN '25 a 34'
    WHEN idade BETWEEN 35 AND 44 THEN '35 a 44'
    ELSE '45+'
  END AS faixa_etaria,
  ROUND(AVG(nota), 2) AS media
FROM respostas
GROUP BY faixa_etaria;
`;
    return this.consultarBanco(query);
  }

  async categoriaEArea() {
    const query = `SELECT a.descricao AS area, c.nome AS categoria, ROUND(AVG(r.nota), 2) AS media
FROM respostas r
JOIN areas a ON r.area_id = a.id
JOIN pergunta p ON r.pergunta_id = p.id
JOIN categoria c ON p.categoria_id = c.id
where p.descritiva = 0
GROUP BY a.nome, c.nome;
`;

    return this.consultarBanco(query);
  }

  async downloadPesquisa() {
  const queries = {
    respostas_brutas: `
      SELECT a.descricao AS area, c.nome as categoria, p.pergunta, r.nota, r.sexo, r.genero, r.idade, r.texto,
      COUNT(*) AS quantidade, ROUND(AVG(r.nota) OVER (PARTITION BY p.id), 2) AS media
      FROM respostas r
      JOIN pergunta p ON r.pergunta_id = p.id
      JOIN areas a ON r.area_id = a.id
      JOIN categoria c ON c.id = p.categoria_id 
      GROUP BY a.nome, p.pergunta, r.nota, p.id, r.sexo, r.genero, r.idade
      ORDER BY a.nome, p.pergunta;
    `,
    media_por_pergunta: `
      SELECT p.pergunta, ROUND(AVG(r.nota),2) AS media
      FROM respostas r 
      JOIN pergunta p ON r.pergunta_id = p.id 
      WHERE p.descritiva = 0 AND r.nota <> 0
      GROUP BY p.pergunta;
    `,
    media_por_sexo: `
      SELECT sexo, ROUND(AVG(nota), 2) AS media FROM respostas WHERE nota <> 0 GROUP BY sexo;
    `,
    media_por_area: `
      SELECT a.descricao AS area, ROUND(AVG(r.nota), 2) AS media
      FROM respostas r 
      JOIN pergunta p ON r.pergunta_id = p.id 
      JOIN areas a ON r.area_id = a.id 
      WHERE p.descritiva = 0 AND r.nota <> 0 
      GROUP BY a.descricao;
    `,
    media_por_categoria: `
      SELECT c.nome AS categoria, ROUND(AVG(r.nota), 2) AS media
      FROM respostas r 
      JOIN pergunta p ON r.pergunta_id = p.id 
      JOIN categoria c ON p.categoria_id = c.id 
      WHERE p.descritiva = 0 AND r.nota <> 0 
      GROUP BY c.nome;
    `,
    media_por_area_categoria: `
      SELECT a.descricao AS area, c.nome AS categoria, ROUND(AVG(r.nota), 2) AS media
      FROM respostas r
      JOIN areas a ON r.area_id = a.id
      JOIN pergunta p ON r.pergunta_id = p.id
      JOIN categoria c ON p.categoria_id = c.id
      WHERE p.descritiva = 0 AND r.nota <> 0 
      GROUP BY a.descricao, c.nome;
    `,
    media_por_pergunta_area: `
      SELECT a.descricao AS area, p.pergunta, ROUND(AVG(r.nota),2) AS media
      FROM respostas r 
      JOIN pergunta p ON r.pergunta_id = p.id 
      JOIN areas a ON r.area_id = a.id 
      WHERE p.descritiva = 0 AND r.nota <> 0
      GROUP BY a.descricao, p.pergunta 
      ORDER BY a.descricao, p.pergunta;
    `
  };

  // 🔹 Executa todas as consultas
  const results = await Promise.all(
    Object.entries(queries).map(async ([name, sql]) => {
      const data = await this.consultarBanco(sql);
      return [name, data];
    })
  );

  // 🔹 Converte em objeto para o método exportMultipleToExcel
  const datasets = Object.fromEntries(results);

  // 🔹 Exporta para Excel com múltiplas abas
  Excel.exportMultipleToExcel(datasets, 'PesquisaGPTW');
}

  async quantidadeRespostasPorArea(){
    const query = `SELECT 
  areas.nome,
  areas.descricao,
  round(COUNT(*) / 34) AS total_respostas
FROM respostas
join areas on respostas.area_id = areas.id
GROUP BY area_id;
`;
    return this.consultarBanco(query);
  }

  async getLinks(): Promise<any[]> {
    const query = 'SELECT * FROM links';
    return await this.consultarBanco(query);
  }

  async atualizaUuidLink(numero: number, uuid: string): Promise<any> {
    const query = `UPDATE links SET uuid = '${uuid}', status = 0 WHERE numero = ${numero}`;
    const response = await this.consultarBanco(query);
    return response;
  }

  async atualizaStatusLink(numero: number, status: string): Promise<any> {
    const query = `UPDATE links SET status = '${status}' WHERE numero = ${numero}`;
    const response = await this.consultarBanco(query);
    return response;
  }

  async atualizaStatusLinkPorUuid(uuid: string, status: string): Promise<any> {
    const query = `UPDATE links SET status = '${status}' WHERE uuid = '${uuid}'`;
    const response = await this.consultarBanco(query);
    return response;
  }

  async validaUuidLink(uuid: string): Promise<any> {
    const query = `SELECT 1 as EXISTE FROM links WHERE uuid = '${uuid}' and status = 0`;
    const response = await this.consultarBanco(query);

    if (response.length == 0) {
      return false;
    }

    if (response[0].EXISTE == 0) {
      return false;
    }

    return true;
  }

  async mediaGeral(){
    const query = `SELECT ROUND(AVG(nota), 2) AS media_geral FROM respostas where nota > 0;`;
    return this.consultarBanco(query);
  }

  async limparRespostas() {
    const query = `DELETE FROM respostas`;
    const response = await this.consultarBanco(query);
    return response;
  }
}
