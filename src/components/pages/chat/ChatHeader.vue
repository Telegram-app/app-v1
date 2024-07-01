<template>
  <div class="chat__header">
    <div class="chat__header__back">
      Иконка
    </div>
    <div class="chat__header__title">
      Chat {{ chatId }}
    </div>
    <div class="chat__header__wrapper">
      <div class="chat__header__notify">Иконка</div>
      <div class="chat__header__settings">Иконка</div>
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent } from "vue";

export default defineComponent({
  name: 'ChatHeader',
  
  props: {
    chatId: {
      type: String || Number
    }
  },
  
  data: () => ({
  
  }),
  
  computed: {
  
  },
  
})

</script>

<style scoped lang="scss">

.chat__header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1000;
  
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 32px;
  padding: 0 10px;
  
  background-color: theme-var-tg(--tg-theme-bg-color, $--tg-bg-color);
  box-shadow: 0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12);
  
  &__back {
    flex: 1;
  }
  
  &__title {
    flex: 0;
    margin-left: auto;
    margin-right: auto;
  }
  
  &__wrapper {
    display: flex;
    justify-content: end;
    align-items: center;
    flex: 1;
  }
  
  &__notify {
  
  }
  
  &__settings {
  
  }
}

</style>