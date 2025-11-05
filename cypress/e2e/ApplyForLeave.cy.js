


describe('Apply Leave in OrangeHRM', () => {
  it('Logs in and applies for leave, retries if Failed to submit', () => {
  
    cy.loginToOrangeHRM();

  
    cy.contains('Leave').click().wait(1000);
    cy.contains('Apply').click().wait(1000);
    cy.get('i.bi-chevron-left').click().wait(1000);

    cy.get('label').contains('Leave Type').parent().next().click().wait(1000);
   cy.get('.oxd-select-text-input').first().click().wait(1000);
    // cy.get('.select').contains('CAN - FMLA').click();

    const startDateInput = cy.get('input[placeholder="yyyy-dd-mm"]').first().wait(1000);
    const endDateInput = cy.get('input[placeholder="yyyy-dd-mm"]').last().wait(1000);

    startDateInput.clear().type('2025-11-10');
    endDateInput.clear().type('2025-11-12');

   
    cy.get('textarea').click({ force: true }).type('Need one day off for personal reason');

 
    cy.get('button[type="submit"]').click();

   
    cy.contains(/Successfully Applied|Failed to submit/i, { timeout: 10000 }).then($msg => {
      const text = $msg.text();
      if (text.includes('Failed to submit')) {
        cy.log('Submission failed, changing leave dates and retrying');

        // Change leave dates
        startDateInput.clear().type('2025-11-13');
        endDateInput.clear().type('2025-11-14');

        // Retry submit
        cy.get('button[type="submit"]').click();

        // Final check for success
        cy.contains('Successfully Applied', { timeout: 10000 }).should('be.visible');
      } else {
        cy.log('Submission successful on first try');
      }
    });
  });
});

