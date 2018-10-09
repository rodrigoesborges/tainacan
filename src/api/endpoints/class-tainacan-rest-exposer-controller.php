<?php

namespace Tainacan\API\EndPoints;

use \Tainacan\API\REST_Controller;

class REST_Exposer_Controller extends REST_Controller {

	/**
	 * REST_Exposer_Controller constructor.
	 */
	public function __construct() {
		$this->rest_base = 'exposers';
		parent::__construct();
	}

	public function register_routes() {
		register_rest_route($this->namespace, '/' . $this->rest_base . '/urls',
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array($this, 'get_urls'),
					'permission_callback' => array($this, 'get_urls_permissions_check'),
				),
			)
		);
	}

	/**
	 * @param \WP_REST_Request $request
	 *
	 * @return \WP_Error|\WP_REST_Response
	 */
	public function get_urls( $request ) {
		$Tainacan_Exposers = \Tainacan\Exposers\Exposers::get_instance();
		$params = json_decode($request->get_body(), true);
		$base_url = $params['baseurl'];
		
		$prepared = $Tainacan_Exposers->get_exposer_urls($base_url);

		return new \WP_REST_Response($prepared, 200);
	}

	/**
	 * @param \WP_REST_Request $request
	 *
	 * @return bool|\WP_Error
	 */
	public function get_urls_permissions_check( $request ) {
	    $params = json_decode($request->get_body(), true);
	    if( array_key_exists('baseurl', $params) && !empty($params['baseurl'])) {
	        return true;
	    }
		return false;
	}
	
}

?>