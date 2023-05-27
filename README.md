# Experiment with Drizzle ORM and libSQL

This is an experiment with

- Drizzle ORM
- libSQL (fork of SQLite maintained by the Turso team)

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
