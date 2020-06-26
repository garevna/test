<template>
  <v-select
      :items="values"
      outlined
      hide-details
      class="combo-box-input"
      v-model="selected"
      :placeholder="label"
  ></v-select>
</template>

<style scoped>
  .combo-box-input {
    margin-top: 24px;
    margin-bottom: 16px;
  }
</style>

<script>

export default {
  name: 'InputMessage',
  props: ['label', 'values', 'propName'],
  data () {
    return {
      //
    }
  },
  computed: {
    selected: {
      get () {
        return this.$store.state.contact.userInfo[this.propName]
      },
      set (val) {
        this.$store.commit('contact/UPDATE_USER_INFO', {
          prop: this.propName,
          value: val
        })
      }
    }
  }
}
</script>
