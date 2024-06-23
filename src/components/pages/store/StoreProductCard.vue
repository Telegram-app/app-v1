<template>
  <div class="product__card card--bg">
    <div class="product__card__image">
      <img :src="'/images/market/stores/products/' + product.image" alt="image">
    </div>
    
    <p class="product__card__info">
      <span class="product__card__name">{{ product.name }}</span>
      <span class="product__card__price"><span class="product__card__slash" v-if="slash">&nbsp;/&nbsp;</span>{{ minPrice }}</span>
    </p>
    
    <div class="product__card__button">
      <VButton color="blue" @click="$emit('toProductPage', product.id)">Открыть</VButton>
    </div>
  </div>
</template>

<script lang="ts">

import {defineComponent, ref} from 'vue';

import type {PropType} from 'vue';
import {Product} from '@/models/store.model.ts';

const loadData = async () => {
  return new Promise<Boolean>((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
};

export default defineComponent({
  name: 'StoreProductCard',
  
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true
    },
    storeName: {
      type: String,
      required: true
    }
  },
  
  async setup() {
    const loadedData = ref(await loadData())
    
    return { loadedData }
  },
  
  data: () => ({
    slash: true
  }),
  
  mounted() {
    this.adjustSlash();
    window.addEventListener('resize', this.adjustSlash);
  },
  
  computed: {
    minPrice() {
      let arrPrices: number[] = [];
      
      this.product?.types.forEach(type => {
        type.items.forEach(item => {
          arrPrices.push(item.price);
        });
      });
      
      return `От ${Math.min(...arrPrices)}р`;
    },
  },
  
  methods: {
    toProductPage(id: number | string) {
      this.$emit('toProductPage', id);
    },
    adjustSlash() {
      this.$nextTick(() => {
        const nameElement = this.$el.querySelector('.product__card__name');
        const priceElement = this.$el.querySelector('.product__card__price');
        
        const nameRect = nameElement.getBoundingClientRect();
        const priceRect = priceElement.getBoundingClientRect();
        
        this.slash = (nameRect.bottom === priceRect.bottom);
        
        if (!this.slash) {
          setTimeout(() => {
            const nameElement = this.$el.querySelector('.product__card__name');
            const priceElement = this.$el.querySelector('.product__card__price');
            
            const nameRect = nameElement.getBoundingClientRect();
            const priceRect = priceElement.getBoundingClientRect();
            
            if (nameRect.bottom === priceRect.bottom) {
              nameElement.style.marginRight = '10px';
            }
          }, 100)
        }
      });
    }
  }
  
});

</script>

<style scoped lang="scss">

.product__card {
  display: flex;
  flex-direction: column;
  
  &__image {
    position: relative;
    
    display: inline-block;
    width: 100%;
    
    &:before {
      content: '';
      display: block;
      padding-top: 100%;
    }
    
    img {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      
      height: 100%;
      width: 100%;
      border-radius: 8px;
      
      object-fit: cover;
    }
  }
  
  &__info {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    margin-top: 4px;
    margin-bottom: 8px;
    max-height: 28px;
    max-width: 100%;
    overflow: hidden;
    
    text-overflow: ellipsis;
    font-size: 12px;
    line-height: 1.2;
    -webkit-line-clamp: 2;
  }
  
  &__name {
    display: inline-block;
  }
  
  &__price {
    display: inline-block;
    
    text-overflow: ellipsis;
    
    color: theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
  }
  
  &__button {
    display: flex;
    justify-content: center;
    
    margin-top: auto;
    
    button {
      height: 30px;
      border-radius: 8px;
      
      font-size: 14px;
    }
  }
}

</style>