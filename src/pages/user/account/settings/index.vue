<template>
  <div class="account-settings">
    <div class="self-card">
      <VButton color="blue" @click="$router.push({ name: 'storeInfo' })">My store</VButton>
    </div>
  </div>
</template>

<route lang="json">
{
"name": "accountSettings"
}
</route>

<script lang="ts">

import { defineComponent } from "vue";

export default defineComponent({
  name: 'AccountSettings',
  
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