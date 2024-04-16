<template>
  <div class="store-finances">
    <div class="store-finances__balance">
      <span class="store-finances__balance__count">28,566$</span>
      <span class="store-finances__balance__title">Balance</span>
    </div>
    
    <div class="store-finances__address">
      <span>0QB84Y-BrKSiac2ifKz8L1cMeHYZwBq-9cFs2ESwXyx_Xmd</span>
    </div>
    
    <div class="store-finances__transfers__filters">
      <span class="store-finances__transfers__title caption">Transaction history</span>
      <div class="store-finances__transfers__filters__wrapper">
        <span class="store-finances__transfers__filters__item">Type <IconSorting w="7" h="4.67"/></span>
        <span class="store-finances__transfers__filters__item">Type <IconSorting w="7" h="4.67"/></span>
      </div>
    </div>
    
    <div class="store-finances__transfers self-card">
      <template v-for="(acc, i) of sortedTransfers" :key="'acc-' + i">
        <span class="store-finances__transfers__day caption">{{ acc.day }}</span>
        
        <template v-for="(transfer, it) of acc.items" :key="'transfer-' + it">
          <div class="store-finances__transfers__item">
            <div class="store-finances__transfers__item__icon">
              <div>
                <img src="/images/icons/selfStore/transaction-accepted.svg" alt="icon" v-if="transfer.type === 'accepted'">
                <img src="/images/icons/selfStore/transaction-sent.svg" alt="icon" v-if="transfer.type === 'sent'">
              </div>
            </div>
            
            <div class="store-finances__transfers__item__info">
              <div class="store-finances__transfers__item__info__from">
                <span class="store-finances__transfers__item__info__from__name">{{ transfer.from.name }}</span>
                <span class="store-finances__transfers__item__info__from__id">{{ transfer.from.id }}</span>
              </div>
              <span class="store-finances__transfers__item__info__date">{{ formattedDate(transfer.date) }}</span>
              <div class="store-finances__transfers__item__info__order" v-if="transfer.forOrder !== undefined">Payment for order №{{ transfer.forOrder }}</div>
            </div>
            
            <div class="store-finances__transfers__item__sum">
              <span class="store-finances__transfers__item__sum__count">{{ transfer.sum }}</span>
              <span class="store-finances__transfers__item__sum__currency">Toncoin</span>
            </div>
          </div>
          
          <div class="divider" v-if="it + 1 !== acc.items.length"></div>
        </template>
      </template>
    </div>
  </div>
</template>

<route lang="json">
{
"name": "storeFinances"
}
</route>

<script lang="ts">

import {defineComponent} from 'vue';
import dayjs, {Dayjs} from 'dayjs';

interface SortedTransfer {
  day: String;
  items: Transfer[]
}

interface Transfer {
  type: 'accepted' | 'sent';
  from: {
    name: String;
    id: String;
  };
  sum: Number;
  forOrder: undefined | Number;
  date: Dayjs | Date
}

export default defineComponent({
  name: 'StoreFinancesPage',
  
  props: [],
  
  data: () => ({
    loading: false,
    transfers: [
      { type: 'accepted', from: { name: 'Salary', id: 'OS-121424' }, sum: 100, forOrder: 13, date: dayjs() },
      { type: 'accepted', from: { name: 'Salary1', id: 'OS-131424' }, sum: 111, forOrder: undefined, date: dayjs().subtract(3, 'hours') },
      { type: 'sent', from: { name: 'Salary2', id: 'OS-141424' }, sum: 222, forOrder: undefined, date: dayjs().subtract(1, 'day') },
      { type: 'accepted', from: { name: 'Salary3', id: 'OS-151424' }, sum: 333, forOrder: undefined, date: dayjs().subtract(1, 'day') },
      { type: 'accepted', from: { name: 'Salary4', id: 'OS-161424' }, sum: 444, forOrder: undefined, date: dayjs().subtract(2, 'day') },
      { type: 'sent', from: { name: 'Salary5', id: 'OS-171424' }, sum: 555, forOrder: undefined, date: dayjs().subtract(3, 'day') },
      { type: 'accepted', from: { name: 'Salary', id: 'OS-121424' }, sum: 666, forOrder: undefined, date: dayjs().subtract(4, 'day') },
    ] as Transfer[]
  }),
  
  computed: {
    sortedTransfers() {
      let formattedTransfersOfDay = this.transfers.sort((a, b) => {
        return b.date >= a.date ? 1 : -1
      }).reduce((acc: any, item: any) => {
        let day = item.date.format('MMMM') + ' ' + item.date.date()
        
        if (item.date.format('MM-DD') === dayjs().format('MM-DD')) day = 'Today'
        if (item.date.format('MM-DD') === dayjs().subtract(1, 'day').format('MM-DD')) day = 'Yesterday'
        
        if (!acc[day]) {
          acc[day] = { day: day, items: [] };
        }
        
        acc[day].items.push(item);
        
        return acc;
      }, {})
      
      return Object.values(formattedTransfersOfDay) as SortedTransfer[]
    }
  },
  
  methods: {
    formattedDate(date: Dayjs | Date) {
      return dayjs(date).format('MMM DD YYYY, HH:mm')
    }
  }
  
});

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
      
      color: theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
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
  
  &__transfers {
    margin-top: 15px;
    
    .divider {
      margin: 10px -17px;
      width: calc(100% + 34px);
    }
    
    &__filters {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 15px;
      
      &__title {
      
      }
      
      &__wrapper {
        display: flex;
        column-gap: 15px;
      }
      
      &__item {
        display: flex;
        align-items: center;
        
        font-size: 12px;
        
        color: theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
      }
    }
    
    &__day {
      margin: 15px 0;
      
      line-height: 1;
      
      &:first-child {
        margin-top: 0;
      }
    }
    
    &__item {
      display: flex;
      
      &__icon {
        margin-right: 15px;
        height: 35px;
        width: 35px;
      }
      
      &__info {
        display: flex;
        flex-direction: column;
        
        &__from {
          display: flex;
          
          font-size: 16px;
          line-height: 1;
          
          &__name {
            margin-right: 5px;
          }
          
          &__id {
          
          }
        }
        
        &__date {
          margin-top: 5px;
          
          font-size: 12px;
          line-height: 1;
          
          color: theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
        }
        
        &__order {
          display: flex;
          margin-top: 10px;
          padding: 10px;
          border-radius: 10px;
          
          font-size: 12px;
          line-height: 1;
          
          background-color: theme-var-tg(--tg-theme-secondary-bg-color, $--tg-secondary-bg-color);
        }
      }
      
      &__sum {
        display: flex;
        flex-direction: column;
        margin-left: auto;
        
        &__count {
          font-size: 16px;
          line-height: 1;
        }
        
        &__currency {
          margin-top: 5px;
          
          font-size: 12px;
          line-height: 1;
          text-transform: uppercase;
          
          color: theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
        }
      }
    }
  }
}

</style>