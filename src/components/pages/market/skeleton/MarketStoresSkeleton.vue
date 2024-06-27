<template>
  <div class="market__stores__skeleton self-card">
    <div class="market__stores__skeleton__store" v-for="i in 24" :key="'stores-top-' + i">
      <div class="market__stores__skeleton__store__image skeleton-gradient-animation"></div>
      <div class="market__stores__skeleton__store__name skeleton-gradient-animation"></div>
    </div>
  </div>
</template>

<script lang="ts">

import {defineComponent} from 'vue';

export default defineComponent({
  name: 'MarketStoresSkeleton'
});

</script>

<style scoped lang="scss">

.market__stores__skeleton {
  position: relative;
  
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: 8px;
  margin-top: 10px;
  padding: 15px 13px;
  
  &__store {
    position: relative;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-basis: 23%;
    padding: 5px 0;
    
    &__image {
      z-index: 2;
      
      height: 57px;
      width: 57px;
      border-radius: 100%;
    }
    
    &__name {
      margin: 5px auto 0;
      height: 12px;
      width: 70px;
      border-radius: 8px;
    }
  }
}

</style>