<template>
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
    
    <NotWebAppButton @click="$emit('done')" v-if="notAWebApp && show">DONE</NotWebAppButton>
  </div>
</template>

<script lang="ts">

import { defineComponent } from "vue";

export default defineComponent({
  name: 'Feedback',
  
  props: ['notAWebApp', 'show'],
  
})

</script>

<style scoped lang="scss">

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
    
    background-color: theme-var-tg(--tg-theme-secondary-bg-color, $--tg-secondary-bg-color);
  }
  
  &__title {
    margin-top: 10px;
    
    font-size: 15px;
    font-family: "SF Pro Text Medium", sans-serif;
    line-height: 1;
    
    color: theme-var-tg(--tg-theme-button-color, $--tg-button-color);
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
        
        color: theme-var-tg(--tg-theme-text-color, $--tg-text-color);;
        background-color: theme-var-tg(--tg-theme-secondary-bg-color, $--tg-secondary-bg-color);
        
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
        color: theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
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