import Chance from "chance";
const chance = new Chance();

describe('Dashboard component', () => {
    const email = "CYPRESS-" + chance.email();
    const name = "CypressTester"
    const pass = "ValidPassword23";
  beforeEach(() => {
    cy.visit("http://localhost:8080/");

  });

  it("Signs up New User", () => {
    cy.visit('http://localhost:8080/login')
    cy.contains("Register").click();
    cy.url().should("include", "login");
    // Fill out Form
    cy.get('input[id=NameInput]').type(name);
    cy.get('input[id=EmailInput]').type(email);
    cy.get('input[id=PasswordInput]').type(pass);
    cy.contains("Register").click();
    cy.url().should("include", "dashboard");
  });

  it("Logs in with newly registered user", () => {
    cy.visit('http://localhost:8080/login')
    cy.url().should("include", "login");
    // Fill out Form
    cy.get('input[id=EmailInput]').type(email);
    cy.get('input[id=PasswordInput]').type(pass);
    cy.get("#login-toggle-selector").click();
    cy.url().should("include", "dashboard");
  });

  it('Navigates to Charity Dashboard', () => {
    cy.visit('http://localhost:8080/dashboard')
  })

  it("Displays title and description", () => {
    cy.visit('http://localhost:8080/dashboard')
    cy.contains("Find WhereToGive");
    cy.contains("Search for your favorite charities.");
  });

  it("Displays Get Started button", () => {
    cy.visit('http://localhost:8080/dashboard')
    cy.get("#get-started-button").click();
  });

  it('Displays the carousel with slides', () => {
    cy.visit('http://localhost:8080/dashboard')
    cy.get('#carousel').should('exist');
  });

  it("Displays cards", () => {
    cy.visit('http://localhost:8080/dashboard')
    cy.get("#card-selector").should('exist');
  });

  it("Displays Explore button on cards", () => {
    cy.visit('http://localhost:8080/dashboard')
    cy.get("#card-selector").find('#explore-button').click();
  });

  it("Displays Explore button on cards", () => {
    cy.visit('http://localhost:8080/dashboard')
    cy.get("#card-selector").find('#explore-button').click();
  });

  it("Explore button click should redirect page", () => {
    cy.visit('http://localhost:8080/dashboard')
    cy.get("#card-selector").find('#explore-button').click();
    cy.url().should('include', '/charity')
  });


});


