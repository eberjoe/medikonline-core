# Backend do projeto MEDIKONLINE

Este repositório contém a parte de *backend* em **Node.js** para o projeto **MEDIKONLINE**, uma aplicação que conecta pacientes e médicos. Acesse o *frontend* aqui:
https://github.com/eberjoe/medikonline-web

## Montagem do ambiente de desenvolvimento

1. A aplicação foi inicializada com o seguinte comando:

```npm init -y```

2. O framework **Express** foi adicionado com o seguinte comando:

```npm install express```

3. Foi criado o arquivo ```index.js```.

4. A aplicação roda com o seguinte comando:

```node index.js```

5. A monitoração da aplicação durante o desenvolvimento se dá com a utilização do nodemon:

```npm install nodemon -D```

6. O *query builder* **Knex.js** foi adicionado com o seguinte comando:

```npm install knex```

7. Foi escolhido o *driver* para o banco de dados **SQLite** com o seguinte comando:

```npm install sqlite3```

8. As configurações de acesso ao banco de dados foram adicionadas com o seguinte comando:

```npx knex init```

9. Criada a pasta ```src``` para a inserção de todo o código fonte, inclusive ```index.js```.

10. Criado o arquivo ```routes.js``` em ```src``` para a organização de todas as rotas da aplicação.

11. Criada a primeira *migration* com o seguinte comando:

```npx knex migrate:make create_ongs```

12. Gerada cada tabela de banco de dados com o seguinte comando:

```npx knex migrate:latest```

13. Adicionada a dependência de segurança **CORS** com o seguinte comando:

```npm install cors```

## Entidades

* Usuário

* Consulta

## Funcionalidades

* Login com autorização

* Cadastro

* Agendamento de consultas

* Chat com médico

* Broadcast



Referências:

https://tableless.com.br/criando-uma-aplicacao-de-chat-simples-com-nodejs-e-socket-io/

https://www.codementor.io/@manashkumarchakrobortty/authentication-and-authorization-in-node-js-19brdvhsyw

https://www.luiztools.com.br/post/autenticacao-json-web-token-jwt-em-nodejs/
