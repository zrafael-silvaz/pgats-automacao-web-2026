import { seletores } from './seletores';

export const assinatura = {
  acessarRodape() {
    cy.get(seletores.rodape).scrollIntoView().should('be.visible');
  },

  realizarAssinatura(email) {
    cy.get(seletores.campoEmail).should('be.visible').clear().type(email);
    cy.get(seletores.botaoAssinatura).should('be.visible').click();
  },
};