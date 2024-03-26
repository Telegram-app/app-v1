<template>
  <div class="store-subscription">
    <div class="store-subscription__image">
      <img src="/images/create-shop.png" alt="image">
    </div>
    
    <h1 class="store-subscription__title">Create a shop</h1>
    
    <p class="store-subscription__description">She dreams of creating a shop that reflects her personality.</p>
    
    <div class="store-subscription__periods self-card">
      <div class="store-subscription__periods__item">
        <div class="store-subscription__periods__item__checkbox">
          <input type="radio" value="1 year" v-model="period">
        </div>
        <div class="is-flex-direction-column is-justify-content-space-between">
          <div class="is-flex is-align-items-center">
            <span class="store-subscription__periods__item__time">1 year</span>
            <span class="store-subscription__periods__item__discount">-44%</span>
          </div>
          <span class="store-subscription__periods__item__price-per-time"><s>71,99 USD</s> 39,99 USD</span>
        </div>
        <div class="store-subscription__periods__item__price-per-month">3,33 USD/month</div>
      </div>
      
      <div class="divider"></div>
      
      <div class="store-subscription__periods__item">
        <div class="store-subscription__periods__item__checkbox">
          <input type="radio" value="6 month" v-model="period">
        </div>
        <div class="is-flex-direction-column is-justify-content-space-between">
          <div class="is-flex is-align-items-center">
            <span class="store-subscription__periods__item__time">6 months</span>
            <span class="store-subscription__periods__item__discount">-44%</span>
          </div>
          <span class="store-subscription__periods__item__price-per-time"><s>35,99 USD</s> 29,99 USD</span>
        </div>
      </div>
      
      <div class="divider"></div>
      
      <div class="store-subscription__periods__item">
        <div class="store-subscription__periods__item__checkbox">
          <input type="radio" value="3 month" v-model="period">
        </div>
        <div class="is-flex-direction-column is-justify-content-space-between">
          <div class="is-flex is-align-items-center">
            <span class="store-subscription__periods__item__time">3 months</span>
          </div>
          <span class="store-subscription__periods__item__price-per-time">17,99 USD</span>
        </div>
        <div class="store-subscription__periods__item__price-per-month">5,99 USD/month</div>
      </div>
    </div>
    
    <div class="store-subscription__benefits">
      <span class="caption">Subscription benefits</span>
      
      <div class="self-card">
        <div class="store-subscription__benefits__item">
          <div class="store-subscription__benefits__item__icon">
            <img src="/images/icons/benefits-stats.svg" alt="icon">
          </div>
          <div class="is-flex is-flex-direction-column is-justify-content-space-between">
            <span class="store-subscription__benefits__item__title">Statistics</span>
            <span class="store-subscription__benefits__item__description">
              She dreams of creating a shop that reflects her personality.
            </span>
          </div>
          <div class="store-subscription__benefits__item__more">
            <IconChevronRight h="11" w="7" color="transparent-grey"/>
          </div>
        </div>
        
        <div class="divider"></div>
        
        <div class="store-subscription__benefits__item">
          <div class="store-subscription__benefits__item__icon">
            <img src="/images/icons/benefits-stats.svg" alt="icon">
          </div>
          <div class="is-flex is-flex-direction-column is-justify-content-space-between">
            <span class="store-subscription__benefits__item__title">Statistics</span>
            <span class="store-subscription__benefits__item__description">
              She dreams of creating a shop that reflects her personality.
            </span>
          </div>
          <div class="store-subscription__benefits__item__more">
            <IconChevronRight h="11" w="7" color="transparent-grey"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<route lang="json">
{
"name": "subscription"
}
</route>

<script lang="ts">

import { defineComponent } from "vue";

export default defineComponent({
  name: '',
  
  props: [],
  
  data: () => ({
    period: '1 year'
  }),
  
  computed: {
  
  },
  
})

</script>

<style scoped lang="scss">

.store-subscription {
  display: flex;
  flex-direction: column;
  align-items: center;
  
  &__image {
    margin-top: 10px;
  }
  
  &__title {
    margin-top: 15px;
    
    font-size: 20px;
    line-height: 1;
  }
  
  &__description {
    margin-top: 15px;
    max-width: 80%;
    text-align: center;
    
    font-size: 15px;
  }
  
  &__periods {
    margin-top: 20px;
    width: 100%;
    
    .divider {
      margin: 10px 0;
    }
    
    &__item {
      display: flex;
      align-items: center;
      
      &__checkbox {
        position: relative;
        
        width: 24px;
        height: 24px;
        margin-right: 15px;
        
        input {
          position: relative;
          z-index: 1000;
          
          display: inline-block;
          height: 20px;
          width: 20px;
          border: 1px solid #787878;
          border-radius: 100%;
          outline: none;
          
          background: none;
          
          cursor: pointer;
          transition: all 0.15s ease-out 0s;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          
          &:checked {
            border: unset;
            
            background: linear-gradient(180deg, #A379EF 0%, #927DF6 100%);
            
            &:before {
              content: '';
              
              position: absolute;
              
              display: flex;
              justify-content: center;
              align-items: center;
              width: 20px;
              height: 20px;
              
              background-image: url("/images/icons/check-mark.svg");
              background-repeat: no-repeat;
              background-position: 3px 5px;
              background-size: 14px;
            }
          }
        }
      }
      
      &__time {
        font-size: 15px;
        line-height: 1;
      }
      
      &__discount {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 5px;
        padding: 3px 6px;
        border-radius: 5px;
        
        font-size: 11px;
        line-height: 1;
        
        color: #ffffff;
        background: linear-gradient(180deg, #A378EE 0%, #8F7DF7 100%);
      }
      
      &__price {
        &-per-time {
          font-size: 12px;
          line-height: 1;
          
          color: theme-var($--hint-color);
        }
        
        &-per-month {
          align-self: flex-start;
          margin-left: auto;
          
          font-size: 15px;
          line-height: 1;
          
          color: theme-var($--hint-color);
        }
      }
    }
  }
  
  &__benefits {
    margin-top: 15px;
    width: 100%;
    
    .self-card {
      margin-top: 15px;
    }
    
    .divider {
      margin: 10px 0;
    }
    
    &__item {
      display: flex;
      align-items: center;
      
      &__icon {
        align-self: flex-start;
        margin-right: 15px;
        height: 25px;
        width: 25px;
        min-width: 25px;
        
        img {
          height: 100%;
          width: 100%;
        }
      }
      
      &__title {
        font-size: 15px;
        line-height: 1;
      }
      
      &__description {
        margin-top: 5px;
        
        font-size: 12px;
        line-height: 12px;
        
        color: theme-var($--hint-color);
      }
      
      &__more {
        margin-left: 50px;
        
        cursor: pointer;
      }
    }
  }
}

</style>