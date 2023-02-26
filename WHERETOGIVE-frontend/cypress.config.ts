import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },



  e2e: {
    baseUrl: "http://localhost:8080",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
