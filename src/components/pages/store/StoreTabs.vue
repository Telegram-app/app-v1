<template>
  <div class="tabs store__tabs">
    <ul>
      <RouterLink
          v-for="(link, i) of links"
          :key="link.title"
          custom
          :to="link.to">
        <li @click.prevent="i !== selectedLink ? selectLink($event.target, i, link) : null" class="store__tabs__link"
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
    this.selectLinkAnimation(document.querySelector('.store__tabs__link--active'))
  },

  data: () => ({
    selectedLink: 0,
    linksDisabled: false
  }),

  methods: {
    selectLink(target: any, index: number, link: { title: string; to: string }) {
      if (this.linksDisabled) return
      this.linksDisabled = true

      this.selectedLink = index

      this.$emit('pushTo', link.to)

      this.selectLinkAnimation(target)
    },

    selectLinkAnimation(newActiveLink: any) {
      let lastActiveLink = document.querySelector('.store__tabs__link--active') as HTMLLIElement | null

      const linksLine = document.querySelector('.store__tabs__line') as HTMLDivElement | null

      if (lastActiveLink !== null && newActiveLink !== null && linksLine !== null) {
        let lastActiveLinkRect = lastActiveLink.getBoundingClientRect()
        let newActiveLinkRect = newActiveLink.getBoundingClientRect()
        let linkLineRect = linksLine.getBoundingClientRect()

        if (newActiveLinkRect.left >= lastActiveLinkRect.left) {
          linksLine.style.width = (newActiveLinkRect.left - linkLineRect.left) + newActiveLinkRect.width + 'px'
          linksLine.style.left = newActiveLinkRect.left + 'px'
          linksLine.style.width = newActiveLinkRect.width + 'px'
        } else {
          linksLine.style.left = newActiveLinkRect.left + 'px'
          linksLine.style.width = linkLineRect.left - newActiveLinkRect.left + linkLineRect.width + 'px'

          linksLine.style.width = newActiveLinkRect.width + 'px'
        }

        setTimeout(() => {
          this.linksDisabled = false
        }, 300)
      }
    }
  }
});

</script>

<style scoped lang="scss">

.store__tabs {
  position: relative;

  margin: 30px -15px 0 -15px;
  padding-top: 10px;
  border-bottom: 0.5px solid theme-var-tg(--tg-theme-link-color, $--tg-link-color);

  background-color: theme-var-tg(--tg-theme-bg-color, $--tg-bg-color);

  ul {
    justify-content: center;
    align-items: start;
    column-gap: 40px;
    height: 30px;
    border: unset;
  }

  &__link {
    position: relative;

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