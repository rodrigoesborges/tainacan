describe('Taxonomy test', function () {
  beforeEach(() => {
    cy.loginByUI()
  })

  it('clear DB', function(){
    cy.clearDB()
  })

  context('CRUD Taxonomies', function(){
    it('canceled create taxonomy', function(){
      cy.visit('/wp-admin/admin.php?page=tainacan_admin#/taxonomies')
      cy.location('hash').should('eq', '#/taxonomies')
      //cy.get('#button-taxonomy-creation').click()
      cy.get('.button').click()
      cy.location('hash').should('eq', '#/taxonomies/new')
      cy.get('#tainacan-text-name').type('Taxonomy canceled')
      cy.get('#tainacan-text-description').type('description taxonomy canceled')
      cy.get('#tainacan-select-status').select('Publish').should('have.value', 'publish')
      cy.get('#button-cancel-taxonomy-creation').click()
      cy.location('hash').should('eq', '#/taxonomies/')
      cy.get('td').should('not.contain', 'Book canceled')
    })

    it('create taxonomy with status publish', function(){
      cy.visit('/wp-admin/admin.php?page=tainacan_admin#/taxonomies')
      cy.location('hash').should('eq', '#/taxonomies')
      //cy.get('#button-taxonomy-creation').click()
      cy.get('.button').click()
      cy.location('hash').should('eq', '#/taxonomies/new')
      cy.get('#tainacan-text-name').type('Taxonomy publish')
      cy.get('#tainacan-text-description').type('description taxonomy publish')
      cy.get('#tainacan-select-status').select('Publish').should('have.value', 'publish')
      cy.get('#button-submit-taxonomy-creation').click()
      cy.location('hash').should('eq', '#/taxonomies/')
      cy.get('td').should('contain', 'Taxonomy publish')
    })

    it('create taxonomy with status private', function(){
      cy.visit('/wp-admin/admin.php?page=tainacan_admin#/taxonomies')
      cy.location('hash').should('eq', '#/taxonomies')
      //cy.get('#button-taxonomy-creation').click()
      cy.get('.button').click()
      cy.location('hash').should('eq', '#/taxonomies/new')
      cy.get('#tainacan-text-name').type('Taxonomy private')
      cy.get('#tainacan-text-description').type('description taxonomy private')
      cy.get('#tainacan-select-status').select('Private').should('have.value', 'private')
      cy.get('#button-submit-taxonomy-creation').click()
      cy.location('hash').should('eq', '#/taxonomies/')
      cy.get('td').should('contain', 'Taxonomy private')
    })

    it('create taxonomy with status draft', function(){
      cy.visit('/wp-admin/admin.php?page=tainacan_admin#/taxonomies')
      cy.location('hash').should('eq', '#/taxonomies')
      //cy.get('#button-taxonomy-creation').click()
      cy.get('.button').click()
      cy.location('hash').should('eq', '#/taxonomies/new')
      cy.get('#tainacan-text-name').type('Taxonomy draft')
      cy.get('#tainacan-text-description').type('description taxonomy draft')
      cy.get('#tainacan-select-status').select('Draft').should('have.value', 'draft')
      cy.get('#button-submit-taxonomy-creation').click()
      cy.location('hash').should('eq', '#/taxonomies/')
      cy.get('td').should('not.contain', 'Taxonomy draft')
    })

    it('create taxonomy with status draft', function(){
      cy.visit('/wp-admin/admin.php?page=tainacan_admin#/taxonomies')
      cy.location('hash').should('eq', '#/taxonomies')
      //cy.get('#button-taxonomy-creation').click()
      cy.get('.button').click()
      cy.location('hash').should('eq', '#/taxonomies/new')
      cy.get('#tainacan-text-name').type('Taxonomy trash')
      cy.get('#tainacan-text-description').type('description taxonomy trash')
      cy.get('#tainacan-select-status').select('Trash').should('have.value', 'trash')
      cy.get('#button-submit-taxonomy-creation').click()
      cy.location('hash').should('eq', '#/taxonomies/')
      cy.get('td').should('not.contain', 'Taxonomy trash')
    })

    it('create taxonomy color', function(){
      cy.visit('/wp-admin/admin.php?page=tainacan_admin#/taxonomies')
      cy.location('hash').should('eq', '#/taxonomies')
      //cy.get('#button-taxonomy-creation').click()
      cy.get('.button').click()
      cy.location('hash').should('eq', '#/taxonomies/new')
      cy.get('#tainacan-text-name').type('Taxonomy color')
      cy.get('#tainacan-text-description').type('description taxonomy color')
      cy.get('#tainacan-select-status').select('Publish').should('have.value', 'publish')
      cy.get('#button-submit-taxonomy-creation').click()
      cy.location('hash').should('eq', '#/taxonomies/')
      cy.get('td').should('contain', 'Taxonomy color')
    })

    it('delete taxonomy color', function(){
      cy.visit('/wp-admin/admin.php?page=tainacan_admin#/taxonomies')
      cy.location('hash').should('eq', '#/taxonomies')
      cy.get('.breadcrumbs > :nth-child(3) > .router-link-active').click()
      cy.get('.b-table').should('contain', 'Taxonomy trash')
      cy.get(':nth-child(1) > [data-label="Actions"] > :nth-child(1) > #button-delete > .icon > .mdi').click()
      cy.get('.modal-card').should('have.class', 'animation-content')
      cy.get('.is-primary').click()
      cy.get('.breadcrumbs > :nth-child(3) > .router-link-active').click()
      cy.get('.b-table').should('not.contain', 'Taxonomy trash')
    })
  })
})
