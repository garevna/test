<template>
  <section id="contact" style="width: 100%">
    <div class="base-title">
      <a href="#contact" class="core-goto"></a>
        <v-card
          flat
          class="user-contact transparent mx-auto pa-0"
          style="margin-bottom: 80px"
        >
          <UserContact
            v-if="userForm && showUserForm"
            :address="addressString"
            :userForm="userForm"
            :emailSubject="emailSubject"
            :emailText="textForMail"
            :emailEndpoint="mailEndpoint"
            :emailTarget="emailTarget"
          />
          <div v-else style="border: solid 1px #ddd; border-radius: 4px; padding-bottom: 320px" class="mt-12 pt-12 px-auto">
            <h5 style="color: #999; text-align: center">User contact form is not available</h5>
          </div>
      </v-card>
    </div>
  </section>
</template>

<script>

import { mapState } from 'vuex'

import 'pineapple-contact-form'
import 'pineapple-contact-form/dist/pineapple-contact-form.css'

export default {
  name: 'UserForm',

  props: ['address'],

  data: () => ({
    showUserForm: true
  }),

  computed: {
    ...mapState(['mailEndpoint', 'emailSubject', 'emailText', 'emailTarget']),
    ...mapState('content', ['userForm']),
    addressString () {
      const addr = ['streetNumber', 'streetName', 'city', 'state', 'postcode'].map(item => this.address[item]).join(' ')
      const formatted = this.address.formatted ? `${this.address.formatted}<br>` : ''
      return `<b style="color: #20731C">${formatted}${addr}</b>`
    },
    textForMail () {
      return `${this.emailText}<br></br>${this.addressString}`
    }
  },

  beforeMount () {
    this.showUserForm = process.env.VUE_APP_TEST_SW !== 'test'
  }
}
</script>
