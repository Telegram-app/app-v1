<template>
  <div class="message">
    <ChatMessageHeader>
      <ChatMessageContent/>
    </ChatMessageHeader>
    
    <ChatMessageFooter>
      <ChatMessageReactions/>
      <ChatMessageActions/>
    </ChatMessageFooter>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ChatMessage',
});

</script>

<style lang="scss">

.message {
  margin-bottom: 10px !important;
  padding: 8px 5px;
  border-top: 1px solid #000000;
  border-bottom: 1px solid #000000;
  border-radius: 0;
  
  background-color: unset;
}

</style>
