# A setup for using the T3 stack with Drizzle and SQLite (with the `libSQL` driver)

This demo app is using the following stack:

- [T3](https://create.t3.gg/)
- [Drizzle ORM with the libSQL driver (from Turso)](https://orm.drizzle.team/docs/installation-and-db-connection/sqlite/turso#turso)
- [SQLite](https://www.sqlite.org/index.html)




https://github.com/fulopkovacs/demo-t3-drizzle-libsql/assets/43729152/af1916fb-fe31-4234-a888-ce105730ba73


## Setup

Install the dependencies:

```bash
pnpm i
```

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Generate the first db migration:

```bash
pnpm db.local.generate
```

Run the first db migration (this will set up the db based on the schema):

```bash
pnpm db.local.migrate
```

## Usage

Start the development server:

```bash
pnpm dev
```

## Notes

- The libSQL client from Turso supports SQLite ([source](https://docs.turso.tech/reference/local-development#use-local-sqlite-database-files))
- There's no `drizzle-kit push:sqlite` yet (it only works with `mysql` for now)
