<template>
  <button class="button is-static" :class="'button--' + color">
    <slot></slot>
  </button>
</template>

<script lang="ts">

import { defineComponent } from "vue";

export default defineComponent({
  name: 'VButton',
  
  props: ['color'],
  
  data: () => ({
  
  }),
  
  computed: {
  
  },
  
})

</script>

<style scoped lang="scss">

.button {
  padding: 10px 0;
  width: 100%;
  border: none;
  border-radius: 10px;
  
  font-size: 15px;
  font-family: "SF Pro Text Regular", sans-serif;
  line-height: 1;
  
  color: theme-var-tg(--tg-theme-button-text-color, $--tg-button-text-color);
  
  cursor: pointer;
  pointer-events: auto;
  
  &--blue {
    background: linear-gradient(180deg, #50B2FF 0%, #26A0FF 100%);
  }
  
  &--green {
    background-color: theme-var($--success-color)
  }
  
  &--red {
    background-color: theme-var($--error-color)
  }
  
  &:focus {
    box-shadow: unset;
  }
  
  &--light-blue {
    color: #000000;
    background: linear-gradient(211deg, #EAF4FD 0%, #84C4E7 100%);
  }
}

</style>