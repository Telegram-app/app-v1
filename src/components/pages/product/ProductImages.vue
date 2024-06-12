<template>
  <div class="product__images">
    <swiper
      :modules="modules"
      :slides-per-view="1"
      class="product__images__swiper"
    >
      <swiper-slide class="product__images__swiper__slide" v-for="(i, index) in 3" :key="i" :virtualIndex="index">
        <div class="product__images__image">
          <img :src="'/images/market/stores/products/' + images[0]" alt="product-image">
          <div class="product__images__swiper__pagination">
            <span>{{ i + '/' + 3 }}</span>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts">

import { defineComponent, ref} from "vue";
import {Swiper, SwiperSlide} from 'swiper/vue';
import {Pagination} from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

const loadImages = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
};

export default defineComponent({
  name: 'ProductImages',
  components: {SwiperSlide, Swiper},
  
  props: {
    images: {
      type: Array,
      required: true
    }
  },
  
  async setup() {
    const load = ref(await loadImages())
    
    return { load, modules: [Pagination] }
  }
  
})

</script>

<style scoped lang="scss">

.product__images {
  &__swiper {
    margin: 0 -15px;
    padding: 0 15px;
    
    &__pagination {
      position: absolute;
      bottom: 10px;
      
      width: 290px;
      padding-left: 10px;
      
      span {
        padding: 4px 11px;
        border-radius: 10px;
        
        font-size: 10px;
        
        color: theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
        background-color: rgba(248, 233, 213, 0.7);
      }
    }
  }
  
  &__image {
    position: relative;
    
    display: flex;
    justify-content: center;
    height: 300px;
    width: 100%;
    
    img {
      height: 100%;
      width: 300px;
      border-radius: 10px;
    }
  }
}

</style>