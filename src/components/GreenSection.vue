<template>
  <v-container fluid class="deepgreen py-12 mt-12">
    <v-card flat class="transparent mx-auto" max-width="600">
      <v-card-text class="text-center" width="100%">
        <h2>{{ greenSection.header }}</h2>
        <p>{{ greenSection.text }}</p>
      </v-card-text>
      <v-card-text class="text-center">
        <p>
          <span>Pineapple NET is powered by </span>
          <v-img
                src="@/assets/icons/dgtek-logo-white.svg"
                class="logo"
                width="50"
                contain
          ></v-img>
        </p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>
h2, p {
  color: #fff;
  width: 100%;
}
.logo {
  display: inline-block;
  vertical-align: middle;
  margin-left: 16px;
}
</style>

<script>

import { mapState } from 'vuex'

export default {
  name: 'GreenSection',
  computed: {
    ...mapState('content', ['greenSection'])
  }

}
</script>
