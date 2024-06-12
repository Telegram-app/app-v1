<template>
  <div class="store">
<!--    <Transition mode="out-in">-->
<!--      <Suspense>-->
<!--        <template #default>-->
<!--          <VWidget :widget="widget"/>-->
<!--        </template>-->
<!--      </Suspense>-->
<!--    </Transition>-->
<!--    -->
    <Transition mode="out-in">
      <Suspense>
        <template #default>
          <store-header :data="storeHeader"/>
        </template>
        <template #fallback>
          <store-header-skeleton/>
        </template>
      </Suspense>
    </Transition>
<!--    -->
<!--    <Transition mode="out-in">-->
<!--      <Suspense>-->
<!--        <template #default>-->
<!--          <store-filters @pushToCategories="router.push({name: 'categories', params: { id: store.id }})"/>-->
<!--        </template>-->
<!--        -->
<!--        <template #fallback>-->
<!--          <store-filters-skeleton/>-->
<!--        </template>-->
<!--      </Suspense>-->
<!--    </Transition>-->
<!--    -->
<!--    <Transition mode="out-in">-->
<!--      <Suspense>-->
<!--        <template #default>-->
<!--          <store-products :products="store.products" :store="storeProducts"/>-->
<!--        </template>-->
<!--        -->
<!--        <template #fallback>-->
<!--          <store-products-skeleton/>-->
<!--        </template>-->
<!--      </Suspense>-->
<!--    </Transition>-->
  </div>
</template>

<route lang="json">
{
"name": "store"
}
</route>

<script lang="ts">

import {defineComponent} from 'vue';
import {useRouter, useRoute} from 'vue-router';
import {useMarketStore} from '@/stores/market.ts';

import {useFilter} from '@/stores/filters.ts';

export default defineComponent({
  name: 'StorePage',
  
  setup() {
    const router = useRouter();
    const route = useRoute();
    const marketStore = useMarketStore();
    const filterStore = useFilter()
    
    return {router, route, marketStore, filterStore};
  },
  
  data: () => ({
    widget: {
      show: false,
      color: 'blue',
      icon: 'star',
      text: 'First decentralized catalogue'
    },
    pointToShowWidget: 1000
  }),
  
  computed: {
    store() {
      return this.marketStore.findById(Number(this.route.params.id) as number);
    },
    storeHeader() {
      return {
        id: this.store.id,
        image: this.store.image,
        deals: this.store.deals,
        name: this.store.name,
        description: this.store.description
      }
    },
    storeProducts() {
      return {
        id: this.store.id,
        name: this.store.name
      }
    }
  },
  
  methods: {
    showWidget() {
      this.widget.show = this.pointToShowWidget <= window.scrollY;
    },
  },
  
  created() {
    window.addEventListener('scroll', this.showWidget);
  },
  
  unmounted() {
    window.removeEventListener('scroll', this.showWidget);
  },
  
  mounted() {
    if (window.Telegram.WebApp) {
      window.Telegram.WebApp.MainButton.setParams({
        is_active: false,
        is_visible: false
      });
    }
    let hrefScroll = document.querySelector<HTMLElement>('.store__filters__skeleton');
    if (hrefScroll) {
      this.pointToShowWidget = hrefScroll.offsetTop - 45;
    }
  },
  
  watch: {
    'route.query': {
      handler: function (query) {
        if (query.category) {
          this.filterStore.market.selects.category.active = query.category;
        }
      },
      deep: true,
      immediate: true
    }
  }
  
});

</script>

<style scoped lang="scss">

.store {
  &__products {
    margin-top: 15px;
  }
}

</style>