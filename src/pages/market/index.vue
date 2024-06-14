<template>
<!--  <transition name="fade">-->
<!--    <div class="market-loading" v-if="tgStore.loading">-->
<!--      <IconLoading h="50" w="50" color="light-grey"/>-->
<!--    </div>-->
<!--  </transition>-->
  <div class="market">
    <Transition mode="out-in">
      <Suspense>
        <template #default>
          <market-banners/>
        </template>
        
        <template #fallback>
          <market-banners-skeleton/>
        </template>
      </Suspense>
    </Transition>
  
    <Transition mode="out-in">
      <Suspense>
        <template #default>
          <market-stores/>
        </template>
        
        <template #fallback>
          <market-stores-skeleton/>
        </template>
      </Suspense>
    </Transition>
    
    <Transition mode="out-in">
      <Suspense>
        <template #default>
          <market-quote/>
        </template>
        
        <template #fallback>
          <market-quote-skeleton/>
        </template>
      </Suspense>
    </Transition>
    
    <Transition mode="out-in">
      <Suspense>
        <template #default>
          <market-news/>
        </template>
        
        <template #fallback>
          <market-news-skeleton/>
        </template>
      </Suspense>
    </Transition>
    
    <div class="divider"></div>
    
    <Transition mode="out-in">
      <Suspense>
        <template #default>
          <market-footer/>
        </template>
        
        <template #fallback>
          <market-footer-skeleton/>
        </template>
      </Suspense>
    </Transition>
  </div>
</template>

<route lang="json">
{
"name": "market"
}
</route>

<script lang="ts">

import {defineComponent} from 'vue';
import {useRouter} from 'vue-router';

import {useMarketStore} from '@/stores/market.ts';
import {useTelegramStore} from '@/stores/telegram.ts';

import 'swiper/css'

// import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'

export default defineComponent({
  name: 'MarketPage',
  
  props: [],
  
  setup() {
    const router = useRouter()
    const tgStore = useTelegramStore()
    const marketStore = useMarketStore();
    
    return {router, tgStore, marketStore};
  },
  
  created() {
    this.marketStore.createFakeStores();
  },
  
  mounted() {
    if (this.tgStore.loading) {
      // let scrollbar = document.querySelector<HTMLElement>('html')!
      // disableBodyScroll(scrollbar)
      
      this.init()
    } else {
      this.initMainButton()
    }
  },
  
  methods: {
    init() {
      // let scrollbar = document.querySelector<HTMLElement>('html')!
      
      setTimeout(() => {
        this.tgStore.loading = false
        // enableBodyScroll(scrollbar)
        
        this.initMainButton()
      }, 3000)
    },
    
    initMainButton() {
      if (window.Telegram.WebApp.platform !== "unknown") {
        window.Telegram.WebApp.ready()
        
        window.Telegram.WebApp.MainButton.setParams({
          text: 'Каталог',
          is_active: true,
          is_visible: true
        }).onClick(() => {
          this.router.push({ name: 'catalogCategories' })
        });
      }
    },
  }
});

</script>

<style lang="scss">

.market-loading {
  position: absolute;
  right: -100px;
  left: -100px;
  z-index: 10000;
  
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  
  background-color: theme-var-tg(--tg-theme-secondary-bg-color, $--tg-secondary-bg-color);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.market {
  .divider {
    margin: 15px 0;
    
    background-color: #e2e2e2;
  }
}

</style>