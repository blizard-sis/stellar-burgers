describe('Constructor page test', function () {
  this.beforeEach(function() {
      cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
      cy.intercept('GET', 'api/auth/user', {fixture: 'user.json'});
      cy.viewport(1300, 800);
      cy.visit('/');
  })
//тест добавления булки в конструктор при клике на кнопку
  it('Test of adding bun', function () {
      cy.get('[data-cy=bun_1_constructor]').contains('Краторная булка N-200i').should('not.exist');
      cy.get('[data-cy=bun_2_constructor]').contains('Краторная булка N-200i').should('not.exist');
      cy.get('[data-cy=bun_ingredients]')
      .contains('li', 'Краторная булка N-200i')
      .contains('button', 'Добавить').click();
      cy.get('[data-cy=bun_1_constructor]').contains('Краторная булка N-200i').should('exist');
      cy.get('[data-cy=bun_2_constructor]').contains('Краторная булка N-200i').should('exist');
  })

//тест добавления ингредиентов в конструктор при клике на кнопку
  it('Test of adding main ingredients', function () {
      cy.get('[data-cy=ingredient_constructor]').contains('Соус Spicy-X').should('not.exist');
      cy.get('[data-cy=ingredient_constructor]').contains('Мясо бессмертных моллюсков Protostomia').should('not.exist');
      cy.get('[data-cy=main_ingredients]')
      .contains('li', 'Мясо бессмертных моллюсков Protostomia')
      .contains('button', 'Добавить')
      .click();
      cy.get('[data-cy=ingredient_constructor]').contains('Мясо бессмертных моллюсков Protostomia').should('exist');
      cy.get('[data-cy=souce_ingredients]')
      .contains('li','Соус Spicy-X')
      .contains('button', 'Добавить').click();
      cy.get('[data-cy=ingredient_constructor]').contains('Соус Spicy-X').should('exist');
  })
})