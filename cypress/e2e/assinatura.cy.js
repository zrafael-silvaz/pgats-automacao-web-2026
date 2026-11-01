/// <reference types="cypress"/>

import { navegacao } from '../support/modules/navegacao/acoes';
import { assinatura } from '../support/modules/assinatura/acoes';
import { validacaoNavegacao } from '../support/modules/navegacao/validacoes';
import { validacaoAssinatura } from '../support/modules/assinatura/validacoes';
import { gerarUsuario } from '../support/fabricas/fabricaUsuario';

describe('Assinatura', () => {
  it('Realizando assinatura na página inicial', () => {
    const { email } = gerarUsuario(); 

    navegacao.acessarInicio();
    validacaoNavegacao.inicioVisivel();

    assinatura.acessarRodape();
    validacaoAssinatura.tituloAssinaturaVisivel();
    cy.screenshot('titulo-assinatura');

    assinatura.realizarAssinatura(email);
    validacaoAssinatura.assinaturaRealizada();
    cy.screenshot('assinatura-realizada');
  });
});