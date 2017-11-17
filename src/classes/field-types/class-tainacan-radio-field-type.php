<?php

namespace Tainacan\Field_Types;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Class TainacanFieldType
 */
class Radio_Field_Type extends Field_Type {

    function __construct(){
        $this->primitive_type = '';
        parent::__construct();
    }

    /**
     * @param $metadata
     * @return string
     */

    function render( $metadata ){
        return '<tainacan-radio name="'.$metadata->get_name().'"></tainacan-radio>';
    }
}