<template>
  <NotFoundLayout>
    404 - Not found
  </NotFoundLayout>
</template>

<route lang="json">
{
"name": "notFound"
}
</route>

<script lang="ts">


import {defineComponent} from 'vue';

export default defineComponent({
  name: 'NotFound',
  
  mounted() {
    if (window.Telegram.WebApp) {
      window.Telegram.WebApp.MainButton.setParams({
        is_active: false,
        is_visible: false
      });
    }
  },
})

</script>

<style lang="scss">

</style>
