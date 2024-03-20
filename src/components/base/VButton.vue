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
  line-height: 1;
  
  color: var(--tg-theme-button-text-color, $tg-button-text-color);
  background-color: var(--tg-theme-button-color, $tg-button-color);
  
  cursor: pointer;
  pointer-events: auto;
  
  &--blue {
    background: linear-gradient(180deg, #50B2FF 0%, #26A0FF 100%);
  }
  
  &--green {
    background-color: #30B645
  }
  
  &:focus {
    box-shadow: unset;
  }
}

</style>