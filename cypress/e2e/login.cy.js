/// <reference types="cypress"/>
import usuarios from '../fixtures/usuarios.json';
import { gerarUsuario } from '../support/fabricas/fabricaUsuario';
import { usuarioApi } from '../support/api/usuarioApi';
import { navegacao } from '../support/modules/navegacao/acoes';
import { autenticacao } from '../support/modules/autenticacao/acoes';
import { validacaoAutenticacao } from '../support/modules/autenticacao/validacoes';

describe('Login', () => {
  describe('com credenciais válidas', () => {
    let usuario;

    beforeEach(() => {
      usuario = gerarUsuario();
      usuarioApi.criar(usuario);

      navegacao.acessarInicio();
      navegacao.irParaLogin();
    });

    afterEach(() => {
      usuarioApi.excluir(usuario);
    });

    it('Acessando com email e senha corretos', () => {
      autenticacao.realizarLogin(usuario);

      validacaoAutenticacao.loginRealizado(usuario.primeiroNome);
      cy.screenshot('login-realizado');
    });
  });

  describe('com credenciais inválidas', () => {
    beforeEach(() => {
      navegacao.acessarInicio();
      navegacao.irParaLogin();
    });

    it('Acessando com email e senha incorretos', () => {
      autenticacao.realizarLogin(usuarios.invalido);

      validacaoAutenticacao.loginInvalido();
      cy.screenshot('login-invalido');
    });
  });
});