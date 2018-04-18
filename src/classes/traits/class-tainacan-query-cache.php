<?php

namespace Tainacan\Traits;

trait Query_Cache {
	
	protected $QueryCache = [];
	
	protected function add_cache($repository, $query_args, $result) {
		$query_hash = $this->build_query_hash($query_args);
		$this->QueryCache[$repository][$query_hash] = $result;
	}
	
	protected function get_cache($repository, $query_args) {
		$query_hash = $this->build_query_hash($query_args);
		if ( isset($this->QueryCache[$repository][$query_hash]) ) {
			return $this->QueryCache[$repository][$query_hash];
		}
		
		return false;
		
	}
	
	protected function clear_cache($repository = null) {
		if ( is_null($repository) ) {
			$this->QueryCache = [];
			var_dump('cleared');
		} else {
			if ( isset($this->QueryCache[$repository]) ) {
				unset($this->QueryCache[$repository]);
			}
		}
		
	}
	
	private function build_query_hash($query_args) {
		$cur_user = wp_get_current_user();
		$caps = $cur_user->allcaps;
		$query_args['caps'] = $caps;
		return md5(serialize($query_args));
	}
	    
}
