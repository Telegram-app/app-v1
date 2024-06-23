<template>
  <transition>
    <router-view v-slot="{ Component }">
      <transition>
        <component :is="Component" />
      </transition>
    </router-view>
  </transition>
</template>

<script lang="ts">

import { defineComponent } from "vue";
import {useUserStore} from '@/stores/user.ts';

export default defineComponent({
  name: '',
  
  props: [],
  
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
  
  },
  
  beforeRouteEnter(to, from, next) {
    if (useUserStore().selfStore.created) {
      next();
    } else if (useUserStore().selfStore.subscription.has) {
      next({name: 'createStore'});
    } else {
      next({name: 'subscription'});
    }
  },
  
})

</script>

<style scoped lang="scss">



</style>