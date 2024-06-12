<template>
  <div class="market__news">
    <swiper
      :slides-per-view="'auto'"
      :free-mode="true"
      :space-between="10"
      :speed="600"
      :modules="modules"
      class="market__news__swiper"
    >
      <swiper-slide class="market__news__swiper__slide" v-for="(card, i) in data.cards">
        <img :src="'./images/market/news/' + card.image" :alt="'news' + i">
        <span class="market__news__swiper__slide__text">{{ card.title }}</span>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts">

import {defineComponent, ref} from 'vue';
import {Swiper, SwiperSlide} from 'swiper/vue';
import {Autoplay, FreeMode} from 'swiper/modules';

interface Data {
  cards: {
    image: string,
    title: string
  }[];
}

const loadData = async () => {
  return new Promise<Data>((resolve) => {
    setTimeout(() => {
      resolve({
        cards: [
          {
            image: 'market-news-1.png',
            title: 'Web3'
          },
          {
            image: 'market-news-2.png',
            title: 'Web3'
          },
          {
            image: 'market-news-3.png',
            title: 'Web3'
          },
          {
            image: 'market-news-1.png',
            title: 'Web3'
          },
          {
            image: 'market-news-2.png',
            title: 'Web3'
          },
          {
            image: 'market-news-3.png',
            title: 'Web3'
          },
        ]
      });
    }, 2000);
  });
};
export default defineComponent({
  name: 'MarketNews',
  components: {Swiper, SwiperSlide},
  
  async setup() {
    const data = ref(await loadData());
    
    return {data, modules: [Autoplay, FreeMode]};
  }
});

</script>

<style scoped lang="scss">

.market__news {
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

</style>