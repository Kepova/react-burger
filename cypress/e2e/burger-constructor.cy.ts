import '@4tw/cypress-drag-drop';

describe('burger constructor works correctly', function () {
  before(function () {
    cy.visit('http://localhost:3000');
  });

  it('burger constructor has the right content', function () {
    cy.contains('Добавьте булку');
    cy.contains('Добавьте начинку');
    cy.contains('Оформить заказ');

    cy.get('[class^=burger-ingredients-card_cardLink]').as('ingredients');
    cy.get('#burger-constructor').as('burger-constructor');
    cy.get('#fillings').as('fillings');
    cy.get('@ingredients').first().as('bun');
    cy.get('@bun').drag('@burger-constructor');
    cy.get('@bun').then((el) => {
      cy.get('#bun-top').contains(el.children().children('p').text());
      cy.get('#bun-bottom').contains(el.children().children('p').text());
    });
    cy.get('@ingredients').eq(7).as('filling');
    cy.get('@filling').drag('@fillings');
    cy.get('@filling').then((el) => {
      cy.get('@burger-constructor').contains(el.children().children('p').text());
    });

    cy.get('button').contains('Оформить заказ').click();
    cy.get('input[type=email]').type('v.kepova@gmail.com');
    cy.get('input[type=password]').type('12345678');
    cy.get('button').contains('Войти').click();
    cy.get('button').contains('Оформить заказ').click();

    cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders').as('post-orders');
    cy.wait('@post-orders', { timeout: 16000 }).its('response.body.order.number').then((number) => {
      cy.contains(number)
    });

    cy.get('[class^=modal_ikonClose]').click();
    cy.get('[class^=modal_]').should('not.exist');
  })

});