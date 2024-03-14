<template>
  <AppLayout>
    <span v-if="!BackButton" @click="router.back()">Назад</span>
    
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
    const tgStore = useTelegramStore();
    const route = useRoute()
    const router = useRouter()

    return { tgStore, router, route };
  },

  computed: {
    layout() {
      return (this.$route?.meta?.layout || "not-found") + "-layout";
    },
    BackButton() {
      return this.tgStore.button
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
  
  methods: {
    routerBack(path: string) {
      this.router.push(path)
    }
  },
  
  watch: {
    'route.path': {
      handler(newPath, oldPath) {
        if (this.BackButton) {
          if (newPath !== '/') {
            this.BackButton.show().onClick(() => {
              this.routerBack(oldPath)
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

<style lang="scss"></style>
