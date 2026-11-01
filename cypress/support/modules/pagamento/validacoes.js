import { seletores } from './seletores';

const mensagens = {
  pedidoFeito: 'Order Placed!',
  mensagemPedido: 'Congratulations! Your order has been confirmed!',
};

export const validacaoPagamento = {
  formularioVisivel() {
    cy.get(seletores.formularioPagamento).should('exist');
  },

  pedidoRealizado() {
    cy.get(seletores.pedidoFeito).should('be.visible').and('contain.text', mensagens.pedidoFeito);
    cy.contains(seletores.mensagemSucesso, mensagens.mensagemPedido).should('be.visible');
  },
};