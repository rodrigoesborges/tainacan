<template>
    <input v-on:submit.prevent class="uk-input" 
        :value="inputValue" 
        @blur="onBlur"/>
</template>

<script>
    export default {
        data() {
            return {
                inputValue: ''
            }
        },
        methods: {
            onBlur() {
                this.$emit('blur');
            },
        }
    }
</script>

<style scoped>
    .multiple-inputs {
        display: flex;
    }
</style>
