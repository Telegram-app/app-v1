<template>
  <div class="review" v-if="review">
    <div class="review__header">
      <div class="review__avatar">
        <img :src="'/images/users/' + review.from.image" alt="avatar">
      </div>
      <div class="review__header__info">
        <div class="review__header__wrapper">
          <div class="review__name">{{ review.from.name }}</div>
          <div class="review__rating">
            <div>
              {{ review.from.deals.completed }}
            </div>
            <span>{{ review.from.deals.quantity !== 0 ? Math.floor(review.from.deals.completed / review.from.deals.quantity * 100) + '%' : '0' }}</span>
          </div>
        </div>
        <div class="review__id"><span>{{ review.from.id }}</span></div>
      </div>
    </div>
    
    <div class="review__message__wrapper">
      <div class="review__message" :class="{ 'review__message--show': showMore }">
        <p class="review__message__text" :class="{'review__message__text__full': showMore}">{{ showMore ? review.message : kitcut(review.message, 165) }}</p>
        <a class="review__message__show-more" @click="reviewShowMoreFunc()" v-if="review.message.length > 165">{{ showMore ? 'Hide more' : 'Show more' }}</a>
      </div>
      
      <div class="review__message__reply" v-if="!review.response">
        <IconShare w="9"/>
        <span>Reply</span>
      </div>
    </div>
    
    <div class="review__response" v-if="review.response">
      <div class="review__header">
        <div class="review__avatar">
          <img :src="'/images/users/' + review.response.from.image" alt="avatar">
        </div>
        <div class="review__header__info">
          <div class="review__header__wrapper">
            <div class="review__name">{{ review.response.from.name }}</div>
          </div>
          <div class="review__id"><span>{{ review.response.from.role }}</span></div>
        </div>
      </div>
      
      <div class="review__message" :class="{ 'review__message--show': showMoreResponse }">
        <p class="review__message__text" :class="{'review__message__text__full': showMoreResponse}">{{ showMoreResponse ? review.response.message : kitcut(review.response.message, 200) }}</p>
        <a class="review__message__show-more" @click="reviewResponseShowMoreFunc()" v-if="review.response.message.length > 200">{{ showMoreResponse ? 'Hide more' : 'Show more' }}</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import {defineComponent, type PropType} from 'vue';
import {ProductReview} from '@/models/store.model.ts';

export default defineComponent({
  name: '',
  
  props: {
    review: Object as PropType<ProductReview>
  },
  
  data: () => ({
    showMore: false,
    showMoreResponse: false,
  }),
  
  methods: {
    kitcut(text: string, limit: number) {
      text = text.trim();
      if (text.length <= limit) return text;
      
      text = text.slice( 0, limit);
      let lastSpace = text.lastIndexOf(" ");
      if (lastSpace > 0) {
        text = text.substr(0, lastSpace);
      }
      return text + "...";
    },
    
    reviewShowMoreFunc() {
      this.showMore = !this.showMore
    },
    
    reviewResponseShowMoreFunc() {
      this.showMoreResponse = !this.showMoreResponse
    },
  },
  
})

</script>

<style scoped lang="scss">

.review {
  &__header {
    display: flex;
    align-items: center;
    
    &__info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 35px;
    }
    
    &__wrapper {
      display: flex;
      align-items: center;
    }
  }
  
  &__avatar {
    position: relative;
    
    margin-right: 10px;
    height: 32px;
    width: 32px;
  }
  
  &__name {
    margin-right: 5px;
    
    font-size: 13px;
    font-family: "SF Pro Text Medium", sans-serif;
    line-height: 1;
  }
  
  &__rating {
    display: flex;
    align-items: center;
    padding: 1px 6px 1px 1px;
    border-radius: 15px;
    
    font-size: 8px;
    font-family: "SF Pro Text Medium", sans-serif;
    line-height: 1;
    
    background-color: theme-var($--user-rating-color);
    
    div {
      padding: 4px 7px 5px;
      border-radius: 15px;
      
      color: #ffffff;
      background-color: #8D78FF;
    }
    
    span {
      margin-left: 6px;
      
      color: #7D7D85;
    }
  }
  
  &__id {
    font-size: 13px;
    line-height: 1;
    
    color: #888888;
  }
  
  &__message {
    &__wrapper {
      margin-top: 10px;
    }
    
    position: relative;
    
    &__text {
      font-size: 13px;
      line-height: 16px;
    }
    
    &__show-more {
      position: absolute;
      right: 0;
      bottom: -2px;
      border-bottom: 1px dashed #CFCFD1;
      
      font-size: 13px;
      
      color: theme-var-tg(--tg-theme-button-color, $--tg-button-color);
    }
    
    &--show {
      padding-bottom: 20px;
    }
    
    &__reply {
      margin-top: 5px;
      
      font-size: 12px;
      font-family: "SF Pro Text Medium";
      
      color: theme-var-tg(--tg-theme-button-color, $--tg-button-color);
      
      cursor: pointer;
      
      span {
        margin-left: 5px;
      }
      
      svg {
        transform: scaleX(-1)
      }
    }
  }
  
  &__response {
    margin-top: 10px;
    margin-left: 10px;
    padding-left: 10px;
    border-left: 1px rgba(4, 119, 255, 0.20) solid;
    
    .review__header__info {
      height: 32px;
    }
    
    .review__message {
      margin-top: 10px;
    }
  }
}

</style>