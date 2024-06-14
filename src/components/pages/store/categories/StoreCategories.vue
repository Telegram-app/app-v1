<template>
  <div class="categories">
    <div
      v-for="i in 5"
      class="categories__category"
      :class="{ 'categories__category--large': i === 1 }"
      @click="$emit('pushToCategory', `Category ${i}`)"
    >
      <span>Special offer</span>
      <img v-if="i !== 1" src="/images/market/stores/category-image.png" alt="category">
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent, ref } from "vue";

const loadCategories = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 2000)
  })
}

export default defineComponent({
  name: 'StoreCategories',
  
  async setup() {
    const load = ref(await loadCategories())
    
    return { load }
  },
  
})

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
      font-family: "Helvetica Neue Cyr Medium", "Helvetica Neue", sans-serif;
      font-weight: 400;
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