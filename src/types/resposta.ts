export interface Resposta {
  pergunta_id: number; // ID da pergunta respondida
  area_id: number; // ID da área relacionada à pergunta
  nota: number; // Nota dada pelo usuário
  sexo: string; // Sexo do usuário (M/F)
  genero: string; // Gênero do usuário
  idade: number; // Idade do usuário
  texto: string; // Resposta em texto, se aplicável
}