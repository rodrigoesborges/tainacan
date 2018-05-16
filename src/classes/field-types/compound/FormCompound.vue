<template>
    <section>
        <b-field
                :listen="getErrors"
                :type="type"
                :message="message"
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
    import { tainacan as axios } from '../../../js/axios/axios';

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
              selected: [],
              options: [],
              before_children: [],
              type: '',
              message: ''
            }
        },
        created(){
              this.selected = [];

              // retorna todos os metadados nao importa o parent
              axios.get('/collection/' + this.field.collection_id + '/fields?nopaging=1&parent=all')
                  .then( res => {
                      for (let field of res.data) {
                          if( this.field.field_type_options
                              && this.field.field_type_options.children && this.field.field_type_options.children.indexOf( field.id ) >= 0 ){
                                this.selected.push( field.id );
                                this.before_children.push( field.id );
                          }

                          this.options.push(field);
                      }
                  })
                  .catch(error => {
                      this.$console.log(error);
                  });
        },
        computed: {
            getErrors(){
              this.setErrors();
              return true;
            }
        },
        methods:{
            setErrors(){
              if( this.errors && this.errors.children && this.selected.length === 0 ){
                  this.message = this.errors.children;
                  this.type = 'is-danger';
              } else if( this.errors && this.errors.length > 0 && !this.errors.children){
                  let errors = Object.values(this.errors[0]);
                  this.message = errors[0];
                  this.type = 'is-danger';
              }else {
                  this.message = '';
                  this.type = '';
              }
            },
            emitValues(){
                this.setErrors();
                this.$emit('input',{
                    children: this.selected,
                    parent: this.field.id,
                    before_children: this.before_children
                });
            },
            listAvailableMetadata(){
                const allMetadata = [];

                for( let metadata of this.options ){
                    if ( metadata.field_type === 'Tainacan\\Field_Types\\Compound' ) {
                        continue;
                    }
                    allMetadata.push( metadata );
                }

                return allMetadata;
            },
            clearSelected( id ){
              let index = this.previous_children.findIndex(field => field.id == id);
              if (index >= 0) {
                  this.previous_children.splice(index, 1);
              }
            }
        }
    }
</script>
