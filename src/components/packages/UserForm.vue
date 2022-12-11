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
            v-if="userForm"
            :userForm="userForm"
            :emailSubject="emailSubject"
            :emailText="textForMail"
            :emailEndpoint="mailEndpoint"
            :emailTarget="emailTarget"
          />
      </v-card>
    </div>
  </section>
</template>

<script>

import { mapState /*, mapGetters */ } from 'vuex'

import 'pineapple-contact-form'
import 'pineapple-contact-form/dist/pineapple-contact-form.css'

export default {
  name: 'UserForm',
  props: ['address'],
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
  }
}
</script>
