## Contributing guide

We apply many Contributions are always welcome, no matter how large or small.

Most of our works happen directly on `{{git-repo}}`, from reporting bugs, documenting things, creating proposals, ...

Please take a moment to review this document in order to make the contribution process easy and effective for everyone involved.

### Table of contents

- [Communication](#communication)
- [Branching technique](#branching-technique)
- [Development flow](#development-flow)
- [Bugs report](#bugs-report)

### Communication

We use `{{chat-channel}}` as our chat channel, `{{management-tool}}` for project management and `{{git-repo}}` for development.

### Branching technique

We currently maintain 2 branches in our project: `master` and `dev`.

The `master` branch is the closest thing to `production`, so we will do our best to keep it in a good shape, with stable features, all tests passed and QAs verified.

`dev` branch contains in-development codes, which will be deployed to `staging` server.

`feat/*` are `feature` branches which are branched off `dev` and will be merged back into `dev`.

`hotfix/*` branches provide immediate actions with undesired bugs on `master`. May branch off from `master` and must merge into `master` and `dev`.

`release/*` branches support the preparation of a new production release. They allow many minor bugs to be fixed and preparation of meta-data for a release. May branch off from `dev` and must merge into `master` and `dev`.

### Development flow

1. **Always merge requests**

    We're applying `code reviewing` process and maybe `PR based changelog` in the future, so please create a `merge request` whenever you want to contribute to source code.
    
    A good `merge request` should have a short and concise `title`, a clear `description` and at least one `label`. Working in progress `merge request` will be prefixed with `WIP:`.
    
    A `merge request` should be created before you start working on something, so any member of our team in interest can keep track while you're in progress.

2. **Conventional commits**

    Each commit only contains a small number of changes with a meaningful and concise message.
    
    Make sure your commit messages follow [conventional commits rules](https://www.conventionalcommits.org), which will help us in: automatically bumping version using [semantic versioning strategy](https://semver.org) and code reviewing.

3. **Pretty & lint your code before commit**

    We're using some prettier and linting rules to prevent potential semantic errors and make code consistent between members. So, please make sure you aware of this.

4. **Test, test and test**

    We can deliver a few codes, but they should be high-quality codes with high coverage test cases, which not only prevents bugs for the moment but also for the future.
    
    Tests will give us more confident in refactoring codes, we don't have any coverage target for the moment but any `complicated logic` part should be carefully tested.

### Bugs report

We use `{{git-repo}} issues` to keep track of bugs and proposals. When reporting a bug, please provide these information:

- A detail description
- Reduced test cases or `reproduction steps`
- Application version
