# Projeto TypeScript com Jest e Swagger

O objetivo dessa API é possibilitar a leitura da lista de indicados e vencedores da categoria Pior Filme do Golden Raspberry Awards.

## Bibliotecas Ferramentas
* NPM
* Typescript
* Git
* Jest
* Ts-Jest
* TypeORM
* UUID
* Express
* Supertest
* Eslint
* Standard Javascript Style
* Rimraf
* SQLite
* DotEnv
* Tsup
* Tsx
* Csv-parser
* Swagger-ui-express

## Feature de Testes
* Testes de Integração

## Metodologias e Designs
* Clean Architecture
* Use Cases
* Stream

## Pré-requisitos

Certifique-se de ter os seguintes softwares instalados em seu sistema:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) (gerenciador de pacotes para Node.js)

## Instalação

1. Clone este repositório em sua máquina local:

    ```bash
    git clone https://github.com/evertonslv/movies.git
    ```

2. Navegue até o diretório do projeto:

    ```bash
    cd movies
    ```

3. Instale as dependências do projeto:

    ```bash
    npm install
    ```

## Execução

### Desenvolvimento

Para iniciar o servidor em modo de desenvolvimento:

```bash
npm run start:dev
```

### Testes

Para executar os testes de integração utilizando o Jest:

```bash
npm run test:integration
```

### Documentação Swagger

A documentação Swagger estará disponível em:

```bash
http://localhost:3000/docs
```