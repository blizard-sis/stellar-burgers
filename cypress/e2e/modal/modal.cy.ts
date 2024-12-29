import {
  SELECTOR_BUN_INGREDIENTS,
  SELECTOR_MODAL,
  TEXT_BUN_KRATORNAYA
} from '../../support/constants';

describe('Modal window test', function() {
  this.beforeEach(function() {
    cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
    cy.intercept('GET', 'api/auth/user', {fixture: 'user.json'});
    cy.viewport(1300, 800);
    cy.visit('/');
  });

  // открытие модального окна при клике на ингредиент в списке 
  it('Ingredient modal window is opened', function () {
    cy.get(SELECTOR_MODAL).should('not.exist');
    cy.get(SELECTOR_BUN_INGREDIENTS).contains(TEXT_BUN_KRATORNAYA).click();
    cy.get(SELECTOR_MODAL).contains(TEXT_BUN_KRATORNAYA).should('exist');
  });

  // закрытие модального окна при клике на крестик
  it('Ingredient modal window is closed', function() {
    cy.get(SELECTOR_BUN_INGREDIENTS).contains(TEXT_BUN_KRATORNAYA).click();
    cy.get('[data-cy=close_icon]').click();
    cy.get(SELECTOR_MODAL).should('not.exist');
  });

  // закрытие модального окна при клике на оверлей
  it('Ingredient modal window is closed by overlay click', function () {
    cy.get(SELECTOR_BUN_INGREDIENTS).contains(TEXT_BUN_KRATORNAYA).click();
    cy.get(SELECTOR_MODAL).should('exist');
    cy.get('[data-cy=overlay]').should('exist').click('topRight', {force: true});
    cy.get(SELECTOR_MODAL).should('not.exist');
  });
});