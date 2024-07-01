<template>
  <div class="message__actions">
    <div class="message__actions__like">Л</div>
    <div class="message__actions__reply">О</div>
    <div class="message__actions__more">Б</div>
  </div>
</template>

<script lang="ts">

import { defineComponent } from "vue";

export default defineComponent({
  name: 'ChatMessageActions',
  
  props: [],
  
  data: () => ({
  
  }),
  
  computed: {
  
  },
  
})

</script>

<style scoped lang="scss">

.message__actions {
  display: flex;
  align-items: end;
}

</style>