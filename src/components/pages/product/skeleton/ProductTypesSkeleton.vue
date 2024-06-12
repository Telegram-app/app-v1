<template>
  <div class="product__types__skeleton">
    <div class="product__types__skeleton__tabs">
    
    </div>
    
    <div class="product__types__skeleton__items">
      <div v-for="i in 6" class="product__types__skeleton__items__item">
        <span class="product__types__skeleton__items__item__name"></span>
        <span class="product__types__skeleton__items__item__price"></span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent } from "vue";

export default defineComponent({
  name: 'ProductTypesSkeleton',
})

</script>

<style scoped lang="scss">

.product__types__skeleton {
  margin-top: 15px;
  
  &__tabs {
    display: flex;
    height: 32px;
    width: 100%;
    padding: 2px;
    border-radius: 5px;
    
    animation: 1.5s infinite pulse-bg;
  }
  
  &__items {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    row-gap: 5px;
    margin-top: 10px;
    
    &__item {
      display: flex;
      flex-direction: column;
      height: 47px;
      min-width: 93px;
      max-width: 93px;
      padding: 8px 10px;
      border-radius: 10px;
      
      animation: 1.5s infinite pulse-bg;
    }
  }
}

</style>