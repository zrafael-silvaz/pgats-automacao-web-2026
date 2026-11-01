/// <reference types="cypress"/>
import { gerarUsuario } from '../support/fabricas/fabricaUsuario';
import { usuarioApi } from '../support/api/usuarioApi';
import { navegacao } from '../support/modules/navegacao/acoes';
import { autenticacao } from '../support/modules/autenticacao/acoes';
import { validacaoNavegacao } from '../support/modules/navegacao/validacoes';
import { validacaoAutenticacao } from '../support/modules/autenticacao/validacoes';

describe('Logout', () => {
  let usuario;

  beforeEach(() => {
    usuario = gerarUsuario();
    usuarioApi.criar(usuario);
  });

  afterEach(() => {
    usuarioApi.excluir(usuario);
  });

  it('Realizando logout do usuário', () => {
    navegacao.acessarInicio();
    validacaoNavegacao.inicioVisivel();

    navegacao.irParaLogin();
    validacaoNavegacao.telaLoginVisivel();

    autenticacao.realizarLogin(usuario);
    validacaoAutenticacao.loginRealizado(usuario.primeiroNome);

    navegacao.realizarLogout();

    validacaoNavegacao.telaLoginVisivel();
    cy.screenshot('logout-realizado');
  });
});