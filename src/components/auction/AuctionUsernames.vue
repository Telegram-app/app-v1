<template>
  <div class="auction-usernames">
    <h1 class="auction-usernames__title">Buy and Sell Usernames</h1>
    
    <p class="auction-usernames__description">
      Secure your name with blockchain in an ecosystem of 700+ million users and assging it as a link for your personal account, channel or group.
      <span class="auction-usernames__description__learn-more">Learn more <IconChevronRight class="auction-usernames__description__learn-more__icon" h="9" w="6"/></span>
    </p>
    
    <div class="auction-usernames__search field">
      <p class="control has-icons-left">
        <input class="input" type="search" placeholder="Enter a Telegram username...">
        <span class="auction-usernames__search__icon">
          <IconSearch h="10" w="9"/>
        </span>
      </p>
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent } from "vue";

export default defineComponent({
  name: '',
  
  props: [],
  
  data: () => ({
  
  }),
  
  computed: {
  
  },
  
})

</script>

<style lang="scss">

.auction-usernames {
  margin-top: 25px;
  
  &__title {
    text-align: center;
    font-size: 20px;
    font-weight: 400;
    line-height: 100%;
  }
  
  &__description {
    margin-top: 10px;
    
    text-align: center;
    font-size: 12px;
    line-height: 18px;
    letter-spacing: -0.2px;
    
    color: var(--tg-theme-hint-color, $tg-hint-color);
    
    &__learn-more {
      display: inline-flex;
      align-items: center;
      
      color: var(--tg-theme-link-color, $tg-link-color);
      
      cursor: pointer;
      
      &__icon {
        margin-top: 3.5px;
        margin-left: 4px;
      }
    }
  }
  &__search {
    margin-top: 22px;
    
    input {
      height: 33px;
      padding-bottom: 7px !important;
      padding-left: 38px !important;
      border: unset;
      border-radius: 5px;
      
      font-size: 12px;
      
      box-shadow: unset;
      
      &::placeholder {
        color: #888888;
      }
      
      &:hover {
        border: unset;
      }
      
      &:focus {
        border: unset;
        
        box-shadow: unset;
      }
      
      &:active {
        border: unset;
        
        box-shadow: unset;
      }
    }
    
    &__icon {
      position: absolute;
      left: 0;
      top: 0;
      
      display: flex;
      align-items: center;
      justify-content: center;
      width: 38px;
      
      height: 33px;
    }
  }
}

</style>