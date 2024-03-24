<template>
  <transition name="bottom-sheet-outer">
    <div class="bottom-sheet" v-if="modelValue">
      <div class="bottom-sheet__overlay">
        <OnClickOutside @trigger="close()">
          <transition name="bottom-sheet-inner">
            <div class="bottom-sheet__wrapper" v-if="showContent">
              <div class="bottom-sheet__close" @click="close()">
                <IconCloseCircle h="28" w="28"></IconCloseCircle>
              </div>
              <slot></slot>
            </div>
          </transition>
        </OnClickOutside>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">

import {defineComponent} from 'vue';
import {useScrollLock} from '@vueuse/core';
import {OnClickOutside} from '@vueuse/components';
import IconCloseCircle from '@/components/icons/IconCloseCircle.vue';

export default defineComponent({
  name: 'VBottomSheet',
  components: {IconCloseCircle, OnClickOutside},
  
  props: {
    modelValue: Boolean
  },
  
  setup() {
    const isScrollLocked = useScrollLock(document);
    
    return {isScrollLocked};
  },
  
  data: () => ({
    showContent: false
  }),
  
  methods: {
    close() {
      this.showContent = false;
      
      setTimeout(() => {
        this.$emit('update:modelValue', false);
      }, 400);
    }
  },
  
  watch: {
    modelValue: {
      handler(newValue) {
        this.isScrollLocked = newValue;
        
        if (newValue) {
          setTimeout(() => {
            this.showContent = newValue;
          }, 200);
        }
      },
      immediate: true,
      deep: true
    }
  }
  
});

</script>

<style scoped lang="scss">

.bottom-sheet {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  
  &__overlay {
    display: flex;
    flex-direction: column;
    justify-content: end;
    height: 100vh;
    width: 100vw;
    
    background-color: rgba(0, 0, 0, 0.3);
  }
  
  &__wrapper {
    position: relative;
    
    padding: 15px;
    border-radius: 20px 20px 0 0;
    
    background-color: theme-var-tg(--tg-theme-secondary-bg-color, $--tg-secondary-bg-color);
  }
  
  &__close {
    position: absolute;
    right: 15px;
    top: 15px;
    
    height: 28px;
    width: 28px;
    
    cursor: pointer;
  }
}

.bottom-sheet-outer-enter-active,
.bottom-sheet-outer-leave-active {
  transition: all 0.4s ease;
}

.bottom-sheet-outer-enter-from,
.bottom-sheet-outer-leave-to {
  opacity: 0;
}

.bottom-sheet-inner-enter-active,
.bottom-sheet-inner-leave-active {
  transition: all 0.4s ease;
}

.bottom-sheet-inner-enter-from,
.bottom-sheet-inner-leave-to {
  transform: translateY(100%);
}

</style>