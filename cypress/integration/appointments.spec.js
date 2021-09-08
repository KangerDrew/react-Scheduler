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

    cy.get("[alt='Edit']").click({ force: true }) 


  });

});