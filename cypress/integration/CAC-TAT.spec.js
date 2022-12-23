// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('Central de Atendimento ao Cliente TAT', function () {
  beforeEach(() => {
    cy.visit('./src/index.html');
  });

  it('verifica o título da aplicação', function () {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT');
  });

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName').type('Eduardo');
    cy.get('#lastName').type('Nowakoski');
    cy.get('#email').type('eduardo_nowa@hotmail.com');
    cy.get('#open-text-area').type('Estou com problemas no meu acesso');
    cy.contains('button[type="submit"]', 'Enviar').click();
    cy.get('.success').should('be.visible');
  });
  it('digitar um texto longo na área de texto, passando como segundo argumento do comando `.type()`, um objeto (`{}`) com a propriedade `delay` com valor `0`.', () => {
    cy.get('#open-text-area').type(
      'Estou com problemas no meu acesso Estou com problemas no meu acesso Estou com problemas no meu acesso Estou com problemas no meu acesso Estou com problemas no meu acessoEstou com problemas no meu acesso Estou com problemas no meu acesso',
      { delay: 0 }
    );
  });
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida`', () => {
    cy.contains('button[type="submit"]', 'Enviar').click();
    cy.get('.error').should('be.visible');
  });
  it('crie um teste para validar que, se um valor não-numérico for digitado, seu valor continuará vazio', () => {
    cy.get('#phone').type('adsaasdas').should('have.value', '');
  });

  it(`exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário`, () => {
    cy.get('#firstName').type('Eduardo');
    cy.get('#lastName').type('Nowakoski');
    cy.get('#email').type('eduardo_nowa@hotmail.com');
    cy.get('#open-text-area').type('Estou com problemas no meu acesso');
    cy.get('#phone-checkbox').check();
    cy.contains('button[type="submit"]', 'Enviar').click();
    cy.get('.error').should('be.visible');
  });
  it('`preenche e limpa os campos nome, sobrenome, email e telefone`', () => {
    cy.get('#firstName')
      .type('Eduardo')
      .should('have.value', 'Eduardo')
      .clear()
      .should('have.value', '');
  });

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button[type="submit"]', 'Enviar').click();
    cy.get('.error').should('be.visible');
  });

  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit();
  });

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product').select('YouTube').should('have.value', 'youtube');
  });

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product').select('mentoria').should('have.value', 'mentoria');
  });

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product').select(1).should('have.value', 'blog');
  });

  it('marca o tipo de atendimento "Feedback', () => {
    cy.get('input[type="radio"][value = "feedback"]')
      .check()
      .should('be.checked');
  });

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each((item) => {
        cy.wrap(item).check();
        cy.wrap(item).should('be.checked');
      });
  });

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked');
  });

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]#file-upload')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json')
      .should((input) => {
        expect(input[0].files[0].name).to.equal('example.json');
      });
  });

  it('seleciona um arquivo simulando um drag-drop', () => {
    cy.get('input[type="file"]#file-upload')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json', {
        action: 'drag-drop',
      })
      .should((input) => {
        expect(input[0].files[0].name).to.equal('example.json');
      });
  });

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('exampleFile');
    cy.get('input[type="file"]#file-upload')
      .should('not.have.value')
      .selectFile('@exampleFile')
      .should((input) => {
        expect(input[0].files[0].name).to.equal('example.json');
      });
  });

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('#privacy > a').should('have.attr', 'target', '_blank');
  });

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('#privacy > a').invoke('removeAttr', 'target').click();
    cy.contains('Talking About Testing').should('be.visible');
  });


});
