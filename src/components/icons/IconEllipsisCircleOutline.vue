<template>
  <svg
    :style="{ height: h + 'px', width: w + 'px' }"
    :class="['icon', 'icon--' + color]"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M3.79995 14C3.79995 8.36671 8.36665 3.80001 14 3.80001C19.6333 3.80001 24.2 8.36671 24.2 14C24.2 19.6333 19.6333 24.2 14 24.2C8.36665 24.2 3.79995 19.6333 3.79995 14ZM14 2.20001C7.48299 2.20001 2.19995 7.48305 2.19995 14C2.19995 20.517 7.48299 25.8 14 25.8C20.5169 25.8 25.7999 20.517 25.7999 14C25.7999 7.48305 20.5169 2.20001 14 2.20001ZM14 15.25C14.6904 15.25 15.25 14.6904 15.25 14C15.25 13.3097 14.6904 12.75 14 12.75C13.3096 12.75 12.75 13.3097 12.75 14C12.75 14.6904 13.3096 15.25 14 15.25ZM10.25 14C10.25 14.6904 9.69036 15.25 9 15.25C8.30964 15.25 7.75 14.6904 7.75 14C7.75 13.3097 8.30964 12.75 9 12.75C9.69036 12.75 10.25 13.3097 10.25 14ZM19 15.25C19.6904 15.25 20.25 14.6904 20.25 14C20.25 13.3097 19.6904 12.75 19 12.75C18.3096 12.75 17.75 13.3097 17.75 14C17.75 14.6904 18.3096 15.25 19 15.25Z"
    />
  </svg>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'IconEllipsisCircleOutline',
  
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
