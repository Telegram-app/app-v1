<template>
  <div class="market__widget">
    <span class="is-uppercase">Tickets available intil january</span>
    <IconArrowNext h="19" w="19" color="black"/>
  </div>
  
  <div class="market__banners">
    <swiper
      :initial-slide="1"
      :free-mode="true"
      :loop="true"
      :centered-slides="true"
      :space-between="18"
      :speed="800"
      :slides-per-view="1.22"
      :modules="modules"
      class="market__banners__swiper"
    >
      <swiper-slide class="market__banners__swiper__slide">
        <img :src="'./images/market/market-banner-1.svg'" alt="banner-1">
      </swiper-slide>
      <swiper-slide class="market__banners__swiper__slide">
        <img :src="'./images/market/market-banner-2.svg'" alt="banner-2">
      </swiper-slide>
      <swiper-slide class="market__banners__swiper__slide">
        <img :src="'./images/market/market-banner-3.svg'" alt="banner-3">
      </swiper-slide>
    </swiper>
  </div>
  
  <div class="market__stores card--bg">
    <div class="market__stores__store" v-for="store in stores.slice(0, 4)" :key="store.id" @click="toStorePage(store.id)">
      <img :src="'./images/market/stores/' + store.icon" alt="store-image">
      <div class="market__stores__store__image__shadow" :style="{ backgroundImage: `url('./images/market/stores/${store.icon}')` }"></div>
      <span class="market__stores__store__title">{{ store.name }}</span>
    </div>
    <div class="market__stores__line"></div>
    <div class="market__stores__store" v-for="store in stores.slice(4)" :key="store.id" @click="toStorePage(store.id)">
      <img :src="'./images/market/stores/' + store.icon" alt="store-image">
      <div class="market__stores__store__image__shadow" :style="{ backgroundImage: `url('./images/market/stores/${store.icon}')` }"></div>
      <span class="market__stores__store__title">{{ store.name }}</span>
    </div>
  </div>
  
  <div class="market__search">
    <span class="market__search__title is-uppercase">Marcus Aurelius</span>
    <input class="input reset" type="search" placeholder="What we do now echoes in eternity" v-model="search">
  </div>
  
  <div class="market__line"></div>
  
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
  
  <div class="market__line"></div>
  
  <div class="market__footer">
    <div class="market__footer__block" v-for="(item, i) of footer" :key="'footer-block-' + i">
      <h4>{{ item.title }}</h4>
      <ul class="market__footer__links">
        <RouterLink
          v-for="link of item.links"
          :key="link.title"
          custom
          to="#">
          <li class="market__footer__links__link">
            {{ link.title }}
          </li>
        </RouterLink>
      </ul>
    </div>
  </div>
</template>

<route lang="json">
  {
  "name": "market"
  }
</route>

<script lang="ts">

import { defineComponent } from "vue";
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css'

import { Autoplay, FreeMode } from "swiper/modules";
import {useMarketStore} from "@/stores/market.ts";
import {mapState} from 'pinia';
import {Username} from '@/models/username.model.ts';
import {Store} from '@/models/store.model.ts';
import {string} from 'zod';
import {useRouter} from 'vue-router';

