<template>
  <div>USER PAGE</div>
</template>

<script lang="ts">

import { defineComponent } from "vue";

export default defineComponent({
  name: '',
  
  props: [],
  
  beforeRouteEnter(to, from, next) {
    if (to.path === '/user') {
      next('/user/profile');
    }
  },
  
  data: () => ({
  
  }),
  
  computed: {
  
  },
  
})

</script>

<style scoped lang="scss">



</style>