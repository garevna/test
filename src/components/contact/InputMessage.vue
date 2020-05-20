<template>
  <v-textarea
        :placeholder="placeholder"
        outlined
        color="#656565"
        style="margin-top:16px;"
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
  props: ['placeholder'],
  data () {
    return {
      //
    }
  },
  computed: {
    message: {
      get () {
        return this.$store.state.contact.userInfo.message
      },
      set (val) {
        this.$store.commit('contact/UPDATE_USER_INFO', {
          prop: 'message',
          value: val
        })
      }
    }
  }
}
</script>
