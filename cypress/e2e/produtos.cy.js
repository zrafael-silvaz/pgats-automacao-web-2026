/// <reference types="cypress"/>
import { navegacao } from '../support/modules/navegacao/acoes';
import { produtos } from '../support/modules/produtos/acoes';
import { validacaoNavegacao } from '../support/modules/navegacao/validacoes';
import { validacaoProdutos } from '../support/modules/produtos/validacoes';

describe('Produtos', () => {
  it('Verificando todos os produtos e a página de detalhe do produto', () => {
    navegacao.acessarInicio();
    validacaoNavegacao.inicioVisivel();

    navegacao.irParaProdutos();
    validacaoProdutos.paginaProdutosVisivel();
    validacaoProdutos.listaVisivel();
    cy.screenshot('lista-visivel');

    produtos.acessarDetalhesDoPrimeiroProduto();
    validacaoProdutos.paginaDetalheVisivel();
    validacaoProdutos.detalhesDoProdutoVisiveis();
    cy.screenshot('produto-visivel');
  });
});