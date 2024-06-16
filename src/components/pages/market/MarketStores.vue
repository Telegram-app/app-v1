<template>
  <div class="market__stores self-card">
    <div class="market__stores__store" v-for="store in stores.slice(0, 4)" :key="store.id" @click="pushToStore(store.id, $event)" @touchstart="startAnimation" @touchend="pushToStore(store.id)" @touchmove="drag = true">
      <img class="market__stores__store__image" :src="'./images/market/stores/' + store.icon" alt="store-image">
      <span class="market__stores__store__name">{{ store.name }}</span>
    </div>
    
    <div class="divider"></div>
    
    <div class="market__stores__store" v-for="store in stores.slice(4, 24)" :key="store.id" @click="pushToStore(store.id, $event)" @touchstart="startAnimation" @touchend="pushToStore(store.id)" @touchmove="drag = true">
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
import {androidClickEffect, androidEndClickEffect, findElement} from '@/utils/androidClickEffect.ts';

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
  },
  
  data: () => ({
    drag: false,
    longTouch: false
  }),
  
  methods: {
    startAnimation(e: any) {
      setTimeout(() => {
        this.longTouch = true
      }, 200)
      this.drag = false
      let animatedBox = findElement('market__stores__store', e.target)
      androidClickEffect(e, animatedBox, 200)
    },
    pushToStore(id: string | number, e?: Event) {
      if (e?.type === 'click') {
        this.router.push({ name: 'storeProducts',  params: { id }})
        return
      }
      androidEndClickEffect()
      if (!this.drag && !this.longTouch) {
        setTimeout(() => {
          this.router.push({ name: 'storeProducts',  params: { id }})
        }, 450)
      }
      
      this.longTouch = false
    }
  }
});

</script>

<style scoped lang="scss">

.market__stores {
  position: relative;
  
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: 8px;
  margin: 15px -5px 0 -5px;
  padding: 15px 13px;
  
  &__store {
    position: relative;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-basis: 23%;
    padding: 5px 0;
    border-radius: 4px;
    
    cursor: pointer;
    
    transition: 0.3s all;
    
    overflow: hidden;
    
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
    top: 102.5px;
    
    margin: 0 !important;
    width: calc(100% - 26px);
  }
}

</style>