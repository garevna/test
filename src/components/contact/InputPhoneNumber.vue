<template>
  <vue-phone-number-input
        :only-countries="['AT']"
        default-country-code="AT"
        :no-country-selector="true"
        v-model="phoneNumber"
        color="#444"
        valid-color="#4CAF50"
        error-color="#FF5000"
        @update="test($event)"
  />
</template>

<style>
.input-tel.has-hint .input-tel__label,
.input-tel.has-value .input-tel__label {
  font-family: Gilroy!important;
  font-size: 16px!important;
}

.input-tel__input {
    background-color: transparent!important;
    font-family: Gilroy!important;
    width: 100%;
    padding: 0 12px;
    font-weight: 400;
    border: 1px solid #ccc;
    font-size: 16px!important;
    height: 56px!important;
    min-height: 56px!important;
    color: rgba(0, 0, 0, 0.87);
}

@media screen and (max-width: 600px) {
  .input-tel.has-hint .input-tel__label,
  .input-tel.has-value .input-tel__label {
    font-size: 14px!important;
  }
  .input-tel__input {
      font-size: 14px!important;
  }
}
@media screen and (max-width: 320px) {
  .input-tel.has-hint .input-tel__label,
  .input-tel.has-value .input-tel__label {
    font-size: 13px!important;
  }
  .input-tel__input {
      font-size: 13px!important;
  }
}
</style>

<script>

import { mapState } from 'vuex'

export default {
  name: 'InputPhoneNumber',
  computed: {
    ...mapState('contact', {
      phone: 'userInfo.phone'
    }),
    phoneNumber: {
      get () {
        return this.$store.state.contact.userInfo.phone
      },
      set (val) {
        this.$store.commit('contact/UPDATE_USER_INFO', {
          prop: 'phone',
          value: val
        })
      }
    }
  },
  methods: {
    test (res) {
      this.$store.commit('contact/SET_ERROR', {
        prop: 'phone',
        value: !res.isValid
      })
    }
  }
}
</script>
