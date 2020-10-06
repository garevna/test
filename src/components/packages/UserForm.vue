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
                :userForm="userForm"
                :emailSubject="emailSubject"
                :emailText="emailText"
                :emailEndpoint="mailEndpoint"
                v-if="userForm"
          />
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
  computed: {
    ...mapState(['mailEndpoint', 'emailSubject', 'emailText']),
    ...mapState('content', ['userForm'])
  }
}
</script>
