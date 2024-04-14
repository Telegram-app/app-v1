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
  
  computed: {
  
  },
  
})

</script>

<style scoped lang="scss">



</style>