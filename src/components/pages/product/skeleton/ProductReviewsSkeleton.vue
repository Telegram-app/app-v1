<template>
  <div class="product__reviews__skeleton">
    <div class="product__reviews__skeleton__header">
      <span class="skeleton-gradient-animation"></span>
    </div>
    
    <div class="product__reviews__skeleton__wrapper">
      <review-skeleton v-for="i of 3" :key="'product-reviews-' + i"/>
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent } from "vue";

export default defineComponent({
  name: 'ProductReviewsSkeleton',
})

</script>

<style scoped lang="scss">

.product__reviews__skeleton {
  margin-top: 15px;
  
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    
    span {
      height: 12px;
      width: 30%;
      border-radius: 8px;
    }
  }
  
  &__wrapper {
    display: flex;
    flex-direction: column;
    row-gap: 15px;
  }
}

</style>