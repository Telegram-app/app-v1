<template>
  <div class="app__layout">
    <AppNavbar />

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
}
</style>
