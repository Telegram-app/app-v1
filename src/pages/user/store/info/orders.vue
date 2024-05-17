<template>
  <div class="store-orders">
    <OrdersLinks :links="links"/>
    
    <transition>
      <RouterView/>
    </transition>
  </div>
</template>

<route lang="json">
{
"name": "storeOrders"
}
</route>

<script lang="ts">

import { defineComponent } from "vue";
import {useRouter} from 'vue-router';

interface Links {
  title: String;
  to: String;
  meta: Number;
}

export default defineComponent({
  name: 'StoreOrdersPage',
  
  props: [],
  
  setup() {
    const router = useRouter()
    
    return { router }
  },
  
  data: () => ({
  
  }),
  
  mounted() {
    if (window.Telegram.WebApp) {
      window.Telegram.WebApp.MainButton.setParams({
        is_active: false,
        is_visible: false
      });
    }
  },
  
  computed: {
    links() {
      return [
        {title: 'Expect attention', to: '/user/store/info/orders/pending', meta: 5},
        {title: 'In process', to: '/user/store/info/orders/process', meta: 1},
        {title: 'Completed', to: '/user/store/info/orders/completed', meta: 10},
      ] as Links[]
    }
  },
  
})

</script>

<style lang="scss">

.store-orders {
  padding-top: 30px;
  
  &__filters {
    display: flex;
    margin-bottom: 15px;
    
    div {
      display: flex;
      align-items: center;
    }
    
    &__item {
      display: flex;
      align-items: center;
      margin-right: 15px;
      
      font-size: 13px;
      line-height: 1;
      
      color: theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
      
      .icon {
        margin-left: 5px;
      }
    }
    
    &__all {
      margin-left: auto;
      
      font-size: 13px;
      line-height: 1;
      
      color: theme-var-tg(--tg-theme-link-color, $--tg-link-color);
    }
  }
  
  .self-card {
    margin-top: 3px;
  }
}

</style>