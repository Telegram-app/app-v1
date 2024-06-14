<template>
  <div class="reviews">
    <div class="reviews__header">
      <IconStar h="12" w="12"/>
      <h1 class="reviews__header__product-name">{{ product.name }}</h1>
      <span class="reviews__header__product-id">{{ product.id }}</span>
    </div>
    
    <div class="reviews__image">
      <img src="/images/market/stores/products/reviews-image.png" alt="reviews-image"></img>
    </div>
    
    <div class="reviews__content">
      <div class="reviews__content__header">
        <span class="reviews__content__header__title">Reviews</span>
        <div class="reviews__content__header__filters">
          <span class="reviews__content__header__filters__item">Type <IconSorting w="7" h="4.67"/></span>
          <span class="reviews__content__header__filters__item">Type <IconSorting w="7" h="4.67"/></span>
        </div>
      </div>
      
      <div class="reviews__content__wrapper">
        <Review v-for="(review, index) in product.reviews" :key="'review-' + index" :review="review"/>
      </div>
    </div>
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
  
  &__header {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1;
    
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 11px 0;
    
    background: linear-gradient(270deg, rgba(105, 189, 254, 0.76) 0%, #4D98FD 100%);
    &__product {
      &-name {
        margin-left: 5px;
        
        font-size: 15px;
        font-family: "Helvetica Neue Cyr Bold", "Helvetica Neue", sans-serif;
        font-weight: 400;
        
        color: theme-var-tg(--tg-theme-button-text-color, $--tg-button-text-color);
      }
      
      &-id {
        position: absolute;
        right: 15px;
        
        font-size: 10px;
        
        color: theme-var-tg(--tg-theme-button-text-color, $--tg-button-text-color);
      }
    }
  }
  
  &__image {
    display: flex;
    justify-content: flex-end;
  }
  
  &__content {
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
}

</style>