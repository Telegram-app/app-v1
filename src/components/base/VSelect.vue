<template>
  <div class="custom-select" :class="{ 'custom-select--open': open, 'custom-select__type--2': type === 2, 'custom-select__type--3': type === 3 }">
    <div v-if="type === 1" class="custom-select__type--1__selected" @click="$emit('open')">
      <span class="custom-select__type--1__label">{{ label }}</span>
      <span class="custom-select__type--1__selected__text">{{ modelValue }}</span>
      <IconSelect h="13" w="11"></IconSelect>
    </div>
    
    <div v-if="type === 2" class="custom-select__type--2__selected" @click="$emit('open')">
      <span class="custom-select__type--2__label" v-if="modelValue === 'All'">{{ label }}</span>
      <span class="custom-select__type--2__selected__text" v-else>{{ modelValue }}</span>
      <div class="custom-select__type--2__icon">
        <IconSorting h="5" w="7"></IconSorting>
      </div>
    </div>
    
    <div v-if="type === 3" class="custom-select__type--3__selected">
      <span class="custom-select__type--3__label" v-if="modelValue === 'All'">{{ label }}</span>
      <span class="custom-select__type--3__selected__text" v-else>{{ modelValue }}</span>
      <div class="custom-select__type--3__icon">
        <IconArrowDown h="4" w="4"></IconArrowDown>
      </div>
    </div>
    
    <OnClickOutside @trigger="$emit('close')">
      <div ref="selectMenu" class="custom-select__items" :class="{ 'custom-select--hide': !open, 'custom-select__type--2__items': type === 2 }">
        <template v-for="(option, i) of options">
          <div
            v-if="option !== modelValue"
            :key="i"
            @click="$emit('close'); $emit('update:modelValue', option);"
          >
            {{ option }}
          </div>
        </template>
      </div>
    </OnClickOutside>
  </div>
</template>

<script lang="ts">

import {defineComponent} from 'vue';
import {OnClickOutside} from '@vueuse/components';
import IconArrowDown from '@/components/icons/IconArrowDown.vue';

export default defineComponent({
  name: 'VSelect',
  
  components: {IconArrowDown, OnClickOutside},
  
  props: {
    type: Number,
    modelValue: {type: String},
    label: {
      type: String,
      required: true,
      default: 'label',
    },
    options: Array,
    open: Boolean
  },
  
  mounted() {
  
  },
  
});

</script>

<style scoped lang="scss">

.custom-select {
  position: relative;
  
  text-align: left;
  height: 27px;
  padding: 6px 31px 7px 11px;
  border-radius: 10px;
  outline: none;
  
  background-color: theme-var($--card-bg-color);
  
  &__type--1 {
    &__label {
      font-size: 10px;
      line-height: 1;
      
      color: theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
    }
    
    &__selected {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      
      font-size: 13px;
      line-height: 1;
      font-family: "Helvetica Neue Cyr Medium", "Helvetica Neue", sans-serif;
      font-weight: 400;
      
      color: theme-var-tg(--tg-theme-text-color, $--tg-text-color);
      
      cursor: pointer;
      user-select: none;
      
      &__text {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        
        color: theme-var-tg(--tg-theme-text-color, $--tg-text-color);
      }
      
      svg {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
  
  &__type--2 {
    height: 25px;
    padding: 5px 29px 5px 17px;
    text-align: center;
    
    border-radius: 20px;
    
    &__label {
      font-size: 12px;
      line-height: 1;
      
      color: theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
    }
    
    &__selected {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
      
      font-size: 12px;
      line-height: 1;
      
      color: theme-var-tg(--tg-theme-text-color, $--tg-text-color);
      
      cursor: pointer;
      user-select: none;
      
      &__text {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        
        color: theme-var-tg(--tg-theme-text-color, $--tg-text-color);
      }
    }
    
    &__icon {
      position: absolute;
      right: 17px;
      top: 50%;
      transform: translateY(-50%);
    }
    
    &__items {
      top: 25px !important;
      
      div {
        font-size: 12px !important;
      }
    }
  }
  
  &__type--3 {
    height: 12px;
    padding: unset;
    border-radius: unset;
    
    background: none;
    
    &__label {
      font-size: 12px;
      line-height: 1;
      
      color: theme-var-tg(--tg-theme-text-color, $--tg-text-color);
    }
    
    &__selected {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
      
      font-size: 12px;
      line-height: 1;
      
      color: theme-var-tg(--tg-theme-text-color, $--tg-text-color);
    }
    
    &__icon {
      margin-left: 5px;
      margin-bottom: 2px;
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
    
    background-color: theme-var($--card-bg-color);
    color: theme-var-tg(--tg-theme-text-color, $--tg-text-color);
    
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