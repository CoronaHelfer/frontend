describe('Get Help', () => {
  it('open get-help page and put it test data', () => {
    cy.visit('/#/get-help')

    // Input fields
    cy.get('input[name="title"]').type('Testtitle')
    cy.get('input[name="description"]').type(`
      Laboris labore irure pariatur sunt laborum aute Lorem Lorem. Consequat sint et exercitation consectetur culpa consequat est dolor in ut. Sint aliqua pariatur sit incididunt fugiat culpa officia amet elit Lorem ullamco duis cillum.
Ex do aliquip irure non magna id aliquip fugiat. Non enim quis ex ad tempor minim id exercitation mollit. Eiusmod non sint ut ipsum laboris est do veniam Lorem Lorem. Ullamco enim dolore tempor cupidatat quis dolore aute fugiat dolore qui. Lorem minim est sunt amet aliqua do incididunt cupidatat tempor.
    `)
    cy.type({ enter })
  })
})
