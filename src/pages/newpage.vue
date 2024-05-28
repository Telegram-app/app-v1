<template>
  <DefaultLayout>
    <div class="newpage">
      <div class="newpage__filters">
        <div class="newpage__filters--left">
          <VSelect :type="3" v-model="selects.category.active" :label="selects.category.label" :options="selects.category.options" :open="selects.category.open" @open="selects.category.open = !selects.category.open" @close="selects.category.open = false"></VSelect>
          <VSelect :type="3" v-model="selects.city.active" :label="selects.city.label" :options="selects.city.options" :open="selects.city.open" @open="selects.city.open = !selects.city.open" @close="selects.city.open = false"></VSelect>
        </div>
        
        <div class="newpage__filters--right">
          <span>Filters <IconFilters h="11" w="11"/></span>
        </div>
      </div>
      
      <div class="newpage__notify" :class="{ 'newpage__notify--hidden': !notify.show }" id="notify" :style="{ opacity: notify.opacity }">
        <!--        <IconInfo h="40" w="40" color="black"/>-->
        <div>
          <h5 class="newpage__notify__title">Title</h5>
          <p class="newpage__notify__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, labore unde. Autem eaque error id nobis?</p>
        </div>
        <IconClose id="notifyClose" h="18" w="18" color="grey" v-if="notify.close" @click="closeNotify"/>
      </div>
      
      <div class="newpage__notify__effect"></div>
<!--      id="refreshCards"-->
      
      <div class="loading__container">
        <transition name="fade">
          <div class="loading" v-if="isLoading"></div>
        </transition>
      </div>
      
      <div class="newpage__cards">
        <template v-for="card of cards">
          <NewPageCard :card="card"/>
        </template>
      </div>
    </div>
  </DefaultLayout>
</template>

<route lang="json">
{
  "name": "newpage"
}
</route>

<script lang="ts">

import { defineComponent, ref } from "vue";
import dayjs from 'dayjs';

import html2canvas from 'html2canvas';

