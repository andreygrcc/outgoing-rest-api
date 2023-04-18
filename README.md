# Expenditure API

Repositório feito em NestJs com para uma API de registro de Despesas.

Tecnologias

- NestJs/NodeJs
- TypeOrm 
- Docker
- Swagger
- Jwt

# Start da Aplicação

## Antes de tudo vamos criar um .env na raíz do projeto

existe um .env.example na raíz do projeto com portas caso você não queira ficar verificando as portas disponíveis na sua máquina daí é só copiar e colar :)

```
JWT_CREDENTIALS=
TYPEORM_CONNECTION=
TYPEORM_HOST=
TYPEORM_PORT=
TYPEORM_USERNAME=
TYPEORM_PASSWORD=
TYPEORM_DATABASE=
MAILER_INCOMING_USER =
MAILER_INCOMING_PASS =
MAILER_HOST =
MAILER_PORT =
MAILER_DEFAULT_FROM = 

```
Obs.: As variaveis "MAILER" são referentes a configuração do módulo <a target="_blank" href="https://nest-modules.github.io/mailer/docs/mailer.html">Node Mailer</a>, para testes criei uma conta no <a target="_blank" href="https://app.mailgun.com/">MailGun</a> para usar os serviços de SMTP e fazer o envio dos email para as despesas cadastradas.

##

Após configurado o .env é necessário rodar o comando na raiz do projeto

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

Os testes unitários foram feitos somente nas services, pois na controller eu julguei que ultrapassaria um pouco o escopo e seria considerado já como testes e2e
