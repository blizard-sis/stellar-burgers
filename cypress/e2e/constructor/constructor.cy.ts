import {
  SELECTOR_INGREDIENT_CONSTRUCTOR,
  SELECTOR_BUN_INGREDIENTS,
  TEXT_BUN_KRATORNAYA,
  TEXT_MAIN_PROTOMOLLUSK,
  TEXT_SAUCE_SPICY
} from '../../support/constants';

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
    cy.get(SELECTOR_BUN_INGREDIENTS)
      .contains('li', TEXT_BUN_KRATORNAYA)
      .contains('button', 'Добавить').click();
    cy.get('[data-cy=bun_1_constructor]').contains(TEXT_BUN_KRATORNAYA).should('exist');
    cy.get('[data-cy=bun_2_constructor]').contains(TEXT_BUN_KRATORNAYA).should('exist');
  });

  // тест добавления ингредиентов в конструктор при клике на кнопку
  it('Test of adding main ingredients', function () {
    cy.get(SELECTOR_INGREDIENT_CONSTRUCTOR).contains(TEXT_SAUCE_SPICY).should('not.exist');
    cy.get(SELECTOR_INGREDIENT_CONSTRUCTOR).contains(TEXT_MAIN_PROTOMOLLUSK).should('not.exist');
    cy.get('[data-cy=main_ingredients]')
      .contains('li', TEXT_MAIN_PROTOMOLLUSK)
      .contains('button', 'Добавить')
      .click();
    cy.get(SELECTOR_INGREDIENT_CONSTRUCTOR).contains(TEXT_MAIN_PROTOMOLLUSK).should('exist');
    cy.get('[data-cy=souce_ingredients]')
      .contains('li', TEXT_SAUCE_SPICY)
      .contains('button', 'Добавить').click();
    cy.get(SELECTOR_INGREDIENT_CONSTRUCTOR).contains(TEXT_SAUCE_SPICY).should('exist');
  });
});
