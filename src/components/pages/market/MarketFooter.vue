<template>
  <div class="market__footer">
    <h4 class="market__footer__title" @click="expandAllItems">Оглавление</h4>
    
    <div class="divider"></div>
    
    <div class="market__footer__items__wrapper">
      <div v-for="( position, posIdx ) in data.footerItems">
        <ul class="market__footer__items">
          <li class="market__footer__item" v-for="(item, itemIdx) in position">
            <a class="market__footer__item__title" @click="expandItem($event, posIdx, itemIdx)">{{ item.title }} <span class="market__footer__item__icon" :class="{ 'market__footer__item__icon--expanded': item.expanded }"><IconChevronRight h="10" w="10" color="grey"/></span></a>
            <ul class="market__footer__links" :class="{ 'market__footer__links--expanded': item.expanded }" v-if="item.links[0]">
              <li v-for="link in item.links" :key="link.title" class="market__footer__link" @click="linkTo($event, link.to)" @touchstart="startAnimation" @touchend="linkTo($event, link.to)">
                <span class="market__footer__link__title">{{ link.title }}</span>
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
import {androidClickEffect, androidEndClickEffect, findElement} from '@/utils/androidClickEffect.ts';
import {useRouter} from 'vue-router';

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
              expanded: true
            },
            {
              title: 'Title 1',
              links: [
                {title: 'Profile', to: 'account'},
                {title: 'Contact us', to: 'market'},
                {title: 'eBay Returns', to: 'market'},
                {title: 'eBay Money Back', to: 'market'},
              ],
              expanded: true
            },
            {
              title: 'Title 2',
              links: [
                {title: 'Announcements', to: 'market'},
                {title: 'eBay Community', to: 'market'},
                {title: 'eBay for Business', to: 'market'},
              ],
              expanded: true
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
              expanded: true
            },
            {
              title: 'Title 4',
              links: [
                {title: 'Announcements', to: 'market'},
                {title: 'eBay Community', to: 'market'},
                {title: 'eBay for Business', to: 'market'},
              ],
              expanded: true
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
    const router = useRouter()
    const data = ref(await loadData());
    
    return {router, data};
  },
  
  data: () => ({
    drag: false,
    touchTime: 0,
    touchInterval: 0
  }),
  
  methods: {
    expandItem(e: any, posIdx: number, itemIdx: number) {
      let animatedBox = findElement('market__footer__item__title', e.target)
      androidClickEffect(e, animatedBox, 400)
      androidEndClickEffect()
      
      this.data.footerItems[posIdx][itemIdx].expanded = !this.data.footerItems[posIdx][itemIdx].expanded
    },
    
    async expandAllItems(e: any) {
      let animatedBox = findElement('market__footer__title', e.target)
      androidClickEffect(e, animatedBox, 400)
      androidEndClickEffect()
      
      let mass = this.data.footerItems[0].concat(this.data.footerItems[1])
      let someoneExpand = mass.some(item => {
        return item.expanded === true
      })
      
      this.data.footerItems.forEach(pos => {
        pos.forEach(item => {
          item.expanded = !someoneExpand
        })
      })
    },
    
    startAnimation(e: any) {
      this.touchTime = 0
      this.touchInterval = setInterval(() => {
        this.touchTime = this.touchTime + 10
        if (this.touchTime > 300) {
          clearInterval(this.touchInterval)
        }
      }, 10, true)
      this.drag = false
      let animatedBox = findElement('market__footer__link', e.target)
      androidClickEffect(e, animatedBox, 200)
      androidEndClickEffect()
    },
    linkTo(e: any, routeName: string) {
      if (e.type === 'click') {
        this.router.push({ name: routeName })
        return
      }
      if (!this.drag && this.touchTime <= 300) {
        setTimeout(() => {
          this.router.push({ name: routeName })
        }, 500, true)
      }
    },
  }
})

</script>

<style scoped lang="scss">

.market__footer {
  margin-top: 15px;
  
  &__title {
    position: relative;
    
    margin: -5px;
    padding: 5px;
    border-radius: 6px;
    overflow: hidden;
    
    font-size: 20px;
    line-height: 1;
    
    cursor: pointer;
  }
  
  .divider {
    margin: 5px 0 0;
  }
  
  &__items__wrapper {
    display: flex;
    column-gap: 15px;
    
    & > div {
      flex: 1;
    }
  }
  
  &__item {
    padding: 10px 0;
    border-bottom: 1px solid #e2e2e2;
    
    cursor: pointer;
    
    &__title {
      position: relative;
      
      display: flex;
      justify-content: space-between;
      margin: -5px;
      padding: 5px;
      border-radius: 6px;
      overflow: hidden;
      
      font-size: 13px;
      font-family: "Helvetica Neue Cyr Medium", "Helvetica Neue", sans-serif;
      font-weight: 400;
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
    position: relative;
    
    display: flex;
    height: auto;
    margin: 5px 0 -5px 5px;
    padding: 5px;
    border-radius: 6px;
    overflow: hidden;
    
    &:first-child {
      margin-top: 7px;
    }
    
    &__title {
      font-size: 12px;
      line-height: 1;
      
      color: theme-var-tg(--tg-theme-text-color, $--tg-text-color);
      
      cursor: pointer;
    }
  }
}

</style>