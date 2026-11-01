import { seletores } from './seletores';
import { seletores as seletoresNavegacao } from '../navegacao/seletores';

const mensagens = {
  usuarioLogado: 'Logged in as',
  loginInvalido: 'Your email or password is incorrect!',
};

export const validacaoAutenticacao = {
  loginRealizado(nomeUsuario) {
    cy.contains(seletoresNavegacao.usuarioLogado, `${mensagens.usuarioLogado} ${nomeUsuario}`)
      .should('be.visible');
  },

  loginInvalido() {
    cy.contains(seletores.mensagemErro, mensagens.loginInvalido)
      .should('be.visible');
  },
};