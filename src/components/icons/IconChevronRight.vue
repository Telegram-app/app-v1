<template>
  <svg
    :height="h"
    :width="w"
    viewBox="0 0 45 70"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      class="icon"
      :class="['icon--' + color]"
      d="M2.5293 59.8083L27.3376 35L2.5293 10.1375L10.1668 2.5L42.6668 35L10.1668 67.5L2.5293 59.8083Z"
      fill="black"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "IconChevronRight",

  props: ["h", "w", 'color'],
});
</script>

<style lang="scss" scoped>
svg {
  .icon {
    fill: var(--tg-theme-button-color, $--tg-button-color);
    
    &--black {
      fill: var(--tg-theme-text-color, $--tg-text-color);
    }
    
    &--grey {
      fill: #7D7D85;
    }
  }
}
</style>
