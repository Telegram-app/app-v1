<template>
  <div class="reviews__header">
    <IconStar h="12" w="12"/>
    <h1 class="reviews__header__product-name">{{ product.name }}</h1>
    <span class="reviews__header__product-id">{{ product.id }}</span>
  </div>
</template>

<script lang="ts">

import {defineComponent, ref, PropType} from 'vue';

const loadData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 2000)
  })
}

export default defineComponent({
  name: 'ReviewsHeader',
  
  async setup() {
    const loadDataHeader = ref(await loadData())
    
    return { loadDataHeader }
  },
  
  props: {
    product: {
      type: Object as PropType<{ name: string; id: string | number }>,
      required: true
    }
  },
})

</script>

<style scoped lang="scss">

.reviews__header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1;
  
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 11px 0;
  
  background: linear-gradient(270deg, rgba(105, 189, 254, 0.76) 0%, #4D98FD 100%);
  
  &__product {
    &-name {
      margin-left: 5px;
      
      font-size: 15px;
      font-family: "Helvetica Neue Cyr Bold", "Helvetica Neue", sans-serif;
      font-weight: 400;
      
      color: theme-var-tg(--tg-theme-button-text-color, $--tg-button-text-color);
    }
    
    &-id {
      position: absolute;
      right: 15px;
      
      font-size: 10px;
      
      color: theme-var-tg(--tg-theme-button-text-color, $--tg-button-text-color);
    }
  }
}

</style>