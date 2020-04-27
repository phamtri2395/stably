### Monorepo

#### Description

Monorepo is a repo organization strategy, in which we store more than one related project in a single repo.

<br/>
<div align="center">
    <a class="no-attachment-icon" href="https://github.com/lerna/lerna" target="_blank" rel="nofollow noreferrer">
        <img alt="lerna" width="240" src="https://cloud.githubusercontent.com/assets/952783/15271604/6da94f96-1a06-11e6-8b04-dc3171f79a90.png">
    </a>
</div>
<br/>

In this project, we use [Lerna](https://github.com/lerna/lerna) as a dev tool to help us manage monorepo. Lerna only speeds up our development process, each service or package should be independent of others and can be moved to a separated repo without changing anything.

<br/>
<div align="center">
    <a class="no-attachment-icon" href="https://github.com/yarnpkg/yarn" target="_blank" rel="nofollow noreferrer">
        <img alt="yarn" width="240" src="https://github.com/yarnpkg/assets/raw/master/yarn-kitten-full.png">
    </a>
</div>
<br/>

We also use [Yarn workspace](https://yarnpkg.com/lang/en/docs/workspaces) for `packages hoisting`, which will save us disk space and dependencies installation time in development. Sometime, hoisting may cause some problems for some dependencies, check [this](https://yarnpkg.com/blog/2018/02/15/nohoist/) for more information.

In the production environment, packages should be distributed to a private dependency package manager (private npm registry) a proper version tag.

### Advantages

- **Speed up development process:**

  Instead of publishing every single change of a package to a private registry to test it on dependent services, we could symlink them together in a monorepo.

- **Scalable:**

  Packages & services are managed in the way they could be easily moved to a new repo without changing anything, but still able to work together in development mode easily.

- **Collaboration:**

  Other teams can work on different projects related to theirs without cloning code from other sources each time. This leads to full-knowledge and changes-awareness between team members.

### Limitation

- **Source code size:**

  Monorepo leads to the increment in source code size. But can be easily solved by the power of git.

- **Init monorepo is hard:**

  It's hard to init a monorepo and make things work perfectly together:

  - `linter` on multiple sources with their own extended config
  - Get testing coverage in the whole monorepo
  - Bump version independently
  - CI/CD performance
    ...
