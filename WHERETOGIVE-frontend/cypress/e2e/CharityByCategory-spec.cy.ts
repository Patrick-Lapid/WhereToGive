describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:8080/charity?param=adoption')
  })

  describe('Fetch request', () => {
    it('makes a successful request', () => {
      cy.intercept('GET', 'http://localhost:8000/api/charities/?tag=adoption').as('getPosts') // intercept the request and alias it as 'getPosts'
      cy.visit('http://localhost:8080/charity?param=adoption') // visit the page that makes the request
      cy.wait('@getPosts').then((xhr) => { // wait for the request to complete and access the response using the 'xhr' object
        expect(xhr.response.statusCode).to.equal(200) // check that the status code is 200 (success)
        expect(xhr.response.body).to.not.be.null // check that the response is not null
      })
    })
  })

})