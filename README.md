# Experiment with Drizzle ORM and libSQL

This is an experiment with

- Drizzle ORM
- libSQL (fork of SQLite maintained by the Turso team)

## Setup

Install the dependencies:

```bash
pnpm i
```

Start the development server:

```bash
pnpm dev
```

## Notes

- The libSQL client from Turso supports SQLite ([source](https://docs.turso.tech/reference/local-development#use-local-sqlite-database-files))
- There's no `drizzle-kit push:sqlite` yet (it only works with `mysql` for now)
