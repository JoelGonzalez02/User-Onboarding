/* global cy */


context('Form Tests', function() {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
      })

describe('Name input', function() {
    it('Types text into the name form', function () {
    cy.visit('http://localhost:3000/')
    cy.get('[data-cy= name]').type('Joel Gonzalez').should('have.value', 'Joel Gonzalez')
    })
})

describe('Email input', function() {
    it('Types an email address into the input area', function(){
        cy.get('[data-cy= email]').type('espjoemusic@gmail.com')
    })
})

describe('Password input', function() {
    it('Types a password into the input area', function () {
        cy.get('[data-cy= password]').type('abc1234567')
    })
})

describe('Terms of Service box', function() {
    it('Checks to see if the box can be checked', function (){
        cy.get('[data-cy= terms]').check().should('be.checked')
    })
})

describe('Submit button', function () {
    it('Checks if you can submit the form data', function () {
        cy.get('form').submit()
    })
})

describe('Incomplete form', function(){
    it('Checks for an invalid form entry', function () {
        cy.get('[data-cy= email]').type('notanemail')
    })
})

})

