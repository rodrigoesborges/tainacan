<?php

namespace Tainacan\Tests;

/**
 * @group api
 */
class TAINACAN_REST_Export_Controller extends TAINACAN_UnitApiTestCase {
	
	protected function create_requirements() {
		$collection = $this->tainacan_entity_factory->create_entity(
			'collection',
			array(
				'name' => 'testeItemExport',
				'description' => 'No description',
			),
			true,
			true
		);
		
		$type = $this->tainacan_metadatum_factory->create_metadatum('text');
		
		$metadatum = $this->tainacan_entity_factory->create_entity(
			'metadatum',
			array(
				'name'              => 'teste_Export',
				'description'       => 'descricao',
				'collection'        => $collection,
				'metadatum_type'		=> $type,
				'exposer_mapping'	=> [
					'dublin-core' => 'language'
				]
			),
			true,
			true
		);
		
		$item = $this->tainacan_entity_factory->create_entity(
			'item',
			array(
				'title'       => 'item_teste_Export',
				'description' => 'adasdasdsa',
				'collection'  => $collection
			),
			true,
			true
		);
		
		$Tainacan_Item_Metadata = \Tainacan\Repositories\Item_Metadata::get_instance();
		
		$item_metadata = new \Tainacan\Entities\Item_Metadata_Entity($item, $metadatum);
		
		$item_metadata->set_value('teste_export_metadatum_value');
		
		$item_metadata->validate();
		
		$item_metadata = $Tainacan_Item_Metadata->insert($item_metadata);
		
		$item2 = $this->tainacan_entity_factory->create_entity(
			'item',
			array(
				'title'       => 'item_teste_Export2',
				'description' => 'adasdasdsa2',
				'collection'  => $collection
			),
			true,
			true
		);
		
		$item_metadata2 = new \Tainacan\Entities\Item_Metadata_Entity($item2, $metadatum);
		
		$item_metadata2->set_value('teste_export_metadatum_value2');
		
		$item_metadata2->validate();
		
		$item_metadata2 = $Tainacan_Item_Metadata->insert($item_metadata2);
		
		$item3 = $this->tainacan_entity_factory->create_entity(
			'item',
			array(
				'title'       => 'item_teste_Export3',
				'description' => 'adasdasdsa3',
				'collection'  => $collection
			),
			true,
			true
		);
		
		$item_metadata3 = new \Tainacan\Entities\Item_Metadata_Entity($item3, $metadatum);
		
		$item_metadata3->set_value('teste_export_metadatum_value3');
		
		$item_metadata3->validate();
		
		$item_metadata3 = $Tainacan_Item_Metadata->insert($item_metadata3);
		
		return ['collection' => $collection, 'items' => [$item, $item2, $item3], 'metadatum' => $metadatum, 'items_metadatas' => [$item_metadata, $item_metadata2, $item_metadata3]];
	}
	
	public function test_export_a_collection() {
		extract($this->create_requirements());
		
		$item_exposer_json = json_encode([
			'exposer-type'       => 'Xml',
			'exposer-map'     => 'Value',
			'export-background' => false
		]);
		
		$query = [
			'orderby' => 'id',
			'order'	  => 'asc',
		];
		
		$request  = new \WP_REST_Request('GET', $this->namespace . '/export/collection/' . $collection->get_id() );
		$request->set_query_params($query);
		$request->set_body($item_exposer_json);
		$response = $this->server->dispatch($request);
		$this->assertEquals(200, $response->get_status());
		$data = $response->get_data();
		
		$this->assertInstanceOf('SimpleXMLElement', $xml = @simplexml_load_string($data));
		
		$this->assertEquals(3, $xml->count());
		$i = 0;
		foreach ($xml->children() as $xml_item ) {
			$metadata = $items[$i]->get_metadata();
			foreach ($metadata as $metadatum_meta) {
				$metadatum = $metadatum_meta->get_metadatum();
				$this->assertEquals($metadatum_meta->get_value(), $xml_item->{$metadatum->get_name()});
				//echo "{$metadatum->get_name()}:{$metadatum_meta->get_value()}"; // uncomment if need debug
			}
			$i++;
		}
	}
}

?>
