# React Base Setup

A starting point for building React applications.

This project is designed to provide you with the essential setup you need to get started developing React applications. 

## Setup project

### Before installing packages

This project has a FontAwesome Pro icons dependency. Before installing packages, make sure you have the correct setup in your npm.

Check the FontAwesome documentation:

[Using A Package Manager](https://fontawesome.com/docs/web/setup/packages)

<aside>
💡 If you don't have a Pro account, you have to change the references from pro to free in the `package.json` and inside the `src/index.scss`.

**Attention**: some icons in the base project may not work correctly.

</aside>

### Installation

To install the project dependencies, run the following command in your project directory:

```bash
yarn install

# or

npm install
```

### Running the project

Once the project dependencies are installed, you can run the project by entering the following command in your project directory:

```bash
yarn dev

# or

npm run dev 
```

## Packages

This project uses the following packages to provide you with the essential setup:

- [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Redux](https://redux-toolkit.js.org/), for state management
- [React Router Dom](https://reactrouter.com/en/main), for page routes
- [Tailwind](https://tailwindcss.com/), for style
- [FontAwesome](https://fontawesome.com/), for icons
- [Syncfusion](https://ej2.syncfusion.com/home/react.html), for the components
- [Apollo Client](https://www.apollographql.com/docs/react/), for GraphQL
- [Axios](https://axios-http.com/), for ajax
- [i18n](https://react.i18next.com/), for multi-language
- [Lodash](https://lodash.com/)
- [ESLint](https://eslint.org/), for code linting