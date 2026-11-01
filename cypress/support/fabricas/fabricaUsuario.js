import { faker } from '@faker-js/faker';

export const gerarUsuario = () => ({
  titulo: 'Mr',
  primeiroNome: faker.person.firstName(),
  sobrenome: faker.person.lastName(),
  email: faker.internet.email(),
  senha: faker.string.alpha(6),
  empresa: faker.company.name(),
  rua: faker.location.streetAddress(),
  rua2: faker.location.streetAddress(),
  pais: 'Canada',
  estado: faker.location.state(),
  cidade: faker.location.city(),
  cep: faker.location.zipCode(),
  celular: faker.phone.number(),
  diaNascimento: '1',
  mesNascimento: '1',
  anoNascimento: '1999',
});