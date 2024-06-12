<template>
  <div class="widget" :class="[ { 'widget--show': widget.show }, `widget--${widget.color}` ]">
    <IconStar v-if="widget.icon === 'star'" h="12" w="12"/>
    <span class="widget__text">{{ widget.text }}</span>
  </div>
</template>

<script lang="ts">

import {defineComponent, type PropType, ref} from 'vue';

interface Widget {
  show: boolean;
  color: string;
  icon: string;
  text: string;
}

const loadWidget = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 2000)
  })
}

export default defineComponent({
  name: 'VWidget',
  
  props: {
    widget: {
      type: Object as PropType<Widget>,
      required: true
    }
  },
  
  async setup() {
    const load = ref(await loadWidget())
    
    return { load };
  }
})

</script>

<style scoped lang="scss">

.widget {
  position: fixed;
  top: -100%;
  right: 0;
  left: 0;
  z-index: 100;
  
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 11px 0;
  
  font-size: 15px;
  font-family: "SF Pro Text Semibold", sans-serif;
  
  background: linear-gradient(270deg, rgba(105, 189, 254, 0.70) 0%, #4D98FD 100%);
  
  transition: 0.6s all;
  
  &__text {
    margin-left: 5px;
    
    color: #ffffff;
  }
  
  &--show {
    top: 0;
  }
}

</style>