<template>
  <transition name="fade">
    <div class="main-loading" v-if="loading">
      <IconLoading h="50" w="50" color="light-grey"/>
    </div>
  </transition>
  
  <div class="market">
    <div class="market__banners">
      <swiper
        :slides-per-view="1.22"
        :free-mode="true"
        :loop="true"
        :centered-slides="true"
        :long-swipes="true"
        :space-between="18"
        :speed="800"
        :modules="modules"
        class="market__banners__swiper"
      >
        <template v-for="i of 5" :key="'group-images-' + i">
          <swiper-slide class="market__banners__swiper__slide">
            <img :src="'./images/market/market-banner-1.svg'" alt="banner-1">
          </swiper-slide>
          <swiper-slide class="market__banners__swiper__slide">
            <img :src="'./images/market/market-banner-2.svg'" alt="banner-2">
          </swiper-slide>
          <swiper-slide class="market__banners__swiper__slide">
            <img :src="'./images/market/market-banner-3.svg'" alt="banner-3">
          </swiper-slide>
        </template>
      </swiper>
    </div>
    
    <div class="market__stores self-card">
      <div class="market__stores__store" v-for="store in stores.slice(0, 4)" :key="store.id" @click="router.push({ name: 'store', params: { id: store.id } })">
        <img class="market__stores__store__image" :src="'./images/market/stores/' + store.icon" alt="store-image">
<!--        <div class="market__stores__store__image__shadow" :style="{ backgroundImage: `url('./images/market/stores/${store.icon}')` }"></div>-->
        <span class="market__stores__store__name">{{ store.name }}</span>
      </div>
      
      <div class="divider"></div>
      
      <div class="market__stores__store" v-for="store in stores.slice(4, 24)" :key="store.id" @click="router.push({ name: 'store', params: { id: store.id } })">
        <img class="market__stores__store__image" :src="'./images/market/stores/' + store.icon" alt="store-image">
<!--        <div class="market__stores__store__image__shadow" :style="{ backgroundImage: `url('./images/market/stores/${store.icon}')` }"></div>-->
        <span class="market__stores__store__name">{{ store.name }}</span>
      </div>
    </div>
    
    <div class="market__quote">
      <span class="caption">Marcus Aurelius</span>
      <div class="market__quote__text">What we do now echoes in eternity</div>
    </div>
    
    <div class="market__news">
      <swiper
        :slides-per-view="'auto'"
        :free-mode="true"
        :space-between="10"
        :speed="600"
        :modules="modules"
        class="market__news__swiper"
      >
        <swiper-slide class="market__news__swiper__slide">
          <img :src="'./images/market/news/market-news-1.png'" alt="news-1">
          <span class="market__news__swiper__slide__text">Web3</span>
        </swiper-slide>
        <swiper-slide class="market__news__swiper__slide">
          <img :src="'./images/market/news/market-news-2.png'" alt="news-2">
          <span class="market__news__swiper__slide__text">Web3</span>
        </swiper-slide>
        <swiper-slide class="market__news__swiper__slide">
          <img :src="'./images/market/news/market-news-3.png'" alt="news-3">
          <span class="market__news__swiper__slide__text">Web3</span>
        </swiper-slide>
        <swiper-slide class="market__news__swiper__slide">
          <img :src="'./images/market/news/market-news-1.png'" alt="news-1">
          <span class="market__news__swiper__slide__text">Web3</span>
        </swiper-slide>
        <swiper-slide class="market__news__swiper__slide">
          <img :src="'./images/market/news/market-news-2.png'" alt="news-2">
          <span class="market__news__swiper__slide__text">Web3</span>
        </swiper-slide>
        <swiper-slide class="market__news__swiper__slide">
          <img :src="'./images/market/news/market-news-3.png'" alt="news-3">
          <span class="market__news__swiper__slide__text">Web3</span>
        </swiper-slide>
      </swiper>
    </div>
    
    <div class="divider"></div>
    
    <div class="market__footer">
      <div class="market__footer__block" v-for="(item, i) of footerLinks" :key="'footer-block-' + i">
        <h4 class="market__footer__title">{{ item.title }}</h4>
        <ul class="market__footer__links">
          <RouterLink
            v-for="link of item.links"
            :key="link.title"
            custom
            v-slot="{ navigate }"
            :to="{name: link.to}">
            <li class="market__footer__links__link" @click="navigate">
              {{ link.title }}
            </li>
          </RouterLink>
        </ul>
      </div>
    </div>
    
