<template>
  <div class="custom-select" :class="{ 'custom-select--open': open }" @blur="open = false">
    <div class="custom-select__selected" @click="open = !open">
      <span class="custom-select__label">{{ label }}</span>
      <span class="custom-select__selected__text">{{ modelValue }}</span>
      <IconSelect h="10" w="11"></IconSelect>
    </div>
    <div class="custom-select__items" :class="{ 'custom-select--hide': !open }">
      <template v-for="(option, i) of options">
        <div
          v-if="option !== modelValue"
          :key="i"
          @click="open = false; $emit('update:modelValue', option);"
        >
          {{ option }}
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent } from "vue";

export default defineComponent({
  name: 'VSelect',
  
  props: {
    modelValue: { type: String },
    label: {
      type: String,
      required: true,
      default: 'label',
    },
    options: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      open: false,
    };
  },
  
})

</script>

<style scoped lang="scss">

.custom-select {
  position: relative;
  
  text-align: left;
  height: 27px;
  padding: 6px 31px 7px 11px;
  border-radius: 10px;
  outline: none;
  
  background-color: #E1E0E6;
  
  &__label {
    font-size: 10px;
    line-height: 1;
    
    color: #7D7D85;
  }
  
  &__selected {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    
    font-size: 13px;
    line-height: 1;
    font-family: "SF Pro Text Medium", sans-serif;
    
    color: var(--tg-theme-text-color, $--tg-text-color);
    
    cursor: pointer;
    user-select: none;
    
    &__text {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      
      color: #000000;
    }
    
    svg {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      
      height: 13px;
      width: 11px;
    }
  }
  
  &--open {
    border-radius: 10px 10px 0 0;
  }
  
  &__items {
    position: absolute;
    top: 40px;
    left: 0;
    right: 0;
    z-index: 1;
    
    border-radius: 0 0 10px 10px;
    overflow: hidden;
    
    background-color: #E1E0E6;
    color: #000000;
    
    div {
      padding: 3px 11px;
      
      font-size: 13px;
      
      cursor: pointer;
      user-select: none;
    }
  }
  
  &--hide {
    display: none;
  }
}

</style>