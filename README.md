# express-base

# Project refrence link

1. [Building a REST API with TypeScript, Express, TypeORM, Authentication, Authorization, and Postgres](https://medium.com/@christianinyekaka/building-a-rest-api-with-typescript-express-typeorm-authentication-authorization-and-postgres-e87d07d1af08)

2. [Express.js with TypeORM, PostgreSQL, and TypeScript](https://dev.to/techjayvee/express-js-with-typeorm-4hh1)

3. [Implementing DTOs, Mappers & the Repository Pattern using the Sequelize ORM [with Examples] - DDD w/ TypeScript](https://khalilstemmler.com/articles/typescript-domain-driven-design/repository-dto-mapper/)

### .ENV setup

```env
DB_TYPE=''

SECRET_KEY=''

DB_URL_AUTH=postgres://postgres:<password>@localhost:5432/<database name>

#developement/production
NODE_ENV="developement"
```

### To generate secret key

```js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"
```
