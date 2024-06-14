<template>
  <div class="product__header">
    <div class="product__header__category">
      <span>Digital goods</span>
      <IconChevronRight h="10" w="6" color="grey"/>
    </div>
    
    <div class="product__header__wrapper">
      <div class="product__header__info">
        <h1 class="product__header__title">{{ product.name }}</h1>
        <div class="is-flex is-align-items-center mt-1">
          <span class="product__header__id">#{{ product.id }}</span>
          <span class="product__header__dividing-dot"></span>
          <span class="product__header__createdAt">{{ dateToHumanize(product.createdAt) }}</span>
        </div>
      </div>
      <div class="product__header__share">
        <IconShare w="11"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import {defineComponent, PropType, ref} from 'vue';
import dayjs from 'dayjs';

interface ProductHeader {
  id: string | number;
  name: string;
  createdAt: Date;
}

const loadHeader = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 2000)
  })
}

export default defineComponent({
  name: 'ProductHeader',
  
  props: {
    product: {
      type: Object as PropType<ProductHeader>,
      required: true
    }
  },
  
  async setup() {
    const data = ref(await loadHeader())
    
    return { data }
  },
  
  methods: {
    dateToHumanize(date: Date) {
      let dayjsDate = dayjs(date);
      return dayjsDate.format('DD.MM.YYYY');
    },
  }
  
})

</script>

<style scoped lang="scss">

.product__header {
  display: flex;
  flex-wrap: wrap;
  
  &__category {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px 10px;
    border-radius: 10px;
    
    color: theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
    background-color: theme-var-tg(--tg-theme-secondary-bg-color, $--tg-secondary-bg-color);
    
    span {
      margin-right: 4px;
      
      font-size: 12px;
      line-height: 1;
      text-transform: uppercase;
    }
  }
  
  &__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
    width: 100%;
  }
  
  &__info {
    display: flex;
    flex-direction: column;
  }
  
  
  &__title {
    font-size: 16px;
    line-height: 1;
    font-family: "Helvetica Neue Cyr Bold", "Helvetica Neue", sans-serif;
    font-weight: 400;
  }
  
  &__id {
    font-size: 12px;
    line-height: 1;
    
    color: theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
  }
  
  &__dividing-dot {
    height: 2px;
    width: 2px;
    margin: auto 6px;
    border-radius: 100%;
    
    background-color: theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
  }
  
  &__createdAt {
    font-size: 12px;
    line-height: 1;
    
    color: theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
  }
  
  &__share {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 23px;
    height: 23px;
    border-radius: 100%;
    
    background-color: #EBF7FE;
  }
}

</style>