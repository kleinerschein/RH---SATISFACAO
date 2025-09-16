export const SENIOR_DEFAULT_USER: string = 'luiz.preis';
export const SENIOR_DEFAULT_PASSWORD: string = '1234565';

export type SeniorOptions = {
  ['com.senior.g5.co.ger.cad.clientes']: 'obterCliente';
  ['wksTeste']:
    | 'wksConsultaIdentificador'
    | 'wksConsultaOrcamentoProdutos'
    | 'wksORC_PDF'
    | 'cadastroIdentificador'
    | 'cadLinhaIdentificador'
    | 'gerarValores'
    | 'getStatusImp'
    | 'adicionaProdutoSolto'
    | 'adicionarDesconto'
    | 'atualizaValorTOD';
  ['wksQuote'] : 
    | 'atualizarStatusIde' 
    | 'consultarFracoes'
    | 'consultaValorOrcado'
    | 'verificaAmbienteImportado'
    | 'consultarSoltos' 
    | 'atualizarSolto'
    | 'consultaValorTotalProposta'
    | 'cadContrato'
    | 'consultaAmbientes'
    | 'deleteFracao'
    | 'consultaFormaPagamento'
    | 'consultaFornecedor'
    | 'deleteSolto'
    | 'vincularIndentificador'
    | 'cadCabecalhoProposta'
    | 'cadTxtProposta'
    | 'deleteProposta';
  ['MCWFUsers'] : 'AuthenticateJAAS' 
    |  'GetUserGroups'
};
