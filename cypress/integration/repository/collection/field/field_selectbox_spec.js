describe('Selectbox field test', function() {
  beforeEach(() => {
    cy.loginByUI()
  })

  it('clear DB', function(){
    cy.clearDB()
  })

  it('create collection for create fields', function(){
    cy.visit('/wp-admin/admin.php?page=tainacan_admin#/collections')
    cy.location('hash').should('eq', '#/collections')
    cy.get('#button-create-collection').click()
    cy.get('#tainacan-text-name').type('Selectbox Fields')
    cy.get('#tainacan-text-description').type('Description Selectbox Fields')
    cy.get('#tainacan-select-status').select('Publish').should('have.value', 'publish')
    cy.get('#button-submit-collection-creation').click()
    cy.get('#primary-menu > .menu > .menu-header > .menu-list > li > .router-link-active > .icon > .mdi').click()
    cy.get('.b-table').should('contain', 'Selectbox Fields')
  })

  context('CRUD selectbox field', function(){
    it('create reviewed field', function(){
      cy.visit('/wp-admin/admin.php?page=tainacan_admin#/collections')
      cy.location('hash').should('eq', '#/collections')
      cy.get('[data-label="Name"] > :nth-child(1) > .clickable-row').click()
      cy.get(':nth-child(4) > .router-link-active').should('contain', 'Items')
      cy.get('.menu > :nth-child(2) > :nth-child(5) > a').click()
      cy.get('h1').should('contain', 'Collection Fields Edition Page')
      cy.get('.field > :nth-child(2) > :nth-child(5)').click()
      cy.get('#fieldEditForm > :nth-child(1) > .control > .input').type('{selectall}{del}Reviewed')
      cy.get('.textarea').type('description reviewed')
      cy.get('#tainacan-select-status-publish > .check').click()
      cy.get('.autocomplete > .control > .input').type('op1{enter}op2{enter}op3')
      cy.get(':nth-child(2) > .button').click()
      cy.get('.handle > .field-name').should('contain', 'Reviewed')
    })

    it('check create reviewed field', function(){
      cy.visit('/wp-admin/admin.php?page=tainacan_admin#/collections')
      cy.location('hash').should('eq', '#/collections')
      cy.get('[data-label="Name"] > :nth-child(1) > .clickable-row').click()
      cy.get(':nth-child(4) > .router-link-active').should('contain', 'Items')
      cy.get('.menu > :nth-child(2) > :nth-child(5) > a').click()
      cy.get('h1').should('contain', 'Collection Fields Edition Page')
      cy.contains('Reviewed')
    })

    it('create edited field', function(){
      cy.visit('/wp-admin/admin.php?page=tainacan_admin#/collections')
      cy.location('hash').should('eq', '#/collections')
      cy.get('[data-label="Name"] > :nth-child(1) > .clickable-row').click()
      cy.get(':nth-child(4) > .router-link-active').should('contain', 'Items')
      cy.get('.menu > :nth-child(2) > :nth-child(5) > a').click()
      cy.get('h1').should('contain', 'Collection Fields Edition Page')
      cy.get('.field > :nth-child(2) > :nth-child(5)').click()
      cy.get('#fieldEditForm > :nth-child(1) > .control > .input').type('{selectall}{del}Edited')
      cy.get('.textarea').type('description edited')
      cy.get('#tainacan-select-status-publish > .check').click()
      cy.get('.autocomplete > .control > .input').type('op1{enter}op2{enter}op3')
      cy.get(':nth-child(2) > .button').click()
      cy.get('.handle > .field-name').should('contain', 'Edited')
    })

    it('check create edited field', function(){
      cy.visit('/wp-admin/admin.php?page=tainacan_admin#/collections')
      cy.location('hash').should('eq', '#/collections')
      cy.get('[data-label="Name"] > :nth-child(1) > .clickable-row').click()
      cy.get(':nth-child(4) > .router-link-active').should('contain', 'Items')
      cy.get('.menu > :nth-child(2) > :nth-child(5) > a').click()
      cy.get('h1').should('contain', 'Collection Fields Edition Page')
      cy.contains('Edited')
    })

    it('edit edited field', function(){
      cy.visit('/wp-admin/admin.php?page=tainacan_admin#/collections')
      cy.location('hash').should('eq', '#/collections')
      cy.get('[data-label="Name"] > :nth-child(1) > .clickable-row').click()
      cy.get(':nth-child(4) > .router-link-active').should('contain', 'Items')
      cy.get('.menu > :nth-child(2) > :nth-child(5) > a').click()
      cy.get('h1').should('contain', 'Collection Fields Edition Page')
      cy.get(':nth-child(4) > .handle > .controls > :nth-child(2) > .icon > .mdi').click()
      cy.get('#fieldEditForm > :nth-child(1) > .control > .input').type('Edited edited')
      cy.get('.textarea').type(' edited')
      cy.get('#tainacan-select-status-publish > .check').click()
      cy.get('.autocomplete > .control > .input').type('op1{enter}op2{enter}op3')
      cy.get(':nth-child(2) > .button').click()
      cy.get('.handle > .field-name').should('contain', 'Edited edited')
    })

    it('create itsCool field', function(){
      cy.visit('/wp-admin/admin.php?page=tainacan_admin#/collections')
      cy.location('hash').should('eq', '#/collections')
      cy.get('[data-label="Name"] > :nth-child(1) > .clickable-row').click()
      cy.get(':nth-child(4) > .router-link-active').should('contain', 'Items')
      cy.get('.menu > :nth-child(2) > :nth-child(5) > a').click()
      cy.get('h1').should('contain', 'Collection Fields Edition Page')
      cy.get('.field > :nth-child(2) > :nth-child(5)').click()
      cy.get('#fieldEditForm > :nth-child(1) > .control > .input').type('{selectall}{del}itsCool')
      cy.get('.textarea').type('description itsCool')
      cy.get('#tainacan-select-status-publish > .check').click()
      cy.get('.autocomplete > .control > .input').type('op1{enter}op2{enter}op3')
      cy.get(':nth-child(2) > .button').click()
      cy.get('.handle > .field-name').should('contain', 'itsCool')
    })

    it('delete itsCool field', function(){
      cy.visit('/wp-admin/admin.php?page=tainacan_admin#/collections')
      cy.location('hash').should('eq', '#/collections')
      cy.get('[data-label="Name"] > :nth-child(1) > .clickable-row').click()
      cy.get(':nth-child(4) > .router-link-active').should('contain', 'Items')
      cy.get('.menu > :nth-child(2) > :nth-child(5) > a').click()
      cy.get('h1').should('contain', 'Collection Fields Edition Page')
      cy.contains('itsCool')
      cy.get(':nth-child(5) > .handle > .controls > :nth-child(3) > .icon > .mdi').click()
      cy.get('.handle > .field-name').should('not.eq', 'itsCool')
    })

    it('check not contain itsCool field', function(){
      cy.visit('/wp-admin/admin.php?page=tainacan_admin#/collections')
      cy.location('hash').should('eq', '#/collections')
      cy.get('[data-label="Name"] > :nth-child(1) > .clickable-row').click()
      cy.get(':nth-child(4) > .router-link-active').should('contain', 'Items')
      cy.get('.menu > :nth-child(2) > :nth-child(5) > a').click()
      cy.get('h1').should('contain', 'Collection Fields Edition Page')
      cy.get('.handle > .field-name').should('not.eq', 'itsCool')
    })
  })

  context('Diseble selectbox field', function(){
    it('create verified field', function(){
      cy.visit('/wp-admin/admin.php?page=tainacan_admin#/collections')
      cy.location('hash').should('eq', '#/collections')
      cy.get('[data-label="Name"] > :nth-child(1) > .clickable-row').click()
      cy.get(':nth-child(4) > .router-link-active').should('contain', 'Items')
      cy.get('.menu > :nth-child(2) > :nth-child(5) > a').click()
      cy.get('h1').should('contain', 'Collection Fields Edition Page')
      cy.get('.field > :nth-child(2) > :nth-child(5)').click()
      cy.get('#fieldEditForm > :nth-child(1) > .control > .input').type('{selectall}{del}Verified disebled')
      cy.get('.textarea').type('description verified')
      cy.get('#tainacan-select-status-publish > .check').click()
      cy.get('.autocomplete > .control > .input').type('YES{enter}NO')
      cy.get(':nth-child(2) > .button').click()
      cy.get('.active-fields-area >').should('contain', 'Verified disebled')
    })

    it('disebled verified field', function(){
      cy.visit('/wp-admin/admin.php?page=tainacan_admin#/collections')
      cy.location('hash').should('eq', '#/collections')
      cy.get('[data-label="Name"] > :nth-child(1) > .clickable-row').click()
      cy.get(':nth-child(4) > .router-link-active').should('contain', 'Items')
      cy.get('.menu > :nth-child(2) > :nth-child(5) > a').click()
      cy.get('h1').should('contain', 'Collection Fields Edition Page')
      cy.get(':nth-child(5) > .handle > .controls > .switch > .check').click()
      cy.get('.active-fields-area > :nth-child(5)').should('have.class', 'disabled-field')
      })

    it('check disebled verified field', function(){
      cy.visit('/wp-admin/admin.php?page=tainacan_admin#/collections')
      cy.location('hash').should('eq', '#/collections')
      cy.get('[data-label="Name"] > :nth-child(1) > .clickable-row').click()
      cy.get(':nth-child(4) > .router-link-active').should('contain', 'Items')
      cy.get('.menu > :nth-child(2) > :nth-child(5) > a').click()
      cy.get('h1').should('contain', 'Collection Fields Edition Page')
      cy.get('.active-fields-area > :nth-child(5)').should('have.class', 'disabled-field')
    })
  })

  context('Check required fields', function(){
    it('create blank field', function(){
      cy.visit('/wp-admin/admin.php?page=tainacan_admin#/collections')
      cy.location('hash').should('eq', '#/collections')
      cy.get('[data-label="Name"] > :nth-child(1) > .clickable-row').click()
      cy.get(':nth-child(4) > .router-link-active').should('contain', 'Items')
      cy.get('.menu > :nth-child(2) > :nth-child(5) > a').click()
      cy.get('h1').should('contain', 'Collection Fields Edition Page')
      cy.get('.field > :nth-child(2) > :nth-child(5)').click()
      cy.get('.not-focusable-item > .handle > .label-details').should('contain', 'Not saved')
      cy.get('#fieldEditForm > :nth-child(1) > .control > .input').type('{selectall}{del}Bank{selectall}{del}')
      cy.get('.textarea').clear()
      cy.get('#tainacan-select-status-publish > .check').click()
      cy.get(':nth-child(2) > .button').click()
      cy.get('.not-focusable-item > .handle > .field-name').should('have.class', 'is-danger')
      //cy.get('#fieldEditForm > :nth-child(1) > .control > .input').should('have.class', 'is-danger')
      cy.get('.help').should('have.class', 'is-danger')
      cy.get(':nth-child(1) > .button').click()
      cy.get('.active-fields-area > :nth-child(6) > .handle > .field-name').should('not.contain', 'Blank').and('contain', 'Selectbox')
      cy.get('.active-fields-area > :nth-child(6) > .handle > .label-details').should('contain', 'Not saved')
    })

    it('check not contain blank field', function(){
      cy.visit('/wp-admin/admin.php?page=tainacan_admin#/collections')
      cy.location('hash').should('eq', '#/collections')
      cy.get('[data-label="Name"] > :nth-child(1) > .clickable-row').click()
      cy.get(':nth-child(4) > .router-link-active').should('contain', 'Items')
      cy.get('.menu > :nth-child(2) > :nth-child(5) > a').click()
      cy.get('h1').should('contain', 'Collection Fields Edition Page')
      cy.get('.active-fields-area').should('not.contain', 'Blank')
    })
  })

  context('Create selectbox field private', function(){
    it('create selectbox private field', function(){
      cy.visit('/wp-admin/admin.php?page=tainacan_admin#/collections')
      cy.location('hash').should('eq', '#/collections')
      cy.get('[data-label="Name"] > :nth-child(1) > .clickable-row').click()
      cy.get(':nth-child(4) > .router-link-active').should('contain', 'Items')
      cy.get('.menu > :nth-child(2) > :nth-child(5) > a').click()
      cy.get('h1').should('contain', 'Collection Fields Edition Page')
      cy.get('.field > :nth-child(2) > :nth-child(5)').click()
      cy.get('#fieldEditForm > :nth-child(1) > .control > .input').type('{selectall}{del}Selectbox private')
      cy.get('.textarea').type('description private')
      cy.get('#tainacan-select-status-private > .check').click()
      cy.get('.autocomplete > .control > .input').type('yes{enter}no')
      cy.get(':nth-child(2) > .button').click()
      cy.get('.active-fields-area >').should('contain', 'Selectbox private')
    })

    it('check create selectbox private field', function(){
      cy.visit('/wp-admin/admin.php?page=tainacan_admin#/collections')
      cy.location().should((loc) => {expect(loc.hash).to.eq('#/collections')})
      cy.get('[data-label="Name"] > :nth-child(1) > .clickable-row').click()
      cy.get(':nth-child(4) > .router-link-active').should('contain', 'Items')
      cy.get('.menu > :nth-child(2) > :nth-child(5) > a').click()
      cy.get('h1').should('contain', 'Collection Fields Edition Page')
      cy.get('.active-fields-area > :nth-child(6) > .handle > .field-name').should('contain', 'Selectbox private')
      cy.get(':nth-child(6) > .handle > .controls > :nth-child(2) > .icon > .mdi').click()
      cy.get('#tainacan-select-status-private > .check').should('be.selected')
    })
  })

  context('"Not saved" label vs. "cancel button"', function(){
    it('create likes field', function(){
      cy.visit('/wp-admin/admin.php?page=tainacan_admin#/collections')
      cy.location('hash').should('eq', '#/collections')
      cy.get('[data-label="Name"] > :nth-child(1) > .clickable-row').click()
      cy.get(':nth-child(4) > .router-link-active').should('contain', 'Items')
      cy.get('.menu > :nth-child(2) > :nth-child(5) > a').click()
      cy.get('h1').should('contain', 'Collection Fields Edition Page')
      cy.get('.field > :nth-child(2) > :nth-child(5)').click()
      cy.get('#fieldEditForm > :nth-child(1) > .control > .input').type('{selectall}{del}Likes')
      cy.get('.textarea').type('description likes')
      cy.get('#tainacan-select-status-publish > .check').click()
      cy.get('.autocomplete > .control > .input').type('yes{enter}no')
      cy.get(':nth-child(2) > .button').click()
      cy.get('.active-fields-area >').should('contain', 'Likes')
    })

    it('check that ‘Not Saved’ label wasn’t inserted, and changes were lost', function(){
      cy.visit('/wp-admin/admin.php?page=tainacan_admin#/collections')
      cy.location('hash').should('eq', '#/collections')
      cy.get('[data-label="Name"] > :nth-child(1) > .clickable-row').click()
      cy.get(':nth-child(4) > .router-link-active').should('contain', 'Items')
      cy.get('.menu > :nth-child(2) > :nth-child(5) > a').click()
      cy.get('h1').should('contain', 'Collection Fields Edition Page')
      cy.get('.active-fields-area > :nth-child(7) > .handle > .field-name').should('contain', 'Likes')
      cy.get(':nth-child(7) > .handle > .controls > :nth-child(2) > .icon > .mdi').click()
      cy.get('#fieldEditForm > :nth-child(1) > .control > .input').type(' edited')
      cy.get('.textarea').type(' edited')
      cy.get('#tainacan-select-status-private > .check').click()
      cy.get('.autocomplete > .control > .input').type('dont')
      cy.get(':nth-child(1) > .button').click()
      cy.get('.active-fields-area >').should('not.contain', 'Likes edited')
      cy.get('.active-fields-area > :nth-child(7) > .handle > .label-details').should('not.contain', 'Not saved')
    })

    it('check if the message “Not Saved” appeared next to the field name', function(){
      cy.visit('/wp-admin/admin.php?page=tainacan_admin#/collections')
      cy.location('hash').should('eq', '#/collections')
      cy.get('[data-label="Name"] > :nth-child(1) > .clickable-row').click()
      cy.get(':nth-child(4) > .router-link-active').should('contain', 'Items')
      cy.get('.menu > :nth-child(2) > :nth-child(5) > a').click()
      cy.get('h1').should('contain', 'Collection Fields Edition Page')
      cy.get('.field > :nth-child(2) > :nth-child(5)').click()
      cy.get('#fieldEditForm > :nth-child(1) > .control > .input').type('{selectall}{del}Selectbox Type')
      cy.get('.textarea').type('description new')
      cy.get('#tainacan-select-status-publish > .check').click()
      cy.get('.autocomplete > .control > .input').type('yes{enter}no')
      cy.get(':nth-child(1) > .button').click()
      cy.get('.active-fields-area > :nth-child(8) > .handle > .field-name').should('not.eq', 'Selectbox Type').and('contain', 'Selectbox')
      cy.get('.active-fields-area > :nth-child(8) > .handle > .label-details').should('contain', 'Not saved')
      cy.get(':nth-child(8) > .handle > .controls > :nth-child(2) > .icon > .mdi').click()
      cy.get('#fieldEditForm > :nth-child(1) > .control > .input').type('{selectall}{del}Selectbox Type')
      cy.get('.autocomplete > .control > .input').type('yes{enter}no')
      cy.get(':nth-child(2) > .button').click()
      cy.get('.active-fields-area > :nth-child(8) > .handle > .field-name').should('contain', 'Selectbox Type').and('not.eq', 'Selectbox')
      cy.get('.active-fields-area > :nth-child(8) > .handle > .label-details').should('not.eq', 'Not saved')
    })
  })

  context('Fields Sorting', function(){
  })

  context('create selectbox-types fields tests', function(){
    it('canceled create selectbox field', function(){
      cy.visit('/wp-admin/admin.php?page=tainacan_admin#/collections')
      cy.location('hash').should('eq', '#/collections')
      cy.get('[data-label="Name"] > :nth-child(1) > .clickable-row').click()
      cy.get(':nth-child(4) > .router-link-active').should('contain', 'Items')
      cy.get('.menu > :nth-child(2) > :nth-child(5) > a').click()
      cy.get('h1').should('contain', 'Collection Fields Edition Page')
      cy.get('.field > :nth-child(2) > :nth-child(5)').click()
      cy.get('#fieldEditForm > :nth-child(1) > .control > .input').type('{selectall}{del}Selectbox name canceled')
      cy.get('.textarea').type('description')
      cy.get('#tainacan-select-status-publish > .check').click()
      cy.get('.autocomplete > .control > .input').type('Y{enter}n')
      cy.get(':nth-child(1) > .button').click()
      cy.get('.active-fields-area >').should('not.contain', 'Selectbox name canceled')
    })

    it('create selectbox-type field public required', function(){
      cy.visit('/wp-admin/admin.php?page=tainacan_admin#/collections')
      cy.location('hash').should('eq', '#/collections')
      cy.get('[data-label="Name"] > :nth-child(1) > .clickable-row').click()
      cy.get(':nth-child(4) > .router-link-active').should('contain', 'Items')
      cy.get('.menu > :nth-child(2) > :nth-child(5) > a').click()
      cy.get('h1').should('contain', 'Collection Fields Edition Page')
      cy.get('.field > :nth-child(2) > :nth-child(5)').click()
      cy.get('#fieldEditForm > :nth-child(1) > .control > .input').type('{selectall}{del}Selectbox name public required')
      cy.get('.textarea').type('book description required')
      cy.get('#tainacan-select-status-publish > .check').click()
      cy.get(':nth-child(2) > .b-checkbox > .check').click()
      cy.get('.autocomplete > .control > .input').type('Y{enter}n')
      cy.get(':nth-child(2) > .button').click()
      cy.get('.active-fields-area >').should('contain', 'Selectbox name public required')
    })

    it('create selectbox-type field public multiple values', function(){
      cy.visit('/wp-admin/admin.php?page=tainacan_admin#/collections')
      cy.location('hash').should('eq', '#/collections')
      cy.get('[data-label="Name"] > :nth-child(1) > .clickable-row').click()
      cy.get(':nth-child(4) > .router-link-active').should('contain', 'Items')
      cy.get('.menu > :nth-child(2) > :nth-child(5) > a').click()
      cy.get('h1').should('contain', 'Collection Fields Edition Page')
      cy.get('.field > :nth-child(2) > :nth-child(5)').click()
      cy.get('#fieldEditForm > :nth-child(1) > .control > .input').type('{selectall}{del}Selectbox name public multiple values')
      cy.get('.textarea').type('book description multiple values')
      cy.get('#tainacan-select-status-publish > .check').click()
      cy.get(':nth-child(3) > .b-checkbox > .check').click()
      cy.get('.autocomplete > .control > .input').type('Y{enter}n')
      cy.get(':nth-child(2) > .button').click()
      cy.get('.active-fields-area >').should('contain', 'Selectbox name public multiple values')
    })

    it('create selectbox-type field public unique values', function(){
      cy.visit('/wp-admin/admin.php?page=tainacan_admin#/collections')
      cy.location('hash').should('eq', '#/collections')
      cy.get('[data-label="Name"] > :nth-child(1) > .clickable-row').click()
      cy.get(':nth-child(4) > .router-link-active').should('contain', 'Items')
      cy.get('.menu > :nth-child(2) > :nth-child(5) > a').click()
      cy.get('h1').should('contain', 'Collection Fields Edition Page')
      cy.get('.field > :nth-child(2) > :nth-child(5)').click()
      cy.get('#fieldEditForm > :nth-child(1) > .control > .input').type('{selectall}{del}Selectbox name public unique values')
      cy.get('.textarea').type('name book description multiple values')
      cy.get('#tainacan-select-status-publish > .check').click()
      cy.get(':nth-child(4) > .b-checkbox > .check').click()
      cy.get('.autocomplete > .control > .input').type('y{enter}n')
      cy.get(':nth-child(2) > .button').click()
      cy.get('.active-fields-area >').should('contain', 'Selectbox name public unique values')
    })
  })

  context('Leave page without saving field editions', function(){
    it('Leave page without saving field editions', function(){
      cy.visit('/wp-admin/admin.php?page=tainacan_admin#/collections')
      cy.location('hash').should('eq', '#/collections')
      cy.get('[data-label="Name"] > :nth-child(1) > .clickable-row').click()
      cy.get(':nth-child(4) > .router-link-active').should('contain', 'Items')
      cy.get('.menu > :nth-child(2) > :nth-child(5) > a').click()
      cy.get('h1').should('contain', 'Collection Fields Edition Page')
      cy.get('.field > :nth-child(2) > :nth-child(5)').click()
      cy.get('#fieldEditForm > :nth-child(1) > .control > .input').type('{selectall}{del}Not Saved')
      cy.get('.textarea').type('description')
      cy.get('#tainacan-select-status-publish > .check').click()
      cy.contains('Items').click()
      cy.get('.modal-card').should('have.class', 'animation-content')
      cy.get('.modal-card-foot > :nth-child(1)').click()
      cy.get(':nth-child(1) > .button').click()
      cy.get('.active-fields-area >').should('not.contain', 'Not Saved').and('contain', 'Selectbox')
      cy.get('.menu > :nth-child(2) > :nth-child(8) > a').click()
      cy.get('.modal-card').should('have.class', 'is-titleless')
    })
  })

  context('Field loading for paging and persistence testing', function(){
    it('create selectbox fields', function(){
      cy.visit('/wp-admin/admin.php?page=tainacan_admin#/collections')
      cy.location('hash').should('eq', '#/collections')
      cy.get('[data-label="Name"] > :nth-child(1) > .clickable-row').click()
      cy.get(':nth-child(4) > .router-link-active').should('contain', 'Items')
      cy.get('.menu > :nth-child(2) > :nth-child(5) > a').click()
      cy.get('h1').should('contain', 'Collection Fields Edition Page')
      cy.get('.field > :nth-child(2) > :nth-child(5)clearDB').click()
      cy.get('#fieldEditForm > :nth-child(1) > .control > .input').type('{selectall}{del}Selectbox 1')
      cy.get('.textarea').type('description selectbox')
      cy.get('#tainacan-select-status-publish > .check').click()
      cy.get('.autocomplete > .control > .input').type('y{enter}n')
      cy.get(':nth-child(2) > .button').click()
      cy.get('.field > :nth-child(2) > :nth-child(5)').click()
      cy.get('#fieldEditForm > :nth-child(1) > .control > .input').type('{selectall}{del}Selectbox 2')
      cy.get('.textarea').type('description selectbox')
      cy.get('#tainacan-select-status-publish > .check').click()
      cy.get('.autocomplete > .control > .input').type('y{enter}n')
      cy.get(':nth-child(2) > .button').click()
      cy.get('.field > :nth-child(2) > :nth-child(5)').click()
      cy.get('#fieldEditForm > :nth-child(1) > .control > .input').type('{selectall}{del}Selectbox 3')
      cy.get('.textarea').type('description selectbox')
      cy.get('#tainacan-select-status-publish > .check').click()
      cy.get('.autocomplete > .control > .input').type('y{enter}n')
      cy.get(':nth-child(2) > .button').click()
      cy.get('.field > :nth-child(2) > :nth-child(5)').click()
      cy.get('#fieldEditForm > :nth-child(1) > .control > .input').type('{selectall}{del}Selectbox 4')
      cy.get('.textarea').type('description selectbox')
      cy.get('#tainacan-select-status-publish > .check').click()
      cy.get('.autocomplete > .control > .input').type('y{enter}n')
      cy.get(':nth-child(2) > .button').click()
      cy.get('.field > :nth-child(2) > :nth-child(5)').click()
      cy.get('#fieldEditForm > :nth-child(1) > .control > .input').type('{selectall}{del}Selectbox 5')
      cy.get('.textarea').type('description selectbox')
      cy.get('#tainacan-select-status-publish > .check').click()
      cy.get('.autocomplete > .control > .input').type('y{enter}n')
      cy.get(':nth-child(2) > .button').click()
      cy.get('.field > :nth-child(2) > :nth-child(5)').click()
      cy.get('#fieldEditForm > :nth-child(1) > .control > .input').type('{selectall}{del}Selectbox 6')
      cy.get('.textarea').type('description selectbox')
      cy.get('#tainacan-select-status-publish > .check').click()
      cy.get('.autocomplete > .control > .input').type('y{enter}n')
      cy.get(':nth-child(2) > .button').click()
      cy.get('.field > :nth-child(2) > :nth-child(5)').click()
      cy.get('#fieldEditForm > :nth-child(1) > .control > .input').type('{selectall}{del}Selectbox 7')
      cy.get('.textarea').type('description selectbox')
      cy.get('#tainacan-select-status-publish > .check').click()
      cy.get('.autocomplete > .control > .input').type('y{enter}n')
      cy.get(':nth-child(2) > .button').click()
      cy.get('.field > :nth-child(2) > :nth-child(5)').click()
      cy.get('#fieldEditForm > :nth-child(1) > .control > .input').type('{selectall}{del}Selectbox 8')
      cy.get('.textarea').type('description selectbox')
      cy.get('#tainacan-select-status-publish > .check').click()
      cy.get('.autocomplete > .control > .input').type('y{enter}n')
      cy.get(':nth-child(2) > .button').click()
      cy.get('.field > :nth-child(2) > :nth-child(5)').click()
      cy.get('#fieldEditForm > :nth-child(1) > .control > .input').type('{selectall}{del}Selectbox 9')
      cy.get('.textarea').type('description selectbox')
      cy.get('#tainacan-select-status-publish > .check').click()
      cy.get('.autocomplete > .control > .input').type('y{enter}n')
      cy.get(':nth-child(2) > .button').click()
      cy.get('.field > :nth-child(2) > :nth-child(5)').click()
      cy.get('#fieldEditForm > :nth-child(1) > .control > .input').type('{selectall}{del}Selectbox 10')
      cy.get('.textarea').type('description selectbox')
      cy.get('#tainacan-select-status-publish > .check').click()
      cy.get('.autocomplete > .control > .input').type('y{enter}n')
      cy.get(':nth-child(2) > .button').click()
    })

    it('check if fields are updated to page', function(){
      cy.visit('/wp-admin/admin.php?page=tainacan_admin#/collections')
      cy.location('hash').should('eq', '#/collections')
      cy.get('[data-label="Name"] > :nth-child(1) > .clickable-row').click()
      cy.get(':nth-child(4) > .router-link-active').should('contain', 'Items')
      cy.get('.menu > :nth-child(2) > :nth-child(5) > a').click()
      cy.get('h1').should('contain', 'Collection Fields Edition Page')
      cy.get('.active-fields-area >').should('contain', 'Reviewed')
      .and('contain', 'Edited edited')
      .and('contain', 'Verified disabled')
      .and('contain', 'Selectbox Private')
      .and('not.contain', 'Blank')
      .and('contain', 'Likes')
      .and('contain', 'Selectbox Type')
      .and('not.contain', 'Selectbox name canceled')
      .and('contain', 'Selectbox name public required')
      .and('contain', 'Selectbox name public multiple values')
      .and('contain', 'Selectbox name public unique values')
      .and('contain', 'Selectbox 1')
      .and('contain', 'Selectbox 2')
      .and('contain', 'Selectbox 3')
      .and('contain', 'Selectbox 4')
      .and('contain', 'Selectbox 5')
      .and('contain', 'Selectbox 6')
      .and('contain', 'Selectbox 7')
      .and('contain', 'Selectbox 8')
      .and('contain', 'Selectbox 9')
      .and('contain', 'Selectbox 10')
    })
  })
})
