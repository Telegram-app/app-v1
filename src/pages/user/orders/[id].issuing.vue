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
          <div class="order-issuing__messenger__username">Vsevolod</div>
          
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
      <div class="feedback">
        <div class="feedback__card self-card">
          <div class="feedback__icon">
            <img src="/images/feedback-icon.png" alt="feedback-icon">
          </div>
          
          <div class="feedback__title">
            Share your feedback
          </div>
          
          <div class="divider--short"></div>
          
          <div class="feedback__rating">
            <input type="radio" id="star-5" name="rating" value="5">
            
            <label for="star-5" title="Оценка «5»"></label>
            
            <input type="radio" id="star-4" name="rating" value="4">
            
            <label for="star-4" title="Оценка «4»"></label>
            
            <input type="radio" id="star-3" name="rating" value="3">
            
            <label for="star-3" title="Оценка «3»"></label>
            
            <input type="radio" id="star-2" name="rating" value="2">
            
            <label for="star-2" title="Оценка «2»"></label>
            
            <input type="radio" id="star-1" name="rating" value="1">
            
            <label for="star-1" title="Оценка «1»"></label>
          </div>
          
          <div class="divider--short"></div>
          
          <div class="feedback__tips">
            <span class="feedback__tips__title">Tips</span>
            
            <div class="feedback__tips__items">
              <div class="feedback__tips__items__item"><span>10</span> <span><IconToken h="10" w="10" color="white"/></span></div>
              <div class="feedback__tips__items__item"><span>15</span> <span><IconToken h="10" w="10" color="white"/></span></div>
              <div class="feedback__tips__items__item"><span>20</span> <span><IconToken h="10" w="10" color="white"/></span></div>
            </div>
          </div>
          
          <div class="feedback__samplers">
            <span class="feedback__samplers__title">What did you especially enjoy?</span>
            
            <div class="feedback__samplers__items">
              <div class="feedback__samplers__items__item">Affordable price <img src="/images/icons/thumb-up.png" alt="icon"></div>
              <div class="feedback__samplers__items__item">High professionalism <img src="/images/icons/bag.png" alt="icon"></div>
            </div>
          </div>
        </div>
        
        <div class="feedback__textarea">
          <textarea placeholder="Your feedback" rows="2"></textarea>
        </div>
        
        <NotWebAppButton @click="feedback.show = false" v-if="notAWebApp && feedback.show">DONE</NotWebAppButton>
      </div>
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

.feedback {
  .divider--short {
    margin: 15px 0;
  }
  
  &__card {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 43px;
  }
  
  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    width: 50px;
    border-radius: 100%;
    
    background-color: #E6F1FF;
  }
  
  &__title {
    margin-top: 10px;
    
    font-size: 15px;
    font-family: "SF Pro Text Medium", sans-serif;
    line-height: 1;
    
    color: #0477FF;
  }
  
  &__rating {
    &:not(:checked) > input {
      display: none;
    }
    
    &:not(:checked) > label {
      display: flex;
      justify-content: center;
      align-items: center;
      float: right;
      width: 20px;
      margin: 0 4px;
      padding: 0;
      
      font-size: 27px;
      line-height: 20px;
      
      color: lightgrey;
      
      cursor: pointer;
    }
    
    &:not(:checked) > label:before {
      content: '★';
    }
    
    input:checked ~ label {
      color: gold;
      
    }
    
    &:not(:checked) > label:hover, &:not(:checked) > label:hover ~ label {
      color: gold;
    }
    
    input:checked + label:hover, input:checked + label:hover ~ label, input:checked ~ label:hover, input:checked ~ label:hover ~ label, label:hover ~ input:checked ~ label {
      color: gold;
    }
    
    label:active {
      position: relative;
    }
  }
  
  &__tips {
    &__title {
      display: inline-block;
      width: 100%;
      text-align: center;
      
      font-size: 15px;
      font-family: "SF Pro Text Medium", sans-serif;
      line-height: 1;
    }
    
    &__items {
      display: flex;
      justify-content: center;
      margin-top: 15px;
      
      &__item {
        display: flex;
        align-items: center;
        padding: 7px 12px;
        border-radius: 50px;
        
        background-color: #E6F1FF;
        
        span:first-child {
          font-size: 15px;
          font-family: "SF Pro Text Medium", sans-serif;
          
          color: #1799FF;
          background: linear-gradient(180deg, #54B4FF 0%, #1799FF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        span:last-child {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 20px;
          width: 20px;
          margin-left: 5px;
          border-radius: 100%;
          
          background: linear-gradient(180deg, #5BB7FF 0%, #1196FF 100%);
        }
        
        &:nth-child(2) {
          margin: 0 15px;
        }
      }
    }
  }
  
  &__samplers {
    margin-top: 30px;
    
    &__title {
      display: inline-block;
      width: 100%;
      text-align: center;
      
      font-size: 15px;
      font-family: "SF Pro Text Medium", sans-serif;
      line-height: 1;
    }
    
    &__items {
      display: flex;
      justify-content: center;
      margin-top: 15px;
      
      &__item {
        display: flex;
        align-items: center;
        padding: 10px;
        border-radius: 50px;
        
        font-size: 12px;
        
        color: #000000;
        background-color: #E6F1FF;
        
        &:first-child {
          margin-right: 15px;
        }
        
        img {
          margin-left: 5px;
          height: 12px;
          width: 12px;
        }
      }
    }
  }
  
  &__textarea {
    position: relative;
    
    display: flex;
    margin-top: 15px;
    width: 100%;
    
    textarea {
      position: relative;
      z-index: 2;
      
      width: 100%;
      padding: 10px 15px;
      border: 1px solid transparent !important;
      border-radius: 10px;
      
      color: theme-var-tg(--tg-theme-text-color, $--tg-text-color);
      background-color: theme-var-tg(--tg-theme-secondary-bg-color, $--tg-secondary-bg-color);
      background-clip: padding-box;
      
      font-size: 12px;
      
      resize: none;
      
      &::placeholder {
        color: #7D7D85;
      }
      
      &:focus {
        outline: unset;
      }
    }
    
    &:before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1;
      margin: 0;
      border-radius: 10px;
      background: linear-gradient(90deg, rgba(4, 119, 255, 0.67) 0%, rgba(4, 119, 255, 0.26) 67%);
    }
  }
}

</style>