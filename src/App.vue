<template>
  <AppLayout>
    <h1>{{ tgStore.theme }}</h1>
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
    twa() {
      return this.tgStore.WebApp
    }
  },

  beforeMount() {
    this.tgStore.initTelegramWebApp(window.Telegram.WebApp)
  },

  mounted() {
    let self = this
    this.twa.onEvent('themeChanged', function (this: any) {
      console.log(this)
      console.log(self.tgStore.theme);
      self.tgStore.theme = this.colorScheme
      console.log(self.tgStore.theme);
    })
  },
  
  watch: {
    'route.path': {
      handler(newPath) {
        if (this.twa) {
          if (newPath !== '/') {
            let arrPaths = newPath.split('/').slice(0, -1).join('/')
            this.twa.BackButton.show().onClick(() => {
              this.router.push(arrPaths)
            })
          } else {
            this.twa.BackButton.hide()
          }
        }
      }, immediate: true
    }
  }
});
</script>

<style lang="scss">



</style>
