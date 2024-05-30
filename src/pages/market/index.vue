<template>
  <transition name="fade">
    <div class="main-loading" v-if="tgStore.loading">
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
        <span class="market__stores__store__name">{{ store.name }}</span>
      </div>
      
      <div class="divider"></div>
      
      <div class="market__stores__store" v-for="store in stores.slice(4, 24)" :key="store.id" @click="router.push({ name: 'store', params: { id: store.id } })">
        <img class="market__stores__store__image" :src="'./images/market/stores/' + store.icon" alt="store-image">
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
      <div v-for="( position, posIdx ) in footerItems">
        <ul class="market__footer__items">
          <li class="market__footer__item" v-for="(item, itemIdx) in position">
            <a class="market__footer__item__title" @click="expandItem($event, posIdx, itemIdx)">{{ item.title }} <span class="market__footer__item__icon" :class="{ 'market__footer__item__icon--expanded': item.expanded }"><IconChevronRight h="10" w="10" color="grey"/></span></a>
            <ul class="market__footer__links" :class="{ 'market__footer__links--expanded': item.expanded }" v-if="item.links[0]">
              <RouterLink
                v-for="(link, linkIdx) in item.links"
                :key="link.title"
                custom
                v-slot="{ navigate }"
                :to="{name: link.to}">
                <li class="market__footer__link" @click="navigate">
                  <a class="market__footer__link__title">{{ link.title }}</a>
                </li>
              </RouterLink>
            </ul>
          </li>
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
import {useTelegramStore} from '@/stores/telegram.ts';
import {Store} from '@/models/store.model.ts';

import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import {Swiper, SwiperSlide} from 'swiper/vue';
import {Autoplay, FreeMode} from 'swiper/modules';
import 'swiper/css';

interface FooterItem {
  title: string;
  links: { title: string; to: any; }[];
  expanded: boolean;
}

export default defineComponent({
  name: 'MarketPage',
  
  components: {Swiper, SwiperSlide},
  
  props: [],
  
  setup() {
    const router = useRouter();
    const tgStore = useTelegramStore()
    const marketStore = useMarketStore();
    
    return {router, tgStore, marketStore, modules: [Autoplay, FreeMode]};
  },
  
  created() {
    this.marketStore.createFakeStores();
  },
  
  mounted() {
    if (this.tgStore.loading) {
      let scrollbar = document.querySelector<HTMLElement>('html')!
      disableBodyScroll(scrollbar)
      
      this.init()
    } else {
      this.initMainButton()
    }
    
    
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
    footerItems: [
      [
        {
          title: 'Title',
          links: [
            {title: 'Profile', to: 'account'},
            {title: 'Contact us', to: 'market'},
            {title: 'eBay Returns', to: 'market'},
            {title: 'eBay Money Back', to: 'market'},
          ],
          expanded: false
        },
        {
          title: 'Title 1',
          links: [
            {title: 'Profile', to: 'account'},
            {title: 'Contact us', to: 'market'},
            {title: 'eBay Returns', to: 'market'},
            {title: 'eBay Money Back', to: 'market'},
          ],
          expanded: false
        },
        {
          title: 'Title 2',
          links: [
            {title: 'Announcements', to: 'market'},
            {title: 'eBay Community', to: 'market'},
            {title: 'eBay for Business', to: 'market'},
          ],
          expanded: false
        },
      ],
      [
        {
          title: 'Title 3',
          links: [
            {title: 'Seller center', to: 'market'},
            {title: 'Contact us', to: 'market'},
            {title: 'eBay Returns', to: 'market'},
            {title: 'eBay Money Back', to: 'market'},
          ],
          expanded: false
        },
        {
          title: 'Title 4',
          links: [
            {title: 'Announcements', to: 'market'},
            {title: 'eBay Community', to: 'market'},
            {title: 'eBay for Business', to: 'market'},
          ],
          expanded: false
        }
      ]
    ] as FooterItem[][],
    // isRefer: false,
    // scrollMax: 0,
    // pStart: { x: 0, y: 0 },
    // pCurrent: { x: 0, y: 0 },
  }),
  
  methods: {
    init() {
      let scrollbar = document.querySelector<HTMLElement>('html')!
      
      setTimeout(() => {
        this.tgStore.loading = false
        enableBodyScroll(scrollbar)
        
        this.initMainButton()
      }, 3000)
    },
    
    initMainButton() {
      if (window.Telegram.WebApp.platform !== "unknown") {
        window.Telegram.WebApp.ready()
        
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
      }
    },
    
    expandItem(event: any, posIdx: number, itemIdx: number) {
      this.footerItems[posIdx][itemIdx].expanded = !this.footerItems[posIdx][itemIdx].expanded
      
      if (this.footerItems[posIdx][itemIdx].expanded) {
        let interval = setInterval(() => {
          event.target.scrollIntoView({ behavior: "smooth", block: "start" })
        }, 1)
        
        setTimeout(() => {
          clearInterval(interval)
        }, 150)
      }
    }
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
    column-gap: 15px;
    
    & > div {
      flex: 1;
    }
    
    &__items {
    
    }
    
    &__item {
      padding: 10px 0;
      border-bottom: 1px solid theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
      
      cursor: pointer;
      
      &__title {
        display: flex;
        justify-content: space-between;
        
        font-size: 13px;
        font-family: "SF Pro Text Medium", sans-serif;
        line-height: 1;
        
        color: theme-var-tg(--tg-theme-text-color, $--tg-text-color);
      }
      
      &__icon {
        svg {
          transform: rotate(90deg);
          
          transition: all 0.15s ease-out;
        }
        
        &--expanded {
          svg {
            transform: rotate(-90deg);
            
            transition: all 0.15s ease-in;
          }
        }
      }
    }
    
    &__links {
      position: relative;
      
      max-height: 0;
      overflow: hidden;
      
      transition: max-height 0.75s;
      
      &--expanded {
        max-height: 500px;
      }
    }
    
    &__link {
      display: flex;
      margin-top: 7px;
      height: auto;
      padding-left: 10px;
      
      &:first-child {
        margin-top: 10px;
      }
      &:last-child {
        margin-bottom: 10px;
      }
      
      &__title {
        font-size: 12px;
        line-height: 1;
        
        color: theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
        
        cursor: pointer;
      }
    }
  }
}

//.refer {
//  text-align: center;
//
//  &__container {
//    position: absolute;
//    bottom: -150px;
//    left: 0;
//    right: 0;
//
//    height: 100px;
//    width: 100%;
//
//    transition: 1s all;
//  }
//}

//@media (hover: hover) {
//  .market__stores__store:hover {
//    img {
//      -webkit-box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.75);
//      -moz-box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.75);
//      box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.75);
//    }
//  }
//}
//
//@media (hover: none) {
//  .market__stores__store:active {
//    img {
//      -webkit-box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.75);
//      -moz-box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.75);
//      box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.75);
//    }
//  }
//}

</style>