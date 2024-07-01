<template>
  <div class="chat">
    <ChatHeader :title="chatId"/>
    
    <template v-for="i in 5">
      <ChatMessage/>
    </template>
  </div>
</template>

<route lang="json">
{
"name": "chat"
}
</route>

<script lang="ts">

import { defineComponent } from "vue";
import {useRoute} from 'vue-router';

export default defineComponent({
  name: 'ChatPage',
  
  setup() {
    const route = useRoute()
    
    return { route }
  },
  
  computed: {
    chatId() {
      return this.route.params.id
    }
  },
  
})

</script>

<style scoped lang="scss">

.chat {
  padding-top: 32px;
}

</style>