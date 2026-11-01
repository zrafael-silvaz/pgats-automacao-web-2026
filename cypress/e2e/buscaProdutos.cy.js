/// <reference types="cypress"/>
import { navegacao } from '../support/modules/navegacao/acoes';
import { produtos } from '../support/modules/produtos/acoes';
import { validacaoNavegacao } from '../support/modules/navegacao/validacoes';
import { validacaoProdutos } from '../support/modules/produtos/validacoes';

const termoBusca = 'blue';

describe('Busca de produtos', () => {
  it('Pesquisando um produto existente', () => {
    navegacao.acessarInicio();
    validacaoNavegacao.inicioVisivel();

    navegacao.irParaProdutos();
    validacaoProdutos.paginaProdutosVisivel();

    produtos.pesquisarProduto(termoBusca);

    validacaoProdutos.buscaRealizada(termoBusca);
    validacaoProdutos.produtosPesquisadosVisivel();
    validacaoProdutos.resultadosRelacionados(termoBusca);
    cy.screenshot('lista-produtos');

    produtos.acessarResultadoDaBusca(termoBusca);
    
    validacaoProdutos.produtosPesquisadosVisivel();
    validacaoProdutos.cartoesCompletos();
    validacaoProdutos.precosValidos();
    cy.screenshot('produtos-buscados');
  });
});
