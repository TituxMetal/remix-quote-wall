# Remix Quote Wall

## Quickstart

Click this button to create a [Gitpod](https://gitpod.io) workspace with the
project set up

[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/TituxMetal/remix-quote-wall/tree/main)

## Development

- Initial setup:

  ```sh
  yarn setup
  ```

- Start dev server:

  ```sh
  yarn dev
  ```

This starts your app in development mode, rebuilding assets on file changes.

The database seed script creates a new user with some data you can use to get
started:

- Email: `rachel@remix.run`
- Password: `racheliscool`

## Testing

### Playwright

We use Playwright for our End-to-End tests in this project. You'll find those in
the `tests` directory. As you make changes, add to an existing file or create a
new one.

To run these tests in development, run `yarn test:e2e:dev` which will start the
dev server for the app as well as the Playwright client. Make sure the database
is running.

### Vitest

For lower level tests of utilities and individual components, we use `vitest`.
We have DOM-specific assertion helpers via
[`@testing-library/jest-dom`](https://testing-library.com/jest-dom).

### Type Checking

This project uses TypeScript. It's recommended to get TypeScript set up for your
editor to get a really great in-editor experience with type checking and
auto-complete. To run type checking across the whole project, run
`yarn typecheck`.

### Linting

This project uses ESLint for linting. That is configured in `.eslintrc.js`.

### Formatting

We use [Prettier](https://prettier.io/) for auto-formatting in this project.
It's recommended to install an editor plugin (like the
[VSCode Prettier plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode))
to get auto-formatting on save. There's also a `yarn format` script you can run
to format all files in the project.
