describe('<App />', () => {
    beforeEach(() => {
        cy.task('resetTestDb');

        cy.request({
            method: 'POST',
            url: 'http://localhost:4001/todos',
            body: {
                name: 'Todo from cypress',
                done: false,
            },
        });

        cy.visit('/');
    });

    it('Renders correctly the todos', () => {
        cy.contains('Todo from cypress');
    });

    it('Creates a new todo', () => {
        cy.get('input[type="text"]').type('New todo{enter}');
        cy.contains('New todo');
    });

    it('Edits a todo', () => {
        cy.get('button').contains('Edit').click();
        cy.get('input[type="text"]').as('input');
        cy.get('@input').should('have.value', 'Todo from cypress');
        cy.get('@input').clear().type('Edited todo{enter}');
        cy.contains('Edited todo');
    });

    it.only('Deletes a todo', () => {
        cy.get('button').contains('Delete').click();
        cy.contains('Todo from cypress').should('not.exist');
    });
});
