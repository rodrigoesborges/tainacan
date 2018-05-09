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
            <b-select
                    name="field_type_compound"
                    placeholder="Select the collection to fetch items"
                    v-model="selected">
                <option
                        v-for="option in getFields()"
                        :value="option.id"
                        :key="option.id">
                    {{ option.name }}
                </option>
            </b-select>
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
                this.$emit('input',{});
            }
        }
    }
</script>
