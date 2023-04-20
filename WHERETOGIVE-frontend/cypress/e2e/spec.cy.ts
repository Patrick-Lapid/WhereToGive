/// <reference types="cypress" />

import Chance from "chance";
const chance = new Chance();

describe('WhereToGiveStarter', () => {
    const email = chance.email();
    const name = "CypressTester"
    const pass = "ValidPassword23";

    beforeEach(() => {
        cy.visit("http://localhost:8080");
    })

    it("landing page has a title", () => {
        cy.contains("Know WhereToGive");
    });

    it("Navigate Steps Iterate", () => {

        cy.get('.mantine-Stepper-content').should("contain", "Create an account / Login to Existing account").and("be.visible");

        cy.contains('Browse Charities').click();
        cy.get('.mantine-Stepper-content').should("contain", "Complete Survey to Find NonProfits Tailored to You / Browse all charities").and("be.visible");

        cy.contains('Full Access').click();
        cy.get('.mantine-Stepper-content').should("contain", "Self Report Donations to Charities / Save Favorite Charities for Later").and("be.visible");

    });

    it("Developer Cards Flip", () => {
        
        // Patrick Dev Card
        cy.contains('Patrick').click();
        cy.get(':nth-child(1)').children().should("contain", "Frontend Developer").and("be.visible");

        // Ally Dev Card
        cy.contains('Ai-Linh').click();
        cy.get(':nth-child(2)').children().should("contain", "Frontend Developer").and("be.visible");

        // Deep Dev Card
        cy.contains('Deep').click();
        cy.get(':nth-child(3)').children().should("contain", "Backend Developer").and("be.visible");

        // Micaiah Dev Card
        cy.contains('Micaiah').click();
        cy.get(':nth-child(4)').children().should("contain", "Backend Developer").and("be.visible");

    })

    // functionality not built out yet
    it("Signs up New User", () => {
        cy.contains('Log in').click();
        cy.contains("Register").click();
        cy.url().should("include", "login");
        // Fill out Form
        cy.get('input[id=NameInput]').type(name);
        cy.get('input[id=EmailInput]').type(email);
        cy.get('input[id=PasswordInput]').type(pass);
        cy.contains("Register").click();
        cy.url().should("include", "dashboard");
    });

})