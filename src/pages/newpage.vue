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
      
      <div class="newpage__notify" v-if="notify">
<!--        <IconInfo h="40" w="40" color="black"/>-->
        <div>
          <h5 class="newpage__notify__title">Title</h5>
          <p class="newpage__notify__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, labore unde. Autem eaque error id nobis?</p>
        </div>
        <IconClose h="18" w="18" color="grey" @click="notify = false"/>
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

import { defineComponent } from "vue";
import dayjs from 'dayjs';

export default defineComponent({
  name: 'NewPage',
  
  props: [],
  
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
    notify: true,
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
    ]
  }),
  
  mounted() {
    if (window.Telegram.WebApp) {
      window.Telegram.WebApp.MainButton.setParams({
        is_active: false,
        is_visible: false
      })
    }
  },
  
  computed: {
  
  },
  
})

</script>

<style scoped lang="scss">

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
    padding: 8px 20px 8px 15px;
    border-radius: 8px;
    
    background: rgba(0, 0, 0, 0.06);
    
    div {
      margin-right: 10px;
      
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
  }
  
  &__cards {
    display: flex;
    flex-direction: column;
    //row-gap: 10px;
    margin: 0 -15px -15px;
  }
}

</style>