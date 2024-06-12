<template>
  <svg
    :style="{ height: h + 'px', width: w + 'px' }"
    :class="['icon', 'icon--' + color]"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M14.0741 7.49999C14.0741 11.3864 10.9235 14.537 7.03704 14.537C3.15059 14.537 0 11.3864 0 7.49999C0 3.61354 3.15059 0.462952 7.03704 0.462952C10.9235 0.462952 14.0741 3.61354 14.0741 7.49999ZM7.03704 11.4876C6.47407 11.4876 6.33333 11.0185 6.33333 10.7839V8.20369H3.75309C3.51852 8.20369 3.04938 8.06295 3.04938 7.49999C3.04938 6.93703 3.51852 6.79628 3.75309 6.79628H6.33333V4.21604C6.33333 3.98147 6.47407 3.51233 7.03704 3.51233C7.6 3.51233 7.74074 3.98147 7.74074 4.21604V6.79628H10.321C10.5556 6.79628 11.0247 6.93703 11.0247 7.49999C11.0247 8.06295 10.5556 8.20369 10.321 8.20369H7.74074V10.7839C7.74074 11.0185 7.6 11.4876 7.03704 11.4876Z"
      fill="url(#paint0_linear_5_1655)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_5_1655"
        x1="7.03704"
        y1="0.462952"
        x2="7.03704"
        y2="14.537"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#4CB2FF"/>
        <stop offset="1" stop-color="#34A6FF"/>
      </linearGradient>
    </defs>
  </svg>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'IconAdd',
  
  props: ['h', 'w', 'color']
});
</script>

<style lang="scss" scoped>
.icon {
  path {
  
  }
}
</style>
