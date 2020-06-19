<template>
<v-container>
  <v-system-bar app fixed color="primary" height="40" width="100%">
    <v-row d-flex align="center" justify="end" class="mr-10">
      <v-spacer class="d-none d-lg-flex d-xl-flex"></v-spacer>
      <span width="12" height="12" class="mr-2">
        <v-img src="@/assets/icons/phone.svg" width="11" height="11" contain></v-img>
      </span>
      <span class="system-bar-phone ml-2 mr-12" @click="call">
        {{officePhone}}
      </span>
      <span width="10" height="10" class="mr-4">
        <a :href="linkedIn" target="_blank">
          <v-img src="@/assets/icons/linkedin.svg" width="12" height="12" contain></v-img>
        </a>
      </span>
      <span width="10" height="10">
        <a :href="faceBook" target="_blank">
          <v-img src="@/assets/icons/facebook.svg" width="12" height="12" contain></v-img>
        </a>
      </span>
    </v-row>
  </v-system-bar>
</v-container>
</template>

<style scoped>

.system-bar-phone {
  font-size: 16px;
  color: #ffffff;
  cursor: pointer;
}
.main-menu-content {
  background: #FAFAFA!important;
}
</style>

<script>

import { mapState } from 'vuex'

export default {
  name: 'SystemBar',
  data () {
    return {
      toggle: 0,
      panel: undefined
    }
  },
  computed: {
    ...mapState(['officePhone', 'linkedIn', 'faceBook'])
  },
  methods: {
    call () {
      window.open(`tel:${this.officePhone}`)
    }
  }
}
</script>
