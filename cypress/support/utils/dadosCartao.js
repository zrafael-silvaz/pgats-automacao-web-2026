import { faker } from '@faker-js/faker';

const validadeFutura = faker.date.future();
const mesValidade = String(validadeFutura.getMonth() + 1).padStart(2, '0');
const anoValidade = String(validadeFutura.getFullYear()).slice(-2);

export const dadosPagamento = {
  nome: faker.person.firstName(),
  numero: faker.finance.creditCardNumber(),
  codigo: faker.finance.creditCardCVV(),
  mes: mesValidade,
  ano: anoValidade,
};
