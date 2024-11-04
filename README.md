# LojaProdutos

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.11.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Componentes Principais

1. HomePageComponent
Apresenta uma visão geral do aplicativo, com links para login e cadastro.
Utiliza animações de entrada para melhorar a experiência do usuário.

2. LoginPageComponent
Formulário para login de usuários.
Autenticação simulada com o AuthService.

3. RegisterPageComponent
Formulário para registro de novos usuários.
Permite o cadastro de clientes e gerentes.

4. ProductListPageComponent
Exibe a lista de produtos para clientes.
Inclui paginação e busca para facilitar a navegação pelos produtos.

5. DashboardPageComponent
Painel de gerenciamento de produtos acessível apenas a gerentes.
Funcionalidades para adicionar, editar e excluir produtos.
Inclui feedback visual ao excluir produtos com atualização instantânea.

## Serviços e Guardas

AuthService: Gerencia o estado de autenticação e simula o login e registro de usuários.

ProductService: Gerencia a lista de produtos e operações de CRUD (simuladas).

AuthGuard: Protege o acesso ao DashboardPageComponent, permitindo acesso apenas a usuários autenticados como gerentes.

