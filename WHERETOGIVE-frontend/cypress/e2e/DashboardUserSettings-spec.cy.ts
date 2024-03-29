import Chance from "chance";
const chance = new Chance();

describe('User Dashboard Settings', () => {
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

      it("Change Display Name", () =>{
        cy.visit('http://localhost:8080/profile')
        cy.contains('User Settings').click();
        cy.get('button[id=editDisplayName]').click();
        cy.get('input[id=DisplayName]').click().type("Cypress Display Name Change");
        cy.get('#updateDisplayName').click()
        cy.contains("Your Display Name was saved")
      })

      it("Change Email", () =>{
        cy.visit('http://localhost:8080/profile')
        cy.contains('User Settings').click();
        cy.get('button[id=editEmail]').click();
        cy.get('input[id=emailField]').click().type(`New-Cypress-Email` + chance.email());
        cy.get('#updateEmail').click()
        cy.contains("Your Email was saved")
      })

      it("Change Password", () =>{
        cy.visit('http://localhost:8080/profile')
        cy.contains('User Settings').click();
        cy.get('button[id=editPassword]').click();
        cy.get('input[id=passwordField]').click().type("testing123");
        cy.get('#updatePassword').click()
        cy.contains("Your Password was")
      })
      
  })