<?php

namespace Tainacan\Field_Types;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Class TainacanFieldType
 */
abstract class Field_Type  {

    var $primitive_type;

    function __construct() {
    	$this->register_type();
    }
    
    abstract function render( $metadata );
    
    function validate($value) {
        return true;
    }
    
    function get_validation_errors() {
        return [];
    }

    function get_primitive_type(){
        return $this->primitive_type;
    }
    
    function register_type() {
    	global $Tainacan_Field_Types;
    	if(! is_array($Tainacan_Field_Types)) {
    		$Tainacan_Field_Types = array();
    	}
    	$Tainacan_Field_Types[] = get_class();
    }
    
    function get_all_types()
    {
    	global $Tainacan_Field_Types;
    	return $Tainacan_Field_Types;
    }
}