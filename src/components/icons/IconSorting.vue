<template>
  <div class="sorting__icon">
    <svg
      :style="{ height: h + 'px', width: w + 'px' }"
      :class="['icon', 'icon--' + color]"
      viewBox="0 0 7 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.50003 0L6.53115 3.50003H0.468915L3.50003 0Z"
      />
    </svg>
    
    <svg
      :style="{ height: h + 'px', width: w + 'px' }"
      :class="['icon', 'icon--' + color]"
      viewBox="0 0 7 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.49997 4.33337L0.468855 0.833343L6.53109 0.833344L3.49997 4.33337Z"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'IconSorting',
  
  props: ['h', 'w', 'color']
});
</script>

<style lang="scss" scoped>

.sorting__icon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-left: 8px;
  
  svg:first-child {
    margin-top: 1px;
  }
}

.icon {
  path {
    fill: #7D7D85;
  }
}

</style>
