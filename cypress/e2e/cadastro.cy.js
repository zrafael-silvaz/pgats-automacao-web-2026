/// <reference types="cypress"/>
import { gerarUsuario } from '../support/fabricas/fabricaUsuario';
import { usuarioApi } from '../support/api/usuarioApi';
import { navegacao } from '../support/modules/navegacao/acoes';
import { cadastro } from '../support/modules/cadastro/acoes';
import { validacaoNavegacao } from '../support/modules/navegacao/validacoes';
import { validacaoCadastro } from '../support/modules/cadastro/validacoes';

describe('Cadastro de usuário', () => {
  let usuario;

  beforeEach(() => {
    usuario = gerarUsuario();
  });

  afterEach(() => {
    usuarioApi.excluir(usuario);
  });

  it('Criando usuário', () => {
    navegacao.acessarInicio();
    navegacao.irParaLogin();

    cadastro.iniciarCadastro(usuario);
    validacaoCadastro.dadosPreenchidos(usuario);

    cadastro.preencherDadosDaConta(usuario);
    cadastro.preencherEndereco(usuario);
    cadastro.concluirCadastro();

    validacaoCadastro.contaCriada();
    cy.screenshot('conta-criada');
  });

  it('Cadastrando usuário com email já existente', () => {
    usuarioApi.criar(usuario); // pré-condição: o email já está cadastrado

    navegacao.acessarInicio();
    validacaoNavegacao.inicioVisivel();

    navegacao.irParaLogin();
    validacaoCadastro.formularioCadastroVisivel();

    cadastro.iniciarCadastro(usuario);

    validacaoCadastro.emailJaCadastrado();
    cy.screenshot('email-ja-existente');
  });
});