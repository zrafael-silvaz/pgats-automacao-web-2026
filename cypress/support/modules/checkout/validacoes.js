import { seletores } from './seletores';
import { seletores as seletoresCarrinho } from '../carrinho/seletores';

export const validacaoCheckout = {
  informacoesVisiveis() {
    cy.get(seletores.informacoesCheckout).should('be.visible');
    cy.get(seletores.enderecoEntrega).should('be.visible');
  },

  enderecoEntrega(usuario) {
    cy.get(seletores.nomeEntrega)
      .should('be.visible')
      .and(
        'contain.text',
        `${usuario.titulo}. ${usuario.primeiroNome} ${usuario.sobrenome}`,
      );

    cy.get(seletores.enderecoEntrega)
      .should('contain.text', usuario.rua)
      .and('contain.text', usuario.rua2)
      .and('contain.text', usuario.cidade)
      .and('contain.text', usuario.estado)
      .and('contain.text', usuario.cep)
      .and('contain.text', usuario.pais)
      .and('contain.text', usuario.celular);
  },

  produtosDoPedidoVisiveis() {
    cy.get(seletoresCarrinho.linhasProdutos)
      .should('be.visible')
      .and('have.length.at.least', 1);

    cy.get(seletoresCarrinho.imagemProduto)
      .should('be.visible')
      .and('have.attr', 'src')
      .and('not.be.empty');
      
    cy.get(seletoresCarrinho.imagemProduto).and(
      'have.attr',
      'alt',
      'Product Image',
    );

    cy.get(seletoresCarrinho.nomeProduto)
      .should('be.visible')
      .invoke('text')
      .should('match', /\S+/);
    cy.get(seletoresCarrinho.categoriaProduto)
      .should('be.visible')
      .invoke('text')
      .should('match', /\S+/);
    cy.get(seletoresCarrinho.precoUnitario)
      .should('be.visible')
      .invoke('text')
      .should('match', /\S+/);
    cy.get(seletoresCarrinho.quantidadeProduto)
      .should('be.visible')
      .invoke('text')
      .should('match', /\S+/);
    cy.get(seletoresCarrinho.precoTotalProduto)
      .should('be.visible')
      .invoke('text')
      .should('match', /\S+/);
  },
};
