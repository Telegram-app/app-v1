<template>
  <div class="tabs">
    <ul>
      <li
        v-for="title of tabTitles"
        :key="title"
        @click.prevent="selectTab($event, title);"
        class="tabs__tab"
        :class="{'tabs__tab--active': title === selectedTitle }"
      >
        {{ title }}
        <span v-if="title === 'Premium'" class="tabs__tab--new" @click.stop>New</span>
      </li>
    </ul>
    <div class="tabs__line"></div>
  </div>
  <slot></slot>
</template>

<script lang="ts">

import { defineComponent, ref, provide } from "vue"

export default defineComponent({
  name: 'VTabs',
  
  setup(props, { slots }) {
    const tabTitles = ref(slots.default!().map((tab) => tab.props!.title))
    const selectedTitle = ref(tabTitles.value[0])
    
    provide('selectedTitle', selectedTitle)
    
    return {
      tabTitles,
      selectedTitle
    }
  },
  
  data: () => ({
    tabDisabled: false
  }),
  
  mounted() {
    this.selectTab(document.querySelector('.tabs__tab--active'), this.selectedTitle)
  },
  
  methods: {
    selectTab(event: any, title: string) {
      if (this.selectedTitle === title && event.target) return
      
      if (this.tabDisabled) return
      this.tabDisabled = true
      
      this.selectedTitle = title
      
      this.selectTabAnimation(event.target || event)
    },
    
    selectTabAnimation(newActiveTab: any) {
      let lastActiveTab = document.querySelector('.tabs__tab--active') as HTMLLIElement | null
      
      const tabsLine = document.querySelector('.tabs__line') as HTMLDivElement | null
      
      if (lastActiveTab !== null && newActiveTab !== null && tabsLine !== null) {
        let lastActiveTabRect = lastActiveTab.getBoundingClientRect()
        let newActiveTabRect = newActiveTab.getBoundingClientRect()
        let tabLineRect = tabsLine.getBoundingClientRect()
        
        if (newActiveTabRect.left >= lastActiveTabRect.left) {
          tabsLine.style.width = (newActiveTabRect.left - tabLineRect.left) + newActiveTabRect.width + 'px'
          
          setTimeout(() => {
            tabsLine.style.left = newActiveTabRect.left - 15 + 'px'
            tabsLine.style.width = newActiveTabRect.width + 'px'
          }, 200)
        } else {
          tabsLine.style.left = newActiveTabRect.left - 15 + 'px'
          tabsLine.style.width = (tabLineRect.left - 15) - (newActiveTabRect.left - 15) + tabLineRect.width + 'px'
          
          setTimeout(() => {
            tabsLine.style.width = newActiveTabRect.width + 'px'
          }, 200)
        }
        
        setTimeout(() => {
          this.tabDisabled = false
        }, 300)
      }
    }
  }
})

</script>

<style scoped lang="scss">

.tabs {
  position: relative;
  
  margin-bottom: 25px;
  
  ul {
    align-items: start;
    height: 30px;
    border: unset;
  }
  
  &__tab {
    position: relative;
    
    margin-right: 24px;
    
    font-size: 13px;
    
    cursor: pointer;
    
    &--new {
      position: absolute;
      right: -100%;
      
      margin-left: 8px;
      padding: 6px 14px;
      border-radius: 15px;
      
      font-size: 8px;
      line-height: 100%;
      
      color: #ffffff;
      background-color: #51B3FF;
      
      cursor: default;
    }
    
    &--active {
      color: theme-var(--tg-theme-link-color, $--tg-link-color);
    }
  }
  
  &__line {
    position: absolute;
    bottom: 0;
    left: 0;
    
    height: 4px;
    border-radius: 6px 6px 0 0;
    
    background-color: theme-var(--tg-theme-link-color, $--tg-link-color);
    
    transition: all 0.2s;
  }
}

</style>