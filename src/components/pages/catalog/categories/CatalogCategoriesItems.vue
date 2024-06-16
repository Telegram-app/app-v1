<template>
  <div class="catalog__categories__sections">
    <div class="catalog__categories__section" :class="{ 'catalog__categories__section--expanded': expanded && idx === 0 || idx !== 0 }" v-for="(section, idx) in sections" :key="section.title">
      <a class="catalog__categories__section__button" @touchend="expandSection(idx, $event)">{{ section.title }}<span v-if="idx === 0" class="catalog__categories__section__icon" :class="{ 'catalog__categories__section__icon--expanded': expanded && idx === 0 }"><IconChevronRight h="10" w="10" color="grey"/></span></a>
      
      <div class="catalog__categories__items">
        <div class="catalog__categories__items__category" v-for="category in section.categories" :key="category.id" @click="pushToCategory">
          <div class="catalog__categories__items__category__image__wrapper">
            <img class="catalog__categories__items__category__image" :src="'/images/catalog/categories/' + category.icon" alt="category-image">
          </div>
          <span class="catalog__categories__items__category__name">{{ category.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import {defineComponent, PropType, ref} from 'vue';
import {useRouter} from 'vue-router';
import {androidClickEffect, findElement} from '@/utils/androidClickEffect.ts';

interface Section {
  title: string;
  categories: Category[];
}

interface Category {
  id: string | number;
  title: string;
  to: string;
  icon: string;
}

const loadData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
};

export default defineComponent({
  name: 'CatalogCategoriesItems',
  
  props: {
    sections: {
      type: Array as PropType<Section[]>,
      required: true
    }
  },
  
  async setup() {
    const router = useRouter();
    const data = ref(await loadData());
    
    return {router, data};
  },
  
  data: () => ({
    expanded: true
  }),
  
  methods: {
    pushToCategory(e: any) {
      let animatedBox = findElement('catalog__categories__items__category', e.target)
      androidClickEffect(e, animatedBox, 200)
      
      setTimeout(() => {
        this.router.push({ name: 'catalog' })
      }, 450)
    },
    expandSection(idx: number, e: any) {
      if (idx === 0) {
        let animatedBox = findElement('catalog__categories__section__button', e.target)
        androidClickEffect(e, animatedBox, 400)
        this.expanded = !this.expanded
      }
    }
  }
  
});

</script>

<style scoped lang="scss">

.catalog__categories {
  &__sections {
    display: flex;
    flex-direction: column;
  }
  
  &__section {
    margin-bottom: 20px;
    max-height: 23px;
    overflow: hidden;
    
    transition: max-height 0.5s;
    
    &--expanded {
      max-height: 500px;
      
      transition: max-height 1s ease-in-out;
    }
    
    a {
      position: relative;
      
      display: flex;
      justify-content: space-between;
      padding: 5px;
      border-radius: 4px;
      
      font-size: 13px;
      font-family: "Helvetica Neue Cyr Roman", "Helvetica Neue", sans-serif;
      font-weight: 200;
      line-height: 1;
      
      color: theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
      
      transition: 0.3s all;
      
      overflow: hidden;
      
      .catalog__categories__section__icon {
        svg {
          transform: rotate(90deg);
          
          transition: all 0.15s ease-out;
        }
        
        &--expanded {
          svg {
            transform: rotate(-90deg);
            
            transition: all 0.15s ease-in;
          }
        }
      }
    }
  }
  
  &__items {
    position: relative;
    
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    row-gap: 8px;
    padding: 5px 0 0 0;
    
    &__category {
      position: relative;
      
      display: flex;
      flex-direction: column;
      align-items: center;
      flex-basis: 23%;
      padding: 5px 0;
      border-radius: 4px;
      overflow: hidden;
      
      cursor: pointer;
      
      transition: 0.3s all;
      
      &__image {
        z-index: 2;
        
        height: 40px;
        width: 40px;
        border-radius: 100%;
        
        transition: 0.3s all;
        
        &__wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 50px;
          width: 50px;
          border-radius: 100%;
          
          background: #f3f4f6
        }
      }
      
      &__name {
        margin-top: 5px;
        max-width: 80px;
        text-align: center;
        
        font-size: 12px;
        line-height: 1;
      }
    }
  }
}

</style>