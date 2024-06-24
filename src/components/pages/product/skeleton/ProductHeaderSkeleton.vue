<template>
  <div class="product__header__skeleton">
    <div class="product__header__skeleton__category skeleton-gradient-animation">
    
    </div>
    
    <div class="product__header__skeleton__wrapper">
      <div class="product__header__skeleton__info">
        <div class="product__header__skeleton__title skeleton-gradient-animation"></div>
        <div class="is-flex is-align-items-center mt-1">
          <span class="product__header__skeleton__id skeleton-gradient-animation"></span>
          <span class="product__header__skeleton__dividing-dot skeleton-gradient-animation"></span>
          <span class="product__header__skeleton__createdAt skeleton-gradient-animation"></span>
        </div>
      </div>
      <div class="product__header__skeleton__share skeleton-gradient-animation">
      
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent } from "vue";

export default defineComponent({
  name: '',
  
  props: [],
  
  data: () => ({
  
  }),
  
  computed: {
  
  },
  
})

</script>

<style scoped lang="scss">

.product__header__skeleton {
  display: flex;
  flex-wrap: wrap;
  
  &__category {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20px;
    width: 35%;
    border-radius: 10px;
  }
  
  &__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
    width: 100%;
  }
  
  &__info {
    display: flex;
    flex: 1;
    flex-direction: column;
  }
  
  
  &__title {
    height: 16px;
    width: 60%;
  }
  
  &__id {
    height: 12px;
    width: 20%;
  }
  
  &__dividing-dot {
    height: 2px;
    width: 2px;
    margin: auto 6px;
    border-radius: 100%;
  }
  
  &__createdAt {
    height: 12px;
    width: 30%;
  }
  
  &__share {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 23px;
    height: 23px;
    border-radius: 100%;
  }
}

</style>