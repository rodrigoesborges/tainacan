<?php

namespace Tainacan\Exposers\Types;

/**
 * abstract class for implement exposer types
 *
 */
abstract class Type {
	
	protected $mappers = true; // List of supported mapper, leave true for all
	protected $extension = 'tnc'; // extension sufix for multi operation system compatibility
	public $slug = ''; // type slug for url safe
	public $name = ''; // User friend Name
	
	/**
	 * Change response after api callbacks
	 * @param \WP_REST_Response $response
	 * @param \WP_REST_Server $handler
	 * @param \WP_REST_Request $request
	 * @return \WP_REST_Response
	 */
	public abstract function rest_request_after_callbacks( $response, $handler, $request );
	
	/**
	 * Return list of supported mappers for this type 
	 */
	public function get_mappers() {
		return apply_filters('tainacan-exporser-type-mappers', $this->mappers, $this);
	}
	
	/**
	 * Return file extension
	 */
	public function get_extension() {
		return $this->extension;
	}
	
	public function get_metadata($api_entity) {
	    
	    $entity = $api_entity;
	    $list = false;
	    
	    if(array_key_exists(0, $entity)) {
	        $entity = \Tainacan\Repositories\Repository::get_entity_by_post($api_entity[0]['id']);
	        $list = true;
	    } elseif(array_key_exists('id', $api_entity)) {
	        $entity = \Tainacan\Repositories\Repository::get_entity_by_post($api_entity['id']);
	    }
	    
	    if(is_object($entity)) {
    	    switch (get_class($entity)) {
    	        case 'Tainacan\Entities\Collection':
    	            {
    	            } break;
    	        case 'Tainacan\Entities\Item':
    	            {
    	                if($list) {
    	                    $items_metadata = array();
    	                    foreach ($api_entity as $api_item)
    	                    {
    	                        $item = \Tainacan\Repositories\Repository::get_entity_by_post($api_item['id']);
    	                        $items_metadata[] = $item->_toArray();
    	                    }
    	                    return $items_metadata;
    	                } else {
    	                    return $entity->get_metadata();
    	                }
    	            } break;
    	        break;
    	    }
	    }
	    return $entity;
	}
}