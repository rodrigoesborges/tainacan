<?php

namespace Tainacan\Field_Types;

use Tainacan\Entities;
use Tainacan\Entities\Field;
use Tainacan\Entities\Item_Metadata_Entity;

defined( 'ABSPATH' ) or die( 'No script kiddies please!' );

/**
 * Class TainacanFieldType
 */
class Compound extends Field_Type {

    function __construct(){
        // call field type constructor
        parent::__construct();
        $this->set_primitive_type('compound');
        $this->set_component('tainacan-compound');
        $this->set_form_component('tainacan-form-compound');

        add_action( 'tainacan-insert-tainacan-field', array( &$this, 'save_children' ), 10, 1 );
    }

    /**
     * save options and remove old children
     * @param $options
     */
    public function save_children( $field ){
        $field_type_object = $field->get_field_type_object();

        if( $field_type_object instanceof self ){
           $options = $field_type_object->get_options();
           $Tainacan_Fields = \Tainacan\Repositories\Fields::get_instance();

           if( !isset( $options['parent'] ) )
               return;

           if( isset( $options['before_children'] ) && is_array( $options['before_children'] ) ){
               foreach ( $options['before_children'] as $child) {

                   if( isset( $options['children'] ) && is_array( $options['children'] ) && in_array( $child,  $options['children']))
                       continue;

                   $field = new Field( $child );
                   $field->set_parent(0);

                   if( $field->validate() )
                       $Tainacan_Fields->update( $field );
               }
           }

           if( isset( $options['children'] ) && is_array( $options['children'] ) ){
               foreach ( $options['children'] as $child) {
                   $field = new Field( $child );
                   $field->set_parent( $options['parent'] );

                   if( $field->validate() )
                       $Tainacan_Fields->update( $field );
               }
           }
        }

    }

    /**
     * validate the children of the compound
     * @param \Tainacan\Entities\Field $field
     * @return array|bool
     */
    public function validate_options( \Tainacan\Entities\Field $field ){
        if ( !in_array($field->get_status(), apply_filters('tainacan-status-require-validation', ['publish','future','private'])) )
            return true;

        $field_type_object = $field->get_field_type_object();

        if( $field_type_object instanceof self  ){
           $options = $field_type_object->get_options();

           // if parent is not set, it comes from tests
           if( !isset( $options['parent'] ) )
              return true;

           if( !isset( $options['children'] ) || empty( $options['children'] ) ){
             return [
                 'children' => __('Children is required','tainacan')
             ];
           }

           foreach ($options['children'] as $child) {
              $field = new Field( $child );
              $field->set_parent( $options['parent'] );
              if( !$field->validate() ){
                  return [ $field->get_errors()[0] ];
              }
           }
        }

        return true;
    }

    /**
     * Overrides and bring back all data for the children
     * that were not set yet.
     * @return array Field type options
     */
    public function get_options() {
        $Tainacan_Fields = \Tainacan\Repositories\Fields::get_instance();
        $options = parent::get_options();
        $options['children_objects'] = [];

        if( isset( $options['children'] ) && !empty( $options['children'] ) ){

          foreach ($options['children'] as $child) {
             $item = new Field( $child );
             $item_arr = $item->__toArray();
       			 $item_arr['field_type_object'] = $item->get_field_type_object()->__toArray();
       			 $item_arr['current_user_can_edit'] = $item->can_edit();
       			 ob_start();
       			 $item->get_field_type_object()->form();
       			 $form = ob_get_clean();
       			 $item_arr['edit_form'] = $form;


             $options['children_objects'][] = $item_arr;
          }

        }
        return $options;
    }

    /**
     * @param $itemMetadata \Tainacan\Entities\Item_Metadata_Entity The instace of the entity itemMetadata
     * @return string
     */

    public function render( $itemMetadata ){
        return '<tainacan-text
                               id="tainacan-text-' . $itemMetadata->get_item()->WP_Post->post_name . '"
                               field_id ="'.$itemMetadata->get_field()->get_id().'"
                               item_id="'.$itemMetadata->get_item()->get_id().'"
                               value=\''.json_encode( $itemMetadata->get_value() ).'\'
                               name="'.$itemMetadata->get_field()->get_name().'"></tainacan-text>';
    }

    /**
     * generate the fields for this field type
     */
    public function form(){

    }


	/**
	 * Return the value of an Item_Metadata_Entity using a field of this field type as an html string
	 * @param  Item_Metadata_Entity $item_metadata
	 * @return string The HTML representation of the value, each HTML representation of the value of each field composing this metadata
	 */
	public function get_value_as_html(Item_Metadata_Entity $item_metadata) {

		$value = $item_metadata->get_value();

		$return = '';

		if ( $item_metadata->is_multiple() ) {

			$return .= '<div class="tainacan-compund-group">';

			foreach ( $value as $compound_element ) {

				$return .= '<div class="tainacan-compund-field">';

				foreach ( $compound_element as $meta ) {
					if ( $meta instanceof Item_Metadata_Entity ) {
						$return .= '<h4>' . $meta->get_field()->get_name() . "</h4>\n";
						$return .= '<p>' . $meta->get_value_as_html() . '</p>' . "\n\n";
					}
				}

				$return .= '</div>' . "\n\n";

			}

			$return .= '</div>' . "\n\n";


		} else {

			foreach ( $value as $meta ) {

				$return .= '<div class="tainacan-compund-field">';

				if ( $meta instanceof Item_Metadata_Entity ) {
					$return .= '<h4>' . $meta->get_field()->get_name() . "</h4>\n";
					$return .= '<p>' . $meta->get_value_as_html() . '</p>';
				}

				$return .= '</div>' . "\n\n";

			}

		}

		return $return;

	}



}
