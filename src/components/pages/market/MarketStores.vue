<template>
  <div class="market__stores self-card">
    <div class="market__stores__store unselectable" v-for="store in stores.slice(0, 24)" :key="store.id" @click="pushToStore(store.id, $event)" @touchstart="startAnimation" @touchend="pushToStore(store.id)" @touchmove="drag = true">
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
  
  unmounted() {
    clearInterval(this.touchInterval)
  },
  
  mounted() {
  
  },
  
  data: () => ({
    drag: false,
    touchTime: 0,
    touchInterval: 0
  }),
  
  methods: {
    startAnimation(e: any) {
      this.touchTime = 0
      this.touchInterval = setInterval(() => {
        this.touchTime = this.touchTime + 10
        if (this.touchTime > 300) {
          clearInterval(this.touchInterval)
        }
      }, 10, true)
      this.drag = false
      let animatedBox = findElement('market__stores__store', e.target)
      androidClickEffect(e, animatedBox, 200)
      androidEndClickEffect()
    },
    pushToStore(id: string | number, e?: Event) {
      if (e?.type === 'click') {
        this.router.push({ name: 'storeProducts',  params: { id }})
        return
      }
      if (!this.drag && this.touchTime <= 300) {
        setTimeout(() => {
          this.router.push({ name: 'storeProducts',  params: { id }})
        }, 500, true)
      }
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
  margin-top: 10px;
  padding: 15px 13px;
  
  &__store {
    position: relative;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-basis: 23%;
    padding: 5px 0;
    border-radius: 4px;
    overflow: hidden;
    
    cursor: pointer;
    
    transition: 0.3s all;
    
    &:hover {
      background-color: rgba(0,0,0,0.1);
    }
    
    &__image {
      z-index: 2;
      
      height: 57px;
      width: 57px;
      border-radius: 100%;
      overflow: hidden;
      
      transition: 0.3s all;
    }
    
    &__name {
      margin-top: 5px;
      text-align: center;
      
      font-size: 12px;
      line-height: 1;
    }
  }
}

@media (hover: none) {
  .market__stores__store:hover {
    background-color: inherit;
  }
}

</style>