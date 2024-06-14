<template>
  <div class="product__types">
    <div class="product__types__tabs" v-if="types.length > 1">
      <ul>
        <li v-for="(type, index) in types" :key="'tab-' + index" @click="activeTab = index">
          <a>
            <span>{{ type.title }}</span>
          </a>
        </li>
        <div class="product__types__tabs--active__background"></div>
      </ul>
    </div>
    
    <template v-for="(type, index) in types" :key="'tab-content-' + index">
      <div v-if="activeTab === index" class="product__types__items">
        <div v-for="item in type.items" class="product__types__items__item" @click="selectItem(item, index === 0 ? 1 : 2)" :class="{ 'product__types__items__item--selected': selected === item.name }">
          <span class="product__types__items__item__name">{{ item.name }}</span>
          <span class="product__types__items__item__price">{{ item.price }} TON</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">

import {defineComponent, PropType, ref, toRaw} from 'vue';
import {ProductType} from '@/models/store.model.ts';

const loadTypes = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 2000)
  })
}

export default defineComponent({
  name: 'ProductTypes',
  
  props: {
    types: {
      type: Object as PropType<ProductType[]>,
      required: true
    },
    selected: {
      type: String,
      required: true
    }
  },
  
  async setup() {
    const data = ref(await loadTypes())
    
    return { data }
  },
  
  data: () => ({
    activeTab: 0
  }),
  
  methods: {
    selectItem(item: {name: string; price: number}, type: 1 | 2) {
      this.$emit('selectItem', item, type)
    },
  },
  
})

</script>

<style scoped lang="scss">

.product__types {
  margin-top: 15px;
  
  &__tabs {
    display: flex;
    width: 100%;
    padding: 2px;
    border-radius: 5px;
    
    background-color: theme-var-tg(--tg-theme-secondary-bg-color, $--tg-secondary-bg-color);
    
    &--active {
      
      &__background {
        position: absolute;
        z-index: 1;
        height: 100%;
        left: 0;
        right: 50%;
        
        border-radius: 5px;
        
        background-color: theme-var-tg(--tg-theme-bg-color, $--tg-bg-color);;
        
        transition: 0.5s all;
      }
    }
    
    ul {
      position: relative;
      
      display: flex;
      width: 100%;
      
      li {
        z-index: 2;
        
        display: flex;
        flex: 1;
        justify-content: center;
        padding: 5px 0;
        
        cursor: pointer;
        
        a {
          font-size: 12px;
          font-family: "Helvetica Neue Cyr Bold", "Helvetica Neue", sans-serif;
          font-weight: 400;
          
          color: theme-var-tg(--tg-theme-text-color, $--tg-text-color);
        }
      }
    }
  }
  
  &__items {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    row-gap: 5px;
    margin-top: 10px;
    
    &__item {
      display: flex;
      flex-direction: column;
      min-width: 93px;
      max-width: 93px;
      padding: 8px 10px;
      border: 1px solid theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
      border-radius: 10px;
      
      cursor: pointer;
      
      &__name {
        font-size: 12px;
        font-family: "Helvetica Neue Cyr Bold", "Helvetica Neue", sans-serif;
        font-weight: 400;
        line-height: 1;
      }
      
      &__price {
        font-size: 12px;
        line-height: 1;
        margin-top: 5px;
        
        color: theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
      }
      
      &--selected {
        background-color: #EBF7FE;
        
        .product__types__items__item__name {
          color: #000000;
        }
      }
    }
  }
}

</style>