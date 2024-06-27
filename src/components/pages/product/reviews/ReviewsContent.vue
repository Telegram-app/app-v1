<template>
  <div class="reviews__content">
    <div class="reviews__content__header">
      <span class="reviews__content__header__title">Reviews</span>
      <div class="reviews__content__header__filters">
        <span class="reviews__content__header__filters__item">Type <IconSorting w="7" h="4.67"/></span>
        <span class="reviews__content__header__filters__item">Type <IconSorting w="7" h="4.67"/></span>
      </div>
    </div>
    
    <div class="reviews__content__wrapper">
      <Review v-for="(review, index) in reviews" :key="'review-' + index" :review="review"/>
    </div>
  </div>
</template>

<script lang="ts">

import {defineComponent, PropType, ref} from 'vue';
import {ProductReview} from '@/models/store.model.ts';

const loadData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 2000)
  })
}

export default defineComponent({
  name: 'ReviewsContent',
  
  async setup() {
    const loadDataImage = ref(await loadData())
    
    return { loadDataImage }
  },
  
  props: {
    reviews: {
      type: Array as PropType<ProductReview[]>
    }
  },
})

</script>

<style scoped lang="scss">

.reviews__content {
  margin-top: 15px;
  padding: 15px 17px;
  border-radius: 10px;
  
  background-color: theme-var-tg(--tg-theme-bg-color, $--tg-bg-color);
  
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    &__title {
      font-size: 12px;
      line-height: 1;
      text-transform: uppercase;
      
      color: theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
    }
    
    &__filters {
      display: flex;
      column-gap: 15px;
      
      &__item {
        display: flex;
        align-items: center;
        
        font-size: 12px;
        line-height: 1;
      }
    }
  }
  
  &__wrapper {
    display: flex;
    flex-direction: column;
    row-gap: 15px;
    margin-top: 15px;
  }
}

</style>