<template>
  <div class="app__layout">
    <AppNavbar v-if="!twa" />

    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useTelegramStore } from "@/stores/telegram.ts";

export default defineComponent({
  name: "AppLayout",
  
  setup() {
    const tgStore = useTelegramStore()
    
    return { tgStore }
  },
  
  computed: {
    twa() {
      return this.tgStore.getWebApp
    }
  }
});
</script>

<style lang="scss">
.app__layout {
  min-height: 100vh;
  height: 100%;
  padding: 0 15px 15px;
  
  font-family: "SF Pro Text", sans-serif;
  
  background: var(--tg-theme-secondary-bg-color, $tg-secondary-bg-color);
}
</style>
