<template>
  <svg
    :style="{ height: h + 'px', width: w + 'px' }"
    :class="['icon', 'icon--' + color, 'dark' ?? dark === 'dark']"
    viewBox="0 0 15 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2.5H12.2929C12.7456 2.5 13.1799 2.67986 13.5 3C13.8201 3.32014 14 3.75435 14 4.20711V10.8486C14 11.2733 13.8743 11.6886 13.6387 12.042C13.2397 12.6405 12.5679 13 11.8486 13H3.15139C2.43206 13 1.76033 12.6405 1.36132 12.042C1.12572 11.6886 1 11.2733 1 10.8486V4.20711C1 3.75435 1.17986 3.32014 1.5 3C1.82014 2.67986 2.25435 2.5 2.70711 2.5H3C3.64029 2.5 4.25435 2.24565 4.70711 1.79289L4.71851 1.78149C4.90495 1.59505 5.12023 1.43989 5.35606 1.32197L5.40738 1.29631C5.7971 1.10145 6.22685 1 6.66257 1H8.33743C8.77315 1 9.2029 1.10145 9.59262 1.29631L9.64394 1.32197C9.87977 1.43989 10.095 1.59505 10.2815 1.78149L10.2929 1.79289C10.7456 2.24565 11.3597 2.5 12 2.5Z"
    />
    <circle
      cx="7.5"
      cy="7.5"
      r="2.5"
    />
  </svg>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import { useTelegramStore } from '@/stores/telegram.ts';

export default defineComponent({
  name: 'IconCamera',
  
  props: ['h', 'w', 'color'],
  
  computed: {
    dark() {
      return useTelegramStore().theme
    }
  }
});
</script>

<style lang="scss" scoped>
.icon {
  path, circle {
    stroke: theme-var-tg(--tg-theme-text-color, $--tg-text-color);
  }
  
  &--white {
    path, circle {
      stroke: theme-var-tg(--tg-theme-button-text-color, $--tg-button-text-color);
    }
  }
  
  &--black {
    path, circle {
      stroke: theme-var-tg(--tg-theme-text-color, $--tg-text-color);
    }
  }
  
  &--transparent-grey {
    path, circle {
      stroke: rgba(120, 120, 120, 0.4);
    }
  }
}

.dark {
  &.icon {
    &--transparent-grey {
      path, circle {
        stroke: rgba(255, 255, 255, 0.4);
      }
    }
  }
}
</style>
