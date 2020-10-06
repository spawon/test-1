import _ from 'lodash'
export const state = () => ({
  items: [],
  currentItem: {},
  oldItemValue: {}
})
export const getters = {
  getTodoById: (s) => (i) => {
    return s.items.find(list => list.id === i)
  }
}
export const mutations = {
  ADD: (s, p) => s.items.push({ ...p, id: (+new Date()).toString(16), fields: [] }),
  REMOVE: (s, i) => {
    const conf = confirm('Вы уверенны что хотите удалить? Данное действие отменить невозможно')
    if (!conf) return false
    const index = s.items.findIndex(n => n.id === i)
    if (index !== -1) {
      s.items.splice(index, 1)
    }
  },
  ADD_FIELD: (s, p) => {
    const item = s.items.find(n => n.id === p.id)
    s.oldItemValue = _.cloneDeep(item.fields)
    item.fields.push({ id: (+new Date()).toString(16), name: p.field[0], value: p.field[1] })
  },
  EDIT_FIELD: (s, p) => {
    const item = s.items.find(n => n.id === p.id)
    s.oldItemValue = _.cloneDeep(item.fields)
    console.log(s.oldItemValue)
    const field = item.fields.find(i => i.id === p.field.id)
    field.value = p.field.value
    console.log(s.oldItemValue)
  },
  DELETE_FIELD: (s, p) => {
    const item = s.items.find(n => n.id === p.id)
    s.oldItemValue = _.cloneDeep(item.fields)
    const index = item.fields.findIndex(n => n.id === p.field.id)
    if (index !== -1) {
      item.fields.splice(index, 1)
    }
  },
  RESET: (s, p) => {
    const index = s.items.findIndex(n => n.id === p.id)
    console.log(s.oldItemValue)
    s.items[index].fields = [...s.oldItemValue]
  }
}
