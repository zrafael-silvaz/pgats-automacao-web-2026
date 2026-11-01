import { seletores as seletoresCadastro } from '../cadastro/seletores';

const mensagens = {
  contaExcluida: 'Account Deleted!',
};

export const validacaoConta = {
  contaExcluida() {
    cy.get(seletoresCadastro.resultado.tituloContaExcluida)
      .should('be.visible')
      .and('contain.text', mensagens.contaExcluida);
  },
};