<template>
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
        <VSelect :type="1" v-model="filterStore.market.selects.category.active" :label="filterStore.market.selects.category.label" @click="$emit('pushToCategories')"></VSelect>
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
</template>

<script lang="ts">

import {defineComponent, ref} from 'vue';
import {useRouter} from 'vue-router';

import {useFilter} from '@/stores/filters.ts';

import {Swiper, SwiperSlide} from 'swiper/vue';

import 'swiper/css';

const loadFilters = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 2000)
  })
}

export default defineComponent({
  name: 'StoreFilters',
  components: {SwiperSlide, Swiper},
  
  async setup() {
    const load = ref(await loadFilters())
    const router = useRouter();
    const filterStore = useFilter();
    
    return {load, router, filterStore};
  },
  
  methods: {
  }
  
})

</script>

<style scoped lang="scss">


.store__filters {
  width: calc(100% + 30px);
  margin: 15px -15px 0;
  padding: 0 15px;
  
  &__swiper {
    height: 40px;
    overflow: visible;
  }
}

</style>