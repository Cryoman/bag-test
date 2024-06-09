import { ref } from 'vue'
import { FilterType } from '../types/categories'

const selectedType = ref('all items')

export function useCategoriesFilter() {
  function setFilter(filter: FilterType) {
    selectedType.value = filter
  }

  return { selectedType, setFilter }
}