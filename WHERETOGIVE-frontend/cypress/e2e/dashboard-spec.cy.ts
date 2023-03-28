describe('Dashboard component', () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/dashboard");
  })

  it("Displays title and description", () => {
    cy.contains("Find WhereToGive");
    cy.contains("Search for your favorite charities.");
  });

  it("Displays Get Started button", () => {
    cy.get("#get-started-button").click();
  });

  it('Displays the carousel with slides', () => {
    cy.get('#carousel').should('exist');
  });

  it("Displays cards", () => {
    cy.get("#card-selector").should('exist');
  });

  it("Displays Explore button on cards", () => {
    cy.get("#card-selector").find('#explore-button').click();
  });

  it("Displays Explore button on cards", () => {
    cy.get("#card-selector").find('#explore-button').click();
  });

  it("Expore button click should redirect page", () => {
    cy.get("#card-selector").find('#explore-button').click();
    cy.url().should('include', '/charity')
  });


});


