<template>
  <v-textarea
        :placeholder="field.placeholder"
        :error="field.error"
        outlined
        color="#656565"
        style="margin-top:32px!important;"
        auto-grow
        v-model="message"
        class="user-inputs"
  ></v-textarea>
</template>

<style scoped>
</style>

<script>

export default {
  name: 'InputMessage',
  props: ['fieldIndex'],
  computed: {
    field () {
      return this.$store.state.contact.contactFormFields[this.fieldIndex]
    },
    message: {
      get () {
        return this.field.value
      },
      set (val) {
        this.field.error = this.field.value.length < 10
        this.$store.commit('contact/SET_ERROR', {
          num: this.fieldIndex,
          value: this.field.error
        })
        this.$store.commit('contact/UPDATE_USER_INFO', {
          num: this.fieldIndex,
          value: val
        })
      }
    }
  }
}
</script>
