<template>
  <div class="market__footer__skeleton">
    <div v-for="i in 2">
      <ul>
        <li v-for="item in i === 1 ? 3 : 2">
          <span></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">

import {defineComponent, ref} from 'vue';

export default defineComponent({
  name: 'MarketFooterSkeleton'
})

</script>

<style scoped lang="scss">

.market__footer__skeleton {
  display: flex;
  column-gap: 15px;
  
  div {
    flex: 1;
  }
  
  li {
    padding: 10px 0;
    border-bottom: 1px solid theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
    
    span {
      display: flex;
      height: 13px;
      width: 50%;
      
      animation: 1.5s infinite pulse-bg;
    }
  }
}

</style>