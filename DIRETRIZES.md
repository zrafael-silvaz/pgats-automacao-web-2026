# Diretrizes e padrões do projeto de automação web

Projeto de automação de testes E2E com Cypress e JavaScript para o site Automation Exercise (https://www.automationexercise.com). Este documento é a referência para evoluir o projeto de forma consistente.

## 1. Princípios

1. **Testes contam uma história de negócio.** Um teste deve ser legível por quem não conhece a interface.
2. **Cada responsabilidade em seu lugar.** Seletores, ações e validações ficam separados dentro de `modules/<funcionalidade>/`. Chamadas de API ficam em `api/`; dados dinâmicos em `fabricas/`; dados fixos em `fixtures/`.
3. **Modularização obrigatória.** Nenhuma ação, validação ou especificação deve declarar seletores diretamente. Todos os localizadores devem ser centralizados no arquivo `seletores.js` da funcionalidade correspondente.
4. **Código autoexplicativo.** Não adicionar comentários ao código. Usar nomes claros, funções com responsabilidades definidas e estrutura legível. Comentários só podem ser incluídos quando solicitados explicitamente pelo usuário.
5. **Tudo em português (PT-BR)**, exceto o que vem de fora, como APIs do Cypress, atributos `data-qa`, `describe`, `it`, textos exibidos pelo site e parâmetros das APIs externas.
6. **Teste independente.** Cada teste prepara o próprio cenário, limpa os dados que criou e não depende da ordem de execução.
7. **Simples antes de genérico.** Só criar abstrações quando houver repetição real ou quando elas melhorarem claramente a leitura e a manutenção.
8. **Legibilidade antes de encadeamentos complexos.** Sempre que possível, manter o fluxo do teste linear e evitar aninhamentos usados apenas para controlar Promises ou a execução dos comandos.
9. **Nota sobre o padrão adotado:** a organização por módulo de ação de negócio (em vez de por tela) toma emprestado o princípio central do Screenplay Pattern, mas não implementa sua estrutura formal (Actor, Task, Interaction, Question). Não se refira a este projeto como "Screenplay Pattern" em documentação ou comunicação externa — a descrição correta é "módulos de ação de negócio, inspirados em princípios do Screenplay Pattern".

## 2. Estrutura de pastas

```text
cypress.config.js
DIRETRIZES.md
.github/
└── workflows/                 → workflows do GitHub Actions
    └── *.yaml ou *.yml        → automações do repositório
cypress/
├── e2e/                         → especificações (*.cy.js), organizadas por funcionalidade
├── fixtures/                    → dados fixos em JSON
└── support/
    ├── modules/                 → módulos organizados por funcionalidade
    │   ├── autenticacao/
    │   │   ├── acoes.js          → interações da funcionalidade
    │   │   ├── validacoes.js     → asserções da funcionalidade
    │   │   └── seletores.js      → localizadores da funcionalidade
    │   └── cadastro/
    │       ├── acoes.js
    │       ├── validacoes.js
    │       └── seletores.js
    ├── api/                     → chamadas à API, usadas em pré-condições e limpeza
    └── fabricas/                → geradores de dados dinâmicos (faker)
```

Cada funcionalidade deve ter sua própria pasta em `support/modules/`. Os arquivos `acoes.js`, `validacoes.js` e `seletores.js` ficam dentro dessa pasta. Funcionalidades compartilhadas, como navegação, podem ter seu próprio módulo para que outras funcionalidades reutilizem suas ações, validações ou seletores sem duplicação.

Os diretórios `api/` e `fabricas/` permanecem separados de `modules/`, pois atendem a responsabilidades transversais e não representam ações ou validações da interface.

## 3. Camadas e responsabilidades

```text
Especificação (e2e)
    ├── módulos da funcionalidade (modules/<funcionalidade>)
    │     ├── acoes.js
    │     ├── validacoes.js
    │     └── seletores.js
    ├── API (api)
    └── Dados (fabricas / fixtures)
```

| Camada | Pode | Não pode |
|---|---|---|
| Especificação (`e2e`) | Organizar o cenário, escolher dados e chamar ações, validações e API | Usar comandos de interação, declarar seletores ou fazer asserções diretamente |
| Ações (`modules/<funcionalidade>/acoes.js`) | Usar `cy.*` para executar interações e importar `seletores` | Fazer asserções, importar validações ou declarar localizadores diretamente |
| Validações (`modules/<funcionalidade>/validacoes.js`) | Usar `cy.*`, importar `seletores` e executar asserções | Alterar o estado da aplicação, interagir com campos ou declarar localizadores diretamente |
| Seletores (`modules/<funcionalidade>/seletores.js`) | Exportar o objeto `seletores` com strings e informações de localização | Chamar `cy.*`, conter asserções ou lógica de interação |
| API (`api/`) | Fazer requisições e validar o contrato de retorno da API | Interagir com a interface |
| Fábrica (`fabricas/`) | Gerar dados com Faker | Interagir com a aplicação |

As asserções sobre o comportamento da interface e os resultados do fluxo E2E devem ficar exclusivamente em `validacoes.js`. A especificação apenas determina quando cada validação será chamada.

As verificações do contrato de uma requisição, como o código e a mensagem retornados pela API de criação, permanecem no módulo dedicado da própria API.

## 4. Convenções de nomenclatura

- **Idioma:** português do Brasil, em `camelCase`, sem acentos nem cedilha em identificadores e nomes de arquivos (`autenticacao`, `cadastro`, `enderecoCobranca`).
- **Vocabulário:** não usar `page`, `pageObject` nem derivados. Usar ação, validação, módulo, seletor e tela.
- **Pastas de funcionalidade:** usar `modules/<funcionalidade>/`, por exemplo `modules/autenticacao/`.
- **Arquivos dentro do módulo:** usar os nomes `acoes.js`, `validacoes.js` e `seletores.js`.
- **Objeto de ação:** nome da funcionalidade (`autenticacao`).
- **Objeto de validação:** prefixo `validacao` (`validacaoAutenticacao`).
- **Objeto de seletores:** deve se chamar exatamente `seletores` e ser exportado pelo arquivo `seletores.js` da funcionalidade.
- **Objeto de API:** sufixo `Api` (`usuarioApi`).
- **Funções de ação:** verbo no infinitivo + complemento (`realizarLogin`, `preencherEndereco`, `concluirCadastro`).
- **Funções de validação:** descrevem o resultado esperado, sem o prefixo `validar` (`loginRealizado`, `contaCriada`, `dadosPreenchidos`).
- **Fábricas:** prefixo `gerar` (`gerarUsuario`), em arquivo `fabricaNomeDaEntidade.js`.
- **Especificações:** `funcionalidade.cy.js` (`login.cy.js`).
- **Dados:** chaves em português (`primeiroNome`, `senha`, `cep`).
- **`describe`:** nome da funcionalidade ou do contexto, quando aninhado.
- **`it`:** comportamento esperado, em português (`Acessando com email e senha corretos`).

## 5. Seletores

- Os seletores devem ser declarados exclusivamente em `modules/<funcionalidade>/seletores.js`.
- Cada arquivo `seletores.js` deve exportar uma constante chamada exatamente `seletores`.
- O objeto `seletores` deve agrupar os localizadores da funcionalidade em propriedades com nomes claros e relacionados ao negócio.
- Ações, validações e especificações não podem declarar seletores CSS, XPath, IDs, atributos, tags ou localizadores por texto diretamente. Devem importar o objeto `seletores` do módulo correspondente.
- Essa regra vale mesmo quando o localizador for simples ou utilizado uma única vez.
- Quando um elemento só puder ser localizado pelo texto, a tag ou o seletor do elemento e o texto utilizado para localizá-lo devem ficar centralizados em `seletores.js`. A ação ou validação não deve escrever o texto localizador diretamente.
- Textos esperados como resultado de negócio, usados em asserções, devem ficar no objeto `mensagens` do módulo de validação.
- Ordem de preferência: `data-qa` > `id` > atributos estáveis (`name`, `href`) > localização por texto com `cy.contains`.
- Evitar XPath, classes de estilo ou layout e seletores baseados em posição.
- O nome da propriedade descreve o elemento no negócio, não a tecnologia (`botaoCriarConta`, não `btnSubmit`).
- Quando uma funcionalidade precisar de um seletor que pertence a outra funcionalidade, importar o seletor do módulo de origem em vez de copiar sua definição. Não duplicar localizadores.

Exemplo de `modules/autenticacao/seletores.js`:

```javascript
export const seletores = {
  campoEmail: '[data-qa="login-email"]',
  campoSenha: '[data-qa="login-password"]',
  botaoEntrar: '[data-qa="login-button"]',
};
```

Uso em `modules/autenticacao/acoes.js`:

```javascript
import { seletores } from './seletores';

export const autenticacao = {
  realizarLogin({ email, senha }) {
    cy.get(seletores.campoEmail).type(email);
    cy.get(seletores.campoSenha).type(senha, { log: false });
    cy.get(seletores.botaoEntrar).click();
  },
};
```

## 6. Ações de negócio

- Cada funcionalidade mantém suas ações em `modules/<funcionalidade>/acoes.js`.
- O módulo deve ser um objeto exportado com funções (`export const autenticacao = { ... }`). Não usar classes nem `this`.
- Uma função representa uma intenção de negócio ou uma etapa coesa do fluxo, não necessariamente a interação com um único elemento.
- **Não é necessário criar uma função para cada campo, botão ou elemento da página.** Uma função pode agrupar várias interações relacionadas, como preencher email e senha e acionar o login, ou preencher os campos de endereço de uma só vez.
- Agrupar interações quando elas fizerem parte da mesma intenção e a função resultante continuar clara. Separar funções quando as etapas tiverem significado independente, forem reutilizadas ou ficarem grandes demais para compreender.
- Evitar tanto funções excessivamente pequenas, criadas apenas para encapsular um clique ou digitação isolada, quanto funções monolíticas que executem todo o cenário E2E.
- Receber os dados por parâmetro (objeto de usuário ou desestruturação), nunca embutir dados variáveis na ação.
- Executar somente interações. Não utilizar `expect`, `assert`, `should` ou outros comandos de asserção em módulos de ação.
- Não importar módulos de validação.
- Importar os seletores necessários do `seletores.js` correspondente. Nunca escrever localizadores diretamente na ação.
- Campos sensíveis, como senha, devem ser digitados com `{ log: false }`.
- Não adicionar comentários ao código.

## 7. Validações

- Cada funcionalidade mantém suas validações em `modules/<funcionalidade>/validacoes.js`.
- Todas as asserções de comportamento da interface e dos resultados E2E ficam nesses módulos, nunca diretamente na especificação ou nas ações.
- Cada função deve validar um resultado ou estado de negócio e pode conter várias asserções relacionadas. Não é necessário criar uma função para cada elemento ou para cada asserção.
- Textos esperados da aplicação ficam em um objeto `mensagens` no topo do módulo de validação.
- Importar os localizadores do `seletores.js` correspondente. Não declarar seletores ou textos localizadores diretamente na validação.
- As validações não alteram o estado da aplicação: não clicam, digitam, limpam campos, selecionam opções nem enviam formulários.
- A especificação decide quando validar; a validação define como.
- Para garantir uma quantidade mínima de elementos, valide a visibilidade antes: `.should('be.visible').and('have.length.at.least', 1)`. Evitar validar apenas a quantidade sem verificar a visibilidade dos elementos.
- Não adicionar comentários ao código.

## 8. Pré-condições e limpeza via API

- O que o teste precisa ter pronto (por exemplo, um usuário cadastrado) deve ser criado via API, em `support/api/`, e não pela interface, sempre que isso não fizer parte do comportamento que está sendo testado.
- Cada módulo de API é um objeto com funções (`usuarioApi.criar`, `usuarioApi.excluir`), sem classes e sem `this`.
- A criação valida o retorno, incluindo código e mensagem do corpo. A limpeza não valida: usa `failOnStatusCode: false` para não derrubar o teste caso o recurso já tenha sido removido.
- Dados criados pelo teste são removidos no `afterEach`.
- Os caminhos usam o `baseUrl` (`/api/createAccount`), sem URL absoluta.
- A interface continua sendo usada para testar a funcionalidade em si. Por exemplo, o cenário que testa o cadastro deve realizar o cadastro pela tela; a API pode ser usada para preparar um usuário para o cenário de login.
- A API do Automation Exercise responde HTTP 200 e informa o status real no corpo (`responseCode`). Quando esse comportamento ocorrer, validar o retorno pelo corpo, não apenas pelo status HTTP.
- Não adicionar comentários ao código. Exceções técnicas devem ser registradas nesta diretriz ou documentadas fora do código.

## 9. Dados de teste

- **Dados descartáveis:** usuários e outras entidades novas devem ser gerados em `fabricas/` com Faker, usando uma função por entidade (`gerarUsuario`). Cada execução deve gerar dados novos.
- **Usuário que precisa existir:** deve ser gerado pela fábrica e criado via API na pré-condição. Não usar contas fixas compartilhadas.
- **Dados fixos:** cenários inválidos ou valores estáticos específicos ficam em `fixtures/*.json`, importados na especificação.
- Nunca usar dados reais ou de produção.
- Reutilizar fábricas existentes quando elas já fornecerem os dados necessários. Não criar uma fábrica nova para um único atributo quando uma fábrica de entidade existente puder ser reutilizada sem gerar acoplamento indevido.

## 10. Configuração e URLs

- `baseUrl` definido no `cypress.config.js`.
- `cy.visit` e `cy.request` recebem sempre o caminho relativo (`cy.visit('/')`, `cy.visit('/login')`, `/api/createAccount`). Não usar URLs absolutas nos testes.
- Se a API não responder corretamente com o domínio configurado em `baseUrl` (por exemplo, por redirecionamento), ajustar o `baseUrl` ou usar a URL absoluta apenas no módulo de API. Registrar a justificativa nesta diretriz ou na documentação do projeto, nunca em comentário no código.
- Valores de configuração que não devem ficar hardcoded (como `baseUrl`) ficam em variáveis de ambiente, carregadas de um `.env` local (não versionado) via `dotenv`. Em CI, as mesmas chaves vêm de GitHub Actions Secrets. O `.env.example`, versionado, documenta as chaves esperadas sem conter valores sensíveis.

## 11. Estabilidade e fluxo assíncrono

- É proibido usar `cy.wait(<milissegundos>)`. Usar a retentativa automática do Cypress, validações adequadas ou `cy.intercept` com alias.
- Não commitar `it.only` nem `describe.only`.
- Testes que falham por dados ou estado compartilhado devem ser corrigidos, não apenas reexecutados.
- Todo teste que cria dados deve removê-los ao final, normalmente em `afterEach`.
- Quando um teste funcionar em modo `headed` e falhar em modo `headless`, investigar a evidência da execução que falhou antes de alterar o teste. Conferir a mensagem completa do erro, o seletor efetivamente executado, a etapa do fluxo, a URL e, quando disponíveis, screenshots, vídeos e logs.
- Não presumir que a causa é o seletor, a renderização ou a velocidade do navegador sem evidência. Comparar o localizador informado no relatório com o código realmente executado e com o DOM observado.
- Não adicionar esperas fixas, aumentar timeouts ou trocar seletores apenas como tentativa. Corrigir a causa identificada e manter as validações de negócio.
- Preferir specs com fluxo linear: chamadas de preparação, ações e validações em sequência, sem aninhamentos desnecessários.
- O Cypress gerencia a fila de comandos. Não usar `async/await` para aguardar comandos Cypress nem criar encadeamentos `.then()` apenas para impor uma ordem que o próprio Cypress já garante.
- Evitar `.then()` aninhados e callbacks extensos dentro dos arquivos `.cy.js`. Quando for indispensável acessar um valor retornado por um comando, usar o menor encadeamento possível e avaliar se a lógica pertence ao módulo responsável (API, ação ou validação), em vez de colocá-la na especificação.
- Não esconder o cenário inteiro em uma única função genérica ou em uma cadeia complexa de Promises. O spec deve continuar mostrando claramente a sequência de negócio.

## 12. Relatórios de execução e integração contínua

- O projeto utiliza `cypress-mochawesome-reporter` para gerar relatórios das execuções. A configuração do reporter e seu diretório de saída devem permanecer centralizados no `cypress.config.js`.
- O diretório configurado para os relatórios deve ser o mesmo caminho utilizado pelo workflow do GitHub Actions ao publicar os artefatos. Se `reportDir` for alterado, atualizar também o caminho no workflow.
- O workflow de execução manual deve ficar em `.github/workflows/` e utilizar o gatilho `workflow_dispatch`, permitindo iniciar a execução pela página **Actions** do repositório.
- A execução automatizada deve rodar os testes com `npx cypress run`, em modo `headless`, para reproduzir o comportamento de CI.
- Instalar dependências com `npm ci` e manter o `package-lock.json` versionado no repositório. O ambiente do workflow deve utilizar uma versão do Node.js compatível com as dependências instaladas.
- Publicar os relatórios Mochawesome como artefatos da execução. Quando configurados, incluir também screenshots e vídeos do Cypress para auxiliar a análise de falhas.
- A etapa de publicação dos artefatos deve ser executada mesmo quando os testes falharem (`if: always()`), para que o relatório e as evidências continuem disponíveis.
- Os artefatos devem ter um nome identificável e um período de retenção definido no workflow. Não é necessário commitar relatórios gerados, screenshots ou vídeos no repositório.
- Segredos e dados específicos do ambiente usados no CI devem ser armazenados em GitHub Actions Secrets ou variáveis de ambiente apropriadas, nunca expostos diretamente no YAML ou no código.
- O relatório deve ser consultado para identificar o teste, a etapa, a asserção e o seletor que realmente falharam. Não alterar a implementação com base apenas em uma hipótese sobre a causa.

## 13. Como criar um novo teste (checklist)

1. Identificar a funcionalidade e verificar se já existe `support/modules/<funcionalidade>/`.
2. Criar ou reutilizar `acoes.js`, `validacoes.js` e `seletores.js` dentro do módulo da funcionalidade, conforme necessário.
3. Conferir se todos os localizadores estão centralizados em `seletores.js` e se o objeto exportado se chama `seletores`.
4. Definir a origem dos dados: fábrica (descartável), API (pré-condição) ou fixture (fixo).
5. Criar ações que agrupem interações coesas, sem criar uma função para cada elemento e sem executar o cenário inteiro em uma função monolítica.
6. Criar validações para os resultados de negócio, mantendo todas as asserções E2E fora das ações e da especificação.
7. Se houver pré-condição ou limpeza, usar ou criar o módulo correspondente em `api/`.
8. Escrever a especificação em `e2e/<funcionalidade>.cy.js`, usando os módulos, API e dados necessários, sem interações, seletores ou asserções diretas.
9. Manter o fluxo do spec linear e evitar aninhamentos desnecessários de Promises ou `.then()`.
10. Conferir: nomes em português, sem comentários no código, sem `.only`, sem `cy.wait` fixo, sem seletor fora de `seletores.js`, sem asserção E2E fora de `validacoes.js` e sem interação dentro de validações.

## 14. Exemplo de referência

Estrutura do módulo de autenticação:

```text
support/modules/autenticacao/
├── acoes.js
├── validacoes.js
└── seletores.js
```

`support/modules/autenticacao/seletores.js`:

```javascript
export const seletores = {
  campoEmail: '[data-qa="login-email"]',
  campoSenha: '[data-qa="login-password"]',
  botaoEntrar: '[data-qa="login-button"]',
  usuarioLogado: '.shop-menu a',
};
```

`support/modules/autenticacao/acoes.js`:

```javascript
import { seletores } from './seletores';

export const autenticacao = {
  realizarLogin({ email, senha }) {
    cy.get(seletores.campoEmail).type(email);
    cy.get(seletores.campoSenha).type(senha, { log: false });
    cy.get(seletores.botaoEntrar).click();
  },
};
```

`support/modules/autenticacao/validacoes.js`:

```javascript
import { seletores } from './seletores';

const mensagens = {
  usuarioLogado: 'Logged in as',
};

export const validacaoAutenticacao = {
  loginRealizado(primeiroNome) {
    cy.get(seletores.usuarioLogado)
      .should('be.visible')
      .and('contain.text', `${mensagens.usuarioLogado} ${primeiroNome}`);
  },
};
```

`e2e/login.cy.js`:

```javascript
import { gerarUsuario } from '../support/fabricas/fabricaUsuario';
import { usuarioApi } from '../support/api/usuarioApi';
import { navegacao } from '../support/modules/navegacao/acoes';
import { autenticacao } from '../support/modules/autenticacao/acoes';
import { validacaoAutenticacao } from '../support/modules/autenticacao/validacoes';

describe('Login', () => {
  let usuario;

  beforeEach(() => {
    usuario = gerarUsuario();
    usuarioApi.criar(usuario);
    navegacao.acessarInicio();
    navegacao.irParaLogin();
  });

  afterEach(() => {
    usuarioApi.excluir(usuario);
  });

  it('Acessando com email e senha corretos', () => {
    autenticacao.realizarLogin(usuario);
    validacaoAutenticacao.loginRealizado(usuario.primeiroNome);
  });
});
```