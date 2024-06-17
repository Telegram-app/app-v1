<template>
  <div class="catalog__categories">
    <Transition mode="out-in">
      <Suspense>
        <template #default>
          <catalog-categories-items :sections="sections"/>
        </template>
        
        <template #fallback>
        
        </template>
      </Suspense>
    </Transition>
  </div>
</template>

<route lang="json">
{
"name": "catalogCategories"
}
</route>

<script lang="ts">

import { defineComponent } from "vue";

export default defineComponent({
  name: 'CatalogCategoriesPage',
  
  props: [],
  
  mounted() {
    if (window.Telegram.WebApp) {
      window.Telegram.WebApp.MainButton.setParams({
        is_active: false,
        is_visible: false
      }).onClick(() => {
        return
      });
    }
  },
  
  data: () => ({
    sections: [
      {
        title: 'Секция категорий 1',
        categories: [
          { id: 1, title: 'Категория-1', to: 'category-1', icon: 'bullet.gif' },
          { id: 2, title: 'Категория-2', to: 'category-2', icon: 'phone.gif' },
          { id: 3, title: 'Категория-3', to: 'category-3', icon: 'spider.gif' },
          { id: 4, title: 'Категория-4', to: 'category-4', icon: 'fly.gif' },
          { id: 5, title: 'Категория-5', to: 'category-5', icon: 'store.svg' },
          { id: 6, title: 'Категория-6', to: 'category-6', icon: 'store.svg' },
          { id: 7, title: 'Категория-7', to: 'category-7', icon: 'store.svg' },
          { id: 8, title: 'Категория-8', to: 'category-8', icon: 'store.svg' },
          { id: 9, title: 'Категория-9', to: 'category-9', icon: 'store.svg' },
          { id: 10, title: 'Категория-10', to: 'category-10', icon: 'store.svg' },
          { id: 11, title: 'Категория-11', to: 'category-11', icon: 'store.svg' },
          { id: 12, title: 'Категория-12', to: 'category-12', icon: 'store.svg' },
          { id: 13, title: 'Категория-13', to: 'category-13', icon: 'store.svg' },
          { id: 14, title: 'Категория-14', to: 'category-14', icon: 'store.svg' },
          { id: 15, title: 'Категория-15', to: 'category-15', icon: 'store.svg' },
          { id: 16, title: 'Категория-16', to: 'category-16', icon: 'store.svg' },
        ],
      },
      {
        title: 'Секция категорий 2',
        categories: [
          { id: 17, title: 'Категория-17', to: 'category-17', icon: 'store.svg' },
          { id: 18, title: 'Категория-18', to: 'category-18', icon: 'store.svg' },
          { id: 19, title: 'Категория-19', to: 'category-19', icon: 'store.svg' },
          { id: 20, title: 'Категория-20', to: 'category-20', icon: 'store.svg' },
          { id: 21, title: 'Категория-21', to: 'category-21', icon: 'store.svg' },
          { id: 22, title: 'Категория-22', to: 'category-22', icon: 'store.svg' },
          { id: 23, title: 'Категория-23', to: 'category-23', icon: 'store.svg' },
          { id: 24, title: 'Категория-24', to: 'category-24', icon: 'store.svg' },
        ],
      },
      {
        title: 'Секция категорий 3',
        categories: [
          { id: 25, title: 'Категория-25', to: 'category-25', icon: 'store.svg' },
          { id: 26, title: 'Категория-26', to: 'category-26', icon: 'store.svg' },
          { id: 27, title: 'Категория-27', to: 'category-27', icon: 'store.svg' },
          { id: 28, title: 'Категория-28', to: 'category-28', icon: 'store.svg' },
          { id: 29, title: 'Категория-29', to: 'category-29', icon: 'store.svg' },
          { id: 30, title: 'Категория-30', to: 'category-30', icon: 'store.svg' },
          { id: 31, title: 'Категория-31', to: 'category-31', icon: 'store.svg' },
          { id: 32, title: 'Категория-32', to: 'category-32', icon: 'store.svg' },
        ],
      }
    ]
  }),
  
  computed: {
  
  },
  
})

</script>

<style scoped lang="scss">

.catalog__categories {
  background-color: theme-var-tg(--tg-bg-color, $--tg-bg-color);
  
  margin: -15px;
  min-height: 100vh;
  padding: 15px 15px;
}

</style>