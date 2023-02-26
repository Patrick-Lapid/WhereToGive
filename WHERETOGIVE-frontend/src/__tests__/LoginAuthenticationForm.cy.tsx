/// <reference types="cypress" />
import React from 'react';
import { AuthenticationForm } from '../Login';

describe('<AuthenticationForm />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<AuthenticationForm />)
  })
})