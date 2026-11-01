import { seletores } from './seletores';

export const validacaoCarrinho = {
  carrinhoVisivel() {
    cy.get(seletores.informacoesCarrinho).should('be.visible');
  },

  produtoAdicionado() {
    cy.get(seletores.linhasProdutos).should('be.visible').and('have.length.at.least', 1);
  },
};