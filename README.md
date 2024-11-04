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

## Main Components

1. HomePageComponent
Presents an overview of the application, with links for login and registration.
Uses input animations to improve user experience.

2. LoginPageComponent
User login form.
Simulated authentication with AuthService.

3. RegisterPageComponent
Form for registering new users.
Allows the registration of customers and managers.

4. ProductListPageComponent
Displays the list of products for customers.
Includes pagination and search to facilitate product navigation.

5. DashboardPageComponent
Product management dashboard accessible only to managers.
Functionality to add, edit and delete products.
Includes visual feedback when deleting products with instant update.

## Services and Guards

AuthService: Manages the authentication state and simulates user login and registration.

ProductService: Manages the list of products and CRUD (simulated) operations.

AuthGuard: Protects access to the DashboardPageComponent, allowing access only to users authenticated as managers.
