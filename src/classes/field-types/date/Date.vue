<template>
    <input type="text" data-uk-datepicker="{format:'DD.MM.YYYY'}"
              :value="dateValue"
              @blur="onBlur">
</template>

<script>
    import lang from 'element-ui/lib/locale/lang/pt-br'
    import locale from 'element-ui/lib/locale'
    import * as DatePicker from '../../../../node_modules/uikit/dist/js/components/datepicker.js'

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
            }
        }
    }
</script>
