<template>
  <div class="order-issuing">
    <div class="order-issuing__product__images">
      <swiper
        :modules="modules"
        :pagination="true"
        :slides-per-view="1"
        class="order-issuing__product__images__swiper"
      >
        <swiper-slide class="order-issuing__product__images__swiper__slide" v-for="(i, index) in 3" :key="i" :virtualIndex="index">
          <div class="order-issuing__product__images__image">
            <img :src="'/images/market/stores/products/' + productImage" alt="product-image">
          </div>
        </swiper-slide>
      </swiper>
    </div>
    
    <div class="order-issuing__premium">
      <span class="caption">About telegram premium</span>
      
      <div class="self-card">
        <p class="order-issuing__premium__text">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam animi incidunt ipsa itaque iure porro quae sed sint sunt, ut!
        </p>
      </div>
    </div>
    
    <div class="order-issuing__deal-details">
      <span class="caption">Deal details</span>
      
      <div class="self-card">
        <div class="order-issuing__deal-details__item">
          <span class="order-issuing__deal-details__item__label">City and establishment address</span>
          <span class="order-issuing__deal-details__item__value">Hontown, Kuwcem Street 37</span>
        </div>
        
        <div class="divider"></div>
        
        <div class="order-issuing__deal-details__item">
          <span class="order-issuing__deal-details__item__label">Seller statistics</span>
          <span class="order-issuing__deal-details__item__value">Deals: {{ sellerDeals.completed }} · {{ Math.floor(sellerDeals.completed / sellerDeals.quantity * 100) || 0 }}%</span>
        </div>
        
        <div class="divider"></div>
        
        <div class="order-issuing__deal-details__item">
          <span class="order-issuing__deal-details__item__label">Customer statistics</span>
          <span class="order-issuing__deal-details__item__value">Deals: 10 · 50%</span>
        </div>
      </div>
    </div>
    
    <div class="order-issuing__messenger">
      <span class="caption has-text-centered">Messenger</span>
      
      <div class="self-card">
        <img src="/images/users/review-avatar.svg" alt="avatar">
        
        <div class="order-issuing__messenger__content">
          <div class="order-issuing__messenger__username" @click="router.push({name: 'profile', params: {id: 1}})">Vsevolod</div>
          
          <div class="order-issuing__messenger__message">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do sfsf
          </div>
          
          <div class="order-issuing__messenger__time">15:00</div>
        </div>
      </div>
    </div>
    
    <div class="order-issuing__actions self-card">
      <div class="order-issuing__actions__chat">Chat with the seller</div>
      
      <div class="divider"></div>
      
      <div class="order-issuing__actions__submit">Submit an appeal</div>
    </div>
    
    <NotWebAppButton @click="feedback.show = true" v-if="notAWebApp && !feedback.show">FEEDBACK</NotWebAppButton>
    
    <VBottomSheet v-model="feedback.show">
      <Feedback @done="feedback.show = false" :notAWebApp="notAWebApp" :show="feedback.show"/>
    </VBottomSheet>
  </div>
</template>

<route lang="json">
{
"name": "orderIssuing"
}
</route>

<script lang="ts">

import {defineComponent} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {useUserStore, Order} from '@/stores/user.ts';
import {useMarketStore} from '@/stores/market.ts';

import {Swiper, SwiperSlide} from 'swiper/vue';
import {Pagination} from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';


export default defineComponent({
  name: 'OrderIssuingPage',
  components: {SwiperSlide, Swiper},
  
  
  setup() {
    const router = useRouter();
    const route = useRoute();
    const userStore = useUserStore();
    const marketStore = useMarketStore();
    
    return {router, route, userStore, marketStore, modules: [Pagination]};
  },
  
  data: () => ({
    feedback: {
      show: false
    }
  }),
  
  computed: {
    order() {
      return this.userStore.getOrderById(Number(this.route.params.id)) as Order;
    },
    
    sellerDeals() {
      return this.marketStore.findById(this.order.storeId).deals;
    },
    
    productImage() {
      return this.marketStore.findProductById(this.order.storeId, this.order.productId).image;
    },
    
    notAWebApp() {
      return window.Telegram.WebApp.platform === 'unknown'
    }
  },
  
  mounted() {
    this.showFeedbackButton();
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

<style lang="scss">

.order-issuing {
  .divider {
    margin: 7px 0;
  }
  
  &__product {
    &__images {
      margin-top: 15px;
      
      &__swiper {
        margin: 0 -15px;
        padding: 0 15px;
        
        &__slide {
          padding-bottom: 22px;
        }
        
        .swiper-pagination {
          bottom: 0;
          
          &-bullet {
            margin: 2.5px !important;
            width: 5px;
            height: 5px;
            
            background: #D8D9DB;
            opacity: 1;
            
            &-active {
              background: #66A9E0;
            }
          }
        }
      }
      
      &__image {
        position: relative;
        
        display: flex;
        justify-content: center;
        height: 231px;
        width: 100%;
        
        img {
          height: 100%;
          width: 225px;
          border-radius: 10px;
        }
      }
    }
  }
  
  &__premium {
    margin-top: 5px;
    
    &__text {
      font-size: 12px;
      line-height: 13px;
      
      color: #787878;
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
        
        color: #7D7D85;
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
      font-family: "SF Pro Text Medium", sans-serif;
    }
    
    &__message {
      font-size: 12px;
      
      color: #888888;
    }
    
    &__time {
      position: absolute;
      top: 10px;
      right: 17px;
      
      font-size: 12px;
      
      color: #888888;
    }
  }
  
  &__actions {
    margin-top: 15px;
    
    font-size: 15px;
    
    &__chat {
      color: #0477FF;
      
      cursor: pointer;
    }
    
    &__submit {
      color: #FF3923;
      
      cursor: pointer;
    }
  }
}

</style>