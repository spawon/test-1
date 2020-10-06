<template>
  <div class="container">
    <header>
      <h1>Список контактов</h1>
    </header>
    <div @click="add" class="add"><img alt="" src="@/assets/plus.svg"></div>
    <hr/>
    <div class="contact_list">

      <div :key="item.id" class="item" v-for="item in items">
        <router-link :to="item.id">
          <div class="item-box">
            Название контакта: {{ item.name }}
          </div>
        </router-link>
        <div @click.stop="remove(item.id)" class="remove"><img alt="" src="@/assets/remove.svg"></div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapState({
      items: state => state.List.items
    })
  },
  methods: {
    add () { // Добавление контакта
      const result = prompt('Введите название контакта')
      if (result.trim()) { this.$store.commit('List/ADD', { name: result }) }
    },

    ...mapMutations('List', {
      remove: 'REMOVE' // Удаление контакта
    })

  }
}
</script>

<style scoped>

.add img {
  width: 75px;
  height: 75px;
}

.contact_list {
  padding: 20px 0;
}

.remove img {
  width: 25px;
  height: 25px;
}
</style>
