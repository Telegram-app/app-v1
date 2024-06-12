<template>
  <div class="not-found__layout">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NotFoundLayout",
});
</script>

<style scoped lang="scss">
.not-found__layout {
  padding: 40px;
}
</style>
