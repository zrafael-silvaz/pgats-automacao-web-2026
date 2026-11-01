import { seletores } from './seletores';

const mensagens = {
  tituloNovoUsuario: 'New User Signup!',
  emailJaCadastrado: 'Email Address already exist!',
  contaCriada: 'Account Created!',
  parabens: 'Congratulations! Your new account has been successfully created!',
  beneficios: 'You can now take advantage of member privileges to enhance your online shopping experience with us.',
  continuar: 'Continue',
};

export const validacaoCadastro = {
  formularioCadastroVisivel() {
    cy.contains(seletores.inicio.titulo, mensagens.tituloNovoUsuario).should('be.visible');
  },

  emailJaCadastrado() {
    cy.contains(seletores.inicio.mensagemErro, mensagens.emailJaCadastrado).should('be.visible');
  },

  dadosPreenchidos({ primeiroNome, email }) {
    cy.get(seletores.formulario.nome).should('be.visible').and('have.value', primeiroNome);
    cy.get(seletores.formulario.email).should('be.visible').and('have.value', email);
  },

  contaCriada() {
    cy.get(seletores.resultado.tituloContaCriada)
      .should('be.visible')
      .and('contain.text', mensagens.contaCriada);
    cy.contains(seletores.resultado.paragrafo, mensagens.parabens).should('be.visible');
    cy.contains(seletores.resultado.paragrafo, mensagens.beneficios).should('be.visible');
    cy.get(seletores.resultado.botaoContinuar)
      .should('be.visible')
      .and('contain.text', mensagens.continuar);
  },
};