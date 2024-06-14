<template>
  <div class="catalog__product__card" v-if="card" :style="card.styles.bgCard">
    <div class="catalog__product__card__bg-gradient" :style="card.styles.gradientCard"></div>
    
    <div class="catalog__product__card__wrapper">
      <div class="catalog__product__card__image">
        <img :src="'/images/catalog/' + card.image" alt="stub">
      </div>
      
      <div class="catalog__product__card__title">{{ card.title }}</div>
      
      <div class="is-flex is-justify-content-space-between">
        <div class="is-flex is-flex-direction-column">
          <div class="catalog__product__card__name">{{ card.name }}</div>
          
          <div class="catalog__product__card__info">
            <div class="catalog__product__card__info__count-movies">{{ card.info.countMovies }} видео</div>
            <div class="catalog__product__card__info__date">Обновлен {{ formattedDate(card.info.date) }}</div>
          </div>
        </div>
        
        <div class="catalog__product__card__buttons">
          <div class="catalog__product__card__buttons__button"><img src="/images/icons/save.png" alt="icon"></div>
          <div class="catalog__product__card__buttons__button"><img src="/images/icons/share.png" alt="icon"></div>
        </div>
      </div>
      
      <div class="catalog__product__card__description">
        {{ card.description }}
      </div>
      
      <div class="catalog__product__card__play-menu">
        <div class="catalog__product__card__play-menu__play"><img src="/images/icons/play.png" alt="icon"><span>Воспроизвести</span></div>
        <div class="catalog__product__card__play-menu__mix"><img src="/images/icons/mix.png" alt="icon"><span>Перемешать</span></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import {CSSProperties, defineComponent, type PropType} from 'vue';
import dayjs, {Dayjs} from 'dayjs';

interface Card {
  image: String,
  title: String,
  name: String,
  info: {
    countMovies: Number,
    date: Date | Dayjs
  },
  description: String,
  styles: {
    bgCard: CSSProperties,
    gradientCard: CSSProperties
  }
}

export default defineComponent({
  name: 'CatalogProductCard',
  
  props: {
    card: Object as PropType<Card>
  },
  
  data: () => ({
  
  }),
  
  computed: {
  
  },
  
  methods: {
    formattedDate(date: Date | Dayjs) {
      return dayjs(date).format('D MMM, YYYY')
    }
  }
  
})

</script>

<style scoped lang="scss">

.catalog__product__card {
  position: relative;
  
  padding: 16px;
  
  color: #FFFFFF;
  
  
  &__bg-gradient {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
  }
  
  &__wrapper {
    position: relative;
    z-index: 10;
  }
  
  &__image {
    img {
      width: 100%;
      
      border-radius: 12px;
    }
  }
  
  &__title {
    margin-top: 16px;
    margin-bottom: 16px;
    
    font-size: 22px;
    line-height: 120%;
  }
  
  &__name {
    font-size: 12px;
  }
  
  &__info {
    display: flex;
    margin-top: 4px;
    
    font-size: 10px;
    
    &__count-movies {
      margin-right: 5px;
    }
    
    &__date {
    
    }
  }
  
  &__buttons {
    display: flex;
    align-items: center;
    column-gap: 8px;
    
    &__button {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 37px;
      width: 37px;
      border-radius: 100%;
      
      background-color: rgba(255,255,255,0.1);
      
      img {
        height: 28px;
        width: 28px;
      }
      
      &:first-child {
        img {
          margin-right: 2px;
        }
      }
    }
  }
  
  &__description {
    margin-top: 16px;
    
    font-size: 12px;
  }
  
  &__play-menu {
    display: flex;
    column-gap: 10px;
    margin-top: 16px;
    
    color: #000000;
    
    &__play {
      display: flex;
      justify-content: center;
      align-items: center;
      width: calc(50% - 5px);
      padding: 0 10px;
      border-radius: 18px;
      
      font-size: 14px;
      font-family: "Helvetica Neue Cyr Roman", "Helvetica Neue", sans-serif;
      font-weight: normal;
      line-height: 36px;
      
      color: #000000;
      background-color: #FFFFFF;
      
      img {
        height: 16px;
        width: 16px;
      }
      
      span {
        margin-left: 6px;
        overflow: hidden;
        
        text-overflow: ellipsis;
      }
    }
    
    &__mix {
      display: flex;
      justify-content: center;
      align-items: center;
      width: calc(50% - 5px);
      padding: 0 10px;
      border-radius: 18px;
      
      font-size: 14px;
      font-family: "Helvetica Neue Cyr Roman", "Helvetica Neue", sans-serif;
      font-weight: normal;
      line-height: 36px;
      
      color: #FFFFFF;
      background-color: rgba(255,255,255,0.1);
      
      img {
        height: 22px;
        width: 22px;
      }
      
      span {
        margin-left: 6px;
        overflow: hidden;
        
        text-overflow: ellipsis;
      }
    }
  }
}

</style>