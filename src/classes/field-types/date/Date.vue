<template>
    <b-datepicker
            :class="{'has-content': dateValue != undefined && dateValue != ''}"
            :id="id"
            v-model="dateValue"
            @blur="onBlur"
            :readonly="false"
            @input="onInput($event)"/>
</template>

<script>
    export default {
        created(){
            if( this.value && (typeof this.value === 'string' || this.value instanceof String) ){
                try {
                  let dateStr= this.value; //returned from mysql timestamp/datetime field
                  let separetedDate = dateStr.split("-");
                  this.dateValue = new Date(separetedDate[0],(separetedDate[1]-1),separetedDate[2] );
                } catch (e) {
                    // move on
                }
            }
        },
        data() {
            return {
                dateValue: ''
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
            onBlur() {
                this.$emit('blur');
            },
            onInput($event) {
                this.dateValue = $event;
                let date_init = this.dateValue.getUTCFullYear() + '-' +
                    ('00' + (this.dateValue.getUTCMonth() + 1)).slice(-2) + '-' +
                    ('00' + this.dateValue.getUTCDate()).slice(-2);
                this.$emit('input', date_init);
                this.$emit('blur');
            }
        }
    }
</script>
