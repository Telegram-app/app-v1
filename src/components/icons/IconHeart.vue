<template>
  <svg
    :style="{ height: h + 'px', width: w + 'px' }"
    :class="['icon', 'icon--' + color]"
    viewBox="0 0 11 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.083252 3.94923C0.083252 6.5833 2.26044 7.98698 3.85419 9.24337C4.41658 9.68673 4.95825 10.1041 5.49992 10.1041C6.04158 10.1041 6.58325 9.68673 7.14566 9.24337C8.73941 7.98698 10.9166 6.5833 10.9166 3.94923C10.9166 1.31514 7.93731 -0.552904 5.49992 1.97948C3.06251 -0.552904 0.083252 1.31514 0.083252 3.94923Z"
    />
  </svg>

</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'IconHeart',
  
  props: ['h', 'w', 'color']
});
</script>

<style lang="scss" scoped>

.icon {
  path {
    fill: theme-var-tg(--tg-theme-text-color, $--tg-text-color);
  }
  
  &--red {
    path {
      fill: theme-var($--error-color);
    }
  }
}

</style>
