import Chance from "chance";
const chance = new Chance();

describe('Authentication Form component', () => {
  const email = chance.email();
  const name = "CypressTester"
  const pass = "ValidPassword23";

  const unregistered_user = "unregistered_user@test.com"
  const incorrect_pass = "InvalidPass";

  beforeEach('passes', () => {
    cy.visit('http://localhost:8080/login')
  })

  it("Signs up New User", () => {
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
    cy.url().should("include", "login");
    // Fill out Form
    cy.get('input[id=EmailInput]').type(email);
    cy.get('input[id=PasswordInput]').type(pass);
    cy.get("#login-toggle-selector").click();
    cy.url().should("include", "dashboard");
  });

  it("Displays Error modal when a user that is not registered attempts to login", () => {
    cy.url().should("include", "login");
    // Fill out Form
    cy.get('input[id=EmailInput]').type(unregistered_user);
    cy.get('input[id=PasswordInput]').type(pass);
    cy.get("#login-toggle-selector").click();
    cy.contains("Invalid Email.");
  });

  it("Displays Error modal when a user enters wrong password attempst to login", () => {
    cy.url().should("include", "login");
    // Fill out Form
    cy.get('input[id=EmailInput]').type(email);
    cy.get('input[id=PasswordInput]').type(incorrect_pass);
    cy.get("#login-toggle-selector").click();
    cy.contains("Invalid Password.");
  });

  it("Displays Error modal when a user that already exists tries to register", () => {
    cy.contains("Register").click();
    cy.url().should("include", "login");
    // Fill out Form
    cy.get('input[id=NameInput]').type(name);
    cy.get('input[id=EmailInput]').type(email);
    cy.get('input[id=PasswordInput]').type(pass);
    cy.get("#login-toggle-selector").click();
    cy.contains("User already exists.");
  });

  it("Password Reset function works", () => {
    cy.url().should("include", "login");
    // Fill out Form
    cy.get('input[id=EmailInput]').type(email);
    cy.get('input[id=PasswordInput]').type(incorrect_pass);
    cy.get("#login-toggle-selector").click();
    cy.contains("Invalid Password.");
    cy.contains("Reset Password").click();
    cy.contains("Submit").click();
    cy.contains("Email with password reset directions sent.").should('exist');
  });
})