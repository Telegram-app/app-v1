<template>
  <AppLayout>
    <transition>
      <RouterView/>
    </transition>
  </AppLayout>
</template>

<script lang="ts">

import {defineComponent} from 'vue';
import {useTelegramStore} from '@/stores/telegram';
import {useRoute, useRouter} from 'vue-router';

declare global {
  interface Window {
    Telegram: any;
  }
}

export default defineComponent({
  name: 'App',
  
  setup() {
    const route = useRoute();
    const router = useRouter();
    const tgStore = useTelegramStore();
    
    return {router, route, tgStore};
  },
  
  data: () => ({
    routerFlag: false
  }),
  
  mounted() {
    window.Telegram.WebApp.expand();
    
    let self = this;
    
    this.tgStore.theme = window.Telegram.WebApp.colorScheme;
    window.Telegram.WebApp.onEvent('themeChanged', function (this: any) {
      self.tgStore.theme = this.colorScheme;
    });
    
    window.Telegram.WebApp.SettingsButton.show().onClick(() => {
      this.router.push({ name: 'settings' })
    })
  },
  
  watch: {
    'route.path': {
      handler(newPath) {
        if (window.Telegram.WebApp) {
          if (newPath !== '/' && newPath !== '/market') {
            // let arrPaths = newPath.split('/').slice(0, -1).join('/')
            setTimeout(() => {
              window.Telegram.WebApp.BackButton.show().onClick(() => {
                if (this.routerFlag) return;
                
                this.router.back();
                
                this.routerFlag = true;
                setTimeout(() => {
                  this.routerFlag = false;
                }, 600);
              });
            });
          } else {
            window.Telegram.WebApp.BackButton.hide();
          }
        }
      }, immediate: true
    }
  }
});
</script>

<style lang="scss">

html {
  overflow-y: scroll;
}

html, body {
  height: 100%;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>
