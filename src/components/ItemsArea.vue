<template>
  <div class="container" :class="$style['item-cells-container']">
    <div
      v-for="(item, index) in filteredItems"
      :key="Math.floor(Math.random() * Date.now())"
      class="item"
      :class="{[$style['item-cell']]: true, [$style['present-item']]: !!item.name}"
      @mousemove.prevent.stop="showTooltip(index, $event)"
      >
      <img :src="item.imageUrl" alt="">
      <div :class="{[$style['item-glow']]: true, [$style['item-weapon']]: item.type === 'weapon', [$style['item-armour']]: item.type === 'armor'}" />
      <div v-if="item.cooldown" :class="$style['item-cooldown']">
        <figure>
          <img
            src="/src/assets/cooldown-clock.png"
            alt=""
          />
          <figcaption>
            {{ Math.floor(item.cooldown / 10000000000) }}s
          </figcaption>
          </figure>
      </div>
      <div v-if="item.count" :class="$style['item-count']">x{{ item.count }}</div>
      <div v-if="item.charges" :class="$style['item-charges']">
        <div>{{item.charges}}/{{ item.maxCharges }}</div>
        <img src="/src/assets/triangle.png" alt="">
      </div>
      <div class="tooltip" :class="$style['item-tooltip']">{{ item.name }}</div>
      <div :class="$style['item-cover']" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount, computed, ref, nextTick } from 'vue'
import { Item } from '../types/items'
import { useCategoriesFilter } from '../composables/useCategoriesFilter';

const itemsInfo = ref<Item[]>([])
const tooltip = ref<HTMLElement>()
const baseSize = ref()

const { selectedType } = useCategoriesFilter()

const cell = computed(() => {
  return document.getElementsByClassName('item')[0]
})

const cellsContainer = computed(() => {
  return document.getElementsByClassName('container')[0]
})

const filteredItems = computed(() => {
  let filter
  if (selectedType.value === 'all items') {
    return itemsInfo.value
  } else if (selectedType.value === 'armour') {
    filter = itemsInfo.value.filter((item) => item.type === 'armor')
    fillArray(filter)
    return filter
  } else if (selectedType.value === 'weapon') {
    filter = itemsInfo.value.filter((item) => item.type === 'weapon')
    fillArray(filter)
    return filter
  } else {
    filter = itemsInfo.value.filter((item) => item.type === 'misc')
    fillArray(filter)
    return filter
  }
})

const resizeObserver = new ResizeObserver((entry) => {
  (cellsContainer.value as HTMLElement).style.maxHeight = (Math.floor(entry[0].borderBoxSize[0].blockSize) || baseSize.value) * 8 + 10 + 'px'
  
  baseSize.value = cellsContainer.value.clientHeight
})

async function showTooltip(tooltipIndex: number,evt: MouseEvent) {
  await nextTick()
  tooltip.value= document.getElementsByClassName('tooltip')[tooltipIndex] as HTMLElement

  tooltip.value.style.top = evt.offsetY + 10 + 'px'
  tooltip.value.style.left = evt.offsetX + 10 + 'px'
}

function fillArray(array: Item[]) {
  while (array.length < 40) {
    array.push({id: '', type: '', name: '', imageUrl: ''})
    }
}

onMounted(async() => {
  const params = new URLSearchParams(window.location.search)
  const queryCase = params.get('case')
  try {
    const response = await fetch(`https://us-central1-seven-seven-bit-inhouse-helper.cloudfunctions.net/vueDevTestTask-getInventoryState?case=${queryCase || '1'}`)
    const data = await response.json()
    itemsInfo.value = data.inventory

    fillArray(itemsInfo.value)
  } catch(e) {
    console.log('Error', e)
  } finally {
    await nextTick()
    resizeObserver.observe(cell.value)

    console.log('h', cellsContainer.value.clientHeight)
  }
})

onBeforeUnmount(() => {
  resizeObserver.unobserve(cell.value)
  
})

</script>

<style lang="scss" module>
  ::-webkit-scrollbar {
    width: 3px;
  }

  ::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey; 
}

  ::-webkit-scrollbar-thumb {
    background: #D9D9D9; 
  }
.item-cells-container {
  padding-inline: 15px;
  margin-block: 12px;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  position: relative;
}

.item-cell {
  width: 20%;
  aspect-ratio: 1 / 1;
  background-color: #1A1A1A;
  border: 1px solid #454545;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  img {
    width: 90%;
    z-index: 2;
  }
}

.present-item {
  cursor: pointer;

  &:hover .item-tooltip {
    display: block;
  }
}

.item-glow {
  position: absolute;
  inset: 0;
  z-index: 1;
  border-radius: 50%;
  filter: blur(10px);
  opacity: 40%;
}

.item-weapon {
  background-color: #7F59CE;
}

.item-armour {
  background-color: #367cce;
}

.item-cooldown {
  position: absolute;
  inset: 0;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background-color: rgba(0, 0, 0, 50%);
  

  figure {
    text-align: center;
    width: 100%;
    font-size: 20px;
    line-height: 19px;

    img {
      width: 40%;
    }
  }
}

.item-count {
  position: absolute;
  bottom: 0;
  right: 5px;
  font-family: 'apercu';
  z-index: 2;
  color: white;
}

.item-charges {
  position: absolute;
  top: 0;
  left: 0;
  width: 66%;

  img {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
  }

  div {
    position: relative;
    z-index: 2;
    font-family: 'apercu';
    color: white;
  }
}

.item-tooltip {
  display: none;
  position: absolute;
  background-color: #393839;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #454545;
  z-index: 5;
  color: white;
  width: fit-content;
}

.item-cover {
  position: absolute;
  inset: 0;
  z-index: 4;
}
</style>
