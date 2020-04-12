describe('Login', () => {
  beforeEach(() => {
    cy.visit('/#/login')
  })
  it('links to register page', () => {
    cy.get('a.register-btn').should('have.attr', 'href', '#/register')
  })
  it('requires email or password', () => {
    cy.get('form')
      .contains('Login')
      .click()
    cy.get('div.error').should('contain', 'Error')
  })
  it('requires valid email and password', () => {
    cy.get('input[name=username]').type('bla@bla.com')
    cy.get('input[name=password]').type('1234')
    cy.get('form')
      .contains('Login')
      .click()
  })
  it('requires valid phone and password', () => {
    it('requires valid email and password', () => {
      cy.get('input[name=username]').type('12345')
      cy.get('input[name=password]').type('1234')
      cy.get('form')
        .contains('Login')
        .click()
    })
  })
  it('navigates to previous page on successful login', () => {})
})
