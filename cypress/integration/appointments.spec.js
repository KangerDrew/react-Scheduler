describe("Appointments", () => {

  beforeEach(() => {
    // Reset the database
    cy.request("GET", "/api/debug/reset");

    // Visit the root of the web server, and confirm that the DOM contains
    // the text "Monday".
    cy.visit("/");
    cy.contains("Monday");

  });


  it("should book an interview", () => {

    // Clicks the add button for the empty appointment
    cy.get("[alt=Add]")
      .first()
      .click();
    

    // Type the name "Lydia Miller-Jones" into the student input field
    cy.get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones");
    

    // Select the interviewer with the name "Sylvia Palmer"
    cy.get("[alt='Sylvia Palmer']")
      .click();


    // Click the save button
    cy.contains("Save")
      .click();

    
    // Verify that it shows the student and interviewer names within and 
    // element that has the ".appointment__card--show" class.
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");

  });

  it("should edit an interview", () => {

    // Click on edit button. Must force the action and disable
    // "waiting for actionability".
    cy.get("[alt='Edit']").click({ force: true }) 


    // Select the interviewer with the name "Sylvia Palmer"
    cy.get("[alt='Tori Malcolm']")
      .click();

    // Clear the input, then type the new student name in
    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Lydia Miller-Jones");

    // Click the save button
    cy.contains("Save")
      .click();

    // Verify like we did in previous test:
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {

    // Click on delete button. Similar to edit button, we must force the
    // action and disable "waiting for actionability".
    cy.get("[alt='Delete']").click({ force: true })


    // Click on the confirm button to cancel the appointment
    cy.contains("Confirm")
      .click()


    // Check that deleting indicator shows up
    cy.contains("Deleting")
      .should("exist")


    // Check that deleting indicator disappears
    cy.contains("Deleting")
      .should("not.exist")


    // Confirm that the appointment has been cancelled
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist")

  });
});