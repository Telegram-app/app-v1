<template>
  <div class="market__stores__skeleton self-card">
    <div class="market__stores__skeleton__store" v-for="i in 4" :key="'stores-top-' + i">
      <div class="market__stores__skeleton__store__image"></div>
      <div class="market__stores__skeleton__store__name"></div>
    </div>
    
    <div class="divider"></div>
    
    <div class="market__stores__skeleton__store" v-for="i in 20" :key="'stores' + i">
      <div class="market__stores__skeleton__store__image"></div>
      <div class="market__stores__skeleton__store__name"></div>
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
  row-gap: 23px;
  margin: 15px -5px 0 -5px;
  padding: 15px 13px;
  
  &__store {
    position: relative;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-basis: 23%;
    
    &__image {
      z-index: 2;
      
      height: 57px;
      width: 57px;
      border-radius: 100%;
      
      animation: 1.5s infinite pulse-bg;
    }
    
    &__name {
      margin: 5px auto 0;
      height: 12px;
      width: 70px;
      
      animation: 1.5s infinite pulse-bg;
    }
  }
  
  .divider {
    position: absolute;
    top: 100px;
    
    margin: 0 !important;
    width: calc(100% - 26px);
  }
}

</style>