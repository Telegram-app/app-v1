<template>
  <div class="product__info__skeleton">
    <div class="product__description__skeleton">
      <span class="skeleton-gradient-animation"></span>
      <div>
        <div v-for="i of 4" class="skeleton-gradient-animation"></div>
      </div>
    </div>
    
    <div class="divider"></div>
    
    <div class="product__store-info__skeleton">
      <div>
        <span class="skeleton-gradient-animation"></span>
        <span class="skeleton-gradient-animation"></span>
      </div>
      <div>
        <span class="skeleton-gradient-animation"></span>
        <span class="skeleton-gradient-animation"></span>
      </div>
    </div>
    
    <div class="divider"></div>
    
    <div class="product__chars__skeleton">
      <span class="skeleton-gradient-animation"></span>
      <div v-for="i of 2">
        <span class="skeleton-gradient-animation"></span>
        <div></div>
        <span class="skeleton-gradient-animation"></span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent } from "vue";

export default defineComponent({
  name: '',
  
  props: [],
  
  data: () => ({
  
  }),
  
  computed: {
  
  },
  
})

</script>

<style scoped lang="scss">

.product__info__skeleton {

}

.product__description__skeleton {
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  
  span {
    height: 12px;
    width: 30%;
  }
  
  & > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 10px;
    height: 64px;
    
    div {
      height: 10px;
      width: 100%;
      
      &:last-child {
        width: 40%;
      }
    }
  }
}

.product__store-info__skeleton {
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  margin-top: 15px;
  
  div {
    display: flex;
    
    span {
      height: 12px;
      width: 40px;
      
      &:last-child {
        margin-left: 4px;
      }
    }
  }
}

.product__chars__skeleton {
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  
  & > span {
    height: 12px;
    width: 30%;
  }
  
  div {
    display: flex;
    margin-top: 10px;
    width: 100%;
    
    span {
      height: 10px;
      
      &:first-child {
        width: 15%;
      }
      
      &:last-child {
        width: 25%;
      }
    }
    
    div {
      margin: auto 4px 4px 4px;
      width: 40%;
      
      border-bottom: 1px dashed theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
    }
  }
}

</style>