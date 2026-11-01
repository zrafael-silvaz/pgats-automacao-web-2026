# pgats-automacao-web-2026

Automação de testes E2E com [Cypress](https://www.cypress.io/) para o site [Automation Exercise](https://www.automationexercise.com), organizada por módulos de ações de negócio.

## Arquitetura

O projeto segue um padrão próprio de organização por ação de negócio, que toma emprestado um princípio central do Screenplay Pattern — organizar o código em torno do que o usuário faz, não da tela em que ele está — sem implementar sua estrutura formal (Actor, Task, Interaction, Question). Os testes são escritos como uma sequência de ações e validações de negócio, não como interações diretas com elementos de tela.

Cada funcionalidade (login, cadastro, produtos, carrinho, checkout...) tem seu próprio módulo em `cypress/support/modules/`, com três arquivos:

- **`acoes.js`** — interações com a aplicação (clicar, digitar, selecionar).
- **`validacoes.js`** — asserções sobre o resultado esperado.
- **`seletores.js`** — localizadores dos elementos, centralizados e exportados como `seletores`.

Pré-condições e limpeza de dados (como criar e excluir um usuário) usam a API do site, em `cypress/support/api/`, para manter os testes de interface focados no que de fato estão validando. Dados dinâmicos são gerados com [Faker](https://fakerjs.dev/) em `cypress/support/fabricas/`.

As regras completas de arquitetura, nomenclatura e convenções do projeto estão em [`DIRETRIZES.md`](./DIRETRIZES.md). Qualquer contribuição deve seguir esse documento.

## Estrutura de pastas

```
cypress/
├── e2e/                    → especificações dos testes (*.cy.js)
├── fixtures/                → dados fixos em JSON
└── support/
    ├── modules/              → um módulo por funcionalidade (acoes, validacoes, seletores)
    ├── api/                 → chamadas à API para pré-condição e limpeza
    └── fabricas/            → geradores de dados dinâmicos (Faker)
```

## Casos de teste cobertos

Baseados nos [casos de teste públicos](https://www.automationexercise.com/test_cases) do Automation Exercise:

| Caso | Descrição | Spec |
|---|---|---|
| 1 | Register User | `cadastro.cy.js` |
| 2 | Login User with correct email and password | `login.cy.js` |
| 3 | Login User with incorrect email and password | `login.cy.js` |
| 4 | Logout User | `logout.cy.js` |
| 5 | Register User with existing email | `cadastro.cy.js` |
| 8 | Verify All Products and product detail page | `produtos.cy.js` |
| 9 | Search Product | `buscaProdutos.cy.js` |
| 10 | Verify Subscription in home page | `assinatura.cy.js` |
| 15 | Place Order: Register before Checkout | `checkout.cy.js` |
| 16 | Place Order: Login before Checkout | `checkout.cy.js` |

## Pré-requisitos

- [Node.js](https://nodejs.org/) 26 (Active LTS)
- npm

## Instalação

```bash
npm ci
```

## Configuração

O projeto usa variáveis de ambiente para não deixar valores de configuração fixos no código.

1. Copie o arquivo de exemplo:

   ```bash
   cp .env.example .env
   ```

2. Ajuste o `.env` se necessário. Por padrão:

   ```
   CYPRESS_BASE_URL=https://www.automationexercise.com
   ```

O `.env` não é versionado (está no `.gitignore`); o `.env.example` documenta as chaves esperadas.

## Executando os testes

Modo interativo (abre o Cypress Test Runner):

```bash
npx cypress open
```

Modo headless (linha de comando, como roda no CI):

```bash
npx cypress run --e2e --browser chrome
```

## Relatórios

Os relatórios são gerados com [cypress-mochawesome-reporter](https://github.com/LironEr/cypress-mochawesome-reporter) em `cypress/relatorio/`, incluindo gráficos e screenshots das falhas.

## Integração contínua

O workflow `.github/workflows/testes-e2e.yaml` executa os testes sob demanda (`workflow_dispatch`) pela aba **Actions** do repositório e publica o relatório e os screenshots como artefatos da execução.

A `baseUrl` usada no CI vem de um GitHub Actions Secret (`CYPRESS_BASE_URL`), configurado em *Settings → Secrets and variables → Actions*.

## Stack

- [Cypress](https://www.cypress.io/) 13
- [@faker-js/faker](https://fakerjs.dev/)
- [cypress-mochawesome-reporter](https://github.com/LironEr/cypress-mochawesome-reporter)
- [dotenv](https://github.com/motdotla/dotenv)