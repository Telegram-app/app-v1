<template>
  <div class="product__card__skeleton card--bg">
    <div class="product__card__skeleton__image"></div>
    
    <p class="product__card__skeleton__info">
      <span></span>
      <span></span>
    </p>
    
    <div class="product__card__skeleton__button"></div>
  </div>
</template>

<script lang="ts">

import { defineComponent } from "vue";

export default defineComponent({
  name: 'StoreProductCardSkeleton',
})

</script>

<style scoped lang="scss">

.product__card__skeleton {
  display: flex;
  flex-direction: column;
  
  &__image {
    position: relative;
    
    display: inline-block;
    width: 100%;
    border-radius: 8px;
    
    animation: 1.5s infinite pulse-bg;
    
    &:before {
      content: '';
      display: block;
      padding-top: 100%;
    }
  }
  
  &__info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 4px;
    margin-bottom: 8px;
    height: 28px;
    width: 100%;
    
    span {
      height: 12px;
      width: 100%;
      
      animation: 1.5s infinite pulse-bg;
    }
  }
  
  &__button {
    margin-top: auto;
    height: 30px;
    width: 100%;
    border-radius: 8px;
    
    animation: 1.5s infinite pulse-bg;
  }
}

</style>