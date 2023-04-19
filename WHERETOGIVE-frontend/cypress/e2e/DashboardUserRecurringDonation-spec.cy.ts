import Chance from "chance";
const chance = new Chance();

describe('UserDashboard Analytics Page', () => {
    const email = "CYPRESS-" + chance.email();
    const name = "CypressTester"
    const pass = "ValidPassword23";

    beforeEach('Navigates to Login', () => {
        cy.visit('http://localhost:8080')
    })

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
  
      it('Navigates to User Dashboard', () => {
        cy.visit('http://localhost:8080/profile')
      })

      it("Tests recurring donation", () =>{
        cy.visit('http://localhost:8080/profile')
        cy.contains('Analytics').click();
        cy.contains('Choose Charity').trigger('mouseover');
        cy.get("input[id=simpleSearch]").click().type("UNICE");
        cy.contains("UNICEF USA").click();
        cy.contains('Analytics').trigger('mouseover');
        cy.contains("Reoccurring").click();
        cy.contains("Donate").click();
        cy.wait(300)
        cy.contains("Total Donations:")
      })

      it("Tests recurring donation update / delete", () =>{
        cy.visit('http://localhost:8080/profile')
        cy.contains('Analytics').click();
        cy.get('button[id=activeBtn]').click();
        cy.wait(300)
        cy.contains("Updated");
        cy.get('button[id=trashBtn]').click();
        cy.contains("No Donation Data")
      })
  
  })