<template>
  <AppLayout>
    <transition>
      <router-view v-slot="{ Component }">
        <component :is="Component"/>
      </router-view>
    </transition>
  </AppLayout>
</template>

<script lang="ts">

import {defineComponent} from 'vue';
import {useTelegramStore} from '@/stores/telegram';
import {useUserStore} from '@/stores/user.ts';
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
    const tg = window.Telegram.WebApp
    const tgStore = useTelegramStore();
    const userStore = useUserStore()
    
    return {router, route, tg, tgStore, userStore};
  },
  
  data: () => ({
    routerFlag: false
  }),
  
  mounted() {
    this.tg.ready()
    this.userStore.setUser(this.tg.initDataUnsafe.user);
    this.tg.expand();
    
    this.tgStore.theme = this.tg.colorScheme;
    if (this.tgStore.theme === 'light') {
      this.tg.setHeaderColor('#f1f1f1');
    }
    
    
    let self = this;
    this.tg.onEvent('themeChanged', function (this: any) {
      self.tgStore.theme = this.colorScheme;
      if (this.colorScheme === 'light') {
        self.tg.setHeaderColor('#f1f1f1');
      }
    });
    
    this.tg.SettingsButton.show().onClick(() => {
      this.router.push({name: 'settings'});
    });
  },
  
  watch: {
    'route.path': {
      handler(newPath) {
        if (this.tg) {
          if (newPath !== '/' && newPath !== '/market') {
            // let arrPaths = newPath.split('/').slice(0, -1).join('/')
            setTimeout(() => {
              this.tg.BackButton.show().onClick(() => {
                if (this.routerFlag) return;
                
                this.router.back();
                
                this.routerFlag = true;
                setTimeout(() => {
                  this.routerFlag = false;
                }, 600);
              });
            });
          } else {
            this.tg.BackButton.hide();
          }
          
          if (newPath !== '/catalog') {
            this.tg.setHeaderColor('#ffffff');
          } else {
            this.tg.setHeaderColor('#f1f1f1');
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
  
  background: theme-var-tg(--tg-theme-secondary-bg-color, $--tg-secondary-bg-color);
}

body {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
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
