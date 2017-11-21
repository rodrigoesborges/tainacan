<?php

namespace Tainacan\Field_Types;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

global $Tainacan_Field_Types;

/**
 * Class TainacanFieldType
 */
abstract class Field_Type  {

    var $primitive_type;

    function __construct() {
    	$this->register_type($this);
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
    
    /**
     * 
     * @param Field_Type $obj
     * 
     */
    function register_type($obj) {
    	global $Tainacan_Field_Types;
    	if(! is_array($Tainacan_Field_Types)) {
    		$Tainacan_Field_Types = array();
    	}
    	$Tainacan_Field_Types[] = get_class($obj);
    }
    
    /**
     * Return all registered types
     * @return array
     */
    public static function get_all_types()
    {
    	global $Tainacan_Field_Types;
    	return $Tainacan_Field_Types;
    }
}