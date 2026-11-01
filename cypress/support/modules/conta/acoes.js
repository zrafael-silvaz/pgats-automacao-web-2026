import { seletores as seletoresCadastro } from '../cadastro/seletores';

export const conta = {
  excluirConta() {
    cy.get(seletoresCadastro.exclusao.linkExcluirConta).should('be.visible').click();
  },

  continuar() {
    cy.get(seletoresCadastro.resultado.botaoContinuar).should('be.visible').click();
  },
};