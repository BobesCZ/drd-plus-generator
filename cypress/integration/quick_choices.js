describe('Go through app - using Quick choice buttons', () => {
  it('Go through app - using Quick choice buttons', () => {
    cy.visit('/')

    // Screen 1: screenCharacter

    // Button: Quick choice
    cy.get('[data-screen-autofill=screenCharacter')
      .click()

    // Button: next step
    cy.get('.stepnavigation [data-screen=screenBackground]')
      .should('have.prop', 'disabled', false)
      .click()

    // Screen 2: screenBackground

    // Button: Quick choice
    cy.get('[data-screen-autofill=screenBackground')
      .click()

    // Button: next step
    cy.get('.stepnavigation [data-screen=screenAbilities]')
      .should('have.prop', 'disabled', false)
      .click()

    // Screen 3: screenAbilities

    // Button: Quick choice
    cy.get('[data-screen-autofill=screenAbilities]')
      .click()

    // Button: next step
    cy.get('.stepnavigation [data-screen=screenSkills]')
      .should('have.prop', 'disabled', false)
      .click()

    // Screen 4: screenSkills

    // Button: Quick choice
    cy.get('[data-screen-autofill=screenSkills]')
    .click()

    // Card: skillscombat
    cy.get('[aria-controls=skillscombat]').prev('.card-header').then(($el) => {
      if (!$el.hasClass('bg-success')) {
        // Show card body
        cy.get('[aria-controls=skillscombat]')
        .click()

        // Click: skill value
        cy.get('[name=wearingArmor][value=3]')
          .click()

        // Click: skill value
        cy.get('[name=usingShield][value=3]')
          .click()

        // Click: skill value
        cy.get('[name=noWeapon][value=2]')
          .click()
      }
    })

    // Button: next step
    cy.get('.stepnavigation [data-screen=screenWeapons]')
      .should('have.prop', 'disabled', false)
      .click()

    // Screen 5: screenWeapons

    // Button: Quick choice
    cy.get('[data-screen-autofill=screenWeapons]')
    .click()

    // Button: next step
    cy.get('.stepnavigation [data-screen=screenArmors]')
      .should('have.prop', 'disabled', false)
      .click()

    // Screen 6: screenArmors

    // Button: Quick choice
    cy.get('[data-screen-autofill=screenArmors]')
    .click()

    // Button: next step
    cy.get('.stepnavigation [data-screen=screenExport]')
      .should('have.prop', 'disabled', false)
      .click()

    // Screen 7: screenExport

    // Button: Save character
    cy.get('[value=SAVE]')
    .click()

    // Button: Remove character
    cy.get('[value=CLEAR]')
    .click()
  })
})