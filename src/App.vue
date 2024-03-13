<template>
  <AppLayout>
    <span>{{ path }}</span>
    <span>{{ button }}</span>
    <span>{{ telegram }}</span>
    
    <RouterView />
  </AppLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useTelegramStore } from "@/stores/telegram";
import {useRoute} from "vue-router";

declare global {
  interface Window {
    Telegram: any;
  }
}

export default defineComponent({
  name: "App",

  setup() {
    const tgStore = useTelegramStore();
    const route = useRoute()

    return { tgStore, route };
  },

  computed: {
    layout() {
      return (this.$route?.meta?.layout || "not-found") + "-layout";
    },
    twa() {
      return this.tgStore.getWebApp
    }
  },

  data: () => ({
    button: '',
    path: '',
    telegram: ''
  }),

  beforeMount() {
    this.tgStore.initTelegramWebApp(window.Telegram.WebApp);
  },

  mounted() {},
  
  watch: {
    'route.path': {
      handler(newValue) {
        this.path = newValue
        this.telegram = this.twa
        if (this.twa) {
          if (newValue !== '/') {
            this.twa.BackButton.show()
            this.button = this.twa.BackButton.show()
          } else {
            this.twa.BackButton.hide()
            this.button = this.twa.BackButton.hide()
          }
        }
      }, immediate: true
    }
  }
});
</script>

<style lang="scss"></style>
