<template>
  <div class="product__card card--bg">
    <div class="product__card__image">
      <img :src="'/images/market/stores/products/' + product.image" alt="image">
    </div>
    
    <div class="product__card__info">
      <span class="product__card__name">{{ product.name }} </span>
      <span class="product__card__price">/ {{ minPrice }}</span>
    </div>
    
    <div class="product__card__button">
      <VButton color="blue" @click="$emit('toProductPage', product.id)">Открыть</VButton>
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent } from "vue";

import type { PropType } from 'vue'
import { Product } from '@/models/store.model.ts';

export default defineComponent({
  name: 'StoreProductCard',
  
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true
    },
    storeName: String
  },
  
  data: () => ({
  
  }),
  
  computed: {
    minPrice() {
      let arrPrices: number[] = []
      
      this.product?.types.forEach(type => {
        type.items.forEach(item => {
          arrPrices.push(item.price)
        })
      })
      
      return `От ${Math.min(...arrPrices)}р`
    }
  },
  
  methods: {
    toProductPage(id: number | string) {
      this.$emit('toProductPage', id)
    }
  }
  
})

</script>

<style scoped lang="scss">

.product__card {
  display: flex;
  flex-direction: column;
  
  &__image {
    position: relative;
    
    display: inline-block;
    width: 100%;
    
    &:before {
      content: '';
      display: block;
      padding-top: 100%;
    }
    
    img {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      
      height: 100%;
      width: 100%;
      border-radius: 8px;
      
      object-fit: cover;
    }
  }
  
  &__info {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    margin-top: 4px;
    margin-bottom: 8px;
    max-height: 28px;
    max-width: 100%;
    overflow: hidden;
    
    text-overflow: ellipsis;
    font-size: 12px;
    line-height: 1.2;
    -webkit-line-clamp: 2;
  }
  
  &__name {
  
  }
  
  &__price {
    margin-left: 4px;
    
    text-overflow: ellipsis;
    
    color: theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
  }
  
  &__button {
    display: flex;
    justify-content: center;
    
    margin-top: auto;
    
    button {
      height: 30px;
      border-radius: 8px;
      
      font-size: 14px;
    }
  }
}

</style>