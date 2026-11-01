import { seletores } from './seletores';

export const navegacao = {
  acessarInicio() {
    cy.visit('/');
  },

  irParaLogin() {
    cy.get(seletores.linkLogin).should('be.visible').click();
  },

  irParaProdutos() {
    cy.get(seletores.linkProdutos).should('be.visible').click();
  },

  realizarLogout() {
    cy.get(seletores.linkLogout).should('be.visible').click();
  },
};
