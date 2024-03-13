<template>
  <AppLayout>
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
    //
  }),

  beforeMount() {
    this.tgStore.initTelegramWebApp(window.Telegram.WebApp);
  },

  mounted() {},
  
  watch: {
    'route.path': {
      handler(newValue) {
        console.log(newValue)
        if (this.twa) {
          if (newValue !== '/') {
            this.twa.BackButton.show()
          } else {
            this.twa.BackButton.hide()
          }
        }
      }, immediate: true
    }
  }
});
</script>

<style lang="scss"></style>
