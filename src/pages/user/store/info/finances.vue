<template>
  <div class="store-finances">
    <div class="store-finances__balance">
      <span class="store-finances__balance__count">28,566$</span>
      <span class="store-finances__balance__title">Balance</span>
    </div>
    
    <div class="store-finances__address">
      <span>0QB84Y-BrKSiac2ifKz8L1cMeHYZwBq-9cFs2ESwXyx_Xmd</span>
    </div>
    
    <div class="store-finances__table__header">
      <span class="store-finances__table__header__title caption">Transaction history</span>
      <div class="store-finances__table__header__filters">
        <span class="store-finances__table__header__filters__item">Type <IconSorting w="7" h="4.67"/></span>
        <span class="store-finances__table__header__filters__item">Type <IconSorting w="7" h="4.67"/></span>
      </div>
    </div>
    
    <div class="b-table" :class="{'is-loading table--blur': loading}">
      <div class="table-wrapper">
        <table class="store-finances__table table is-fullwidth">
          <tbody class="store-finances__table__body">
          
          <!--          loading-->
          <!--          <tr v-for="i of 6" :key="'stub-' + i" v-if="loading && !sortedUsernames.length">-->
          <tr class="store-finances__table__body__day"><td><span class="caption">Today</span></td><td></td><td></td></tr>
          <tr v-for="i of 2" :key="'stub-' + i">
            <td>
              <div class="store-finances__table__body__icon">
                <div>
                  <img src="/images/icons/selfStore/transaction-accepted.svg" alt="icon">
                </div>
              </div>
            </td>
            <td>
              <div class="store-finances__table__body__market store-finances__table__body__stat">
                <span>100</span>
                <span>100%</span>
              </div>
            </td>
            <td>
              <div class="store-finances__table__body__store store-finances__table__body__stat">
                <span>100</span>
                <span>100%</span>
              </div>
            </td>
          </tr>
          
          <tr class="store-finances__table__body__day"><td><span class="caption">Yesterday</span></td><td></td><td></td></tr>
          <tr v-for="i of 2" :key="'stub-' + i">
            <td>
              <div class="store-finances__table__body__icon">
                <div>
                  <img src="/images/icons/selfStore/transaction-accepted.svg" alt="icon">
                </div>
              </div>
            </td>
            <td>
              <div class="store-finances__table__body__market store-finances__table__body__stat">
                <span>100</span>
                <span>100%</span>
              </div>
            </td>
            <td>
              <div class="store-finances__table__body__store store-finances__table__body__stat">
                <span>100</span>
                <span>100%</span>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<route lang="json">
{
"name": "storeFinances"
}
</route>

<script lang="ts">

import { defineComponent } from "vue";

export default defineComponent({
  name: 'StoreFinancesPage',
  
  props: [],
  
  data: () => ({
    loading: false
  }),
  
  computed: {
  
  },
  
})

</script>

<style scoped lang="scss">

.store-finances {
  &__balance {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 28px;
    
    &__count {
      font-size: 36px;
      font-family: "SF Pro Text Medium", sans-serif;
      line-height: 1;
    
      color: #39BD9F;
      background: linear-gradient(180deg, #39BD9F 0%, #3CB5BF 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    &__title {
      margin-top: 8px;
      
      font-size: 16px;
      font-family: "SF Pro Text Medium", sans-serif;
      line-height: 1;
      text-transform: uppercase;
      
      color: theme-var($--hint-color);
    }
  }
  
  &__address {
    display: flex;
    justify-content: center;
    margin-top: 15px;
    width: 100%;
    padding: 10px 7px;
    border-radius: 10px;
    
    background-color: theme-var-tg(--tg-theme-bg-color, $--tg-bg-color);
    
    span {
      font-size: 11px;
      font-family: "SF Pro Text Semibold", sans-serif;
      line-height: 1;
      
      color: #3ABEA0;
    }
  }
  
  &__table {
    margin-top: 15px;
    background: none;
    
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 15px;
      
      &__title {
      
      }
      
      &__filters {
        display: flex;
        column-gap: 15px;
        
        &__item {
          display: flex;
          align-items: center;
          
          font-size: 12px;
          
          color: #7D7D85;
        }
      }
    }
    
    &__body {
      tr {
        td {
          background: theme-var-tg(--tg-theme-bg-color, $--tg-bg-color);
        }
        
        &:first-child {
          td:first-child {
            border-radius: 10px 0 0 0;
          }
          td:last-child {
            border-radius: 0 10px 0 0;
          }
        }
        
        &:last-child {
          td:first-child {
            border-radius: 0 0 0 10px;
          }
          td:last-child {
            border-radius: 0 0 10px 0;
          }
        }
      }
      
      td {
        vertical-align: middle;
        border-bottom: 1px solid theme-var-tg(--tg-theme-secondary-bg-color, $--tg-secondary-bg-color);
      }
      
      &__day {
        td {
          border-bottom: unset;
          
          span {
            line-height: 1;
          }
        }
      }
    }
  }
}

</style>