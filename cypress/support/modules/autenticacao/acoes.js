import { seletores } from './seletores';

export const autenticacao = {
  realizarLogin({ email, senha }) {
    cy.get(seletores.email).should('be.visible').type(email);
    cy.get(seletores.senha).should('be.visible').type(senha, { log: false });
    cy.get(seletores.botao).should('be.visible').click();
  },
};