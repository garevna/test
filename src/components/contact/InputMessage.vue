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
  data () {
    return {
      //
    }
  },
  computed: {
    field () {
      return this.$store.state.contact.contactFormFields[this.fieldIndex]
    },
    message: {
      get () {
        return this.field.value
      },
      set (val) {
        this.$store.commit('contact/UPDATE_USER_INFO', {
          num: this.fieldIndex,
          value: val
        })
      }
    }
  }
}
</script>
