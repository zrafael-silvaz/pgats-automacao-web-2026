import { seletores } from './seletores';

const mensagens = {
  tituloAssinatura: 'Subscription',
  assinaturaRealizada: 'You have been successfully subscribed!',
};

export const validacaoAssinatura = {
  tituloAssinaturaVisivel() {
    cy.contains(seletores.titulo, mensagens.tituloAssinatura).should('be.visible');
  },

  assinaturaRealizada() {
    cy.get(seletores.mensagemSucesso)
      .should('be.visible')
      .and('contain.text', mensagens.assinaturaRealizada);
  },
};