export default defineComponent({
  name: 'Market',
  
  components: { Swiper, SwiperSlide },
  
  props: [],
  
  setup() {
    const router = useRouter()
    const marketStore = useMarketStore()
    
    return {
      router,
      marketStore,
      modules: [Autoplay, FreeMode]
    }
  },
  
  mounted() {
    this.marketStore.createFakeStores()
    
    // if (window.Telegram.WebApp) {
    //   window.Telegram.WebApp.MainButton.setParams({
    //     text: 'VIEW ORDER',
    //     is_active: true,
    //     is_visible: true
    //   }).onClick(() => {
    //     console.log(window.Telegram.WebApp.MainButton);
    //   })
    // }
  },
  
  computed: {
    ...mapState(useMarketStore, {
      stores: (state) => state.getStores as Store[],
    })
  },
  
  data: () => ({
    search: '',
    footer: [
      {
        title: 'Help & contact',
        links: [
          { title: 'Seller center', to: '#' },
          { title: 'Contact us', to: '#' },
          { title: 'eBay Returns', to: '#' },
          { title: 'eBay Money Back Guarantee', to: '#' },
        ]
      },
      {
        title: 'Community',
        links: [
          { title: 'Announcements', to: '#' },
          { title: 'eBay Community', to: '#' },
          { title: 'eBay for Business Podcast', to: '#' },
        ]
      },
      {
        title: 'Help & contact',
        links: [
          { title: 'Seller center', to: '#' },
          { title: 'Contact us', to: '#' },
          { title: 'eBay Returns', to: '#' },
          { title: 'eBay Money Back Guarantee', to: '#' },
        ]
      },
      {
        title: 'Community',
        links: [
          { title: 'Announcements', to: '#' },
          { title: 'eBay Community', to: '#' },
          { title: 'eBay for Business Podcast', to: '#' },
        ]
      }
    ]
  }),
  
  methods: {
    toStorePage(to: number | string) {
      this.router.push({ name: 'store', params: { id: to } })
    }
  }
})

</script>

<style lang="scss">

.market {
  &__widget {
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc(100% + 30px);
    margin: -15px -15px 0;
    padding: 12px 0;
    
    font-size: 15px;
    font-family: "SF Pro Text Semibold", sans-serif;
    
    background-image: url('/images/market/market-widget-bg.jpg');
    
    span {
      margin-right: 8px;
      
      line-height: 1;
      
      color: theme-var-tg(--tg-theme-text-color, $--tg-text-color);
    }
  }
  
  &__banners {
    position: relative;
    height: 165px;
    width: calc(100% + 30px);
    margin: 20px -15px 0;
    
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
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 15px;
    padding: 10px 13px;
    border-radius: 10px;
    row-gap: 15px;
    
    background-color: theme-var-tg(--tg-theme-bg-color, $--tg-bg-color);
    
    &__store {
      position: relative;
      
      display: flex;
      flex-direction: column;
      align-items: center;
      flex-basis: 70px;
      
      cursor: pointer;
      
      img {
        z-index: 2;
        
        height: 59px;
        width: 59px;
        border-radius: 10px;
        
        transition: 0.3s all;
      }
      
      &__image__shadow {
        position: absolute;
        z-index: 1;
        top: 50px;
        right: 12%;
        left: 13%;
        
        height: 11%;
        border-radius: inherit;
        
        background-size: auto;
        background-position: center bottom;
        background-repeat: no-repeat;
        -webkit-filter: blur(5px);
        filter: blur(5px);
      }
      
      &__title {
        margin-top: 7px;
        
        font-size: 12px;
        line-height: 1;
      }
      
      &:focus {
        img {
          -webkit-box-shadow: 0px 0px 5px 5px rgba(0,0,0,0.75);
          -moz-box-shadow: 0px 0px 5px 5px rgba(0,0,0,0.75);
          box-shadow: 0px 0px 5px 5px rgba(0,0,0,0.75);
        }
      }
    }
    
    &__line {
      height: 1px;
      width: 100%;
      
      background-color: theme-var($--divider-color);
    }
  }
  
  &__search {
    margin-top: 15px;
    
    &__title {
      font-size: 12px;
      line-height: 1;
      
      color: #7D7D85;
    }
    
    input {
      margin-top: 10px;
      padding-left: 17px;
    
    }
  }
  
  &__line {
    height: 1px;
    width: 100%;
    margin: 15px 0;
    
    background-color: #e2e2e2;
  }
  
  &__news {
    position: relative;
    height: 198px;
    width: calc(100% + 30px);
    margin: 0 -15px;
    padding: 0 15px;
    
    &__swiper {
      position: relative;
      height: 100%;
      width: 100%;
      overflow: visible;
      
      &__slide {
        border-radius: 10px;
        width: 120px;
        
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
    
    &__block {
      display: flex;
      flex-direction: column;
    }
    
    h4 {
      font-size: 16px;
      font-family: "SF Pro Text Semibold", sans-serif;
      line-height: 1;
    }
    
    &__links {
      margin-top: 5px;
      
      &__link {
        font-size: 12px;
        
        color: #787878;
      }
    }
  }
}

</style>