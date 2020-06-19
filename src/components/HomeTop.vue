<template>
<v-container fluid style="overflow-x: hidden; margin-top: 160px; margin-bottom: 64px;" v-if="top">
  <v-card flat class="homefone" width="100%" max-width="1904">
    <!-- <v-img
          :src="top.pictureURL"
          gradient="to right, #FAFAFAFF, #FAFAFA00"
    > -->
      <!-- =======================  VIEWPORT > 700 ======================== -->

      <v-row align="center" justify="center" style="height: 100%">
        <v-col cols="12" lg="6" class="mx-auto my-auto">
          <v-card flat width="100%" max-width="480" class="transparent mx-auto">
            <v-card-text class="text-center text-md-left">
              <h2 class="text-left">
                {{ top.header }}
              </h2>
            </v-card-text>
            <v-card-text class="mx-0" v-if="viewportWidth > 700">
              <p
                    class="text-left"
                    v-html="top.text"
              ></p>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" lg="6" class="mx-auto my-auto">
          <v-card flat width="100%" max-width="480" class="transparent mx-auto">
            <v-card-text
                  class="text-left"
                  v-if="viewportWidth > 700"
            >
              <v-btn
                  v-for="btn in mainNavButtons"
                  :key="btn.buttonText"
                  color="buttons"
                  dark
                  rounded
                  height="48"
                  width="400"
                  class="submit-button text-left px-auto mx-auto my-2"
                  @click="navigate(btn)"
                  style="text-align: left!important"
              >
                <v-row>
                  <v-col cols="10">
                    {{ btn.buttonText }}
                  </v-col>
                  <v-col cols="2">
                    <v-icon>mdi-arrow-right-bold</v-icon>
                  </v-col>
                </v-row>
                <!-- {{ btn.buttonText }} -->
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
        <!-- <v-col cols="2" sm="4">
            <v-card flat width="100%" max-width="600" class="transparent">
              <v-img :src="top.pictureURL" max-width="750" class="mx-auto"></v-img>
            </v-card>
        </v-col> -->
      </v-row>
    <!-- </v-img> -->

    <!-- =======================  VIEWPORT <= 700 ======================== -->

    <v-row align="center" justify="center" style="height: 100%" v-if="viewportWidth <= 700">
      <v-card flat width="100%" max-width="480" class="transparent mx-auto">
        <!-- <v-card-text class="text-center text-md-left">
          <h1 class="text-center">{{ top.header }}</h1>
        </v-card-text> -->
        <v-card-text class="mx-auto mx-lg-0">
          <p
              class="text-center"
              v-html="top.text"
          ></p>
        </v-card-text>
        <v-card-text class="text-center text-md-left">
          <v-btn
              v-for="btn in mainNavButtons"
              :key="btn.buttonText"
              color="buttons"
              dark
              rounded
              height="48"
              class="submit-button px-auto mx-auto my-2"
              @click="navigate(btn)"
          >
              {{ btn.buttonText }}
          </v-btn>
        </v-card-text>
      </v-card>
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
  computed: {
    ...mapState(['viewportWidth']),
    ...mapState('content', ['top', 'mainNavButtons'])
  },
  methods: {
    navigate (to) {
      if (to.page) this.$router.push({ name: to.page })
      else if (to.url) window.open(to.url, '_blank')
    }
  }
}
</script>
