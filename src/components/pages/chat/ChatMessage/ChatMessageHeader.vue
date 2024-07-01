<template>
  <div class="message__header">
    <div class="message__header__avatar">
      <img src="/images/chat/avatar.jpg" alt="avatar">
    </div>
    <div>
      <div class="message__header__wrapper">
        <span class="message__header__online"></span>
        <span class="message__header__username">Username</span>
        <span class="message__header__date">16.03.2024</span>
      </div>
      
      <slot></slot>
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

<style scoped lang="scss">

.message__header {
  display: flex;
  
  &__avatar {
    position: relative;
    
    margin-right: 10px;
    min-height: 50px;
    max-height: 50px;
    min-width: 50px;
    max-width: 50px;
    
    img {
      height: 100%;
      width: 100%;
      border-radius: 100%;
      object-fit: cover;
    }
  }
  
  &__wrapper {
    display: flex;
    align-items: center;
    height: 25px;
  }
  
  &__online {
    margin-right: 4px;
    height: 8px;
    width: 8px;
    border-radius: 100%;
    
    background-color: #4caf50
  }
  
  &__username {
    margin-right: 8px;
    
    font-size: 14px;
    line-height: 1;
    font-family: "Helvetica Neue Cyr Bold", Helvetica Neue, sans-serif;
  }
  
  &__date {
    margin-top: 1px;
    
    font-size: 13px;
    line-height: 1;
    
    color: theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
  }
}

</style>