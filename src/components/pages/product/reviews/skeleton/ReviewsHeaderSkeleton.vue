<template>
  <div class="reviews__header__skeleton">
    <span class="skeleton-gradient-animation"></span>
    <span class="skeleton-gradient-animation"></span>
  </div>
</template>

<script lang="ts">

import { defineComponent } from "vue";

export default defineComponent({
  name: 'ReviewsHeaderSkeleton',
})

</script>

<style scoped lang="scss">

.reviews__header__skeleton {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1;
  
  display: flex;
  justify-content: center;
  align-items: center;
  height: 44.5px;
  padding: 11px 0;
  
  background: theme-var-tg(--tg-theme-bg-color, $--tg-bg-color);
  
  span {
    &:first-child {
      height: 15px;
      width: 40%;
      border-radius: 8px;
    }
    
    &:last-child {
      position: absolute;
      right: 15px;
      
      height: 10px;
      width: 10%;
      border-radius: 8px;
    }
  }
}

</style>