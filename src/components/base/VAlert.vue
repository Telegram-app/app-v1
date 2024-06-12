<template>
  <transition :name="animationType">
    <div v-if="show" class="alert" :class="['alert--' + type]">
      <div class="alert__icon">
        <img :src="'/images/icons/alert/' + type + '.svg'" alt="icon">
      </div>
      
      <span class="alert__text">{{ message }}</span>
    </div>
  </transition>
</template>

<script lang="ts">

import {defineComponent} from 'vue';
import {mapState} from 'pinia';
import {useAlertStore} from '@/stores/alert.ts';

export default defineComponent({
  name: 'VAlert',
  
  props: [],
  
  setup() {
    const alertStore = useAlertStore();
    
    return {alertStore};
  },
  
  data: () => ({}),
  
  computed: {
    ...mapState(useAlertStore, {
      show: (state) => state.show,
      type: (state) => state.type,
      message: (state) => state.message,
    }),
    animationType() {
      let animation = ''
      
      if (this.type === ('success' || 'warning' || 'error')) {
        animation = 'slide'
      } else {
        animation = 'bounce'
      }
      
      return animation
    }
  },
  
});

</script>

<style scoped lang="scss">

.alert {
  position: fixed;
  right: 15px;
  bottom: 15px;
  left: 15px;
  
  display: flex;
  align-items: center;
  height: 40px;
  padding: 11px 17px;
  border-radius: 10px;
  
  &__text {
    font-size: 15px;
    line-height: 1;
  }
  
  &__icon {
    margin-right: 10px;
    height: 20px;
    width: 20px;
    
    img {
      height: 20px;
      width: 20px;
    }
  }
  
  &--success {
    color: theme-var-tg(--tg-theme-button-text-color, $--tg-button-text-color);
    background: linear-gradient(180deg, #3ADB53 0%, #57C268 100%);
  }
  
  &--info {
    color: theme-var-tg(--tg-theme-button-text-color, $--tg-button-text-color);
    background: theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
  }
  
  &--warning {
    color: theme-var-tg(--tg-theme-button-text-color, $--tg-button-text-color);
    background: theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
  }
  
  &--error {
    color: theme-var-tg(--tg-theme-button-text-color, $--tg-button-text-color);
    background: theme-var($--error-color);
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.7s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(200%);
}

.bounce-enter-active,
.bounce-leave-active {
  animation: bounce-in 1s;
}

.bounce-enter-from,
.bounce-leave-to {
  animation: bounce-out 1s;
}

@keyframes bounce-in {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  20% {
    opacity: 1;
    transform: translateY(0);
  }
  25% {
    transform: translateX(-5px);
  }
  30% {
    transform: translateX(5px);
  }
  35% {
    transform: translateX(-4px);
  }
  40% {
    transform: translateX(4px);
  }
  45% {
    transform: translateX(-3px);
  }
  50% {
    transform: translateX(3px);
  }
  55% {
    transform: translateX(-2px);
  }
  60% {
    transform: translateX(2px);
  }
  65% {
    transform: translateX(-1px);
  }
  70% {
    transform: translateX(1px);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes bounce-out {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(200%);
  }
}

</style>