export default defineComponent({
  name: 'NewPage',
  
  props: [],
  
  setup() {
  
  },
  
  computed: {
  
  },
  
  data: () => ({
    selects: {
      category: {
        open: false,
        active: 'All',
        label: 'Category',
        options: ['All', 'Category 1', 'Category 2', 'Category 3'],
      },
      city: {
        open: false,
        active: 'All',
        label: 'City',
        options: ['All', 'Austin', 'Newark', 'Ontario'],
      },
    },
    notify: {
      show: true,
      opacity: 1,
      close: true
    },
    cards: [
      {
        image: 'first-card.jpg',
        title: 'Bash Scripting on Linux',
        name: 'Learn Linux TV',
        info: {
          countMovies: 18,
          date: dayjs("12-22-2022")
        },
        description: 'The Bash Scripting Essentials series will teach you everything you need to know in order to write effective bash scripts in Linux.',
        styles: {
          bgCard: {
            backgroundColor: '#0f653a'
          },
          gradientCard: {
            background: 'linear-gradient(to bottom, rgba(15,101,58,0.800) 0%, rgba(15,101,58,0.298) 33.000001%, rgba(15,15,15,1.000) 100%)',
          }
        }
      },
      {
        image: 'second-card.jpg',
        title: 'Grand Theft Auto: Celebrating A Decade on YouTube',
        name: 'YouTube',
        info: {
          countMovies: 40,
          date: dayjs("12-5-2023")
        },
        description: 'For over a decade, Grand Theft Auto has thrived on YouTube. And with the latest from Rockstar Games on the horizon, why not take a drive down memory lane?',
        styles: {
          bgCard: {
            backgroundColor: '#653c59'
          },
          gradientCard: {
            background: 'linear-gradient(to bottom, rgba(101,60,89,0.800) 0%, rgba(101,60,89,0.298) 33.000001%, rgba(15,15,15,1.000) 100%)',
          }
        }
      },
      {
        image: 'third-card.jpg',
        title: 'At the peak',
        name: 'YouTube',
        info: {
          countMovies: 15,
          date: dayjs("3-5-2024")
        },
        description: 'Explore new paths with hikers who bring you along for their scenic adventures',
        styles: {
          bgCard: {
            backgroundColor: '#394d59'
          },
          gradientCard: {
            background: 'linear-gradient(to bottom, rgba(57,77,89,0.800) 0%, rgba(57,77,89,0.298) 33.000001%, rgba(15,15,15,1.000) 100%)',
          }
        }
      },
    ],
    // ptr: null,
    isLoading: false,
    pStart: { x: 0, y: 0 },
    pCurrent: { x: 0, y: 0 },
    disableScroll: false,
    scrollHeight: 0,
    scrollPos: 0,
    cardsHeight: 0
  }),
  
  mounted() {
    if (window.Telegram.WebApp) {
      window.Telegram.WebApp.MainButton.setParams({
        is_active: false,
        is_visible: false
      });
    }
    
    if (document.readyState !== 'loading') {
      this.initScrollEvents()
    } else {
      document.addEventListener('DOMContentLoaded', e => this.initScrollEvents(), false)
    }
  },
  
  unmounted() {
    document.removeEventListener("touchstart", e => this.swipeStart(e), false)
    document.removeEventListener("touchmove", e => this.swipe(e), false)
    document.removeEventListener("touchend", e => this.swipeEnd(e), false)
  },
  
  methods: {
    closeNotify(e: Event) {
      let self = e.target! as HTMLElement
      self.parentNode!.removeChild(self)
      
      this.thanosSnap()
    },
    
    thanosSnap() {
      const target = document.querySelector<HTMLElement>("#notify")!
      const childrenDiv = target.children[0] as HTMLElement
      
      childrenDiv.style.paddingRight = '26px'
      const effect = document.querySelector('.newpage__notify__effect') as HTMLElement
      
      const bRect = target.getBoundingClientRect();
      effect.style.left = `${bRect.left - 15}px`;
      effect.style.top = `${bRect.top - 15}px`;
      effect.style.width = `${bRect.width}px`;
      effect.style.height = `${bRect.height}px`;
      
      html2canvas(target, {
        backgroundColor: 'rgba(0, 0, 0, 0.06)'
      }).then(canvas => {
        this.notify.opacity = 0
        const context = canvas.getContext('2d')!;
        const { width, height } = canvas;
        
        // get element imageData
        const imgData = context.getImageData(0, 0, width, height);
            
            // init empty imageData
        const effectImgDatas = [];
        for (let i = 0; i < 32; i++) {
          effectImgDatas.push(context.createImageData(width, height));
        }
        this.sampler(effectImgDatas, imgData, width, height, 32);
            
            // create cloned canvases
        for (let i = 0; i < 32; i++) {
          const canvasClone = canvas.cloneNode() as HTMLCanvasElement;
          
          canvasClone.getContext('2d')!.putImageData(effectImgDatas[i], 0, 0);
          
          
          const transitionDelay = 1.35 * (i / 32);
          canvasClone.style.transitionDelay = `${transitionDelay}s`;
          
          effect.insertAdjacentElement('beforeend', canvasClone);
          
          this.delay(0)
            .then(() => {
              const rotate1 = 15 * (Math.random() - .5);
              const rotate2 = 15 * (Math.random() - .5);
              const fac = 2 * Math.PI * (Math.random() - .5);
              const translateX = 60 * Math.cos(fac);
              const translateY = 30 * Math.sin(fac);
              
              canvasClone.style.transform = `rotate(${rotate1}deg) translate(${translateX}px, ${translateY}px) rotate(${rotate2}deg)`;
              canvasClone.style.opacity = '0';
              
              const removeDelay = 1e3 * (1.5 + 1 + Math.random());
              
              this.delay(removeDelay - 1000).then(() => { this.notify.show = false })
              
              this.delay(removeDelay)
                .then(() => {
                  canvasClone.remove();
                });
            });
        }
      })
    },
    
    sampler(imgDatas: any, sourceImgData: any, width: any, height: any, layerCount: any) {
      for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
          for (let l = 0; l < 2; l++) {
            // random piece index which tend to grow with x
            const pieceIndex = Math.floor(layerCount * (Math.random() + 2 * x / width) / 3);
            const pixelPos = 4 * (y * width + x);
            for (let rgbaIndex = 0; rgbaIndex < 4; rgbaIndex++) {
              const dataPos = pixelPos + rgbaIndex;
              imgDatas[pieceIndex].data[dataPos] = sourceImgData.data[dataPos];
            }
          }
        }
      }
    },
    
    delay(ms: number) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(1)
        }, ms);
      })
    },
    
    initScrollEvents() {
      // this.reCalc()
      
      document.addEventListener("touchstart", e => this.swipeStart(e), false)
      document.addEventListener("touchmove", e => this.swipe(e), false)
      document.addEventListener("touchend", e => this.swipeEnd(e), false)
      
      // document.addEventListener("scroll", e => this.scrollToCard(e), false)
    },
    
    loading() {
      this.isLoading = true
      const cards = document.querySelector<HTMLElement>('.newpage__cards')!
      cards.style.transform = `translateY(0)`
      cards.style.marginBottom = '-15px'
      setTimeout(() => {
        cards.style.transform = `translateY(-70px)`
        cards.style.marginBottom = '-85px'
        this.isLoading = false
      }, 2000)
    },
    swipeStart(e: any) {
      if (typeof e["targetTouches"] !== "undefined") {
        let touch = e.targetTouches[0]
        this.pStart.x = touch.screenX
        this.pStart.y = touch.screenY
      } else {
        this.pStart.x = e.screenX
        this.pStart.y = e.screenY
      }
    },
    swipeEnd(e: any) {
      if (window.scrollY === 0 && !this.isLoading) {
        const cards = document.querySelector<HTMLElement>('.newpage__cards')!
        
        cards.style.transform = `translateY(-70px)`
      }
    },
    swipe(e: any) {
      // let flag = this.checkParent(firstCard, e.target)
      if (typeof e["changedTouches"] !== "undefined") {
        let touch = e.changedTouches[0]
        this.pCurrent.x = touch.screenX
        this.pCurrent.y = touch.screenY
      } else {
        this.pCurrent.x = e.screenX
        this.pCurrent.y = e.screenY
      }
      
      let firstCard = document.querySelector('.newpage__cards')!.childNodes[1] as HTMLElement
      let checkTarget = this.checkParent(firstCard, e.target)
      
      if (!checkTarget) return
      
      let changeY = this.pStart.y < this.pCurrent.y ? Math.abs(this.pStart.y - this.pCurrent.y) : 0
      
      const cards = document.querySelector<HTMLElement>('.newpage__cards')!
      
      if (window.scrollY === 0) {
        if (changeY > 70) {
          this.loading();
        } else {
          cards.style.transform = `translateY(${70 - changeY}px)`
          cards.style.marginBottom = `${-85 + changeY}px)`
        }
      }
    },
    checkParent(parent: HTMLElement, child: HTMLElement) {
      let node = child.parentNode;
      
      // keep iterating unless null
      while (node !== null) {
        if (node === parent) {
          return true;
        }
        node = node.parentNode;
      }
      return false;
    },
    
    // reCalc() {
    //   this.scrollPos = document.documentElement.scrollTop - (document.documentElement.clientTop || 0);
    //   this.scrollHeight = document.documentElement.scrollHeight;
    //   this.getCardsHeight();
    //
    //   if (this.scrollPos <= 0) {
    //     document.documentElement.scrollTop = 1; // Scroll 1 pixel to allow upwards scrolling
    //   }
    // },
    // scrollToCard(e: any) {
    //
    //   if (!this.disableScroll) {
    //     if (this.cardsHeight + this.scrollPos >= this.scrollHeight) {
    //       document.documentElement.scrollTop = 1;
    //       this.disableScroll = true;
    //     } else if (this.scrollPos <= 0) {
    //       document.documentElement.scrollTop = this.scrollHeight - this.cardsHeight;
    //       this.disableScroll = true;
    //     }
    //   }
    //
    //   if (this.disableScroll) {
    //     setTimeout(() => {
    //       this.disableScroll = false;
    //     }, 40);
    //   }
    // },
    //
    // getCardsHeight() {
    //   let cards = document.querySelectorAll<HTMLElement>('.card')
    //   this.cardsHeight = 0;
    //
    //   for (let i = 0; i < cards.length; i += 1) {
    //     this.cardsHeight = this.cardsHeight + cards[i].offsetHeight;
    //   }
    // }
  },
  
  watch: {
  
  }
})

