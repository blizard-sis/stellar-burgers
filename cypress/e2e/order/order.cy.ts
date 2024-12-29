import {
  SELECTOR_INGREDIENT_CONSTRUCTOR,
  SELECTOR_BUN_INGREDIENTS,
  SELECTOR_MODAL,
  TEXT_BUN_KRATORNAYA,
  TEXT_MAIN_PROTOMOLLUSK,
  TEXT_SAUCE_SPICY
} from '../../support/constants';

describe('Order test', function () {
  this.beforeEach(function() {
    cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
    cy.intercept('GET', 'api/auth/user', {fixture: 'user.json'});
    cy.intercept('POST', 'api/orders', {fixture: 'order.json'});
    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );
    cy.setCookie('accessToken', 'test-accessToken');
    cy.viewport(1300, 800);
    cy.visit('/');
  });

  afterEach(function () {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  // Добавление ингредиентов и создание заказа
  it('Create success order test', function() {
    cy.get(SELECTOR_BUN_INGREDIENTS)
      .contains('li', TEXT_BUN_KRATORNAYA)
      .contains('button', 'Добавить').click();
    cy.get('[data-cy=main_ingredients]')
      .contains('li', TEXT_MAIN_PROTOMOLLUSK)
      .contains('button', 'Добавить').click();
    cy.get('[data-cy=souce_ingredients]')
      .contains('li', TEXT_SAUCE_SPICY)
      .contains('button', 'Добавить').click();

    cy.intercept('POST', '**/api/orders').as('createOrder');
    // Клик на кнопку заказа
    cy.get('[data-cy=order_button]').contains('Оформить заказ').should('exist').click();

    // Проверка открытия модального окна и номера заказа после успешного создания заказа 
    cy.wait('@createOrder').then((interception) => {
    // Проверяем, что в ответе есть нужные поля
    expect(interception.response?.body).to.have.property('success', true);
    expect(interception.response?.body.order).to.have.property('number', 64499);
  });

  // Проверка закрытия модального окна при клике на крестик
  cy.get('[data-cy=close_icon]').click();
    cy.get(SELECTOR_MODAL).should('not.exist');

    // Проверка очищения конструктора от ингредиентов
    cy.get('[data-cy=constructor]').should('not.contain', TEXT_BUN_KRATORNAYA);
    cy.get(SELECTOR_INGREDIENT_CONSTRUCTOR).should('not.contain', TEXT_MAIN_PROTOMOLLUSK);
    cy.get(SELECTOR_INGREDIENT_CONSTRUCTOR).should('not.contain', TEXT_SAUCE_SPICY);
  });
});