<!--    <div class="refer__container">-->
<!--      <transition name="fade">-->
<!--        <div class="refer">Next page</div>-->
<!--      </transition>-->
<!--    </div>-->
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
import {Store} from '@/models/store.model.ts';

import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import {Swiper, SwiperSlide} from 'swiper/vue';
import {Autoplay, FreeMode} from 'swiper/modules';
import 'swiper/css';

interface Links {
  title: string;
  links: { title: string, to: any }[];
}

export default defineComponent({
  name: 'MarketPage',
  
  components: {Swiper, SwiperSlide},
  
  props: [],
  
  setup() {
    const router = useRouter();
    const marketStore = useMarketStore();
    
    return {router, marketStore, modules: [Autoplay, FreeMode]};
  },
  mounted() {
    let scrollbar = document.querySelector<HTMLElement>('html')!
    disableBodyScroll(scrollbar)
    
    window.addEventListener('load', () => {
      let to = setTimeout(() => {
        this.loading = false
        enableBodyScroll(scrollbar)
        
        this.marketStore.createFakeStores();
        if (window.Telegram.WebApp) {
          window.Telegram.WebApp.MainButton.setParams({
            text: 'Новая страничка',
            is_active: true,
            is_visible: true
          }).onClick(() => {
            this.router.push({ name: 'newpage' })
          });
          // window.Telegram.WebApp.MainButton.setParams({
          //     is_active: false,
          //     is_visible: false
          //   })
          
          clearTimeout(to)
        }
      }, 3000)
    })
    
    // swipe to next page events
    
    // this.scrollMax = Math.max(
    //   document.body.scrollHeight,
    //   document.body.offsetHeight,
    //   document.body.clientHeight
    // )
    //
    // document.addEventListener("touchstart", e => this.swipeStart(e), false)
    // document.addEventListener("touchmove", e => this.swipe(e), false)
  },
  
  unmounted() {
    // swipe to next page events
    
    // document.removeEventListener("touchstart", e => this.swipeStart(e), false)
    // document.removeEventListener("touchmove", e => this.swipe(e), false)
  },
  
  computed: {
    stores() {
      return this.marketStore.getStores as Store[];
    }
  },
  
  data: () => ({
    loading: true,
    footerLinks: [
      {
        title: 'Help & contact',
        links: [
          {title: 'Profile', to: 'account'},
          {title: 'Contact us', to: 'market'},
          {title: 'eBay Returns', to: 'market'},
          {title: 'eBay Money Back Guarantee', to: 'market'},
        ]
      },
      {
        title: 'Community',
        links: [
          {title: 'Announcements', to: 'market'},
          {title: 'eBay Community', to: 'market'},
          {title: 'eBay for Business Podcast', to: 'market'},
        ]
      },
      {
        title: 'Help & contact',
        links: [
          {title: 'Seller center', to: 'market'},
          {title: 'Contact us', to: 'market'},
          {title: 'eBay Returns', to: 'market'},
          {title: 'eBay Money Back Guarantee', to: 'market'},
        ]
      },
      {
        title: 'Community',
        links: [
          {title: 'Announcements', to: 'market'},
          {title: 'eBay Community', to: 'market'},
          {title: 'eBay for Business Podcast', to: 'market'},
        ]
      }
    ] as Links[],
    // isRefer: false,
    // scrollMax: 0,
    // pStart: { x: 0, y: 0 },
    // pCurrent: { x: 0, y: 0 },
  }),
  
  methods: {
    // swipeStart(e: any) {
    //   if (typeof e["targetTouches"] !== "undefined") {
    //     let touch = e.targetTouches[0]
    //     this.pStart.x = touch.screenX
    //     this.pStart.y = touch.screenY
    //   } else {
    //     this.pStart.x = e.screenX
    //     this.pStart.y = e.screenY
    //   }
    // },
    // swipe(e: any) {
    //   // let flag = this.checkParent(firstCard, e.target)
    //   if (typeof e["changedTouches"] !== "undefined") {
    //     let touch = e.changedTouches[0]
    //     this.pCurrent.x = touch.screenX
    //     this.pCurrent.y = touch.screenY
    //   } else {
    //     this.pCurrent.x = e.screenX
    //     this.pCurrent.y = e.screenY
    //   }
    //
    //   let changeY = this.pStart.y > this.pCurrent.y ? Math.abs(this.pCurrent.y - this.pStart.y) : 0
    //   const footer = document.querySelector('.market__footer') as HTMLElement
    //
    //   if (window.scrollY >= this.scrollMax - innerHeight) {
    //     if (changeY > 100) {
    //       this.router.push({ name: 'newpage' })
    //     } else {
    //       this.isRefer = false
    //       footer.style.marginBottom = changeY + 'px'
    //     }
    //   }
    // },
  }
});

