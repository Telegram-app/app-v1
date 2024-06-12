<template>
  <svg
    :style="{ height: h + 'px', width: w + 'px' }"
    :class="['icon', 'icon--' + color, {'dark': isDark}]"
    viewBox="0 0 45 70"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.5293 59.8083L27.3376 35L2.5293 10.1375L10.1668 2.5L42.6668 35L10.1668 67.5L2.5293 59.8083Z"
    />
  </svg>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import { useTelegramStore } from '@/stores/telegram.ts';

export default defineComponent({
  name: 'IconChevronRight',
  
  props: ['h', 'w', 'color'],
  
  computed: {
    isDark() {
      return useTelegramStore().theme === 'dark'
    }
  }
});
</script>

<style lang="scss" scoped>
.icon {
  path {
    fill: theme-var-tg(--tg-theme-button-color, $--tg-button-color);
  }
  
  &--black {
    path {
      fill: theme-var-tg(--tg-theme-text-color, $--tg-text-color);
    }
  }
  
  &--grey {
    path {
      fill: theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
    }
  }
  
  &--transparent-grey {
    path {
      fill: rgba(60, 60, 67, 0.30)
    }
  }
  
  &--blue {
    path {
      fill: theme-var-tg(--tg-theme-button-color, $--tg-button-color);
    }
  }
}

.dark {
  &.icon {
    &--transparent-grey {
      path, circle {
        fill: rgba(255, 255, 255, 0.3);
      }
    }
  }
}

</style>
