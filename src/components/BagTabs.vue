<template>
  <div :class="$style['tabs-container']">
    <div :class="[$style['tab'], $style['active-tab']]">
      <span>BACKPACK</span>
    </div>
    <div :class="$style['tab']">
      <span>NEXUS</span>
    </div>
    <div :class="$style['close-btn']">
      <img src="/src/assets/union.png" alt="">
    </div>
  </div>  
</template>

<script lang="ts" setup>

</script>

<style lang="scss" module>
.tabs-container {
  width: 100%;
  display: flex;
  flex-direction: row;
}

.tab, 
.close-btn {
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-block: 13px;
}

.tab {
  flex: 5;
  font-size: 24px;
  line-height: 30px;
  font-family: 'commuters-sans';
  color: #fff;
  background-color: #393839;
  
  span {
    opacity: 47%;
  }
}

.active-tab {
  span {
    opacity: 100%;
  }
}

.active-tab,
.close-btn {
  background-color: #242223;
}

.close-btn {
  flex: 1;
}
</style>
