<template>
  <div class="store">
    <div class="store__widget" :class="{ 'store__widget--show': storeWidgetShow }">
      <IconStar h="12" w="12"/>
      <span class="store__widget__text">First decentralized catalogue</span>
    </div>
    
    <div class="store__image">
      <img :src="'/images/market/' + store.image" alt="store-image">
    </div>
    
    <div class="store__title__wrapper self-card">
      <h1 class="store__title">{{ store.name }}</h1>
      <span class="store__id">{{ store.id }}</span>
    </div>
    
    <div class="store__description self-card">
      <p class="store__description__text">{{ store.description }}</p>
    </div>
    
    <div class="store__filters">
      <swiper
        :free-mode="true"
        :slides-per-view="3.44"
        :space-between="10"
        :speed="800"
        class="store__filters__swiper"
        @slider-move="filterStore.openMarketSelect(-1)"
      >
        <swiper-slide class="store__filters__swiper__slide">
          <!--          <VSelect :type="1" v-model="selects.category.active" :label="selects.category.label" :options="selects.category.options" :open="selects.category.open" @open="openMarketSelect(0)" @close="selects.category.open = false"></VSelect>-->
          <VSelect :type="1" v-model="filterStore.market.selects.category.active" :label="filterStore.market.selects.category.label" @click="router.push({name: 'categories', params: { id: store.id }})"></VSelect>
        </swiper-slide>
        
        <swiper-slide class="store__filters__swiper__slide">
          <VSelect :type="1" v-model="filterStore.market.selects.type.active" :label="filterStore.market.selects.type.label" :options="filterStore.market.selects.type.options" :open="filterStore.market.selects.type.open" @open="filterStore.openMarketSelect(0)" @close="filterStore.market.selects.type.open = false"></VSelect>
        </swiper-slide>
        
        <swiper-slide class="store__filters__swiper__slide">
          <VSelect :type="1" v-model="filterStore.market.selects.city.active" :label="filterStore.market.selects.city.label" :options="filterStore.market.selects.city.options" :open="filterStore.market.selects.city.open" @open="filterStore.openMarketSelect(1)" @close="filterStore.market.selects.city.open = false"></VSelect>
        </swiper-slide>
        
        <swiper-slide class="store__filters__swiper__slide">
          <VSelect :type="1" v-model="filterStore.market.selects.district.active" :label="filterStore.market.selects.district.label" :options="filterStore.market.selects.district.options" :open="filterStore.market.selects.district.open" @open="filterStore.openMarketSelect(2)"
                   @close="filterStore.market.selects.district.open = false"></VSelect>
        </swiper-slide>
        
        <swiper-slide class="store__filters__swiper__slide">
          <VInput v-model="filterStore.market.inputs.quantity.value" :label="filterStore.market.inputs.quantity.label" :placeholder="filterStore.market.inputs.quantity.placeholder"></VInput>
        </swiper-slide>
        
        <swiper-slide class="store__filters__swiper__slide">
          <VInput v-model="filterStore.market.inputs.priceFrom.value" :label="filterStore.market.inputs.priceFrom.label" :placeholder="filterStore.market.inputs.priceFrom.placeholder"></VInput>
        </swiper-slide>
        
        <swiper-slide class="store__filters__swiper__slide">
          <VInput v-model="filterStore.market.inputs.priceUpTo.value" :label="filterStore.market.inputs.priceUpTo.label" :placeholder="filterStore.market.inputs.priceUpTo.placeholder"></VInput>
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

import {defineComponent} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {useMarketStore} from '@/stores/market.ts';
import {useFilter} from '@/stores/filters.ts';

import {Swiper, SwiperSlide} from 'swiper/vue';
import 'swiper/css';

export default defineComponent({
  name: 'StorePage',
  components: {Swiper, SwiperSlide},
  
  props: [],
  
  setup() {
    const router = useRouter();
    const route = useRoute();
    const marketStore = useMarketStore();
    const filterStore = useFilter();
    
    return {router, route, marketStore, filterStore};
  },
  
  data: () => ({
    storeWidgetShow: false,
    pointToShowWidget: 1000
  }),
  
  computed: {
    store() {
      return this.marketStore.findById(Number(this.route.params.id) as number);
    },
  },
  
  methods: {
    showWidget() {
      this.storeWidgetShow = this.pointToShowWidget <= window.scrollY;
    },
    toProductPage(id: number | string) {
      this.router.push({name: 'product', params: {id: this.store.id, productId: id}});
    }
  },
  
  created() {
    window.addEventListener('scroll', this.showWidget);
  },
  
  mounted() {
    if (window.Telegram.WebApp) {
      window.Telegram.WebApp.MainButton.setParams({
        is_active: false,
        is_visible: false
      });
    }
    
    let hrefScroll = document.querySelector<HTMLElement>('.store__filters');
    if (hrefScroll) {
      this.pointToShowWidget = hrefScroll.offsetTop - 45;
    }
  },
  
  unmounted() {
    window.removeEventListener('scroll', this.showWidget);
  },
  
  watch: {
    'route.query': {
      handler: function (query) {
        if (query.category) {
          this.filterStore.market.selects.category.active = query.category;
        }
      },
      deep: true,
      immediate: true
    }
  }
  
});

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
    
    &__text {
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
    }
  }
  
  &__id {
    font-size: 10px;
  }
  
  &__description {
    margin-top: 15px;
    
    &__text {
      font-size: 12px;
      
      color: theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);;
    }
  }
  
  &__filters {
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