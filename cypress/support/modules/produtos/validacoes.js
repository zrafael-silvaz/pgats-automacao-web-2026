import { seletores } from './seletores';

const mensagens = {
  tituloTodosProdutos: 'All Products',
  tituloProdutosPesquisados: 'Searched Products',
  caminhoProdutos: '/products',
  caminhoBusca: '/products?search=',
  caminhoDetalhe: '/product_details/',
  rotuloCategoria: 'Category:',
  rotuloDisponibilidade: 'Availability:',
  rotuloCondicao: 'Condition:',
  rotuloMarca: 'Brand:',
};

const formatoPreco = /^\s*Rs\.\s*\d{1,3}(?:,?\d{3})*\s*$/;

const campoComValor = (rotulo) => {
  cy.contains(seletores.detalhe.campo, rotulo)
    .should('be.visible')
    .invoke('text')
    .should('match', new RegExp(`${rotulo}\\s*\\S+`));
};

export const validacaoProdutos = {
  paginaProdutosVisivel() {
    cy.url().should('include', mensagens.caminhoProdutos);
    cy.contains(seletores.titulo, mensagens.tituloTodosProdutos).should('be.visible');
  },

  listaVisivel() {
    cy.get(seletores.lista).should('be.visible');
    cy.get(seletores.cartoes).should('be.visible').and('have.length.at.least', 1);
  },

  paginaDetalheVisivel() {
    cy.url().should('include', mensagens.caminhoDetalhe);
    cy.get(seletores.detalhe.informacoes).should('be.visible');
  },

  detalhesDoProdutoVisiveis() {
    cy.get(seletores.detalhe.nome).should('be.visible').invoke('text').should('match', /\S/);

    campoComValor(mensagens.rotuloCategoria);

    cy.get(seletores.detalhe.preco)
      .should('be.visible')
      .invoke('text')
      .should('match', formatoPreco);

    campoComValor(mensagens.rotuloDisponibilidade);
    campoComValor(mensagens.rotuloCondicao);
    campoComValor(mensagens.rotuloMarca);
  },

  produtosPesquisadosVisivel() {
    cy.contains(seletores.titulo, mensagens.tituloProdutosPesquisados).should('be.visible');
  },

  buscaRealizada(termo) {
    cy.url().should('include', `${mensagens.caminhoBusca}${encodeURIComponent(termo)}`);
    cy.get(seletores.campoBusca).should('have.value', termo);
  },

  resultadosRelacionados(termo) {
    cy.get(seletores.lista).should('be.visible');
    cy.get(seletores.cartoes)
      .should('be.visible')
      .and('have.length.at.least', 1)
      .each(($cartao) => {
        cy.wrap($cartao).should('be.visible');
        cy.wrap($cartao)
          .find(seletores.nomeProduto)
          .invoke('text')
          .then((nome) => {
            expect(nome.trim().toLowerCase()).to.contain(termo.toLowerCase());
          });
      });
  },

  cartoesCompletos() {
    cy.get(seletores.cartoes)
      .should('be.visible')
      .and('have.length.at.least', 1)
      .each(($cartao) => {
        cy.wrap($cartao)
          .find(seletores.imagemProduto)
          .should('be.visible')
          .and('have.attr', 'src')
          .and('not.be.empty');

        cy.wrap($cartao)
          .find(seletores.nomeProduto)
          .should('be.visible')
          .invoke('text')
          .should('match', /\S/);

        cy.wrap($cartao)
          .find(seletores.precoProduto)
          .should('be.visible')
          .invoke('text')
          .should('match', /\S/);
      });
  },

  precosValidos() {
    cy.get(seletores.precoProduto)
      .should('be.visible')
      .and('have.length.at.least', 1)
      .each(($preco) => {
        cy.wrap($preco)
          .should('be.visible')
          .invoke('text')
          .then((texto) => {
            const preco = texto.trim();
            const valor = Number(preco.replace(/^Rs\.\s*/, '').replace(/,/g, ''));

            expect(preco).to.match(formatoPreco);
            expect(valor).to.be.greaterThan(0);
          });
      });
  },
};