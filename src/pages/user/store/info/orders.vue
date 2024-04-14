<template>
  <div>Store orders</div>
</template>

<script lang="ts">

import { defineComponent } from "vue";

export default defineComponent({
  name: 'StoreOrdersPage',
  
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
  
})

</script>

<style scoped lang="scss">



</style>