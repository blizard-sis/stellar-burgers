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
    })

    //Добавление ингредиентов и создание заказа
   it('Create sucess order test', function() {
    cy.get('[data-cy=bun_ingredients]')
    .contains('li', 'Краторная булка N-200i')
    .contains('button', 'Добавить').click();
    cy.get('[data-cy=main_ingredients]')
    .contains('li', 'Мясо бессмертных моллюсков Protostomia')
    .contains('button', 'Добавить')
    .click();
    cy.get('[data-cy=souce_ingredients]')
    .contains('li','Соус Spicy-X')
    .contains('button', 'Добавить').click();

    //Клик на кнопку заказа
    cy.get('[data-cy=order_button]').contains('Оформить заказ').should('exist').click();

    //Проверка открытия модального окна и номера заказа после успешного создания заказа 
    cy.get('[data-cy=order_number]').contains('64499').should('exist');

    //Проверка закрытия модального окна при клике на крестик
    cy.get('[data-cy=close_icon]').click();
    cy.get('[data-cy=modal]').should('not.exist');

    //Проверка очищения конструктора от ингредиентов
    cy.get('[data-cy=constructor]').should('not.contain', 'Краторная булка N-200i');
    cy.get('[data-cy=ingredient_constructor]').should('not.contain', 'Мясо бессмертных моллюсков Protostomia');
    cy.get('[data-cy=ingredient_constructor]').should('not.contain', 'Соус Spicy-X');
   })
})
