<template>
  <div class="create-store">
    <h1 class="create-store__title">Create a shop</h1>
    
    <div class="create-store__image-and-name">
      <div class="caption">Store Name</div>
      
      <div class="self-card">
        <div class="create-store__image-and-name__file-input">
          <label>
            <img v-if="imagePreviewUrl" :src="imagePreviewUrl" alt="preview">
            <IconCamera v-else h="12" w="14" color="transparent-grey"/>
            <input type="file" hidden @change="setImagePreviewUrl">
          </label>
        </div>
        <div class="create-store__image-and-name__input">
          <input placeholder="Store name" v-model="createData.name">
        </div>
      </div>
    </div>
    
    <div class="create-store__banner">
      <div class="caption">Banner</div>
      
      <div class="self-card">
        <div class="create-store__banner__file-input">
          <label :class="{'has-preview-image': bannerPreviewUrl !== undefined}">
            <img v-if="bannerPreviewUrl" :src="bannerPreviewUrl" alt="preview">
            <IconCamera v-else h="12" w="14" color="transparent-grey"/>
            <input type="file" hidden @change="setBannerPreviewUrl">
          </label>
        </div>
      </div>
      
      <div class="create-store__banner__auxiliary-text">
        Recommended size: 200x200
      </div>
    </div>
    
    <div class="create-store__description">
      <div class="caption">Description</div>
      
      <div class="self-card">
        <div class="create-store__description__textarea">
          <textarea ref="textarea" v-model="input" class="resize-none" placeholder="You can provide an additional description for your store"></textarea>
        </div>
      </div>
    </div>
    
    <NotWebAppButton @click="createStore()" v-if="notAWebApp">CREATE</NotWebAppButton>
  </div>
</template>

<route lang="json">
{
"name": "createStore"
}
</route>

<script lang="ts">

import {defineComponent} from 'vue';
import {SelfStoreData, useUserStore} from '@/stores/user.ts';

import { useTextareaAutosize } from '@vueuse/core';
import {useRouter} from 'vue-router';
import {useAlertStore} from '@/stores/alert.ts';

export default defineComponent({
  name: 'CreateStorePage',
  
  props: [],
  
  setup() {
    const router = useRouter()
    const userStore = useUserStore()
    const alertStore = useAlertStore()
    const { textarea, input } = useTextareaAutosize()
    
    return { router, userStore, alertStore, textarea, input }
  },
  
  data: () => ({
    createData: {
      image: '',
      banner: '',
      name: '',
      description: ''
    } as SelfStoreData,
    imagePreviewUrl: undefined as string | undefined,
    bannerPreviewUrl: undefined as string | undefined,
  }),
  
  beforeRouteEnter(to, from, next) {
    if (useUserStore().selfStore.created) {
      next({name: 'storeInfo'});
    } else if (useUserStore().selfStore.subscription.has) {
      next();
    } else {
      next({name: 'subscription'});
    }
  },
  
  computed: {
    notAWebApp() {
      return window.Telegram.WebApp.platform === 'unknown';
    }
  },
  
  mounted() {
    this.showMainButtonCreateStore();
  },
  
  methods: {
    createStore() {
      if (this.createData.image && this.createData.banner && this.createData.name && this.createData.description) {
        this.userStore.createStore(this.createData)
        
        this.router.push({ name: 'storeInfo' })
      } else {
        this.alertStore.showAlert('error', 'Fill in all the fields')
      }
    },
    
    showMainButtonCreateStore() {
      window.Telegram.WebApp.MainButton.setParams({
        text: 'CREATE',
        is_active: true,
        is_visible: true
      }).onClick(() => {
        this.createStore()
      });
    },
    
    setImagePreviewUrl(e: any) {
      const file = e.target.files[0] as File;
      // this.createData.image = file;
      this.createData.image = 'store.svg';
      this.imagePreviewUrl = URL.createObjectURL(file);
    },
    
    setBannerPreviewUrl(e: any) {
      const file = e.target.files[0] as File;
      // this.createData.banner = file;
      this.createData.banner = 'banner.jpg';
      this.bannerPreviewUrl = URL.createObjectURL(file);
    }
  },
  
  watch: {
    input(newValue) {
      this.createData.description = newValue
    }
  }
  
});

</script>

<style scoped lang="scss">

.create-store {
  display: flex;
  flex-direction: column;
  
  &__title {
    margin-top: 30px;
    text-align: center;
    
    font-size: 20px;
    line-height: 1;
  }
  
  &__image-and-name {
    margin-top: 15px;
    
    .self-card {
      display: flex;
      align-items: center;
    }
    
    &__file-input {
      margin-right: 10px;
      
      label {
        position: relative;
        
        display: flex;
        justify-content: center;
        align-items: center;
        height: 36px;
        width: 36px;
        
        background: none;
        
        cursor: pointer;
        
        img {
          height: 100%;
          width: 100%;
          border-radius: 100%;
          
          object-fit: cover;
        }
        
        &:before {
          content: "";
          
          position: absolute;
          top: -50%;
          left: calc(-50% - 1px);
          right: -50%;
          bottom: -50%;
          
          display: block;
          border: 1px solid rgba(120, 120, 120, .4);
          border-radius: 100%;
          
          transform: scale(0.5);
        }
      }
    }
    
    &__input {
      input {
        border: none;
        
        font-size: 12px;
        line-height: 1;
        
        color: theme-var-tg(--tg-theme-text-color, $--tg-text-color);
        background: none;
        
        &:focus-visible {
          border: transparent;
          outline: transparent;
        }
        
        &::placeholder {
          color: #787878;
        }
      }
    }
  }
  
  &__banner {
    margin-top: 15px;
    
    &__file-input {
      label {
        position: relative;
        
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        padding: 12px 0;
        
        background: none;
        
        cursor: pointer;
        
        img {
          height: 100%;
          width: 100%;
          border-radius: 10px;
          
          object-fit: cover;
        }
        
        &:before {
          content: "";
          
          position: absolute;
          top: -50%;
          left: -50%;
          right: -50%;
          bottom: -50%;
          
          display: block;
          border: 1px solid rgba(120, 120, 120, .4);
          border-radius: 10px;
          
          transform: scale(0.5);
        }
        
        &.has-preview-image {
          padding: 0;
          
          &:before {
            border: unset;
          }
        }
      }
    }
    
    &__auxiliary-text {
      margin-top: 5px;
      text-align: center;
      
      font-size: 10px;
      line-height: 1;
      
      color: #7D7D85;
    }
  }
  
  &__description {
    margin-top: 15px;
    
    &__textarea {
      display: flex;
      
      textarea {
        min-height: 100% !important;
        width: 100%;
        border: none;
        
        font-size: 12px;
        
        color: theme-var-tg(--tg-theme-text-color, $--tg-text-color);
        background: none;
        
        resize: unset;
        
        &:focus-visible {
          border: transparent;
          outline: transparent;
        }
        
        &::placeholder {
          color: #787878;
        }
      }
    }
  }
}

</style>