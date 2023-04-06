/// <reference types="cypress" />

describe('template spec', () => {

    beforeEach(()=>{
        cy.visit("http://localhost:8080")
    })

  it('passes', () => {
    cy.visit('http://localhost:8080/charity?param=adoption')
  })

  describe('Fetch request', () => {
    it('makes a successful request', () => {

      cy.visit('http://localhost:8080/charity?param=adoption') // visit the page that makes the request

    })
  })

})