<template>
  <div class="product__info">
    <div class="product__description" :class="{ 'product__description--show': descShowMore }">
      <span class="caption">Description</span>
      <p class="product__description__text" :class="{'product__description__text__full': descShowMore}">
        {{ descShowMore ? product.description : kitcut(product.description, 170) }}
        <span class="product__description__show-more__wrapper">
            <a class="product__description__show-more" @click="descShowMoreFunc()" v-if="product.description.length > 170">{{ descShowMore ? 'Hide more' : 'Show more' }}</a>
          </span>
      </p>
    </div>
    
    <div class="divider"></div>
    
    <div class="product__store__info">
      <div class="product__store__info__seller">
        <span>Seller: </span>
        <span>{{ sellerAndDeals.seller }}</span>
      </div>
      <div class="product__store__info__deals">
        <span>Deals: </span>
        <span>{{ sellerAndDeals.deals.completed }} · {{ Math.floor(sellerAndDeals.deals.completed / sellerAndDeals.deals.quantity * 100) }}%</span>
      </div>
    </div>
    
    <div class="divider"></div>
    
    <div class="product__chars" :class="{ 'product__chars--show': charsShowMore }">
      <span class="caption">Characteristics</span>
      <div class="product__chars__char" v-for="(char, index) in charsShowMore ? product.characteristics : product.characteristics.slice(0, 2)" :key="'char-' + index">
        <span class="product__chars__char__key">{{ char.key }}</span>
        <span class="product__chars__char__value">{{ char.value }}</span>
      </div>
      <a class="product__chars__show-more" @click="charsShowMoreFunc()" v-if="product.characteristics.length > 2">{{ charsShowMore ? 'Hide characteristics' : 'All characteristics' }}</a>
    </div>
  </div>
</template>

<script lang="ts">

import {defineComponent, PropType, ref} from 'vue';
import {Product} from '@/models/store.model.ts';

interface SellerAndDeals {
  seller: string;
  deals: {
    quantity: number;
    completed: number;
  };
}
const loadInfo = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 2000)
  })
}

export default defineComponent({
  name: 'ProductInfo',
  
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true
    },
    sellerAndDeals: {
      type: Object as PropType<SellerAndDeals>,
      required: true
    }
  },
  
  async setup() {
    const data = ref(await loadInfo())
    
    return { data }
  },
  
  data: () => ({
    descShowMore: false,
    charsShowMore: false,
  }),
  
  methods: {
    kitcut(text: string, limit: number) {
      text = text.trim();
      if (text.length <= limit) return text;
      
      text = text.slice(0, limit);
      let lastSpace = text.lastIndexOf(' ');
      if (lastSpace > 0) {
        text = text.substr(0, lastSpace);
      }
      return text + '...';
    },
    
    descShowMoreFunc() {
      this.descShowMore = !this.descShowMore;
      let desc = document.querySelector<HTMLElement>('.product__description__text')!;
      
      if (this.descShowMore) {
        desc.style.maxHeight = '1000px';
      } else {
        desc.style.maxHeight = '80px';
      }
    },
    
    charsShowMoreFunc() {
      this.charsShowMore = !this.charsShowMore;
    },
  },
  
})

</script>

<style scoped lang="scss">

.product__description {
  position: relative;
  
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  
  &__text {
    position: relative;
    
    max-height: 80px;
    margin-top: 10px;
    
    font-size: 13px;
    line-height: 16px;
    
    //transition: max-height 0.5s cubic-bezier(0, 1, 0, 1);
    //
    //&__full {
    //  max-height: 1000px;
    //  transition: max-height 1s ease-in-out;;
    //}
  }
  
  &__show-more {
    &__wrapper {
      display: inline-block;
      min-width: 70px;
    }
    
    position: absolute;
    right: 0;
    bottom: 0;
    border-bottom: 1px dashed theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
    
    font-size: 13px;
    
    color: theme-var-tg(--tg-theme-button-color, $--tg-button-color);
  }
  
  &--show {
    padding-bottom: 20px;
  }
}

.product__store__info {
  margin-top: 15px;
  
  &__seller {
    display: flex;
    
    font-size: 12px;
    line-height: 1;
    
    span:first-child {
      margin-right: 4px;
      
      color: theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
    }
  }
  
  &__deals {
    display: flex;
    margin-top: 5px;
    
    font-size: 12px;
    line-height: 1;
    
    span:first-child {
      margin-right: 4px;
      
      color: theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
    }
    
    span:last-child {
      display: flex;
      align-items: center;
    }
  }
}

.product__chars {
  position: relative;
  
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  overflow: hidden;
  
  &__char {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    width: 100%;
    
    &__key {
      display: flex;
      flex: 1;
      align-items: center;
      
      font-size: 12px;
      
      color: theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
      
      &:after {
        content: "";
        flex: 1;
        margin: auto 4px 4px 4px;
        border-bottom: 1px dashed theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
      }
    }
    
    &__value {
      width: 55%;
      font-size: 12px;
    }
  }
  
  &__show-more {
    margin-top: 10px;
    width: max-content;
    border-bottom: 1px dashed theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
    
    font-size: 12px;
    
    color: theme-var-tg(--tg-theme-button-color, $--tg-button-color);
  }
}

</style>