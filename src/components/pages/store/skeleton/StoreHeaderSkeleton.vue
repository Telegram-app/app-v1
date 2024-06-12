<template>
  <div class="store__header__skeleton">
    <div class="store__header__skeleton__image">
    
    </div>
    
    <div class="store__header__skeleton__title__wrapper self-card">
      <span></span>
      <span></span>
    </div>
    
    <div class="store__header__skeleton__description self-card">
      <div v-for="i in 6"></div>
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
    height: 100px;
    width: 100%;
    border-radius: 10px;
    
    animation: 1.5s infinite pulse-bg;
  }
  
  &__title__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 12px;
    min-height: 42.5px;
    
    span {
      animation: 1.5s infinite pulse-bg;
      
      &:first-child {
        height: 15px;
        width: 40%;
      }
      &:last-child {
        height: 10px;
        width: 15%;
      }
    }
  }
  
  &__description {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 15px;
    min-height: 128px;
    
    div {
      height: 12px;
      width: 100%;
      
      animation: 1.5s infinite pulse-bg;
      
      &:last-child {
        width: 40%;
      }
    }
  }
}

</style>