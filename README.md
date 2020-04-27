### Table of contents

- [On-boarding guide](#on-boarding-guide)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Getting started](#getting-started)
- [Architecture](#architecture)
- [Resources](#resources)
- [Documentation](#documentation)
- [Contributing](#contributing)
- Advanced topics
  - [Monorepo](docs/monorepo.md)

### On-boarding guide

Please make sure to go through all these steps on your on-boarding day

1. Setup your OS environment. On Windows, we **recommend** using `git-bash` for any shell command, which is bundled within [Git installation](https://git-scm.com/downloads)
2. Setup your IDE, here we use [Visual Studio Code](https://code.visualstudio.com/)
3. Install [Node.js](https://nodejs.org/en/download) and [Yarn](https://yarnpkg.com). Please noted that Yarn is **required** for installation step.
4. Install OS build-tools
   1. On Windows: [windows-build-tools](https://www.npmjs.com/package/windows-build-tools)
   2. On MacOS: `xcode-select --install`
5. Install `node-gyp` globally through npm: `npm install -g node-gyp`
6. Download & install [Docker](https://hub.docker.com/?overlay=onboarding)
7. Clone repo via ssh `git clone git@github.com:phamtri2395/stably.git`
8. At the **root of the project**, run (once): `yarn && yarn bootstrap`
9. Start ecosystem to develop in local machine (once): `yarn ecosystem:local up -d`. For the next time, you only need to run `yarn ecosystem:local start` when ever containers exited
10. In any service (ex: services/api, services/ui,...): `yarn dev`
11. Read the [contributing guide](CONTRIBUTING.md) carefully before you commit your very first lines of code
12. Make sure you can access to all links in the [Resources section](#resources)
13. Ask other team members if you face any problem following these steps

<br />

There're some knowing issues with **Windows** users:

- You may install `node-gyp` via `npm` to have it work properly
- If you encounter any problem with `node-gyp` and `MSBuild` while running yarn, please consider this answer: https://github.com/nodejs/node-gyp/issues/1663#issuecomment-574834463
- You have to use Linux container option (instead of Windows container) in Docker to run `yarn ecosystem:local`

### Prerequisites

- [Node.js](https://nodejs.org/en/download): JavaScript runtime

  > Recommended version `12.x LTS`.

- [Yarn](https://yarnpkg.com): Dependency management tool

  Yarn is required for its speed & [`workspace`](https://yarnpkg.com/lang/en/docs/workspaces) feature.

  > Recommended version `>= 1.9.0`.

### Installation

```sh
yarn
```

This repo use [monorepo strategy](docs/monorepo.md) to manage its source code across all related services in one place.

[Lerna](https://lerna.js.org) is a development tool for managing multiple JavaScript packages,
which help us symlink packages into each other likes they were published to a `npm registry` via [bootstrap](https://github.com/lerna/lerna/tree/master/commands/bootstrap#readme) step.

[Yarn workspace](https://yarnpkg.com/lang/en/docs/workspaces) is a feature of yarn that allows us to install dependencies for multiple services only once.

### Getting started

> At the root of the project:

```sh
yarn ecosystem:up
```

We use `docker-compose` to start & setup ecosystem services: mongo, postgres, kafka,... in the development.

> In any service:

```sh
yarn dev
```

We try to maintain these script name conventions across all services & packages:

- `dev`: for starting a process in development mode. `auto-reloading` on changes is supported.
- `start`: for starting a process in production mode. Run directly from transpiled code, usually in 'dist' folder.
- `build`: transpile `source code` from another form (ES7, Typescript) into standard JavaScript (ES5, ES6). Other steps may happen here: bundling, code splitting, css preprocessing,...
- `test`: run unit tests.
- `test:watch`: run unit tests in `watch mode`.
- `test:cov`: run unit tests & generate `coverage report`.
- `test:e2e`: run end-to-end tests.

Other scripts will be appear in package.json of each service or lib.

### Architecture

### Resources

Here're links to our internal resources: UI mockup, servers, management tools,... Please contact admin if you don't have permission to access any.

### Documentation

You can find more documents on [docs folder](docs) within this repo.

Each service or lib may contain its own README and documentation inside its folder, but they should be linked back into [docs folder](docs) at the top root.

### Contributing

Read our [code of conduct](CODE_OF_CONDUCT.md) so that you can understand how to behave with other members in this project.

Check out our [contributing guide](CONTRIBUTING.md) here to learn more about our development process, how to build and test your changes, and how to propose bugfixes or improvements.
