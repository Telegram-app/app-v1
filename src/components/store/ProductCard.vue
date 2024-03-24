<template>
  <div class="product__card card--bg" v-if="product">
    <div class="product__card__wrapper">
      <div class="product__card__image">
        <img :src="'/images/market/stores/products/' + product.image" alt="product-image">
      </div>
      <div class="product__card__info">
        <h2 class="product__card__info__name">{{ product.name }}</h2>
        
        <span class="product__card__info__price">
          <IconToken h="9" w="9" :color="'grey'"/>
          {{ fromToPrice }}
        </span>
        
        <div class="product__card__line"></div>
        
        <div class="product__card__info__statuses">
          <div class="product__card__info__statuses__status product__card__info__statuses__status__top-sales">
            <IconStar h="10" w="10" color="black"/>
            <span>Top Sales</span>
          </div>
          <div class="product__card__info__statuses__status product__card__info__statuses__status__new">
            <IconStar h="10" w="10"/>
            <span>New</span>
          </div>
          <div class="product__card__info__statuses__status product__card__info__statuses__status__good-reviews">
            <IconStar h="10" w="10"/>
            <span>Good reviews</span>
          </div>
        </div>
        
        <div class="product__card__info__bottom">
          <div class="product__card__info__store">
            <span>Store</span>
            <span>{{ storeName }} <IconConfirmed h="10" w="10"/></span>
          </div>
          <div class="product__card__info__actions">
            <div class="product__card__info__actions__rating">
              <div>
                100
              </div>
              <span>100%</span>
            </div>
            <div class="product__card__info__actions__like">
              <IconHeart w="11" h="10"/>
            </div>
            <div class="product__card__info__actions__share">
              <span>Share</span>
              <IconShare h="8" w="auto"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="product__card__footer">
      <p>{{ product.shortDescription }}</p>
      <VButton @click="toProductPage(product.id)">OPEN</VButton>
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent } from "vue";

import type { PropType } from 'vue'
import { Product } from '@/models/store.model.ts';
import IconStar from '@/components/icons/IconStar.vue';
import IconConfirmed from '@/components/icons/IconConfirmed.vue';

export default defineComponent({
  name: 'ProductCard',
  components: {IconConfirmed, IconStar},
  
  props: {
    product: Object as PropType<Product>,
    storeName: String
  },
  
  data: () => ({
  
  }),
  
  computed: {
    fromToPrice() {
      let arrPrices: number[] = []
      
      this.product?.types.forEach(type => {
        type.items.forEach(item => {
          arrPrices.push(item.price)
        })
      })
      
      return `from ${Math.min(...arrPrices)} to ${Math.max(...arrPrices)}`
    }
  },
  
  methods: {
    toProductPage(id: number | string) {
      this.$emit('toProductPage', id)
    }
  }
  
})

</script>

<style scoped lang="scss">

.product__card {
  margin-top: 15px;
  border-radius: 10px;
  
  background-color: theme-var-tg(--tg-theme-bg-color, $--tg-bg-color);
  
  &__wrapper {
    display: flex;
    height: 180px;
    border-bottom: 1px solid theme-var($--divider-color);
  }
  
  &__image {
    height: calc(100% + 1px);
    width: 174px;
    min-width: 174px;
    
    img {
      height: 100%;
      width: 100%;
      border-radius: 10px 10px 10px 0;
      
    }
  }
  
  &__info {
    display: flex;
    flex-direction: column;
    padding: 7px 10px 5px 6px;
    
    &__name {
      font-size: 16px;
      font-family: "SF Pro Text Bold", sans-serif;
      line-height: 1;
    }
    
    &__price {
      display: flex;
      align-items: center;
      margin-top: 5px;
      
      font-size: 11px;
      
      color: #7D7D85;
      
      svg {
        margin-right: 4px;
      }
    }
    
    &__statuses {
      display: flex;
      flex-wrap: wrap;
      row-gap: 3px;
      margin-top: 5px;
      
      &__status {
        display: flex;
        margin-right: 5px;
        padding: 7px;
        border-radius: 5px;
        
        svg {
          margin-right: 4px;
        }
        
        span {
          font-size: 11px;
          line-height: 1;
        }
        
        &__top-sales {
          color: #000000;
          
          background: linear-gradient(90deg, #D4FFDB 0%, #E9FD5D 100%);
        }
        
        &__new {
          color: #ffffff;
          background: linear-gradient(90deg, #9CCEFF 0%, #7C87FD 100%);
        }
        
        &__good-reviews {
          color: #ffffff;
          background: linear-gradient(180deg, #C58EFF 0%, #A147FE 100%);
        }
      }
    }
    
    &__bottom {
      margin-top: auto;
    }
    
    &__store {
      display: flex;
      justify-content: space-between;
      
      span {
        font-size: 12px;
        line-height: 1;
        
        &:first-child {
          display: flex;
          
          color: #7D7D85;
        }
        
        &:last-child {
          display: flex;
          flex: 1;
          align-items: center;
          
          svg {
            margin-left: 2px;
          }
          
          &:before {
            content: '';
            
            flex: 1;
            margin: auto 4px 2px 4px;
            border-bottom: 1px dashed theme-var($--divider-color);
          }
        }
      }
    }
    
    &__actions {
      display: flex;
      justify-content: space-between;
      height: 24px;
      margin-top: 5px;
      line-height: 1;
      
      & > div {
        background-color: theme-var($--action-button-color);
      }
      
      &__rating {
        display: flex;
        align-items: center;
        padding: 1px 6px 1px 1px;
        border-radius: 15px;
        
        font-size: 8px;
        font-family: "SF Pro Text Medium", sans-serif;
        
        div {
          padding: 7px 7px 8px;
          border-radius: 15px;
          
          color: #ffffff;
          background-color: theme-var-tg(--tg-theme-button-color, $--tg-button-color);;
        }
        
        span {
          margin-left: 6px;
          
          color: theme-var-tg(--tg-theme-button-color, $--tg-button-color);;
        }
      }
      
      &__like {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 24px;
        width: 24px;
        border-radius: 100%;
      }
      
      &__share {
        display: flex;
        align-items: center;
        
        padding: 6px;
        border-radius: 15px;
        
        font-size: 11px;
        
        color: theme-var-tg(--tg-theme-button-color, $--tg-button-color);;
        
        span {
          margin-right: 3px;
        }
      }
    }
  }
  
  &__line {
    height: 1px;
    width: calc(100% + 16px);
    margin-top: 5px;
    margin-left: -6px;
    
    background-color: theme-var($--divider-color);
  }
  
  &__footer {
    display: flex;
    align-items: center;
    padding: 6px 10px;
    
    p {
      margin-right: 8px;
      
      font-size: 11px;
      
      color: #7d7d85;
    }
    
    button {
      height: 23px;
      width: auto;
      padding: 7px 17px 8px;
      border-radius: 15px;
      
      font-size: 13px;
      font-family: "SF Pro Text Medium", sans-serif;
      line-height: 1;
      
      background: linear-gradient(180deg, #51B3FF 0%, #2EA3FF 100%);
    }
  }
}

</style>