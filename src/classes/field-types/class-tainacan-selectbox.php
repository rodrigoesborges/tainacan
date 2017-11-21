<?php

namespace Tainacan\Field_Types;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Class TainacanFieldType
 */
class Selectbox extends Field_Type {

    function __construct(){
        $this->primitive_type = '';
        parent::__construct();
    }

    /**
     * @param $metadata
     * @return string
     */

    function render( $metadata ){
        return '<tainacan-selectbox name="'.$metadata->get_name().'"></tainacan-selectbox>';
    }
}