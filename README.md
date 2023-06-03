API de um aplicativo de questionários criada com NestJS, TypeORM e PostgreSQL.

Mudanças em relação à proposta original:

- Adição das colunas cod_questionario e index_no_questionario na table perguntas;
- Adição das colunas cod_usuario e data na table respostas.

Instruções:

- Ao iniciar o projeto, após criar um banco de dados com as configs do arquivo datasource-config.js rodar o script "node run migration:run" para criar as tables.

A documentação dos endpoints se encontra em localhost:3333/docs.

IMPORTANTE:
Em algumas partes do código, existe um usuário mockado de cod (id) 5d0b4214-6e89-4a31-be5b-0948f9b5c829, pois não foi feita a parte de autenticação no front.
Para a disponibilidade de todas as funcionalidades, substitua essa parte por qualquer cod de usuário válido.

Link do repositório do front end:
https://github.com/dan-vlima/my-forms-client
