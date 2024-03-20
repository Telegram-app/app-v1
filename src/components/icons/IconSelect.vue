<template>
  <svg :height="h" :width="w" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon" :class="{'icon--black': color && color === 'black'}">
    <path d="M11 9L6 13.6667L1 9" stroke="#7D7D85" stroke-width="1.5"/>
    <path d="M1 6.66663L6 2L11 6.66663" stroke="#7D7D85" stroke-width="1.5"/>
  </svg>


</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "IconSelect",

  props: ["h", "w", 'color'],
});
</script>

<style lang="scss" scoped>
svg {
  .icon {
    path {
      stroke: #7D7D85;
    }
    
    &--black {
      path {
        stroke: var(--tg-theme-text-color, $tg-text-color);
      }
    }
  }
}
</style>
