# React Typescript Webpack Starter

### Overview
This is a starter kit to create SPA (Single Page Application) with internal server

### Technologies

- Typescript
- ReactJS
- Webpack

### Setup Environtment
- .env (server side environment)
- .end-dev (client side only dev environment)
- .env-client (client side environment)

### Installation
Install the dependencies and devDependencies and start the server.

```sh
$ git clone project_name
$ cd project_name
$ npm install
```

### Running
for the development environment, we open two ports (client & server) and then the client use proxy to call the server API.

```sh
$ npm run dev
```
for the production environment, we just have one port (server) and then render the client-side from the build files as SPA.

```sh
$ npm run build
$ npm start
```
