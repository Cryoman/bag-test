<template>
  <div :class="$style['categories-container']">
    <img v-for="filter in categoriesFilter" :key="filter.items" :src="filter.img" @click="selectFilter(filter.items)">
  </div>
</template>

<script lang="ts" setup>
import AllItemsImage from '../assets/all_items.png'
import ArmourImage from '../assets/armour.png'
import MiscImage from '../assets/misc.png'
import WeaponImage from '../assets/weapon.png'
import { FilterCategories, FilterType } from '../types/categories'
import { useCategoriesFilter } from '../composables/useCategoriesFilter'

const { setFilter } = useCategoriesFilter()

const categoriesFilter: FilterCategories[] = [{
  img: AllItemsImage,
  items: 'all items'
},
{
  img: ArmourImage,
  items: 'armour'
},
{
  img: MiscImage,
  items: 'miscellaneous'
},
{
  img: WeaponImage,
  items: 'weapon'
}]

function selectFilter(filter: FilterType) {
  setFilter(filter)
}
</script>

<style lang="scss" module>
.categories-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #393839;
  gap: 33px;
  padding-block: 16px;
  box-sizing: border-box;

  img {
    cursor: pointer;
  }
}
</style>
