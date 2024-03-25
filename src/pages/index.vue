<template>
  <DefaultLayout>
  </DefaultLayout>
</template>

<route lang="json">
{
"name": "main"
}
</route>

<script lang="ts">

import {defineComponent} from 'vue';

export default defineComponent({
  name: 'MainPage',
  
  props: [],
  
  data: () => ({}),
  
  beforeRouteEnter(to, from, next) {
    if (to.path === '/') {
      next('/market');
    }
  },
  
  computed: {},
  
});

</script>

<style scoped lang="scss">


</style>