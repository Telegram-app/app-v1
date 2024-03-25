<template>
  <div class="categories">
    <div class="categories__category categories__category--large" @click="$router.push({name: 'store', query: { category: 'Category 1' }})">
      <span>Special offer</span>
    </div>
    <div class="categories__category" @click="$router.push({name: 'store', query: { category: 'Category 2' }})">
      <span>Special offer</span>
      <img src="/images/market/stores/category-image.png" alt="category">
    </div>
    <div class="categories__category" @click="$router.push({name: 'store', query: { category: 'Category 3' }})">
      <span>Special offer</span>
      <img src="/images/market/stores/category-image.png" alt="category">
    </div>
    <div class="categories__category" @click="$router.push({name: 'store', query: { category: 'Category 4' }})">
      <span>Special offer</span>
      <img src="/images/market/stores/category-image.png" alt="category">
    </div>
    <div class="categories__category" @click="$router.push({name: 'store', query: { category: 'Category 5' }})">
      <span>Special offer</span>
      <img src="/images/market/stores/category-image.png" alt="category">
    </div>
  </div>
</template>

<route lang="json">
{
"name": "categories"
}
</route>

<script lang="ts">

import {defineComponent} from 'vue';

export default defineComponent({
  name: 'CategoriesPage',
  
  props: [],
  
  mounted() {
    if (window.Telegram.WebApp) {
      window.Telegram.WebApp.MainButton.setParams({
        is_active: false,
        is_visible: false
      });
    }
  },
  
  data: () => ({}),
  
  computed: {},
  
});

</script>

<style scoped lang="scss">

.categories {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  
  
  &__category {
    position: relative;
    
    display: flex;
    flex: 1 0 auto;
    flex-basis: 105px;
    flex-direction: column;
    height: 90px;
    border-radius: 10px;
    padding: 10px;
    
    background-color: theme-var($--card-bg-color);
    
    cursor: pointer;
    
    &--large {
      flex: 1 0 auto;
      flex-basis: 225px;
      
      background-color: #FD6E3B;
      
      span {
        color: #ffffff;
      }
    }
    
    span {
      font-size: 12px;
      font-family: "SF Pro Text Medium", sans-serif;
      line-height: 1;
    }
    
    img {
      margin-top: auto;
      margin-left: auto;
      max-height: 55px;
      height: 55px;
      width: 63px;
    }
  }
}

</style>