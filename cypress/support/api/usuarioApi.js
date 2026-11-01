const caminhos = {
  criar: '/api/createAccount',
  excluir: '/api/deleteAccount',
};

const mensagens = {
  usuarioCriado: 'User created!',
};


const lerCorpo = (resposta) =>
  typeof resposta.body === 'string' ? JSON.parse(resposta.body) : resposta.body;

export const usuarioApi = {
  criar(usuario) {
    return cy
      .request({
        method: 'POST',
        url: caminhos.criar,
        form: true, 
        body: {
          name: usuario.primeiroNome,
          email: usuario.email,
          password: usuario.senha,
          title: usuario.titulo,
          birth_date: usuario.diaNascimento,
          birth_month: usuario.mesNascimento,
          birth_year: usuario.anoNascimento,
          firstname: usuario.primeiroNome,
          lastname: usuario.sobrenome,
          company: usuario.empresa,
          address1: usuario.rua,
          address2: usuario.rua2,
          country: usuario.pais,
          zipcode: usuario.cep,
          state: usuario.estado,
          city: usuario.cidade,
          mobile_number: usuario.celular,
        },
      })
      .then((resposta) => {
        const corpo = lerCorpo(resposta);
        expect(corpo.responseCode).to.eq(201);
        expect(corpo.message).to.eq(mensagens.usuarioCriado);
      });
  },

  
  excluir({ email, senha }) {
    return cy.request({
      method: 'DELETE',
      url: caminhos.excluir,
      form: true,
      body: { email, password: senha },
      failOnStatusCode: false,
    });
  },
};