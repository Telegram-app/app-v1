<template>
  <div class="app__layout">
<!--    <AppNavbar />-->

    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppLayout",
});
</script>

<style lang="scss">
.app__layout {
  min-height: 100vh;
  height: 100%;
  padding: 0 15px 15px;
  
  font-family: Actor, sans-serif;
  
  background: var(--tg-theme-secondary-bg-color, $tg-secondary-bg-color);
}
</style>
