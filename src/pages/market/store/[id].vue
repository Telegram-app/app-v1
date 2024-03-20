<template>
  <div class="store">
    <div class="store__widget" :class="{ 'store__widget--show': storeWidgetShow }">
      <IconStar h="12" w="12"/>
      <span>First decentralized catalogue</span>
    </div>
    
    <div class="store__image">
      <img :src="'../../images/market/' + store.image" alt="store-image">
    </div>
    
    <div class="store__title__wrapper">
      <h1 class="store__title">{{ store.name }}</h1>
      <span class="store__id">{{ store.id }}</span>
    </div>
    
    <div class="store__description">
      <p>{{ store.description }}</p>
    </div>
    
    <div class="store__filter">
      <swiper
        :slides-per-view="3.44"
        :space-between="10"
        class="store__filter__swiper"
      >
        <swiper-slide class="store__filter__swiper__slide">
          <VSelect v-model="selects.category.active" :label="selects.category.label" :options="selects.category.options"></VSelect>
        </swiper-slide>
        
        <swiper-slide class="store__filter__swiper__slide">
          <VSelect v-model="selects.type.active" :label="selects.type.label" :options="selects.type.options"></VSelect>
        </swiper-slide>
        
        <swiper-slide class="store__filter__swiper__slide">
          <VSelect v-model="selects.city.active" :label="selects.city.label" :options="selects.city.options"></VSelect>
        </swiper-slide>
        
        <swiper-slide class="store__filter__swiper__slide">
          <VSelect v-model="selects.district.active" :label="selects.district.label" :options="selects.district.options"></VSelect>
        </swiper-slide>
        
        <swiper-slide class="store__filter__swiper__slide">
          <VInput v-model="inputs.quantity.value" :label="inputs.quantity.label" :placeholder="inputs.quantity.placeholder"></VInput>
        </swiper-slide>
        
        <swiper-slide class="store__filter__swiper__slide">
          <VInput v-model="inputs.priceFrom.value" :label="inputs.priceFrom.label" :placeholder="inputs.priceFrom.placeholder"></VInput>
        </swiper-slide>
        
        <swiper-slide class="store__filter__swiper__slide">
          <VInput v-model="inputs.priceUpTo.value" :label="inputs.priceUpTo.label" :placeholder="inputs.priceUpTo.placeholder"></VInput>
        </swiper-slide>
      </swiper>
    </div>
    
    <div class="store__products">
      <ProductCard v-for="product in store.products" :key="product.id" :product="product" :storeName="store.name" @toProductPage="toProductPage"></ProductCard>
    </div>
  </div>
</template>

<route lang="json">
{
  "name": "store"
}
</route>

<script lang="ts">

import { defineComponent } from "vue";
import { useMarketStore } from '@/stores/market.ts';
import { useRoute, useRouter } from 'vue-router';
import {Swiper, SwiperSlide} from 'swiper/vue';
import 'swiper/css'

export default defineComponent({
  name: 'Store',
  components: {Swiper, SwiperSlide},
  
  props: [],
  
  setup() {
    const router = useRouter()
    const route = useRoute()
    const marketStore = useMarketStore()
    
    return { router, route, marketStore }
  },
  
  data: () => ({
    storeWidgetShow: false,
    pointToShowWidget: 1000,
    selects: {
      category: {
        active: 'All',
        label: 'Category',
        options: ['All', 'Category 1', 'Category 2', 'Category 3']
      },
      type: {
        active: 'All',
        label: 'Type',
        options: ['All', 'Type 1', 'Type 2', 'Type 3']
      },
      city: {
        active: 'All',
        label: 'City',
        options: ['All', 'Austin', 'Newark', 'Ontario']
      },
      district: {
        active: 'All',
        label: 'District',
        options: ['All', 'District 1', 'District 2', 'District 3']
      }
    },
    inputs: {
      quantity: {
        value: '',
        label: 'Quantity from',
        placeholder: '10'
      },
      priceFrom: {
        value: '',
        label: 'Price from',
        placeholder: '10 TON'
      },
      priceUpTo: {
        value: '',
        label: 'Price up to',
        placeholder: '100 TON'
      },
    }
  }),
  
  computed: {
    store() {
      return this.marketStore.findById(Number(this.route.params.id) as number)
    },
  },
  
  methods: {
    showWidget() {
      this.storeWidgetShow = this.pointToShowWidget <= window.scrollY
    },
    toProductPage(id: number | string) {
      this.router.push({ name: 'product', params: { id: this.store.id, productId: id } })
    }
  },
  
  created () {
    window.addEventListener('scroll', this.showWidget);
  },
  
  mounted() {
    let hrefScroll = document.querySelector<HTMLElement>('.store__filter')
    if (hrefScroll) {
      this.pointToShowWidget = hrefScroll.offsetTop - 45
    }
  },
  
  unmounted () {
    window.removeEventListener('scroll', this.showWidget);
  },
  
})

</script>

<style scoped lang="scss">

.store {
  &__widget {
    position: fixed;
    top: -45px;
    right: 0;
    left: 0;
    z-index: 100;
    
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 11px 0;
    
    font-size: 15px;
    font-family: "SF Pro Text Semibold", sans-serif;
    
    background: linear-gradient(270deg, rgba(105, 189, 254, 0.70) 0%, #4D98FD 100%);
    
    transition: 0.6s all;
    
    span {
      margin-left: 5px;
    }
    
    &--show {
      top: 0;
    }
  }
  
  &__image {
    height: 100px;
    width: 100%;
    
    img {
      height: 100%;
      width: 100%;
      border-radius: 10px;
    }
  }
  
  &__title {
    font-size: 15px;
    font-family: "SF Pro Text Medium", sans-serif;
    
    &__wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 12px;
      padding: 10px 17px;
      border-radius: 10px;
      
      background-color: var(--tg-theme-bg-color, $tg-bg-color);
    }
  }
  
  &__id {
    font-size: 10px;
  }
  
  &__description {
    margin-top: 15px;
    padding: 10px 17px;
    border-radius: 10px;
    
    background-color: var(--tg-theme-bg-color, $tg-bg-color);
    
    p {
      font-size: 12px;
      
      color: #787878;
    }
  }
  
  &__filter {
    width: calc(100% + 30px);
    margin: 15px -15px 0;
    padding: 0 15px;
    
    &__swiper {
      height: 40px;
      overflow: visible;
    }
  }
  
  &__products {
    margin-top: 15px;
  }
}

</style>