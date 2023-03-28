describe('Charity Search component', () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/charitysearch");
  })

  it('should render the component with a title and search button', () => {
    cy.get('h1').contains('Search for Charities');
    cy.get('button').contains('Find the perfect charities for you');
  });

  it('should render the MultiSelectAutocomplete component', () => {
    cy.get('[data-cy=multi-select-autocomplete]').should('exist');
  });

  it('should render the map component', () => {
    cy.get('[data-cy=map]').should('exist');
  });

});