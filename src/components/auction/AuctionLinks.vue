<template>
  <div class="tabs auction__links">
    <ul>
      <RouterLink
        v-for="link of links"
        :key="link.title"
        custom
        :to="link.to">
        <li @click.prevent="link.title !== selectedLink.title ? selectLink($event.target, link) : null" class="auction__links__link" :class="{'auction__links__link--active': link.title === selectedLink.title }">
          {{ link.title }}
          <span v-if="link.title === 'Premium'" class="auction__links__link--new" @click.stop>New</span>
        </li>
      </RouterLink>
    </ul>
    <div class="auction__links__line"></div>
  </div>
</template>

<script lang="ts">

import { defineComponent } from "vue"
import {useRouter} from "vue-router"

export default defineComponent({
  name: 'AuctionLinks',
  
  props: ['links'],
  
  setup() {
    const router = useRouter()
    
    return { router }
  },
  
  data: () => ({
    selectedLink: {
      title: 'Usernames',
      to: '/auction/usernames'
    },
    linksDisabled: false
  }),
  
  mounted() {
    this.selectLink(document.querySelector('.auction__links__link--active'), this.selectedLink)
  },
  
  methods: {
    selectLink(target: any, link: { title: string; to: string }) {
      if (this.linksDisabled) return
      this.linksDisabled = true
      
      this.selectedLink = link
      
      this.router.push(link.to)
      
      this.selectLinkAnimation(target)
    },
    
    selectLinkAnimation(newActiveLink: any) {
      let lastActiveLink = document.querySelector('.auction__links__link--active') as HTMLLIElement | null
      
      const linksLine = document.querySelector('.auction__links__line') as HTMLDivElement | null
      
      if (lastActiveLink !== null && newActiveLink !== null && linksLine !== null) {
        let lastActiveLinkRect = lastActiveLink.getBoundingClientRect()
        let newActiveLinkRect = newActiveLink.getBoundingClientRect()
        let linkLineRect = linksLine.getBoundingClientRect()
        
        if (newActiveLinkRect.left >= lastActiveLinkRect.left) {
          linksLine.style.width = (newActiveLinkRect.left - linkLineRect.left) + newActiveLinkRect.width + 'px'
          
          setTimeout(() => {
            linksLine.style.left = newActiveLinkRect.left - 15 + 'px'
            linksLine.style.width = newActiveLinkRect.width + 'px'
          }, 200)
        } else {
          linksLine.style.left = newActiveLinkRect.left - 15 + 'px'
          linksLine.style.width = (linkLineRect.left - 15) - (newActiveLinkRect.left - 15) + linkLineRect.width + 'px'
          
          setTimeout(() => {
            linksLine.style.width = newActiveLinkRect.width + 'px'
          }, 200)
        }
        
        setTimeout(() => {
          this.linksDisabled = false
        }, 300)
      }
    }
  }
})

</script>

<style lang="scss">

.auction__links {
  position: relative;
  
  margin-bottom: 25px;
  
  ul {
    align-items: start;
    height: 30px;
    border: unset;
  }
  
  &__link {
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
      color: var(--tg-theme-link-color, $--tg-link-color);
    }
  }
  
  &__line {
    position: absolute;
    bottom: 0;
    left: 0;
    
    height: 4px;
    border-radius: 6px 6px 0 0;
    
    background-color: var(--tg-theme-link-color, $--tg-link-color);
    
    transition: all 0.2s;
  }
}

</style>