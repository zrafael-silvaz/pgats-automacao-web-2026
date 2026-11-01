import { seletores } from './seletores';
import { seletores as seletoresAutenticacao } from '../autenticacao/seletores';

const mensagens = {
  tituloSite: 'Automation Exercise',
  caminhoLogin: '/login',
};

export const validacaoNavegacao = {
  inicioVisivel() {
    cy.title().should('eq', mensagens.tituloSite);
    cy.get(seletores.banner).should('be.visible');
  },

  telaLoginVisivel() {
    cy.url().should('include', mensagens.caminhoLogin);
    cy.contains(seletoresAutenticacao.titulo, 'Login to your account')
      .should('be.visible');
  },
};