<template>
  <div class="order">
    <div class="order__header">
      <div class="is-flex is-align-items-center">
        <div class="order__header__avatar">
          <img src="/images/users/review-avatar.svg" alt="avatar">
        </div>
        
        <div class="order__header__store-name">
          <span>You are buying from {{ store.name }}</span>
          <IconConfirmed h="12" w="12" color="blue-gradient"/>
        </div>
      </div>
      
      <div class="order__header__price">
        <span>{{ order.item.price }}</span>
        <span>usdt</span>
      </div>
      
      <div class="order__header__store-id">
        OS-{{ store.id }}
      </div>
    </div>
    
    <div class="order__status self-card">
      <div class="order__status__current">
        <div class="order__status__current__icon">
          <IconCloseCircle h="20" w="20" color="red-gradient"/>
        </div>
        
        <div class="is-flex is-flex-direction-column">
          <span class="order__status__current__title">Status</span>
          <span class="order__status__current__text">{{ order.status }}</span>
        </div>
      </div>
      
      <div class="divider"></div>
      
      <div class="order__status__next" v-for="i in 3" :key="i">
        <div class="order__status__next__icon">
          <img src="/images/market/stores/store-icon-3.svg" alt="icon">
          <div class="order__status__next__line" v-if="i !== 3"></div>
        </div>
        <span class="order__status__next__text">Amount</span>
        <span class="order__status__next__meta">100</span>
      </div>
    </div>
    
    <div class="order__deal-details">
      <span class="caption">Deal details</span>
      
      <div class="self-card">
        <div class="order__deal-details__item">
          <span class="order__deal-details__item__label">Status</span>
          <span class="order__deal-details__item__value">Awaiting confirmation</span>
        </div>
        
        <div class="divider"></div>
        
        <div class="order__deal-details__item">
          <span class="order__deal-details__item__label">Withdrawal fee</span>
          <span class="order__deal-details__item__value">2 USDT</span>
        </div>
        
        <div class="divider"></div>
        
        <div class="order__deal-details__item">
          <span class="order__deal-details__item__label">Address</span>
          <span class="order__deal-details__item__value">EQCZk7u...g2DU</span>
        </div>
      </div>
    </div>
    
    <div class="order__messenger">
      <span class="caption has-text-centered">Messenger</span>
      
      <div class="self-card">
        <img src="/images/users/review-avatar.svg" alt="avatar">
        
        <div class="order__messenger__content">
          <div class="order__messenger__username" @click="router.push({name: 'profile', params: {id: 1}})">Vsevolod</div>
          
          <div class="order__messenger__message">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do sfsf
          </div>
          
          <div class="order__messenger__time">15:00</div>
        </div>
      </div>
    </div>
    
    <div class="order__actions self-card">
      <div class="order__actions__chat">Chat with the seller</div>
      
      <div class="divider"></div>
      
      <div class="order__actions__submit">Submit an appeal</div>
    </div>
    
    <NotWebAppButton @click="feedback.show = true" v-if="notAWebApp && !feedback.show">FEEDBACK</NotWebAppButton>
    
    <VBottomSheet v-model="feedback.show">
      <Feedback @done="feedback.show = false" :notAWebApp="notAWebApp" :show="feedback.show"/>
    </VBottomSheet>
  </div>
</template>

<route lang="json">
{
"name": "order"
}
</route>

<script lang="ts">

import {defineComponent} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {Order, useUserStore} from '@/stores/user.ts';
import { useMarketStore } from '@/stores/market.ts';

export default defineComponent({
  name: 'OrderPage',
  
  props: [],
  
  
  setup() {
    const router = useRouter();
    const route = useRoute();
    const userStore = useUserStore();
    const marketStore = useMarketStore();
    
    return {router, route, userStore, marketStore};
  },
  
  data: () => ({
    feedback: {
      show: false
    }
  }),
  
  mounted() {
    this.showFeedbackButton();
  },
  
  computed: {
    order() {
      return this.userStore.getOrderById(Number(this.route.params.id)) as Order;
    },
    store() {
      return this.marketStore.findById(this.order.storeId)
    },
    
    notAWebApp() {
      return window.Telegram.WebApp.platform === 'unknown'
    }
  },
  
  methods: {
    showFeedbackButton() {
      if (window.Telegram.WebApp) {
        window.Telegram.WebApp.MainButton.setParams({
          text: 'FEEDBACK',
          is_active: true,
          is_visible: true
        }).onClick(() => {
          this.feedback.show = true;
        });
      }
    },
  },
  
  watch: {
    'feedback.show': {
      handler(newValue) {
        if (newValue) {
          window.Telegram.WebApp.MainButton.setParams({
            text: 'DONE',
            is_active: true,
            is_visible: true
          }).onClick(() => {
            this.feedback.show = false;
          });
        } else {
          this.showFeedbackButton();
        }
      }, immediate: true
    }
  }
  
});

