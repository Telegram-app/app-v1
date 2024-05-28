<template>
  <svg
    :style="{ height: h + 'px', width: w + 'px' }"
    :class="['icon', 'icon--' + color]"
    viewBox="0 0 1000 1000"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M395 156h460q21 0 36 15t15 36v23q0 21-15 36t-36 15H395q-21 0-36-15t-15-36v-23q0-21 15-36t36-15zm0 281h460q21 0 36
      15t15 37v22q0 22-15 36.5T855 562H395q-21 0-36-14.5T344 511v-22q0-22 15-36.5t36-14.5v-1zm0 282h460q21 0 36 15t15
      36v23q0 21-15 36t-36 15H395q-21 0-36-15t-15-36v-23q0-21 15-36t36-15zM146 125h83q21 0 36.5 15.5T281 178v82q0 22-15.5
      37.5T229 313h-83q-21-1-36.5-16T94 260v-82q0-22 15.5-37.5T146 125zm0 281h83q21 0 36.5 15.5T281 459v82q0 22-15.5 37.5T229
      594h-83q-21 0-36.5-15.5T94 541v-82q0-22 15.5-37.5T146 406zm0 281h83q21 0 36.5 15.5T281 740v82q0 22-15.5 37.5T229 875h-83q-21
      0-36.5-15.5T94 822v-82q0-22 15.5-37.5T146 688v-1z"
    />
  </svg>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'IconLoading',
  
  props: ['h', 'w', 'color']
});
</script>

<style lang="scss" scoped>
.icon {
  fill: #000000;
  
  &--light-grey {
    fill: theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
    opacity: 0.2;
    
    animation: flashing 1.5s infinite;
  }
}

@keyframes flashing {
  from {
    opacity: 0.2;
  }
  
  50% {
    opacity: 0.4;
  }
  
  to {
    opacity: 0.2;
  }
}
</style>
