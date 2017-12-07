<?php

use Tainacan\Repositories;
use Tainacan\Entities;

/**
 * Represents the Items REST Controller
 * @uses Tainacan\Repositories\
 * @uses Tainacan\Entities\
*/
class TAINACAN_REST_Items_Controller extends WP_REST_Controller {
	private $items_repository;
	private $item;

	/**
	 * TAINACAN_REST_Items_Controller constructor.
	 * Define the namespace, rest base and instantiate your attributes.
	 */
	public function __construct() {
		$this->namespace = 'tainacan/v2';
		$this->rest_base = 'items';
		$this->items_repository = new Repositories\Items();
		$this->item = new Entities\Item();

		add_action('rest_api_init', array($this, 'register_routes'));
	}

	/**
	 * Register items routes, and their endpoints
	 */
	public function register_routes() {
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/collection/(?P<collection_id>[\d]+)',
			array(
				array(
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => array($this, 'get_items'),
					//'permission_callback' => array($this, 'get_items_permissions_check'),
					'args'                => $this->get_collection_params(),
				),
				array(
					'methods'             => WP_REST_Server::CREATABLE,
					'callback'            => array($this, 'create_item'),
					'permission_callback' => array($this, 'create_item_permissions_check'),
					'args'                => $this->get_endpoint_args_for_item_schema(WP_REST_Server::CREATABLE),
				),
				'schema' => array($this, 'get_public_item_schema'),
		));
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/collection/(?P<collection_id>[\d]+)/(?P<item_id>[\d]+)',
			array(
				array(
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => array($this, 'get_item'),
					'permission_callback' => array($this, 'get_item_permissions_check'),
				),
				array(
					'methods'             => WP_REST_Server::EDITABLE,
					'callback'            => array($this, 'update_item'),
					'permission_callback' => array($this, 'update_item_permissions_check'),
				),
				array(
					'methods'             => WP_REST_Server::DELETABLE,
					'callback'            => array($this, 'delete_item'),
					'permission_callback' => array($this, 'delete_item_permissions_check'),
				),
		));
	}

	public function prepare_item_for_response( $item, $request ) {
		if (!empty($item) && $item instanceof WP_Query){
			$items_as_array = [];

			if ($item->have_posts()) {
				while ( $item->have_posts() ) {
					$item->the_post();
					$ite = new Entities\Item($item->post);
					array_push($items_as_array, $ite->__toJSON());

				}
				wp_reset_postdata();
			}

			return json_encode($items_as_array);
		} elseif(!empty($item)){
			return $item->__toJSON();
		}

		return $item;
	}

	public function get_items( $request ) {
		$collection_id = $request['collection_id'];
		$items = $this->items_repository->fetch([], $collection_id, 'WP_Query');

		$response = $this->prepare_item_for_response($items, $request);

		return new WP_REST_Response($response, 200);
	}

	public function get_item_permissions_check( $request ) {
		return true;
	}

	public function prepare_item_for_database( $request, $collection_id ) {
		$this->item->set_title($request['title']);
		$this->item->set_description($request['description']);

		$collection_wp_post = get_post($collection_id);
		$collection = new Entities\Collection($collection_wp_post);

		$this->item->set_collection($collection);

		return $this->item;
	}

	public function create_item( $request ) {
		$collection_id = $request['collection_id'];
		$item = json_decode($request->get_body(), true);

		$item_prepared = $this->prepare_item_for_database($item, $collection_id);

		if($item_prepared->validate()){
			$item = $this->items_repository->insert($item_prepared);

			return new WP_REST_Response($item->__toJSON(), 201);
		}

		return new WP_REST_Response($item_prepared->get_errors(), 400);
	}

	public function create_item_permissions_check( $request ) {
		return true;
	}
}

?>