</script>

<style lang="scss">

.main-loading {
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
  &__banners {
    position: relative;
    height: 165px;
    width: calc(100% + 30px);
    margin: 0 -15px 0;
    
    &__swiper {
      height: 100%;
      width: 100%;
      
      &__slide {
        border-radius: 10px;
        
        img {
          border-radius: 10px;
          
          height: 100%;
          width: 100%;
          
          object-fit: cover;
        }
      }
    }
  }
  
  &__stores {
    position: relative;
    
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    row-gap: 23px;
    margin: 15px -5px 0 -5px;
    padding: 15px 13px;
    
    &__store {
      position: relative;
      
      display: flex;
      flex-direction: column;
      align-items: center;
      flex-basis: 23%;
      
      cursor: pointer;
      
      &__image {
        z-index: 2;
        
        height: 57px;
        width: 57px;
        border-radius: 100%;
        
        transition: 0.3s all;
        
        //&__shadow {
        //  position: absolute;
        //  z-index: 1;
        //  top: 50px;
        //  right: 12%;
        //  left: 13%;
        //
        //  height: 11%;
        //  border-radius: inherit;
        //
        //  background-size: auto;
        //  background-position: center bottom;
        //  background-repeat: no-repeat;
        //  -webkit-filter: blur(5px);
        //  filter: blur(5px);
        //}
      }
      
      &__name {
        margin-top: 5px;
        text-align: center;
        
        font-size: 12px;
        line-height: 1;
      }
    }
    
    .divider {
      position: absolute;
      top: 100px;
      
      margin: 0 !important;
      width: calc(100% - 26px);
    }
  }
  
  &__quote {
    margin-top: 15px;
    
    &__name {
      font-size: 12px;
      line-height: 1;
      
      color: theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
    }
    
    &__text {
      margin-top: 10px;
      padding: 10px 17px;
      border-radius: 10px;
      
      font-size: 12px;
      line-height: 1;
      
      color: theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
      background-color: theme-var($--card-bg-color);
    }
  }
  
  .divider {
    margin: 15px 0;
    
    background-color: #e2e2e2;
  }
  
  &__news {
    position: relative;
    height: 198px;
    width: calc(100% + 30px);
    margin: 15px -15px 0;
    padding: 0 15px;
    
    &__swiper {
      position: relative;
      height: 100%;
      width: 100%;
      overflow: visible;
      
      &__slide {
        width: 120px;
        border-radius: 10px;
        
        img {
          border-radius: 10px;
          
          height: 100%;
          
          object-fit: cover;
        }
        
        &__text {
          position: absolute;
          bottom: 6px;
          left: 6px;
          
          font-size: 12px;
          
          color: #ffffff;
        }
      }
    }
  }
  
  &__footer {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    row-gap: 15px;
    
    transition: 1s all;
    
    &__block {
      display: flex;
      flex-direction: column;
    }
    
    &__title {
      font-size: 16px;
      font-family: "SF Pro Text Semibold", sans-serif;
      line-height: 1;
    }
    
    &__links {
      margin-top: 5px;
      
      &__link {
        font-size: 12px;
        
        color: theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
        
        cursor: pointer;
      }
    }
  }
}

.refer {
  text-align: center;
  
  &__container {
    position: absolute;
    bottom: -150px;
    left: 0;
    right: 0;
    
    height: 100px;
    width: 100%;
    
    transition: 1s all;
  }
}

@media (hover: hover) {
  .market__stores__store:hover {
    img {
      -webkit-box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.75);
      -moz-box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.75);
      box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.75);
    }
  }
}

@media (hover: none) {
  .market__stores__store:active {
    img {
      -webkit-box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.75);
      -moz-box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.75);
      box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.75);
    }
  }
}

</style>