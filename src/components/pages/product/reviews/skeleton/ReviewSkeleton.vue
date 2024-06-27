<template>
  <div class="review__skeleton">
    <div class="review__skeleton__header">
      <div class="review__skeleton__header__avatar skeleton-gradient-animation"></div>
      
      <div class="review__skeleton__header__info">
        <div>
          <div class="skeleton-gradient-animation"></div>
          
          <div class="skeleton-gradient-animation"></div>
        </div>
        
        <div class="skeleton-gradient-animation"></div>
      </div>
    </div>
    
    <div class="review__skeleton__message__wrapper">
      <div v-for="i of 4" class="skeleton-gradient-animation"></div>
    </div>
  </div>
</template>

<script lang="ts">

import {defineComponent} from 'vue';

export default defineComponent({
  name: 'ReviewSkeleton',
  
  props: [],
  
  data: () => ({}),
  
  computed: {},
  
});

</script>

<style scoped lang="scss">

.review__skeleton {
  &__header {
    display: flex;
    align-items: center;
    
    &__avatar {
      height: 32px;
      width: 32px;
      margin-right: 10px;
      border-radius: 100%;
    }
    
    &__info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 32px;
      
      & > div:first-child {
        display: flex;
        align-items: center;
        
        & > div {
          &:first-child {
            margin-right: 5px;
            height: 10px;
            width: 40px;
            border-radius: 8px;
          }
        }
        
        & > div {
          &:last-child {
            height: 15px;
            width: 55px;
            border-radius: 15px;
          }
        }
      }
      
      & > div:last-child {
        height: 12px;
        width: 65px;
        border-radius: 8px;
      }
    }
  }
  
  &__message__wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 10px;
    height: 64px;
    
    div {
      height: 12px;
      width: 100%;
      border-radius: 8px;
      
      &:last-child {
        width: 40%;
      }
    }
  }
}

</style>