<template>
  <svg
    :style="{ height: h + 'px', width: w + 'px' }"
    :class="['icon', 'icon--' + color]"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.7271 0H2.27235C0.533954 0 -0.567884 1.87516 0.306703 3.39106L6.14183 13.5047C6.52261 14.1651 7.47685 14.1651 7.85763 13.5047L13.6939 3.39106C14.5673 1.87758 13.4655 0 11.7283 0H11.7271ZM6.13709 10.4718L4.86629 8.01239L1.8 2.52841C1.59772 2.17741 1.84756 1.72762 2.27116 1.72762H6.1359V10.473L6.13709 10.4718ZM12.1971 2.52723L9.13198 8.01358L7.86119 10.4718V1.72643H11.7259C12.1495 1.72643 12.3994 2.17623 12.1971 2.52723Z"
      fill="url(#paint0_linear_4_630)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_4_630"
        x1="7"
        y1="0"
        x2="7"
        y2="14"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#4EB1FF"/>
        <stop offset="1" stop-color="#26A0FF"/>
      </linearGradient>
    </defs>
  </svg>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'IconToken',
  
  props: ['h', 'w', 'color']
});
</script>

<style lang="scss" scoped>

.icon {
  &--grey {
    path {
      fill: theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
    }
  }
  
  &--white {
    path {
      fill: theme-var-tg(--tg-theme-button-text-color, $--tg-button-text-color);
    }
  }
}

</style>
