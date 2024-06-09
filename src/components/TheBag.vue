<template>
  <div :class="$style['bag-container']">
    <BagTabs />
    <div :class="$style['inventory']">
      <div :class="$style['inventory__short-side']">
        <CategoriesPanel />
      </div>
      <div :class="$style['inventory__long-side']">
        <CategoryLabel />
        <ItemsArea />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import BagTabs from './BagTabs.vue'
import CategoriesPanel from './CategoriesPanel.vue'
import CategoryLabel from './CategoryLabel.vue'
import ItemsArea from './ItemsArea.vue'
</script>

<style lang="scss" module>
.bag-container {
  width: min(562px, 100%);
  margin: 0 auto;
  padding-block: 10px;
}

.inventory {
  display: flex;
  flex-direction: row;
  height: 100%;
}

.inventory__short-side {
  flex: 1;
}

.inventory__long-side {
  flex: 10;
  background-color: #242223;
  height: 100%;
}
</style>
