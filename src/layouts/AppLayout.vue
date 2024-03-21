<template>
  <div class="app__layout" :class="[tgStore.theme === 'light' ? 'light' : 'dark']">
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

</style>
