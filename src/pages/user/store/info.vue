<template>
  <RouterView/>
</template>

<script lang="ts">

import { defineComponent } from "vue";
import {useUserStore} from '@/stores/user.ts';

export default defineComponent({
  name: '',
  
  props: [],
  
  data: () => ({
  
  }),
  
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