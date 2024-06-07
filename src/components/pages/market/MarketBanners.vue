<template>
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
      <template v-for="n of 5" :key="'group-images-' + n">
        <swiper-slide class="market__banners__swiper__slide" v-for="(image, i) in data.images">
          <img :src="'./images/market/' + image" alt="banner-1">
        </swiper-slide>
      </template>
    </swiper>
  </div>
</template>

<script lang="ts">

import { defineComponent, ref } from "vue";
import {Swiper, SwiperSlide} from 'swiper/vue';
import {Autoplay, FreeMode} from 'swiper/modules';

interface Data {
  images: string[]
}

const loadData = async () => {
  return new Promise<Data>((resolve) => {
    setTimeout(() => {
      resolve({
        images: [
          'market-banner-1.svg', 'market-banner-2.svg', 'market-banner-3.svg'
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
  }
})

</script>

<style scoped lang="scss">

.market__banners {
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

</style>