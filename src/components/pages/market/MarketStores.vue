<template>
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
</template>

<script lang="ts">

import {defineComponent, ref} from 'vue';
import {useMarketStore} from '@/stores/market.ts';
import {Store} from '@/models/store.model.ts';
import {useRouter} from 'vue-router';

const loadData = async () => {
  return new Promise<Store[]>((resolve) => {
    setTimeout(() => {
      let stores = useMarketStore().stores;
      resolve(stores);
    }, 2000);
  });
};

export default defineComponent({
  name: 'MarketStores',
  
  async setup() {
    const router = useRouter();
    const stores = ref(await loadData());
    
    return {router, stores};
  }
});

</script>

<style scoped lang="scss">

.market__stores {
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

</style>