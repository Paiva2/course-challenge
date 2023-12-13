# Course System Challenge

## Application possibilities

- [x] O usuário deve conter as informações de id, nome e tipo (aluno ou professor)

- [x] O curso deve conter as informações de id, título, duração e professor

- [x] O aluno deverá poder cadastrar uma pergunta em um curso.

- [x] A pergunta deve conter as informações de id, curso, aluno e texto da pergunta

- [x] O professor deverá poder cadastrar uma resposta a uma pergunta.

- [x] A resposta deve conter as informações id, pergunta e texto da resposta

- [x] O professor recebe além do reconhecimento pessoal, sua remuneração em dinheiro. Ele recebe R$300,00 por hora de curso disponibilizado e R$15,00 por pergunta respondida. (valores fictícios)

- [x] O sistema deverá conter mais um tipo de usuário, o “admin”. Esse usuário poderá registrar pagamentos para o professor

- [x] Sempre que um professor receber um pagamento, ele deve receber um e-mail informativo

- [x] O sistema deverá permitir que o professor consulte seu saldo a receber, já descontados os pagamentos recebidos

## Technologies

- TypeScript
- Node
- Express
- Postgres;
- Docker;
- Vitest (for unit tests);
- Nodemailer;
- Swagger for docs.

## Installation guide

### You will need Node version >= 18.0.0 and Docker installed

```
bash

$ git clone https://github.com/Paiva2/course-challenge.git

$ cd course-challenge

$ npm install

$ npm run install:both

$ cd backend

$ docker compose up -d

$ npx prisma migrate deploy

$ cd ..

$ npm run dev

```

## To run unit tests

```
bash

$ cd course-challenge

$ cd backend

$ npm install

$ npm run test

```

