import { seletores } from './seletores';

export const cadastro = {
  iniciarCadastro({ primeiroNome, email }) {
    cy.get(seletores.inicio.nome).should('be.visible').type(primeiroNome);
    cy.get(seletores.inicio.email).should('be.visible').type(email);
    cy.get(seletores.inicio.botao).should('be.visible').click();
  },

  preencherDadosDaConta(usuario) {
    cy.get(seletores.formulario.generoSr).check();
    cy.get(seletores.formulario.senha).should('be.visible').type(usuario.senha, { log: false });
    cy.get(seletores.formulario.dia).should('be.visible').select(usuario.diaNascimento);
    cy.get(seletores.formulario.ano).should('be.visible').select(usuario.anoNascimento);
    cy.get(seletores.formulario.newsletter).check();
    cy.get(seletores.formulario.ofertas).check();
  },

  preencherEndereco(usuario) {
    cy.get(seletores.formulario.primeiroNome).should('be.visible').type(usuario.primeiroNome);
    cy.get(seletores.formulario.sobrenome).should('be.visible').type(usuario.sobrenome);
    cy.get(seletores.formulario.empresa).should('be.visible').type(usuario.empresa);
    cy.get(seletores.formulario.endereco).should('be.visible').type(usuario.rua);
    cy.get(seletores.formulario.endereco2).should('be.visible').type(usuario.rua2);
    cy.get(seletores.formulario.pais).should('be.visible').select(usuario.pais);
    cy.get(seletores.formulario.estado).should('be.visible').type(usuario.estado);
    cy.get(seletores.formulario.cidade).should('be.visible').type(usuario.cidade);
    cy.get(seletores.formulario.cep).should('be.visible').type(usuario.cep);
    cy.get(seletores.formulario.celular).should('be.visible').type(usuario.celular);
  },

  concluirCadastro() {
    cy.get(seletores.formulario.botaoCriarConta).should('be.visible').click();
  },

  cadastrarUsuario(usuario) {
    cadastro.iniciarCadastro(usuario);
    cadastro.preencherDadosDaConta(usuario);
    cadastro.preencherEndereco(usuario);
    cadastro.concluirCadastro();
  },
};