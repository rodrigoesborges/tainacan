<template>

        <!-- <el-date-picker
                type="date"
                format="dd/MM/yyyy"
                value-format="dd/MM/yyyy"
                :value="dateValue"
                @blur="onBlur"
                @input="onInput($event)"></el-date-picker> -->
    <div class='input-group date' id='datetimepicker1'>
        <input :value="dateValue"
                @blur="onBlur" 
                type='text' 
                class="form-control" />
        <span class="input-group-append">
            <span class="material-icons md-18">today</span>
        </span>
    </div>

</template>

<script>
    import lang from 'element-ui/lib/locale/lang/pt-br'
    import locale from 'element-ui/lib/locale'

    import jQuery from 'jquery'
    window.jQuery = jQuery

    locale.use(lang)

    export default {
        data() {
            return {
                dateValue: ''
            }
        },
        methods: {
            onBlur() {
                this.$emit('blur');
            },
            onInput($event) {
                this.dateValue = $event;
                this.$emit('input', this.dateValue);
            }
        },
        mounted() {
            var vm = this
            console.log($(this.$el));
            $(this.$el).datetimepicker();

            jQuery(document).ready(function($){
                
                $('#datetimepicker1').datetimepicker();
            });
        }
    }
</script>
