<template>
  <svg
    :style="{ height: h + 'px', width: w + 'px' }"
    :class="['icon', 'icon--' + color]"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path d="M1.35645 12.6664L12.6702 1.35273" stroke="black" stroke-width="2" stroke-linecap="round"/>
      <path d="M12.6665 12.6673L1.3528 1.35359" stroke="black" stroke-width="2" stroke-linecap="round"/>
    </g>
  </svg>

</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'IconClose',
  
  props: ['h', 'w', 'color']
});
</script>

<style lang="scss" scoped>
.icon {
  &--grey {
    path {
      stroke: theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
    }
  }
}
</style>
