<template>
  <svg :height="h" :width="w" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.428 7.16221C5.72954 7.84029 4.81881 8.09615 4.21569 8.09615C3.11765 8.09615 1 7.24808 1 4.54808C1 1.84808 3.11765 1 4.21569 1C5.31373 1 7.43137 1.84808 7.43137 4.54808C7.43137 5.76505 7.00116 6.60578 6.428 7.16221ZM6.428 7.16221L9 10" stroke="#888888" stroke-linecap="round"/>
  </svg>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "IconSearch",

  props: ["h", "w"],
});
</script>

<style lang="scss" scoped>
svg {
  path {
    stroke: #888888;
  }
}
</style>
