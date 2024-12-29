declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Добавляет ингредиент в конструктор
     * @param type Тип ингредиента ('bun', 'main', 'souce')
     * @param name Имя ингредиента
     */
    addIngredient(type: 'bun' | 'main' | 'souce', name: string): Chainable<void>;
  }
}
