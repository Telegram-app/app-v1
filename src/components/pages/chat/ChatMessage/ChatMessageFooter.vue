<template>
  <div class="message__footer">
    <slot></slot>
  </div>
</template>

<script lang="ts">

import { defineComponent } from "vue";

export default defineComponent({
  name: 'ChatMessageFooter',
  
  props: [],
  
  data: () => ({
  
  }),
  
  computed: {
  
  },
  
})

</script>

<style scoped lang="scss">

.message__footer {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

</style>