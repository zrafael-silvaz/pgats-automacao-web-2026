import { seletores } from './seletores';

export const pagamento = {
  preencherDadosCartao({ nome, numero, codigo, mes, ano }) {
    cy.get(seletores.nomeCartao).should('be.visible').clear().type(nome);
    cy.get(seletores.numeroCartao).should('be.visible').clear().type(numero);
    cy.get(seletores.codigoSeguranca).should('be.visible').clear().type(codigo);
    cy.get(seletores.mesValidade).should('be.visible').clear().type(mes);
    cy.get(seletores.anoValidade).should('be.visible').clear().type(ano);
  },

  confirmarPagamento() {
    cy.get(seletores.botaoConfirmarPagamento).should('be.visible').click();
  },
};