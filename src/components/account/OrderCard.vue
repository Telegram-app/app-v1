<template>
  <div class="account__order__card" :class="['account__order__card--' + color]" v-if="order">
    <div class="is-flex is-flex-direction-column">
      <div class="account__order__card__status">{{ order.status }}</div>
      <div class="account__order__card__product">{{ order.item.name }}</div>
      <div class="account__order__card__info">
        <span class="account__order__card__store-id">{{ order.storeId }}</span>
        ·
        <span class="account__order__card__price">{{ order.item.price }}$</span>
      </div>
      
      <div class="account__order__card__info">
        <span class="account__order__card__date">{{ humanizeDate }}</span>
        ·
        <span class="account__order__card__id">#{{ order.id }}</span>
      </div>
    </div>
    
    <div class="account__order__card__link">
      <IconChevronRight h="11" w="7" color="black" @click="toOrder(order.id, order.item.type)"/>
    </div>
  </div>
</template>

<script lang="ts">

import {defineComponent, type PropType} from 'vue';
import {Order} from '@/stores/user.ts';
import dayjs from 'dayjs';

export default defineComponent({
  name: 'OrderCard',
  
  props: {
    order: Object as PropType<Order>,
    color: String
  },
  
  data: () => ({
  
  }),
  
  computed: {
    humanizeDate() {
      return dayjs(this.order!.date).format('MMMM D, hh:mm A')
    }
  },
  
  methods: {
    toOrder(id: number | string, type: 1 | 2) {
      if (type === 1) this.$router.push({name: 'orderIssuing', params: { id: id }})
      else this.$router.push({name: 'order', params: { id: id }})
    }
  }
  
})

</script>

<style scoped lang="scss">

.account__order__card {
  $self: &;
  
  display: flex;
  justify-content: space-between;
  
  font-size: 12px;
  
  color: theme-var($--dark-text);
  
  &__status {
    font-family: "Helvetica Neue Cyr Medium", "Helvetica Neue", sans-serif;
    font-weight: 400;
    text-transform: uppercase;
  }
  
  &__product {
    font-family: "Helvetica Neue Cyr Medium", "Helvetica Neue", sans-serif;
    font-weight: 400;
    
    color: #ffffff;
  }
  
  &__link {
    margin: auto 0;
    
    cursor: pointer;
  }
  
  &--white {
    #{ $self } {
      &__product {
        color: theme-var-tg(--tg-theme-text-color, $--tg-text-color);
      }
    }
  }
}

</style>