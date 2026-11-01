import { seletores } from './seletores';

export const checkout = {
  preencherComentario(comentario) {
    cy.get(seletores.comentarioPedido).should('be.visible').clear().type(comentario);
  },

  realizarPedido() {
    cy.get(seletores.botaoRealizarPedido).should('be.visible').click();
  },
};