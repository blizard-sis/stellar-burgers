import {
  SELECTOR_INGREDIENT_CONSTRUCTOR,
  TEXT_BUN_KRATORNAYA,
  TEXT_MAIN_PROTOMOLLUSK,
  TEXT_SAUCE_SPICY
} from '../../support/constants';

import '../../support/commands';

describe('Constructor page test', function () {
  beforeEach(function() {
    cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
    cy.intercept('GET', 'api/auth/user', {fixture: 'user.json'});
    cy.viewport(1300, 800);
    cy.visit('/');
  });

  // тест добавления булки в конструктор при клике на кнопку
  it('Test of adding bun', function () {
    cy.get('[data-cy=bun_1_constructor]').contains(TEXT_BUN_KRATORNAYA).should('not.exist');
    cy.get('[data-cy=bun_2_constructor]').contains(TEXT_BUN_KRATORNAYA).should('not.exist');
    cy.addIngredient('bun', TEXT_BUN_KRATORNAYA);
    cy.get('[data-cy=bun_1_constructor]').contains(TEXT_BUN_KRATORNAYA).should('exist');
    cy.get('[data-cy=bun_2_constructor]').contains(TEXT_BUN_KRATORNAYA).should('exist');
  });

  // тест добавления ингредиентов в конструктор при клике на кнопку
  it('Test of adding main ingredients', function () {
    cy.get(SELECTOR_INGREDIENT_CONSTRUCTOR).contains(TEXT_SAUCE_SPICY).should('not.exist');
    cy.get(SELECTOR_INGREDIENT_CONSTRUCTOR).contains(TEXT_MAIN_PROTOMOLLUSK).should('not.exist');
    cy.addIngredient('main', TEXT_MAIN_PROTOMOLLUSK);
    cy.get(SELECTOR_INGREDIENT_CONSTRUCTOR).contains(TEXT_MAIN_PROTOMOLLUSK).should('exist');
    cy.addIngredient('souce', TEXT_SAUCE_SPICY);
    cy.get(SELECTOR_INGREDIENT_CONSTRUCTOR).contains(TEXT_SAUCE_SPICY).should('exist');
  });
});
