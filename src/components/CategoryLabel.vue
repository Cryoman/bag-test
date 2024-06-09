<template>
  <div :class="$style['label-container']">
    <span>{{ label }}</span>
  </div>
</template>

<script lang="ts" setup>
import { useCategoriesFilter } from '../composables/useCategoriesFilter'
import { computed } from 'vue'

const { selectedType } = useCategoriesFilter()

const label = computed(() => {
  return selectedType.value.toUpperCase()
})

</script>

<style lang="scss" module>
.label-container {
  padding-inline: 15px;
  margin-block: 12px;
  width: 100%;

  span {
    font-size: 20px;
    line-height: 25px;
    color: #fff;
    font-family: 'commuters-sans';
  }
}
</style>
