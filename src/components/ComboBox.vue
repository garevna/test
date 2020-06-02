<template>
  <v-combobox
      v-model="select"
      :items="items"
      :label="label"
  ></v-combobox>
</template>

<style scoped>
</style>

<script>

export default {
  name: 'ComboBox',
  props: ['label', 'items', 'selectedItem'],
  data () {
    /* eslint-disable no-labels */
    /* eslint-disable no-undef */
    /* eslint-disable no-unused-expressions */
    select: items[0]
  },
  computed: {
    select: {
      get () {
        return this.selectedItem
      },
      set (val) {
        this.$emit('update:selectedItem', val)
      }
    }
  }
}
</script>
