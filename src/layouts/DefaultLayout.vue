<template>
  <div class="default__layout">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "DefaultLayout",
});
</script>

<style scoped lang="scss">
.default__layout {
  min-height: calc(100vh - 66px);
  height: 100%;
  padding: 0 15px;

  background: var(--tg-theme-secondary-bg-color, $tg-secondary-bg-color);
}
</style>
