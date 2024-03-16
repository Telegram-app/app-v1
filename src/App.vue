<template>
  <AppLayout>
    <RouterView />
  </AppLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useTelegramStore } from "@/stores/telegram";
import {useRoute, useRouter} from "vue-router";

declare global {
  interface Window {
    Telegram: any;
  }
}

export default defineComponent({
  name: "App",

  setup() {
    const tgStore = useTelegramStore()
    const route = useRoute()
    const router = useRouter()

    return { tgStore, router, route }
  },

  computed: {
    layout() {
      return (this.$route?.meta?.layout || "not-found") + "-layout"
    },
    BackButton() {
      return this.tgStore.elements.BackButton
    }
  },

  beforeMount() {
    this.tgStore.initTelegramWebApp(window.Telegram.WebApp)
  },

  mounted() {},
  
  watch: {
    'route.path': {
      handler(newPath) {
        if (this.BackButton) {
          if (newPath !== '/') {
            let arrPaths = newPath.split('/').slice(0, -1).join('/')
            this.BackButton.show().onClick(() => {
              this.router.push(arrPaths)
            })
          } else {
            this.BackButton.hide()
          }
        }
      }, immediate: true
    }
  }
});
</script>

<style lang="scss">



</style>
