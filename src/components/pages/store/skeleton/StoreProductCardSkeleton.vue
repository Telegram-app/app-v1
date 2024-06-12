<template>
  <div class="product__card__skeleton card--bg">
    <div class="product__card__skeleton__wrapper">
      <div class="product__card__skeleton__image">
        <div></div>
      </div>
      <div class="product__card__skeleton__info">
        <h2 class="product__card__skeleton__info__name"></h2>
        
        <span class="product__card__skeleton__info__price"></span>
        
        <div class="product__card__skeleton__line"></div>
        
        <div class="product__card__skeleton__info__statuses">
          <div></div>
          <div></div>
          <div></div>
        </div>
        
        <div class="product__card__skeleton__info__bottom">
          <div class="product__card__skeleton__info__store"></div>
          <div class="product__card__skeleton__info__actions">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="product__card__skeleton__footer">
      <div class="product__card__skeleton__footer__text">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent } from "vue";

export default defineComponent({
  name: 'StoreProductCardSkeleton',
})

</script>

<style scoped lang="scss">

.product__card__skeleton {
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
    
    div {
      height: 100%;
      width: 100%;
      border-radius: 10px 10px 10px 0;
      
      animation: 1.5s infinite pulse-bg;
    }
  }
  
  &__info {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 7px 10px 5px 6px;
    
    &__name {
      height: 15px;
      width: 80%;
      
      animation: 1.5s infinite pulse-bg;
    }
    
    &__price {
      display: flex;
      margin-top: 5px;
      height: 11px;
      width: 50%;
      
      animation: 1.5s infinite pulse-bg;
    }
    
    &__statuses {
      display: flex;
      flex-wrap: wrap;
      row-gap: 3px;
      margin-top: 5px;
      
      div {
        display: flex;
        margin-right: 5px;
        height: 21px;
        border-radius: 5px;
        
        animation: 1.5s infinite pulse-bg;
        
        &:first-child {
          width: 60%;
        }
        
        &:nth-child(2) {
          width: 33%;
        }
        
        &:last-child {
          width: 45%;
        }
      }
    }
    
    &__bottom {
      margin-top: auto;
    }
    
    &__store {
      height: 14px;
      width: 100%;
      
      animation: 1.5s infinite pulse-bg;
    }
    
    &__actions {
      display: flex;
      justify-content: space-between;
      height: 24px;
      margin-top: 5px;
      line-height: 1;
      
      div {
        &:first-child {
          height: 23px;
          width: 33%;
          border-radius: 15px;
          
          animation: 1.5s infinite pulse-bg;
        }
        
        &:nth-child(2) {
          height: 24px;
          width: 24px;
          border-radius: 100%;
          
          animation: 1.5s infinite pulse-bg;
        }
        
        &:last-child {
          height: 23px;
          width: 30%;
          border-radius: 15px;
          
          animation: 1.5s infinite pulse-bg;
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
    
    &__text {
      display: flex;
      flex: 1;
      flex-direction: column;
      
      div {
        height: 11px;
        
        animation: 1.5s infinite pulse-bg;
        
        &:first-child {
          width: 95%;
        }
        
        &:nth-child(2) {
          margin-top: 5px;
          width: 65%;
        }
        
        &:last-child {
          margin-top: 5px;
          width: 80%;
        }
      }
    }
    
    & > div:last-child {
      height: 23px;
      width: 70px;
      border-radius: 15px;
      
      animation: 1.5s infinite pulse-bg;
    }
  }
}

</style>