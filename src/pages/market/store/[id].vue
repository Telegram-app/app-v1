<template>
  <div class="store">
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
    
    <div class="bg-color">
      <Transition mode="out-in">
        <Suspense>
          <template #default>
            <store-tabs :links="links" @pushTo="pushTo"/>
          </template>
          
          <template #fallback>
            <store-tabs-skeleton/>
          </template>
        </Suspense>
      </Transition>
      
      <router-view v-slot="{ Component }">
        <component :is="Component"/>
      </router-view>
    </div>
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
    const filterStore = useFilter();
    
    return {router, route, marketStore, filterStore};
  },
  
  data: () => ({
    widget: {
      show: false,
      color: 'blue',
      icon: 'star',
      text: 'First decentralized catalogue'
    },
    pointToShowWidget: 1000,
    links: [
      {title: 'Товары', to: 'storeProducts'},
      {title: 'Активность', to: 'activity'},
      {title: 'Отзывы', to: 'reviews'},
    ]
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
      };
    },
    storeProducts() {
      return {
        id: this.store.id,
        name: this.store.name
      };
    }
  },
  
  methods: {
    showWidget() {
      this.widget.show = this.pointToShowWidget <= window.scrollY;
    },
    
    pushTo(to: string) {
      if (to === 'storeProducts') {
        this.router.push({name: to});
      } else {
        console.log(to);
      }
    }
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>