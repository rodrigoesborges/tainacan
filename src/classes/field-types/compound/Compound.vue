
<template>
  <div>
    <b-field
            v-for="( child , index) in getChildren"
            :key="index"
            :addons="false"
            :message="getErrorMessage"
            :type="fieldTypeMessage">
            <span
                    class="collapse-handle">
                <label class="label">{{ child.name }}</label>
                <span
                        v-if="child.required == 'yes'"
                        class="required-field-asterisk"
                        :class="fieldTypeMessage">*</span>
                <span class="field-type">({{ $i18n.get(child.field_type_object.component) }})</span>
            </span>
          <help-button
                  :title="child.name"
                  :message="child.description"/>
          <div>
              <component
                      :id="child.field_type_object.component + '-' + field.slug"
                      :is="child.field_type_object.component"
                      :field="{ field: child, item: field.item }"
                      :value="valueChild[child.id]"
                      @input="save($event, child.id)"/>
          </div>
    </b-field>
  </div>

</template>

<script>
    import { eventBus } from '../../../js/event-bus-web-components'

    export default {
        data(){
            return {
                uniqId: new Date().getTime(),
                valueChild: []
            }
        },
        computed: {
            getChildren(){
                const children = [];

                if( this.field.field.field_type_object &&
                this.field.field.field_type_object.options &&
                  this.field.field.field_type_object.options.children_objects.length > 0  ){

                    for( let field of this.field.field.field_type_object.options.children_objects ){
                        this.setValue( field.id )
                        children.push( field );
                    }

                }
                return children;
            }
        },
        props: {
            id: '',
            field: {
                type: Object
            },
            value: [String, Number, Array],
        },
        methods: {
            setValue( fieldId ){
               if( this.value ){
                  for( const index in this.value ){
                       const realValue = this.value[index];

                       if( realValue.field && realValue.field.id === fieldId){
                         this.setParent( realValue.parent_meta_id );
                         this.valueChild[fieldId] = realValue.value;
                       }
                  }
                }
            },
            setParent( id ){
                if( id > 0 )
                  eventBus.setCompoundMetaId( this.uniqId, id );
            },
            save( $event, id ) {
                eventBus.$emit('input', {
                  parent_meta_id: eventBus.getCompoundMetaId( this.uniqId ),
                  compoundIndex: this.uniqId,
                  item_id: this.field.item.id,
                  field_id: id,
                  values: [$event] } );
            }
        }
    }
</script>

<style lang="scss" scoped>

    @import '../../../admin/scss/_variables.scss';

    .multiple-inputs {
        display: flex;
    }

    .field {
        border-bottom: 1px solid $draggable-border-color;
        padding: 10px 25px;

        .label {
            font-size: 14px;
            font-weight: 500;
            margin-left: 18px;
            margin-bottom: 0.5em;
        }
        .field-type {
            font-size: 13px;
            font-weight: 400;
            color: $gray;
            top: -0.2em;
            position: relative;
        }
        .help-wrapper {
            top: -0.2em;
        }
        .collapse-handle {
            cursor: pointer;
        }
    }
</style>
