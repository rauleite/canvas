# Canvas Project

## Submodulos

- Projeto com *submodulos* e não *monorepo* como se poderia imaginar a princípio.
- *Submodulos* são tratados como packages independentes, ou seja, projetos separados.
- Combina com *Component-based Development*.

### For example

.
+--rootProj
|  +--submodule1
|  +--submodule2
|  +--submodule3

### Most Practical Example

.
+--canvas *<- root*
|  +--log *<- submodule*
|  +--ssr *<- submodule*
|  +--utils *<- submodule*

Um modulo (projeto ou package) como **log** ou **utils**, são projetos independentes.
Portanto devem ser tratados como *submodulos* nunca como *monorepo*

## Package Overflow Tools

Para o paradigma de *submodulos* é necessário o uso correto das ferramentas.

### Npm

- Utilizado **apenas** para fazer login.
- **Não** publicar os packages.
  - Deixar para o *Lerna*

#### Npm Exemple

```sh
# Login if not
npm login
# Set access public if don't
npm config set access public
```

### Git

- submodule: clone, add ou update
- init, add, commit and push

#### Git Example

```sh
# https://git-scm.com/book/en/v2/Git-Tools-Submodules
# on of this commands for STARTUP an existent or CREATE a new submodule
# to get repo with all submodules
git clone --recurse-submodules https://github.com/rauleite/canvas
# to add a new project to a submodule (in root directory)
git submodule add https://github.com/rauleite/ssr.git ./packages/ssr
# or
git submodule update --init --recursive
# test if is all ok
# Should be show the all submodules:
cd rootProj
cat ./git/config
# and:
cd rootProj
cat .gitmodules
```

Tem que ter arquivo aqui
.git/modules/packages/<submodule> **<–**

```sh
# for a new submodule (just created)
# add submodule to rootProj/.git/config (example)
git submodule add https://github.com/rauleite/cli.git ./packages/cli
```

```sh
# on every directory: root and submodules
cd submodule
git add .
# commit and push...

cd submodule2
# ...
cd rootProj
git add .
# commit and push...
```

### Lerna

- Usado para manter compatibilidade com npm, caso necessário.
- Configurado para utilização com *yarn workspaces*. **Ou talvez não.**
- Lerna Getting Started (some commands): [https://lerna.js.org/](lerna.js.org)

#### Lerna Example

<!-- # ADDING PACKAGES
# Most simple and prefered method -->

```sh
# Link dependencies, example:
lerna add @luar/utils --scope=@luar/ssr
# OR devDependencies
lerna add @luar/utils --scope=@luar/ssr --dev
```

```sh
# Publish package. Don't publish usign npm
# The flag --skip-git is used for submodules purposes
cd rootProj
lerna publish --no-git-tag-version --no-push
```

## Explanations and solutions

### Opção de não usar *yarn workspaces*

- Exige *private package*
- Não faz diferença usá-lo

- [Canvas Project](#canvas-project)
  - [Submodulos](#submodulos)
    - [For example](#for-example)
    - [Most Practical Example](#most-practical-example)
  - [Package Overflow Tools](#package-overflow-tools)
    - [Npm](#npm)
      - [Npm Exemple](#npm-exemple)
    - [Git](#git)
      - [Git Example](#git-example)
    - [Lerna](#lerna)
      - [Lerna Example](#lerna-example)
  - [Explanations and solutions](#explanations-and-solutions)
    - [Opção de não usar *yarn workspaces*](#opção-de-não-usar-yarn-workspaces)
