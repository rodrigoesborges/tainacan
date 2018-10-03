<?php

namespace Tainacan\Exposers\Types;

/**
 * Generate a Csv formated response
 *
 */
class Csv extends Type {
	
	/**
	 * List of supported mappers
	 * @var array
	 */
	public $mappers = ['Value'];
	public $slug = 'csv'; // type slug for url safe
	public $name = 'Comma-separated values';
	
	/**
	 * 
	 * {@inheritDoc}
	 * @see \Tainacan\Exposers\Types\Type::rest_request_after_callbacks()
	 */
	public function rest_request_after_callbacks( $response, $handler, $request ) {
		$response->set_headers( [
			'Content-Type: text/csv; charset=' . get_option( 'blog_charset' ),
			'Content-disposition: attachment;filename=tainacan.csv'] // TODO filter/optional 
		);
		
		$csv = fopen('php://memory', 'w');
		$this->array_to_csv($this->get_metadata($response->get_data()), apply_filters('tainacan-exposer-csv', $csv));
		rewind($csv);
		$ret_csv = stream_get_contents($csv);
		fclose($csv);
		$response->set_data($ret_csv);
		return $response;
	}
	
	/**
	 * Convert Array to Csv
	 * @param array $data
	 * @param string $csv
	 * @return string
	 */
	protected function array_to_csv( $data, $csv ) {
	    if(array_key_exists(0, $data))  {
	        $keys = array_keys($data[0]);
	        fputcsv($csv, $keys, apply_filters('tainacan-exposer-csv-delimiter', ';') );
	        foreach ($data as $item) {
	            $metadata = array_values($item);
	            $metadata = array_map(function($x) {
	                if(is_array($x)) {
	                    return implode(', ', $x);
	                }
	                return $x;
	            }, $metadata);
	                fputcsv($csv, $metadata, apply_filters('tainacan-exposer-csv-delimiter', ';') );
	        }
	    } else {
            fputcsv($csv, array_keys($data), apply_filters('tainacan-exposer-csv-delimiter', ';') );
            fputcsv($csv, array_values($data), apply_filters('tainacan-exposer-csv-delimiter', ';') );
	    }
		return $csv;
	}
}