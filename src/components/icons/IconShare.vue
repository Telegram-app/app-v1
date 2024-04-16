<template>
  <svg
    :style="{ height: h + 'px', width: w + 'px' }"
    :class="['icon', 'icon--' + color]"
    viewBox="0 0 10 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.926025 7.54939C0.926025 4.21111 4.1659 2.41358 5.54285 2.41358V0.40741L9.59269 4.41976L5.54285 8.11111V5.83951C3.72852 5.83951 1.709 6.97943 0.926025 7.54939Z"
    />
  </svg>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'IconShare',
  
  props: ['h', 'w', 'color']
});
</script>

<style lang="scss" scoped>

.icon {
  path {
    fill: theme-var-tg(--tg-theme-button-color, $--tg-button-color);
  }
}

</style>
