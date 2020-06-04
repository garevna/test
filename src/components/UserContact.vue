<template>
  <v-card class="user-info mx-auto pa-6 homefone" max-width="480">
    <v-card-title>
      <h4>{{ userForm.title }}</h4>
    </v-card-title>
    <v-card-text class="mx-0 px-0" width="100%">
      <div v-for="(item, prop) in items" :key="prop">
        <InputWithValidation
              :placeholder="item.placeholder"
              :propName="prop"
              :validator="item.validator"
              v-if="getAvailability(prop)"
        />
      </div>

      <ComboBoxInput
            label="State*"
            :values="states"
            propName="state"
            v-if="getAvailability('state')"
      />

      <InputPhoneNumber v-if="getAvailability('phone')" />

      <ComboBoxInput
            label="Building*"
            :values="buildings"
            propName="building"
            v-if="getAvailability('building')"
      />

      <InputWithValidation
            placeholder="Appt Number*"
            propName="apptNumber"
            :validator="val => val.match(/^[0-9]*$/)"
            v-if="getAvailability('apptNumber')"
      />

      <InputWithValidation
            placeholder="Promocode?*"
            propName="promocode"
            :validator="val => promocodes.indexOf(val) !== -1"
            v-if="getAvailability('promocode')"
      />

      <InputMessage v-if="getAvailability('message')" />

    </v-card-text>

    <v-card-text class="ma-auto" width="40%" height="10">
      <v-progress-linear
          color="#75BE00"
          buffer-value="0"
          stream
          v-if="progress"
      ></v-progress-linear>
    </v-card-text>

    <v-card-actions class="text-center">
      <v-btn
          color="buttons"
          dark
          class="submit-button px-auto mx-auto"
          @click="sendUserRequest"
      >
        {{ userForm.button }}
      </v-btn>
    </v-card-actions>

    <Popup :opened.sync="popupOpened" />
    <PopupError :opened.sync="popupErrorOpened" />
  </v-card>
</template>

<style scoped>

.user-info {
  width: 640px;
  padding-left: 80px;
  border-radius: 15px!important;
}
h4 {
  width: 100%;
  text-align: center;
  margin-top: 0;
  margin-bottom: 8px;
}

@media screen and (max-width: 600px) {
  .v-btn__content {
    font-size: 16px!important;
  }
  .user-info {
    width: 100%!important;
    /* padding-left: 40px; */
  }
}
@media screen and (max-width: 320px) {
  .user-info {
    width: 300px!important;
    padding-left: 0px;
    padding-right: 0px;
  }
}
</style>

<script>

import { mapState, mapActions } from 'vuex'

import InputWithValidation from '@/components/contact/InputWithValidation.vue'
import InputPhoneNumber from '@/components/contact/InputPhoneNumber.vue'
import ComboBoxInput from '@/components/contact/ComboBoxInput.vue'
import InputMessage from '@/components/contact/InputMessage.vue'

import Popup from '@/components/contact/Popup.vue'
import PopupError from '@/components/contact/PopupError.vue'

const emailValidator = require('email-validator')

export default {
  name: 'UserContact',
  components: {
    InputPhoneNumber,
    InputWithValidation,
    ComboBoxInput,
    InputMessage,
    Popup,
    PopupError
  },
  data () {
    return {
      popupOpened: false,
      popupErrorOpened: false,
      items: {
        name: {
          placeholder: 'Full name*',
          validator: val => val.length > 2
        },
        email: {
          placeholder: 'Email*',
          validator: emailValidator.validate
        },
        address: {
          placeholder: 'Address*',
          validator: val => val.length > 5
        },
        postcode: {
          placeholder: 'Postcode*',
          validator: val => Number(val) && Number(val) >= 3000 && Number(val) < 9999
        }
      },
      state: '',
      building: '',
      apptNumber: '',
      promocode: '',
      show: {
        state: false,
        building: true,
        apptNumber: true,
        promocode: true
      },
      progress: false
    }
  },
  computed: {
    ...mapState('content', ['userForm']),
    states () {
      return this.userForm.states
    },
    buildings () {
      return this.userForm.buildings
    },
    promocodes () {
      return this.userForm.promocodes
    }
  },
  methods: {
    ...mapActions('contact', {
      sendEmail: 'SEND_EMAIL'
    }),
    getAvailability (propName) {
      return this.userForm.fieldsToShow.indexOf(propName) !== -1
    },
    initFields () {
      this.$store.commit('contact/CLEAR_ALL_FIELDS')
    },

    async sendUserRequest () {
      this.progress = true
      if (await this.sendEmail()) this.popupOpened = true
      else this.popupErrorOpened = true
      this.progress = false
    }
  },
  mounted () {
    // this.initFields()
  }
}

</script>
