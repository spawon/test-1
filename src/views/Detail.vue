<template>
  <section class="container">
    <h1 class="header">{{ currentItem.name }}</h1>
    <h3 >Добавить поля</h3>
    <div class="save_block">
      <label>
        Введите данные поля<br>
        <input placeholder="название:значение" type="text" v-model="addField"  @keypress.enter="add">
      </label>
      <button class="save" @click="add">Добавить</button>
    </div>
    <div class="reject_block">
      <button @click="reset">Отменить изменения</button>
    </div>
    <hr/>
    <div class="contact_list" v-if="currentItem.fields">
      <div :key="field.id" class="item" v-for="field in currentItem.fields">
        <strong>{{ field.name }}: </strong>
        <div>
          <span v-if="field.id === editField.id">
          <label>
            <input type="text" v-model="editField.value" @keypress.enter="edit">
          </label>
          <button @click="edit">Сохранить</button>
          <button @click="reject(field)">Отмена</button>
        </span>
          <span v-else @click.stop="editField = Object.assign({}, field)">{{ field.value }} </span><button @click="remove(field)">Delete</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'Detail',
  data () {
    return {
      addField: '',
      editField: {}
    }
  },
  computed: {
    currentItem () {
      return this.$store.getters['List/getTodoById'](this.$route.params.id)
    }
  },
  methods: {
    ...mapMutations('List', {
      addFieldHandle: 'ADD_FIELD',
      editFieldHandle: 'EDIT_FIELD',
      removeHandler: 'DELETE_FIELD',
      resetHandler: 'RESET'
    }),
    add () {
      const result = this.addField.split(':')
      if (result[0] && result[1]) {
        this.addFieldHandle({
          field: this.addField.split(':'),
          id: this.currentItem.id
        })
        this.addField = ''
      }
    },
    edit () {
      this.editFieldHandle({
        id: this.currentItem.id,
        field: this.editField
      })
      this.editField = {}
    },
    reset () {
      const conf = confirm('Вы уверенны что хотите отменить изменения?')
      if (!conf) return false
      this.resetHandler({
        id: this.currentItem.id
      })
    },
    reject (field) {
      if (this.editField.value === field.value) { this.editField = {} } else {
        const res = confirm('Вы уверены что хотите отменить изменения?')
        if (res) { this.editField = {} }
      }
    },
    remove (field) {
      const conf = confirm('Вы уверенны что хотите удалить?')
      if (!conf) return false
      this.removeHandler({
        id: this.currentItem.id,
        field: field
      })
    }
  }

}
</script>

<style scoped lang="scss">
.header{
  text-shadow: 2px 2px 2px #3a4038;
}
.save_block{
  margin: 15px 0;
  input {
    font-size: 16px;
    margin: auto;
    padding: 10px;
    display: block;
    border: none;
    border-bottom: 1px solid #ccc;
    text-align: center;
    &:focus, &:active{
      border: none;
    }
  }
  label{
    color: #999;
    font-size: 18px;
    left: 10px;
    top: 15px;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
  }
  .save{
    margin-top: 15px;
    box-shadow: 3px 4px 0px 0px #899599;
    background:linear-gradient(to bottom, #ededed 5%, #bab1ba 100%);
    background-color:#ededed;
    border-radius:15px;
    border:1px solid #d6bcd6;
    display:inline-block;
    cursor:pointer;
    color:#3a8a9e;
    font-family:Arial;
    font-size:17px;
    padding:7px 25px;
    text-decoration:none;
    text-shadow:0px 1px 0px #e1e2ed;
    &:hover{
      background:linear-gradient(to bottom, #bab1ba 5%, #ededed 100%);
      background-color:#bab1ba;
    }
  }
}
.reject_block{
  button{
    box-shadow: 3px 4px 0px 0px #8a2a21;
    background:linear-gradient(to bottom, #c62d1f 5%, #f24437 100%);
    background-color:#c62d1f;
    border-radius:18px;
    border:1px solid #d02718;
    display:inline-block;
    cursor:pointer;
    color:#ffffff;
    font-family:Arial;
    font-size:17px;
    padding:7px 25px;
    text-decoration:none;
    text-shadow:0px 1px 0px #810e05;
    &:hover{
      background:linear-gradient(to bottom, #f24437 5%, #c62d1f 100%);
      background-color:#f24437;
    }
  }
}
</style>
