<template>
  <button class="not-web-app__button" @click="$router.push({ name: to })">
    <slot></slot>
  </button>
</template>

<script lang="ts">

import { defineComponent } from "vue";

export default defineComponent({
  name: 'NotWebAppButton',
  
  props: {
    to: String as any
  },
  
  data: () => ({
  
  }),
  
  computed: {
  
  },
  
})

</script>

<style scoped lang="scss">

.not-web-app__button {
  margin-top: 20px;
  width: 100%;
  padding: 10px 0;
  text-align: center;
  border: unset;
  border-radius: 10px;
  outline: unset;
  
  font-size: 15px;
  font-family: "Helvetica Neue Cyr Bold", "Helvetica Neue", sans-serif;
  font-weight: 400;
  
  color: theme-var-tg(--tg-theme-button-text-color, $--tg-button-text-color);
  background: linear-gradient(230deg, #C76EDC 0%, #7D81FF 100%);
  
  cursor: pointer;
  &:hover {
    box-shadow: unset;
  }
}

</style>