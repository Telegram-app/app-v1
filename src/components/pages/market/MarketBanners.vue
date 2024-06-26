<template>
  <div class="market__banners">
    <swiper
      @swiper="onSwiper"
      @slideChange="onSlideChange"
      :slides-per-view="'auto'"
      :loop="true"
      :centered-slides="true"
      :long-swipes="true"
      :speed="800"
      :space-between="5"
      :modules="modules"
      class="market__banners__swiper"
      ref='mySwiper'
    >
      <swiper-slide class="market__banners__swiper__slide" v-for="(image, i) in data.images" v-slot="{ isActive }">
        <div class="market__banners__swiper__slide__image__wrapper" :class="{'skeleton-gradient-animation': !isActive}">
          <transition mode="out-in">
            <img v-if="isActive" :src="'./images/market/' + image" alt="banner-1">
          </transition>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts">

import { defineComponent, ref } from "vue";
import {Swiper, SwiperSlide, useSwiper} from 'swiper/vue';
import {Autoplay, FreeMode} from 'swiper/modules';

interface Data {
  images: string[]
}

const loadData = async () => {
  return new Promise<Data>((resolve) => {
    setTimeout(() => {
      resolve({
        images: [
          'market-banner-1.svg', 'market-banner-2.svg', 'market-banner-3.svg',
          'market-banner-1.svg', 'market-banner-2.svg', 'market-banner-3.svg',
          // 'market-banner-1.svg', 'market-banner-2.svg', 'market-banner-3.svg',
          // 'market-banner-1.svg', 'market-banner-2.svg', 'market-banner-3.svg',
          // 'market-banner-1.svg', 'market-banner-2.svg', 'market-banner-3.svg',
        ]
      })
    }, 2000)
  })
}

export default defineComponent({
  name: 'MarketBanners',
  
  components: {SwiperSlide, Swiper},
  
  async setup() {
    const data = ref(await loadData())
    
    return { data, modules: [Autoplay, FreeMode] };
  },
  
  data: () => ({
    activeIndex: 2
  }),
  
  methods: {
    onSwiper(swiper: any) {
      this.activeIndex = swiper.activeIndex
    },
    
    onSlideChange(swiper: any) {
      this.activeIndex = swiper.activeIndex
    }
  }
})

</script>

<style scoped lang="scss">

.market__banners {
  position: relative;
  
  height: 110px;
  width: calc(100% + 30px);
  margin: -5px -15px 0;
  
  &__swiper {
    height: 100%;
    width: 100%;
    
    &__slide {
      width: calc(100% - 30px);
      
      &__image__wrapper {
        height: 100%;
        border-radius: 10px;
      }
      
      img {
        height: 100%;
        width: 100%;
        border-radius: 10px;
        
        object-fit: cover;
      }
    }
  }
}

</style>