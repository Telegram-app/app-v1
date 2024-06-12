<template>
  <div class="market__footer">
    <div v-for="( position, posIdx ) in data.footerItems">
      <ul class="market__footer__items">
        <li class="market__footer__item" v-for="(item, itemIdx) in position">
          <a class="market__footer__item__title" @click="expandItem($event, posIdx, itemIdx)">{{ item.title }} <span class="market__footer__item__icon" :class="{ 'market__footer__item__icon--expanded': item.expanded }"><IconChevronRight h="10" w="10" color="grey"/></span></a>
          <ul class="market__footer__links" :class="{ 'market__footer__links--expanded': item.expanded }" v-if="item.links[0]">
            <RouterLink
              v-for="(link, linkIdx) in item.links"
              :key="link.title"
              custom
              v-slot="{ navigate }"
              :to="{name: link.to}">
              <li class="market__footer__link" @click="navigate">
                <a class="market__footer__link__title">{{ link.title }}</a>
              </li>
            </RouterLink>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">

import {defineComponent, ref} from 'vue';

interface Data {
  footerItems: {
    title: string;
    links: { title: string; to: any; }[];
    expanded: boolean;
  }[][]
}

const loadData = async () => {
  return new Promise<Data>((resolve) => {
    setTimeout(() => {
      resolve({
        footerItems: [
          [
            {
              title: 'Title',
              links: [
                {title: 'Profile', to: 'account'},
                {title: 'Contact us', to: 'market'},
                {title: 'eBay Returns', to: 'market'},
                {title: 'eBay Money Back', to: 'market'},
              ],
              expanded: false
            },
            {
              title: 'Title 1',
              links: [
                {title: 'Profile', to: 'account'},
                {title: 'Contact us', to: 'market'},
                {title: 'eBay Returns', to: 'market'},
                {title: 'eBay Money Back', to: 'market'},
              ],
              expanded: false
            },
            {
              title: 'Title 2',
              links: [
                {title: 'Announcements', to: 'market'},
                {title: 'eBay Community', to: 'market'},
                {title: 'eBay for Business', to: 'market'},
              ],
              expanded: false
            },
          ],
          [
            {
              title: 'Title 3',
              links: [
                {title: 'Seller center', to: 'market'},
                {title: 'Contact us', to: 'market'},
                {title: 'eBay Returns', to: 'market'},
                {title: 'eBay Money Back', to: 'market'},
              ],
              expanded: false
            },
            {
              title: 'Title 4',
              links: [
                {title: 'Announcements', to: 'market'},
                {title: 'eBay Community', to: 'market'},
                {title: 'eBay for Business', to: 'market'},
              ],
              expanded: false
            }
          ]
        ]
      });
    }, 2000);
  });
};

export default defineComponent({
  name: 'MarketFooter',
  
  async setup() {
    const data = ref(await loadData());
    
    return {data};
  },
  
  methods: {
    expandItem(event: any, posIdx: number, itemIdx: number) {
      this.data.footerItems[posIdx][itemIdx].expanded = !this.data.footerItems[posIdx][itemIdx].expanded
    }
  }
})

</script>

<style scoped lang="scss">

.market__footer {
  display: flex;
  column-gap: 15px;
  
  & > div {
    flex: 1;
  }
  
  &__items {
  
  }
  
  &__item {
    padding: 10px 0;
    border-bottom: 1px solid theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
    
    cursor: pointer;
    
    &__title {
      display: flex;
      justify-content: space-between;
      
      font-size: 13px;
      font-family: "SF Pro Text Medium", sans-serif;
      line-height: 1;
      
      color: theme-var-tg(--tg-theme-text-color, $--tg-text-color);
    }
    
    &__icon {
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
  
  &__links {
    position: relative;
    
    max-height: 0;
    overflow: hidden;
    
    transition: max-height 0.75s;
    
    &--expanded {
      max-height: 500px;
    }
  }
  
  &__link {
    display: flex;
    margin-top: 7px;
    height: auto;
    padding-left: 10px;
    
    &:first-child {
      margin-top: 10px;
    }
    &:last-child {
      margin-bottom: 10px;
    }
    
    &__title {
      font-size: 12px;
      line-height: 1;
      
      color: theme-var-tg(--tg-theme-hint-color, $--tg-hint-color);
      
      cursor: pointer;
    }
  }
}

</style>