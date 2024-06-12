<template>
  <Transition mode="out-in">
    <Suspense>
      <template #default>
        <store-categories @pushToCategory="pushToCategory"/>
      </template>
      
      <template #fallback>
        <store-categories-skeleton/>
      </template>
    </Suspense>
  </Transition>
</template>

<route lang="json">
{
"name": "categories"
}
</route>

<script lang="ts">

import {defineComponent} from 'vue';
import {useRouter} from 'vue-router';

export default defineComponent({
  name: 'CategoriesPage',
  
  setup() {
    const router = useRouter()
    
    return { router }
  },
  
  mounted() {
    if (window.Telegram.WebApp) {
      window.Telegram.WebApp.MainButton.setParams({
        is_active: false,
        is_visible: false
      });
    }
  },
  
  methods: {
    pushToCategory(category: string) {
      this.router.push({ name: 'store', query: { category } })
    }
  }
  
});

</script>

<style scoped lang="scss">



</style>