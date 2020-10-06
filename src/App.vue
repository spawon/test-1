<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
.container {
  max-width: 1024px;
  margin: 0 auto;
  text-align: center;
  align-items: center;
  font-family: 'Roboto', sans-serif;
}
.item {
  flex: 1 1 auto;
  justify-content: space-between;
  padding: 0 10px;
}

.contact_list .item {
  height: 75px;
  background: #f8f8f8;
  box-shadow: 0 5px 5px #545454;
  display: flex;
  align-items: center;
  font-family: 'Roboto', sans-serif;
}
</style>
