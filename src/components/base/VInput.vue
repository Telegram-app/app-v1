<template>
  <div class="custom-input">
    <label class="custom-input__label">{{ label }}</label>
    <input :placeholder="placeholder" @input="input">
  </div>
</template>

<script lang="ts">

import { defineComponent } from "vue";

export default defineComponent({
  name: 'VInput',
  
  props: {
    modelValue: { type: String },
    label: {
      type: String,
      required: true,
      default: 'Label',
    },
    placeholder: {
      type: String,
      required: true,
      default: '10',
    }
  },
  
  methods: {
    input(event: Event) {
      let target = event.target as HTMLInputElement
      this.$emit('update:modelValue', Number(target.value))
    }
  }
  
})

</script>

<style scoped lang="scss">

.custom-input {
  position: relative;
  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  text-align: left;
  height: 27px;
  padding: 6px 11px 7px 11px;
  border-radius: 10px;
  outline: none;
  
  background-color: #E1E0E6;
  
  &__label {
    font-size: 10px;
    line-height: 1;
    
    color: #7D7D85;
  }
  
  input {
    height: 16px;
    width: 100%;
    border: none;
    padding: 0;
    
    font-size: 13px;
    line-height: 1;
    
    color: #000000;
    background: none;
    
    &::placeholder {
      color: rgba(121, 121, 121, 0.5);
      opacity: 1;
    }
    
    &:focus {
      outline: none;
    }
  }
}

</style>