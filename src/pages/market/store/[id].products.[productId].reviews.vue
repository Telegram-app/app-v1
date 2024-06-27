<template>
  <div class="reviews">
    <Transition mode="out-in">
      <Suspense>
        <template #default>
          <reviews-header :product="{ name: product.name, id: product.id }"/>
        </template>
        
        <template #fallback>
          <reviews-header-skeleton/>
        </template>
      </Suspense>
    </Transition>
    
    <Transition mode="out-in">
      <Suspense>
        <template #default>
          <reviews-image/>
        </template>
        
        <template #fallback>
          <reviews-image-skeleton/>
        </template>
      </Suspense>
    </Transition>
    
    <Transition mode="out-in">
      <Suspense>
        <template #default>
          <reviews-content :reviews="product.reviews"/>
        </template>
        
        <template #fallback>
          <reviews-content-skeleton/>
        </template>
      </Suspense>
    </Transition>
    
    
    
    
  </div>
</template>

<route lang="json">
{
  "name": "reviews"
}
</route>

<script lang="ts">

import { defineComponent } from "vue";
import {useRoute} from 'vue-router';
import {useMarketStore} from '@/stores/market.ts';

export default defineComponent({
  name: 'ProductReviewsPage',
  
  props: [],
  
  setup() {
    const route = useRoute()
    const marketStore = useMarketStore()
    
    return { route, marketStore }
  },
  
  data: () => ({
  
  }),
  
  computed: {
    product() {
      return this.marketStore.findProductById(Number(this.route.params.id) as number, Number(this.route.params.productId) as number)
    }
  },
  
  mounted() {
    if (window.Telegram.WebApp) {
      window.Telegram.WebApp.MainButton.setParams({
        is_active: false,
        is_visible: false
      })
    }
  },
  
})

</script>

<style scoped lang="scss">

.reviews {
  margin-top: 55px;
}

</style>