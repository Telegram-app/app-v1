<template>
  <div class="store__header__skeleton">
    <div class="store__header__skeleton__image skeleton-gradient-animation">
    
    </div>
    
    <div class="store__header__skeleton__title__wrapper">
      <span class="skeleton-gradient-animation"></span>
      <span class="skeleton-gradient-animation"></span>
    </div>
    
    <div class="store__header__skeleton__description self-card">
      <div v-for="i in 5" class="skeleton-gradient-animation"></div>
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent } from "vue";

export default defineComponent({
  name: 'StoreHeaderSkeleton'
})

</script>

<style scoped lang="scss">

.store__header__skeleton {
  &__image {
    margin: 0 auto;
    height: 80px;
    width: 80px;
    border-radius: 100%;
  }
  
  &__title__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 8px;
    
    span {
      &:first-child {
        height: 20px;
        width: 40%;
      }
      &:last-child {
        margin-top: 6px;
        height: 14px;
        width: 60%;
      }
    }
  }
  
  &__description {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 10px;
    min-height: 96px;
    padding: 8px 12px;
    
    div {
      height: 12px;
      width: 100%;
      
      &:first-child {
        height: 12px;
        width: 20%;
      }
      &:last-child {
        width: 40%;
      }
    }
  }
}

</style>