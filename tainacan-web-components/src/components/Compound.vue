<template>
    <div class="component">
        <p>{{ name }}</p>
        <slot></slot>
    </div>
</template>

<script>
export default {
  props: {
    name: { type: String }
  }
}
</script>

<style scoped>
.component {
  display: block;
  margin: 0;
  width: 100%;
	border-radius: 6px;
  font-family: sans-serif;
  font-size: 18px;
  appearance: none;
  box-shadow: none;
  color:green;
}
.component:focus {
  outline: none;
}
</style>
