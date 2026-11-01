/// <reference types="cypress"/>

import { gerarUsuario } from '../support/fabricas/fabricaUsuario';

import { navegacao } from '../support/modules/navegacao/acoes';
import { cadastro } from '../support/modules/cadastro/acoes';
import { carrinho } from '../support/modules/carrinho/acoes';
import { checkout } from '../support/modules/checkout/acoes';
import { pagamento } from '../support/modules/pagamento/acoes';
import { conta } from '../support/modules/conta/acoes';
import { autenticacao } from '../support/modules/autenticacao/acoes';

import { usuarioApi } from '../support/api/usuarioApi';

import { validacaoNavegacao } from '../support/modules/navegacao/validacoes';
import { validacaoCadastro } from '../support/modules/cadastro/validacoes';
import { validacaoAutenticacao } from '../support/modules/autenticacao/validacoes';
import { validacaoCarrinho } from '../support/modules/carrinho/validacoes';
import { validacaoCheckout } from '../support/modules/checkout/validacoes';
import { validacaoPagamento } from '../support/modules/pagamento/validacoes';
import { validacaoConta } from '../support/modules/conta/validacoes';

import { dadosPagamento } from '../support/utils/dadosCartao';

describe('Checkout', () => {
  let usuario;  

  const comentario = 'Favor entregar o pedido em horario comercial.';

  afterEach(() => {
    if (usuario) {
      usuarioApi.excluir(usuario);
    }
  });

  it('Realizando pedido com cadastro antes do checkout', () => {
    usuario = gerarUsuario();

    navegacao.acessarInicio();
    validacaoNavegacao.inicioVisivel();

    navegacao.irParaLogin();
    cadastro.cadastrarUsuario(usuario);

    validacaoCadastro.contaCriada();

    conta.continuar();

    validacaoAutenticacao.loginRealizado(usuario.primeiroNome);

    carrinho.adicionarProduto();
    carrinho.acessarCarrinhoPeloModal();

    validacaoCarrinho.carrinhoVisivel();
    validacaoCarrinho.produtoAdicionado();
    cy.screenshot('carrinho-visivel');

    carrinho.prosseguirParaCheckout();

    validacaoCheckout.informacoesVisiveis();
    validacaoCheckout.enderecoEntrega(usuario);
    validacaoCheckout.produtosDoPedidoVisiveis();
    cy.screenshot('detalhes-pedido');

    checkout.preencherComentario(comentario);
    checkout.realizarPedido();

    validacaoPagamento.formularioVisivel();
    pagamento.preencherDadosCartao(dadosPagamento);
    pagamento.confirmarPagamento();

    validacaoPagamento.pedidoRealizado();
    cy.screenshot('pedido-realizado');

    conta.excluirConta();
    validacaoConta.contaExcluida();
    cy.screenshot('conta-excluida');
    conta.continuar();
  });

  it('Realizando pedido após login antes do checkout', () => {
    usuario = gerarUsuario();

    usuarioApi.criar(usuario);

    navegacao.acessarInicio();
    validacaoNavegacao.inicioVisivel();

    navegacao.irParaLogin();

    autenticacao.realizarLogin({
      email: usuario.email,
      senha: usuario.senha,
    });

    validacaoAutenticacao.loginRealizado(usuario.primeiroNome);

    carrinho.adicionarProduto();
    carrinho.acessarCarrinhoPeloModal();

    validacaoCarrinho.carrinhoVisivel();
    validacaoCarrinho.produtoAdicionado();
    cy.screenshot('produtos-adicionado');

    carrinho.prosseguirParaCheckout();

    validacaoCheckout.informacoesVisiveis();
    validacaoCheckout.enderecoEntrega(usuario);
    validacaoCheckout.produtosDoPedidoVisiveis();
    cy.screenshot('pedido-visivel');

    checkout.preencherComentario(comentario);
    checkout.realizarPedido();

    validacaoPagamento.formularioVisivel();

    pagamento.preencherDadosCartao(dadosPagamento);
    pagamento.confirmarPagamento();

    validacaoPagamento.pedidoRealizado();
    cy.screenshot('pedido-realizado');

    conta.excluirConta();
    validacaoConta.contaExcluida();
    cy.screenshot('conta-excluida');
    conta.continuar();
  });
});
