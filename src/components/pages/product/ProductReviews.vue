<template>
  <div class="product__reviews">
    <div class="product__reviews__header">
      <span class="caption">Reviews</span>
      <div class="product__reviews__to-reviews" @click="$emit('pushToReviews')">
        <span>Show All</span>
        <IconChevronRight h="10" w="6"/>
      </div>
    </div>
    
    <div class="product__reviews__wrapper">
      <Review v-for="(review, index) in product.reviews?.slice(0, 2)" :key="'review-' + index" :review="review"/>
    </div>
  </div>
</template>

<script lang="ts">

import {defineComponent, PropType, ref} from 'vue';
import {Product} from '@/models/store.model.ts';
import {Pagination} from 'swiper/modules';

const loadProductReviews = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
};

export default defineComponent({
  name: 'ProductReviews',
  
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true
    }
  },
  
  async setup() {
    const reviews = ref(await loadProductReviews());
    
    return {reviews, modules: [Pagination]};
  }
});

</script>

<style scoped lang="scss">

.product__reviews {
  margin-top: 15px;
  
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  
  &__to-reviews {
    display: flex;
    align-items: center;
    
    font-size: 12px;
    
    color: theme-var-tg(--tg-theme-button-color, $--tg-button-color);
    
    cursor: pointer;
    
    span {
      margin-right: 5px;
      
      white-space: nowrap;
    }
    
    svg {
      margin-bottom: 1px;
    }
  }
  
  &__wrapper {
    display: flex;
    flex-direction: column;
    row-gap: 15px;
  }
}

</style>