describe('E2E Test Dev Server', () => {
  it('Play Game', () => {
    cy.visit('http://localhost:5173');
    cy.contains('New Game').should('be.visible').click();
  })
})