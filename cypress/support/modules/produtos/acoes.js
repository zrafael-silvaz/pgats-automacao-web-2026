import { seletores } from './seletores';

export const produtos = {
  acessarDetalhesDoPrimeiroProduto() {
    cy.get(seletores.linkDetalhes).first().should('be.visible').click();
  },

  pesquisarProduto(termo) {
    cy.get(seletores.campoBusca).should('be.visible').clear().type(termo);
    cy.get(seletores.botaoBusca).should('be.visible').click();
  },

  acessarResultadoDaBusca(termo) {
    cy.visit(`/products?search=${encodeURIComponent(termo)}`);
  },
};