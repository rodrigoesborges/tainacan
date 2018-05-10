<template>
    <section>
        <b-field
                :addons="false">
            <label class="label">
                {{ $i18n.get('label_compound_select_metadata_children') }}<span :class="collectionType" >&nbsp;*&nbsp;</span>
                <help-button
                        :title="$i18n.getHelperTitle('tainacan-compound', 'children')"
                        :message="$i18n.getHelperMessage('tainacan-compound', 'children')"/>
            </label>
            <div
                v-for="option in listAvailableMetadata()"
                :key="option.id">
                <b-checkbox
                        v-model="selected"
                        @input="emitValues()"
                        :native-value="option.id">
                    {{ option.name }}<br>
                </b-checkbox>
            </div>

        </b-field>
    </section>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        props: {
            search: [ String ],
            collection_id: [ Number ],
            repeated: [ String ],
            value: [ String, Object, Array ],
            field: [ String, Object ],
            errors: [ String, Object, Array ]
        },
        data(){
            return {
              selected: []
            }
        },
        methods:{
            ...mapGetters('fields',[
                'getFields'
            ]),
            emitValues(){
                this.$emit('input',{
                    children: this.selected,
                    father: this.field.id,
                    before_children: ( this.field.field_type_options
                        && this.field.field_type_options.children ) ? this.field.field_type_options.children : []
                });
            },
            listAvailableMetadata(){
                const allMetadata = [];

                for( let metadata of this.getFields() ){
                    if ( metadata.field_type === 'Tainacan\\Field_Types\\Compound' ) {
                        continue;
                    }

                    allMetadata.push( metadata );
                }

                return allMetadata;
            }
        }
    }
</script>