</script>

<style scoped lang="scss">

.order {
  .divider {
    margin: 7px 0;
  }
  
  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 25px;
    
    &__avatar {
      position: relative;
      
      margin-right: 10px;
      width: 32px;
      height: 32px;
      
      img {
        width: 100%;
        height: 100%;
      }
    }
    
    &__store-name {
      display: flex;
      align-items: center;
      
      span {
        margin-right: 10px;
        
        font-size: 15px;
      }
    }
    
    &__price {
      margin-top: 10px;
      
      span {
        &:first-child {
          margin-right: 5px;
          
          font-size: 20px;
          font-family: "Helvetica Neue Cyr Bold", "Helvetica Neue", sans-serif;
          font-weight: 400;
          line-height: 1;
        }
        
        &:last-child {
          font-size: 14px;
          line-height: 1;
          text-transform: uppercase;
          
          color: theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
        }
      }
    }
    
    &__store-id {
      margin-top: 10px;
      padding: 7px 20px;
      border-radius: 20px;
      
      font-size: 15px;
      line-height: 1;
      
      background: theme-var-tg(--tg-theme-bg-color, $--tg-bg-color);
    }
  }
  
  &__status {
    margin-top: 15px;
    
    &__current {
      display: flex;
      align-items: center;
      
      &__icon {
        display: flex;
        margin: auto 15px auto 0;
      }
      
      &__title {
        font-size: 15px;
        line-height: 1;
        
        color: theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
      }
      
      &__text {
        margin-top: 5px;
        
        font-size: 15px;
        line-height: 1;
      }
    }
    
    &__next {
      display: flex;
      align-items: center;
      margin-top: 20px;
      
      &__line {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 100%;
        
        height: 20px;
        width: 1px;
        
        background-color: theme-var($--divider-color);
      }
      
      &__icon {
        position: relative;
        
        height: 28px;
        width: 28px;
        
        img {
          height: 100%;
          width: 100%;
        }
      }
      
      &__text {
        margin-left: 15px;
        
        font-size: 15px;
        line-height: 1;
      }
      
      &__meta {
        margin-left: auto;
        
        font-size: 15px;
        line-height: 1;
        
        color: theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
      }
    }
  }
  
  &__deal-details {
    margin-top: 10px;
    
    &__item {
      display: flex;
      flex-direction: column;
      
      &__label {
        font-size: 15px;
        line-height: 1;
        
        color: theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
      }
      
      &__value {
        margin-top: 7px;
        
        font-size: 15px;
        line-height: 1;
      }
    }
  }
  
  &__messenger {
    margin-top: 10px;
    
    .self-card {
      position: relative;
      
      display: flex;
      align-items: center;
    }
    
    img {
      height: 40px;
      width: 40px;
    }
    
    &__content {
      display: flex;
      flex-direction: column;
      margin-left: 9px;
    }
    
    &__name {
      font-size: 13px;
      font-family: "Helvetica Neue Cyr Medium", "Helvetica Neue", sans-serif;
      font-weight: 400;
    }
    
    &__message {
      font-size: 12px;
      
      color: theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
    }
    
    &__time {
      position: absolute;
      top: 10px;
      right: 17px;
      
      font-size: 12px;
      
      color: theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
    }
  }
  
  &__actions {
    margin-top: 15px;
    
    font-size: 15px;
    
    &__chat {
      color: theme-var-tg(--tg-theme-button-color, $--tg-button-color);
      
      cursor: pointer;
    }
    
    &__submit {
      color: theme-var($--error-color);
      
      cursor: pointer;
    }
  }
  
}

</style>