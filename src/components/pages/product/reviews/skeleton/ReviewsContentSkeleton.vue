<template>
  <div class="reviews__content__skeleton">
    <div>
      <span class="skeleton-gradient-animation"></span>
      <div>
        <span class="skeleton-gradient-animation"></span>
        <span class="skeleton-gradient-animation"></span>
      </div>
    </div>
    
    <div>
      <review-skeleton v-for="i of 3" :key="'reviews-' + i"/>
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent } from "vue";

export default defineComponent({
  name: 'ReviewsContentSkeleton',
})

</script>

<style scoped lang="scss">

.reviews__content__skeleton {
  margin-top: 15px;
  padding: 15px 17px;
  border-radius: 10px;
  
  background-color: theme-var-tg(--tg-theme-bg-color, $--tg-bg-color);
  
  & > div {
    &:first-child {
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      & > span {
        height: 12px;
        width: 20%;
        border-radius: 8px;
      }
        
      div {
        display: flex;
        column-gap: 15px;
        
        span {
          display: flex;
          height: 12px;
          width: 40px;
          border-radius: 8px;
        }
      }
    }
    
    &:last-child {
      display: flex;
      flex-direction: column;
      row-gap: 15px;
      margin-top: 15px;
    }
  }
}

</style>