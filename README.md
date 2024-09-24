# Typescript Fullstack Project

This is the Bootcamp's Project Monorepo.

## Apps and Packages

- `server`: an [express](https://expressjs.com/) server app
- `client`: a react [vite](https://vitejs.dev) ts app
- `@repo/eslint-config`: shared `eslint` configurations
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

## Get Started

### Pre Requisites

1. Install [Docker Desktop](https://docs.docker.com/get-started/get-docker/) and pull [PostgreSQL Image](https://hub.docker.com/_/postgres).
2. Install [Volta](https://docs.volta.sh/guide/getting-started) and [enable PNPM support](https://docs.volta.sh/advanced/pnpm).

### Install Dependencies

In the root directory open a terminal and install Node.js and PNPM using volta:

```
volta install node
```

```
volta install pnpm
```

Install the project dependencies:

```
pnpm install
```

### Run Applications

This monorepo is configured with [Turborepo](https://turbo.build/repo/docs). You will find the available tasks in [turbo.json](./turbo.json) file. You can run a task like the following. Note that all commands are used with `pnpm exec`, the purpose is to use the local project's Turborepo dependency and not a global one.

```bash
pnpm exec turbo <task-name>

# Examples
pnpm exec turbo dev
pnpm exec turbo build
pnpm exec turbo start
pnpm exec turbo test

# Examples db
pnpm exec turbo db:start
pnpm exec turbo db:stop
pnpm exec turbo db:generate
pnpm exec turbo db:migrate
pnpm exec turbo db:seed
pnpm exec turbo run build
pnpm exec turbo --filter @repo/db build
pnpm exec turbo --filter @repo/db tsc
pnpm exec turbo --filter @repo/db tsc-alias
pnpm exec turbo prune --force
pnpm exec turbo run dev --force
pnpm exec turbo run clean

pnpm db:cleanup
pnpm install
pnpm exec turbo prune --force
pnpm exec turbo run build --force


# Volta
volta pin node@18.20.4 # change node version to use
volta install node@18.20.4 # to install node version
volta --help # to see all commands
volta list node # node version current

# Testing
pnpm exec turbo test
```

> Please refer to the official [Turborepo documentation](https://turbo.build/repo/docs/crafting-your-repository/running-tasks) to learn more on running tasks.

### Run Docker Compose

```bash
     docker-compose up -d
```

```bash
     docker-compose down
```

### Run Prisma

Create a new folder called database inside packages with a package.json inside:

```bash
{
  "name": "@repo/db",
  "version": "0.0.0",
  "dependencies": {
    "@prisma/client": "latest" // Replace with latest version
  },
  "devDependencies": {
    "prisma": "latest" // Replace with latest version
  }
}
```

the latest version of Prisma you can check right here:

```bash
https://www.npmjs.com/package/@prisma/client?activeTab=versions
```

then:

```bash
pnpm exec prisma init
```
