<template>
  <div class="app__layout" :class="[tgStore.theme === 'light' ? 'theme--light' : 'theme--dark']">
    <AppNavbar v-if="!twa && showAppBar" />

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
  
  data:() => ({
    showAppBar: false
  }),
  
  computed: {
    twa() {
      return window.Telegram.WebApp
    }
  }
});
</script>

<style lang="scss">
.app__layout {
  min-height: 100vh;
  height: 100%;
  padding: 15px;
  
  font-family: "SF Pro Text", sans-serif;
  
  background: var(--tg-theme-secondary-bg-color, $tg-secondary-bg-color);
}
</style>
