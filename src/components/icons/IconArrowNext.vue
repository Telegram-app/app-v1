<template>
  <svg
    :height="h"
    :width="w"
    viewBox="0 0 19 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      class="icon"
      :class="{'icon--black': color && color === 'black'}"
      d="M3.51855 9.49995H14.7778M14.7778 9.49995L9.39295 4.22217M14.7778 9.49995L9.39295 14.7777"
      stroke="black"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>

</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "IconArrowNext",

  props: ["h", "w", 'color'],
});
</script>

<style lang="scss" scoped>
svg {
  .icon {
    stroke: var(--tg-theme-button-color, $tg-button-color);
    
    &--black {
      stroke: var(--tg-theme-text-color, $tg-text-color);
    }
  }
}
</style>
