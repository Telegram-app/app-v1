<template>
  <div class="message__reactions">
    <span class="message__reactions__likes">
      Кто-то лайкнул это сообщение
    </span>
    <span class="message__reactions__replies">
      Кто-то ответил на это сообщение
    </span>
  </div>
</template>

<script lang="ts">

import { defineComponent } from "vue";

export default defineComponent({
  name: 'ChatMessageReactions',
  
  props: [],
  
  data: () => ({
  
  }),
  
  computed: {
  
  },
  
})

</script>

<style scoped lang="scss">

.message__reactions {
  display: flex;
  flex-direction: column;
  
  &__likes, &__replies {
    display: flex;
    align-items: center;
    height: 20px;
    
    font-size: 13px;
    line-height: 1;
    
    color: theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
  }
}

</style>