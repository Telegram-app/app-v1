<template>
   <div class="categories__skeleton">
    <div v-for="i in 5"></div>
   </div>
</template>

<script lang="ts">

import { defineComponent } from "vue";

export default defineComponent({
  name: 'StoreCategoriesSkeleton',
  
})

</script>

<style scoped lang="scss">

.categories__skeleton {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  
  
  div {
    position: relative;
    
    display: flex;
    flex: 1 0 auto;
    flex-basis: 105px;
    flex-direction: column;
    height: 90px;
    border-radius: 10px;
    
    animation: 1.5s infinite pulse-bg;
    
    &:first-child {
      flex: 1 0 auto;
      flex-basis: 225px;
    }
  }
}

</style>