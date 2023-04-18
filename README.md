# Expenditure API

Repositório feito em NestJs com para uma API de registro de Despesas.

Tecnologias

- NestJs/NodeJs
- TypeOrm 
- Docker (Compose e Dockerfile)
- Swagger
- Jwt

# Start da Aplicação

## Antes de tudo vamos criar um .env na raíz do projeto

_existe um .env.example na raíz do projeto com portas caso você não queira ficar verificando as portas disponíveis na sua máquina daí é só copiar e colar :)_

```
JWT_CREDENTIALS=
TYPEORM_CONNECTION=
TYPEORM_HOST=
TYPEORM_PORT=
TYPEORM_USERNAME=
TYPEORM_PASSWORD=
TYPEORM_DATABASE=
MAILER_USERNAME =
MAILER_PASSWORD =
MAILER_HOST =
MAILER_PORT =

```

Primeiramente é necessário rodar o comando na raiz do projeto

```
npm install
```

Depois, com o Docker instalado na máquina podemos rodar o comando a seguir
para inicializar o MySql

```
docker-compose up
```

Depois que todo o ambiente estiver instalado e as instâncias
do docker estiverem rodando, agora é somente startar o projeto, criar um usuário e show!

URL do swagger:

```
localhost:3000/api
```

Para começar a usar a API

- Criar usuário
  - POST api/users
- Login

  - POST /login
    - BEARER _seu token_

- Testes
  - npm run test

