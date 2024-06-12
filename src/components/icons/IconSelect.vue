<template>
  <svg
    :style="{ height: h + 'px', width: w + 'px' }"
    :class="['icon', 'icon--' + color]"
    viewBox="0 0 12 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11 9L6 13.6667L1 9"
      stroke-width="1.5"
    />
    <path
      d="M1 6.66663L6 2L11 6.66663"
      stroke-width="1.5"
    />
  </svg>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'IconSelect',
  
  props: ['h', 'w', 'color']
});
</script>

<style lang="scss" scoped>
.icon {
  path {
    stroke: theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
  }
  
  &--black {
    path {
      stroke: theme-var-tg(--tg-theme-text-color, $--tg-text-color);
    }
  }
}
</style>
