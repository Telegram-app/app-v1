<template>
  <div class="tabs store__tabs">
    <ul>
      <RouterLink
        v-for="(link, i) of links"
        :key="link.title"
        custom
        :to="link.to">
        <li @click.prevent="i !== selectedLink ? selectLink($event, i, link) : null" class="store__tabs__link"
            :class="{'store__tabs__link--active': i === selectedLink }">
          {{ link.title }}
        </li>
      </RouterLink>
    </ul>
    <div class="store__tabs__line"></div>
  </div>
</template>

<script lang="ts">

import {defineComponent, PropType, ref} from 'vue';
import {androidClickEffect, androidEndClickEffect, findElement} from '@/utils/androidClickEffect.ts';

interface Link {
  title: string;
  to: string;
}

const loadHeader = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
};

export default defineComponent({
  name: 'StoreTabs',
  
  props: {
    links: {
      type: Array as PropType<Link[]>,
      required: true
    }
  },
  
  async setup() {
    const load = ref(await loadHeader());
    
    return {load};
  },
  
  mounted() {
    this.changeLinksHeight(document.querySelectorAll('.store__tabs__link'))
    this.selectLinkAnimation(document.querySelector('.store__tabs__link--active'));
  },
  
  data: () => ({
    selectedLink: 0,
    linksDisabled: false
  }),
  
  methods: {
    changeLinksHeight(els: any) {
      els.forEach((el: HTMLElement) => {
        let rects = el.getBoundingClientRect();
        el.style.height = rects.width + 'px'
      })
    },
    
    selectLink(event: any, index: number, link: { title: string; to: string }) {
      if (this.linksDisabled) return;
      let animatedBox = findElement('store__tabs__link', event.target);
      androidClickEffect(event, animatedBox, 100);
      androidEndClickEffect();
      
      this.linksDisabled = true;
      
      this.selectedLink = index;
      
      this.$emit('pushTo', link.to);
      
      this.selectLinkAnimation(event.target);
    },
    
    selectLinkAnimation(newActiveLink: any) {
      let lastActiveLink = document.querySelector('.store__tabs__link--active') as HTMLLIElement | null;
      
      const linksLine = document.querySelector('.store__tabs__line') as HTMLDivElement | null;
      
      if (lastActiveLink !== null && newActiveLink !== null && linksLine !== null) {
        let newActiveLinkRect = newActiveLink.getBoundingClientRect();
        
        linksLine.style.left = newActiveLinkRect.left + 17 + 'px';
        linksLine.style.width = newActiveLinkRect.width - (17 * 2) + 'px';
        
        setTimeout(() => {
          this.linksDisabled = false;
        }, 300);
      }
    }
  }
});

</script>

<style scoped lang="scss">

.store__tabs {
  position: relative;
  
  margin: 0 -15px;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.2);
  
  ul {
    justify-content: center;
    align-items: start;
    column-gap: 15px;
    height: 35px;
    border: unset;
  }
  
  &__link {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 17px 9px;
    border-radius: 100%;
    overflow: hidden;
    
    font-size: 13px;
    
    cursor: pointer;
    
    &--active {
      color: theme-var-tg(--tg-theme-link-color, $--tg-link-color);
    }
  }
  
  &__line {
    position: absolute;
    bottom: 0;
    left: 0;
    
    height: 4px;
    border-radius: 6px 6px 0 0;
    
    background-color: theme-var-tg(--tg-theme-link-color, $--tg-link-color);
    
    transition: all 0.2s;
  }
}
</style>