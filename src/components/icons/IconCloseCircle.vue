<template>
  <svg
    :style="{ height: h + 'px', width: w + 'px' }"
    :class="['icon', 'icon--' + color]"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="13.5"
      cy="14.5"
      r="12.5"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M13.7037 27.4074C21.2721 27.4074 27.4074 21.2721 27.4074 13.7037C27.4074 6.13536 21.2721 0 13.7037 0C6.13536 0 0 6.13536 0 13.7037C0 21.2721 6.13536 27.4074 13.7037 27.4074ZM19.2137 19.2137C18.4385 19.9889 17.5987 19.5367 17.2757 19.2137L13.7227 15.6607L10.1697 19.2137C9.84673 19.5367 9.00693 19.9889 8.23173 19.2137C7.45653 18.4385 7.90873 17.5987 8.23173 17.2757L11.7847 13.7227L8.23173 10.1697C7.90873 9.84672 7.45653 9.00693 8.23173 8.23173C9.00693 7.45653 9.84673 7.90873 10.1697 8.23173L13.7227 11.7847L17.2757 8.23173C17.5987 7.90873 18.4385 7.45653 19.2137 8.23173C19.9889 9.00693 19.5367 9.84672 19.2137 10.1697L15.6607 13.7227L19.2137 17.2757C19.5367 17.5987 19.9889 18.4385 19.2137 19.2137Z"
    />
    
    <linearGradient id="red-gradient" x1="10" y1="0" x2="10" y2="20">
      <stop stop-color="#FF786A"/>
      <stop offset="1" stop-color="#FF3923"/>
    </linearGradient>
  </svg>

</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'IconCloseCircle',
  
  props: ['h', 'w', 'color']
});
</script>

<style lang="scss" scoped>
.icon {
  circle {
    fill: #FFFFFF;
  }
  
  path {
    fill: #DAE3E9;
  }
  
  &--red-gradient {
    path {
      fill: url(#red-gradient);
    }
  }
}
</style>
