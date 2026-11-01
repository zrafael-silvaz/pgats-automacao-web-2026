import { seletores } from './seletores';

export const carrinho = {
  adicionarProduto() {
    cy.contains(seletores.botaoAdicionarProduto, 'Add to cart').should('be.visible').click();
  },

  acessarCarrinhoPeloModal() {
    cy.get(seletores.linkVisualizarCarrinho).should('be.visible').click();
  },

  prosseguirParaCheckout() {
    cy.contains(seletores.botaoProsseguirCheckout, 'Proceed To Checkout')
      .should('be.visible')
      .click();
  },
};