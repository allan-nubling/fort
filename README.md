# api-development-setup

Este repositório tem como objetivo servir de backend para o teste da FortBrasil.

Tenha certeza que você possui o Docker e Docker Compose(>=1.27.4) instalados.

- Crie /.env igual o /.env.example

## Backend:
### Dev:

Utilizamos ts-node-dev para recarregar a api sempre que salvarmos um arquivo.

```sh
run $ docker compose up dev
```

## Production:

```sh
run $ docker compose up api
```