</script>

<style lang="scss">

.newpage {
  padding-top: 17px;
  
  &__filters {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1000;
    
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    padding: 10px 15px;
    
    line-height: 1;
    
    background-color: #ffffff;
    -webkit-box-shadow: 0px -3px 6px 0px rgba(0, 0, 0, 0.37);
    -moz-box-shadow: 0px -3px 6px 0px rgba(0, 0, 0, 0.37);
    box-shadow: 0px -3px 6px 0px rgba(0, 0, 0, 0.37);
    
    &--left {
      display: flex;
      column-gap: 30px;
    }
    
    &--right {
      position: relative;
      
      span {
        display: flex;
        align-items: center;
        
        font-size: 12px;
        line-height: 1;
        
        color: theme-var-tg(--tg-theme-text-color, $--tg-text-color);
      }
      
      svg {
        margin-left: 4px;
      }
      
      &:before {
        content: '';
        
        position: absolute;
        top: 50%;
        left: -10px;
        transform: translateY(-50%);
        
        width: 0.5px;
        height: 70%;
        
        background: theme-var-tg(--tg-theme-text-color, $--tg-text-color);
      }
    }
  }
  
  &__notify {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    margin-bottom: 10px;
    min-height: 80px;
    padding: 8px 20px 8px 15px;
    border-radius: 8px;
    
    background: rgba(0, 0, 0, 0.06);
    
    transition: margin 0.5s ease-in-out,
                height 0.5s ease-in-out,
                min-height 0.5s ease-in-out,
                padding 0.5s ease-in-out;
    
    div {
      padding-right: 10px;
      
      line-height: 100%;
    }
    
    &__title {
      font-size: 12px;
      font-family: "SF Pro Text Semibold";
    }
    
    &__text {
      font-size: 12px;
    }
    
    svg:last-child {
      cursor: pointer;
    }
    
    &--hidden {
      margin: 0;
      height: 0;
      min-height: 0;
      padding: 0;
    }
    
    &__effect {
      position: absolute;
      z-index: 800;
      
      pointer-events: none;
      
      canvas {
        position: absolute;
        left: 0;
        top: 0;
        
        border-radius: 8px;
        
        transition: transform 1.5s ease-out, opacity 1.5s ease-out;
      }
    }
  }
  
  &__cards {
    transform: translateY(-70px);
    
    display: flex;
    flex-direction: column;
    //row-gap: 10px;
    margin: 0 -15px -15px;
    margin-bottom: -85px;
    overflow-y: scroll;
    
    transition: 0.7s all;
    
    .card {
      scroll-snap-align: start;
    }
  }
}

.slide-enter-active,
.slide-leave-active {
  transform: translateY(0px);
  transition: all 1s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-100px);
}

.fade-enter-active,
.fade-leave-active {
  opacity: 1;
  transition: all 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.loading__container {
  height: 70px;
  padding: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  transition: 0.7s all;
  
  .loading {
    border: 4px solid #f3f3f3; /* Light grey */
    border-top: 4px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 2s linear infinite;
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

</style>