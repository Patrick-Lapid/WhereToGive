import Chance from "chance";
const chance = new Chance();

describe('Charity Search component', () => {
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

  it('Navigates to Charity Search', () => {
    cy.visit('http://localhost:8080/charitysearch')
  })


  it('should render the component with a title and search button', () => {
    cy.visit('http://localhost:8080/charitysearch')
    cy.get('h1').contains('Search for Charities');
    cy.get('button').contains('Find the perfect charities for you');
  });

  it('should render the MultiSelectAutocomplete component', () => {
    cy.visit('http://localhost:8080/charitysearch')
    cy.get('[data-cy=multi-select-autocomplete]').should('exist');
  });

  it('should render the map component', () => {
    cy.visit('http://localhost:8080/charitysearch')
    cy.get('[data-cy=map]').should('exist');
  });

  it('should render the carousel when charities are loaded', () => {
    cy.visit('http://localhost:8080/charitysearch')

    cy.get('[data-cy=multi-select-input]', { timeout: 10000 }).type('adoption{enter}');

    cy.get('button').contains('Find the perfect charities for you').click();

    // Check if the carousel is rendered
    cy.get('[data-cy=carousel]').should('exist');
   
  });

  it('should render the CharityTiles component when charities are loaded', () => {
    cy.visit('http://localhost:8080/charitysearch')
  
    cy.get('[data-cy=multi-select-input]').type('animals{enter}');
    cy.get('button').contains('Find the perfect charities for you').click();
  });


});


