<template>
  <div class="market__footer__skeleton">
    <span class="skeleton-gradient-animation"></span>
    
    <div class="divider"></div>
    
    <div class="market__footer__skeleton__wrapper">
      <div v-for="i in 2">
        <ul>
          <li v-for="item in i === 1 ? 3 : 2">
            <span class="skeleton-gradient-animation"></span>
            <ul>
              <li v-for="i of 4">
                <span class="skeleton-gradient-animation"></span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import {defineComponent, ref} from 'vue';

export default defineComponent({
  name: 'MarketFooterSkeleton'
})

</script>

<style scoped lang="scss">

.market__footer__skeleton {
  margin-top: 15px;
  
  & > span {
    display: flex;
    height: 20px;
    width: 40%;
    border-radius: 8px;
  }
  
  .divider {
    margin: 5px 0 0;
  }
  
  &__wrapper {
    display: flex;
    column-gap: 15px;
    
    div {
      flex: 1;
      
      & > ul {
        & > li {
          padding: 10px 0;
          border-bottom: 1px solid theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
          
          & > span {
            display: flex;
            height: 13px;
            width: 50%;
            border-radius: 8px;
          }
          
          ul {
            display: flex;
            flex-direction: column;
            
            li {
              margin-left: 5px;
              padding: 5px;
              
              &:first-child {
                margin-top: 7px;
              }
              
              &:last-child {
                padding-bottom: 0;
              }
              
              span {
                display: flex;
                height: 12px;
                width: 60%;
                border-radius: 8px;
              }
            }
          }
        }
      }
    }
  }
}

</style>