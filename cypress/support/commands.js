Cypress.Commands.add('loginToOrangeHRM', () => {
  const username = Cypress.env('username');
  const password = Cypress.env('password');

  cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login').wait(3000);
  cy.get('input[name="username"]').type(username).wait(1000);
  cy.get('input[name="password"]').type(password).wait(1000)  ;
  cy.get('button[type="submit"]').click();
  cy.contains('Dashboard').should('be.visible');
});
