<?php

namespace Tainacan\Tests;

/**
 * @group api
 */
class Terms extends TAINACAN_UnitApiTestCase {

	public function test_create_term(){
		$taxonomy = $this->tainacan_entity_factory->create_entity(
			'taxonomy',
			array(
				'name'         => 'TesteTermTax',
				'description'  => 'Teste Term Tax Desc',
				'allow_insert' => 'yes',
				'status'       => 'publish'
			),
			true
		);

		$term = $this->tainacan_entity_factory->create_entity(
		    'term',
		    array(
		        'taxonomy' => $taxonomy->get_db_identifier(),
		        'name'     => 'TesteTermTerm',
		        'user'     => get_current_user_id(),
		    ),
		    true
        );
		$Tainacan_Terms = $term->get_repository();
		
		$test = $Tainacan_Terms->fetch( $term->get_id(), $taxonomy->get_db_identifier() );
		
		$this->assertEquals( 'TesteTermTerm', $test->get_name() );
	}

	/**
	 * @group rewrite
	 */
	function test_rewrite() {
	    global $wp_rewrite;
	    
	    $wp_rewrite->set_permalink_structure('/%year%/%monthnum%/%day%/%postname%/');
	    $wp_rewrite->flush_rules();
	    
	    $taxonomy = $this->tainacan_entity_factory->create_entity(
	        'taxonomy',
	        array(
 	            'name'         => 'testeRewriteTermTax',
	            'description'  => 'teste Rewrite Term Tax Desc',
	            'allow_insert' => 'yes',
	            'status'       => 'publish'
	        ),
	        true
        );
	    
	    $term = $this->tainacan_entity_factory->create_entity(
	        'term',
	        array(
	            'taxonomy' => $taxonomy->get_db_identifier(),
	            'name'     => 'testeRewriteTerm',
	            'user'     => get_current_user_id(),
	        ),
	        true
        );
	   
	    //var_dump($wp_rewrite->rules);
	    //$wp_rewrite->flush_rules();
	    //var_dump($wp_rewrite->rules);
	    $this->assertTrue(\Tainacan\Repositories\Repository::check_rewrite($taxonomy->get_slug(), false));
	    
	    /*Test Collection Slug update
	    $x->set('slug', 'newRewriteSlug');
	    $x->validate();
	    $tainacan_collection = $x->get_repository();
	    $tainacan_collection->update($x);
	    
	    $this->assertTrue(\Tainacan\Repositories\Repository::check_rewrite('newRewriteSlug', false));
	    //End: Test Collection Slug update*/
	}
}

?>