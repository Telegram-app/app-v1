<template>
  <div class="product__header__skeleton">
    <div class="product__header__skeleton__category">
    
    </div>
    
    <div class="product__header__skeleton__wrapper">
      <div class="product__header__skeleton__info">
        <div class="product__header__skeleton__title"></div>
        <div class="is-flex is-align-items-center mt-1">
          <span class="product__header__skeleton__id"></span>
          <span class="product__header__skeleton__dividing-dot"></span>
          <span class="product__header__skeleton__createdAt"></span>
        </div>
      </div>
      <div class="product__header__skeleton__share">
      
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
    
    animation: 1.5s infinite pulse-bg;
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
    
    animation: 1.5s infinite pulse-bg;
  }
  
  &__id {
    height: 12px;
    width: 20%;
    
    animation: 1.5s infinite pulse-bg;
  }
  
  &__dividing-dot {
    height: 2px;
    width: 2px;
    margin: auto 6px;
    border-radius: 100%;
    
    animation: 1.5s infinite pulse-bg;
  }
  
  &__createdAt {
    height: 12px;
    width: 30%;
    
    animation: 1.5s infinite pulse-bg;
  }
  
  &__share {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 23px;
    height: 23px;
    border-radius: 100%;
    
    animation: 1.5s infinite pulse-bg;
  }
}

</style>