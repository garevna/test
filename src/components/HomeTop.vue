<template>
<v-container fluid style="overflow-x: hidden; margin-top: 160px; margin-bottom: 64px;" v-if="top">
  <v-card flat class="homefone mx-auto" width="100%" max-width="1440">
      <v-row align="center" justify="center" style="height: 100%">
        <v-col cols="12" lg="6" class="mx-auto my-auto">
          <v-card flat width="100%" max-width="480" class="transparent mx-auto">
            <v-card-text class="text-center text-md-left">
              <h2 class="text-left">
                {{ top.header }}
              </h2>
            </v-card-text>
            <v-card-text class="mx-0">
              <p
                    class="text-left"
                    v-html="top.text.split('\n').join('<br>')"
              ></p>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" lg="6" class="mx-auto my-auto">
          <v-row>
            <v-col cols="12" sm="4">
              <v-text-field
                    v-if="pages"
                    v-model="postcode"
                    label="Post code"
                    dense
                    outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="8" v-if="streetNames.length > 0">
              <v-select
                    v-if="pages"
                    :items="streetNames"
                    label="Street Name"
                    @change="selectStreet($event)"
                    dense
                    outlined
              ></v-select>
            </v-col>
          </v-row>
          <v-card
                flat
                width="100%"
                max-width="100%"
                class="transparent mx-auto"
            >
            <v-card-text class="text-center text-md-left">
              <v-btn
                  v-for="btn in streetNumbers"
                  :key="btn"
                  color="buttons"
                  dark
                  rounded
                  height="48"
                  max-width="48"
                  class="submit-button text-left px-auto mx-auto my-2"
                  @click="navigateTo(btn)"
              >
                    {{ btn }}
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
  </v-card>
</v-container>
</template>

<style>
.v-image__image .v-image__image--cover {
  transition: all 0.5s!important;
}
.v-image__image .v-image__image--cover:hover {
  filter: blur(8px)!important;
  -webkit-filter: blur(8px)!important;
}
</style>

<style scoped>
.top-element {
  margin-top: 120px;
  margin-bottom: 64px;
}
p {
  line-height: 180%!important;
}

@media screen and (max-width: 500px) {
  .top-element {
    margin-top: 80px;
    margin-bottom: 48px;
  }
}
</style>

<script>

import { mapState } from 'vuex'

export default {
  name: 'Top',
  props: ['page'],
  data: () => ({
    selectedPages: [],
    postcode: '',
    streetName: '',
    streetNumbers: []
  }),
  computed: {
    ...mapState(['viewportWidth', 'pages']),
    ...mapState('content', ['top', 'mainNavButtons', 'mainNavSectors']),
    streetNames () {
      return !this.pages ? [] : (this.selectedPages || this.pages).map(item => item.address.streetName)
    }
  },
  watch: {
    postcode (val) {
      this.selectedPages = val ? this.pages.filter(item => item.address.postcode === val) : this.pages
    }
  },
  methods: {
    selectStreet (val) {
      if (!this.pages) return
      const street = this.postcode
        ? this.pages.filter(item => item.address.postcode === this.postcode).filter(item => item.address.streetName === val)
        : this.pages.filter(item => item.address.streetName === val)
      this.streetNumbers = street.map(item => item.address.streetNumber)
    },
    navigateTo (number) {
      const item = (this.selectedPages || this.pages).find(item => item.address.streetNumber === number)
      if (!item) return
      const address = item.address
      const route = `${address.streetNumber}_${address.streetName.split(' ').join('-')}_${address.state}_${address.postcode}`
      this.$router.push({ path: `/${route}` })
    }
  },
  mounted () {
    this.selectedPages = this.pages
  }
}
</script>
